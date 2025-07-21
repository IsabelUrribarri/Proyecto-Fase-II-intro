const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
const bienvenida = document.createElement('p');

if (usuario) {
    bienvenida.textContent = `¡Bienvenido(a), ${usuario.nombre}!`; bienvenida.style.fontWeight = 'bold';
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
    { nombre: "Curso de JavaScript", descripcion: "Introducción a la sintaxis, funciones, variables y DOM.", profesor: "Carlos Gómez", proyectoFinal: "Calculadora web interactiva" },
    { nombre: "Curso de HTML y CSS", descripcion: "Estructura HTML, maquetación y diseño responsivo.", profesor: "Laura Martínez", proyectoFinal: "Página web portfolio" },
    { nombre: "Curso de Python", descripcion: "Sintaxis, estructuras de control y módulos.", profesor: "Lucía Díaz", proyectoFinal: "Analizador de archivos de texto" },
    { nombre: "Curso de C++", descripcion: "Compilación, punteros, clases y objetos.", profesor: "Andrés López", proyectoFinal: "Sistema de inventario en consola" },
    { nombre: "Curso de Java", descripcion: "POO, excepciones y estructura del lenguaje.", profesor: "Natalia Ríos", proyectoFinal: "Aplicación banco simple" },
    { nombre: "Curso de PHP", descripcion: "Sintaxis, formularios y conexión a base de datos.", profesor: "Pedro Méndez", proyectoFinal: "Sistema de registro de usuarios" },
    { nombre: "Curso de C#", descripcion: "Variables, clases y ventanas gráficas simples.", profesor: "Luis Ortega", proyectoFinal: "Agenda de contactos con interfaz" },
    { nombre: "Curso de Ruby", descripcion: "POO en Ruby, colecciones y sintaxis básica.", profesor: "Carmen Ramírez", proyectoFinal: "Gestor de tareas en consola" },
    { nombre: "Curso de TypeScript", descripcion: "Tipado fuerte, interfaces y código seguro.", profesor: "Iván Morales", proyectoFinal: "App de notas con tipado seguro" },
    { nombre: "Curso de Go", descripcion: "Lenguaje simple con funciones y concurrencia.", profesor: "Tomás Valle", proyectoFinal: "Servidor web HTTP básico" },
    { nombre: "Java para Principiantes", descripcion: "Aprende a programar con Java.", profesor: "Natalia Ríos", },
    { nombre: "Ciberseguridad", descripcion: "Protección de datos y sistemas.", profesor: "Marco Vidal", },
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
                        <button class="btn-inscribirse btn-progreso" onclick="location.href='progreso.html'">Progreso</button>

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
