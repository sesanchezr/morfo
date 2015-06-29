<?php 
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	$formato_permitido = array('video/x-flv');
	// echo "<pre>";
	// //obtener nombres de archivos subidos
	// //print_r($_FILES["archivo1"]);
	// //print_r($_FILES["archivo2"]);
	// print_r($_FILES);
	// print_r($_POST);
	// echo "</pre>";
	$n_archivos = count($_FILES['archivos']['name']);
	$to_convert = array();
	//Recorrer todos los archivos adjuntos, filtrar los que tienen error, y los que no tienen formato flv.
	// EN UN FUTURO CHEQUEAR SI SUBIERON UNO REPETIDO. POR AHORA NO IMPLEMENTADO.
	//$arr_name_archivos = $_FILES['archivos']['name'];
	for ($i = 0; $i < $n_archivos ; $i++){
		$tipo 	= $_FILES['archivos']['type'][$i];
		$nombre = $_FILES['archivos']['name'][$i];
		$error 	= $_FILES['archivos']['error'][$i];
		$dir 	= $_FILES['archivos']['tmp_name'][$i];
		$size 	= $_FILES['archivos']['size'][$i];
		$resol 	= $_POST['resol'][$i];
		if (($tipo != "") && (!in_array($tipo, $formato_permitido))){
			die("ERROR");
		}
		if ($error == 0){
			$nuevo_archivo = array("name" => preg_replace('/\\.[^.\\s]{3,4}$/', '', $nombre) , "type" => $tipo, "tmp_name" => $dir, "size" => $size, "resol" => $resol);
			array_push($to_convert,$nuevo_archivo);
		}
	}
	echo "cantidad de archivos validos: ".count($to_convert);
	echo "<br>";
	//Para todos los archivos, ejecutar el comando ffmpeg correspondiente y guardar resultado en carpeta temporal
	$tmp_dir = "/tmp/conversor";
	mkdir($tmp_dir);
	shell_exec("rm ".$tmp_dir."/*");
	for ($i = 0; $i < count($to_convert); $i++){
		$archivo_actual = $to_convert[$i];
		//crear directorio temporal
		//shell_exec("mkdir -p $tmp_dir");
		//$chmod=shell_exec("chmod 777 $tmp_dir");
		//echo $chmod;
		//convertir archivos y guardar en directorio temporal
		$video_size = $archivo_actual['resol'] != "defecto" ? " -s ".$archivo_actual['resol']." " : "";
		#shell_exec("avconv -i ".$archivo_actual["tmp_name"]." -c:v libx264 $video_size -crf 23 -c:a aac -strict experimental -q:a 100 $tmp_dir/".$archivo_actual['name'].".mp4");
		shell_exec("ffmpeg -i ".$archivo_actual["tmp_name"]." -c:v libx264 $video_size -crf 23 -c:a libfaac -q:a 100 $tmp_dir/".$archivo_actual['name'].".mp4");
	    $nuevo_nombre = $archivo_actual['name'].".mp4";
	    $nuevo_full = $tmp_dir."/".$nuevo_nombre;
	    echo $nuevo_full;
		//shell_exec("rm -r $tmp_dir");
	}
	//tomar los resultados, comprimir en zip (si es mas de 1) y ofrecer para descargar
	$path_generado = $tmp_dir."/generado.zip";
	// path relativo
	$path_generado_rel = basename($path_generado);
	#shell_exec("cd ".$tmp_dir." ; zip ".$tmp_dir."/".$generado." *");
	# Borrar cualquier zip anterior
	shell_exec("rm $path_generado");
	# Comprimir archivos convertidos
	shell_exec("cd $tmp_dir; zip $path_generado *");
	header("Location: generado.zip");
	exit;
	/*header($_SERVER['SERVER_PROTOCOL'].' 200 OK');
	header("Content-Description: File Transfer");
	header('Content-Type: application/zip');
	header('Content-Disposition: attachment; filename="'.$generado.'"');
	//header('Pragma: no-cache');
	header("Content-Transfer-Encoding: binary");
	header('Content-Length: '.filesize($generado_full));
	header('Connection: close');
	readfile($generado_full);
	exit();*/
//DEPRECADO comando: avconv -i test.flv -c:v libx264 -crf 23 -c:a aac -strict experimental -q:a 100 testavconv.mp4
// AHORA EL COMANDO ES: ffmpeg -i video.flv  -c:v libx264 -c:a libfaac -q:a 100 -crf 23 nuevovideo.mp4
 ?>