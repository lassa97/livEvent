<?php

include "db_connect.php";

session_start();

$notification_data = ($_POST);

if(isset($_SESSION["artistID"])) {
	$notification_data["artistID"] = $_SESSION["artistID"];
}

$notification_data = get_notification_data($notification_data);

if (isset($notification_data["artistID"], $notification_data["eventID"], $notification_data["title"])) {

	$valid_notification = validate_notification($notification_data["artistID"], $notification_data["eventID"], $corcheitas_db);

	if ($valid_notification["err"]) {
		die(json_encode($valid_notification));
	} else {
		$status_PHP = register_notification($notification_data, $corcheitas_db);
		die(json_encode($status_PHP));
	}
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir un titulo"
	);
	die(json_encode($status_PHP));
}

function get_notification_data ($notification_data) {
	isset($notification_data["eventID"]) ? intval($notification_data["eventID"]) : $notification_data["eventID"] = null;
	isset($notification_data["title"]) ? strval($notification_data["title"]) : $notification_data["title"] = null;
	isset($notification_data["description"]) ? intval($notification_data["description"]) : $notification_data["description"] = null;
	isset($notification_data["image"]) ? intval($notification_data["image"]) : $notification_data["image"] = null;

	return $notification_data;
}

function validate_notification ($artistID, $eventID, $corcheitas_db) {

	$query_check_notification = "SELECT COUNT(title) FROM notifications WHERE artistID=:artistID AND eventID=:eventID";
	$resultado = $corcheitas_db -> prepare($query_check_notification);
	$data = array(
		":artistID" => $artistID,
		":eventID" => $eventID
	);
	$resultado -> execute($data);
	$notification_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($notification_exists[0]) >= 3) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ya existen otras notificaciones para ese evento"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}
	return $status_PHP;

}

function register_notification ($notification_data, $corcheitas_db) {
	
	$query_notification_create = "INSERT INTO notification_index (artistID, eventID) VALUES (:artistID, :eventID)";
	$resultado = $corcheitas_db -> prepare($query_notification_create);
	$resultado -> execute(array(":artistID" => $notification_data["artistID"], ":eventID" => $notification_data["eventID"]));

	$notification_data["notificationID"] = $corcheitas_db -> lastInsertId();
	
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
			$notification_data["image"] = null;
		}

		if (in_array($filetype, $allowed)) {
			if (file_exists("img/notifications/" . $notification_data["notificationID"] . "." . $ext)) {
				$notification_data["image"] = null;
			} else {
				move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/vhosts/livevent.es/httpdocs/img/notifications/" . $notification_data["notificationID"] . "." . $ext);
				$notification_data["image"] = "img/notifications/" . $notification_data["notificationID"] . "." . $ext;
			}
		}
	}

	$query_notification_create = "INSERT INTO notifications (notificationID, title, description, image) VALUES (:notificationID, :title, :description, :image)";

	$resultado = $corcheitas_db -> prepare($query_notification_create);

	$data = array(
		":notificationID" => $notification_data["notificationID"],
		":title" => $notification_data["title"],
		":description" => $notification_data["description"],
		":image" => $notification_data["image"]
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
			"msg" => "Notificacion registrada correctamente"
		);
	}

	return $status_PHP;

}

 ?>
