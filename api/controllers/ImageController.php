<?php

class ImageController{
    public function saveImage($item){
        if (!isset($_FILES['image'])) {
            ErrorHelper::sendError(400, 'No image or item_id provided');
        }
        $uploadDir = __DIR__ . '/../../uploads/';
        if (!is_dir($uploadDir)) {
            if (!mkdir($uploadDir, 0777, true)) {
                ErrorHelper::sendError(500, 'Failed to create upload directory');
            }
        }

        if (!empty($item['image_path'])) {
            $oldFile = __DIR__ . '/../../' . $item['image_path'];
            if (file_exists($oldFile)) {
                if (!unlink($oldFile)) {
                    ErrorHelper::sendError(500, 'Failed to delete old image');
                }
            }
        }

        $filename = uniqid() . '_' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . $filename;

        if (!is_uploaded_file($_FILES['image']['tmp_name'])) {
            ErrorHelper::sendError(400, 'No valid uploaded file');
        }

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            ErrorHelper::sendError(500, 'Failed to move uploaded file');
        }

        return $filename;
    }
}