<?php

namespace App\Common;

use Symfony\Component\Uid\Uuid;

final class UuidGenerator
{
    public static function from(Uuid|string|null $id): Uuid{
        if($id===null)
            return Uuid::v4();
        if(is_string($id))
            return Uuid::fromString($id);

        return $id;
    }
}