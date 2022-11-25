<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{

    public function __construct(private UserRepository $userRepository)
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
        $data = $serializer->serialize($users, 'json',[AbstractNormalizer::IGNORED_ATTRIBUTES => ['conversations','password','userIdentifier','email','roles']]);
        $data = json_decode($data, true);
        // $users = $this->userRepository->findByPage($page);
        return $this->json([
            'status' => 'success',
            'message' => 'You are logged in',
            'users' => $data,
        ]);
    }
}
