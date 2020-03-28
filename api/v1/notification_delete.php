<?php

include "db_connect.php";
session_start();

if(isset($_SESSION["artistID"])) {
	$artistID = $_SESSION["artistID"];
}

if(isset($artistID, $_POST["notificationID"])) {
	$notificationID = $_POST["notificationID"];
	$notification_exists = existing_notification($artistID, $notificationID, $corcheitas_db);
	
	if($notification_exists["err"]) {
		die(json_encode($notification_exists));
	} else {
		$status_PHP = delete_notification($artistID, $notificationID, $corcheitas_db);
		die(json_encode($status_PHP));
	}
} else if(isset($artistID)) {
	$status_PHP = array(
		"err" => true,
		"msg" => "Introduce una notificacion a eliminar"
		);
	die(json_encode($status_PHP));
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario ser artista para utilizar esta funcion"
	);
	die(json_encode($status_PHP));
}

function existing_notification ($artistID, $notificationID, $corcheitas_db) {
	$query_check_notification = "SELECT COUNT(notificationID) FROM notification_index WHERE artistID=:artistID AND notificationID=:notificationID";
	$resultado = $corcheitas_db -> prepare($query_check_notification);
	$data = array(
		":artistID" => $artistID,
		":notificationID" => $notificationID
		);
	$resultado -> execute($data);
	$notification_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($notification_exists[0]) == 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No existe esa notificacion"
			      );
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
			      );
	}

	return $status_PHP;
}

function delete_notificatin ($artistID, $notificationID, $corcheitas_db) {
	$query_delete_notification = "DELETE FROM notification_index WHERE artistID=:artistID AND notificationID=:notificationID";
	$resultado = $corcheitas_db -> prepare($query_delete_notification);
	$data = array(
		":artistID" => $artistID,
		":notificationID" => $notificationID
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
			"msg" => "Notificacion eliminada con exito"
			);
	}
	
	return $status_PHP;
	
}	

 ?>
