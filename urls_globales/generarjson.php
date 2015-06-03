<?php 

/* 	Este archivo debiera estar en el mismo directorio que urls.php.
	

	En un futuro sería bueno mostrar un pequeño login para verificar que es un administrador el que está ejecutando esta función.
*/
	require_once("urls.php");
	function filtro($s){
	     $length = strlen("url_");
	     return (substr($s, 0, $length) === "url_");
	}
	// obtener nombres de variables que comienzan con "url_"
	$var_names=array_values(array_filter(array_keys($GLOBALS), "filtro"));
	// Guardar variables en un arreglo para json-earlo
	for ($i = 0; $i < count($var_names); $i++){
		$URLS[$var_names[$i]] = $GLOBALS[$var_names[$i]];
	}
	// jsonear variables y sus valores, y guardar en archivo urls.json
	if (!(file_put_contents('urls.json',json_encode($URLS)) === FALSE))
		echo "OK! urls.json generado correctamente.";
	else
		echo "ERROR :( todos morirán!!";
 ?>