<?php

include "db_connect.php";
session_start();

/*
if(isset($_SESSION["userID"])){
	$user_id=$_SESSION["userID"];
}else{
	die(json_encode(array("err" => true, "msg" => "No hay una sesion iniciada")));
}
*/
$artist_data = ($_POST);

$artist_data = get_artist_data($artist_data);

if(isset($artist_data["email"], $artist_data["password"], $artist_data["name"], $artist_data["gender"])) {
		
		$artist_exists = existing_artist($artist_data["name"], $artist_data["email"], $corcheitas_db);

		if ($artist_exists["err"]) {
			die(json_encode($artist_exists));
		} else {
			$status_PHP = register_artist($artist_data, $corcheitas_db);

			send_register_info($artist_data);	#<-Coded by Oscar
			
			die(json_encode($status_PHP));
		}
} else {
	$status_PHP = array(
		"err" => true,
		"msg" => "Es necesario introducir un email, una contraseña, un nombre y un genero"
	);
	die(json_encode($status_PHP));
}

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

function existing_artist ($name, $email, $corcheitas_db) {
	$query_check_name = "SELECT COUNT(name) FROM artists WHERE name=:name";
	$resultado = $corcheitas_db -> prepare($query_check_name);
	$resultado -> execute(array(":name" => $name));
	$artist_exists = $resultado -> fetch(PDO::FETCH_NUM);
	
	$query_check_email = "SELECT COUNT(email) FROM artists WHERE email=:email";
	$resultado = $corcheitas_db -> prepare($query_check_email);
	$resultado -> execute(array(":email" => $email));
	$email_exists = $resultado -> fetch(PDO::FETCH_NUM);

	if (intval($artist_exists[0]) != 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ya existe un artista con ese nombre"
		);
	} elseif (intval($email_exists[0]) != 0) {
		$status_PHP = array(
			"err" => true,
			"msg" => "Ese email ya esta registrado"
		);
	} else {
		$status_PHP = array(
			"err" => false,
			"msg" => "OK"
		);
	}

	return $status_PHP;
}

function register_artist ($artist_data, $corcheitas_db) {


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
			$artist_data["artistID"] = get_artist_id($corcheitas_db);
			if (file_exists("img/artists/" . $artist_data["artistID"] . "." . $ext)) {
				$artist_data["image"] = null;
			} else {
				move_uploaded_file($_FILES["image"]["tmp_name"], "/var/www/vhosts/livevent.es/httpdocs/img/artists/" . $artist_data["artistID"] . "." . $ext);
				$artist_data["image"] = "img/artists/" . $artist_data["artistID"] . "." . $ext;
			}
		}
	}

	$query_artist_create = "INSERT INTO artists (email, password, name, gender, description, image, twitter, facebook, instagram, youtube, webpage, user_id) VALUES (:email, :password, :name, :gender, :description, :image, :twitter, :facebook, :instagram, :youtube, :webpage, :user_id)";

	$resultado = $corcheitas_db -> prepare($query_artist_create);

	$data = array(
                        ":email" => $artist_data["email"],
                        ":password" => hash("sha512", $artist_data["password"]),
                        ":name" => $artist_data["name"],
                        ":gender" => $artist_data["gender"],
                        ":description" => $artist_data["description"],
			":image" => $artist_data["image"],
			":twitter" => $artist_data["twitter"],
			":facebook" => $artist_data["facebook"],
			":instagram" => $artist_data["instagram"],
			":youtube" => $artist_data["youtube"],
			":webpage" => $artist_data["webpage"],
			":user_id" => $user_id
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
                                "msg" => "Artista creado correctamente",
                                "name" => $artist_data["name"]
                        );
		}

		return $status_PHP;
}

function get_artist_id ($corcheitas_db) {
	$query_artist_id = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'artists' AND table_schema = DATABASE()";

	$resultado = $corcheitas_db -> query($query_artist_id);
	$artistID = $resultado -> fetch(PDO::FETCH_NUM);
	$artistID = intval($artistID[0]);

	return $artistID;

}

function send_register_info($artist_data) {

	$correoFrom = "info@livevent.es";

	$headers =
        "From: ".$correoFrom ."\r\n".
        "Reply-To: ".$artist_data["email"]."\r\n".
        "X-Mailer: PHP/".phpversion().
        "MIME-Version: 1.0\r\n".
        "Content-type: text/html; charset=UTF-8\r\n";

	$asunto = "Acaba de registrarse en LIVEVENT";

	$cuerpo = "Datos de registro: Nombre artistico: ".$artist_data["name"].", que pertenece al genero musical ".$artist_data["gender"]." y que añade la siguiente descripcion: ".$artist_data["description"].". \r\n";
	$cuerpo .= "Se ha registrado con el siguiente email y contraseña: ".$artist_data["email"]." y ".$artist_data["password"].". \r\n";
	$cuerpo .= "Ademas, ha añadido las siguientes redes sociales: ";
	$cuerpo .= "Twitter: ".$artist_data["twitter"]."\r\n";
	$cuerpo .= "Facebook: ".$artist_data["facebook"]."\r\n";
	$cuerpo .= "Instagram: ".$artist_data["instagram"]."\r\n";
	$cuerpo .= "Youtube: ".$artist_data["youtube"]."\r\n";
	$cuerpo .= "Pagina web: ".$artist_data["webpage"]."\r\n";
	
	mail($correoFrom, $asunto, $cuerpo);

}

 ?>
