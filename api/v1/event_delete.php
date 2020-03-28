<?php

include "db_connect.php";
session_start();

if(isset($_SESSION["artistID"])) {
	$artistID = $_SESSION["artistID"];
}

if(isset($artistID, $_POST["eventID"])) {
	$eventID = $_POST["eventID"];
	$event_exists = existing_event($artistID, $eventID, $corcheitas_db);
	
	if($event_exists["err"]) {
		die(json_encode($event_exists));
	} else {
		$status_PHP = delete_event($artistID, $eventID, $corcheitas_db);
		die(json_encode($status_PHP));
	}
} else if(isset($artistID)) {
	$status_PHP = array(
		"err" => true,
		"msg" => "Introduce un evento a eliminar"
		);
	die(json_encode($status_PHP));
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario ser artista para utilizar esta funcion"
	);
	die(json_encode($status_PHP));
}

function existing_event ($artistID, $eventID, $corcheitas_db) {
	$query_check_event = "SELECT COUNT(name) FROM events WHERE artistID=:artistID && eventID=:eventID";
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
			"msg" => "No existe ese evento"
			      );
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
			      );
	}

	return $status_PHP;
}

function delete_event ($artistID, $eventID, $corcheitas_db) {
	$query_delete_event = "DELETE FROM events WHERE artistID=:artistID AND eventID=:eventID";
	$resultado = $corcheitas_db -> prepare($query_delete_event);
	$data = array(
		":artistID" => $artistID,
		":eventID" => $eventID
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
			"msg" => "Evento eliminado con exito"
			);
	}
	
	return $status_PHP;
	
}	

 ?>