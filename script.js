document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();


  document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
  document.getElementById('mensaje-exito').style.display = 'none';

  let valido = true;

  const nombre = document.getElementById('name').value.trim();
  const apellido = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const rol = document.querySelector('input[name="rol"]:checked');

  if (nombre === '') {
    mostrarError('error-name', 'El nombre es obligatorio');
    valido = false;
  }

  if (apellido === '') {
    mostrarError('error-last-name', 'El apellido es obligatorio');
    valido = false;
  }

  if (!email.includes('@') || email === '') {
    mostrarError('error-email', 'Ingrese un correo válido');
    valido = false;
  }

  if (password.length < 6) {
    mostrarError('error-password', 'La contraseña debe tener al menos 6 caracteres');
    valido = false;
  }

  if (!rol) {
    mostrarError('error-rol', 'Seleccione un rol');
    valido = false;
  }

  if (valido) {
    document.getElementById('mensaje-exito').textContent = '¡Registro exitoso!';
    document.getElementById('mensaje-exito').style.display = 'block';

  }
});

function mostrarError(id, mensaje) {
  const elemento = document.getElementById(id);
  elemento.textContent = mensaje;
  elemento.style.display = 'block';
}
