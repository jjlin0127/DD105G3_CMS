<?php 
try {
	require_once("connectHomeServer");

	$sql = "INSERT INTO `administrator` (`adminId`, `adminPsw`, `adminAuthority`) 
			values(:adminId, :adminPsw, :adminAuthority)";
	$admin = $pdo->prepare($sql);
	$admin -> bindValue(":adminId", $_POST["adminId"]);
	$admin -> bindValue(":adminPsw", $_POST["adminPsw"]);
	$admin -> bindValue(":adminAuthority", $_POST["adminAuthority"]);
	$admin -> execute();
	
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
	echo "錯誤訊息 : " . $e->getMessage() . "<br>";
	// echo "系統暫時連不上請聯絡維護人員";
}
?>  