const usuario = localStorage.getItem('usuarioActivo');

if (!usuario) {
    window.location.href = 'login-signup.html#login';
}

const nombreInput = document.getElementById('nombre');
if (usuario && nombreInput) {
    nombreInput.value = usuario;
}

document.getElementById('form-soporte').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Gracias por tu reporte. Lo revisaremos pronto.');
    this.reset();
});