<?php

include 'conexion_be.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena']; // Hash
    // Preparar la consulta SQL para prevenir inyecciones SQL
    $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $correo, $contrasena);

    //verificar que no se repita el correo
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo='$correo'");

    if(mysqli_num_rows($verificar_correo) > 0){
        echo ' 
        <script>
        alert("Este correo ya está registrado, intenta con otro diferente");
        window.location= "../registro.html";
        </script>
        ';
        exit();
    }


    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Redirigir al usuario al index o página de inicio de sesión después del registro exitoso
        header('Location: ../login.html');
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // Cerrar la declaración
    $stmt->close();
}
    mysqli_close($conexion)

?>
