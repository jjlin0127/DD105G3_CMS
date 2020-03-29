<?php 
try {
	require_once("connectHomeServer.php");

    $sql = "update `order_general` set ordStatus = :ordStatus 
            where (ordNo = :ordNo)";
    $orderGeneral = $pdo->prepare($sql);
    $orderGeneral -> bindValue(":ordNo", $_POST["ordNo"]);
	$orderGeneral -> bindValue(":ordStatus", $_POST["ordStatus"]);
    $orderGeneral -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  