<?php 
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	$formato_permitido = array('video/x-flv');
	echo "<pre>";
	//obtener nombres de archivos subidos
	//print_r($_FILES["archivo1"]);
	//print_r($_FILES["archivo2"]);
	print_r($_FILES);
	echo "</pre>";
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
		if (($tipo != "") && (!in_array($tipo, $formato_permitido))){
			die("ERROR");
		}
		if ($error == 0){
			$nuevo_archivo = array("name" => preg_replace('/\\.[^.\\s]{3,4}$/', '', $nombre) , "type" => $tipo, "tmp_name" => $dir, "size" => $size);
			array_push($to_convert,$nuevo_archivo);
		}
	}
	echo "cantidad de archivos validos: ".count($to_convert);
	echo "<br>";
	//Para todos los archivos, ejecutar el comando avconv correspondiente y guardar resultado en carpeta temporal
	$tmp_dir = "/tmp/conversor";
	shell_exec("rm -r ".$tmp_dir."");
	for ($i = 0; $i < count($to_convert); $i++){
		$archivo_actual = $to_convert[$i];
		//crear directorio temporal
		shell_exec("mkdir -p $tmp_dir");
		//convertir archivos y guardar en directorio temporal
		shell_exec("avconv -i ".$archivo_actual["tmp_name"]." -c:v libx264 -crf 23 -c:a aac -strict experimental -q:a 100 $tmp_dir/".$archivo_actual['name'].".mp4");
	    $nuevo_nombre = $archivo_actual['name'].".mp4";
	    $nuevo_full = $tmp_dir."/".$nuevo_nombre;
	    echo $nuevo_full;
		//shell_exec("rm -r $tmp_dir");
	}
	//tomar los resultados, comprimir en zip (si es mas de 1) y ofrecer para descargar
	$generado_full = $tmp_dir."/generado.zip";
	$generado = basename($generado_full);
	shell_exec("cd ".$tmp_dir." ; zip ".$generado." *");
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
//comando: avconv -i test.flv -c:v libx264 -crf 23 -c:a aac -strict experimental -q:a 100 testavconv.mp4
 ?>