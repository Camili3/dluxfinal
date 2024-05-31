document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los botones de preguntas frecuentes
    var buttons = document.querySelectorAll('.arrow');

    // Itera sobre los botones y añade un event listener a cada uno
    buttons.forEach(function(button) {
        // Agrega un event listener de clic a cada botón
        button.addEventListener('click', function() {
            // Encuentra el elemento padre de la flecha (div.question)
            var parentQuestion = button.closest('.question');

            // Encuentra la respuesta correspondiente a la pregunta
            var answer = parentQuestion.querySelector('.answer');

            // Alterna la clase 'open' en el contenedor de la respuesta para mostrar/ocultar la respuesta
            answer.classList.toggle('active');

            // Cambia el texto y estilo del botón según si la respuesta está activa o no
            if (answer.classList.contains('active')) {
                button.textContent = '▲';
            } else {
                button.textContent = '▼';
            }
        });
    });   

     // Manejo de la carga de la imagen
     var designUpload = document.getElementById('designUpload');
     var designPreview = document.getElementById('designPreview');
 
     designUpload.addEventListener('change', function(event) {
         var file = event.target.files[0];
         if (file) {
             var reader = new FileReader();
             reader.onload = function(e) {
                 designPreview.src = e.target.result;
                 designPreview.style.display = 'block';
             }
             reader.readAsDataURL(file);
         } else {
             designPreview.style.display = 'none';
             designPreview.src = '#';
         }
     });
 
     //subir diseño solo si el usuario esta registrado
     document.addEventListener('DOMContentLoaded', function() {
        if (sessionStorage.getItem('loggedIn')) {
            document.getElementById('upload-section').innerHTML = `
                <form action="upload_design.php" method="post" enctype="multipart/form-data">
                    <input type="file" name="design" accept="image/*">
                    <input type="submit" value="Subir Diseño">
                </form>
            `;
        } else {
            document.getElementById('upload-section').innerHTML = `
                <p>¿Quieres subir tu propio diseño? <a href="registro.html">Regístrate ahora.</a></p>
            `;
        }
    });

    var uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', function(event) {
       

        var formData = new FormData(uploadForm);
        fetch('upload_design.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert('Diseño subido con éxito!');
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });



     
});

