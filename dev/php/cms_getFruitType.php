<?php
try {
    require_once("connectDeskServer.php");

    $sql = "select * from `fruit_type`";
    $fruits = $pdo->query($sql);
    $fruitRows = $fruits->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($fruitRows);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>