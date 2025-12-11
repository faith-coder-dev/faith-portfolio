let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let themeBtn = document.querySelector('#theme-btn');

// Mobile menu toggle
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    // Update active navbar link based on scroll position
    updateNavbarActive();
}

// Dark/Light mode toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="bx bx-sun"></i>';
    } else {
        document.body.classList.remove('light-mode');
        themeBtn.innerHTML = '<i class="bx bx-moon"></i>';
    }
}

themeBtn.onclick = () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeBtn.innerHTML = isLightMode ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
}

// Update active navbar link
function updateNavbarActive() {
    const navLinks = document.querySelectorAll('.navbar a');
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.box, .skill-category').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    observer.observe(element);
});

// Initialize theme on page load
initTheme();

// Typed.js animation
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer', 'Backend Developer', 'Aspiring Full Stack Engineer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1200,
    loop: true
});

// Contact form validation
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = this.querySelector('input[type="text"]:first-of-type').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const subject = this.querySelector('input[type="text"]:last-of-type').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Basic validation
        if (!fullName || !email || !subject || !message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Success message
        showMessage('Thank you! Your message has been received. I will get back to you soon!', 'success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formMessage.textContent = '';
        }, 2000);
    });
}

function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Details Modal
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
const closeDetailsBtns = document.querySelectorAll('.close-details');

viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.portfolio-item').querySelector('.project-details');
        if (modal) {
            modal.style.display = 'flex';
        }
    });
});

closeDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.project-details');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-details')) {
        e.target.style.display = 'none';
    }
});