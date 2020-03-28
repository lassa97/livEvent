<?php

include "db_connect.php";

session_start();
	
$artist_data = ($_POST);

if(isset($artist_data["email"], $artist_data["password"])) {

	$artist_email = strval($artist_data["email"]);
	$artist_password = strval($artist_data["password"]);

	$valid_artist = existing_artist($artist_email, $artist_password, $corcheitas_db);

	if ($valid_artist["err"]) {
		die(json_encode($valid_artist));
	} else {
		$_SESSION["artistID"] = $valid_artist["artistID"];
		$_SESSION["name"] = $valid_artist["name"];
		die(json_encode($_SESSION));	
	}
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Debes introducir un token"
	);
	die(json_encode($status_PHP));
}

function existing_artist($artist_email, $artist_password, $corcheitas_db) {

	$query_check_credentials = "SELECT artistID, name, verificado FROM artists WHERE email=:email AND password=:password";

	$resultado = $corcheitas_db -> prepare($query_check_credentials);
	$resultado -> execute(array(":email" => $artist_email, ":password" => hash("sha512", $artist_password)));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$artist_exists = $resultado -> fetch(PDO::FETCH_ASSOC);
		if ($artist_exists === false) {
			$status_PHP = array(
				"err" => true,
				"msg" => "Email o contraseña incorrectas"
			);
		}else if($artist_exists['verificado']!=1){
			$status_PHP = array(
				"err" => true,
				"msg" => "No verificado"
			);
		}else {
			$status_PHP = array(
				"err" => false,
				"name" => $artist_exists["name"],
				"artistID" => $artist_exists["artistID"]
			);
		}
	}

	return $status_PHP;
}

 ?>
