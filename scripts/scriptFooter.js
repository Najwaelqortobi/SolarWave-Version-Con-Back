fetch('../footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
});

/* 'footer-placeholder' es el id del div que estoy poniendo en la pagina en el que quiero que aparezca el footer */
/* fetch('../footer.html') : Inicia una solicitud para obtener el contenido del archivo 'footer.html'
.then(response => response.text()): Una vez que se recibe la respuesta, se convierte el contenido a texto
.then(data => { ... }): Después de convertir la respuesta a texto, se ejecuta esta función con el contenido del archivo como argumento 'data'
Finalmente, se inserta el contenido del archivo HTML en el elemento con el id 'footer-placeholder' de la página actual12.*/


/*En resumen : iniciamos una solicitud para obtener el contenido del archivo 
2- una vez lo recibimos se convierte en texto y una vez que se convierte en texto se ejecuta la funcion flecha que tiene como parametro data donde esta almacenado el contenido y se 
 inserta en el elemento cuyo el id footer placeholder*/