<?php 
	function printError($message){
		die("ERROR: $message");
	}
	//Verificar que efectivamente llegaron archivos
	if ((count($_FILES) != 2)||(!isset($_FILES['lfile']))||(!isset($_FILES['bfile']))) {
		printError("no introdujo archivos");
	}
	/*  Recordar que l es de "little" y b de "big" haciendo referencia al tamaño del swiffeado. */
	$lfile = $_FILES['lfile'];
	$bfile = $_FILES['bfile'];
	// validar que sean archivos distintos y que sean html
	if (($lfile['name'] == $bfile['name']) || ($lfile['type'] != "text/html") || ($bfile['type'] != "text/html")){
		printError("Archivos no válidos");
	}
	if ($lfile['error'] != 0 && $bfile['error'] != 0){
		printError("Problema recibiendo archivos");
	}
	// Validar que sea swiffy (que tenga swiffycontainer)
	$regexp = "/\s+swiffyobject\s=/";
	$ltext = file_get_contents($lfile['tmp_name']); //contenido del html
	$lswobj = preg_grep($regexp, explode("\n",$ltext)); // array con swiffycontainer
	$lswobj = reset($lswobj);
	$btext = file_get_contents($bfile['tmp_name']); //contenido del html
	$bswobj = preg_grep($regexp, explode("\n",$btext)); // array con swiffycontainer
	$bswobj = reset($bswobj);
	if ($lswobj=="" || $bswobj==""){
		printError("Archivo no contiene swiffycontainer");
	}
	// Generar .js para cada html con sus swiffycontainers
	
	// Generar html con ambos js incluidos	

	// Escupirlos en output
	

	// $linput = @fopen($_FILES['linput']['tmp_name'], "r");

	// $new_file = fopen("pruebaphp.html", "w+");
 //    while (($buffer = fgets($linput, 4096)) !== false) {
 //        fwrite($new_file, $buffer);
 //    }
 //    fclose($linput);
 //    fclose($new_file);

 ?>