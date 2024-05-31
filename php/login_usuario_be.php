<?php
include 'conexion_be.php';


$correo = $_POST['correo'];
$contrasena = $_POST['contrasena']; // Contraseña sin hashear

$validar_login = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo='$correo' AND contrasena='$contrasena'");

if (mysqli_num_rows($validar_login) > 0) {
    $user = mysqli_fetch_assoc($validar_login);
    $_SESSION['id'] = $user['id']; // Almacenar el ID del usuario en la sesión

    echo '<script>
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "../index.html";
    </script>';
    exit();
} else {
    echo '<script>
    alert("Error, no se han encontrado los datos ingresados.");
    window.location = "../login.html";
    </script>';
    exit();
}

$conexion->close();
?>
