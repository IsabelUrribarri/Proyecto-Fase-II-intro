// Primero agarramos el formulario para poder trabajar con él después
const form = document.getElementById('form-soporte');

// Verificamos si el usuario está activo (logueado), si no, lo mandamos a login
const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
    // si no tiene sesión activa, lo redirigimos a la página de login
    window.location.href = 'login-signup.html#login';
}

// Obtenemos las incidencias ya guardadas (si las hay) o inicializamos el array
let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

// Manejador del evento submit para el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Cancelamos comportamiento por defecto

    // Obtenemos los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('tipo').value.trim();
    const mensaje = document.getElementById('descripcion').value.trim();

    // Limpiamos errores anteriores (si los había)
    document.querySelectorAll('.error').forEach(el => el.remove());

    let valido = true;

    // Validación del nombre
    if (nombre === '') {
        mostrarError('nombre', 'El nombre es obligatorio');
        valido = false;
    }

    // Validación personalizada del email (aceptamos dos valores clave o formato normal)
    if (
        email !== 'Estudiante_123' &&
        email !== 'Profesor_123' &&
        (!email.includes('@') || email === '')
    ) {
        mostrarError('email', 'Correo inválido');
        valido = false;
    }

    // Validación del tipo de problema
    if (asunto === '') {
        mostrarError('tipo', 'Selecciona un tipo de problema');
        valido = false;
    }

    // Validación del mensaje de descripción
    if (mensaje === '') {
        mostrarError('descripcion', 'La descripción no puede estar vacía');
        valido = false;
    }

    // Si hay algún campo inválido, detenemos el proceso
    if (!valido) return;

    // Recuperamos al usuario activo desde el localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    // Construimos el objeto de la incidencia
    const incidencia = {
        nombre: usuario.nombre,
        email: usuario.email,
        asunto,
        mensaje,
        fecha: new Date().toLocaleString(),
        estado: "Pendiente"
    };

    // Agregamos la incidencia al array y lo guardamos
    incidencias.push(incidencia);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));

    // Limpiamos el formulario
    form.reset();
    // Mostramos notificación de éxito
    mostrarMensaje('Incidencia enviada con éxito', 'success');

    // Actualizamos la lista de reportes
    mostrarMisReportes();
});
// Muestra un mensaje de error debajo del campo específico
function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.createElement('small');
    error.classList.add('error');
    error.textContent = mensaje;
    error.style.color = 'red';
    error.style.marginTop = '5px';
    campo.insertAdjacentElement('afterend', error);
}

// Elemento donde se mostrará la lista de incidencias del usuario
const listaMisReportes = document.getElementById('lista-mis-reportes');
const usuario = JSON.parse(usuarioActivo);

// Muestra los reportes que el usuario ha enviado anteriormente
function mostrarMisReportes() {
    const misIncidencias = incidencias.filter(inc => inc.email === usuario.email);

    listaMisReportes.innerHTML = '';

    if (misIncidencias.length === 0) {
        listaMisReportes.innerHTML = "<p>No has enviado reportes aún.</p>";
        return;
    }

    misIncidencias.forEach(inc => {
        const card = document.createElement('div');
        card.classList.add('card-incidencia');
        card.innerHTML = `
            <h4>${inc.asunto}</h4>
            <p><strong>Descripción:</strong> ${inc.mensaje}</p>
            <p><strong>Fecha:</strong> ${inc.fecha}</p>
            <p><strong>Estado:</strong> 
                <span style="color:${inc.estado === 'Resuelto' ? 'green' : 'orange'};">
                    ${inc.estado}
                </span>
            </p>
        `;
        listaMisReportes.appendChild(card);
    });
}

// Mostrar los reportes del usuario justo al cargar la página
mostrarMisReportes();

// Precargamos los campos del formulario con los datos del usuario activo
document.getElementById('nombre').value = usuario.nombre;
document.getElementById('email').value = usuario.email;


// Muestra un mensaje flotante (éxito o error) en pantalla durante unos segundos
function mostrarMensaje(texto, tipo = 'success') {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje-flotante ${tipo}`;
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2500);
}

// Seleccionamos el contenedor donde van a ir las burbujas
const fondo = document.querySelector('.background');

// Creamos 30 burbujas con propiedades aleatorias para que no todas sean iguales
for (let i = 0; i < 30; i++) {
    const burbuja = document.createElement('div');
    burbuja.classList.add('bubble');
    // Le asignamos un tamaño aleatorio entre 10px y 50px
    const size = Math.random() * 40 + 10;
    burbuja.style.width = `${size}px`;
    burbuja.style.height = `${size}px`;
    // Las ubicamos en una posición horizontal aleatoria en la pantalla
    burbuja.style.left = `${Math.random() * 100}vw`;
    // Cada burbuja sube en un tiempo diferente (entre 5 y 10 segundos)
    burbuja.style.animationDuration = `${5 + Math.random() * 5}s`;
    // También le damos un retraso para que no todas salgan al mismo tiempo
    burbuja.style.animationDelay = `${Math.random() * 1}s`;
    // Agregamos la burbuja al fondo
    fondo.appendChild(burbuja);
}