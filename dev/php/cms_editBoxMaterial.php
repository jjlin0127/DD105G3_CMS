<?php 
try {
    require_once("connectDeskServer.php");
		
	$sql = "update `boximg` set boxImgName = :boxImgName, boxImgStatus = :boxImgStatus where (boxImgNo = :boxImgNo)";
        $boxImg = $pdo->prepare( $sql);
        $boxImg -> bindValue(":boxImgNo", $_POST["boxImgNo"]);
		$boxImg -> bindValue(":boxImgName", $_POST["boxImgName"]);
        $boxImg -> bindValue(":boxImgStatus", $_POST["boxImgStatus"]);
		$boxImg -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  
