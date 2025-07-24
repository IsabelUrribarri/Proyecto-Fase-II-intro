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