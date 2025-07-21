document.getElementById('btn-cursos').onclick = function () {
  document.getElementById('cursos-panel').style.display = '';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'none';
  this.classList.add('activo');
  document.getElementById('btn-avance').classList.remove('activo');
};

document.getElementById('btn-avance').onclick = function () {
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = '';
  document.getElementById('materiales-panel').style.display = 'none';
  this.classList.add('activo');
  document.getElementById('btn-cursos').classList.remove('activo');
};

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
  document.getElementById('materiales-panel').style.display = 'block';

  const materiales = obtenerMateriales(nombreCurso);
  const contenedor = document.getElementById('contenedor-materiales');
  contenedor.innerHTML = '';

  materiales.forEach(mat => {
    const icono = mat.tipo === 'video' ? '📹' :
      mat.tipo === 'pdf' ? '📄' :
        mat.tipo === 'link' ? '🔗' : '📁';

    const card = document.createElement('div');
    card.className = 'material-card';
    card.innerHTML = `
    <img src="${mat.imagen}" alt="${mat.tipo}">
    <h4>${icono} ${mat.titulo}</h4>
    <p>${mat.descripcion}</p>
  `;
    contenedor.appendChild(card);
  });
}

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

  return base[curso] || [
    { tipo: 'pdf', titulo: 'Guía general del curso', descripcion: 'Material base para empezar.', imagen: 'https://via.placeholder.com/240x120?text=PDF' }
  ];
}