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
            this.renderProjects(data.projects);
            this.renderExperiences(data.experiences);
            this.renderFormations(data.formations);

            // Initialize flip card modals after data is loaded
            setTimeout(() => {
                // Register Tech Skills configuration
                UniversalFlipModal.addConfig(data.logos, {
                    selector: '.tech-logo-item',
                    dataAttr: 'techIndex',
                    cardClass: '',
                    renderFront: (tech) => `
                        <img src="${tech.src}" alt="${tech.alt}" loading="lazy">
                        <h3>${tech.alt}</h3>
                        <p>${tech.desc}</p>
                        <div class="flip-hint">Cliquer pour en savoir plus →</div>
                    `,
                    renderBack: (tech) => `
                        <h3>${tech.alt}</h3>
                        <div class="level-badge">${tech.level}</div>
                        <div class="experience">📅 ${tech.yearsExperience}</div>
                        <div class="description">${tech.detailedDesc}</div>
                    `
                });

                // Register Soft Skills configuration
                UniversalFlipModal.addConfig(data.softSkills, {
                    selector: '.soft-skill-item',
                    dataAttr: 'skillIndex',
                    cardClass: 'soft-skill-card',
                    renderFront: (skill) => `
                        <div class="skill-icon-large">${skill.icon}</div>
                        <h3>${skill.title}</h3>
                        <p>${skill.desc}</p>
                        <div class="flip-hint">Cliquer pour en savoir plus →</div>
                    `,
                    renderBack: (skill) => `
                        <h3>${skill.icon} ${skill.title}</h3>
                        <div class="description">${skill.detailedDesc}</div>
                        ${skill.examples ? `
                            <div class="examples-title">💡 Exemples concrets :</div>
                            <ul class="examples-list">
                                ${skill.examples.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        ` : ''}
                    `
                });

                // Register Experiences configuration
                UniversalFlipModal.addConfig(data.experiences, {
                    selector: '.timeline-item.experience-item',
                    dataAttr: 'expIndex',
                    cardClass: 'experience-card',
                    renderFront: (exp) => `
                        <div class="skill-icon-large">${exp.icon || '💼'}</div>
                        <h3>${exp.title}</h3>
                        <p class="period">${exp.period}</p>
                        <p class="location">${exp.location}</p>
                        <div class="flip-hint">Cliquer pour voir les détails →</div>
                    `,
                    renderBack: (exp) => `
                        <h3>${exp.icon || '💼'} ${exp.title}</h3>
                        <div class="location-badge">${exp.location}</div>
                        <div class="experience">📅 ${exp.period}</div>
                        ${exp.tasks ? `
                            <div class="examples-title">📋 Missions principales :</div>
                            <ul class="examples-list">
                                ${exp.tasks.map(task => `<li>${task}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${exp.achievements ? `
                            <div class="examples-title">🏆 Réalisations :</div>
                            <ul class="examples-list achievements-list">
                                ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${exp.technologies ? `
                            <div class="tech-tags">
                                ${exp.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                            </div>
                        ` : ''}
                    `
                });

                // Register Formations configuration
                UniversalFlipModal.addConfig(data.formations, {
                    selector: '.timeline-item.formation-item',
                    dataAttr: 'formationIndex',
                    cardClass: 'formation-card',
                    renderFront: (formation) => `
                        <div class="skill-icon-large">${formation.icon || '🎓'}</div>
                        <h3>${formation.title}</h3>
                        <p class="period">${formation.period}</p>
                        <p class="location">${formation.org}</p>
                        <div class="flip-hint">Cliquer pour voir le programme →</div>
                    `,
                    renderBack: (formation) => `
                        <h3>${formation.icon || '🎓'} ${formation.title}</h3>
                        <div class="location-badge">${formation.org}</div>
                        <div class="experience">📅 ${formation.period}</div>
                        ${formation.status ? `<div class="status-badge">${formation.status}</div>` : ''}
                        ${formation.modules ? `
                            <div class="examples-title">📚 Modules enseignés :</div>
                            <ul class="examples-list modules-list">
                                ${formation.modules.map(mod => `<li>${mod}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${formation.skills ? `
                            <div class="tech-tags">
                                ${formation.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                            </div>
                        ` : ''}
                    `
                });

                // Create single modal instance
                new UniversalFlipModal();
            }, 500);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            this.renderFallbackData();
        }
    }

    renderTechLogos(logos) {
        const container = document.getElementById('techLogosGrid');
        if (!container || !logos) return;

        container.innerHTML = logos.map((logo, index) => `
            <div class="tech-logo-item" data-tech-index="${index}">
                <img src="${logo.src}" alt="${logo.alt}">
                <span>${logo.alt}</span>
            </div>
        `).join('');
    }

    renderProjects(projects) {
        const container = document.getElementById('projectsGrid');
        if (!container || !projects) return;

        container.innerHTML = projects.map(project => `
            <div class="project-card glass-card" data-link="${project.link}">
                <div class="project-image ${project.imageClass}">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <span class="project-link">
                            Voir le projet
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path d="M7 13L13 7M13 7H7M13 7V13" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Ajouter event listeners pour rendre les cards cliquables
        container.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const link = card.dataset.link;
                if (link) {
                    window.open(link, '_blank');
                }
            });
        });
    }

    renderSoftSkills(skills) {
        const container = document.getElementById('softSkillsContainer');
        if (!container || !skills) return;

        container.innerHTML = skills.map((skill, index) => `
            <div class="soft-skill-item" data-skill-index="${index}">
                <div class="soft-skill-icon">${skill.icon}</div>
                <strong>${skill.title}</strong>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">
                    ${skill.desc}
                </p>
            </div>
        `).join('');
    }


    renderExperiences(experiences) {
        const container = document.getElementById('experienceTimeline');
        if (!container || !experiences) return;

        container.innerHTML = experiences.map((exp, index) => `
            <div class="timeline-item experience-item" data-exp-index="${index}">
                <div class="timeline-icon">${exp.icon || '💼'}</div>
                <h4>${exp.title}</h4>
                <p class="period">${exp.period}</p>
                <p class="location">${exp.location}</p>
                <p class="description">${exp.description}</p>
                <div class="timeline-hint">Cliquer pour plus de détails →</div>
            </div>
        `).join('');
    }

    renderFormations(formations) {
        const container = document.getElementById('formationsTimeline');
        if (!container || !formations) return;

        container.innerHTML = formations.map((formation, index) => `
            <div class="timeline-item formation-item" data-formation-index="${index}">
                <div class="timeline-icon">${formation.icon || '🎓'}</div>
                <h4>${formation.title}</h4>
                <p class="period">${formation.period}</p>
                <p class="location">${formation.org}</p>
                <p class="description">${formation.detail}</p>
                <div class="timeline-hint">Cliquer pour voir le programme →</div>
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
            border: 2px solid #6B9FE8;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.15s ease, border-color 0.15s ease;
            z-index: 9999;
            mix-blend-mode: difference;
        `;

        if (window.matchMedia('(min-width: 1024px)').matches) {
            document.body.appendChild(this.cursor);
            this.init();
        }
    }

    init() {
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        // Attach listeners to clickable elements
        this.attachListeners();

        // Re-attach listeners after dynamic content loads
        setTimeout(() => {
            this.attachListeners();
        }, 1000);
    }

    attachListeners() {
        // All clickable selectors
        const clickableSelectors = [
            'a',
            'button',
            '.tech-logo-item',
            '.soft-skill-item',
            '.timeline-item',
            '.contact-card',
            '.project-card',
            '.project-link',
            '.project-image',
            '[role="button"]',
            'input[type="submit"]',
            '.btn'
        ];

        const elements = document.querySelectorAll(clickableSelectors.join(', '));

        elements.forEach(el => {
            // Remove old listeners if any
            el.removeEventListener('mouseenter', this.onMouseEnter);
            el.removeEventListener('mouseleave', this.onMouseLeave);

            // Add new listeners
            el.addEventListener('mouseenter', this.onMouseEnter.bind(this));
            el.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        });
    }

    onMouseEnter() {
        this.cursor.style.transform = 'scale(2)';
        this.cursor.style.borderColor = '#8BB5F0';
    }

    onMouseLeave() {
        this.cursor.style.transform = 'scale(1)';
        this.cursor.style.borderColor = '#6B9FE8';
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
   UNIVERSAL FLIP MODAL (Optimized & Fixed)
   ========================================== */
class UniversalFlipModal {
    static instance = null;
    static configs = [];

    constructor() {
        // Singleton pattern - only one modal instance
        if (UniversalFlipModal.instance) {
            return UniversalFlipModal.instance;
        }

        this.modalOverlay = null;
        this.flipContainer = null;
        this.isFlipped = false;
        this.currentConfig = null;
        this.currentData = null;

        this.init();
        UniversalFlipModal.instance = this;
    }

    static addConfig(data, config) {
        UniversalFlipModal.configs.push({ data, config });
    }

    init() {
        this.createModal();
        this.attachEventListeners();
    }

    createModal() {
        // Create modal overlay
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = 'flip-modal-overlay';

        // Create flip card container
        this.flipContainer = document.createElement('div');
        this.flipContainer.className = 'flip-card-container';

        // Create flip card inner
        const flipInner = document.createElement('div');
        flipInner.className = 'flip-card-inner';

        // Create front and back faces
        this.front = document.createElement('div');
        this.front.className = 'flip-card-front';

        this.back = document.createElement('div');
        this.back.className = 'flip-card-back';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'flip-close-btn';
        closeBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        `;
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeModal();
        });

        // Assemble modal
        flipInner.appendChild(this.front);
        flipInner.appendChild(this.back);
        this.flipContainer.appendChild(flipInner);
        this.modalOverlay.appendChild(closeBtn);
        this.modalOverlay.appendChild(this.flipContainer);
        document.body.appendChild(this.modalOverlay);
    }

    attachEventListeners() {
        // Single event delegation for all configs
        document.addEventListener('click', (e) => {
            // Check each config
            for (const { data, config } of UniversalFlipModal.configs) {
                const item = e.target.closest(config.selector);
                if (item) {
                    // Get the index directly from dataset
                    const index = parseInt(
                        item.dataset.techIndex ||
                        item.dataset.skillIndex ||
                        item.dataset.expIndex ||
                        item.dataset.formationIndex
                    );

                    if (!isNaN(index) && data[index]) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openModal(data[index], config);
                        return; // Exit completely after opening
                    }
                }
            }
        });

        // Close on overlay click
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });

        // Flip card on click
        this.flipContainer.addEventListener('click', (e) => {
            // Don't flip if clicking on close button
            if (!e.target.closest('.flip-close-btn') && !this.isFlipped) {
                this.flipCard();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(itemData, config) {
        this.currentConfig = config;
        this.currentData = itemData;

        // Update container class
        this.flipContainer.className = `flip-card-container ${config.cardClass || ''}`;

        // Render front and back faces using config functions
        this.front.innerHTML = config.renderFront(itemData);
        this.back.innerHTML = config.renderBack(itemData);

        // Reset flip state
        this.isFlipped = false;
        this.flipContainer.classList.remove('flipped');

        // Show modal with animation
        requestAnimationFrame(() => {
            this.modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    flipCard() {
        this.isFlipped = true;
        this.flipContainer.classList.add('flipped');
    }

    closeModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Reset after animation
        setTimeout(() => {
            this.isFlipped = false;
            this.flipContainer.classList.remove('flipped');
        }, 300);
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
