// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--navbar-bg)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'var(--navbar-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
            e.target.reset();
        } else {
            alert('عذراً، حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
        }
    } catch (error) {
        alert('عذراً، حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    }
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements that should animate
    const elements = document.querySelectorAll(`
        .section-header,
        .service-card,
        .about-content,
        .about-image,
        .contact-info,
        .contact-form,
        .map-container
    `);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Service cards animation
const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing once animation is done
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach((card, index) => {
    // Add a delay based on the card's index
    setTimeout(() => {
        observer.observe(card);
    }, index * 100);
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show button when scrolling down 200px
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Smooth scroll to top when clicking the button
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
