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
                "https://example.com/my-private-topic",
                "https://conversation/user/{$IdUser}/?topic=" . urlencode("https://example.com/my-private-topic"),
            ],
            json_encode([
                "username" => $user->getEmail(),
                "userid" => $user->getId(),
                'message' => $content,
                'date' => $date->format('Y-m-d H:i:s'),
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'status' => 'success',
            'message' => $content,
            'date' => $date->format('Y-m-d H:i:s'),
            'idConversation' => $conversation->getId(),
        ]);
    }

    #[Route('/api/message/get/{IdUser}', name: 'message_get_user', methods: 'GET', requirements: ['IdUser' => '\d+'])]
    public function getMessageUser($IdUser, ConversationRepository $conversationRepository, Request $request, UserRepository $userRepository): Response
    {
        if (!$this->getUser()) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }
        $target_user  = $userRepository->find($IdUser);
        $conversation = $conversationRepository->findConversationsByUsers([$this->getUser(), $target_user])[0];
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

    #[Route('/api/mercureAuthorization', name: 'mercure_authorization', methods: 'GET')]
    public function getMercureJWT(CookieHelper $cookieHelper, Request $request): Response
    {
        if (!$this->getUser()) {
            return $this->json([
                'status' => 'error',
                'message' => 'You need to be logged in to access this resource',
            ]);
        }
        $cookie = $cookieHelper->createMercureCookie($this->getUser());
        $response = new Response();
        $response->headers->setCookie($cookie);
        $json = json_encode([
            'mercureAuthorization' => $cookie->getValue(),
        ]);
        $response->setContent($json);
        return $response;
    }
}
