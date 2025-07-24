document.addEventListener('DOMContentLoaded', () => {
    // llamamos a los formularios y los mensajes de éxito
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const mensajeExito = document.getElementById('mensaje-exito');
    const mensajeLoginExito = document.getElementById('mensaje-login-exito');

    // Si la URL trae #login o #signup, mostramos el que le corresponde
    const hash = window.location.hash;
    if (hash === '#login') {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    }
    if (hash === '#signup') {
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    }

    // Cuando hacen clic en "Inicia sesión", mostramos el login
    document.getElementById('mostrar-login').addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    });

    // Cuando hacen clic en "Regístrate", mostramos el registro
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

        // Obtenemos los datos que el user escribió
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        let valido = true;

        // Validamos el correo (si no es uno de prueba, tiene que tener @)
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
                (email === 'Admin_123' && password === 'IALI-2015')
            ) {
                const usuarioPredeterminado = {
                    nombre: email,
                    email: email,
                    password: password,
                    rol: email === 'Estudiante_123' ? 'Estudiante' :
                        email === 'Profesor_123' ? 'Profesor' :
                            'Admin'
                };

                // Redireccionamos según el rol
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioPredeterminado));

                if (usuarioPredeterminado.rol === 'Admin') {
                    window.location.href = 'support-admin.html'; // Se va al panel admin
                } else {
                    window.location.href = 'index.html';   // Estudiante o profesor van al inicio
                }
            } else {
                // Si no es predefinido, buscamos en lo que se haya registrado
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
        // Esta función muestra un mensaje de error en el campo indicado
        function mostrarError(id, mensaje) {
            const elemento = document.getElementById(id);
            elemento.textContent = mensaje;
            elemento.style.display = 'block';
        }

        // Limpia todos los errores antes de validar otra vez
        function limpiarErrores() {
            document.querySelectorAll('.error').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
        }
    });
});
