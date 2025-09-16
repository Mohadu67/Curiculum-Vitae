
//<----------------------------------------------btn learn more--------------------------------------->
document.querySelectorAll(".learn-more").forEach(btn => {
    btn.addEventListener("click", function() {
        const moreContent = this.closest(".presentation").querySelector(".more-content");

        moreContent.classList.toggle("open");

        if (moreContent.classList.contains("open")) {
            this.innerHTML = 'Lire moins <strong>></strong>';
        } else {
            this.innerHTML = 'En Savoir Plus <strong>></strong>';
        }
    });
});



//<----------------------------------------------indication progression scroll--------------------------------------->

window.addEventListener('scroll', function() {
    const menu = document.querySelector('.menu');
    const progressBar = document.querySelector('.progress-bar');

    if (window.scrollY > 100) {
        menu.classList.add('minimized');
    } else {
        menu.classList.remove('minimized');
    }

    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;


    progressBar.style.width = scrollPercent + '%';
});


const navLinks = document.querySelectorAll(".menu a");
const menuEl = document.querySelector('.menu');
const navToggle = document.querySelector('.nav-toggle');

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        // close mobile nav after click
        if (menuEl && menuEl.classList.contains('open')) {
            menuEl.classList.remove('open');
            navToggle && navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Mobile nav toggle
navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menuEl && menuEl.classList.toggle('open');
});

// Active link on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['accueil','softskil','hardskil','experience']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    if (!sections.length) return;

    const linkMap = new Map();
    navLinks.forEach(a => {
        const id = a.getAttribute('href').substring(1);
        linkMap.set(id, a);
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = linkMap.get(id);
            if (!link) return;
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(sec => io.observe(sec));
});

// Logo modal flip interactions
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.logo-carousel .marquee__track');
    const modal = document.getElementById('logoModal');
    const inner = document.getElementById('logoCardInner');
    const front = document.getElementById('logoCardFront');
    const back = document.getElementById('logoCardBack');
    const closeEls = modal ? modal.querySelectorAll('[data-close-modal]') : [];

    if (!modal) return;

    const openModal = (title, imgSrc, desc) => {
        modal.setAttribute('aria-hidden', 'false');
        // fill front
        front.innerHTML = '';
        const img = document.createElement('img');
        img.src = imgSrc; img.alt = title || '';
        front.appendChild(img);
        // fill back
        back.innerHTML = '';
        const h4 = document.createElement('h4'); h4.textContent = title || 'Technologie';
        const p = document.createElement('p'); p.textContent = desc || "Description à venir.";
        back.appendChild(h4); back.appendChild(p);
        inner.classList.remove('flipped');
        track && track.classList.add('paused');
    };

    const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        inner.classList.remove('flipped');
        track && track.classList.remove('paused');
    };

    document.querySelectorAll('.logo-carousel .logo-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = (img && img.alt) || item.getAttribute('data-title') || 'Technologie';
            const desc = item.getAttribute('data-desc') || img?.getAttribute('data-desc') || `Découvrir ${title}.`;
            const src = img ? img.src : '';
            openModal(title, src, desc);
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Flip on click inside card
    inner && inner.addEventListener('click', () => {
        inner.classList.toggle('flipped');
    });

    closeEls.forEach(el => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });
});







//<----------------------------------------------carousel projet--------------------------------------->

const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let carouselIndex = 0;


let currentIndex = 0;


function updateCarousel() {
    if (!carousel) return;
    carousel.style.transform = `translateX(-${carouselIndex * 100}%)`;
}

function nextSlide() {
    if (!carouselItems.length) return;
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
    updateCarousel();
}


function prevSlide() {
    if (!carouselItems.length) return;
    carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length; 
    updateCarousel();
}


nextButton && nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevButton && prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();  
});


let autoSlideInterval = setInterval(nextSlide, 5000); 


function resetAutoSlide() {
    clearInterval(autoSlideInterval); 
    autoSlideInterval = setInterval(nextSlide, 5000); 
}







//<----------------------------------------------Mini jeux--------------------------------------->

const restartButton = document.getElementById("restartButton");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Player setup
const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: "yellow",
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    gravity: 0.5,
    jumpPower: -10,
    grounded: false
};

// Initial static platforms
let platforms = [
    { x: 50, y: 350, width: 100, height: 10, color: "orange", moving: false },
    { x: 200, y: 280, width: 100, height: 10, color: "blue", moving: false },
    { x: 350, y: 210, width: 100, height: 10, color: "yellow", moving: false },
    { x: 500, y: 140, width: 100, height: 10, color: "purple", moving: false }
];

// Game control variables
let difficultyIncreased = false; // Flag to increase difficulty only once

const keys = {
    left: false,
    right: false,
    jump: false
};


window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();  
    }

    if (e.key === "ArrowLeft" || e.key === "q") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
    if (e.key === " " || e.key === "w") keys.jump = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "q") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    if (e.key === " " || e.key === "w") keys.jump = false;
});


function update() {
    if (keys.left) {
        player.velocityX = -player.speed;
    } else if (keys.right) {
        player.velocityX = player.speed;
    } else {
        player.velocityX = 0;
    }

    player.velocityY += player.gravity;
    player.y += player.velocityY;
    player.x += player.velocityX;

    
    if (player.y > canvas.height) {
        restartButton.style.display = "flex";
        setTimeout(() => {
            restartButton.style.opacity = 1;
        }, 300);
        return;
    }

    player.grounded = false;

    
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height + 10
        ) {
            player.grounded = true;
            player.velocityY = 0;
            player.y = platform.y - player.height;
            player.color = platform.color;
        }

        
        if (platform.moving && difficultyIncreased) {
            platform.x += platform.directionX;

        
            if (platform.x <= 0 || platform.x + platform.width >= canvas.width) {
                platform.directionX *= -1;
            }
        }
    });

   
    if (keys.jump && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;
    }

   
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    
    if (player.y <= 100 && !difficultyIncreased) {
        increaseDifficulty();
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}


function increaseDifficulty() {
    difficultyIncreased = true; 

   
    platforms.forEach(platform => {
        platform.moving = true;
        platform.directionX = Math.random() > 0.5 ? 1.5 : -1.5; 
    });
}


function resetGame() {
    player.x = 50;
    player.y = 300;
    player.velocityX = 0;
    player.velocityY = 0;
    player.grounded = false;

    
    platforms = [
        { x: 50, y: 350, width: 100, height: 10, color: "orange", moving: false },
        { x: 200, y: 280, width: 100, height: 10, color: "blue", moving: false },
        { x: 350, y: 210, width: 100, height: 10, color: "yellow", moving: false },
        { x: 500, y: 140, width: 100, height: 10, color: "purple", moving: false }
    ];

    difficultyIncreased = false; 

  
    restartButton.style.opacity = 0;
    setTimeout(() => {
        restartButton.style.display = "none";
    }, 500);
}


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();


restartButton.addEventListener("click", function () {
    resetGame();
});

//<----------------------------------------------btn jeux mobile--------------------------------------->

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const jumpButton = document.getElementById("jumpButton");

function bindControl(el, onDown, onUp) {
    if (!el) return;
    // Pointer events (unified mouse/touch)
    el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        el.classList.add('is-pressed');
        onDown && onDown();
    }, { passive: false });
    el.addEventListener('pointerup', () => {
        el.classList.remove('is-pressed');
        onUp && onUp();
    });
    el.addEventListener('pointercancel', () => {
        el.classList.remove('is-pressed');
        onUp && onUp();
    });
    el.addEventListener('pointerleave', () => {
        el.classList.remove('is-pressed');
        onUp && onUp();
    });

    // Fallback touch (older browsers)
    el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        el.classList.add('is-pressed');
        onDown && onDown();
    }, { passive: false });
    el.addEventListener('touchend', () => {
        el.classList.remove('is-pressed');
        onUp && onUp();
    });
}

bindControl(leftArrow, () => { keys.left = true; keys.right = false; }, () => { keys.left = false; });
bindControl(rightArrow, () => { keys.right = true; keys.left = false; }, () => { keys.right = false; });
bindControl(jumpButton, () => { keys.jump = true; }, () => { keys.jump = false; });

// Single tap/click to jump
jumpButton && jumpButton.addEventListener('click', (e) => {
    e.preventDefault();
    keys.jump = true;
    setTimeout(() => { keys.jump = false; }, 120);
});


document.addEventListener("DOMContentLoaded", function () {
    const controls = document.querySelector('.mobile-controls');
    const triggerSection = document.querySelector('.jeux');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                controls.classList.remove('hidden');
            } else {
                controls.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(triggerSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll('.skill-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const value = bar.getAttribute('data-value');
                bar.style.width = value + '%';
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
});





//<----------------------------------------------contenu formation--------------------------------------->

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.formations ul li');
    const backdrop = document.querySelector('.formation-backdrop');
    if (!items.length) return;

    const showBackdrop = () => {
        if (backdrop) {
            // Backdrop is visually disabled; keep ARIA in sync without changing scroll
            backdrop.classList.add('show');
            backdrop.setAttribute('aria-hidden', 'false');
        }
    };
    const hideBackdrop = () => {
        if (backdrop) {
            backdrop.classList.remove('show');
            backdrop.setAttribute('aria-hidden', 'true');
        }
    };

    const closeAll = () => {
        items.forEach(li => {
            li.classList.remove('active');
            li.setAttribute('aria-expanded', 'false');
            const d = li.querySelector('.detail');
            if (d) d.setAttribute('aria-hidden', 'true');
        });
    };

    items.forEach((item, idx) => {
        // Make focusable and announce state
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');

        const detail = item.querySelector('.detail');
        if (detail) {
            if (!detail.id) detail.id = `formation-detail-${idx}`;
            item.setAttribute('aria-controls', detail.id);
            item.setAttribute('aria-expanded', 'false');
            detail.setAttribute('aria-hidden', 'true');
        }

        const toggle = () => {
            const isActive = item.classList.contains('active');
            // close all
            closeAll();
            if (!isActive) {
                item.classList.add('active');
                item.setAttribute('aria-expanded', 'true');
                if (detail) detail.setAttribute('aria-hidden', 'false');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                showBackdrop();
            } else {
                hideBackdrop();
            }
        };

        item.addEventListener('click', toggle);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Backdrop interactions
    backdrop && backdrop.addEventListener('click', () => {
        closeAll();
        hideBackdrop();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAll();
            hideBackdrop();
        }
    });

    // Reveal on scroll animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => {
        item.classList.add('reveal-up');
        revealObserver.observe(item);
    });
});




//<----------------------------------------------contenu experience--------------------------------------->
const experiences = document.querySelectorAll('.experiences ul li');

experiences.forEach((experience) => {
    experience.addEventListener('click', () => {

        experience.classList.toggle('active');

    });
});











let iconIndex = 0;


const icons = document.querySelectorAll('.floating-icons a');

function animateIcon() {
    if (!icons.length) return;
    icons.forEach(icon => icon.classList.remove('animated'));
    icons[iconIndex].classList.add('animated');
    const thisIndex = iconIndex;
    setTimeout(() => {
        if (icons[thisIndex]) icons[thisIndex].classList.remove('animated');
    }, 1000);
    iconIndex = (iconIndex + 1) % icons.length; 
}


setInterval(animateIcon, 15000);


animateIcon();




// Fetch content from data/db.json and render sections dynamically
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/db.json')
        .then(res => res.json())
        .then(data => {
            // Soft Skills
            const softContainer = document.getElementById('softSkillsContainer');
            if (softContainer && Array.isArray(data.softSkills)) {
                softContainer.innerHTML = data.softSkills.map(s => `
                    <div class="skill">
                        <h4>${s.title}</h4>
                        <p>${s.desc}</p>
                    </div>
                `).join('');
            }

            // Logos (marquee track)
            const track = document.getElementById('logosTrack');
            if (track && Array.isArray(data.logos)) {
                const setA = data.logos.map(l => `
                    <div class="logo-item" data-desc="${l.desc || ''}"><img src="${l.src}" alt="${l.alt}"></div>
                `).join('');
                const setB = data.logos.map(l => `
                    <div class="logo-item" aria-hidden="true"><img src="${l.src}" alt=""></div>
                `).join('');
                track.innerHTML = setA + setB;
            }

            // Experiences
            const expUl = document.querySelector('.experiences ul#experience');
            if (expUl && Array.isArray(data.experiences)) {
                expUl.innerHTML = data.experiences.map(e => `
                    <li>
                        <div>
                            <h4>${e.title}</h4>
                            <p>${e.location}</p>
                            <p>${e.period}</p>
                        </div>
                        <div class="description">
                            <p>${e.description}</p>
                        </div>
                    </li>
                `).join('');
            }

            // Formations
            const formUl = document.querySelector('#formations .formations ul, #formationsList');
            if (formUl && Array.isArray(data.formations)) {
                formUl.innerHTML = data.formations.map((f, i) => `
                    <li>
                        <div>
                            <h4>${f.title}</h4>
                            <p>${f.org}</p>
                            <p>${f.period}</p>
                        </div>
                        <div class="detail hidden" id="formation-detail-db-${i}">
                            <p>${f.detail}</p>
                        </div>
                    </li>
                `).join('');
            }

            // Re-init interactive behaviors for newly injected nodes
            initExperiencesUI();
            initFormationsUI();
            initLogosModalUI();
            initHintSheenAndRipple();
        })
        .catch(err => console.error('Erreur lors du chargement du JSON:', err));
});

function initExperiencesUI() {
    const items = document.querySelectorAll('.experiences ul li');
    items.forEach(li => {
        li.addEventListener('click', () => li.classList.toggle('active'));
    });
}

function initFormationsUI() {
    const items = document.querySelectorAll('.formations ul li');
    const backdrop = document.querySelector('.formation-backdrop');
    if (!items.length) return;
    const showBackdrop = () => { if (backdrop) { backdrop.classList.add('show'); backdrop.setAttribute('aria-hidden', 'false'); } };
    const hideBackdrop = () => { if (backdrop) { backdrop.classList.remove('show'); backdrop.setAttribute('aria-hidden', 'true'); } };
    const closeAll = () => { items.forEach(li => { li.classList.remove('active'); li.setAttribute('aria-expanded', 'false'); const d = li.querySelector('.detail'); if (d) d.setAttribute('aria-hidden', 'true'); }); };
    items.forEach((item, idx) => {
        item.setAttribute('role', 'button'); item.setAttribute('tabindex', '0');
        const detail = item.querySelector('.detail');
        if (detail) { if (!detail.id) detail.id = `formation-detail-${idx}`; item.setAttribute('aria-controls', detail.id); item.setAttribute('aria-expanded', 'false'); detail.setAttribute('aria-hidden', 'true'); }
        const toggle = () => { const isActive = item.classList.contains('active'); closeAll(); if (!isActive) { item.classList.add('active'); item.setAttribute('aria-expanded', 'true'); if (detail) detail.setAttribute('aria-hidden', 'false'); item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); showBackdrop(); } else { hideBackdrop(); } };
        item.addEventListener('click', toggle);
        item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') { e.preventDefault(); toggle(); } });
    });
    backdrop && backdrop.addEventListener('click', () => { closeAll(); hideBackdrop(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAll(); hideBackdrop(); } });
}

function initLogosModalUI() {
    const track = document.querySelector('.logo-carousel .marquee__track');
    const modal = document.getElementById('logoModal');
    const inner = document.getElementById('logoCardInner');
    const front = document.getElementById('logoCardFront');
    const back = document.getElementById('logoCardBack');
    if (!modal || !track) return;
    document.querySelectorAll('.logo-carousel .logo-item').forEach(item => {
        item.setAttribute('tabindex', '0'); item.setAttribute('role', 'button');
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = (img && img.alt) || item.getAttribute('data-title') || 'Technologie';
            const desc = item.getAttribute('data-desc') || img?.getAttribute('data-desc') || `Découvrir ${title}.`;
            const src = img ? img.src : '';
            modal.setAttribute('aria-hidden', 'false');
            front.innerHTML = ''; const imgel = document.createElement('img'); imgel.src = src; imgel.alt = title; front.appendChild(imgel);
            back.innerHTML = ''; const h4 = document.createElement('h4'); h4.textContent = title; const p = document.createElement('p'); p.textContent = desc; back.appendChild(h4); back.appendChild(p);
            inner.classList.remove('flipped'); track.classList.add('paused');
        });
        item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') { e.preventDefault(); item.click(); } });
    });
}

function initHintSheenAndRipple() {
    const clickableLis = [ ...document.querySelectorAll('.formations ul li'), ...document.querySelectorAll('.experiences ul li') ];
    if (!clickableLis.length) return;
    const hinted = new WeakSet();
    const hintObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (!entry.isIntersecting) return; const el = entry.target; if (hinted.has(el)) return; hinted.add(el); el.classList.add('hint-bounce'); setTimeout(() => el.classList.remove('hint-bounce'), 1400); hintObserver.unobserve(el); }); }, { threshold: 0.6 });
    clickableLis.forEach(li => hintObserver.observe(li));
    const sheenIntervals = new WeakMap();
    const runSheen = (el) => { el.classList.add('sheen-run'); setTimeout(() => el.classList.remove('sheen-run'), 1100); };
    const sheenObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { const el = entry.target; if (entry.isIntersecting) { runSheen(el); if (!sheenIntervals.has(el)) { const id = setInterval(() => runSheen(el), 5000); sheenIntervals.set(el, id); } } else { const id = sheenIntervals.get(el); if (id) { clearInterval(id); sheenIntervals.delete(el); } } }); }, { threshold: 0.4 });
    clickableLis.forEach(li => sheenObserver.observe(li));
    const createRipple = (e, target) => { const rect = target.getBoundingClientRect(); const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left; const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top; const span = document.createElement('span'); span.className = 'ripple'; span.style.left = `${x}px`; span.style.top = `${y}px`; target.appendChild(span); setTimeout(() => span.remove(), 700); };
    clickableLis.forEach(li => { li.addEventListener('click', (e) => createRipple(e, li)); li.addEventListener('touchstart', (e) => { createRipple(e, li); }, { passive: true }); });
}
document.addEventListener('DOMContentLoaded', () => {
    const clickableLis = [
        ...document.querySelectorAll('.formations ul li'),
        ...document.querySelectorAll('.experiences ul li')
    ];
    if (!clickableLis.length) return;

    // 1) One-time hint bounce when first in view
    const hinted = new WeakSet();
    const hintObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (hinted.has(el)) return;
            hinted.add(el);
            el.classList.add('hint-bounce');
            setTimeout(() => el.classList.remove('hint-bounce'), 1400);
            hintObserver.unobserve(el);
        });
    }, { threshold: 0.6 });

    clickableLis.forEach(li => hintObserver.observe(li));

    // 2) Repeating sheen every 5s while visible
    const sheenIntervals = new WeakMap();
    const runSheen = (el) => {
        el.classList.add('sheen-run');
        setTimeout(() => el.classList.remove('sheen-run'), 1100);
    };

    const sheenObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                // kick once immediately
                runSheen(el);
                if (!sheenIntervals.has(el)) {
                    const id = setInterval(() => runSheen(el), 5000);
                    sheenIntervals.set(el, id);
                }
            } else {
                // stop when out of view
                const id = sheenIntervals.get(el);
                if (id) {
                    clearInterval(id);
                    sheenIntervals.delete(el);
                }
            }
        });
    }, { threshold: 0.4 });

    clickableLis.forEach(li => sheenObserver.observe(li));

    // 3) Ripple on click for both sections
    const createRipple = (e, target) => {
        const rect = target.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
        const span = document.createElement('span');
        span.className = 'ripple';
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        target.appendChild(span);
        setTimeout(() => span.remove(), 700);
    };

    clickableLis.forEach(li => {
        li.addEventListener('click', (e) => createRipple(e, li));
        li.addEventListener('touchstart', (e) => {
            createRipple(e, li);
        }, { passive: true });
    });
});
