document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos al usuario que inició sesión (si existe) desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    // Creamos el párrafo que usaremos para dar la bienvenida
    const bienvenida = document.createElement('p');

    // Referencias a elementos clave del DOM
    const contenedor = document.getElementById('contenedor-cursos');
    const btnBuscar = document.getElementById('btn-buscar');
    const inputBusqueda = document.getElementById('input-busqueda');

    // Si el contenedor no existe, algo falló en el HTML
    if (!contenedor) {
        console.error("El contenedor con id 'contenedor-cursos' no se encuentra en el DOM.");
        return;
    }

    // Si hay un usuario logueado, mostramos su nombre y ocultamos botones de login/registro
    if (usuario && usuario.nombre && usuario.rol) {
        bienvenida.textContent = `¡Bienvenido(a), ${usuario.nombre}!`;
        bienvenida.style.fontWeight = 'bold';
        bienvenida.style.color = '#0f2e5a';
        bienvenida.style.textAlign = 'center';
        bienvenida.style.marginTop = '20px';
        document.getElementById('bienvenida-container')?.appendChild(bienvenida);

        // Ocultamos los botones porque ya hay sesión
        document.querySelector('.btn-login').style.display = 'none';
        document.querySelector('.btn-register').style.display = 'none';

        // Mostramos el icono de menú de usuario (☰)
        const userIcon = document.querySelector('.user-icon');
        const userMenu = document.querySelector('.user-menu');
        userIcon.style.display = 'inline-block';

        // Mostramos/ocultamos el menú al hacer clic en el icono
        userIcon.addEventListener('click', () => {
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Evento para cerrar sesión
        document.getElementById('cerrar-sesion').addEventListener('click', () => {
            localStorage.removeItem('usuarioActivo');
            location.reload();
        });

        // Mostramos u ocultamos la pestaña "Tus Cursos" según el rol
        if (usuario.rol === 'Profesor') {
            document.querySelector('.tab:nth-child(2)').style.display = 'none';
        } else if (usuario.rol === 'Estudiante') {
            document.querySelector('.tab:nth-child(2)').style.display = 'inline-block';
        } else {
            document.querySelector('.tab:nth-child(2)').style.display = 'none';
        }
    } else {
        // Si no hay sesión, ocultamos "Tus Cursos"
        const tabs = document.querySelectorAll('.tab');
        if (tabs.length > 1) tabs[1].style.display = 'none';
    }

    // Mostramos la sección de cursos (por si estaba oculta inicialmente)
    document.getElementById('cursos-disponibles').style.display = 'block';

    // Simulación de cursos que cargamos desde "el servidor" (en este caso, localStorage)
    const cursosDisponibles = [
        { nombre: "Curso de JavaScript", descripcion: "Introducción a la sintaxis, funciones, variables y DOM.", profesor: "Profesor_123" },
        { nombre: "Curso de HTML y CSS", descripcion: "Estructura HTML, maquetación y diseño responsivo.", profesor: "Profesor_123" },
        { nombre: "Curso de Python", descripcion: "Sintaxis, estructuras de control y módulos.", profesor: "Profesor_123" },
        { nombre: "Curso de C++", descripcion: "Compilación, punteros, clases y objetos.", profesor: "Profesor_123" },
        { nombre: "Curso de Java", descripcion: "POO, excepciones y estructura del lenguaje.", profesor: "Profesor_123" },
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
        { nombre: "Scrum & Agile", descripcion: "Metodologías ágiles de trabajo.", profesor: "Julia Herrera" },
        { nombre: "Curso de React", descripcion: "Componentes, props y estado en React.", profesor: "Elena Suárez" },
        { nombre: "Curso de Node.js", descripcion: "Back-end con Express y manejo de rutas.", profesor: "Carlos Patiño" },
        { nombre: "Curso de SQL", descripcion: "Consultas, joins y gestión de bases de datos.", profesor: "Verónica Silva" },
        { nombre: "Curso de NoSQL", descripcion: "MongoDB y bases de datos no relacionales.", profesor: "Samuel Torres" },
        { nombre: "Curso de Kotlin", descripcion: "Aplicaciones móviles para Android.", profesor: "Fernando Vega" },
        { nombre: "Curso de Swift", descripcion: "Desarrollo de apps iOS con Swift.", profesor: "Isabel Moreno" },
        { nombre: "Curso de Unity 3D", descripcion: "Creación de videojuegos en 2D y 3D.", profesor: "Cristian Navarro" },
        { nombre: "Curso de Unreal Engine", descripcion: "Desarrollo de videojuegos con Blueprints.", profesor: "Javier Cortés" },
        { nombre: "Curso de Blockchain", descripcion: "Contratos inteligentes y criptomonedas.", profesor: "Patricia Díaz" },
        { nombre: "Curso de Inteligencia Artificial", descripcion: "Redes neuronales y algoritmos de IA.", profesor: "Marta Jiménez" },
        { nombre: "Curso de Big Data", descripcion: "Procesamiento de datos masivos.", profesor: "Diego Paredes" },
        { nombre: "Curso de UX/UI", descripcion: "Experiencia e interfaz de usuario.", profesor: "Laura Romero" },
        { nombre: "Curso de Adobe Illustrator", descripcion: "Ilustraciones vectoriales avanzadas.", profesor: "Sara Gómez" },
        { nombre: "Curso de Photoshop", descripcion: "Edición y retoque fotográfico profesional.", profesor: "Claudia Peña" },
        { nombre: "Curso de After Effects", descripcion: "Animaciones y efectos visuales.", profesor: "Julio Cárdenas" },
        { nombre: "Curso de WordPress", descripcion: "Creación de sitios web dinámicos.", profesor: "Antonio Rivas" },
        { nombre: "Curso de Marketing Digital", descripcion: "Publicidad en redes y SEO.", profesor: "Paula Andrade" },
        { nombre: "Curso de Ventas Online", descripcion: "Estrategias de e-commerce efectivas.", profesor: "Jorge Márquez" },
        { nombre: "Curso de Finanzas Personales", descripcion: "Manejo de presupuestos e inversiones.", profesor: "Rodrigo Salas" },
        { nombre: "Curso de Liderazgo", descripcion: "Gestión de equipos y toma de decisiones.", profesor: "Camila Herrera" }
    ];

    // Guardamos los cursos en localStorage para poder usarlos en otras partes
    localStorage.setItem('cursosDisponibles', JSON.stringify(cursosDisponibles));

    // Controla cuántos cursos mostrar a la vez
    let cursosMostrados = 10;
    let cursosFiltrados = [...cursosDisponibles];

    renderizarCursos();
    activarVerMas();

    // Decide qué mostrar según la pestaña activa
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

    // Muestra los cursos según el tipo de usuario (profesor, estudiante, invitado)

    function mostrarCursosDisponibles() {
        contenedor.innerHTML = '';

        // Invitado: sin sesión, solo puede mirar
        if (!usuario) {
            cursosFiltrados.slice(0, cursosMostrados).forEach(curso => {
                contenedor.appendChild(crearTarjetaCurso(curso, 'invitado'));
            });
        } else if (usuario.rol === 'Profesor') {
            const cursosProfesor = cursosFiltrados.filter(curso => curso.profesor === usuario.nombre);
            if (cursosProfesor.length === 0) {
                contenedor.innerHTML = '<p>No tienes cursos asignados.</p>';
                return;
            }
            cursosProfesor.slice(0, cursosMostrados).forEach(curso => {
                contenedor.appendChild(crearTarjetaCurso(curso, 'profesor'));
            });
            return;
        } else if (usuario.rol === 'Estudiante') {
            const cursosInscritos = JSON.parse(localStorage.getItem(usuario.email)) || [];
            cursosFiltrados.slice(0, cursosMostrados).forEach(curso => {
                const yaInscrito = cursosInscritos.some(c => c.nombre === curso.nombre);
                const tipo = yaInscrito ? 'ver-progreso' : 'inscribirse';
                contenedor.appendChild(crearTarjetaCurso(curso, tipo));
            });
        }
        mostrarBotonVerMas();
    }

    // Crea una tarjeta visual para cada curso
    function crearTarjetaCurso(curso, tipo) {
        const div = document.createElement('div');
        div.classList.add('curso-card');

        // Definimos el botón según el tipo de usuario
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

        // Estructura HTML de la tarjeta
        div.innerHTML = `
            <img src="#" alt="Curso">
            <h3>${curso.nombre}</h3>
            <p>${curso.descripcion}</p>
            <p><strong>Profesor:</strong> ${curso.profesor}</p>
            ${boton}
        `;
        return div;
    }

    // Muestra los cursos a los que el estudiante está inscrito
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

    // Muestra el botón "Ver más" o "Ver menos"
    function mostrarBotonVerMas() {
        // Eliminar botón anterior si existe (para evitar duplicados)
        const btnExistente = contenedor.querySelector('.btn-ver-mas');
        if (btnExistente) btnExistente.remove();

        const boton = document.createElement('button');

        if (cursosMostrados >= cursosFiltrados.length) {
            boton.textContent = 'Ver menos';
        } else {
            boton.textContent = 'Ver más';
        }

        boton.className = 'btn-inscribirse btn-ver-mas';
        boton.style.marginTop = '10px';

        boton.onclick = () => {
            if (boton.textContent === 'Ver más') {
                cursosMostrados = Math.min(cursosMostrados + 10, cursosFiltrados.length);
            } else {
                // Cuando es "Ver menos", volvemos a mostrar solo los primeros 10 cursos
                cursosMostrados = 10;
            }
            renderizarCursos();
        };

        const contenedorBoton = document.getElementById('contenedor-boton');
        contenedorBoton.innerHTML = ''; // limpiar botón anterior
        contenedorBoton.appendChild(boton);
    }

    // Activa la lógica de cambiar pestañas entre "Cursos disponibles" y "Tus cursos"
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

    // Búsqueda básica por nombre o descripción
    function buscarCursos() {
        const texto = inputBusqueda.value.toLowerCase();
        cursosFiltrados = cursosDisponibles.filter(curso =>
            curso.nombre.toLowerCase().includes(texto) ||
            curso.descripcion.toLowerCase().includes(texto)
        );
        cursosMostrados = 10;
        renderizarCursos();
    }

    btnBuscar.addEventListener('click', buscarCursos);

    inputBusqueda.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            buscarCursos();
        }
    });


    // Lógica para inscribir a un curso y guardar en localStorage
    let cursoPendienteInscripcion = null;

    window.inscribirseCurso = function (cursoNombre) {
        const curso = cursosDisponibles.find(c => c.nombre === cursoNombre);
        if (!usuario) {
            mostrarMensajeExito("Por favor, inicia sesión para inscribirte.");
            setTimeout(() => {
                window.location.href = 'login-signup.html#login';
            }, 2000);
            return;
        }

        const cursosInscritos = JSON.parse(localStorage.getItem(usuario.email)) || [];
        const yaInscrito = cursosInscritos.some(c => c.nombre === cursoNombre);

        if (yaInscrito) {
            mostrarMensaje("Ya estás inscrito en este curso.", "error");
            return;
        }

        cursoPendienteInscripcion = curso;
        document.getElementById('nombre-curso-confirmacion').textContent = curso.nombre;
        document.getElementById('modal-confirmacion').style.display = 'flex';
    };

    // Redirección rápida al login desde el botón en modo invitado
    window.iniciarSesion = function () {
        alert('Por favor, inicia sesión para inscribirte en un curso.');
        window.location.href = 'login-signup.html#login';
    };

    document.getElementById('confirmar-inscripcion').addEventListener('click', function () {
        if (cursoPendienteInscripcion && usuario) {
            let cursosInscritos = JSON.parse(localStorage.getItem(usuario.email)) || [];
            cursosInscritos.push(cursoPendienteInscripcion);
            localStorage.setItem(usuario.email, JSON.stringify(cursosInscritos));
            mostrarMensaje("¡Te has inscrito con éxito!", "success");
            renderizarCursos();
        }
        document.getElementById('modal-confirmacion').style.display = 'none';
        cursoPendienteInscripcion = null;
    });


    document.getElementById('cancelar-inscripcion').addEventListener('click', function () {
        document.getElementById('modal-confirmacion').style.display = 'none';
        cursoPendienteInscripcion = null;
    });
});

function mostrarMensaje(texto, tipo = 'success') {
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje-flotante ${tipo}`;
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2500);
}


function mostrarMensajeExito(texto) {
    const mensaje = document.getElementById("mensaje-flotante");
    mensaje.textContent = texto;
    mensaje.classList.add("show");
    mensaje.style.display = "block";
}