<?php 
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	function printError($message){
		die("ERROR: $message");
	}
	// Verificar que efectivamente llegaron archivos
	if (count($_FILES) < 2 || count($_FILES) % 2 != 0) {
		printError("no introdujo archivos");
	}
	$file_count = count($_FILES) / 2; 
	// Guardamos los archivos en un arreglo
	$lfiles = array(); $bfiles = array(); 
	for ($i=0; $i < $file_count; $i ++){
		$lfiles[$i] = $_FILES['lpartes'.($i+1)];
		$bfiles[$i] = $_FILES['bpartes'.($i+1)];
	}
	// Verificamos que los archivos sean correctos 
	for ($i=0; $i < $file_count; $i++){
		//Archivo chico y grande son distintos
		if ($lfiles[$i]['name'] == $bfiles[$i]['name'])
			printError("Archivos idénticos! Deben ser distintos.");
		// Archivos son html
		if ($lfiles[$i]['type'] != "text/html" || $bfiles[$i]['type'] != "text/html")
			printError("Archivos no válidos. Deben ser .html");
		// Archivos se recibieron sin error
		if ($lfiles[$i]['error'] != 0 || $bfiles[$i]['error'] != 0)
			printError("Problema recibiendo archivos");
	}
	// Validar que sean swiffy's (que tengan swiffycontainers)
	$regexp = "/\s+swiffyobject\s=/";
	$ltexts = array(); $lswobjs = array();
	$btexts = array(); $bswobjs = array();
	$swiffylittle = "swiffySmall_";
	$swiffybig = "swiffyBig_";
	for ($i=0; $i<$file_count; $i++){
		// little files
		$ltexts[$i] = file_get_contents($lfiles[$i]['tmp_name']);		//contenido del html
		$lswobjs[$i] = preg_grep($regexp, explode("\n",$ltexts[$i]));	// array con swiffycontainer
		$lswobjs[$i] = reset($lswobjs[$i]); 							// "swiffyobject = {assdfasd}"
		// big files
		$btexts[$i] = file_get_contents($bfiles[$i]['tmp_name']); 		//contenido del html
		$bswobjs[$i] = preg_grep($regexp, explode("\n",$btexts[$i]));	// array con swiffycontainer
		$bswobjs[$i] = reset($bswobjs[$i]);
		// validacion
		if ($lswobjs[$i]=="" || $bswobjs[$i]=="")
			printError("Archivo no contiene swiffycontainer");
		// Cambio de nombre
		$lswobjs[$i] = preg_replace($regexp,"var $swiffylittle".$i."=",$lswobjs[$i]);
		$bswobjs[$i] = preg_replace($regexp,"var $swiffybig".$i."=",$bswobjs[$i]);
	}
	$now = date('d-m-Y/H:i:s'); // Date de ahora para usar de nombre de carpeta
	$folder = "../aristoteles/partes/"; //carpeta REMOTA donde se ubicarán las partes
	$path = "";
	// DESCOMENTAR LO SIGUIENTE CUANDO SE SUBA A JOOMLA
	$path = $path.$folder;
	$path = $path.$now;
	mkdir($path, 0755, true);
	// Generar .js para cada html con sus swiffycontainers
	$lfilenames = array(); $bfilenames = array(); 
	for ($i=0; $i<$file_count; $i++){
		$lfilenames[$i] = "$swiffylittle". $i .".js"; // Ejemplo: swiffyl5.js
		$bfilenames[$i] = "$swiffybig". $i .".js";
		if (!($ljsfile = fopen($path.'/'.$lfilenames[$i],"w")))
			printError("No se pudo crear el archivo .js");
		if (!(fwrite($ljsfile, $lswobjs[$i])))
			printError("No se pudo escribir en el archivo '$lfilename'");
		fclose($ljsfile);
		if (!($bjsfile = fopen($path.'/'.$bfilenames[$i],"w")))
			printError("No se pudo crear el archivo '$bfilename'");
		if (!(fwrite($bjsfile, $bswobjs[$i])))
			printError("No se pudo escribir en el archivo '$bfilename'");
		fclose($bjsfile);

	}
	$output = "<div id='partesContainer'></div>\n<script>var navBar = [";
	for ($i=0; $i < count($_POST['nav']); $i++) {
		if ($i>0) $output = $output.","; 
		$output = $output."'".$_POST['nav'][$i]."'";
	}
	$output = $output."];</script>\n";
	for ($i=0; $i < $file_count; $i++) { 
		$output = $output."<script type='text/javascript' src='../$path/".$lfilenames[$i]."'></script>\n<script type='text/javascript' src='../$path/".$bfilenames[$i]."'></script>\n";
	}
	
	$output = $output . "<script type='text/javascript' src='../../aristoteles/partes/runtime.js'></script>\n<script src='../../aristoteles/partes/templatePartes.js'></script>\n<script src='../../aristoteles/partes/partes.js'></script>";

	// Escupir el output 
	echo $output;
 ?>