<?php 
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	function printError($message){
		die("ERROR: $message");
	}
 	
 	// Input
	print_r($_FILES);

	// Verificar que efectivamente llegaron archivos
	if (count($_FILES) < 2 || count($_FILES) % 2 != 0) {
		printError("no introdujo archivos");
	}

	$file_count = count($_FILES) / 2; 

	// Guardamos los archivos en un arreglo
	$lfiles = array(); $bfiles = array(); 
	for ($i=1; $i <= $file_count; $i ++){
		$lfiles[$i] = $_FILES['lpartes'.$i];
		$bfiles[$i] = $_FILES['bpartes'.$i];
	}

	// Verificamos que los archivos sean correctos 
	for ($i=1; $i <= $file_count; $i ++){
		if ($lfiles[$i]['name'] == $bfiles[$i]['name'] || $lfiles[$i]['type'] != "text/html" || $bfiles[$i]['type'] != "text/html")
			printError("Archivos no válidos");
		if ($lfiles[$i]['error'] != 0 && $bfiles[$i]['error'] != 0)
			printError("Problema recibiendo archivos");
	}

	// Validar que sean swiffy's (que tengan swiffycontainers)
	$regexp = "/\s+swiffyobject\s=/";
	$ltexts = array(); $lswobjs = array(); 
	$btexts = array(); $bswobjs = array(); 
	for ($i=0; i<$file_count; $i++){
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
	}

	// Generar .js para cada html con sus swiffycontainers
	$lfilenames = array(); $bfilenames = array(); 
	for ($i=0; $i<$file_count; $i++){
		$lfilenames[$i] = "$lswiffyvar". $i .".js";
		$bfilenames[$i] = "$bswiffyvar". $i .".js";
		if (!($ljsfile = fopen($lfilenames[$i],"w")))
			printError("No se pudo crear el archivo .js");
		if (!(fwrite($ljsfile, $lswobjs[$i])))
			printError("No se pudo escribir en el archivo '$lfilename'");
		fclose($ljsfile);
		if (!($bjsfile = fopen($bfilenames[$i],"w")))
			printError("No se pudo crear el archivo '$bfilename'");
		if (!(fwrite($bjsfile, $bswobjs[$i])))
			printError("No se pudo escribir en el archivo '$bfilename'");
		fclose($bjsfile);
	}

	// Obtenemos el template de los puntitos y linkeamos el .js generado 
	/* WARNING : Cambiar 'templatefilename_local' POR 'templatefilename_remoto' cuando se suba a Joomla */
	$templatefilename_local = "template_partes.html";
	$div_template_local = "div.html"
	//$templatefilename_remoto = "/home/morfo3/public_html/template_puntos.html";
	$templatehtml = file_get_contents($templatefilename_local); // <-- ERROR AQUI! NO ESTA ENCONTRANDO EL TEMPLATE, BECAUSE OF REASONS ! 
	$divtemplate = file_get_contents($div_template_local)
	$script_tag = "<script type=\"text\/javascript\" src=\"js\/objetos\/@name.js\"><\/script>"

	$alldivs = '' //Aqui guardamos todos los div generados para luego colocarlos en el template
	$scripts = '' //Aqui colocamos todos los scripts de los swiffy
	for ($i=0; $i<$file_count; $i++){
		$this_div =  preg_replace("/@num/",$i,$divtemplate);
		$alldivs = $alldivs . $this_div;
		$this_lscript = preg_replace("/@name/", $lfilenames[$i], $divtemplate)
		$this_bscript =
		$scripts = $scripts .
	}
/*	//reemplazar ubicación de littleswiffy y bigswiffy 
	$templatehtml = preg_replace("/@lswiffy/",$path.'/'.$lswiffyvar,$templatehtml);
	$templatehtml = preg_replace("/@bswiffy/",$path.'/'.$bswiffyvar,$templatehtml);
	//reemplazar littleswiffy y bigswiffy
	$templatehtml = preg_replace("/%lswiffy/",$lswiffyvar,$templatehtml);
	$templatehtml = preg_replace("/%bswiffy/",$bswiffyvar,$templatehtml);
	
*/
	// Escupirlos en output
	echo $templatehtml;
	
 ?>