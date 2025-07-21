document.getElementById('btn-cursos').onclick = function () {
  document.getElementById('cursos-panel').style.display = '';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';
  this.classList.add('activo');
  document.getElementById('btn-avance').classList.remove('activo');
  document.getElementById('btn-calificaciones').classList.remove('activo');
};

document.getElementById('btn-avance').onclick = function () {
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = '';
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';
  this.classList.add('activo');
  document.getElementById('btn-cursos').classList.remove('activo');
  document.getElementById('btn-calificaciones').classList.remove('activo');
};

const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

if (usuario && usuario.nombre) {
  document.getElementById('nombre-usuario').textContent = usuario.nombre;
}

const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];
const lista = document.querySelector('#lista-cursos');
lista.innerHTML = '';

if (cursosInscritos.length === 0) {
  lista.innerHTML = '<li>No tienes cursos inscritos aún.</li>';
} else {
  cursosInscritos.forEach(curso => {
    const li = document.createElement('li');
    const boton = document.createElement('button');
    boton.textContent = 'Inicio';
    boton.onclick = () => mostrarMateriales(curso.nombre);
    li.textContent = curso.nombre + ' ';
    li.appendChild(boton);
    lista.appendChild(li);
  });
}

function mostrarMateriales(nombreCurso) {
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'block';

  const materiales = obtenerMateriales(nombreCurso);
  const contenedor = document.getElementById('contenedor-materiales');
  contenedor.innerHTML = '';

  materiales.forEach(mat => {
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

    contenedor.appendChild(card);
  });
}

function mostrarFormularioProyecto(cursoNombre) {
  const contenedor = document.getElementById('contenedor-materiales');
  const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};
  const yaEntregado = entregas[cursoNombre];

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

function entregarProyecto(cursoNombre) {
  const archivo = document.getElementById('archivo-proyecto').files[0];
  if (!archivo) {
    alert('Por favor selecciona un archivo para subir.');
    return;
  }

  const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};
  entregas[cursoNombre] = true;
  localStorage.setItem('entregasProyectos', JSON.stringify(entregas));

  mostrarFormularioProyecto(cursoNombre);
}

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

function cerrarMateriales() {
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('cursos-panel').style.display = '';
}


function obtenerMateriales(curso) {
  const base = {
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
    ]
  };

  let materiales = base[curso] || [];
  if (proyectosFinales[curso]) {
    materiales.unshift({
      tipo: 'proyecto',
      titulo: 'Proyecto Final',
      descripcion: proyectosFinales[curso],
      imagen: 'https://via.placeholder.com/240x120?text=Proyecto+Final'
    });
  }

  return materiales;
}
mostrarAvance("Todos los cursos");

document.querySelector('#btn-avance').addEventListener('click', () => {
  mostrarAvance(document.querySelector('#avance-panel select').value);
});

document.querySelector('#avance-panel select').addEventListener('change', (e) => {
  mostrarAvance(e.target.value);
});

function mostrarAvance(filtro) {
  const cursos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];
  const contenedor = document.querySelector('#avance-panel .mensaje-avance');
  contenedor.innerHTML = '';

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
    const progreso = Math.floor(Math.random() * 50) + 30; // simulado

    const estadoProyectos = JSON.parse(localStorage.getItem('entregasProyectos')) || {};
    const entregado = estadoProyectos[curso.nombre];

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('material-card');
    tarjeta.style.cursor = 'pointer';

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

document.getElementById('btn-calificaciones').onclick = function () {
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'block';

  this.classList.add('activo');
  document.getElementById('btn-cursos').classList.remove('activo');
  document.getElementById('btn-avance').classList.remove('activo');

  mostrarCalificaciones();
};

function mostrarCalificaciones() {
  const cursos = cursosInscritos.length ? cursosInscritos : [];
  const cuerpo = document.getElementById('cuerpo-calificaciones');
  cuerpo.innerHTML = '';

  cursos.forEach(curso => {
    const nota = (Math.random() * 4 + 6).toFixed(1); // nota entre 6.0 y 10.0
    const comentarios = [
      "Buen trabajo, sigue así.",
      "Excelente esfuerzo, puedes mejorar algunos detalles.",
      "Entrega puntual y clara.",
      "Requiere mayor desarrollo en el análisis.",
      "Muy buen dominio del tema."
    ];
    const comentario = comentarios[Math.floor(Math.random() * comentarios.length)];

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${curso.nombre}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${curso.nombre} - Proyecto Final</td>
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${nota}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${comentario}</td>
    `;
    cuerpo.appendChild(tr);
  });
}