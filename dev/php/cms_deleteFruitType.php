<?php 
try {
	require_once("connectDeskServer.php");

	$sql = "DELETE FROM `fruit_type` where (fruitTypeNo = :fruitTypeNo)";
	$fruit = $pdo->prepare($sql);
    $fruit -> bindValue(":fruitTypeNo", $_POST["fruitTypeNo"]);
    $fruit -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  