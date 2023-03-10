<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class JwtTokenAuthenticator extends JWTAuthenticator
{
    public function start(Request $request, AuthenticationException $authException = null): Response
    {
        var_dump(['start'=>true]);
        return parent::start($request, $authException); // TODO: Change the autogenerated stub
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        var_dump(['auth-fail'=>true]);
        return parent::onAuthenticationFailure($request, $exception); // TODO: Change the autogenerated stub
    }


}