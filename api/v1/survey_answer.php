<?php

include "db_connect.php";

session_start();

$answer_data = ($_POST);

$answer_data = get_answer_data($answer_data);

if(isset($_SESSION["IMEI"])) {
	$answer_data["IMEI"] = $_SESSION["IMEI"];
}



if(isset($answer_data["surveyID"], $answer_data["IMEI"], $answer_data["score"])) {

	$answer_exists = existing_answer($answer_data["surveyID"], $answer_data["IMEI"], $corcheitas_db);

	if ($answer_exists["err"]) {
		die(json_encode($answer_exists));
	} else {
		$status_PHP = register_answer($answer_data, $corcheitas_db);
		die(json_encode($status_PHP));
	}

} else if (isset($answer_data["IMEI"])) {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir una puntuacion"
	);
	die(json_encode($status_PHP));
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario estar registrado para poder usar esta funcionalidad"
	);
	die(json_encode($status_PHP));
}

die(json_encode($answer_data));

function get_answer_data ($answer_data) {
	isset($answer_data["surveyID"]) ? intval($answer_data["surveyID"]) : $answer_data["surveyID"] = null;
	isset($answer_data["score"]) ? intval($answer_data["score"]) : $answer_data["score"] = null;
	isset($answer_data["opinion"]) ? strval($answer_data["opinion"]) : $answer_data["opinion"] = null;

	return $answer_data;
}

function existing_answer ($surveyID, $IMEI, $corcheitas_db) {
	$query_check_answer = "SELECT COUNT(userID) FROM surveys WHERE surveyID=:surveyID AND userID=(SELECT userID FROM users WHERE IMEI=:IMEI)";
	$resultado = $corcheitas_db -> prepare($query_check_answer);
	$resultado -> execute(array(":surveyID" => $surveyID, ":IMEI" => $IMEI));
	$answer_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($answer_exists[0] != 0)) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ya existe una respuesta a este evento"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}

	return $status_PHP;
}

function register_answer ($answer_data, $corcheitas_db) {

	$query_answer_create = "INSERT INTO surveys (surveyID, userID, score, opinion) VALUES (:surveyID, (SELECT userID FROM users WHERE IMEI=:IMEI), :score, :opinion)";

	$resultado = $corcheitas_db -> prepare($query_answer_create);

	$data = array(
		":surveyID" => $answer_data["surveyID"],
		":IMEI" => $answer_data["IMEI"],
		":score" => $answer_data["score"],
		":opinion" => $answer_data["opinion"]
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
			"msg" => "Respuesta registrada correctamente"
		);
	}

	return $status_PHP;
}

 ?>
