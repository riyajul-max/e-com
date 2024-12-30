function loadNavbar() {
    fetch('navbar.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            const bar = document.querySelector('.menu-icon');
            const nav = document.querySelector('.nav-menu');
            const close = document.querySelector('#close');

            if (bar) {
                bar.addEventListener('click', () => {
                    nav.classList.add('active');
                });
            }

            if (close) {
                close.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            }
        })
        .catch(error => console.error('Error loading navbar', error));
}

loadNavbar();
