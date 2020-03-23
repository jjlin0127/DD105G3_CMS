<?php
try{
  require_once("connectHomeserver.php");
  $sql = "select * from `administrator` where adminId = :adminId and adminPsw = :adminPsw";
  $admin = $pdo->prepare($sql);
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

    //送出登入者的姓名資料
    // $admin = ["adminNo"=>$_SESSION["adminNo"], "adminId"=>$_SESSION["adminId"], "adminAuthority"=>$_SESSION["adminAuthority"]];
    // echo json_encode($admin);

  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>