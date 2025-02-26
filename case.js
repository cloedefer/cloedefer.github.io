document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    const backToTopButton = document.getElementById('back-to-top');
    let currentSectionIndex = 0;
    
    // Fonction pour mettre à jour le point actif
    const updateActiveDot = (index) => {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    };
    
    // Gestion des clics sur les points
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = dot.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                currentSectionIndex = index;
                updateActiveDot(index);
            }
        });
    });
    
    // Détection de la section visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const index = Array.from(sections).indexOf(section);
                currentSectionIndex = index;
                updateActiveDot(index);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Gestion du bouton "back to top"
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Gestion des touches flèches
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            currentSectionIndex--;
            const section = sections[currentSectionIndex];
            section.scrollIntoView({ behavior: 'smooth' });
            updateActiveDot(currentSectionIndex);
        } else if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            const section = sections[currentSectionIndex];
            section.scrollIntoView({ behavior: 'smooth' });
            updateActiveDot(currentSectionIndex);
        }
    });
    
    // Initialisation
    updateActiveDot(0);
});