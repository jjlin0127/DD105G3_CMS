<?php 
try {
	require_once("connectHomeServer.php");

	$sql = "DELETE FROM `boximg` where (boxImgNo = :boxImgNo)";
	$boxImg = $pdo->prepare($sql);
    $boxImg -> bindValue(":boxImgNo", $_POST["boxImgNo"]);
    $boxImg -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  