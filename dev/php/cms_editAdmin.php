<?php 
try {
	require_once("connectDeskServer.php");

    $sql = "update `administrator` set adminId = :adminId, adminPsw = :adminPsw, adminAuthority = :adminAuthority 
            where (adminNo = :adminNo)";
    $admin = $pdo->prepare($sql);
    $admin -> bindValue(":adminNo", $_POST["adminNo"]);
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