<?php

Class ItemController{

    //I think we can further modularize this to an imageController
    public function uploadImage() {
        $decoded = AuthMiddleware::verifyToken(); // Require authentication
        $itemId = $_POST['item_id'];
        $itemModel = new Item();
        $item = $itemModel->getItem($itemId);
        if (!$item) {
            ErrorHelper::sendError(404, 'Item not found');
        }

        $image = new ImageController();
        $filename = $image->saveImage($item);


        if (!$itemModel->saveImagePath($item['item_id'], 'uploads/' . $filename)) {
            ErrorHelper::sendError(500, 'Failed to update image path in database');
        }

        echo json_encode(['message' => 'Image uploaded', 'image_path' => 'uploads/' . $filename]);
        
    }

    public function createItem() {
        $decoded = AuthMiddleware::verifyToken(); // Require authentication
        $data = $_POST;
        if (
            !isset($data['supplier_id']) ||
            !isset($data['model']) ||
            !isset($data['price']) ||
            !isset($data['type']) ||
            !isset($data['inverter']) ||
            !isset($data['horsepower']) ||
            !isset($data['brand']) ||
            !isset($_FILES['image'])
        ) {
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }
        $uploadDir = __DIR__ . '/../../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $filename = uniqid() . '_' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . $filename;


        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $itemModel = new Item();
            $itemId = $itemModel->createItem(
                $data['type'],
                $data['inverter'],
                $data['horsepower'],
                $data['brand'],
                $data['supplier_id'],
                $data['model'],
                $data['price'],
                'uploads/' . $filename
            );
            echo json_encode(['message' => 'Item created', 'item_id' => $itemId, 'image_path' => 'uploads/' . $filename]);
        } else {
            echo json_encode(['error' => 'Failed to upload image']);
        }
    }

    public function updateItemDetails($itemId) {
        $decoded = AuthMiddleware::verifyToken(); // Require authentication
        
        $data = json_decode(file_get_contents("php://input"), true);
        $missingRequiredFields = MissingRequiredFields::checkMissingFields($data,[
            "type",
            "inverter",
            "horsepower",
            "brand",
            "supplier_id",
            "model",
        ]);

        if(!empty($missingRequiredFields)){
            ErrorHelper::sendError(400, 'Missing required fields: ' . implode(', ', $missingRequiredFields));
        }

        $itemModel = new Item();
        $newItem = $itemModel->editItemDetails(
            $itemId,
            $data['type'],
            $data['inverter'],
            $data['horsepower'],
            $data['brand'],
            $data['supplier_id'],
            $data['model'],
        );

        if($newItem != null){
            echo json_encode([
            'message' => 'Successfully update item no. ' . $itemId
            ]);
        }

        
    }  

    public function getAllItems() {
        $itemModel = new Item();
        $items = $itemModel->getAllItems();
        echo json_encode($items);
    }

    public function getItem($itemId) {
        $itemModel = new Item();
        $item = $itemModel->getItem($itemId);
        if ($item) {
            echo json_encode($item);
        } else {
            echo json_encode(['error' => 'Item not found']);
        }
    }

    public function deleteItem($itemId) {
        $decoded = AuthMiddleware::verifyToken();
        $itemModel = new Item();
        $deleted = $itemModel->deleteItem($itemId);
        if ($deleted) {
            echo json_encode(['message' => 'Item deleted successfully']);
        } else {
            echo json_encode(['error' => 'Failed to delete item']);
        }
    }
}