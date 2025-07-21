document.addEventListener('DOMContentLoaded', function () {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    const bienvenida = document.createElement('p');
    const contenedor = document.getElementById('contenedor-cursos');
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBusqueda = document.getElementById('input-busqueda');

    if (!contenedor) {
        console.error("El contenedor con id 'contenedor-cursos' no se encuentra en el DOM.");
        return;
    }

    if (usuario && usuario.nombre && usuario.rol) {
        bienvenida.textContent = `¡Bienvenido(a), ${usuario.nombre}!`;
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

        if (usuario.rol === 'Profesor') {
            document.querySelector('.tab:nth-child(2)').style.display = 'none';
        } else if (usuario.rol === 'Estudiante') {
            document.querySelector('.tab:nth-child(2)').style.display = 'inline-block';
        } else {
            document.querySelector('.tab:nth-child(2)').style.display = 'none';
        }
    } else {
        const tabs = document.querySelectorAll('.tab');
        if (tabs.length > 1) tabs[1].style.display = 'none';
    }

    document.getElementById('cursos-disponibles').style.display = 'block';

    const cursosDisponibles = [
        { nombre: "Curso de JavaScript", descripcion: "Introducción a la sintaxis, funciones, variables y DOM.", profesor: "Profesor_123" },
        { nombre: "Curso de HTML y CSS", descripcion: "Estructura HTML, maquetación y diseño responsivo.", profesor: "Laura Martínez" },
        { nombre: "Curso de Python", descripcion: "Sintaxis, estructuras de control y módulos.", profesor: "Lucía Díaz" },
        { nombre: "Curso de C++", descripcion: "Compilación, punteros, clases y objetos.", profesor: "Andrés López" },
        { nombre: "Curso de Java", descripcion: "POO, excepciones y estructura del lenguaje.", profesor: "Natalia Ríos" },
        { nombre: "Curso de PHP", descripcion: "Sintaxis, formularios y conexión a base de datos.", profesor: "Pedro Méndez" },
        { nombre: "Curso de C#", descripcion: "Variables, clases y ventanas gráficas simples.", profesor: "Luis Ortega" },
        { nombre: "Curso de Ruby", descripcion: "POO en Ruby, colecciones y sintaxis básica.", profesor: "Carmen Ramírez" },
        { nombre: "Curso de TypeScript", descripcion: "Tipado fuerte, interfaces y código seguro.", profesor: "Iván Morales" },
        { nombre: "Curso de Go", descripcion: "Lenguaje simple con funciones y concurrencia.", profesor: "Tomás Valle" },
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
    activarVerMas();

    function renderizarCursos() {
        contenedor.innerHTML = '';
        const tabs = document.querySelectorAll('.tab');
        const activeTab = Array.from(tabs).find(tab => tab.classList.contains('active'));
        const cursosInscritos = usuario ? JSON.parse(localStorage.getItem(usuario.email)) || [] : [];

        if (activeTab && activeTab.textContent === 'Cursos Disponibles') {
            mostrarCursosDisponibles();
        } else if (activeTab && activeTab.textContent === 'Tus Cursos') {
            mostrarTusCursos(cursosInscritos);
        }
    }

    function mostrarCursosDisponibles() {
        contenedor.innerHTML = '';

        if (!usuario) {
            cursosFiltrados.slice(0, cursosMostrados).forEach(curso => {
                contenedor.appendChild(crearTarjetaCurso(curso, 'invitado'));
            });
            return;
        }

        if (usuario.rol === 'Profesor') {
            const cursosProfesor = cursosFiltrados.filter(curso => curso.profesor === usuario.nombre);
            if (cursosProfesor.length === 0) {
                contenedor.innerHTML = '<p>No tienes cursos asignados.</p>';
                return;
            }
            cursosProfesor.slice(0, cursosMostrados).forEach(curso => {
                contenedor.appendChild(crearTarjetaCurso(curso, 'profesor'));
            });
            return;
        }

        if (usuario.rol === 'Estudiante') {
            const cursosInscritos = JSON.parse(localStorage.getItem(usuario.email)) || [];
            cursosFiltrados.slice(0, cursosMostrados).forEach(curso => {
                const yaInscrito = cursosInscritos.some(c => c.nombre === curso.nombre);
                const tipo = yaInscrito ? 'ver-progreso' : 'inscribirse';
                contenedor.appendChild(crearTarjetaCurso(curso, tipo));
            });
        }

        mostrarBotonVerMas();
    }

    function crearTarjetaCurso(curso, tipo) {
        const div = document.createElement('div');
        div.classList.add('curso-card');

        let boton = '';
        switch (tipo) {
            case 'invitado':
                boton = `<button class="btn-inscribirse" onclick="iniciarSesion()">Inicia sesión para inscribirte</button>`;
                break;
            case 'profesor':
                boton = `<button class="btn-inscribirse" onclick="window.location.href='progreso.html'">Administrar curso</button>`;
                break;
            case 'inscribirse':
                boton = `<button class="btn-inscribirse" onclick="inscribirseCurso('${curso.nombre}')">Inscribirse</button>`;
                break;
            case 'ver-progreso':
                boton = `<button class="btn-inscribirse" onclick="window.location.href='progreso.html'">Ver progreso</button>`;
                break;
        }

        div.innerHTML = `
        <img src="#" alt="Curso">
        <h3>${curso.nombre}</h3>
        <p>${curso.descripcion}</p>
        <p><strong>Profesor:</strong> ${curso.profesor}</p>
        ${boton}
    `;
        return div;
    }


    function mostrarTusCursos(cursosInscritos) {
        contenedor.innerHTML = '';
        if (cursosInscritos.length === 0) {
            contenedor.innerHTML = '<p>No estás inscrito en ningún curso.</p>';
            return;
        }
        cursosInscritos.forEach(curso => {
            const div = document.createElement('div');
            div.classList.add('curso-card');
            div.innerHTML = `
            <img src="#" alt="Curso">
            <h3>${curso.nombre}</h3>
            <p>${curso.descripcion}</p>
            <p><strong>Profesor:</strong> ${curso.profesor}</p>
            <button class="btn-inscribirse" onclick="window.location.href='progreso.html'">Ver progreso</button>
        `;
            contenedor.appendChild(div);
        });
    }


    function mostrarBotonVerMas() {
        const boton = document.createElement('button');
        boton.textContent = cursosMostrados >= cursosFiltrados.length ? 'Ver menos' : 'Ver más';
        boton.className = 'btn-ver-mas';
        boton.style.marginTop = '20px';
        boton.onclick = () => {
            if (cursosMostrados >= cursosFiltrados.length) {
                cursosMostrados = 10;
            } else {
                cursosMostrados += 10;
            }
            renderizarCursos();
        };
        contenedor.appendChild(boton);
    }

    function activarVerMas() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                cursosMostrados = 10;
                renderizarCursos();
            });
        });
    }

    btnBuscar.addEventListener('click', () => {
        const texto = inputBusqueda.value.toLowerCase();
        cursosFiltrados = cursosDisponibles.filter(curso =>
            curso.nombre.toLowerCase().includes(texto) ||
            curso.descripcion.toLowerCase().includes(texto)
        );
        cursosMostrados = 10;
        renderizarCursos();
    });

    window.inscribirseCurso = function (cursoNombre) {
        if (!usuario) {
            alert('Por favor, inicia sesión para inscribirte en un curso.');
            window.location.href = 'login-signup.html#login';
            return;
        }

        let cursosInscritos = JSON.parse(localStorage.getItem(usuario.email)) || [];
        const cursoExistente = cursosInscritos.some(c => c.nombre === cursoNombre);

        if (!cursoExistente) {
            const curso = cursosDisponibles.find(c => c.nombre === cursoNombre);
            cursosInscritos.push(curso);
            localStorage.setItem(usuario.email, JSON.stringify(cursosInscritos));
            alert('¡Te has inscrito con éxito!');
        } else {
            alert('Ya estás inscrito en este curso.');
        }

        renderizarCursos();
    };

    window.iniciarSesion = function () {
        alert('Por favor, inicia sesión para inscribirte en un curso.');
        window.location.href = 'login-signup.html#login';
    };
});
