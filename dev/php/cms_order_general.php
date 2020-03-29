<?php 
try {
	require_once("connectHomeServer.php");

	$sql = "select * from `order_general`";
    $order_generals = $pdo->query($sql);
    $orderRows = $order_generals->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orderRows);
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  
