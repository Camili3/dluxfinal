<?php
include 'conexion_be.php';
session_start(); // Iniciar la sesión

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $notas = $_POST['notas'];
    $userId = $_SESSION['id'];

    // Verificar si se ha subido un archivo
    if (!empty($_FILES['imagen']['tmp_name'])) {
        $archivoTmp = $_FILES['imagen']['tmp_name'];
        $archivoNombre = basename($_FILES['imagen']['name']);
        $carpetaDestino = '../uploads/'; // Carpeta donde se guardarán las imágenes

        // Crear la carpeta si no existe
        if (!is_dir($carpetaDestino)) {
            mkdir($carpetaDestino, 0777, true);
        }

        // Ruta completa del archivo
        $rutaArchivo = $carpetaDestino . $archivoNombre;

        // Mover el archivo a la carpeta destino
        if (move_uploaded_file($archivoTmp, $rutaArchivo)) {
            // Consulta SQL para actualizar la fila del usuario
            $sql = "UPDATE usuarios SET notas = ?, imagen = ? WHERE id = ?";
            $stmt = $conexion->prepare($sql);

            if ($stmt) {
                // Vincular parámetros
                $stmt->bind_param("ssi", $notas, $rutaArchivo, $userId);

                // Ejecutar la consulta
                if ($stmt->execute()) {
                    echo '<script>
                    alert("Archivo subido correctamente");
                    window.location = "../camisas.html";
                    </script>';
                } else {
                    echo "Error al subir archivo";
                }

                // Cerrar la declaración
                $stmt->close();
            } else {
                echo "Error al preparar la consulta";
            }
        } else {
            echo "Error al mover el archivo a la carpeta destino";
        }
    } else {
        echo "No se ha subido ningún archivo";
    }
} else {
    echo "El formulario no ha sido enviado correctamente";
}


// Cerrar la conexión
$conexion->close();
?>
