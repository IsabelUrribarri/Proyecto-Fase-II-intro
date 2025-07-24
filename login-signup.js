document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los formularios y mensajes de éxito
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeLoginExito = document.getElementById('mensaje-login-exito');

    // Si viene con #login o #signup en la URL, mostramos el formulario correspondiente
    const hash = window.location.hash;
    if (hash === '#login') {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    }
    if (hash === '#signup') {
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    }

    // Cambiar a vista de login desde el enlace
    document.getElementById('mostrar-login').addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    });

    // Cambiar a vista de registro desde el enlace
    document.getElementById('mostrar-registro').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    });

    // Lógica de validación y autenticación al hacer login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarErrores();
        mensajeLoginExito.style.display = 'none';

        // Obtenemos los valores del formulario
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        let valido = true;

        // Validación básica del correo (permitimos usuarios predeterminados sin @)
        if (
            email !== 'Estudiante_123' &&
            email !== 'Profesor_123' &&
            email !== 'Admin_123' &&  // <-- Añadido admin aquí
            (!email.includes('@') || email === '')
        ) {
            mostrarError('error-login-email', 'Correo inválido');
            valido = false;
        }

        // Contraseña mínima de 6 caracteres
        if (password.length < 6) {
            mostrarError('error-login-password', 'Contraseña inválida');
            valido = false;
        }

        if (valido) {
            // Si es uno de los usuarios predeterminados, aceptamos sin verificar localStorage
            if (
                (email === 'Estudiante_123' && password === 'IALI-2015') ||
                (email === 'Profesor_123' && password === 'IALI-2015') ||
                (email === 'Admin_123' && password === 'IALI-2015')  // <-- Añadido admin aquí
            ) {
                const usuarioPredeterminado = {
                    nombre: email,
                    email: email,
                    password: password,
                    rol: email === 'Estudiante_123' ? 'Estudiante' :
                        email === 'Profesor_123' ? 'Profesor' :
                            'Admin'  // <-- Rol admin para Admin_123
                };

                // Guardamos al usuario como activo y lo mandamos al panel según rol
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioPredeterminado));

                if (usuarioPredeterminado.rol === 'Admin') {
                    window.location.href = 'support-admin.html';  // Página del panel admin
                } else {
                    window.location.href = 'index.html';  // Usuarios Estudiante y Profesor al inicio normal
                }
            } else {
                // En caso de ser usuario registrado manualmente
                const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
                if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
                    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioGuardado));
                    window.location.href = 'index.html';
                    loginForm.reset();
                } else {
                    // Usuario no existe o credenciales incorrectas
                    mostrarError('error-login-password', 'Credenciales incorrectas');
                }
            }
        }
        // Muestra un mensaje de error en el campo correspondiente
        function mostrarError(id, mensaje) {
            const elemento = document.getElementById(id);
            elemento.textContent = mensaje;
            elemento.style.display = 'block';
        }

        // Limpia todos los errores antes de validar
        function limpiarErrores() {
            document.querySelectorAll('.error').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
        }
    });
});
