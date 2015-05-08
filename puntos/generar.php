<?php 
	
 	/*Hay que validar archivos*/
	echo "Generando!!! not.";
	$lswiffy = @fopen($_FILES['lswiffy']['tmp_name'], "r");

	$new_file = fopen("pruebaphp.html", "w+");
    while (($buffer = fgets($lswiffy, 4096)) !== false) {
        fwrite($new_file, $buffer);
    }
    fclose($lswiffy);
    fclose($new_file);

 ?>