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
