<?php

namespace App\Security;

use App\Exception\BadRequestHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException as InheritException;
use Symfony\Component\Security\Http\Authenticator\JsonLoginAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;

class LoginAuthenticator extends JsonLoginAuthenticator
{
    public function authenticate(Request $request): Passport
    {
        try {
            return parent::authenticate($request);
        } catch (InheritException $e) {
            throw new BadRequestHttpException($e->getMessage(), $e->getPrevious(),Response::HTTP_BAD_REQUEST, $e->getHeaders());
        }
    }


}