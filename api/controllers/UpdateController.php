<?php

Class UpdateController{
    public function saveUpdate($data){
        $update = new Update();
        $saveUpdate = $update->saveNewUpdate($data);
    }

}