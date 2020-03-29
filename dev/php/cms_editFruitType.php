<?php 
try {
    require_once("connectHomeServer.php");
		
	$sql = "update `fruit_type` set healthyType = :healthyType, fruitTypeName = :fruitTypeName, fruitUnitPrice = :fruitUnitPrice, fruitTypeStatus = :fruitTypeStatus where (fruitTypeNo = :fruitTypeNo)";
        $fruit = $pdo->prepare( $sql);
        $fruit -> bindValue(":fruitTypeNo", $_POST["fruitTypeNo"]);
		$fruit -> bindValue(":healthyType", $_POST["healthyType"]);
        $fruit -> bindValue(":fruitTypeName", $_POST["fruitTypeName"]);
        $fruit -> bindValue(":fruitUnitPrice", $_POST["fruitUnitPrice"]);
        $fruit -> bindValue(":fruitTypeStatus", $_POST["fruitTypeStatus"]);
		$fruit -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  
