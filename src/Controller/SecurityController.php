<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use App\Service\JWTHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(JWTHelper $helper, CookieHelper $cookieHelper): Response
    {
        /** @var $user User */
        if ($user = $this->getUser()) {
            return $this->json([
                'JWT' => $helper->createJWT($user),
                'status' => 'success',
            ], 200, [
                'set-cookie' => $cookieHelper->createMercureCookie($user)
            ]);
        }

        return $this->json([
            'status' => 'error',
            'message' => 'Bad credentials',
            'Authorization' => 'Basic'
        ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

 /**
     *@Route("/new", name="User_new", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $User = new User();
        $form = $this->createForm(UserType::class, $User);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
                $entityManager = $this->getDoctrine()->getManager();
                //encodage du mot de passe
                $User->setPassword(
                $passwordEncoder->encodePassword($User, $User->getPassword()));
                $entityManager->persist($User);
                $entityManager->flush();

                return $this->redirectToRoute('User_index');
        }

        return $this->render('User/', [
        'User' => $User,
        'form' => $form->createView(),
        ]);
    }

    /**@Route(connexion réalisé avec succès) */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
{
        if ($targetPath = $this->getTargetPath($request->getSession(), $providerKey)) {
                return new RedirectResponse($targetPath);
        }
        //on renvoie à la liste des utilisateurs
        return new RedirectResponse($this->urlGenerator->generate('utilisateur_index'));
}
      
}
