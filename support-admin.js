const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
if (!usuarioActivo || usuarioActivo.rol !== 'Admin') {
    alert("No tienes permisos para ver esta página");
    window.location.href = "index.html";
}

const listaIncidencias = document.getElementById('lista-incidencias');
let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

function renderizarIncidencias() {
    listaIncidencias.innerHTML = '';

    if (incidencias.length === 0) {
        listaIncidencias.innerHTML = "<p>No hay incidencias enviadas</p>";
        return;
    }

    incidencias.forEach((inc, index) => {
        const card = document.createElement('div');
        card.classList.add('card-incidencia');
        card.innerHTML = `
            <h3>${inc.asunto}</h3>
            <p><strong>Usuario:</strong> ${inc.nombre} (${inc.email})</p>
            <p><strong>Descripción:</strong> ${inc.mensaje}</p>
            <p><strong>Fecha:</strong> ${inc.fecha}</p>
            <p><strong>Estado:</strong> 
                <span style="color:${inc.estado === 'Resuelto' ? 'green' : 'orange'};">
                    ${inc.estado}
                </span>
            </p>
            <button onclick="marcarResuelto(${index})" ${inc.estado === 'Resuelto' ? 'disabled' : ''}>
                ✅ Marcar como resuelto
            </button>
            <button onclick="eliminarIncidencia(${index})">🗑 Eliminar</button>
        `;
        listaIncidencias.appendChild(card);
    });
}

window.marcarResuelto = function (index) {
    mostrarConfirmacion('¿Marcar esta incidencia como resuelta?', (confirmado) => {
        if (confirmado) {
            if (incidencias[index]) {
                incidencias[index].estado = 'Resuelto';
                localStorage.setItem('incidencias', JSON.stringify(incidencias));
                mostrarMensaje('Incidencia marcada como resuelta', 'success');
                renderizarIncidencias();
            }
        }
    });
};

window.eliminarIncidencia = function (index) {
    mostrarConfirmacion('¿Eliminar esta incidencia? Esta acción no se puede deshacer.', (confirmado) => {
        if (confirmado) {
            if (incidencias[index]) {
                incidencias.splice(index, 1);
                localStorage.setItem('incidencias', JSON.stringify(incidencias));
                mostrarMensaje('Incidencia eliminada', 'error');
                renderizarIncidencias();
            }
        }
    });
};

renderizarIncidencias();

function mostrarConfirmacion(mensaje, callbackConfirmar) {
    const modal = document.getElementById('modal-confirmacion');
    const texto = document.getElementById('texto-confirmacion');
    const btnConfirmar = modal.querySelector('button.confirmar');
    const btnCancelar = modal.querySelector('button.cancelar');

    texto.textContent = mensaje;

    modal.style.display = 'flex';

    function limpiar() {
        btnConfirmar.removeEventListener('click', confirmar);
        btnCancelar.removeEventListener('click', cancelar);
        modal.style.display = 'none';
    }

    function confirmar() {
        limpiar();
        callbackConfirmar(true);
    }

    function cancelar() {
        limpiar();
        callbackConfirmar(false);
    }

    btnConfirmar.addEventListener('click', confirmar);
    btnCancelar.addEventListener('click', cancelar);
}

function mostrarMensaje(texto, tipo = 'success') {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje-flotante ${tipo}`;
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2500);
}

// Cerrar sesión
document.querySelectorAll('.btn-cerrar-sesion').forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.removeItem('usuarioActivo');
        window.location.href = 'login-signup.html#login';
    });
});
