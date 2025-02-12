
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







//<----------------------------------------------carousel projet--------------------------------------->

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


let autoSlideInterval = setInterval(nextSlide, 50000); 


function resetAutoSlide() {
    clearInterval(autoSlideInterval); 
    autoSlideInterval = setInterval(nextSlide, 50000); 
}







//<----------------------------------------------Mini jeux--------------------------------------->

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

//<----------------------------------------------btn jeux mobile--------------------------------------->

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
    const formations = document.querySelectorAll('.formations ul li');

    formations.forEach(formation => {
        formation.addEventListener('click', function () {

            formations.forEach(item => {
                item.classList.remove('active');
            });

            formation.classList.toggle('active');
        });
    });
});




//<----------------------------------------------contenu experience--------------------------------------->
const experiences = document.querySelectorAll('.experiences ul li');

experiences.forEach((experience) => {
    experience.addEventListener('click', () => {

        experience.classList.toggle('active');

    });
});


// <----------------------------------------------API Json en phase d'intégration--------------------------------------->

// const contenueFormation = document.querySelector(".formations");
// const contenueExperience = document.querySelector(".experiences");

// fetch('data/db.json')
// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {

//     // *<---------------Articles page IMC------------------>*//

//     let htmlIMC = "";
//     if (contenueExperience) { 
//         if (data.contenueExperience) {
//             data.contenueExperience.forEach(function(contenueExperience) {
//                 htmlIMC += `
//                 <li>
//                     <div>
//                         <h4>${contenueExperience.titre}</h4>
//                         <p>${contenueExperience.emplacement}</p>
//                         <p>${contenueExperience.periode}</p>
//                     </div>
//                     <div class="description">
//                         <p>${contenueExperience.description}</p>
//                     </div>
//                 </li>
//                 `;
//             });
//             contenueExperience.innerHTML = htmlIMC;
//         } else {
//             console.log("Aucun article IMC trouvé dans le JSON.");
//         }
//     }

//     // *<---------------Articles page Calorie------------------>*//
//     let htmlCalorie = "";
//     if (contenueCalorie) { 
//         if (data.contenueArticlesCalorie) {
//             data.contenueArticlesCalorie.forEach(function(articleCalorie) {
//                 htmlCalorie += `
//                     <h2>${articleCalorie.titre}</h2>
//                     <div>
//                         <p>${articleCalorie.description}</p>
//                         <div class="more-content">
//                             <p>${articleCalorie.excedent}</p>
//                         </div>
//                         <button class="learn-more">Lire plus</button>
//                     </div> 
//                     <img src="assets/img/${articleCalorie.image}" alt="${articleCalorie.alt}">
//                 `;
//             });
//             contenueCalorie.innerHTML = htmlCalorie;
//         } else {
//             console.log("Aucun article Calorie trouvé dans le JSON.");
//         }
//     }

//     // *<---------------Gestion du learnMore------------------>*//
//     const btns = document.querySelectorAll(".learn-more");

//     btns.forEach(function(btn) {
//         btn.addEventListener("click", function() {
//             const moreContent = this.previousElementSibling;

//             if (moreContent.classList.contains("open")) {
//                 moreContent.classList.remove("open");
//                 this.textContent = "Lire plus";
//             } else {
//                 moreContent.classList.add("open");
//                 this.textContent = "Lire moins";
//             }
//         });
//     });
// })
// .catch(function(error) {
//     console.error("Erreur lors du fetch :", error);
// });
