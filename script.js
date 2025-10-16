// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.getElementById('nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Header Scroll Effect
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu Tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-categories');

if (menuTabs.length > 0) {
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding category (guard if missing)
            const categoryId = tab.getAttribute('data-category');
            if (categoryId) {
                const target = document.getElementById(categoryId);
                if (target) target.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#' || !document.querySelector(targetId)) return; // Ensure target exists

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav) nav.classList.remove('active');
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
document.body.appendChild(scrollToTopBtn);

// Show/Hide Scroll to Top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to Top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for all sections with intersection observer
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

if (sections.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class and observe all sections
    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });

    // Initial check for sections in view
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
} else if (sections.length > 0) {
    // Fallback for browsers without IntersectionObserver
    sections.forEach(section => {
        section.classList.add('fade-in', 'visible');
    });
}

// Add scroll down functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        const header = document.querySelector('header'); // Ensure header exists

        if (aboutSection && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}