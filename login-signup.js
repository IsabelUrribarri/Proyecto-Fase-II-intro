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

    signupForm.addEventListener('submit', function (e) {
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

        if (password.length < 8) {
            mostrarError('error-password', 'La contraseña debe tener al menos 8 caracteres');
            valido = false;
        }

        if (!rol) {
            mostrarError('error-rol', 'Seleccione un rol');
            valido = false;
        }

        if (valido) {
            const usuario = {
                nombre,
                apellido,
                email,
                password,
                rol: rol.value
            };
            localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
            localStorage.setItem(usuario.email, JSON.stringify([]));
            localStorage.setItem('usuarioActivo', JSON.stringify({ nombre, email }));
            window.location.href = 'index.html';

        }
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarErrores();
        mensajeLoginExito.style.display = 'none';

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        let valido = true;

        if (!email.includes('@') || email === '') {
            mostrarError('error-login-email', 'Correo inválido');
            valido = false;
        }

        if (password.length < 6) {
            mostrarError('error-login-password', 'Contraseña inválida');
            valido = false;
        }

        if (valido) {
            const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
            if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
                localStorage.setItem('usuarioActivo', usuarioGuardado.nombre);
                localStorage.setItem('usuarioActivo', usuarioGuardado.nombre);
                window.location.href = 'index.html';
                loginForm.reset();
                signupForm.style.display = 'none';
                loginForm.style.display = 'none';
                const mensajeFinal = document.createElement('p');
                mensajeFinal.textContent = `Estás dentro, ${usuarioGuardado.nombre}.`;
                mensajeFinal.style.fontSize = '16px';
                mensajeFinal.style.color = '#2c6e49';
                mensajeFinal.style.marginTop = '20px';
                mensajeFinal.style.fontWeight = 'bold';
                document.querySelector('.form-box').appendChild(mensajeFinal);
            } else {
                mostrarError('error-login-password', 'Credenciales incorrectas');
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

        if (!email.includes('@') || email === '') {
            mostrarError('error-login-email', 'Correo inválido');
            valido = false;
        }

        if (password.length < 6) {
            mostrarError('error-login-password', 'Contraseña inválida');
            valido = false;
        }

        if (valido) {
            const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
            if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioGuardado));
                window.location.href = 'index.html';
                loginForm.reset();
            } else {
                mostrarError('error-login-password', 'Credenciales incorrectas');
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