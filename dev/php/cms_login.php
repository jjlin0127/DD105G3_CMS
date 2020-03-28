<?php
try{
  require_once("connectSchoolServer.php");

  $sql1 = "select * from `administrator` 
          where (adminId = :adminId) and (adminPsw = :adminPsw)";
  $admin = $pdo->prepare($sql1);
  $admin -> bindValue(":adminId", $_POST["adminId"]);
  $admin -> bindValue(":adminPsw", $_POST["adminPsw"]);
  $admin -> execute();

  if($admin -> rowCount()==0){ //帳密錯誤
	  echo "error";
  }else{ //登入成功
    //自資料庫中取回資料
    $adminRow = $admin->fetch(PDO::FETCH_ASSOC);
    //寫入session
    session_start();
    $_SESSION["adminNo"] = $adminRow["adminNo"];
    $_SESSION["adminId"] = $adminRow["adminId"];
    $_SESSION["adminAuthority"] = $adminRow["adminAuthority"];

    date_default_timezone_set('Asia/Taipei');
    $lastLoginTime = date('Y-m-d H:i:s', time());
    $sql2 = "update `administrator` set `lastLoginTime` = :lastLoginTime
            where (adminId = :adminId)";
    $loginTime = $pdo->prepare($sql2);
    $loginTime -> bindValue(":adminId", $_POST["adminId"]);
    $loginTime -> bindValue(":lastLoginTime", $lastLoginTime);
    $loginTime -> execute();
    
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>