<?php

include "db_connect.php";

session_start();

$artist_data = ($_POST);

if(isset($_SESSION["artistID"])) {
	$artist_data["artistID"] = $_SESSION["artistID"];
}

$artist_data = get_artist_data($artist_data);

if(isset($artist_data["artistID"]) && (count(array_filter($artist_data)) >= 2 || (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0))) {
	$status_PHP = edit_artist_data($artist_data, $corcheitas_db);
} else if(isset($_SESSION["artistID"])) {
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

function get_artist_data ($artist_data) {

	isset($artist_data["email"]) ? strval($artist_data["email"]) : $artist_data["email"] = null;
	isset($artist_data["password"]) ? strval($artist_data["password"]) : $artist_data["password"] = null;
	isset($artist_data["name"]) ? strval($artist_data["name"]) : $artist_data["name"] = null;
	isset($artist_data["gender"]) ? strval($artist_data["gender"]) : $artist_data["gender"] = null;
	isset($artist_data["description"]) ? strval($artist_data["description"]) : $artist_data["description"] = null;
	isset($artist_data["image"]) ? strval($artist_data["image"]) : $artist_data["image"] = null;
	isset($artist_data["twitter"]) ? strval($artist_data["twitter"]) : $artist_data["twitter"] = null;
	isset($artist_data["facebook"]) ? strval($artist_data["facebook"]) : $artist_data["facebook"] = null;
	isset($artist_data["instagram"]) ? strval($artist_data["instagram"]) : $artist_data["instagram"] = null;
	isset($artist_data["youtube"]) ? strval($artist_data["youtube"]) : $artist_data["youtube"] = null;
	isset($artist_data["webpage"]) ? strval($artist_data["webpage"]) : $artist_data["webpage"] = null;

	return $artist_data;
}

function edit_artist_data ($artist_data, $corcheitas_db) {
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
			$artist_data["image"] = null;
		}

		if (in_array($filetype, $allowed)) {
			if (file_exists("img/artists/" . $artist_data["artistID"] . "." . $ext)) {
				unlink(realpath("img/artists/" . $artist_data["artistID"] . "." .$ext));
			}
			move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/vhosts/livevent.es/httpdocs/img/artists/" . $artist_data["artistID"] . "." . $ext);
			$artist_data["image"] = "img/artists/" . $artist_data["artistID"] . "." . $ext;
		}
	}

	$artist_data = array_filter($artist_data);
	$artistID = $_SESSION["artistID"];
	
	foreach ($artist_data as $index => $value) {
		if ($index == "artistID") {
			continue;
		}
		$query_edit_field = "UPDATE artists SET {$index}=:value WHERE artistID=:artistID";
		$resultado = $corcheitas_db -> prepare($query_edit_field);
		$resultado -> execute(array(":value" => $value, ":artistID" => $artistID));
		
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
		"msg" => "Artista editado correctamente"
	);

	return $status_PHP;
}

 ?>
