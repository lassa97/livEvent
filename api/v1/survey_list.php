<?php

include "db_connect.php";

$survey_data = ($_GET);

if (isset($survey_data["artistID"])) {
 	$artistID = intval($_GET["artistID"]);
	$query_survey_info = "SELECT survey_index.surveyID, events.name, events.image, events.description FROM events INNER JOIN survey_index ON survey_index.eventID = events.eventID WHERE events.artistID=:artistID";
	$status_PHP = get_survey_info($query_survey_info, $artistID, $corcheitas_db);
	die(json_encode($status_PHP));
}

$query_survey_list = "SELECT survey_index.surveyID, events.name, events.image, events.description FROM events INNER JOIN survey_index ON survey_index.eventID = events.eventID WHERE survey_index.date < NOW() AND  DATE_ADD(survey_index.date,INTERVAL 4 HOUR) > NOW()";


//$query_survey_list = "SELECT survey_index.surveyID, events.name, events.image, events.description FROM events INNER JOIN survey_index ON survey_index.eventID = events.eventID";

$status_PHP = get_survey_list($query_survey_list, $corcheitas_db);
die(json_encode($status_PHP));

function get_survey_info($query_survey_info, $artistID, $corcheitas_db) {

	$resultado = $corcheitas_db -> prepare($query_survey_info);
	$resultado -> execute(array(":artistID" => $artistID));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$survey_info["surveys"] = $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $survey_info
		);
	}

	return $status_PHP;
}

function get_survey_list ($query_survey_list, $corcheitas_db) {

	$resultado = $corcheitas_db -> query($query_survey_list);

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$survey_list["surveys"] = $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $survey_list
		);
	}

	return $status_PHP;

}

 ?>
