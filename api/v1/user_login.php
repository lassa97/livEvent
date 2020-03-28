<?php

include "db_connect.php";

session_start();

$user_data = ($_POST);


if(isset($user_data["IMEI"])) {

	$user_IMEI = strval($user_data["IMEI"]);
	

	$valid_user = existing_user($user_IMEI, $corcheitas_db);

	if ($valid_user["err"]) {
		die(json_encode($valid_user));
	} else {
		$_SESSION["userID"] = $valid_user["userID"];
		$_SESSION["IMEI"] = $valid_user["IMEI"];
		die(json_encode($valid_user));
	}
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Debes introducir un token"
	);
	die(json_encode($status_PHP));
}

function existing_user ($user_IMEI, $corcheitas_db) {
	

	$query_check_credentials = "SELECT userID, IMEI FROM users WHERE IMEI=:IMEI";

	$resultado = $corcheitas_db -> prepare($query_check_credentials);
	$resultado -> execute(array(":IMEI" => $user_IMEI));
	

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$user_exists = $resultado -> fetch(PDO::FETCH_ASSOC);
		if ($user_exists === false) {
			$status_PHP = array(
				"err" => true,
				"msg" => "No existe ningún usuario con ese código"
			);
		} else {
			print("OSTIA");
			$status_PHP = array(
				"err" => false,
				"IMEI" => $user_exists["IMEI"],
				"userID" => $user_exists["userID"]
			);
		}
	}

	return $status_PHP;
}
?>