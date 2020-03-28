<?php
try {
    require_once("connectSchoolServer.php");

    $sql = "select * from `article_report` join `article` 
            on (article_report.articleNo = article.articleNo)";
    $reportArti = $pdo->query($sql);
    $reportArtiRows = $reportArti->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reportArtiRows);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>