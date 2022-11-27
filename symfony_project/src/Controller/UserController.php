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
                $user->setLastMessage(["message" => $conversations[0]->getMessages()->last()->getContent(), "idConversation" => $conversations[0]->getId()]);
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
        if (!$this->getUser()) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }

        $conversation = $this->conversationRepository->find($request->request->get('id'));
        if (!$conversation) {
            return $this->json([
                'status' => 'error',
                'message' => 'Conversation not found',
            ]);
        }
        $serializer = new Serializer([new ObjectNormalizer()], [new XmlEncoder(), new JsonEncoder()]);

        // si c'est pas la conversation de l'utilisateur courant
        foreach ($conversation->getUsers() as $user) {
            if ($user->getId() === $this->getUser()->getId()) {
                $message = $conversation->getMessages();
                // date en français dans les messages
                $message = $serializer->serialize($message, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['conversation', 'id', 'createdAt']]);
                $me = $serializer->serialize($this->getUser(), 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['conversations', 'password', 'userIdentifier', 'email', 'roles']]);
                $other = $serializer->serialize($user->getId() === $this->getUser()->getId() ? $conversation->getUsers()[1] : $conversation->getUsers()[0], 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['conversations', 'password', 'userIdentifier', 'email', 'roles']]);
                $conversationReconstructed = [
                    'id' => $conversation->getId(),
                    'me' => json_decode($me, true),
                    'other' => json_decode($other, true),
                    'messages' => json_decode($message, true),
                ];
                return $this->json([
                    'status' => 'success',
                    'message' => 'Conversation found',
                    'conversation' => $conversationReconstructed,
                ]);
            }
        }

        return $this->json([
            'status' => 'error',
            'message' => 'You are not allowed to access this conversation',
        ]);
    }
}
