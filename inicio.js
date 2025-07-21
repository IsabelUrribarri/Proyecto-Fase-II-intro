const usuario = localStorage.getItem('usuarioActivo');
const bienvenida = document.createElement('p');

if (usuario) {
    bienvenida.textContent = `¡Bienvenido(a), ${usuario}!`;
    bienvenida.style.fontWeight = 'bold';
    bienvenida.style.color = '#0f2e5a';
    bienvenida.style.textAlign = 'center';
    bienvenida.style.marginTop = '20px';
    document.getElementById('bienvenida-container')?.appendChild(bienvenida);
    document.querySelector('.btn-login').style.display = 'none';
    document.querySelector('.btn-register').style.display = 'none';

    const userIcon = document.querySelector('.user-icon');
    const userMenu = document.querySelector('.user-menu');
    userIcon.style.display = 'inline-block';

    userIcon.addEventListener('click', () => {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('usuarioActivo');
        location.reload();
    });
}

document.getElementById('cursos-disponibles').style.display = 'block';
if (!usuario) {
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length > 1) tabs[1].style.display = 'none';
}

const cursosDisponibles = [
    { nombre: "HTML desde Cero", descripcion: "Aprende HTML básico para páginas web.", profesor: "Juan Pérez" },
    { nombre: "CSS para Principiantes", descripcion: "Estilos visuales modernos.", profesor: "Laura Martínez" },
    { nombre: "JavaScript Intro", descripcion: "Fundamentos de programación.", profesor: "Carlos Gómez" },
    { nombre: "Diseño Web Responsive", descripcion: "Sitios adaptables a móviles.", profesor: "Ana Torres" },
    { nombre: "Git y GitHub", descripcion: "Control de versiones moderno.", profesor: "Pedro Méndez" },
    { nombre: "Python Básico", descripcion: "Programación con Python.", profesor: "Lucía Díaz" },
    { nombre: "SQL para Todos", descripcion: "Consultas a bases de datos.", profesor: "Miguel Ruiz" },
    { nombre: "Node.js Inicial", descripcion: "Backend con JavaScript.", profesor: "Rosa Herrera" },
    { nombre: "React.js Básico", descripcion: "Interfaces dinámicas.", profesor: "Luis Ortega" },
    { nombre: "UX/UI Fundamentos", descripcion: "Diseño centrado en el usuario.", profesor: "Carmen Ramírez" },
    { nombre: "Java para Principiantes", descripcion: "Aprende a programar con Java.", profesor: "Natalia Ríos" },
    { nombre: "Ciberseguridad", descripcion: "Protección de datos y sistemas.", profesor: "Marco Vidal" },
    { nombre: "Diseño Gráfico", descripcion: "Principios del diseño visual.", profesor: "Sara Gómez" },
    { nombre: "Excel Avanzado", descripcion: "Domina fórmulas complejas.", profesor: "Daniel Pérez" },
    { nombre: "Power BI", descripcion: "Visualiza y analiza datos.", profesor: "Diana Castro" },
    { nombre: "Data Science", descripcion: "Analiza datos con Python.", profesor: "Iván Morales" },
    { nombre: "Machine Learning", descripcion: "Predicciones automáticas.", profesor: "Marta Jiménez" },
    { nombre: "APIs REST", descripcion: "Crea y consume APIs.", profesor: "Luis Rivas" },
    { nombre: "Docker", descripcion: "Conteneriza tus aplicaciones.", profesor: "Tomás Valle" },
    { nombre: "Scrum & Agile", descripcion: "Metodologías ágiles de trabajo.", profesor: "Julia Herrera" }
];

let cursosMostrados = 10;
let cursosFiltrados = [...cursosDisponibles];
renderizarCursos();

function renderizarCursos() {
    const contenedor = document.getElementById('contenedor-cursos');
    contenedor.innerHTML = '';

    cursosFiltrados.slice(0, cursosMostrados).forEach(curso => {
        const div = document.createElement('div');
        div.classList.add('curso-card');
        div.innerHTML = `
            <img src="#" alt="Curso">
            <h3>${curso.nombre}</h3>
            <p>${curso.descripcion}</p>
            <p><strong>Profesor:</strong> ${curso.profesor}</p>
            <button class="btn-inscribirse">${usuario ? 'Inscribirse' : 'Inicia sesión para inscribirte'}</button>
        `;
        contenedor.appendChild(div);
    });

    activarBotonesInscribir();

    let btn = document.getElementById('btn-ver-mas');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'btn-ver-mas';
        btn.className = 'btn-inscribirse';
        btn.style.display = 'block';
        btn.style.margin = '30px auto';
        btn.style.textAlign = 'center';
        document.getElementById('cursos-disponibles').appendChild(btn);
    }

    if (cursosMostrados < cursosFiltrados.length) {
        btn.textContent = 'Ver más';
    } else if (cursosFiltrados.length > 10) {
        btn.textContent = 'Ver menos';
    } else {
        btn.style.display = 'none';
    }

    btn.onclick = () => {
        if (btn.textContent === 'Ver más') {
            cursosMostrados = cursosFiltrados.length;
        } else {
            cursosMostrados = 10;
        }
        renderizarCursos();
    };
}

document.querySelectorAll('.tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const contenedor = document.getElementById('contenedor-cursos');
        contenedor.innerHTML = '';

        const btnVerMas = document.getElementById('btn-ver-mas');
        if (btnVerMas) btnVerMas.style.display = index === 0 ? 'block' : 'none';

        if (index === 0) {
            cursosFiltrados = [...cursosDisponibles];
            cursosMostrados = 10;
            renderizarCursos();
        } else {
            const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];

            if (cursosInscritos.length === 0) {
                contenedor.innerHTML = '<p style="text-align:center;">No estás inscrito en ningún curso todavía.</p>';
            } else {
                cursosInscritos.forEach(curso => {
                    const div = document.createElement('div');
                    div.classList.add('curso-card');
                    div.innerHTML = `
                        <img src="#" alt="Curso">
                        <h3>${curso.nombre}</h3>
                        <p><strong>Profesor:</strong> ${curso.profesor}</p>
                    `;
                    contenedor.appendChild(div);
                });
            }
        }
    });
});

document.getElementById('btn-buscar').addEventListener('click', () => {
    const texto = document.getElementById('input-busqueda').value.toLowerCase().trim();

    cursosFiltrados = cursosDisponibles.filter(curso =>
        curso.nombre.toLowerCase().includes(texto) ||
        curso.descripcion.toLowerCase().includes(texto) ||
        curso.profesor.toLowerCase().includes(texto)
    );

    cursosMostrados = 10;
    renderizarCursos();
});

document.getElementById('input-busqueda').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('btn-buscar').click();
    }
});

function activarBotonesInscribir() {
    document.querySelectorAll('.btn-inscribirse').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.curso-card');
            const curso = {
                nombre: card.querySelector('h3').textContent,
                profesor: card.querySelector('p strong')?.nextSibling?.textContent.trim() || 'Desconocido',
            };

            if (!usuario) {
                alert('Por favor, inicia sesión para inscribirte en un curso.');
                window.location.href = 'login-signup.html#login';
                return;
            }

            let cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];
            const yaExiste = cursosInscritos.some(c => c.nombre === curso.nombre);
            if (!yaExiste) {
                cursosInscritos.push(curso);
                localStorage.setItem('cursosInscritos', JSON.stringify(cursosInscritos));
                alert(`Te has inscrito en el curso: ${curso.nombre}`);
            } else {
                alert('Ya estás inscrito en este curso.');
            }
        });
    });
}
