// Primero agarramos el formulario para poder trabajar con él después
const form = document.getElementById('form-soporte');

// Verificamos si el usuario está activo (logueado), si no, lo mandamos a login
const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
    // No tiene sesión activa, lo redirigimos a la página de login
    window.location.href = 'login-signup.html#login';
}

let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

// Escuchamos cuando el formulario se envía (submit)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('tipo').value.trim();
    const mensaje = document.getElementById('descripcion').value.trim();

    document.querySelectorAll('.error').forEach(el => el.remove());

    let valido = true;

    if (nombre === '') {
        mostrarError('nombre', 'El nombre es obligatorio');
        valido = false;
    }

    // ✅ AHORA ACEPTA Estudiante_123 y Profesor_123
    if (
        email !== 'Estudiante_123' &&
        email !== 'Profesor_123' &&
        (!email.includes('@') || email === '')
    ) {
        mostrarError('email', 'Correo inválido');
        valido = false;
    }

    if (asunto === '') {
        mostrarError('tipo', 'Selecciona un tipo de problema');
        valido = false;
    }

    if (mensaje === '') {
        mostrarError('descripcion', 'La descripción no puede estar vacía');
        valido = false;
    }

    if (!valido) return;

    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    const incidencia = {
        nombre: usuario.nombre,
        email: usuario.email,
        asunto,
        mensaje,
        fecha: new Date().toLocaleString(),
        estado: "Pendiente"
    };

    incidencias.push(incidencia);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));

    form.reset();
    mostrarMensaje('Incidencia enviada con éxito', 'success');
    mostrarMisReportes();
});

// Función que muestra un mensaje de error justo debajo del campo correspondiente
function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.createElement('small');
    error.classList.add('error');
    error.textContent = mensaje;
    error.style.color = 'red';
    error.style.marginTop = '5px';
    campo.insertAdjacentElement('afterend', error);
}

const listaMisReportes = document.getElementById('lista-mis-reportes');
const usuario = JSON.parse(usuarioActivo);

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

// Llamar al cargar la página
mostrarMisReportes();

document.getElementById('nombre').value = usuario.nombre;
document.getElementById('email').value = usuario.email;

function mostrarMensaje(texto, tipo = 'success') {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje-flotante ${tipo}`;
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2500);
}
