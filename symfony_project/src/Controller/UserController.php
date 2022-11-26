<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\ConversationRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\XmlEncoder;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{

    public function __construct(private UserRepository $userRepository, private ConversationRepository $conversationRepository)
    {
    }

    #[Route('/api/users/{page}', name: 'app_user', requirements: ['page' => '\d+'])]
    public function index($page): Response
    {
        if (!$this->getUser()) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }
        // page cant be less than 1
        if ($page < 1) {
            return $this->json([
                'status' => 'error',
                'message' => 'Page number must be greater than 0',
            ]);
        }
        // on serialize les données
        $serializer = new Serializer([new ObjectNormalizer()], [new XmlEncoder(), new JsonEncoder()]);
        $users = $this->userRepository->findByPage($page);
        // on retire l'utilisateur courant de la liste
        $users = array_filter($users, fn ($user) => $user->getId() !== $this->getUser()->getId());
        foreach ($users as $user) {
            $conversations = $this->conversationRepository->findConversationsByUsers([$this->getUser(), $user]);
            if (count($conversations) > 0) {
                // dd($conversations[0]->getMessages()->last()->getContent());
                $user->setLastMessage($conversations[0]->getMessages()->last()->getContent());
            }
        }
        $data = $serializer->serialize($users, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['conversations', 'password', 'userIdentifier', 'email', 'roles']]);

        $data = json_decode($data, true);
        return $this->json([
            'status' => 'success',
            'message' => 'You are logged in',
            'users' => $data,
        ]);
    }

    #[Route('/api/get/conversation', name: 'app_get_conversation', methods: ['POST'])]
    public function conversation(Request $request): Response
    {

        $user = $this->getUser();
        $user2 = $this->userRepository->findOneBy(['id' => $request->request->get('id')]);

        if (!$user2) {
            return $this->json([
                'status' => 'error',
                'message' => 'User not found',
            ]);
        }

        if (!$user) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }

        $conversation = $this->conversationRepository->findOneByUsers(['user1' => $user, 'user2' => $user2]);

        return $this->json([
            'status' => 'success',
            'message' => 'You are logged in',
        ]);
    }
}
