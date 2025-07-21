// Primero agarramos el formulario para poder trabajar con él después
const form = document.getElementById('form-soporte');

// Verificamos si el usuario está activo (logueado), si no, lo mandamos a login
const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
    // No tiene sesión activa, lo redirigimos a la página de login
    window.location.href = 'login-signup.html#login';
}

// Escuchamos cuando el formulario se envía (submit)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que recargue la página al enviar

    // Sacamos los valores que el usuario puso, y les quitamos espacios al principio y al final
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('tipo').value.trim();
    const mensaje = document.getElementById('descripcion').value.trim();

    // Antes de validar, borramos cualquier mensaje de error previo para no acumularlos
    document.querySelectorAll('.error').forEach(el => el.remove());

    // Variable para saber si todo está bien o si hay que mostrar errores
    let valido = true;

    // Validamos que el nombre no esté vacío
    if (nombre === '') {
        mostrarError('nombre', 'El nombre es obligatorio');
        valido = false;
    }

    // Validamos que el correo tenga un "@" y no esté vacío (básico pero efectivo)
    if (!email.includes('@') || email === '') {
        mostrarError('email', 'Correo inválido');
        valido = false;
    }

    // El usuario debe elegir un tipo de problema (no puede dejar el select vacío)
    if (asunto === '') {
        mostrarError('tipo', 'Selecciona un tipo de problema');
        valido = false;
    }

    // La descripción no puede quedar vacía, tiene que escribir algo
    if (mensaje === '') {
        mostrarError('descripcion', 'La descripción no puede estar vacía');
        valido = false;
    }

    // Si detectamos algún error, cortamos la función y no seguimos
    if (!valido) return;

    // Si todo está bien, armamos el objeto con los datos de la incidencia
    const incidencia = {
        nombre,
        email,
        asunto,
        mensaje,
        fecha: new Date().toLocaleString() // Guardamos la fecha y hora para registro
    };

    // Sacamos las incidencias que ya estén guardadas, o un array vacío si no hay ninguna
    let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

    // Agregamos la nueva incidencia al array
    incidencias.push(incidencia);

    // Guardamos el array actualizado en localStorage (como JSON)
    localStorage.setItem('incidencias', JSON.stringify(incidencias));

    // Limpiamos el formulario para que quede listo para otro reporte
    form.reset();

    // Avisamos al usuario que todo salió bien
    alert('Incidencia enviada con éxito');
});

// Función que muestra un mensaje de error justo debajo del campo correspondiente
function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.createElement('small'); // Creamos un pequeño texto
    error.classList.add('error'); // Le ponemos una clase para poder darle estilo
    error.textContent = mensaje; // El mensaje que queremos mostrar
    error.style.color = 'red'; // Que se vea claro que es un error
    error.style.marginTop = '5px'; // Espacio para que no quede pegado al input
    campo.insertAdjacentElement('afterend', error); // Lo insertamos justo después del campo
}
