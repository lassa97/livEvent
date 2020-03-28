<?php

include "db_connect.php";

session_start();

if (isset($_GET["eventID"])) {
	$eventID = intval($_GET["eventID"]);
	$query_event_info = "SELECT artistID, name, description, image, date, duration, localization, tickets FROM events WHERE eventID=:eventID";
	$status_PHP = get_event_info($query_event_info, $eventID, $corcheitas_db);
	die(json_encode($status_PHP));
}

if (isset($_GET["artistID"])) {
	$artistID = intval($_GET["artistID"]);
	$query_events_artist_info = "SELECT eventID, name, description, image, date, duration, localization, tickets FROM events WHERE artistID=:artistID AND DATE(date)>:date ORDER BY DATE(date) ASC";
	$status_PHP = get_artist_events_info($query_events_artist_info, $artistID, $corcheitas_db);
	die(json_encode($status_PHP));
}

if (isset($_GET["flag"])) {
	$flag = intval($_GET["flag"]);
} else {
	$flag = 1;
}

$query_event_list = "SELECT eventID, name, description, image, date, duration, localization,tickets FROM events";

	switch ($flag) {
		case 0:
			$query_event_list .= " WHERE DATE(date)<:date ORDER BY DATE(date) DESC";
			$status_PHP = get_event_list($query_event_list, $corcheitas_db);			
			break;
		case 1:
			$query_event_list .= " WHERE DATE(date)=:date ORDER BY DATE(date) ASC";
			$status_PHP = get_event_list($query_event_list, $corcheitas_db);
			break;
		case 2:
			$query_event_list .= " WHERE DATE(date)>:date ORDER BY DATE(date) ASC";
			$status_PHP = get_event_list($query_event_list, $corcheitas_db);
			break;
	}

	die(json_encode($status_PHP));

function get_event_info ($query_event_info, $eventID, $corcheitas_db) {

	$resultado = $corcheitas_db -> prepare($query_event_info);
	$resultado -> execute(array(":eventID" => $eventID));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido hacer la consulta"
		);
	} else {
		$event_info = $resultado -> fetch(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $event_info
		);
	}

	return $status_PHP;
}

function get_event_list ($query_event_list, $corcheitas_db) {
	
	$resultado = $corcheitas_db -> prepare($query_event_list);
	$resultado -> execute(array(":date" => date("Y-m-d")));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido hacer la consulta"
			);
	} else {
		$event_list["events"] = $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $event_list
			);
	}

	return $status_PHP;
	
}

function get_artist_events_info ($query_events_artist_info, $artistID, $corcheitas_db) {

	$resultado = $corcheitas_db -> prepare($query_events_artist_info);
	$resultado -> execute(array(":artistID" => $artistID, ":date" => date("Y-m-d")));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido hacer la consulta"
		);
	} else {
		$events_info["events"] = $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $events_info
		);
	}

	return $status_PHP;
}
 ?>
