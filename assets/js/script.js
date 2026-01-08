// === TYPING EFFECT ===
const textElement = document.querySelector('.typing-text');
const texts = ['Mobile Apps', 'Web Apps', 'APIs', 'Desktop Apps'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    if (textElement) {
        textElement.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait before clearing
    } else {
        setTimeout(type, 100);
    }
}());

// === MOBILE MENU ===
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// === SCROLL REVEAL & BACK TO TOP ===
const backToTopBtn = document.getElementById('backToTop');
// Add reveal class to elements
const revealElements = document.querySelectorAll('.section-title, .about-content, .project-card, .cert-card, .skill-category, .timeline-item, .contact-card');
revealElements.forEach(el => el.classList.add('reveal'));

// Skill Bars Animation
const skillBars = document.querySelectorAll('.progress');
skillBars.forEach(bar => {
    bar.setAttribute('data-width', bar.style.width);
    bar.style.width = '0';
});

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');

            // Animate skills if inside this reveal element
            const bars = reveal.querySelectorAll('.progress');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });

    // Back to Top Logic
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }

    // Active Nav Link highlighting
    const sections = document.querySelectorAll('section');
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

// === MODAL FOR CERTIFICATES ===
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');

window.openModal = function (src, title) {
    modal.style.display = 'block';
    modalImg.src = src;
    captionText.innerHTML = title;
}

closeModal.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    const pModal = document.getElementById('projectModal');
    if (event.target == pModal) {
        pModal.style.display = 'none';
    }
}

// === PROJECT DETAILS MODAL ===
const projectModal = document.getElementById('projectModal');
const projectModalImg = document.getElementById('projectModalImage');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalDesc = document.getElementById('projectModalDescription');
const projectModalTags = document.getElementById('projectModalTags');
const projectModalLinks = document.getElementById('projectModalLinks');
const projectCloseBtn = document.querySelector('.project-close');

if (projectCloseBtn) {
    projectCloseBtn.onclick = function() {
        projectModal.style.display = 'none';
    }
}

document.querySelectorAll('.project-card .link-text').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.project-card');
        const img = card.querySelector('.project-image img').src;
        const title = card.querySelector('.project-info h3').textContent;
        const desc = card.querySelector('.project-info p').innerHTML;
        const tags = card.querySelector('.tags').innerHTML;

        // Get links from overlay
        const overlayLinks = card.querySelectorAll('.project-overlay a');
        let linksHtml = '';
        overlayLinks.forEach(link => {
            const iconHTML = link.innerHTML;
            const href = link.getAttribute('href');
            let label = 'Visit';
            
            if (iconHTML.includes('github')) label = 'Source Code';
            else if (iconHTML.includes('external-link')) label = 'Live Demo';
            else if (iconHTML.includes('google-play')) label = 'Play Store';

            if (href && href !== '#') {
                 linksHtml += `<a href="${href}" target="_blank" class="btn btn-primary" style="margin-right: 15px; margin-bottom: 10px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">${label} ${iconHTML}</a>`;
            }
        });

        projectModalImg.src = img;
        projectModalTitle.textContent = title;
        projectModalDesc.innerHTML = desc; // Use innerHTML to preserve tags
        projectModalTags.innerHTML = tags;
        projectModalLinks.innerHTML = linksHtml;

        projectModal.style.display = 'block';
    });
});

// === CLIPBOARD ===
window.copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(function () {
        const hint = document.querySelector('.copy-hint');
        const originalText = hint.textContent;
        hint.textContent = 'Copied!';
        hint.style.opacity = '1';
        setTimeout(() => {
            hint.textContent = originalText;
        }, 2000);
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}

// === PARTICLE BACKGROUND ===
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        this.size = Math.random() * 2;
        this.color = 'rgba(59, 130, 246, 0.3)'; // Match theme
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(59, 130, 246,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();
