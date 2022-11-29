<?php

namespace App\EventListener;

use App\Service\JWTHelper;
use App\Service\CookieHelper;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTAuthenticatedEvent;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;

class JWTAuthenticatedListener
{
    // constructor
    public function __construct(CookieHelper $cookieHelper, JWTHelper $JWTHelper)
    {
        $this->cookieHelper = $cookieHelper;
        $this->JWTHelper = $JWTHelper;
    }


    public function onJWTAuthenticated(JWTAuthenticatedEvent $event)
    {
    }
}
