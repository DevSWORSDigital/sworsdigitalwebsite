/* Animação Menu Navbar */
class MobileNavbar {
    constructor(mobileMenu, navList, closeMenuBtn) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.closeMenuBtn = document.querySelector(closeMenuBtn);
        this.activeClass = "active";
    }

    handleClick = () => {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
    }

    handleMenuClose = () => {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenu.classList.remove(this.activeClass);
    }

    closeNavbar = () => {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenu.classList.remove(this.activeClass);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.closeMenuBtn.addEventListener("click", this.handleMenuClose);

        const navLinks = this.navList.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", this.closeNavbar);
        });
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    "#close-menu"
);
mobileNavbar.init();



document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um ouvinte de evento de clique a todos os links do menu e do footer
    var menuLinks = document.querySelectorAll('nav a');
    var footerLinks = document.querySelectorAll('.footer a');

    var allLinks = [...menuLinks, ...footerLinks];

    allLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var targetPosition = targetElement.offsetTop - 100; // 92px é a altura do header. tem uma folguinha!

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// Seção de animação do link "a" do menu nav conforme navegação do usuário
document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll('nav a');

    function updateActiveLink() {
        var windowHeight = window.innerHeight;
        var scrollPosition = window.scrollY + windowHeight / 2;

        links.forEach(function (link, index) {
            var sectionId = link.getAttribute('href').substring(1);
            var section = document.getElementById(sectionId);
            var sectionClass = section.getAttribute('class'); // Obtém a classe da seção

            // Ajuste para a última seção quando estiver próximo ao final da página
            var isLastSection = index === links.length - 1;
            var bottomThreshold = isLastSection ? document.body.clientHeight - windowHeight : section.offsetTop + section.offsetHeight;

            if (section.offsetTop <= scrollPosition && bottomThreshold > scrollPosition) {
                link.classList.add('active', sectionClass); // Adiciona a classe da seção

                // Remover a classe 'active' dos links anteriores
                for (var i = 0; i < index; i++) {
                    links[i].classList.remove('active');
                }

                // Remover a classe 'active' dos links seguintes
                for (var j = index + 1; j < links.length; j++) {
                    links[j].classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});