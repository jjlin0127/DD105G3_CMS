<?php 
try {
    require_once("connectHomeServer.php");
    $pdo->beginTransaction();

	if( $_FILES["upFile"]["error"] == UPLOAD_ERR_OK){
		
		$sql1 = "INSERT INTO `fruit_type` (`healthyType`, `fruitTypeName`, `fruitUnitPrice`) values(:healthyType, :fruitTypeName, :fruitUnitPrice)";
		$fruit = $pdo->prepare($sql1);
		$fruit -> bindValue(":healthyType", $_POST["healthyType"]);
        $fruit -> bindValue(":fruitTypeName", $_POST["fruitTypeName"]);
        $fruit -> bindValue(":fruitUnitPrice", $_POST["fruitUnitPrice"]);
		$fruit -> execute();

		//取得自動創號的key值
		$fruitTypeNo = $pdo->lastInsertId();

		//先檢查images資料夾存不存在
		if( file_exists("../images/cusFruits") === false){
			mkdir("../images/cusFruits");
		}
		//將檔案copy到要放的路徑
		$fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
		$fileName = "{$fruitTypeNo}.{$fileInfoArr["extension"]}";  //8.gif

		$from = $_FILES["upFile"]["tmp_name"];
		$to = "../images/cusFruits/$fileName";
		if(copy( $from, $to)===true){
			//將檔案名稱寫回資料庫
			$sql2 = "update `fruit_type` set fruitTypePic = :fruitTypePic where fruitTypeNo = $fruitTypeNo";
			$fruit = $pdo->prepare($sql2);
			$fruit -> bindValue(":fruitTypePic", $fileName);
			$fruit -> execute();
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
