// Obtenemos al usuario actualmente logueado desde el localStorage
const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
// Si no hay usuario o no es admin, lo sacamos del panel
if (!usuarioActivo || usuarioActivo.rol !== 'Admin') {
    alert("No tienes permisos para ver esta página");
    window.location.href = "index.html";
}

// Referencia al contenedor donde van las incidencias
const listaIncidencias = document.getElementById('lista-incidencias');
// Cargamos las incidencias almacenadas (o un array vacío si no hay nada guardado)
let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

// Esta función se encarga de mostrar las incidencias en pantalla
function renderizarIncidencias() {
    listaIncidencias.innerHTML = ''; // Limpiamos primero el contenedor

    // Si no hay incidencias, mostramos un mensaje simple
    if (incidencias.length === 0) {
        listaIncidencias.innerHTML = "<p>No hay incidencias enviadas</p>";
        return;
    }

    // Por cada incidencia, creamos una tarjeta con sus datos
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

// Función para marcar una incidencia como resuelta
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

// Función para eliminar una incidencia completamente
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

// Llamamos a esta función para mostrar todo al cargar la página
renderizarIncidencias();

// Mostrar un modal de confirmación reutilizable
function mostrarConfirmacion(mensaje, callbackConfirmar) {
    const modal = document.getElementById('modal-confirmacion');
    const texto = document.getElementById('texto-confirmacion');
    const btnConfirmar = modal.querySelector('button.confirmar');
    const btnCancelar = modal.querySelector('button.cancelar');

    texto.textContent = mensaje;

    modal.style.display = 'flex';
    // Limpiar los eventos para evitar acumulación de listeners
    function limpiar() {
        btnConfirmar.removeEventListener('click', confirmar);
        btnCancelar.removeEventListener('click', cancelar);
        modal.style.display = 'none';
    }
    // Si confirma, llamamos el callback con true
    function confirmar() {
        limpiar();
        callbackConfirmar(true);
    }
    // Si cancela, el callback va con false
    function cancelar() {
        limpiar();
        callbackConfirmar(false);
    }
    // Añadimos los eventos
    btnConfirmar.addEventListener('click', confirmar);
    btnCancelar.addEventListener('click', cancelar);
}
// Muestra un mensaje flotante en pantalla
function mostrarMensaje(texto, tipo = 'success') {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje-flotante ${tipo}`;
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);
    // Se borra automáticamente luego de 2.5 segundos
    setTimeout(() => {
        mensaje.remove();
    }, 2500);
}

// Manejamos el cierre de sesión al hacer clic en el botón correspondiente
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