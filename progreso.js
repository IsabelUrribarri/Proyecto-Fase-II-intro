document.getElementById('btn-cursos').onclick = function() {
  document.getElementById('cursos-panel').style.display = '';
  document.getElementById('avance-panel').style.display = 'none';
  this.classList.add('activo');
  document.getElementById('btn-avance').classList.remove('activo');
};

document.getElementById('btn-avance').onclick = function() {
  document.getElementById('cursos-panel').style.display = 'none';
  document.getElementById('avance-panel').style.display = '';
  this.classList.add('activo');
  document.getElementById('btn-cursos').classList.remove('activo');
};