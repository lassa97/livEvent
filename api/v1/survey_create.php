<?php

header("Content-type: application/json");

include "db_connect.php";

session_start();

if(isset($_SESSION["artistID"])) {
	$artistID = $_SESSION["artistID"];
}

if (isset($artistID, $_GET["eventID"], $_GET["date"])) {
	$eventID = intval($_GET["eventID"]);
	$date = strval($_GET["date"]);

	if (isset($_GET["duration"])) {
		$duration = strval($_GET["duration"]);
	} else {
		$duration = "05:00:00";
	}

	$survey_exists = existing_survey($artistID, $eventID, $corcheitas_db);

	if ($survey_exists["err"]) {
		die(json_encode($survey_exists));
	} else {
		$status_PHP = register_survey($artistID, $eventID, $date, $duration, $corcheitas_db);
		die(json_encode($status_PHP));
	}
}

if (isset($artistID)) {
	$query_event_list = "SELECT eventID, name, description, image, date, duration FROM events WHERE artistID=:artistID";
	$status_PHP = get_event_list($query_event_list, $artistID, $corcheitas_db);
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario ser artista para poder usar esta funcionalidad"
	);
}

die(json_encode($status_PHP));

function get_event_list ($query_event_list, $artistID, $corcheitas_db) {

	$resultado = $corcheitas_db -> prepare($query_event_list);
	$resultado -> execute(array(":artistID" => $artistID));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$event_list = $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $event_list
		);
	}

	return $status_PHP;
}

function existing_survey ($artistID, $eventID, $corcheitas_db) {
	$query_check_survey = "SELECT COUNT(surveyID) FROM survey_index WHERE artistID=:artistID AND eventID=:eventID";
	$resultado = $corcheitas_db -> prepare($query_check_survey);
	$resultado -> execute(array(":artistID" => $artistID, ":eventID" => $eventID));
	$survey_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($survey_exists[0]) != 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ya existe una encuesta para ese evento"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}

	return $status_PHP;
}

function register_survey ($artistID, $eventID, $date, $duration, $corcheitas_db) {
	$query_survey_create = "INSERT INTO survey_index (artistID, eventID, date, duration) VALUES (:artistID, :eventID, :date, :duration)";
	$resultado = $corcheitas_db -> prepare($query_survey_create);
	$resultado -> execute(array(":artistID" => $artistID, ":eventID" => $eventID, ":date" => $date, ":duration" => $duration));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "Encuesta creada correctamente"
		);
	}

	return $status_PHP;
}
