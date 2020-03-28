<?php 
session_start();
	if( isset($_SESSION["adminId"])){//已登入
    	$admin = ["adminNo"=>$_SESSION["adminNo"], "adminId"=>$_SESSION["adminId"], "adminAuthority"=>$_SESSION["adminAuthority"]];
		echo json_encode($admin);
	}else{
		echo "error";
	}
?>