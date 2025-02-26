document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    const backToTopButton = document.getElementById('back-to-top');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Fonction pour mettre à jour le point actif
    const updateActiveDot = (index) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    // Fonction pour faire défiler vers une section
    const scrollToSection = (index) => {
        if (isScrolling) return;
        isScrolling = true;
        currentSectionIndex = index;
        
        sections[index].scrollIntoView({ behavior: 'smooth' });
        updateActiveDot(index);

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    };

    // Gestion des clics sur les points
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(index);
        });
    });

    // Gestion des touches flèches
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
        } else if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
            scrollToSection(currentSectionIndex + 1);
        }
    });

    // Détection de la section visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                currentSectionIndex = index;
                updateActiveDot(index);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Gestion du bouton "back to top"
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        scrollToSection(0);
    });

    // Initialisation
    updateActiveDot(0);
});