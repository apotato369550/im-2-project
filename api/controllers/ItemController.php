
    
<?php

Class ItemController{
    public function uploadImage() {
        $decoded = AuthMiddleware::verifyToken(); // Require authentication
        if (!isset($_FILES['image']) || !isset($_POST['item_id'])) {
            echo json_encode(['error' => 'No image or item_id provided']);
            return;
        }
        $itemId = $_POST['item_id'];
        $uploadDir = __DIR__ . '/../../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Get old image path
        $itemModel = new Item();
        $item = $itemModel->getItem($itemId);
        if ($item && !empty($item['image_path'])) {
            $oldFile = __DIR__ . '/../../' . $item['image_path'];
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
        }

        $filename = uniqid() . '_' . basename($_FILES['image']['name']);
        $targetFile = $uploadDir . $filename;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $itemModel->saveImagePath($itemId, 'uploads/' . $filename);
            echo json_encode(['message' => 'Image uploaded', 'image_path' => 'uploads/' . $filename]);
        } else {
            echo json_encode(['error' => 'Failed to upload image']);
        }
    }

    public function createItem() {
        $decoded = AuthMiddleware::verifyToken(); // Require authentication
        $data = $_POST;
        if (
            !isset($data['supplier_id']) ||
            !isset($data['model']) ||
            !isset($data['manager_id']) ||
            !isset($data['price']) ||
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
                $data['supplier_id'],
                $data['model'],
                $data['manager_id'],
                $data['price'],
                'uploads/' . $filename
            );
            echo json_encode(['message' => 'Item created', 'item_id' => $itemId, 'image_path' => 'uploads/' . $filename]);
        } else {
            echo json_encode(['error' => 'Failed to upload image']);
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
        $decoded = AuthMiddleware::verifyToken(); // Require authentication
        $itemModel = new Item();
        $deleted = $itemModel->deleteItem($itemId);
        if ($deleted) {
            echo json_encode(['message' => 'Item deleted successfully']);
        } else {
            echo json_encode(['error' => 'Failed to delete item']);
        }
    }
}