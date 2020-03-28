<?php

include "db_connect.php";

if (isset($_GET["artistID"])) {
	$artistID = intval($_GET["artistID"]);
	$query_artist_info = "SELECT name, description, image, twitter, facebook, instagram, webpage FROM artists WHERE artistID=:artistID";
	$status_PHP = get_artist_info($query_artist_info, $artistID, $corcheitas_db);
	die(json_encode($status_PHP));
}

$query_artist_list = "SELECT artistID, name, description, image FROM artists WHERE verificado=1";

$status_PHP = get_artist_list($query_artist_list, $corcheitas_db);
die(json_encode($status_PHP));

function get_artist_info ($query_artist_info, $artistID, $corcheitas_db) {

	$resultado = $corcheitas_db -> prepare($query_artist_info);
	$resultado -> execute(array(":artistID" => $artistID));

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$artist_info = $resultado -> fetch(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $artist_info
		);
	}

	return $status_PHP;

}

function get_artist_list ($query_artist_list, $corcheitas_db) {

	$resultado = $corcheitas_db -> query($query_artist_list);

	if ($resultado === false) {
		$status_PHP = array(
			"err" => true,
			"msg" => "No se ha podido realizar la consulta"
		);
	} else {
		$artist_list["artists"] = $resultado -> fetchAll(PDO::FETCH_ASSOC);
		$status_PHP = array(
			"err" => false,
			"msg" => $artist_list
		);
	}

	return $status_PHP;

}
