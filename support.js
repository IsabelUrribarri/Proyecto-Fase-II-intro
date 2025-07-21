const form = document.getElementById('form-soporte');
const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
    window.location.href = 'login-signup.html#login';
}

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

    if (!email.includes('@') || email === '') {
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

    const incidencia = {
        nombre,
        email,
        asunto,
        mensaje,
        fecha: new Date().toLocaleString()
    };

    let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];
    incidencias.push(incidencia);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));

    form.reset();
    alert('Incidencia enviada con éxito');
});

function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.createElement('small');
    error.classList.add('error');
    error.textContent = mensaje;
    error.style.color = 'red';
    error.style.marginTop = '5px';
    campo.insertAdjacentElement('afterend', error);
}