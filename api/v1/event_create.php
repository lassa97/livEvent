<?php

include "db_connect.php";

session_start();

$event_data = ($_POST);

$event_data = get_event_data($event_data);

if(isset($_SESSION["artistID"])) {
	$event_data["artistID"] = $_SESSION["artistID"];
}

if(isset($event_data["artistID"], $event_data["name"], $event_data["description"], $event_data["date"], $event_data["localization"])) {
	
	$event_exists = existing_event($event_data["artistID"], $event_data["name"], $event_data["date"], $corcheitas_db);
	if ($event_exists["err"]) {
		die(json_encode($event_exists));
	} else {
		$status_PHP = register_event($event_data, $corcheitas_db);
		die(json_encode($status_PHP));
	}

} else if (isset($event_data["artistID"])) {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir nombre, descripcion, fecha y localizacion del evento"
	);
	die(json_encode($status_PHP));
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario ser artista para utilizar esta funcion"
	);
	die(json_encode($status_PHP));
}

function get_event_data ($event_data) {

	isset($event_data["name"]) ? strval($event_data["name"]) : $event_data["name"] = null;
	isset($event_data["description"]) ? strval($event_data["description"]) : $event_data["description"] = null;
	isset($event_data["image"]) ? strval($event_data["image"]) : $event_data["image"] = null;
	isset($event_data["date"]) ? strval($event_data["date"]) : $event_data["date"] = null;
	isset($event_data["duration"]) ? strval($event_data["duration"]) : $event_data["duration"] = "02:00:00";
	isset($event_data["localization"]) ? strval($event_data["localization"]) : $event_data["localization"] = null;
	isset($event_data["tickets"]) ? strval($event_data["tickets"]) : $event_data["tickets"] = null;

	return $event_data;

}

function existing_event ($artistID, $name, $date, $corcheitas_db) {
	$query_check_event = "SELECT COUNT(name) FROM events WHERE artistID=:artistID && name=:name && date=:date";
	$resultado = $corcheitas_db -> prepare($query_check_event);
	$data = array(
		":artistID" => $artistID,
		":name" => $name,
		":date" => $date
		);
	$resultado -> execute($data);
	$event_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($event_exists[0]) != 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ya existe ese evento"
			      );
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
			      );
	}

	return $status_PHP;
}

function register_event ($event_data, $corcheitas_db) {

	$event_data["eventID"] = get_event_id($corcheitas_db);

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
				$event_data["image"] = null;
			} else {
				move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/vhosts/livevent.es/httpdocs/img/events/" . $event_data["eventID"] . "." . $ext);
				$event_data["image"] = "img/events/" . $event_data["eventID"] . "." . $ext;
			}
		}
	}

	$query_event_create = "INSERT INTO events (artistID, name, description, image, date, duration, localization, tickets) VALUES (:artistID, :name, :description, :image, :date, :duration, :localization, :tickets)";

	$data = array(
		":artistID" => $event_data["artistID"],
		":name" => $event_data["name"],
		":description" => $event_data["description"],
		":image" => $event_data["image"],
		":date" => $event_data["date"],
		":duration" => $event_data["duration"],
		":localization" => $event_data["localization"],
		":tickets" => $event_data["tickets"]
		);

	$resultado = $corcheitas_db -> prepare($query_event_create);
	$resultado -> execute($data);

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$created = create_event_survey($event_data);
		
		if($created) {
			$status_PHP = array(
				"err" => false,
				"msg" => "Evento y encuesta creadas correctamente",
				"name" => $event_data["name"]
				);
		} else {
			$status_PHP = array(
				"err" => false,
				"msg" => "Evento creado correctamente, encuesta no creada",
				"name" => $event_data["name"]
				);
		}
	}
	
	return $status_PHP;

}

function get_event_id ($corcheitas_db) {

	$query_event_id = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'events' AND table_schema = DATABASE()";

	$resultado = $corcheitas_db -> query($query_event_id);
	$eventID = $resultado -> fetch(PDO::FETCH_NUM);
	$eventID = intval($eventID[0]);

	return $eventID;

}

function create_event_survey ($event_data) {
	
	$create_survey = curl_init();
	$url = "https://livevent.es/api/v1/survey_create.php";
	$params = array(
		"eventID" => $event_data["eventID"],
		"date" => $event_data["date"]
		);
	$query = http_build_query($params);
	curl_setopt($create_survey, CURLOPT_URL, "$url?$query");
	curl_setopt($create_survey, CURLOPT_COOKIE, "PHPSESSID=" . $_COOKIE["PHPSESSID"]);
	curl_setopt($create_survey, CURLOPT_VERBOSE, true);
	curl_setopt($create_survey, CURLOPT_RETURNTRANSFER, true);
	
	session_write_close();
	
	$server_response = curl_exec($create_survey);
	curl_close($create_survey);
			
	$server_response = json_decode($server_response, true);
	
	if ($server_response["err"]) {
		return false;
	} else {
		return true;
	}
	
}

 ?>
