<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\JWTHelper;
use App\Service\CookieHelper;
use Symfony\Component\Mercure\Update;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{
    // /**
    //  * @Route("/api/login", name="app_login")
    //  */
    // public function login(JWTHelper $helper, CookieHelper $cookieHelper): Response
    // {
    //     $user = $this->getUser();
    //     if ( null === $user ) {
    //         return $this->json([
    //             'status' => 'error',
    //             'message' => 'User not found',
    //         ]);
    //     }


    //     return $this->json([
    //         'status' => 'error',
    //         'message' => 'Bad credentials',
    //         'Authorization' => 'Basic'
    //     ]);
    // }

    // /**
    //  * @Route("/api/logout", name="app_logout")
    //  */
    // public function logout(): void
    // {
    //     throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    // }

    /**
     *@Route("/api/register", name="app_register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {

        $user = new User();

        if ($this->getUser()) {
            return $this->json([
                'status' => 'error',
                'message' => 'You are already logged in'
            ]);
        }


        try {
            $user->setEmail($request->request->get('email'));
            $user->setFirstname($request->request->get('firstname'));
            $user->setLastname($request->request->get('lastname'));

            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $request->request->get('password')
                )
            );
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json([
                'status' => 'success',
                'message' => 'User created',
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => 'Une des valeurs est vide ou mal rentrée',
                'code' => 400
            ]);
        }
    }

    /**
     *@Route("/api/islog", name="app_islog", methods={"POST"})
     */
    public function isLogged(Request $request, JWTHelper $helper): Response
    {
        $jwt = $request->request->get('jwt');
        $isLog = $helper->isJwtValid($jwt);
        return $this->json([
            'isLog' => $isLog
        ]);
    }
}
