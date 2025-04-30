// Futuristic Portfolio JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
    
    // Setup scroll events
    setupScrollEvents();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize particles background
    initParticles();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize form validation
    initFormValidation();
    
    // Remove loader when everything is loaded
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });
});

// Initialize page
function initPage() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && menuBtn && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
}

// Setup scroll events
function setupScrollEvents() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll reveal animation
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const scrollRevealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollRevealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, scrollRevealOptions);
    
    scrollRevealElements.forEach(element => {
        scrollRevealObserver.observe(element);
        // Add initial state class
        element.classList.add('scroll-reveal-hidden');
    });
}

// Initialize typing effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const phrases = JSON.parse(typingElement.getAttribute('data-phrases') || '["Full Stack Development", "Backend Development", "Data Analysis"]');
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing effect
        setTimeout(type, 1000);
    }
}

// Initialize particles background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Resize canvas on window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = getRandomColor();
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Get random color function
        function getRandomColor() {
            const colors = [
                'rgba(110, 0, 255, 0.5)',
                'rgba(0, 217, 255, 0.5)',
                'rgba(255, 0, 212, 0.5)'
            ];
            
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Create particles
        const particles = [];
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Connect particles function
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            connectParticles();
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Initialize project filter
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    
                    // Add animation
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 100);
                });
            });
        });
    }
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Validate form
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, just show a success message
                const formMessage = document.querySelector('.form-message');
                
                if (formMessage) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
    
    // Show error function
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            formGroup.appendChild(error);
        }
        
        input.classList.add('error');
    }
    
    // Remove error function
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        input.classList.remove('error');
    }
    
    // Validate email function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Add 3D tilt effect to elements
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const tiltX = deltaY * 10;
            const tiltY = -deltaX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize cursor effects
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to links and buttons
    const hoverElements = document.querySelectorAll('a, button, .hover-effect');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
}

// Call additional initialization functions
window.addEventListener('load', function() {
    initTiltEffect();
    initCustomCursor();
});
