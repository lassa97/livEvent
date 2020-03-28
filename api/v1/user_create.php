<?php

include "db_connect.php";

$user_data = ($_POST);

$user_data = get_user_data($user_data);


if(isset($user_data["IMEI"])) {

	$user_exists = existing_user($user_data["IMEI"], $corcheitas_db);

	if ($user_exists["err"]) {
		die(json_encode($user_exists));
	} else {
		$status_PHP = register_user($user_data, $corcheitas_db);

		die(json_encode($status_PHP));
	}
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir un IMEI"
	);
	die(json_encode($status_PHP));
}

function get_user_data ($user_data) {
	isset($user_data["IMEI"]) ? strval($user_data["IMEI"]) : $user_data["IMEI"] = null;
	isset($user_data["email"]) ? strval($user_data["email"]) : $user_data["email"] = null;
	isset($user_data["password"]) ? strval($user_data["password"]) : $user_data["password"] = null;
	isset($user_data["image"]) ? strval($user_data["image"]) : $user_data["image"] = null;

	return $user_data;
}

function existing_user ($IMEI, $corcheitas_db) {
	$query_check_IMEI = "SELECT COUNT(IMEI) FROM users WHERE IMEI=:IMEI";
	$resultado = $corcheitas_db -> prepare($query_check_IMEI);
	$resultado -> execute(array(":IMEI" => $IMEI));
	$user_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($user_exists[0] != 0)) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ese usuario ya esta registrado"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}

	return $status_PHP;
}

function register_user ($user_data, $corcheitas_db) {
	$query_user_create = "INSERT INTO users (IMEI, email, password, image) VALUES (:IMEI, :email, :password, :image)";

	$resultado = $corcheitas_db -> prepare($query_user_create);

	$data = array(
		":IMEI" => $user_data["IMEI"],
		":email" => $user_data["email"],
		":password" => hash("sha512", $user_data["password"]),
		":image" => $user_data["image"]
	);

	$resultado -> execute($data);

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "Usuario creado correctamente"
		);
	}

	return $status_PHP;

}
