document.addEventListener("DOMContentLoaded", function() {
    // Función para verificar si el usuario está logeado
    function isUserLoggedIn() {
        // Aquí se verifica si hay un estado de sesión en el sessionStorage
        return sessionStorage.getItem('loggedIn') === 'true';
    }

    // Obtener los elementos necesarios
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');
    const logoutButton = document.getElementById('logoutBtn');
    // Obtener la sección de subida de archivos y la sección de invitación
    const uploadSection = document.querySelector('.upload-section');
    const inviteSection = document.querySelector('.invite-section');

    // Función para actualizar la visibilidad de los elementos según el estado de inicio de sesión
    function updateUI() {
        
        if (isUserLoggedIn()) {
            console.log("if:", sessionStorage.getItem('loggedIn'));
            const displayState = window.getComputedStyle(logoutButton).display;
            console.log("Estado de display del botón de logout:", displayState);
            if (uploadSection) uploadSection.style.display = 'block'; // Mostrar la sección si el usuario está logeado
            if (inviteSection) inviteSection.style.display = 'none'; // Ocultar la sección de invitación si el usuario está logeado
            logoutButton.style.display = 'flex';
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            const displayState1 = window.getComputedStyle(logoutButton).display;
            console.log("Estado de display del botón de logout:", displayState1);
        } else {
            console.log("else:", sessionStorage.getItem('loggedIn'));

            logoutButton.style.display = 'none';
            loginButton.style.display = 'block';
            registerButton.style.display = 'block';
            if (uploadSection) uploadSection.style.display = 'none'; // Ocultar la sección si el usuario no está logeado
            if (inviteSection) inviteSection.style.display = 'block'; // Mostrar la sección de invitación si el usuario no está logeado
        }
    }

    // Llamar a updateUI al cargar la página
    updateUI();

    // Agregar el event listener al botón de cerrar sesión
    logoutButton.addEventListener('click', function() {
        logoutUser();
    });

    // Función para cerrar sesión
    function logoutUser() {
        // Cambiar el estado de sessionStorage a 'false'
        sessionStorage.setItem('loggedIn', 'false');

        // Redirigir al usuario a index.html
        window.location.href = 'index.html';
    }
});
