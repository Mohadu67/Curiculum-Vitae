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





const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');


let currentIndex = 0;


function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}


function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; 
    updateCarousel();
}


nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();  
});


let autoSlideInterval = setInterval(nextSlide, 5000); 


function resetAutoSlide() {
    clearInterval(autoSlideInterval); 
    autoSlideInterval = setInterval(nextSlide, 5000); 
}








const restartButton = document.getElementById("restartButton");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 400;


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


const platforms = [
    { x: 50, y: 350, width: 100, height: 10, color: "orange" },  // HTML
    { x: 200, y: 280, width: 100, height: 10, color: "blue" },   // CSS
    { x: 350, y: 210, width: 100, height: 10, color: "yellow" }, // JavaScript
    { x: 500, y: 140, width: 100, height: 10, color: "purple" }  // React
];


const keys = {
    left: false,
    right: false,
    jump: false
};


window.addEventListener("keydown", (e) => {
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
    for (let platform of platforms) {
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
    }


    if (keys.jump && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false; 
    }


    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);


    for (let platform of platforms) {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
}


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


gameLoop();


restartButton.addEventListener("click", function () {

    player.x = 50;
    player.y = 300;
    player.velocityX = 0;
    player.velocityY = 0;
    player.grounded = false;


    restartButton.style.opacity = 0;
    setTimeout(() => {
        restartButton.style.display = "none";
    }, 500);
});


document.addEventListener("click", (e) => {
    if (!canvas.contains(e.target)) {
        document.body.style.overflow = "auto";
    } else {
        document.body.style.overflow = "hidden"; 
    }
});




const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const jumpButton = document.getElementById("jumpButton");


leftArrow.addEventListener("touchstart", () => {
    keys.left = true;
    keys.right = false;
});
rightArrow.addEventListener("touchstart", () => {
    keys.right = true;
    keys.left = false;
});
jumpButton.addEventListener("touchstart", () => {
    keys.jump = true;
});


leftArrow.addEventListener("touchend", () => {
    keys.left = false;
});
rightArrow.addEventListener("touchend", () => {
    keys.right = false;
});
jumpButton.addEventListener("touchend", () => {
    keys.jump = false;
});



const jeux = document.querySelector(".menu");
const manettes = document.querySelectorAll(".menu ul li");




const navLinks = document.querySelectorAll(".menu a");


navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const controls = document.querySelector('.mobile-controls');
    const triggerSection = document.querySelector('.jeux'); // Section à observer

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                controls.classList.remove('hidden'); // Afficher les contrôles
            } else {
                controls.classList.add('hidden'); // Cacher les contrôles
            }
        });
    }, {
        threshold: 0.5 // 50% de la section visible avant de déclencher
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
                observer.unobserve(bar); // Stop observing once the bar is animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const formations = document.querySelectorAll('.formations ul li');

    formations.forEach(formation => {
        formation.addEventListener('click', function () {
            // Enlever la classe active des autres formations
            formations.forEach(item => {
                item.classList.remove('active');
            });

            // Activer ou désactiver la classe active sur l'élément cliqué
            formation.classList.toggle('active');
        });
    });
});







// Sélectionner toutes les expériences de la liste
const experiences = document.querySelectorAll('.experiences ul li');

// Ajouter un gestionnaire d'événements pour chaque élément de la liste
experiences.forEach((experience) => {
    experience.addEventListener('click', () => {
        // Basculer la classe 'active' pour afficher ou masquer la description
        experience.classList.toggle('active');

    });
});