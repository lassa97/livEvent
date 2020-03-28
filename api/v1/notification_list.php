<?php

include "db_connect.php";

$notification_data = ($_POST);

$artista=$_GET;

if (isset($notification_data["artistID"], $notification_data["eventID"])) {

	$query_notification_list = "SELECT notifications.notificationID, notifications.title, notifications.description, notifications.image AS notificationimage, artists.name, artists.image AS artistimage FROM notifications INNER JOIN notification_index ON notifications.notificationID = notification_index.notificationID INNER JOIN artists ON notification_index.artistID = artists.artistID WHERE notification_index.artistID=:artistID AND notification_index.eventID=:eventID";

	$resultado = $corcheitas_db -> prepare($query_notification_list);
	$data = array(
		":artistID" => intval($notification_data["artistID"]),
		":eventID" => intval($notification_data["eventID"])
	);
	$resultado -> execute($data);

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$notification_list["notifications"] =  $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"info" => $notification_list
		);
	}

} elseif (isset($notification_data["notificationID"])) {
	$notificationID = intval($notification_data["notificationID"]);
	$query_notification_info = "SELECT title, description, image FROM notifications WHERE notificationID=:notificationID";
	$status_PHP = get_notification_info($query_notification_info, $notificationID, $corcheitas_db);

}elseif(isset($artista["artistID"])){
		
	$query_notification_list = "SELECT notifications.notificationID, notifications.title, notifications.description, notifications.image AS notificationimage, artists.name, artists.image AS artistimage FROM notifications INNER JOIN notification_index ON notifications.notificationID = notification_index.notificationID INNER JOIN artists ON notification_index.artistID = artists.artistID WHERE notification_index.artistID=:artistID";

	$resultado = $corcheitas_db -> prepare($query_notification_list);
	$data = array(
		":artistID" => intval($artista["artistID"]),
	);
	$resultado -> execute($data);

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$notification_list["notifications"] =  $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"info" => $notification_list
		);
	}

	
}else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Selecciona un evento"
	);

}
die(json_encode($status_PHP));

function get_notification_info ($query_notification_info, $notificationID, $corcheitas_db) {

	$resultado = $corcheitas_db -> prepare($query_notification_info);
	$resultado -> execute(array(":notificationID" => $notificationID));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$notification_info = $resultado -> fetch(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $notification_info
		);
	}

	return $status_PHP;

}

 ?>
