<?php

	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
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
	$lswobj = reset($lswobj); // "swiffyobject = {assdfasd}"
	$btext = file_get_contents($bfile['tmp_name']); //contenido del html
	$bswobj = preg_grep($regexp, explode("\n",$btext)); // array con swiffycontainer
	$bswobj = reset($bswobj);
	if ($lswobj=="" || $bswobj==""){
		printError("Archivo no contiene swiffycontainer");
	}
	// renombrar nombre de cada variable swiffyobject
	$lswiffyvar = "lswiffy";
	$bswiffyvar = "bswiffy";
	$lswobj = preg_replace($regexp,"$lswiffyvar =",$lswobj);
	$bswobj = preg_replace($regexp,"$bswiffyvar =",$bswobj);
	// Generar .js para cada html con sus swiffycontainers
	$lfilename = "$lswiffyvar.js";
	$bfilename = "$bswiffyvar.js";
	// NO OLVIDAR VALIDAR QUE EL ARCHIVO PUDO SER CREADO, QUE NO EXISTÍA, ETC.
	if (!($ljsfile = fopen($lfilename,"w"))){
		printError("No se pudo crear el archivo '$lfilename'");
	}
	if (!(fwrite($ljsfile, $lswobj))){
		printError("No se pudo escribir en el archivo '$lfilename'");
	}
	fclose($ljsfile);
	if (!($bjsfile = fopen($bfilename,"w"))){
		printError("No se pudo crear el archivo '$bfilename'");
	}
	if (!(fwrite($bjsfile, $bswobj))){
		printError("No se pudo escribir en el archivo '$bfilename'");
	}
	fclose($bjsfile);
	// Generar html con ambos js incluidos	
	  //obtener texto del template
	$templatefilename_local = "template_puntos.html";
	//$templatefilename_remoto = "/home/morfo3/public_html/template_puntos.html";
/* CAMBIAR templatefilename_local POR templatefilename_remoto CUANDO SE SUBA A JOOMLA!!!!!!!!!!!!!!!!!!!!!!! */
	$templatehtml = file_get_contents($templatefilename_local);
	  //reemplazar littleswiffy y bigswiffy
	$templatehtml = preg_replace("/@lswiffy/",$lswiffyvar,$templatehtml);
	$templatehtml = preg_replace("/@bswiffy/",$bswiffyvar,$templatehtml);
	// Escupirlos en output
	echo $templatehtml;
 ?>