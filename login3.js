// Esperar pelo carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização das variáveis
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const errorMessage = document.getElementById('error-message');
    const closeErrorBtn = document.getElementById('close-error');
    const errorText = document.getElementById('error-text');
    const successMessage = document.getElementById('success-message');
    
    // Verificar parâmetro de logout na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logout') === 'true') {
        // Limpar qualquer autenticação existente
        sessionStorage.removeItem('authenticated');
        console.log('Sessão encerrada por logout');
    }
    
    // Configuração das partículas
    initParticles();
    
    // Animar entrada dos elementos
    animateElements();
    
    // Toggle da visibilidade da senha
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alterar ícone
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
    
    // Fechar mensagem de erro
    closeErrorBtn.addEventListener('click', function() {
        errorMessage.classList.remove('show');
    });
    
    // Validação e envio do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Verificar se os campos estão preenchidos
        if (!username || !password) {
            showError('Por favor, preencha todos os campos.');
            shakeForm();
            return;
        }
        
        // Adicionar classe de carregamento ao botão
        const loginButton = document.querySelector('.login-button');
        loginButton.classList.add('loading');
        
        // Simular tempo de processamento
        setTimeout(function() {
            // Validar credenciais (temporariamente definidas como admin/admin)
            if (username === 'admin' && password === 'admin') {
                loginSuccess();
            } else {
                loginButton.classList.remove('loading');
                showError('Usuário ou senha incorretos. Tente novamente.');
                shakeForm();
            }
        }, 1500);
    });
    
    // Configuração das partículas interativas
    function initParticles() {
        particlesJS('particles-container', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3498db"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3498db",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Função para animar os elementos na entrada
    function animateElements() {
        const features = document.querySelectorAll('.feature');
        
        features.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, 300 + (index * 150));
        });
        
        // Animar campos do formulário
        const inputGroups = document.querySelectorAll('.input-group');
        
        inputGroups.forEach((input, index) => {
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                input.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        });
    }
    
    // Função para mostrar mensagem de erro
    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.add('show');
        
        // Esconder a mensagem após 5 segundos
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    // Função para animar o formulário ao ter erro
    function shakeForm() {
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.add('shake');
        
        // Adiciona uma classe de animação
        if (!document.styleSheets[0].cssRules[0].cssText.includes('@keyframes shake')) {
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    10%, 30%, 50%, 70%, 90% {
                        transform: translateX(-5px);
                    }
                    20%, 40%, 60%, 80% {
                        transform: translateX(5px);
                    }
                }
                
                .shake {
                    animation: shake 0.6s ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
        
        formContainer.classList.add('shake');
        
        // Remover a classe após terminar a animação
        setTimeout(() => {
            formContainer.classList.remove('shake');
        }, 600);
    }
    
    // Função para processar o login com sucesso
    function loginSuccess() {
        // Armazenar informação de autenticação usando sessionStorage
        // Isso será limpo quando a sessão do navegador for encerrada
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('username', usernameInput.value.trim());
        
        // Adicionar um timestamp para verificar expiração (opcional)
        const expirationTime = Date.now() + (30 * 60 * 1000); // 30 minutos
        sessionStorage.setItem('sessionExpires', expirationTime);
        
        // Mostrar mensagem de sucesso
        successMessage.classList.add('show');
        
        // Log para depuração
        console.log("Login realizado com sucesso. Autenticação armazenada:", sessionStorage.getItem('authenticated'));
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
    
    // Adicionar efeito de foco nos inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Verificar se o input já tem valor (ex: em caso de refresh)
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Adicionar efeitos de hover nos botões sociais
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
        
        // Adicionar ondulação ao clicar
        button.addEventListener('click', function(e) {
            // Criar elemento de ondulação
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Obter posição do clique
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            // Posicionar e estilizar a ondulação
            ripple.style.cssText = `
                position: absolute;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                top: ${y}px;
                left: ${x}px;
            `;
            
            // Adicionar keyframes se necessário
            if (!document.styleSheets[0].cssRules[0].cssText.includes('@keyframes ripple')) {
                const style = document.createElement('style');
                style.innerHTML = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Remover após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adicionar efeito ao botão de login
    const loginButton = document.querySelector('.login-button');
    loginButton.addEventListener('mouseover', function() {
        this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.4)';
    });
    
    loginButton.addEventListener('mouseout', function() {
        this.style.boxShadow = '';
    });
    
    // Efeito de foco nas features do lado esquerdo
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseover', function() {
            this.style.transform = 'translateX(10px)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        feature.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.backgroundColor = '';
        });
    });
    
    // Verificar se o formulário foi preenchido para habilitar o botão
    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });
    
    function checkFormValidity() {
        const loginButton = document.querySelector('.login-button');
        if (usernameInput.value.trim() && passwordInput.value.trim()) {
            loginButton.disabled = false;
            loginButton.style.opacity = '1';
        } else {
            loginButton.disabled = true;
            loginButton.style.opacity = '0.7';
        }
    }
    
    // Inicializar validação do formulário
    checkFormValidity();
    
    // Adicionar evento para tecla "Enter" nos inputs
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (usernameInput.value.trim() && passwordInput.value.trim()) {
                    loginForm.dispatchEvent(new Event('submit'));
                } else {
                    shakeForm();
                    showError('Por favor, preencha todos os campos.');
                }
            }
        });
    });
    
    // Efeito de partículas seguindo o cursor
    const particlesContainer = document.getElementById('particles-container');
    particlesContainer.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Adicionar partícula na posição do mouse
        const particle = document.createElement('span');
        particle.classList.add('cursor-particle');
        
        // Estilizar partícula
        particle.style.cssText = `
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: rgba(52, 152, 219, 0.5);
            border-radius: 50%;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 9999;
            animation: particle-fade 1s forwards;
        `;
        
        // Adicionar keyframes se necessário
        if (!document.styleSheets[0].cssRules[0].cssText.includes('@keyframes particle-fade')) {
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes particle-fade {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(particle);
        
        // Remover após a animação
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
    
    // Adicionar efeito de logo pulsante
    const logoIcon = document.querySelector('.logo-icon');
    
    if (!document.styleSheets[0].cssRules[0].cssText.includes('@keyframes pulse')) {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
                }
                70% {
                    transform: scale(1.1);
                    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    logoIcon.style.animation = 'pulse 2s infinite';
    
    // Efeito de brilho para o texto destacado
    const highlightText = document.querySelector('.highlight');
    
    if (!document.styleSheets[0].cssRules[0].cssText.includes('@keyframes glow')) {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes glow {
                0% {
                    text-shadow: 0 0 5px rgba(0, 206, 201, 0.5);
                }
                50% {
                    text-shadow: 0 0 20px rgba(0, 206, 201, 0.8);
                }
                100% {
                    text-shadow: 0 0 5px rgba(0, 206, 201, 0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    highlightText.style.animation = 'glow 3s infinite';
});