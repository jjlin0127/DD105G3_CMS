<?php 
try {
	require_once("connectSchoolServer.php");

    $sql1 = "update `article` set artStatus = :artStatus 
            where (articleNo = :articleNo)";
    $article = $pdo->prepare($sql1);
    $article -> bindValue(":articleNo", $_POST["articleNo"]);
	$article -> bindValue(":artStatus", $_POST["artStatus"]);
    $article -> execute();
    
    $sql2 = "update `article_report` set artReportStatus = :artStatus 
            where (articleNo = :articleNo)";
    $reportArti = $pdo->prepare($sql2);
    $reportArti -> bindValue(":articleNo", $_POST["articleNo"]);
    $reportArti -> bindValue(":artStatus", $_POST["artStatus"]);
    $reportArti -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  