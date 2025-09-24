document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuIcon.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveNavItem() {
        let currentPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    
    // Tool Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get parent container
            const tabsContainer = this.closest('.tools-tabs') || this.closest('.component-preview');
            
            // Remove active class from all buttons in this container
            const buttons = tabsContainer.querySelectorAll('.tab-btn');
            buttons.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            
            // If in tools section
            if (tabsContainer.classList.contains('tools-tabs')) {
                const tabPanes = tabsContainer.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            }
        });
    });
    
    // Preview Tabs
    const previewTabs = document.querySelectorAll('.preview-tab');
    
    previewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get parent container
            const previewContainer = this.closest('.component-preview');
            
            // Remove active class from all tabs in this container
            const tabs = previewContainer.querySelectorAll('.preview-tab');
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding preview content
            const previewId = this.getAttribute('data-preview');
            const previewItems = previewContainer.querySelectorAll('.preview-item');
            previewItems.forEach(item => item.classList.remove('active'));
            document.getElementById(previewId).classList.add('active');
        });
    });
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Progress indicator on scroll
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Gabarito Modal
    const gabaritoBtm = document.getElementById('gabarito-btn');
    const gabaritoModal = document.getElementById('gabarito-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    if (gabaritoBtm) {
        gabaritoBtm.addEventListener('click', function() {
            if (gabaritoModal) {
                gabaritoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Gabarito Tabs
    const gabaritTabs = document.querySelectorAll('.gabarito-tab');
    
    gabaritTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            gabaritTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            const panes = document.querySelectorAll('.gabarito-pane');
            panes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate on Scroll
    const animatedElements = document.querySelectorAll('.intro-card, .config-card, .tool-card, .entrega-card, .criterio-card, .dica-card, .recurso-card');
    
    function checkAnimations() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('load', checkAnimations);
    window.addEventListener('scroll', checkAnimations);
    
    // Sticky navigation on scroll
    const mainNav = document.querySelector('.main-nav');
    
    function stickyNav() {
        if (window.scrollY > 100) {
            mainNav.style.padding = '10px 0';
            mainNav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            mainNav.style.padding = '15px 0';
            mainNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', stickyNav);

    // Biblioteca Digital Modal
    const recursoLinks = document.querySelectorAll('.recurso-link');
    const bibliotecaBtn = recursoLinks[0];
    const bibliotecaModal = document.getElementById('biblioteca-modal');

    if (bibliotecaBtn) {
        bibliotecaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (bibliotecaModal) {
                bibliotecaModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Biblioteca Digital Tabs
    const bibliotecaTabs = document.querySelectorAll('.biblioteca-tab');

    bibliotecaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            bibliotecaTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            const panes = document.querySelectorAll('.biblioteca-pane');
            panes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- LÓGICA DOS TUTORIAIS (MODIFICADO) ---
    const tutoriaisBtn = recursoLinks[1]; // O segundo link é para os tutoriais
    const tutoriaisModal = document.getElementById('tutoriais-modal');
    const tutorialItems = document.querySelectorAll('.tutorial-item');
    const videoExpandedContainer = document.querySelector('.video-expanded-container');
    const expandedVideoIframe = document.getElementById('expanded-video-iframe'); // Alterado para o iframe
    const closeVideoBtn = document.querySelector('.close-video-btn');

    // Abrir modal de tutoriais
    if (tutoriaisBtn) {
        tutoriaisBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (tutoriaisModal) {
                tutoriaisModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Expandir vídeo ao clicar em um tutorial
    tutorialItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            if (expandedVideoIframe) {
                expandedVideoIframe.src = videoSrc;
            }
            if (videoExpandedContainer) {
                videoExpandedContainer.style.display = 'flex';
            }
        });
    });

    // Função para fechar o vídeo
    function closeVideoPlayer() {
        if (expandedVideoIframe) {
            expandedVideoIframe.src = ''; // Limpa o src para parar o vídeo
        }
        if (videoExpandedContainer) {
            videoExpandedContainer.style.display = 'none';
        }
    }

    // Fechar vídeo expandido pelo botão
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', closeVideoPlayer);
    }

    // Fechar vídeo ao clicar fora dele
    if (videoExpandedContainer) {
        videoExpandedContainer.addEventListener('click', function(e) {
            if (e.target === videoExpandedContainer) {
                closeVideoPlayer();
            }
        });
    }
});
