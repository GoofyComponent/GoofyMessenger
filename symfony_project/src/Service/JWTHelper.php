<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// security.token_storage
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class JWTHelper
{
    private string $mercureSecret;

    public function __construct(string $mercureSecret, TokenStorageInterface $tokenStorage)
    {
        $this->mercureSecret = $mercureSecret;
        $this->tokenStorage = $tokenStorage;
    }

    public function createJWT(User $user): string
    {
        // private
        $this->user = $this->tokenStorage->getToken()->getUser();
        $payload = ["mercure" => [
            "subscribe" => ["https://conversation/user/{$user->getId()}/{$this->user->getId()}"],
            "publish" => ["https://conversation/user/{$this->user->getId()}/{$user->getId()}"],
            "payload" => [
                "username" => $this->user->getEmail(),
                "userid" => $this->user->getId(),
            ]
        ]];
        $jwt = JWT::encode($payload, $this->mercureSecret, 'HS256');
        return $jwt;
    }

    public function isJwtValid(string $jwt): bool
    {
        try {
            return (bool)JWT::decode($jwt, new Key($this->mercureSecret, 'HS256'));
        } catch (\Exception $e) {
            return false;
        }
    }
}
