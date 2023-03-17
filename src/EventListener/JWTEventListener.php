<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class JWTEventListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void{

        $data = [];
        $user = $event->getUser();

        if(!$user instanceof User) return;

        $data['username'] = $user->getUsername();
        $data = array_merge($data, $event->getData());

        $event->setData($data);
    }

    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event): void{
        $response = new JsonResponse([
            "message" => "Login failed. Please check your email and password and try again.",
            "code"=> Response::HTTP_UNAUTHORIZED
        ],Response::HTTP_UNAUTHORIZED);
        $event->setResponse($response);
    }
}