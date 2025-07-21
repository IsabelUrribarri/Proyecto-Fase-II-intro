const usuario = localStorage.getItem('usuarioActivo');
const bienvenida = document.createElement('p');

if (usuario) {

    bienvenida.textContent = `¡Bienvenido(a), ${usuario}!`;
    bienvenida.style.fontWeight = 'bold';
    bienvenida.style.color = '#0f2e5a';
    bienvenida.style.textAlign = 'center';
    bienvenida.style.marginTop = '20px';
    document.body.appendChild(bienvenida);

    document.querySelector('.btn-login').style.display = 'none';
    document.querySelector('.btn-register').style.display = 'none';
    const userIcon = document.querySelector('.user-icon');
    const userMenu = document.querySelector('.user-menu');
    userIcon.style.display = 'inline-block';

    userIcon.addEventListener('click', () => {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('usuarioActivo');
        location.reload();
    });
}