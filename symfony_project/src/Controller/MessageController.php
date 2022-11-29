<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    #[Route('/message/post/{user}', name: 'message_post_user', methods: 'POST')]
    public function pingUser(User $user, HubInterface $hub)
    {
        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'user' => $user->getEmail(),
                'id' => $user->getId()
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Ping sent'
        ]);
    }
}
