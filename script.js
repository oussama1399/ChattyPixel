// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Translation functionality
let currentLanguage = 'en';

function translateContent(language) {
    currentLanguage = language;
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Handle form placeholders
            const placeholderKey = `data-placeholder-${language}`;
            if (element.hasAttribute(placeholderKey)) {
                element.placeholder = element.getAttribute(placeholderKey);
            }
        } else {
            // Handle text content
            const textKey = `data-${language}`;
            if (element.hasAttribute(textKey)) {
                element.textContent = element.getAttribute(textKey);
            }
        }
    });
    
    // Update language button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === language) {
            btn.classList.add('active');
        }
    });
    
    // Store language preference
    localStorage.setItem('preferredLanguage', language);
}

// Language switcher event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const language = btn.getAttribute('data-lang');
        translateContent(language);
    });
});

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    translateContent(savedLanguage);
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Add particle effect to hero section (optional)
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #2B6CB0, #F59F00);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: float 6s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    hero.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 6000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
        }
    }
    
    .hero {
        position: relative;
        overflow: hidden;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 2000);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2B6CB0, #F59F00);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});

// Set initial opacity for smooth loading
document.body.style.opacity = '0';

console.log('🎨 ChattyPixel website loaded successfully!');
