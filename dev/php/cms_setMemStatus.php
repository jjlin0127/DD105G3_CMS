<?php 
try {
	require_once("connectDeskServer.php");

    $sql = "update `member` set memStatus = :memStatus 
            where (memNo = :memNo)";
    $message = $pdo->prepare($sql);
    $message -> bindValue(":memNo", $_POST["memNo"]);
	$message -> bindValue(":memStatus", $_POST["memStatus"]);
    $message -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  