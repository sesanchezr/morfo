<?php 
/* Este script lo único que hace es entregar un listado de los archivos que hay en la carpeta
de imágenes especificada para la galería del tutututu que se esté creando.
En el formulario, se entrega un nombre de carpeta. Esa carpeta debe estar en $url_thumbs_tutu.
Este script tiene dos posibles outputs:
	1) "" (vacío) si no encontró la carpeta o no pudo leer archivos
	2) "foto1.jpg foto2.png foto3.gif" listado de nombres separados por un separador especial
*/

// Importar urls globales
$working_dir = "/aristoteles/formularios/tutututu/php";
$raiz_wwwserver = rtrim(str_replace($working_dir,"",shell_exec("pwd")));
require_once("$raiz_wwwserver/urls_globales/urls.php");
// Obtener nombre carpeta
$foldername=$_POST['foldername'];
if ( $foldername == "" ){
	echo "mori";
	die("");
}
// ir a directorio de carpeta y obtener todos los archivos de imagen
if (!($files = scandir("$path_thumb_tutu/$foldername"))){
	die("Carpeta no existe");
}
// formatos aceptados
function isImage($file_name){
	$formats=array("jpg","png","jpeg","bmp");
	$ext = end(explode('.',$file_name));
	return in_array($ext,$formats);
}
// filtrar formatos aceptados
$files = array_filter($files, "isImage");
$separator = ":";
echo implode($separator,$files);
 ?>