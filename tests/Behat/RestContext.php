<?php

declare(strict_types=1);

namespace App\Tests\Behat;

use Behat\Behat\Context\Context;
use Behat\Behat\Tester\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behatch\Context\BaseContext;
use Behatch\HttpCall\Request;

final class RestContext extends BaseContext
{

    private Request\BrowserKit|Request\Goutte|Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @When I send a :method request to :url with json body:
     */
    public function iSendARequestToWithJsonBody(string $method, string $url, PyStringNode|TableNode $body){
        $rawBody = static::getRawJsonBody($body);

        $this->request->setHttpHeader("Content-Type", "text-json");
        return $this->request->send(
            $method,
            $this->locatePath($url),
            [],
            [],
            $rawBody
        );
    }

    private static function isJson(String $string) {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }

    private static function getRawJsonBody(PyStringNode|TableNode $body): string{
        if($body instanceof PyStringNode){
            if(!static::isJson($body->getRaw()))
                throw new \Exception("Body is not a valid json");
            return  $body->getRaw();
        }else{
            $rows = $body->getRows();
            if(count($rows[0])!==2)
                throw new \Exception("Invalid table format");

            return json_encode($body->getRowsHash());
        }
    }
    /**
     *  public function iSendARequestTo($method, $url, PyStringNode $body = null, $files = [])
    {
    return $this->request->send(
    $method,
    $this->locatePath($url),
    [],
    $files,
    $body?->getRaw()
    );
    }
     */
}
