// Mostrar la sección de cursos y ocultar las demás
document.getElementById('btn-cursos').onclick = function () {
  // Mostramos el panel de cursos disponibles
  document.getElementById('cursos-panel').style.display = '';
  // Ocultamos los demás para que solo quede visible el actual
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';
  this.classList.add('activo');
  document.getElementById('btn-avance').classList.remove('activo');
  document.getElementById('btn-calificaciones').classList.remove('activo');
};

// Cuando el usuario hace clic en "Avance"
document.getElementById('btn-avance').onclick = function () {
  // Ocultamos cursos y muestra el panel de avance
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

// Aquí empezamos con lo del usuario y el dashboard inicial

// Recuperamos al usuario que está logueado desde el localStorage
const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

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
  ],
  "Java para Principiantes": [
    { tipo: 'video', titulo: 'Java Básico', descripcion: 'Primeros pasos con Java.', imagen: 'https://via.placeholder.com/240x120?text=Video+Java' },
    { tipo: 'pdf', titulo: 'Variables y Operadores', descripcion: 'Guía básica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Java' },
    { tipo: 'link', titulo: 'Oracle Java', descripcion: 'Recurso oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Java' }
  ],
  "Ciberseguridad": [
    { tipo: 'video', titulo: 'Protección de Datos', descripcion: 'Buenas prácticas.', imagen: 'https://via.placeholder.com/240x120?text=Video+Cyber' },
    { tipo: 'pdf', titulo: 'Seguridad en Redes', descripcion: 'Guía completa.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Cyber' },
    { tipo: 'link', titulo: 'OWASP Top 10', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Cyber' }
  ],
  "Diseño Gráfico": [
    { tipo: 'video', titulo: 'Principios del Diseño', descripcion: 'Teoría visual.', imagen: 'https://via.placeholder.com/240x120?text=Video+Design' },
    { tipo: 'pdf', titulo: 'Paleta de Colores', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Design' },
    { tipo: 'link', titulo: 'Behance Tips', descripcion: 'Inspiración visual.', imagen: 'https://via.placeholder.com/240x120?text=Link+Design' }
  ],
  "Excel Avanzado": [
    { tipo: 'video', titulo: 'Tablas Dinámicas', descripcion: 'Organiza datos fácilmente.', imagen: 'https://via.placeholder.com/240x120?text=Video+Excel' },
    { tipo: 'pdf', titulo: 'Fórmulas Complejas', descripcion: 'Guía paso a paso.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Excel' },
    { tipo: 'link', titulo: 'Macros Básicas', descripcion: 'Automatiza procesos.', imagen: 'https://via.placeholder.com/240x120?text=Link+Excel' }
  ],
  "Power BI": [
    { tipo: 'video', titulo: 'Modelado de Datos', descripcion: 'Estructura correcta.', imagen: 'https://via.placeholder.com/240x120?text=Video+BI' },
    { tipo: 'pdf', titulo: 'Visualizaciones Efectivas', descripcion: 'Cómo mostrar datos.', imagen: 'https://via.placeholder.com/240x120?text=PDF+BI' },
    { tipo: 'link', titulo: 'Power BI Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+BI' }
  ],
  "Data Science": [
    { tipo: 'video', titulo: 'Intro a Data Science', descripcion: 'Analiza datos con Python.', imagen: 'https://via.placeholder.com/240x120?text=Video+DS' },
    { tipo: 'pdf', titulo: 'Limpieza de Datos', descripcion: 'Técnicas básicas.', imagen: 'https://via.placeholder.com/240x120?text=PDF+DS' },
    { tipo: 'link', titulo: 'Kaggle Docs', descripcion: 'Ejemplos prácticos.', imagen: 'https://via.placeholder.com/240x120?text=Link+DS' }
  ],
  "Machine Learning": [
    { tipo: 'video', titulo: 'Modelos Predictivos', descripcion: 'Predicciones automáticas.', imagen: 'https://via.placeholder.com/240x120?text=Video+ML' },
    { tipo: 'pdf', titulo: 'Regresión y Clasificación', descripcion: 'Guía completa.', imagen: 'https://via.placeholder.com/240x120?text=PDF+ML' },
    { tipo: 'link', titulo: 'Scikit Learn Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+ML' }
  ],
  "APIs REST": [
    { tipo: 'video', titulo: 'Qué son las APIs REST', descripcion: 'Explicación desde cero.', imagen: 'https://via.placeholder.com/240x120?text=Video+API' },
    { tipo: 'pdf', titulo: 'Guía de Endpoints', descripcion: 'Estructura de una API.', imagen: 'https://via.placeholder.com/240x120?text=PDF+API' },
    { tipo: 'link', titulo: 'Swagger Docs', descripcion: 'Documentación estándar.', imagen: 'https://via.placeholder.com/240x120?text=Link+API' }
  ],
  "Docker": [
    { tipo: 'video', titulo: 'Contenerización Básica', descripcion: 'Conceptos y ejemplos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Docker' },
    { tipo: 'pdf', titulo: 'Dockerfile y Volúmenes', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Docker' },
    { tipo: 'link', titulo: 'Docker Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Docker' }
  ],
  "Scrum & Agile": [
    { tipo: 'video', titulo: 'Fundamentos de Scrum', descripcion: 'Roles y eventos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Scrum' },
    { tipo: 'pdf', titulo: 'Manifiesto Ágil', descripcion: 'Principios básicos.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Scrum' },
    { tipo: 'link', titulo: 'Scrum Guide', descripcion: 'Guía oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Scrum' }
  ],
  "Curso de React": [
    { tipo: 'video', titulo: 'Componentes en React', descripcion: 'Creación y uso.', imagen: 'https://via.placeholder.com/240x120?text=Video+React' },
    { tipo: 'pdf', titulo: 'Props y Estado', descripcion: 'Guía básica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+React' },
    { tipo: 'link', titulo: 'React Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+React' }
  ],
  "Curso de Node.js": [
    { tipo: 'video', titulo: 'Node.js desde Cero', descripcion: 'Servidor básico.', imagen: 'https://via.placeholder.com/240x120?text=Video+Node' },
    { tipo: 'pdf', titulo: 'Express y Rutas', descripcion: 'Guía rápida.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Node' },
    { tipo: 'link', titulo: 'Node.js Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Node' }
  ],
  "Curso de SQL": [
    { tipo: 'video', titulo: 'Consultas Básicas', descripcion: 'Select, Insert y Update.', imagen: 'https://via.placeholder.com/240x120?text=Video+SQL' },
    { tipo: 'pdf', titulo: 'Joins y Relaciones', descripcion: 'Guía detallada.', imagen: 'https://via.placeholder.com/240x120?text=PDF+SQL' },
    { tipo: 'link', titulo: 'SQL Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+SQL' }
  ],
  "Curso de NoSQL": [
    { tipo: 'video', titulo: 'MongoDB Básico', descripcion: 'Colecciones y documentos.', imagen: 'https://via.placeholder.com/240x120?text=Video+NoSQL' },
    { tipo: 'pdf', titulo: 'Consultas NoSQL', descripcion: 'Ejemplos prácticos.', imagen: 'https://via.placeholder.com/240x120?text=PDF+NoSQL' },
    { tipo: 'link', titulo: 'MongoDB Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+NoSQL' }
  ],
  "Curso de Kotlin": [
    { tipo: 'video', titulo: 'Intro a Kotlin', descripcion: 'Sintaxis y variables.', imagen: 'https://via.placeholder.com/240x120?text=Video+Kotlin' },
    { tipo: 'pdf', titulo: 'POO en Kotlin', descripcion: 'Clases y objetos.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Kotlin' },
    { tipo: 'link', titulo: 'Kotlin Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Kotlin' }
  ],
  "Curso de Swift": [
    { tipo: 'video', titulo: 'Intro a Swift', descripcion: 'Variables y funciones.', imagen: 'https://via.placeholder.com/240x120?text=Video+Swift' },
    { tipo: 'pdf', titulo: 'Interfaces iOS', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Swift' },
    { tipo: 'link', titulo: 'Swift Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Swift' }
  ],
  "Curso de Unity 3D": [
    { tipo: 'video', titulo: 'Unity Básico', descripcion: 'Creación de escenas.', imagen: 'https://via.placeholder.com/240x120?text=Video+Unity' },
    { tipo: 'pdf', titulo: 'Animaciones en Unity', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Unity' },
    { tipo: 'link', titulo: 'Unity Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Unity' }
  ],
  "Curso de Unreal Engine": [
    { tipo: 'video', titulo: 'Blueprints Básicos', descripcion: 'Programación visual.', imagen: 'https://via.placeholder.com/240x120?text=Video+Unreal' },
    { tipo: 'pdf', titulo: 'Físicas y Colisiones', descripcion: 'Guía detallada.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Unreal' },
    { tipo: 'link', titulo: 'Unreal Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Unreal' }
  ],
  "Curso de Blockchain": [
    { tipo: 'video', titulo: 'Intro a Blockchain', descripcion: 'Conceptos y usos.', imagen: 'https://via.placeholder.com/240x120?text=Video+Blockchain' },
    { tipo: 'pdf', titulo: 'Contratos Inteligentes', descripcion: 'Cómo funcionan.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Blockchain' },
    { tipo: 'link', titulo: 'Ethereum Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Blockchain' }
  ],
  "Curso de Inteligencia Artificial": [
    { tipo: 'video', titulo: 'Redes Neuronales', descripcion: 'Conceptos básicos.', imagen: 'https://via.placeholder.com/240x120?text=Video+IA' },
    { tipo: 'pdf', titulo: 'Algoritmos de IA', descripcion: 'Guía completa.', imagen: 'https://via.placeholder.com/240x120?text=PDF+IA' },
    { tipo: 'link', titulo: 'TensorFlow Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+IA' }
  ],
  "Curso de Big Data": [
    { tipo: 'video', titulo: 'Procesamiento Masivo', descripcion: 'Uso de Hadoop.', imagen: 'https://via.placeholder.com/240x120?text=Video+BigData' },
    { tipo: 'pdf', titulo: 'Spark y MapReduce', descripcion: 'Guía avanzada.', imagen: 'https://via.placeholder.com/240x120?text=PDF+BigData' },
    { tipo: 'link', titulo: 'Cloudera Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+BigData' }
  ],
  "Curso de UX/UI": [
    { tipo: 'video', titulo: 'Principios de UX', descripcion: 'Diseño centrado en el usuario.', imagen: 'https://via.placeholder.com/240x120?text=Video+UX' },
    { tipo: 'pdf', titulo: 'Wireframes y Prototipos', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+UX' },
    { tipo: 'link', titulo: 'NNGroup UX', descripcion: 'Referencias y estudios.', imagen: 'https://via.placeholder.com/240x120?text=Link+UX' }
  ],
  "Curso de Adobe Illustrator": [
    { tipo: 'video', titulo: 'Ilustraciones Vectoriales', descripcion: 'Técnicas básicas.', imagen: 'https://via.placeholder.com/240x120?text=Video+Illustrator' },
    { tipo: 'pdf', titulo: 'Sombras y Gradientes', descripcion: 'Guía paso a paso.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Illustrator' },
    { tipo: 'link', titulo: 'Adobe Illustrator Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Illustrator' }
  ],
  "Curso de Photoshop": [
    { tipo: 'video', titulo: 'Retoque Fotográfico', descripcion: 'Herramientas básicas.', imagen: 'https://via.placeholder.com/240x120?text=Video+Photoshop' },
    { tipo: 'pdf', titulo: 'Capas y Máscaras', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Photoshop' },
    { tipo: 'link', titulo: 'Adobe Photoshop Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Photoshop' }
  ],
  "Curso de After Effects": [
    { tipo: 'video', titulo: 'Animaciones Básicas', descripcion: 'Keyframes y movimientos.', imagen: 'https://via.placeholder.com/240x120?text=Video+AE' },
    { tipo: 'pdf', titulo: 'Efectos Visuales', descripcion: 'Guía paso a paso.', imagen: 'https://via.placeholder.com/240x120?text=PDF+AE' },
    { tipo: 'link', titulo: 'After Effects Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+AE' }
  ],
  "Curso de WordPress": [
    { tipo: 'video', titulo: 'Creación de Páginas', descripcion: 'Estructura básica.', imagen: 'https://via.placeholder.com/240x120?text=Video+WP' },
    { tipo: 'pdf', titulo: 'Plugins y Widgets', descripcion: 'Guía detallada.', imagen: 'https://via.placeholder.com/240x120?text=PDF+WP' },
    { tipo: 'link', titulo: 'WordPress Docs', descripcion: 'Referencia oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+WP' }
  ],
  "Curso de Marketing Digital": [
    { tipo: 'video', titulo: 'Publicidad en Redes', descripcion: 'Campañas efectivas.', imagen: 'https://via.placeholder.com/240x120?text=Video+Marketing' },
    { tipo: 'pdf', titulo: 'SEO Básico', descripcion: 'Optimiza tu web.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Marketing' },
    { tipo: 'link', titulo: 'Google Marketing', descripcion: 'Guía oficial.', imagen: 'https://via.placeholder.com/240x120?text=Link+Marketing' }
  ],
  "Curso de Ventas Online": [
    { tipo: 'video', titulo: 'Estrategias de E-commerce', descripcion: 'Aumenta tus ventas.', imagen: 'https://via.placeholder.com/240x120?text=Video+Ventas' },
    { tipo: 'pdf', titulo: 'Psicología del Consumidor', descripcion: 'Guía útil.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Ventas' },
    { tipo: 'link', titulo: 'Shopify Blog', descripcion: 'Consejos prácticos.', imagen: 'https://via.placeholder.com/240x120?text=Link+Ventas' }
  ],
  "Curso de Finanzas Personales": [
    { tipo: 'video', titulo: 'Ahorro e Inversiones', descripcion: 'Planifica tu futuro.', imagen: 'https://via.placeholder.com/240x120?text=Video+Finanzas' },
    { tipo: 'pdf', titulo: 'Presupuestos Efectivos', descripcion: 'Guía básica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Finanzas' },
    { tipo: 'link', titulo: 'Finanzas para Todos', descripcion: 'Consejos prácticos.', imagen: 'https://via.placeholder.com/240x120?text=Link+Finanzas' }
  ],
  "Curso de Liderazgo": [
    { tipo: 'video', titulo: 'Gestión de Equipos', descripcion: 'Motiva a tu equipo.', imagen: 'https://via.placeholder.com/240x120?text=Video+Liderazgo' },
    { tipo: 'pdf', titulo: 'Toma de Decisiones', descripcion: 'Guía práctica.', imagen: 'https://via.placeholder.com/240x120?text=PDF+Liderazgo' },
    { tipo: 'link', titulo: 'Harvard Business', descripcion: 'Artículos sobre liderazgo.', imagen: 'https://via.placeholder.com/240x120?text=Link+Liderazgo' }
  ]
};

// Si el usuario existe y tiene nombre, se muestra en el panel de arriba
if (usuario && usuario.nombre) {
  document.getElementById('nombre-usuario').textContent = usuario.nombre;
}

// Recupera los cursos en los que está inscrito (solo si es estudiante)
const cursosInscritos = usuario ? JSON.parse(localStorage.getItem(usuario.email)) || [] : [];

// Aquí agarramos el UL donde van los cursos (para luego llenarlo)
const lista = document.querySelector('#lista-cursos');
lista.innerHTML = ''; // Limpiamos por si había algo antes

// === Visualización dinámica según el rol del usuario ===  
// Este bloque determina qué cursos mostrar dependiendo si el usuario es un Profesor o un Estudiante.  
// Se ejecuta apenas se carga el panel de cursos y personaliza la experiencia del dashboard.  
// Implementado con ayuda de GenAI (ChatGPT) como parte de la lógica de acceso dinámico a contenido educativo.
//
// Prompt usado:  
// "Quiero que un sistema muestre diferentes botones y acciones según el rol del usuario que inicia sesión (Profesor o Estudiante) usando HTML, CSS y JavaScript."  

if (usuario.rol === 'Profesor') {
  // Filtramos los cursos que tiene asignados este profesor
  const cursosDisponibles = JSON.parse(localStorage.getItem('cursosDisponibles')) || [];
  const cursosAsignados = cursosDisponibles.filter(curso => curso.profesor === usuario.nombre);

  // mensaje por si el profesor no tiene cursos asignados
  if (cursosAsignados.length === 0) {
    lista.innerHTML = '<li>No tienes cursos asignados.</li>';
  } else {

    // si tiene cursos asignados mostramos los botones de administrar
    cursosAsignados.forEach(curso => {
      // Creamos un <li> y un botón para cada curso
      const li = document.createElement('li');
      const boton = document.createElement('button');
      boton.textContent = 'Administrar';
      boton.onclick = () => mostrarMateriales(curso.nombre);
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
      boton.onclick = () => mostrarMateriales(curso.nombre);
      li.textContent = curso.nombre + ' ';
      li.appendChild(boton);
      lista.appendChild(li);
    });
  }
}

// aquí empieza la función donde se muestran los materiales de un curso
function mostrarMateriales(nombreCurso) {
  // Ocultamos todo lo demás, solo queremos ver materiales
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = 'none';
  document.getElementById('calificaciones-panel').style.display = 'none';
  document.getElementById('materiales-panel').style.display = 'block';

  // Traemos lo que se ha guardado del curso (lo del profesor o lo que el user subió)
  const guardados = JSON.parse(localStorage.getItem(`materiales-${nombreCurso}`)) || [];
  const base = [...(baseMateriales[nombreCurso] || [])];

  // Verificamos si ya hay un proyecto final
  const yaTieneProyecto = [...base, ...guardados].some(m => m.tipo === 'proyecto');
  if (!yaTieneProyecto && proyectosFinales[nombreCurso]) {
    // Si no hay, lo metemos al principio 
    base.unshift({
      tipo: 'proyecto',
      titulo: 'Proyecto Final',
      descripcion: proyectosFinales[nombreCurso],
      imagen: 'https://via.placeholder.com/240x120?text=Proyecto+Final'
    });
  }

  const materiales = [...base, ...guardados];
  const contenedor = document.getElementById('contenedor-materiales');
  contenedor.innerHTML = '';

  // Si el user es profesor, agregamos una tarjeta especial para subir materiales
  if (usuario.rol === 'Profesor') {
    const tarjetaAgregar = document.createElement('div');
    tarjetaAgregar.className = 'material-card';
    tarjetaAgregar.style.background = '#8c2f00';
    tarjetaAgregar.style.color = 'white';
    tarjetaAgregar.style.justifyContent = 'center';
    tarjetaAgregar.style.alignItems = 'center';
    tarjetaAgregar.style.display = 'flex';
    tarjetaAgregar.style.cursor = 'pointer';
    tarjetaAgregar.innerHTML = '<span style="font-size:18px;">➕ Añadir material</span>';
    tarjetaAgregar.onclick = () => {
      cursoActual = nombreCurso;
      mostrarFormularioMaterial(); // Abrimos el formulario para subir el material
    };
    contenedor.appendChild(tarjetaAgregar);
  }

  // Recorremos los materiales para mostrarlos uno a uno como tarjetas
  materiales.forEach((mat, i) => {
    const icono = mat.tipo === 'video' ? '📹' :
      mat.tipo === 'pdf' ? '📄' :
        mat.tipo === 'link' ? '🔗' :
          mat.tipo === 'proyecto' ? '🧩' : '📁';

    const card = document.createElement('div');
    card.className = 'material-card';
    card.innerHTML = `
  <img src="${mat.imagen}" alt="${mat.tipo}">
  <h4>${icono} ${mat.titulo}</h4>
  <p>${mat.descripcion}</p>
`;

    // Si es el proyecto final, que sea clickeable para entregar
    if (mat.tipo === 'proyecto') {
      card.style.cursor = 'pointer';
      card.onclick = () => {
        mostrarFormularioProyecto(nombreCurso);
      };
    }

    // Solo los profes pueden editar o borrar (y no aplica al proyecto)
    if (usuario.rol === 'Profesor' && mat.tipo !== 'proyecto') {
      const indexEnGuardados = guardados.findIndex(g => g.titulo === mat.titulo && g.descripcion === mat.descripcion);

      if (indexEnGuardados !== -1) {
        const editarBtn = document.createElement('button');
        editarBtn.textContent = '✏️';
        editarBtn.style.marginRight = '5px';
        editarBtn.onclick = (event) => {
          event.stopPropagation();
          editarMaterial(nombreCurso, indexEnGuardados);
        };

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = '🗑️';
        eliminarBtn.style.marginLeft = '5px';
        eliminarBtn.onclick = (event) => {
          event.stopPropagation();
          eliminarMaterial(nombreCurso, indexEnGuardados);
        };

        const acciones = document.createElement('div');
        acciones.style.display = 'flex';
        acciones.style.justifyContent = 'center';
        acciones.style.marginTop = '10px';
        acciones.appendChild(editarBtn);
        acciones.appendChild(eliminarBtn);

        card.appendChild(acciones);
      }
    }

    contenedor.appendChild(card);
  });
}

function eliminarMaterial(nombreCurso, index) {
  const clave = `materiales-${nombreCurso}`;
  const materiales = JSON.parse(localStorage.getItem(clave)) || [];

  const confirmar = confirm("¿Estás seguro de que quieres eliminar este material?");
  if (!confirmar) return;

  materiales.splice(index, 1);
  localStorage.setItem(clave, JSON.stringify(materiales));
  mostrarMateriales(nombreCurso);
  mostrarMensaje('Material eliminado correctamente', 'success');
}


// mensaje que confirma el estado de la accion
function mostrarMensaje(texto, tipo = 'success') {
  const mensaje = document.createElement('div');
  mensaje.className = `mensaje-flotante ${tipo}`;
  mensaje.textContent = texto;
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 2500);
}


// === Funcion de editar un material existente ===
function editarMaterial(curso, index) {
  const clave = `materiales-${curso}`;
  const materiales = JSON.parse(localStorage.getItem(clave)) || [];

  // Pedimos el nuevo título 
  const nuevoTitulo = prompt('Nuevo título:', materiales[index].titulo);
  if (nuevoTitulo) {
    materiales[index].titulo = nuevoTitulo;
    localStorage.setItem(clave, JSON.stringify(materiales));
    mostrarMateriales(curso);
  }
}

// cierra el panel de subir materiales
function cerrarMateriales() {
  document.getElementById('materiales-panel').style.display = 'none';
  document.getElementById('cursos-panel').style.display = '';
}

//función para mostrar el formulario del proyecto final 
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

// funcion de entregar un proyecto final (estudiante)
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


// proyectos finales de cada curso
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
  "Curso de Go": "Servidor web HTTP básico",
  "Curso de React": "Clon de Instagram con componentes",
  "Curso de Node.js": "API REST para un blog",
  "Curso de SQL": "Base de datos para una tienda online",
  "Curso de NoSQL": "Gestor de usuarios con MongoDB",
  "Curso de Kotlin": "App de recetas para Android",
  "Curso de Swift": "App de clima para iOS",
  "Curso de Unity 3D": "Videojuego de plataformas en 2D",
  "Curso de Unreal Engine": "Demo interactiva en primera persona",
  "Curso de Blockchain": "Contrato inteligente en Solidity",
  "Curso de Inteligencia Artificial": "Clasificador de imágenes con TensorFlow",
  "Curso de Big Data": "Análisis de datos de Twitter en Spark",
  "Curso de UX/UI": "Prototipo interactivo de app móvil",
  "Curso de Adobe Illustrator": "Ilustración vectorial de un personaje",
  "Curso de Photoshop": "Retoque profesional de una foto",
  "Curso de After Effects": "Animación de un logo corporativo",
  "Curso de WordPress": "Tienda online con WooCommerce",
  "Curso de Marketing Digital": "Campaña publicitaria en Facebook Ads",
  "Curso de Ventas Online": "Plan estratégico para e-commerce",
  "Curso de Finanzas Personales": "Simulador de gastos e inversiones",
  "Curso de Liderazgo": "Plan de liderazgo para un equipo de trabajo"
};

// funcion para obtener todos los materiales de cada curso inluyendo su proyecto
function obtenerMateriales(curso) {
  const clave = `materiales-${curso}`;
  const guardados = JSON.parse(localStorage.getItem(clave)) || [];

  // Copiamos los materiales base definidos al inicio
  const base = [...(baseMateriales[curso] || [])];

  // Verificamos si ya existe un proyecto final, para no duplicarlo
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

// Carga inicial de Avance al abrir la pestaña
document.querySelector('#btn-avance').addEventListener('click', () => {
  mostrarAvance(document.querySelector('#avance-panel select').value);
});

// Cambio de filtro en el select, para filtrar por curso
document.querySelector('#avance-panel select').addEventListener('change', (e) => {
  mostrarAvance(e.target.value);
});

// Muestra el avance de los cursos, profesor y estudiante
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

    // el profesor ve avance de estudiantes ficticios
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
    // el estudiante ve su propio avance
    const cursosInscritos = JSON.parse(localStorage.getItem(usuario.email)) || [];
    const filtrados = filtro === "Todos los cursos"
      ? cursosInscritos
      : cursosInscritos.filter(c => c.nombre.includes(filtro));

    if (filtrados.length === 0) {
      contenedor.innerHTML = `
        <b>¡Aún no hay progreso!</b><br>
        Cuando tengas actividad, tu avance aparecerá aquí.
      `;
      return;
    }

    filtrados.forEach(curso => {
      // simulamos el progreso con números aleatorios
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
// === Gestión condicional de entregas y calificaciones según estado y rol ===  
// Esta función muestra los proyectos entregados y sus calificaciones, aplicando la siguiente lógica:  
// - El profesor solo ve proyectos entregados por sus estudiantes, es decir, si el estuidante ya subió el proyecto.  
// - Si no hay entrega, el profesor no puede calificar ni ver el proyecto.  
// - Cuando el estudiante entrega el proyecto, se guarda ese estado en 'entregasProyectos'.  
// - El profesor puede entonces ingresar una calificación y un comentario, que se guarda y asocia al alumno y curso.  
// - El estudiante ve la calificación y comentario en su panel una vez que el profesor la guarda.  
//  
// Esta lógica asegura que el flujo de entrega y evaluación respete el orden natural:  
// primero entrega, luego evaluación, y feedback visible para el estudiante.  
// utilizando solamente JS
// Prompt usado:  
// "Mostrar proyectos entregados y permitir al profesor calificar solo si hay entrega, y que el estudiante vea su calificación después."
function mostrarCalificaciones() {
  const cuerpo = document.getElementById('cuerpo-calificaciones');
  cuerpo.innerHTML = ''; // Limpiamos la tabla por si ya había algo

  const entregas = JSON.parse(localStorage.getItem('entregasProyectos')) || {};

  // Si soy estudiante, reviso mis cursos inscritos
  if (usuario.rol !== 'Profesor') {
    const cursos = cursosInscritos.length ? cursosInscritos : [];

    cursos.forEach(curso => {
      const claveEntrega = `${curso.nombre}|${usuario.nombre}`;
      const entregado = entregas[claveEntrega]; // estado de entrega
      const claveCalificacion = `calificacion-${claveEntrega}`;
      const calificacion = JSON.parse(localStorage.getItem(claveCalificacion));

      if (entregado && calificacion) {
        // Si entregué y ya me calificaron, lo mostramos en la tabla
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
    // Si soy profesor, revisar todos los cursos que manejo
    const cursosDisponibles = JSON.parse(localStorage.getItem('cursosDisponibles')) || [];
    const cursosAsignados = cursosDisponibles.filter(c => c.profesor === usuario.nombre);

    Object.keys(entregas).forEach(clave => {
      const [curso, alumno] = clave.split('|');
      // Solo veo las entregas de cursos que yo doy
      if (cursosAsignados.some(c => c.nombre === curso)) {
        const claveCalificacion = `calificacion-${curso}|${alumno}`;
        const calificacion = JSON.parse(localStorage.getItem(claveCalificacion));

        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${curso}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">${alumno}</td>
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">
        ${calificacion
            ? calificacion.nota
            : `<button onclick="abrirFormularioCalificacion('${curso}', '${alumno}')">Calificar</button>`
          }
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #f2d2c5;">
        ${calificacion ? calificacion.comentario : ''}
      </td>
    `;
        cuerpo.appendChild(tr);
      }
    });
  }
}

// Info temporal de que proyecto está siendo calificado, guardamos el curso y el alumno
let proyectoActual = { curso: '', alumno: '' };

function abrirFormularioCalificacion(curso, alumno) {
  proyectoActual = { curso, alumno }; // Actualizamos quién será calificado
  document.getElementById('overlay-modal').style.display = 'flex'; // Mostramos modal
  document.getElementById('info-proyecto').innerText = `Curso: ${curso}\nAlumno: ${alumno}`;
  document.getElementById('nota-calificacion').value = '';
  document.getElementById('comentario-calificacion').value = '';
}

function cerrarFormularioCalificacion() {
  document.getElementById('overlay-modal').style.display = 'none';
}

function guardarCalificacion() {
  // Seleccionamos lo que escribió el profesor
  const nota = document.getElementById('nota-calificacion').value;
  const comentario = document.getElementById('comentario-calificacion').value;

  if (!nota || !comentario) {
    alert('Por favor ingresa una nota y un comentario.');
    return;
  }

  // Guardamos la calificación en localStorage usando una clave única
  const key = `calificacion-${proyectoActual.curso}|${proyectoActual.alumno}`;
  localStorage.setItem(key, JSON.stringify({ nota, comentario }));

  mostrarMensaje("Calificación guardada con éxito.", "success");
  cerrarFormularioCalificacion();
  mostrarCalificaciones(); // Refrescamos la tabla
}

// Mostrar formulario cuando se hace clic en el botón "Añadir nuevo material"
function mostrarFormularioMaterial() {
  // Mostramos el formulario
  document.getElementById("formulario-material").style.display = "flex";
}

// Cerrar el formulario cuando se hace clic en "Cancelar"
function cancelarFormulario() {
  // Ocultamos el formulario
  document.getElementById("formulario-material").style.display = "none";
}

let cursoActual = null; // Aquí se guarda el curso en el que se está subiendo material

// Agregar un nuevo material (esto podría estar en tu función de "Guardar")
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-material").addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const tipo = document.getElementById("tipo").value;
    const imagen = document.getElementById("imagen").value;

    if (!titulo || !descripcion || !tipo) {
      // Si falta algo, lanzamos aviso
      mostrarErrorFormulario("⚠️ Por favor completa todos los campos obligatorios.");
      return;
    }

    // Armamos el objeto del nuevo material
    const nuevoMaterial = { titulo, descripcion, tipo, imagen };

    if (cursoActual) {
      const clave = `materiales-${cursoActual}`;
      const existentes = JSON.parse(localStorage.getItem(clave)) || [];
      existentes.push(nuevoMaterial); // Lo agregamos al array
      localStorage.setItem(clave, JSON.stringify(existentes));  // Lo guardamos
      mostrarMateriales(cursoActual); // Y refrescamos
    }

    mostrarMensaje("Material subido con éxito.");  // Notificación arriba
    cancelarFormulario(); // Ocultamos el form
  });
});

/* === Estilo para notificación flotante en pantalla ===
   Este bloque define el estilo del elemento .mensaje-flotante, utilizado para mostrar
   mensajes informativos o de retroalimentación al usuario de forma temporal y visible.

   - Se posiciona centrado horizontalmente, en la parte inferior de la pantalla.
   - Utiliza un fondo oscuro semi-transparente para destacar sobre el contenido.
   - Tiene bordes redondeados, padding y una animación de aparición/desaparición suave.
   - Se emplea para notificaciones como “Proyecto enviado”, “Sesión iniciada”, “Error”, etc.
   - Mejora la experiencia del usuario al entregar mensajes sin interrumpir el flujo de uso.

   Prompt usado:
   "Quiero la lógica para crear un mensaje de notificación flotante centrado abajo en pantalla con fondo oscuro con JS y CSS"
*/
function mostrarMensajeExito(texto) {
  const mensaje = document.getElementById("mensaje-flotante");
  mensaje.textContent = texto;
  mensaje.classList.add("show");
  mensaje.style.display = "block";

  // Lo ocultamos luego de unos segundos
  setTimeout(() => {
    mensaje.classList.remove("show");
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 300); // tiempo para que termine la transición
  }, 3000);
}

//Mostrar mensaje de error dentro del formulario
function mostrarErrorFormulario(mensaje) {
  const contenedor = document.getElementById("mensaje-error");
  contenedor.textContent = mensaje;
  contenedor.style.display = "block";
  // Ocultamos el error luego de unos segundos
  setTimeout(() => {
    contenedor.style.display = "none";
  }, 3000);
}

// === efecto visual de burbujas en el fondo ===
// Esta sección genera burbujas que flotan hacia arriba, dando un efecto animado suave.
// Fue implementado con ayuda de GenAI (ChatGPT) como recurso visual decorativo,
// sin afectar la funcionalidad principal de la página.

//  Prompt usado:
//  "Quiero un efecto de fondo con burbujas flotando en la pantalla usando HTML, CSS y JS."

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
