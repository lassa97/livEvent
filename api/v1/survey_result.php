<?php

include "db_connect.php";

session_start();

$survey_data = ($_GET);

if(isset($_SESSION["artistID"])) {
	$survey_data["artistID"] = $_SESSION["artistID"];
}

if (isset($survey_data["surveyID"], $survey_data["artistID"])) {

	$valid_event = validate_event(intval($survey_data["surveyID"]), intval($survey_data["artistID"]), $corcheitas_db);

	if ($valid_event["err"]) {
		die(json_encode($valid_event));
	} else {

		$query_survey_info = "SELECT COUNT(score) FROM surveys WHERE surveyID=:surveyID AND score=:score";

		$query_survey_comments = "SELECT opinion FROM surveys WHERE surveyID=:surveyID AND opinion IS NOT NULL";

		for ($i = 0; $i <= 10; $i++) {
			$resultado = $corcheitas_db -> prepare($query_survey_info);
			$data = array(
				":surveyID" => intval($survey_data["surveyID"]),
				":score" => $i
			);

			$resultado -> execute($data);

			$score = $resultado -> fetch(PDO::FETCH_NUM);

			$survey_info[$i] = intval($score[0]);
		}

		$resultado = $corcheitas_db -> prepare($query_survey_comments);
		$resultado -> execute(array(":surveyID" => intval($survey_data["surveyID"])));

		if ($resultado === false) {
			$status_PHP = array(
				"err" => true,
				"msg" => "No se ha podido realizar la consulta"
			);

		} else {
			$survey_comments["opinions"] = $resultado -> fetchAll(PDO::FETCH_ASSOC);


			$status_PHP = array(
				"err" => false,
				"msg" => $survey_info,
				"comments" => $survey_comments
			);
		}
	}

} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir un evento"
	);
}

die(json_encode($status_PHP, JSON_FORCE_OBJECT));

function validate_event ($surveyID, $artistID, $corcheitas_db) {
	$query_check_survey = "SELECT COUNT(surveyID) FROM survey_index WHERE surveyID=:surveyID AND artistID=:artistID";
	
	$resultado = $corcheitas_db -> prepare($query_check_survey);
	$data = array(
		":surveyID" => $surveyID,
		":artistID" => $artistID
	);
	//print($surveyID." ".$artistID);
	$resultado -> execute($data);

	$survey_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($survey_exists[0]) == 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Introduce una encuesta valida"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}

	return $status_PHP;
}

 ?>
