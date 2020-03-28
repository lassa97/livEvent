<?php

include "db_connect.php";

session_start();

if(isset($_SESSION["artistID"])) {
	$artistID = $_SESSION["artistID"];
}

$event_data = ($_POST);

$event_data = get_event_data($event_data);

if(isset($artistID, $event_data["eventID"]) && (count(array_filter($event_data)) >= 2 || (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0))) {
	$valid_event = validate_event($artistID, $event_data["eventID"], $corcheitas_db);

	if ($valid_event["err"]) {
		die(json_encode($valid_event));
	} else {
		$status_PHP = edit_event_data($artistID, $event_data, $corcheitas_db);
	}
} else if (isset($artistID)) {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir algún campo a modificar"
	);
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario ser artista para poder usar esta funcionalidad"
	);
}

die(json_encode($status_PHP));


function get_event_data ($event_data) {

	isset($event_data["eventID"]) ? intval($event_data["eventID"]) : $event_data["eventID"] = null;
	isset($event_data["name"]) ? strval($event_data["name"]) : $event_data["name"] = null;
	isset($event_data["description"]) ? strval($event_data["description"]) : $event_data["description"] = null;
	isset($event_data["image"]) ? strval($event_data["image"]) : $event_data["image"] = null;
	isset($event_data["date"]) ? strval($event_data["date"]) : $event_data["date"] = null;
	isset($event_data["duration"]) ? strval($event_data["duration"]) : $event_data["duration"] = null;
	isset($event_data["localization"]) ? strval($event_data["localization"]) : $event_data["localization"] = null;
	isset($event_data["tickets"]) ? strval($event_data["tickets"]) : $event_data["tickets"] = null;

	return $event_data;
}

function validate_event ($artistID, $eventID, $corcheitas_db) {

	$query_check_event = "SELECT COUNT(name) FROM events WHERE artistID=:artistID AND eventID=:eventID";

	$resultado = $corcheitas_db -> prepare($query_check_event);
	$data = array(
		":artistID" => $artistID,
		":eventID" => $eventID
	);
	$resultado -> execute($data);
	$event_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($event_exists[0]) == 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Selecciona un evento correcto"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}

	return $status_PHP;

}

function edit_event_data ($artistID, $event_data, $corcheitas_db) {
	if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
		$allowed = array(
			"jpg" => "image/jpg",
			"jpeg" => "image/jpeg",
			"gif" => "image/gif",
			"png" => "image/png"
		);

		$filename = $_FILES["image"]["name"];
		$filetype = $_FILES["image"]["type"];
		$filesize = $_FILES["image"]["size"];

		$maxsize = 5 * 1024 * 1024;

		$ext = pathinfo($filename, PATHINFO_EXTENSION);
		if (!array_key_exists($ext, $allowed) && $filesize > $maxsize) {
			$event_data["image"] = null;
		}

		if (in_array($filetype, $allowed)) {
			if (file_exists("img/events/" . $event_data["eventID"] . "." . $ext)) {
				unlink(realpath("img/events/" . $event_data["eventID"] . "." . $ext));
			}
			move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/vhosts/livevent.es/httpdocs/img/events/" . $event_data["eventID"] . "." . $ext);
			$event_data["image"] = "img/events/" . $event_data["eventID"] . "." . $ext;
		}
	}

	$event_data = array_filter($event_data);
	$eventID = $event_data["eventID"];

	foreach ($event_data as $index => $value) {
		if ($index == "eventID") {
			continue;
		}
		$query_edit_field = "UPDATE events SET {$index}=:value WHERE artistID=:artistID AND eventID=:eventID";
		$resultado = $corcheitas_db -> prepare($query_edit_field);
		$data = array(
			":value" => $value,
			":artistID" => $artistID,
			":eventID" => $eventID
		);
		$resultado -> execute($data);

		if ($resultado === false) {
			$status_PHP = array(
				"err" => true,
				"msg" => "No se ha podido realizar la consulta"
			);
			return $status_PHP;
		}
	}

	$status_PHP = array(
		"err" => false,
		"msg" => "Evento editado correctamente"
	);

	return $status_PHP;

}

 ?>
