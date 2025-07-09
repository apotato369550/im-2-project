<?php

Class Item{
    public function saveImagePath($itemId, $imagePath) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("UPDATE items SET image_path = :image_path WHERE item_id = :item_id");
        return $stmt->execute([
            'image_path' => $imagePath,
            'item_id' => $itemId
        ]);
    }

    public function createItem($type, $inverter, $horsepower, $brand, $supplierId, $model, $price, $imagePath) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("
            INSERT INTO items (supplier_id, model, manager_id, price, image_path, type, inverter, brand, horsepower)
            VALUES (:supplier_id, :model, 1, :price, :image_path, :type, :inverter, :brand, :horsepower)
        ");
        $stmt->execute([
            'supplier_id' => $supplierId,
            'model' => $model,
            'price' => $price,
            'type' => $type,
            'inverter' => $inverter,
            'horsepower' => $horsepower,
            'brand' => $brand,
            'image_path' => $imagePath
        ]);
        return $db->lastInsertId();
    }

    public function getItem($itemId) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM items WHERE item_id = :item_id");
        $stmt->execute(['item_id' => $itemId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllItems() {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT * FROM items");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function deleteItem($itemId) {
        $db = DBHelper::getConnection();
        $stmt = $db->prepare("SELECT image_path FROM items WHERE item_id = :item_id");
        $stmt->execute(['item_id' => $itemId]);
        $item = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($item && !empty($item['image_path'])) {
            $filePath = __DIR__ . '/../../' . $item['image_path'];
            if (file_exists($filePath)) {
                unlink($filePath); 
            }
        }

        $stmt = $db->prepare("DELETE FROM items WHERE item_id = :item_id");
        return $stmt->execute(['item_id' => $itemId]);
    }
}