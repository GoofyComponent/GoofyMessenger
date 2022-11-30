<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Message;
use App\Entity\Conversation;
use App\Service\CookieHelper;
use App\Repository\UserRepository;
use Symfony\Component\Mercure\Update;
use App\Repository\ConversationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MessageController extends AbstractController
{
    #[Route('/api/message/post/{IdUser}', name: 'message_post_user', methods: 'POST', requirements: ['IdUser' => '\d+'])]
    public function messageUser($IdUser, HubInterface $hub, UserRepository $userRepository, Request $request, ConversationRepository $conversationRepository, EntityManagerInterface $entityManager): Response
    {
        $id = $this->getUser()->getId();
        $user = $userRepository->find($IdUser);
        $content = $request->request->get('message');
        $date = new \DateTime();
        $conversation = $conversationRepository->findConversationsByUsers([$this->getUser(), $user]);
        if (count($conversation) <= 0) {
            $conversation = new Conversation();
            $conversation->addUser($this->getUser());
            $conversation->addUser($user);
        } else {
            $conversation = $conversation[0];
        }

        $message = new Message();
        $message->setAuthor($this->getUser()->getLastname() . " " . $this->getUser()->getFirstname());
        $message->setContent($content);
        //datetimeimmutable
        $dateImmu = new \DateTimeImmutable();
        $message->setCreatedAt($dateImmu);
        $conversation->addMessage($message);
        $entityManager->persist($conversation);
        $entityManager->flush();

        $update = new Update(
            [
                "https://conversation/user/{$id}/{$IdUser}",
            ],
            json_encode([
                'message' => $content,
                'date' => $date->format('Y-m-d H:i:s'),
            ])
        );

        $hub->publish($update);

        return $this->json([
            'status' => 'success',
            'message' => $content,
            'date' => $date->format('Y-m-d H:i:s'),
            'idConversation' => $conversation->getId(),
        ]);
    }

    #[Route('/api/message/get/{IdConversation}', name: 'message_get_user', methods: 'GET', requirements: ['IdConversation' => '\d+'])]
    public function getMessageUser($IdConversation, ConversationRepository $conversationRepository, Request $request): Response
    {
        if (!$this->getUser()) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }

        $conversation = $conversationRepository->find($IdConversation);
        if (!$conversation) {
            return $this->json([
                'status' => 'error',
                'message' => 'Conversation not found',
            ]);
        }
        if (!$conversation->getUsers()->contains($this->getUser())) {
            return $this->json([
                'status' => 'error',
                'message' => 'You are not part of this conversation',
            ]);
        }
        $messages = $conversation->getMessages();
        if (!$messages) {
            return $this->json([
                'status' => 'error',
                'message' => 'No messages found',
            ]);
        }
        $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
        $jsonContent = $serializer->serialize($messages, 'json', [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['conversation', 'createdAt', 'id'],
        ]);
        $jsonContent = json_decode($jsonContent, true);
        return $this->json([
            'status' => 'success',
            'me' => $this->getUser()->getLastName() . ' ' . $this->getUser()->getFirstName(),
            'other' => $conversation->getUsers()->filter(fn ($user) => $user->getId() !== $this->getUser()->getId())->first()->getLastName() . ' ' . $conversation->getUsers()->filter(fn ($user) => $user->getId() !== $this->getUser()->getId())->first()->getFirstName(),
            'messages' => $jsonContent
        ]);
    }
}
