<?php
try {
    require_once("connectHomeserver.php");

    $sql = "select * from `member`";
    $members = $pdo->query($sql);
    $memberRows = $members->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($memberRows);

} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>