// Section "En Savoir Plus" / "Lire moins"
document.querySelectorAll(".learn-more").forEach(btn => {
    btn.addEventListener("click", function() {
        const moreContent = this.closest(".presentation").querySelector(".more-content");
        moreContent.classList.toggle("open");

        // Change le texte du bouton en fonction de l'état (ouvert ou fermé)
        if (moreContent.classList.contains("open")) {
            this.innerHTML = 'Lire moins <strong>></strong>';
        } else {
            this.innerHTML = 'En Savoir Plus <strong>></strong>';
        }
    });
});

// Modification de la taille du menu en fonction du défilement
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu ul li");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { 
        // Réduire le menu si on scrolle plus de 50 pixels
        menu.style.height = "80px"; 
        menuItems.forEach(item => {
            item.style.fontSize = "0"; // Masquer les items
        });
    } else {
        // Restaurer la taille du menu lorsqu'on revient en haut
        menu.style.height = "0";
        menuItems.forEach(item => {
            item.style.fontSize = "2vw"; // Afficher les items
        });
    }
});

// Configuration du canvas et du jeu
const restartButton = document.getElementById("restartButton");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Définition du joueur
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

// Plateformes dans le jeu
const platforms = [
    { x: 50, y: 350, width: 100, height: 10, color: "orange" },  
    { x: 200, y: 280, width: 100, height: 10, color: "blue" },  
    { x: 350, y: 210, width: 100, height: 10, color: "yellow" }, 
    { x: 500, y: 140, width: 100, height: 10, color: "purple" }  
];

// Gestion des touches de contrôle (clavier)
const keys = {
    left: false,
    right: false,
    jump: false
};

// Listener pour détecter les touches enfoncées
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "q") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
    if (e.key === " " || e.key === "w") keys.jump = true;
});

// Listener pour détecter les touches relâchées
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "q") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    if (e.key === " " || e.key === "w") keys.jump = false;
});

// Mise à jour du jeu (position du joueur, gravité, collisions)
function update() {
    // Déplacement horizontal
    if (keys.left) {
        player.velocityX = -player.speed;
    } else if (keys.right) {
        player.velocityX = player.speed;
    } else {
        player.velocityX = 0;
    }

    // Gravité et mouvement vertical
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    player.x += player.velocityX;

    // Si le joueur tombe hors du canvas, afficher le bouton de redémarrage
    if (player.y > canvas.height) {
        restartButton.style.display = "flex";
        setTimeout(() => {
            restartButton.style.opacity = 1;
        }, 300);
        return;
    }

    // Gestion des collisions avec les plateformes
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

    // Sauter si le joueur est au sol
    if (keys.jump && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;
    }

    // Garder le joueur dans les limites du canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Dessiner le jeu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le joueur
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Dessiner les plateformes
    for (let platform of platforms) {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
}

// Boucle du jeu
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// Redémarrage du jeu
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

// Affichage des contrôles pour mobile
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

// Afficher ou cacher les contrôles mobiles selon la section visible
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