document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeLoginExito = document.getElementById('mensaje-login-exito');

    const hash = window.location.hash;
    if (hash === '#login') {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    }
    if (hash === '#signup') {
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    }

    document.getElementById('mostrar-login').addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    });

    document.getElementById('mostrar-registro').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarErrores();
        mensajeLoginExito.style.display = 'none';

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        let valido = true;

        // Permitir correos predeterminados
        if (email !== 'Estudiante_123' && email !== 'Profesor_123' && (!email.includes('@') || email === '')) {
            mostrarError('error-login-email', 'Correo inválido');
            valido = false;
        }

        if (password.length < 6) {
            mostrarError('error-login-password', 'Contraseña inválida');
            valido = false;
        }

        if (valido) {
            // Verificar si el correo y la contraseña corresponden a un usuario predeterminado
            if ((email === 'Estudiante_123' && password === 'IALI-2015') || (email === 'Profesor_123' && password === 'IALI-2015')) {
                const usuarioPredeterminado = {
                    nombre: email === 'Estudiante_123' ? 'Estudiante_123' : 'Profesor_123',
                    email: email,
                    password: password,
                    rol: email === 'Estudiante_123' ? 'Estudiante' : 'Profesor'
                };

                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioPredeterminado));
                window.location.href = 'index.html'; // Redirigir al inicio de la cuenta
            } else {
                const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
                if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
                    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioGuardado));
                    window.location.href = 'index.html';
                    loginForm.reset();
                } else {
                    mostrarError('error-login-password', 'Credenciales incorrectas');
                }
            }
        }
    });


    function mostrarError(id, mensaje) {
        const elemento = document.getElementById(id);
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }

    function limpiarErrores() {
        document.querySelectorAll('.error').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }
});
