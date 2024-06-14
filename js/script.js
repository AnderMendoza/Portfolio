const nav = document.querySelector('.nav')
const navMenu = document.querySelector('.nav-items')
const btnToggleNav = document.querySelector('.menu-btn')
const workEls = document.querySelectorAll('.work-box')
const workImgs = document.querySelectorAll('.work-img')
const mainEl = document.querySelector('main')
const yearEl = document.querySelector('.footer-text span')

const toggleNav = () => {
    nav.classList.toggle('hidden')

    // Evitar que la pantalla se desplace cuando se abre el menú
    document.body.classList.toggle('lock-screen')

    if (nav.classList.contains('hidden')) {
        btnToggleNav.textContent = 'menú'
    } else {
        // Cuando se abre el menú después de la transición, cambie el texto respectivamente
        setTimeout(() => {
            btnToggleNav.textContent = 'cerrar'
        }, 475)
    }
}

btnToggleNav.addEventListener('click', toggleNav)

navMenu.addEventListener('click', e => {
    if (e.target.localName === 'a') {
        toggleNav()
    }
})

document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !nav.classList.contains('hidden')) {
        toggleNav()
    }
})

// Tema de la web almacenado en el almacenamiento local del navegador

const theme = localStorage.getItem('theme') || 'dark'
document.body.classList.add(theme)

// Animar instancias de trabajo en desplazamiento

workImgs.forEach(workImg => workImg.classList.add('transform'))

let observer = new IntersectionObserver(
    entries => {
        const [entry] = entries
        const [textbox, picture] = Array.from(entry.target.children)
        if (entry.isIntersecting) {
            picture.classList.remove('transform')
            Array.from(textbox.children).forEach(el => (el.style.animationPlayState = 'running'))
        }
    },
    { threshold: 0.3 },
)

workEls.forEach(workEl => {
    observer.observe(workEl)
})

// Alternar tema y almacenar el tema preferido del usuario para el futuro

const switchThemeEl = document.querySelector('input[type="checkbox"]')
const storedTheme = localStorage.getItem('theme')

switchThemeEl.checked = storedTheme === 'dark' || storedTheme === null

switchThemeEl.addEventListener('click', () => {
    const isChecked = switchThemeEl.checked

    if (!isChecked) {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        localStorage.setItem('theme', 'light')
        switchThemeEl.checked = false
    } else {
        document.body.classList.add('dark')
        document.body.classList.remove('light')
        localStorage.setItem('theme', 'dark')
    }
})

// Atrapar la pestaña cuando se abre el menú

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]')

document.body.addEventListener('keydown', e => {
    if (e.key === 'Tab' && document.activeElement === lastFocusedEl) {
        e.preventDefault()
        btnToggleNav.focus()
    }
})

// Enviar datos del formulario

const frmEmail = document.getElementById('frm-email')
frmEmail.addEventListener('submit', sendEmail)

const serviceId = 'service_zq0wa9i'
const templateId = 'template_1dvwjvu'
const apiKey = 'j6-tlfwfNJosQcweP'

function sendEmail(event) {
    event.preventDefault()
    emailjs.init(serviceId)

    emailjs
        .sendForm(serviceId, templateId, frmEmail, apiKey)
        .then(result => Swal.fire('Su mensaje se ha enviado correctamente'))
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No ha sido posible enviar el mensaje!',
            })
        })
}

// validar captcha

document.getElementById('frm-email').addEventListener('submit', function (event) {
    event.preventDefault() // Evitar envío por defecto

    var recaptchaResponse = grecaptcha.getResponse()
    var recaptchaError = document.getElementById('recaptcha-error')

    if (recaptchaResponse.length == 0) {
        recaptchaError.style.display = 'block'
    } else {
        recaptchaError.style.display = 'none'
        this.submit()
    }
})
