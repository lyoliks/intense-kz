// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(207, 169, 138, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        navbar.style.boxShadow = 'none';
    }
});

// Counter Animation for Stats
const counterElements = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;

    counterElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const increment = target / 30;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.floor(current);
                setTimeout(updateCounter, 50);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    hasAnimated = true;
};

// Intersection Observer for Counter Animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply scroll animation to elements
document.querySelectorAll('.service-card, .portfolio-item, .team-member, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(element);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.textContent;
        
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'rgba(207, 169, 138, 0.8)';
        
        contactForm.reset();
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mouse Move Effect for Hero
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const shapes = hero.querySelectorAll('.shape');
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        
        shapes.forEach((shape, index) => {
            const multiplier = 1 + (index * 0.5);
            shape.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
        });
    });
}

// Scroll to top button
const createScrollTopButton = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-top-btn';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e8d4c0 0%, #cfa98a 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(207, 169, 138, 0.3);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        } else {
            btn.style.display = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(207, 169, 138, 0.4)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(207, 169, 138, 0.3)';
    });
};

createScrollTopButton();

// Initialize AOS-like animation on load
window.addEventListener('load', () => {
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '1';
        section.style.animation = `fadeIn 0.8s ease-out ${index * 0.1}s both`;
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'c') {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

console.log('✨ INTENSE Website Loaded Successfully! ✨');