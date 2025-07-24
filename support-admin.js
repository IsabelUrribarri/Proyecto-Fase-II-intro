// Verificar si hay sesión activa y si es admin
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
            <button onclick="marcarResuelto(${index})" 
                ${inc.estado === 'Resuelto' ? 'disabled' : ''}>
                ✅ Marcar como resuelto
            </button>
            <button onclick="eliminarIncidencia(${index})">🗑 Eliminar</button>
        `;
        listaIncidencias.appendChild(card);
    });
}

window.marcarResuelto = function (index) {
    incidencias[index].estado = "Resuelto";
    localStorage.setItem('incidencias', JSON.stringify(incidencias));
    renderizarIncidencias();
};

window.eliminarIncidencia = function (index) {
    incidencias.splice(index, 1);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));
    renderizarIncidencias();
};

renderizarIncidencias();

// Evento para cerrar sesión
document.getElementById('cerrar-sesion').addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    location.reload();
});
