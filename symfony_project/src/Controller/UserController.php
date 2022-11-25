<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{

    public function __construct(private UserRepository $userRepository)
    {
        $this->encoders = [new XmlEncoder(), new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];

        $this->serializer = new Serializer($this->normalizers, $this->encoders);
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
        // $jsonContent = $this->serializer->serialize($this->userRepository->findByPage($page), 'json', ['groups' => 'user:read'] );

        // $users = json_decode($jsonContent, true);

        $users = $this->userRepository->findByPage($page);

        // on souhaite le transformer en tableau json en evitant les circular reference
        $users = $this->serializer->serialize($users, 'json', ['groups' => 'user']);
        $users = json_decode($users, true);
        return $this->json([
            'status' => 'success',
            'message' => 'You are logged in',
            'users' => $users,
        ]);
    }
}
