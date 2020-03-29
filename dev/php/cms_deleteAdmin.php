<?php 
try {
	require_once("connectHomeServer");

	$sql = "DELETE FROM `administrator` 
			where (adminNo = :adminNo)";
	$admin = $pdo->prepare($sql);
    $admin -> bindValue(":adminNo", $_POST["adminNo"]);
    $admin -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  