// === CAMBIO DE PANELES PRINCIPALES ===

// Cuando el usuario hace clic en "Cursos"
document.getElementById('btn-cursos').onclick = function () {
  // Muestra el panel de cursos
  document.getElementById('cursos-panel').style.display = '';
  // Oculta los otros paneles
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';

  // Marca este botón como activo (añade clase CSS) y desactiva los otros
  this.classList.add('activo');
  document.getElementById('btn-avance').classList.remove('activo');
  document.getElementById('btn-calificaciones').classList.remove('activo');
};

// Cuando el usuario hace clic en "Avance"
document.getElementById('btn-avance').onclick = function () {
  // Oculta cursos y muestra el panel de avance
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = '';
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';

  // Activa este botón y desactiva los otros
  this.classList.add('activo');
  document.getElementById('btn-cursos').classList.remove('activo');
  document.getElementById('btn-calificaciones').classList.remove('activo');
};

document.getElementById('btn-calificaciones').onclick = function () {
  document.getElementById('calificaciones-panel').style.display = '';
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'none';

  this.classList.add('activo');
  document.getElementById('btn-cursos').classList.remove('activo');
  document.getElementById('btn-avance').classList.remove('activo');
  mostrarCalificaciones();
};

// === DATOS DEL USUARIO Y CONFIGURACIÓN INICIAL ===

// Recuperamos al usuario que está logueado desde el localStorage
const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

// Si es un profesor específico ("Profesor_123"), simulamos que ya tiene entregas de proyectos
// if (usuario.rol === 'Profesor' && usuario.nombre === 'Profesor_123') {
//   const entregas = {
//     "Curso de JavaScript|Juan Pérez": true,
//     "Curso de JavaScript|Ana López": true,
//     "Curso de JavaScript|Luis Ramírez": true
//   };
//   localStorage.setItem('entregasProyectos', JSON.stringify(entregas));
// }

// Base de materiales disponibles por defecto en cada curso
const baseMateriales = {
  "Curso de JavaScript": [
    { tipo: 'video', titulo: 'Intro a JS', descripcion: 'Explicación básica del lenguaje.', imagen: 'https://via.placeholder.com/240x120?text=Video+JS' },
    { tipo: 'pdf', titulo: 'Funciones y Eventos', descripcion: 'Guía en PDF.', imagen: 'https://via.placeholder.com/240x120?text=PDF+JS' },
    { tipo: 'link', titulo: 'W3Schools JavaScript', descripcion: 'Recurso externo.', imagen: 'https://via.placeholder.com/240x120?text=Enlace+JS' }
  ],
  "Curso de HTML y CSS": [
    { tipo: 'video', titulo: 'HTML desde Cero', descripcion: 'Estructura de etiquetas.', imagen: 'https://via.placeholder.com/240x120?text=Video+HTML' },
    { tipo: 'pdf', titulo: 'Guía de Flexbox', descripcion: 'Maquetación moderna.', imagen: 'https://via.placeholder.com/240x120?text=PDF+CSS' },
    { tipo: 'link', titulo: 'MDN HTML/CSS', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+HTML/CSS' }
  ],
  "Curso de Python": [
    { tipo: 'video', titulo: 'Variables en Python', descripcion: 'Uso y ejemplos básicos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Python' },
    { tipo: 'pdf', titulo: 'Estructuras de Control', descripcion: 'Documento explicativo.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Python' },
    { tipo: 'link', titulo: 'Python Docs', descripcion: 'Sitio oficial de documentación.', imagen: 'https://via.placeholder.com/240x120?text=Link+Python' }
  ],
  "Curso de C++": [
    { tipo: 'video', titulo: 'Intro a C++', descripcion: 'Explicación básica del lenguaje.', imagen: 'https://via.placeholder.com/240x120?text=Video+JS' },
    { tipo: 'pdf', titulo: 'Funciones y Bucles', descripcion: 'Guía en PDF.', imagen: 'https://via.placeholder.com/240x120?text=PDF+JS' },
    { tipo: 'link', titulo: 'POO Básica', descripcion: 'Recurso externo.', imagen: 'https://via.placeholder.com/240x120?text=Enlace+JS' }
  ],
  "Curso de Java": [
    { tipo: 'video', titulo: 'Intro a Java', descripcion: 'Estructura de etiquetas.', imagen: 'https://via.placeholder.com/240x120?text=Video+HTML' },
    { tipo: 'pdf', titulo: 'Métodos y Clases', descripcion: 'Maquetación moderna.', imagen: 'https://via.placeholder.com/240x120?text=PDF+CSS' },
    { tipo: 'link', titulo: 'Manejo de Listas', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+HTML/CSS' }
  ],
  "Curso de PHP": [
    { tipo: 'video', titulo: 'Intro a PHP', descripcion: 'Uso y ejemplos básicos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Python' },
    { tipo: 'pdf', titulo: 'Formularios y Datos', descripcion: 'Documento explicativo.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Python' },
    { tipo: 'link', titulo: 'Conexión MySQL', descripcion: 'Sitio oficial de documentación.', imagen: 'https://via.placeholder.com/240x120?text=Link+Python' }
  ],
  "Curso de C#": [
    { tipo: 'video', titulo: 'Intro a C#', descripcion: 'Explicación básica del lenguaje.', imagen: 'https://via.placeholder.com/240x120?text=Video+JS' },
    { tipo: 'pdf', titulo: 'Métodos y Objetos', descripcion: 'Guía en PDF.', imagen: 'https://via.placeholder.com/240x120?text=PDF+JS' },
    { tipo: 'link', titulo: 'LINQ Básico', descripcion: 'Recurso externo.', imagen: 'https://via.placeholder.com/240x120?text=Enlace+JS' }
  ],
  "Curso de Ruby": [
    { tipo: 'video', titulo: 'Intro a Ruby', descripcion: 'Estructura de etiquetas.', imagen: 'https://via.placeholder.com/240x120?text=Video+HTML' },
    { tipo: 'pdf', titulo: 'Métodos y Bloques', descripcion: 'Maquetación moderna.', imagen: 'https://via.placeholder.com/240x120?text=PDF+CSS' },
    { tipo: 'link', titulo: 'Clases y Objetos', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+HTML/CSS' }
  ],
  "Curso de TypeScript": [
    { tipo: 'video', titulo: 'Intro a TypeScript', descripcion: 'Uso y ejemplos básicos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Python' },
    { tipo: 'pdf', titulo: 'Tipos y Funciones', descripcion: 'Documento explicativo.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Python' },
    { tipo: 'link', titulo: 'Clases TS', descripcion: 'Sitio oficial de documentación.', imagen: 'https://via.placeholder.com/240x120?text=Link+Python' }
  ],
  "Curso de Go": [
    { tipo: 'video', titulo: 'Intro a Go', descripcion: 'Uso y ejemplos básicos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Python' },
    { tipo: 'pdf', titulo: 'Funciones y Paquetes', descripcion: 'Documento explicativo.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Python' },
    { tipo: 'link', titulo: 'Concurrencia Simple', descripcion: 'Sitio oficial de documentación.', imagen: 'https://via.placeholder.com/240x120?text=Link+Python' }
  ]
};

// Muestra el nombre del usuario en el panel superior (si existe)
if (usuario && usuario.nombre) {
  document.getElementById('nombre-usuario').textContent = usuario.nombre;
}

// Recupera los cursos en los que está inscrito (solo si es estudiante)
const cursosInscritos = usuario ? JSON.parse(localStorage.getItem(usuario.email)) || [] : [];

// Seleccionamos el contenedor de la lista de cursos
const lista = document.querySelector('#lista-cursos');
lista.innerHTML = ''; // Limpiamos por si había algo antes

// === MOSTRAR CURSOS SEGÚN EL ROL DEL USUARIO ===

if (usuario.rol === 'Profesor') {
  // Filtramos los cursos que tiene asignados este profesor
  const cursosDisponibles = JSON.parse(localStorage.getItem('cursosDisponibles')) || [];
  const cursosAsignados = cursosDisponibles.filter(curso => curso.profesor === usuario.nombre);

  if (cursosAsignados.length === 0) {
    lista.innerHTML = '<li>No tienes cursos asignados.</li>';
  } else {
    cursosAsignados.forEach(curso => {
      // Creamos un <li> y un botón para cada curso
      const li = document.createElement('li');
      const boton = document.createElement('button');
      boton.textContent = 'Administrar';
      boton.onclick = () => mostrarMateriales(curso.nombre); // Llama a la función que muestra los materiales
      li.textContent = curso.nombre + ' ';
      li.appendChild(boton);
      lista.appendChild(li);
    });
  }

} else {
  // Si es estudiante, mostramos los cursos en los que está inscrito
  if (cursosInscritos.length === 0) {
    lista.innerHTML = '<li>No tienes cursos inscritos aún.</li>';
  } else {
    cursosInscritos.forEach(curso => {
      const li = document.createElement('li');
      const boton = document.createElement('button');
      boton.textContent = 'Inicio';
      boton.onclick = () => mostrarMateriales(curso.nombre); // Llama a la misma función, pero solo para visualizar
      li.textContent = curso.nombre + ' ';
      li.appendChild(boton);
      lista.appendChild(li);
    });
  }
}

// === FUNCIÓN PRINCIPAL PARA MOSTRAR LOS MATERIALES DE UN CURSO ===
function mostrarMateriales(nombreCurso) {
  // Ocultamos todos los paneles excepto el de materiales
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'block';

  // Obtenemos todos los materiales disponibles (base + guardados en localStorage)
  const materiales = obtenerMateriales(nombreCurso);
  const contenedor = document.getElementById('contenedor-materiales');
  contenedor.innerHTML = ''; // Limpiamos el contenedor antes de llenarlo

  // === SI EL USUARIO ES PROFESOR, AGREGAMOS UNA TARJETA ESPECIAL PARA AÑADIR MATERIALES ===
  if (usuario.rol === 'Profesor') {
    const tarjetaAgregar = document.createElement('div');
    tarjetaAgregar.className = 'material-card';
    // Estilo de la tarjeta para que se distinga visualmente
    tarjetaAgregar.style.background = '#8c2f00';
    tarjetaAgregar.style.color = 'white';
    tarjetaAgregar.style.justifyContent = 'center';
    tarjetaAgregar.style.alignItems = 'center';
    tarjetaAgregar.style.display = 'flex';
    tarjetaAgregar.style.cursor = 'pointer';
    tarjetaAgregar.innerHTML = '<span style="font-size:18px;">➕ Añadir material</span>';
    // Cuando el profesor hace clic, se abre el formulario de nuevo material
    tarjetaAgregar.onclick = () => {
      cursoActual = nombreCurso; // Guardamos el curso actual en una variable global
      mostrarFormularioMaterial();
    }; contenedor.appendChild(tarjetaAgregar);
  }



  // === MOSTRAMOS CADA MATERIAL COMO UNA TARJETA ===
  materiales.forEach((mat, i) => {
    // Elegimos un icono según el tipo de material
    const icono = mat.tipo === 'video' ? '📹' :
      mat.tipo === 'pdf' ? '📄' :
        mat.tipo === 'link' ? '🔗' :
          mat.tipo === 'proyecto' ? '🧩' : '📁';

    const card = document.createElement('div');
    card.className = 'material-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <img src="${mat.imagen}" alt="${mat.tipo}">
      <h4>${icono} ${mat.titulo}</h4>
      <p>${mat.descripcion}</p>
    `;

    if (mat.tipo === 'proyecto') {
      card.onclick = () => mostrarFormularioProyecto(nombreCurso);
    }

    // Si es profesor y no es un proyecto, puede abrir el formulario de edición
    if (usuario.rol === 'Profesor' && mat.tipo !== 'proyecto') {
      card.onclick = () => mostrarFormularioProyecto(nombreCurso); // Aquí se podría cambiar para abrir proyecto
    }

    // === BOTONES DE EDITAR Y ELIMINAR (SOLO PARA PROFESORES) ===
    if (usuario.rol === 'Profesor' && mat.tipo !== 'proyecto') {
      // Botón editar
      const editarBtn = document.createElement('button');
      editarBtn.textContent = '✏️';
      editarBtn.onclick = (event) => {
        event.stopPropagation(); // Evita que se dispare el onclick general de la tarjeta
        editarMaterial(nombreCurso, i);
      };

      // Botón eliminar
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = '🗑️';
      eliminarBtn.onclick = (event) => {
        event.stopPropagation();
        eliminarMaterial(nombreCurso, i);
      };

      // Añadimos los botones a la tarjeta
      card.appendChild(editarBtn);
      card.appendChild(eliminarBtn);
    }

    // Finalmente, agregamos la tarjeta al contenedor
    contenedor.appendChild(card);
  });
}

function eliminarMaterial(nombreCurso, index) {
  const clave = `materiales-${nombreCurso}`;
  const materiales = JSON.parse(localStorage.getItem(clave)) || [];

  // Confirmación (puedes quitar esto si no quieres confirmación)
  const confirmar = confirm("¿Estás seguro de que quieres eliminar este material?");
  if (!confirmar) return;

  // Eliminamos el material y guardamos
  materiales.splice(index, 1);
  localStorage.setItem(clave, JSON.stringify(materiales));

  // Volvemos a mostrar los materiales
  mostrarMateriales(nombreCurso);

  // Mostramos una notificación visual
  mostrarMensaje('Material eliminado correctamente', 'error'); // o 'success', como prefieras
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


// === EDITAR UN MATERIAL EXISTENTE ===
function editarMaterial(curso, index) {
  const clave = `materiales-${curso}`;
  const materiales = JSON.parse(localStorage.getItem(clave)) || [];

  // Pedimos el nuevo título (podría ampliarse para editar descripción también)
  const nuevoTitulo = prompt('Nuevo título:', materiales[index].titulo);
  if (nuevoTitulo) {
    materiales[index].titulo = nuevoTitulo;
    localStorage.setItem(clave, JSON.stringify(materiales));
    mostrarMateriales(curso);
  }
}

function cerrarMateriales() {
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('cursos-panel').style.display = '';
}

// === MOSTRAR EL FORMULARIO DEL PROYECTO FINAL PARA UN CURSO ===
function mostrarFormularioProyecto(cursoNombre) {
  const contenedor = document.getElementById('contenedor-materiales');
  const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};
  const yaEntregado = entregas[`${cursoNombre}|${usuario.nombre}`];

  contenedor.innerHTML = `
    <div class="material-card" style="width:100%">
      <h3>🧩 Proyecto Final: ${cursoNombre}</h3>
      <p><b>Descripción:</b> ${proyectosFinales[cursoNombre]}</p>
      <p>Este proyecto es obligatorio y debe ser entregado en este apartado.</p>
      ${yaEntregado
      ? `<p style="color:green;font-weight:bold;">✅ Entregado correctamente</p>`
      : `
          <input type="file" id="archivo-proyecto" style="margin: 12px 0;">
          <button onclick="entregarProyecto('${cursoNombre}')">Enviar Proyecto</button>
        `
    }
    </div>
  `;
}

// === ENTREGAR UN PROYECTO FINAL (ALUMNO) ===
function entregarProyecto(cursoNombre) {
  const archivo = document.getElementById('archivo-proyecto').files[0];

  if (!archivo) {
    alert('Por favor selecciona un archivo para subir.');
    return;
  }

  const alumno = usuario.nombre;
  const clave = `${cursoNombre}|${alumno}`;
  const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};
  entregas[clave] = true;
  localStorage.setItem('entregasProyectos', JSON.stringify(entregas));

  mostrarFormularioProyecto(cursoNombre);
}


// Es una especie de "catálogo" de proyectos finales que tiene cada curso
const proyectosFinales = {
  "Curso de JavaScript": "Calculadora web interactiva",
  "Curso de HTML y CSS": "Página web portfolio",
  "Curso de Python": "Analizador de archivos de texto",
  "Curso de C++": "Sistema de inventario en consola",
  "Curso de Java": "Aplicación banco simple",
  "Curso de PHP": "Sistema de registro de usuarios",
  "Curso de C#": "Agenda de contactos con interfaz",
  "Curso de Ruby": "Gestor de tareas en consola",
  "Curso de TypeScript": "App de notas con tipado seguro",
  "Curso de Go": "Servidor web HTTP básico"
};

// === OBTENER TODOS LOS MATERIALES DE UN CURSO (CON EL PROYECTO INCLUIDO) ===
function obtenerMateriales(curso) {
  const clave = `materiales-${curso}`;
  const guardados = JSON.parse(localStorage.getItem(clave)) || [];

  // Copiamos los materiales base definidos al inicio (videos, pdfs, etc.)
  const base = [...(baseMateriales[curso] || [])];

  // Verificamos si ya existe un proyecto final (para no duplicarlo)
  const yaTieneProyecto = [...base, ...guardados].some(m => m.tipo === 'proyecto');

  if (!yaTieneProyecto && proyectosFinales[curso]) {
    // Insertamos el proyecto final al principio de la lista
    base.unshift({
      tipo: 'proyecto',
      titulo: 'Proyecto Final',
      descripcion: proyectosFinales[curso],
      imagen: 'https://via.placeholder.com/240x120?text=Proyecto+Final'
    });
  }

  return [...base, ...guardados]; // Devolvemos la lista completa
}

// Carga inicial de avance al abrir la pestaña
document.querySelector('#btn-avance').addEventListener('click', () => {
  mostrarAvance(document.querySelector('#avance-panel select').value);
});

// Cambio de filtro en el select (para filtrar por curso)
document.querySelector('#avance-panel select').addEventListener('change', (e) => {
  mostrarAvance(e.target.value);
});

// Muestra el avance de los cursos (profesor vs estudiante)
function mostrarAvance(filtro) {
  const contenedor = document.querySelector('#avance-panel .mensaje-avance');
  contenedor.innerHTML = '';

  if (usuario.rol === 'Profesor') {
    const cursosDisponibles = JSON.parse(localStorage.getItem('cursosDisponibles')) || [];
    const cursosAsignados = cursosDisponibles.filter(curso => curso.profesor === usuario.nombre);

    if (cursosAsignados.length === 0) {
      contenedor.innerHTML = '<p>No tienes cursos asignados.</p>';
      return;
    }

    // Profesor ve avance de alumnos ficticios
    const curso = cursosAsignados[0];
    const alumnosFicticios = [
      'Ana García', 'Luis Pérez', 'María López', 'Carlos Díaz',
      'Fernanda Ruiz', 'Jorge Romero', 'Isabel Herrera', 'Pedro Torres'
    ];

    alumnosFicticios.forEach(nombre => {
      const progreso = Math.floor(Math.random() * 50) + 30; // porcentaje aleatorio
      const entregado = Math.random() > 0.5; // mitad entregaron

      const tarjeta = document.createElement('div');
      tarjeta.classList.add('material-card');
      tarjeta.style.cursor = 'default';
      tarjeta.innerHTML = `
        <h4>${nombre} ${entregado ? '✅' : ''}</h4>
        <p style="margin: 5px 0; color: #a63b01;"><b>Curso:</b> ${curso.nombre}</p>
        <div style="background:#ffd9c9;height:14px;border-radius:5px;overflow:hidden;">
          <div style="width:${progreso}%;height:100%;background:#ff5b00;"></div>
        </div>
        <p style="margin-top:6px;color:#a63b01;font-weight:bold;">${progreso}% completado</p>
      `;
      contenedor.appendChild(tarjeta);
    });

  } else {
    // Estudiante ve su propio avance
    const cursos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];
    const filtrados = filtro === "Todos los cursos"
      ? cursos
      : cursos.filter(c => c.nombre.includes(filtro));

    if (filtrados.length === 0) {
      contenedor.innerHTML = `
        <b>¡Aún no hay progreso!</b><br>
        Cuando tengas actividad, tu avance aparecerá aquí.
      `;
      return;
    }

    filtrados.forEach(curso => {
      const progreso = Math.floor(Math.random() * 50) + 30;
      const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};
      const entregado = entregas[curso.nombre];

      const tarjeta = document.createElement('div');
      tarjeta.classList.add('material-card');
      tarjeta.innerHTML = `
        <h4>${curso.nombre} ${entregado ? '✅' : ''}</h4>
        <div style="margin: 8px 0;">
          <div style="background:#ffd9c9;height:14px;border-radius:5px;overflow:hidden;">
            <div style="width:${progreso}%;height:100%;background:#ff5b00;"></div>
          </div>
          <p style="margin-top:6px;color:#a63b01;font-weight:bold;">${progreso}% completado</p>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  }
}

function mostrarCalificaciones() {
  const cuerpo = document.getElementById('cuerpo-calificaciones');
  cuerpo.innerHTML = '';

  const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};

  if (usuario.rol !== 'Profesor') {
    const cursos = cursosInscritos.length ? cursosInscritos : [];

    cursos.forEach(curso => {
      const claveEntrega = `${curso.nombre}|${usuario.nombre}`;
      const entregado = entregas[claveEntrega];
      const claveCalificacion = `calificacion-${claveEntrega}`;
      const calificacion = JSON.parse(localStorage.getItem(claveCalificacion));

      if (entregado && calificacion) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${curso.nombre}</td>
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">Proyecto Final</td>
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${calificacion.nota}</td>
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${calificacion.comentario}</td>
        `;
        cuerpo.appendChild(tr);
      }
    });

  } else {
    const cursosDisponibles = JSON.parse(localStorage.getItem('cursosDisponibles')) || [];
    const cursosAsignados = cursosDisponibles.filter(c => c.profesor === usuario.nombre);

    Object.keys(entregas).forEach(clave => {
      const [curso, alumno] = clave.split('|');
      if (cursosAsignados.some(c => c.nombre === curso)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${curso}</td>
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${alumno}</td>
          <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">
            <button onclick="abrirFormularioCalificacion('${curso}', '${alumno}')">Calificar</button>
          </td>
          <td></td>
        `;
        cuerpo.appendChild(tr);
      }
    });
  }
}


let proyectoActual = { curso: '', alumno: '' };

function abrirFormularioCalificacion(curso, alumno) {
  proyectoActual = { curso, alumno };

  const modal = document.getElementById('modal-calificacion');
  modal.style.display = 'flex';
  document.getElementById('info-proyecto').innerText = `Curso: ${curso}\nAlumno: ${alumno}`;
  document.getElementById('nota-calificacion').value = '';
  document.getElementById('comentario-calificacion').value = '';
  document.getElementById('formulario-calificacion').style.display = 'block';
}

function cerrarFormularioCalificacion() {
  const modal = document.getElementById('modal-calificacion');
  modal.style.display = 'none';
}


function guardarCalificacion() {
  const nota = document.getElementById('nota-calificacion').value;
  const comentario = document.getElementById('comentario-calificacion').value;

  if (!nota || !comentario) {
    alert('Por favor ingresa una nota y un comentario.');
    return;
  }

  const key = `calificacion-${proyectoActual.curso}|${proyectoActual.alumno}`;
  localStorage.setItem(key, JSON.stringify({ nota, comentario }));

  alert('✅ Calificación guardada');
  cerrarFormularioCalificacion();
  mostrarCalificaciones();
}

// Mostrar formulario cuando se hace clic en el botón "Añadir nuevo material"
function mostrarFormularioMaterial() {
  // Asegúrate de que el formulario esté visible
  document.getElementById("formulario-material").style.display = "flex";
}

// Cerrar el formulario cuando se hace clic en "Cancelar"
function cancelarFormulario() {
  // Vuelve a ocultar el formulario
  document.getElementById("formulario-material").style.display = "none";
}

let cursoActual = null;

// Agregar un nuevo material (esto podría estar en tu función de "Guardar")
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-material").addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const tipo = document.getElementById("tipo").value;
    const imagen = document.getElementById("imagen").value;

    if (!titulo || !descripcion || !tipo) {
      mostrarErrorFormulario("⚠️ Por favor completa todos los campos obligatorios.");
      return;
    }

    const nuevoMaterial = { titulo, descripcion, tipo, imagen };

    if (cursoActual) {
      const clave = `materiales-${cursoActual}`;
      const existentes = JSON.parse(localStorage.getItem(clave)) || [];
      existentes.push(nuevoMaterial);
      localStorage.setItem(clave, JSON.stringify(existentes));
      mostrarMateriales(cursoActual);
    }

    mostrarMensajeExito(); // ✅ Mostrar confirmación flotante
    cancelarFormulario(); // Ocultar formulario
  });
});

function mostrarMensajeExito() {
  const mensaje = document.getElementById("mensaje-exito");
  mensaje.style.display = "block";
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
}

function mostrarErrorFormulario(mensaje) {
  const contenedor = document.getElementById("mensaje-error");
  contenedor.textContent = mensaje;
  contenedor.style.display = "block";

  setTimeout(() => {
    contenedor.style.display = "none";
  }, 3000);
}

