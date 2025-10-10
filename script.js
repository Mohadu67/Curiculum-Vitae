/* ==========================================
   PARTICLES ANIMATION
   ========================================== */
class ParticlesAnimation {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
            this.ctx.fill();

            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* ==========================================
   NAVIGATION
   ========================================== */
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.progressBar = document.querySelector('.progress-bar');

        this.init();
    }

    init() {
        this.handleScroll();
        this.handleHamburger();
        this.handleActiveLink();

        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateProgress();
        });
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.progressBar.style.width = scrolled + '%';
    }

    handleHamburger() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }

    handleActiveLink() {
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

/* ==========================================
   TECH LOGOS ANIMATION
   ========================================== */
class TechLogosAnimation {
    constructor() {
        this.init();
    }

    init() {
        const logos = document.querySelectorAll('.tech-logo-item');
        if (!logos.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        logos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(20px)';
            logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(logo);
        });
    }
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   ========================================== */
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.glass-card, .timeline-item');
        this.init();
    }

    init() {
        if (!this.elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

/* ==========================================
   BACK TO TOP BUTTON
   ========================================== */
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ==========================================
   DATA LOADER
   ========================================== */
class DataLoader {
    constructor() {
        this.dataPath = 'data/db.json';
        this.init();
    }

    async init() {
        try {
            const response = await fetch(this.dataPath);
            const data = await response.json();

            this.renderSoftSkills(data.softSkills);
            this.renderTechLogos(data.logos);
            this.renderLogos(data.logos);
            this.renderExperiences(data.experiences);
            this.renderFormations(data.formations);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            this.renderFallbackData();
        }
    }

    renderTechLogos(logos) {
        const container = document.getElementById('techLogosGrid');
        if (!container || !logos) return;

        container.innerHTML = logos.map(logo => `
            <div class="tech-logo-item">
                <img src="${logo.src}" alt="${logo.alt}">
                <span>${logo.alt}</span>
            </div>
        `).join('');
    }

    renderSoftSkills(skills) {
        const container = document.getElementById('softSkillsContainer');
        if (!container || !skills) return;

        container.innerHTML = skills.map(skill => `
            <div class="soft-skill-item">
                <strong>${skill.title}</strong>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">
                    ${skill.desc}
                </p>
            </div>
        `).join('');
    }

    renderLogos(logos) {
        const track = document.getElementById('logosTrack');
        if (!track || !logos) return;

        const logoHTML = logos.map(logo => `
            <div class="logo-item">
                <img src="${logo.src}" alt="${logo.alt}">
            </div>
        `).join('');

        track.innerHTML = logoHTML + logoHTML;
    }

    renderExperiences(experiences) {
        const container = document.getElementById('experienceTimeline');
        if (!container || !experiences) return;

        container.innerHTML = experiences.map(exp => `
            <div class="timeline-item">
                <h4>${exp.title}</h4>
                <p class="period">${exp.period}</p>
                <p class="location">${exp.location}</p>
                <p class="description">${exp.description}</p>
            </div>
        `).join('');
    }

    renderFormations(formations) {
        const container = document.getElementById('formationsTimeline');
        if (!container || !formations) return;

        container.innerHTML = formations.map(formation => `
            <div class="timeline-item">
                <h4>${formation.title}</h4>
                <p class="period">${formation.period}</p>
                <p class="location">${formation.org}</p>
                <p class="description">${formation.detail}</p>
            </div>
        `).join('');
    }

    renderFallbackData() {
        // Tech Logos fallback
        const techLogosContainer = document.getElementById('techLogosGrid');
        if (techLogosContainer) {
            techLogosContainer.innerHTML = `
                <div class="tech-logo-item"><span>HTML5</span></div>
                <div class="tech-logo-item"><span>CSS3</span></div>
                <div class="tech-logo-item"><span>JavaScript</span></div>
                <div class="tech-logo-item"><span>React</span></div>
                <div class="tech-logo-item"><span>Node.js</span></div>
                <div class="tech-logo-item"><span>Git</span></div>
            `;
        }

        // Soft Skills fallback
        const softSkillsContainer = document.getElementById('softSkillsContainer');
        if (softSkillsContainer) {
            softSkillsContainer.innerHTML = `
                <div class="soft-skill-item"><strong>Communication</strong><p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Excellente capacité à communiquer</p></div>
                <div class="soft-skill-item"><strong>Travail d'équipe</strong><p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Collaboration efficace</p></div>
                <div class="soft-skill-item"><strong>Résolution de problèmes</strong><p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Approche analytique</p></div>
                <div class="soft-skill-item"><strong>Adaptabilité</strong><p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Flexible et réactif</p></div>
                <div class="soft-skill-item"><strong>Créativité</strong><p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Pensée innovante</p></div>
                <div class="soft-skill-item"><strong>Gestion du temps</strong><p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Organisation efficace</p></div>
            `;
        }

        // Experiences fallback
        const experienceContainer = document.getElementById('experienceTimeline');
        if (experienceContainer) {
            experienceContainer.innerHTML = `
                <div class="timeline-item">
                    <h4>Développeur Fullstack</h4>
                    <p class="period">2023 - Présent</p>
                    <p class="location">Freelance</p>
                    <p class="description">Développement d'applications web modernes et performantes pour divers clients.</p>
                </div>
            `;
        }

        // Formations fallback
        const formationsContainer = document.getElementById('formationsTimeline');
        if (formationsContainer) {
            formationsContainer.innerHTML = `
                <div class="timeline-item">
                    <h4>Formation Développeur Web</h4>
                    <p class="period">2022 - 2023</p>
                    <p class="location">En ligne</p>
                    <p class="description">Formation complète en développement web fullstack.</p>
                </div>
            `;
        }
    }
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.typing-text');
        if (!this.element) return;

        this.texts = [
            'Concepteur Développeur Fullstack',
            'Designer UI/UX',
            'Créateur d\'expériences web'
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;

        this.init();
    }

    init() {
        setTimeout(() => this.type(), 1000);
    }

    type() {
        const current = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = current.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        if (!this.isDeleting && this.charIndex === current.length) {
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, this.pauseTime);
            return;
        }

        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

/* ==========================================
   CURSOR EFFECT
   ========================================== */
class CursorEffect {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #3B82F6;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.15s ease;
            z-index: 9999;
            mix-blend-mode: difference;
        `;

        if (window.matchMedia('(min-width: 1024px)').matches) {
            document.body.appendChild(this.cursor);
            this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        document.querySelectorAll('a, button, .glass-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursor.style.borderColor = '#38BDF8';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = '#3B82F6';
            });
        });
    }
}

/* ==========================================
   PARALLAX EFFECT
   ========================================== */
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.hero-visual, .avatar-container');
        this.init();
    }

    init() {
        if (!this.elements.length) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;

            this.elements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

/* ==========================================
   INITIALIZE APP
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticlesAnimation();
    new Navigation();
    new SmoothScroll();
    new ScrollReveal();
    new BackToTop();
    new DataLoader();
    new TypingEffect();
    new CursorEffect();
    new ParallaxEffect();

    // Initialize tech logos animation after data is loaded
    setTimeout(() => {
        new TechLogosAnimation();
    }, 500);

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Performance optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    console.log('%c✨ Portfolio créé avec passion par Mohammed Hamiani',
        'color: #3B82F6; font-size: 16px; font-weight: bold;');
    console.log('%c🚀 Développé avec HTML, CSS & JavaScript',
        'color: #60A5FA; font-size: 14px;');
});

/* ==========================================
   PERFORMANCE MONITORING
   ========================================== */
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((items) => {
        items.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        });
    });

    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
}

/* ==========================================
   SERVICE WORKER (Optional)
   ========================================== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
