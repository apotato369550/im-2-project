<?php

class AssignmentController
{
    public function processRequest(string $method, ?string $id) : void
    {
        var_dump($method, $id);
    }
}