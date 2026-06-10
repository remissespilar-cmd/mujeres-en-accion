// ============================================
// MUJERES EN ACCIÓN - SCRIPT
// ============================================

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initVideoModal();
    initFormHandlers();
    initScrollAnimations();
});

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    // Add menu toggle button to header if on mobile
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    
    // Create menu toggle button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        header.querySelector('.container').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navbar.classList.contains('active'));
            menuToggle.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
            document.querySelector('.menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// VIDEO MODAL
// ============================================

function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach((card, index) => {
        const button = card.querySelector('button');
        const img = card.querySelector('img');
        
        if (button) {
            button.addEventListener('click', () => {
                openVideoModal(index + 1);
            });
            
            // Also open on image click
            img.addEventListener('click', () => {
                openVideoModal(index + 1);
            });
            img.style.cursor = 'pointer';
        }
    });
}

function openVideoModal(videoNumber) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" aria-label="Cerrar modal">&times;</button>
            <div class="video-container">
                <iframe width="100%" height="600" 
                    src="https://www.youtube.com/embed/VIDEO_ID_${videoNumber}" 
                    frameborder="0" allowfullscreen="" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// ============================================
// FORM HANDLERS
// ============================================

function initFormHandlers() {
    // "Súmate" button
    const sumateBtn = document.querySelector('.btn-sumate');
    if (sumateBtn) {
        sumateBtn.addEventListener('click', () => {
            const email = prompt('¿Cuál es tu email? Te enviaremos la información.');
            if (email) {
                handleEmailSignup(email);
            }
        });
    }
    
    // "Quiero emprender" button
    const emprenderBtn = document.querySelector('.btn-emprender');
    if (emprenderBtn) {
        emprenderBtn.addEventListener('click', () => {
            const email = prompt('¿Cuál es tu email? Nos pondremos en contacto contigo.');
            if (email) {
                handleEmailSignup(email, 'emprendimiento');
            }
        });
    }
    
    // "Ver agenda completa" button
    const agendaBtn = document.querySelector('.btn-agenda');
    if (agendaBtn) {
        agendaBtn.addEventListener('click', () => {
            alert('Pronto disponible: Calendario completo de eventos.');
        });
    }
    
    // "Ver más historias" button
    const historiasBtn = document.querySelector('.btn-historias');
    if (historiasBtn) {
        historiasBtn.addEventListener('click', () => {
            alert('Pronto disponible: Más historias inspiradoras de emprendedoras.');
        });
    }
}

function handleEmailSignup(email, type = 'general') {
    console.log(`Email registrado (${type}):`, email);
    
    // TODO: Integrar con backend/servicio de email
    // Ejemplo: enviar a servidor
    // fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, type })
    // })
    
    showNotification(`¡Gracias! Recibirás información en ${email}`);
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            font-weight: 600;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-success {
            background: #27ae60;
            color: white;
        }
        
        .notification-error {
            background: #e74c3c;
            color: white;
        }
        
        .notification-info {
            background: #3498db;
            color: white;
        }
        
        .notification.hide {
            animation: slideOut 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .area-box, .agenda-card, .video-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// MODAL STYLES
// ============================================

(() => {
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .modal-content {
            position: relative;
            width: 90%;
            max-width: 900px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .close-modal {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 2rem;
            font-weight: bold;
            color: #d4185c;
            background: white;
            border: none;
            cursor: pointer;
            z-index: 10001;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            color: #a01447;
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                max-width: 100%;
            }
        }
    `;
    document.head.appendChild(modalStyle);
})();

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Log script initialization
console.log('✨ Mujeres en Acción - Script loaded successfully');