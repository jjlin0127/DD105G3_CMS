<?php 
try {
	require_once("connectDeskServer.php");

    $sql1 = "update `message` set mesStatus = :mesStatus 
            where (messageNo = :messageNo)";
    $message = $pdo->prepare($sql1);
    $message -> bindValue(":messageNo", $_POST["messageNo"]);
	$message -> bindValue(":mesStatus", $_POST["mesStatus"]);
    $message -> execute();
    
    $sql2 = "update `message_report` set mesReportStatus = :mesStatus 
            where (messageNo = :messageNo)";
    $reportMes = $pdo->prepare($sql2);
    $reportMes -> bindValue(":messageNo", $_POST["messageNo"]);
    $reportMes -> bindValue(":mesStatus", $_POST["mesStatus"]);
    $reportMes -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  