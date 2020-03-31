<?php 
try {
    require_once("connectDeskServer.php");
    $pdo->beginTransaction();

	if( $_FILES["upFile"]["error"] == UPLOAD_ERR_OK){
		
		$sql1 = "INSERT INTO `boximg` (`boxImgName`) values(:boxImgName)";
		$boxImg = $pdo->prepare($sql1);
		$boxImg -> bindValue(":boxImgName", $_POST["boxImgName"]);
		$boxImg -> execute();

		//取得自動創號的key值
		$boxImgNo = $pdo->lastInsertId();

		//先檢查images資料夾存不存在
		if( file_exists("../images/box") === false){
			mkdir("../images/box");
		}
		//將檔案copy到要放的路徑
		$fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
		$fileName = "{$boxImgNo}.{$fileInfoArr["extension"]}";

		$from = $_FILES["upFile"]["tmp_name"];
		$to = "../images/box/$fileName";
		if(copy( $from, $to)===true){
			//將檔案名稱寫回資料庫
			$sql2 = "update `boximg` set boxImgPath = :boxImgPath where boxImgNo = $boxImgNo";
			$boxImg = $pdo->prepare($sql2);
			$boxImg -> bindValue(":boxImgPath", $fileName);
			$boxImg -> execute();
			echo "新增成功~";
			$pdo->commit();
		}else{
			$pdo->rollBack();
		}

	}else{
		echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
		echo "新增失敗<br>";
	}
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  
