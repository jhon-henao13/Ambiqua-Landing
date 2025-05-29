// Variables globales
const body = document.body;

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 100
  });

  // Inicializar todas las animaciones y funcionalidades
  initializeAnimations();
});

// Función principal de inicialización
function initializeAnimations() {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        if (isMenuOpen) {
          toggleMenu();
        }
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Parallax effect para hero shapes
    const shapes = document.querySelectorAll('.hero-shape');
    shapes.forEach(shape => {
      const speed = shape.classList.contains('shape-1') ? 0.1 : 
                   shape.classList.contains('shape-2') ? 0.15 : 0.2;
      shape.style.transform = `translateY(${currentScroll * speed}px)`;
    });
    
    // Animar elementos al hacer scroll
    animateOnScroll();
    
    lastScroll = currentScroll;
  });


  // Theme

  const body = document.body;
  const themeToggleCheckbox = document.querySelector('#theme-toggle-switch');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Establecer tema inicial
  const savedTheme = localStorage.getItem('theme');
  const isLight = savedTheme === 'light' || (!savedTheme && !prefersDarkScheme.matches);
  body.classList.toggle('light-theme', isLight);
  themeToggleCheckbox.checked = isLight;
  
  // Cambiar tema al hacer clic
  themeToggleCheckbox.addEventListener('change', () => {
    const isLightMode = themeToggleCheckbox.checked;
    body.classList.toggle('light-theme', isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeColors(isLightMode);
  });
  
  // Actualizar colores personalizados
  function updateThemeColors(isLight) {
    const elements = document.querySelectorAll('.feature-card, .service-card, .app-feature');
    elements.forEach(element => {
      element.style.transition = 'all 0.5s ease';
      element.style.background = isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';
    });
  }
  


  const el = document.getElementById('hero-image')
  const height = el.clientHeight
  const width = el.clientWidth

  el.addEventListener('mousemove', (evt) => {
    const {layerX, layerY} = evt

    const yRotation = (
      (layerX - width / 2) / width
    ) * 20

    const xRotation = (
      (layerY - height / 2) / height
    ) * 20


    const string = `
      perspective(500px)
      scale(1.05)
      rotateX(${xRotation}deg)
      rotateY(${yRotation}deg)`

    el.style.transform = string

  })

  el.addEventListener('mouseout', () => {
    el.style.transform = `
      perspective(500px)
      scale(1)
      rotateX(0)
      rotateY(0)`
  })

  // Scrollspy
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            
            // Animar enlace activo
            const icon = link.querySelector('.nav-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
              icon.style.transform = '';
            }, 300);
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Menú móvil mejorado
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Animar elementos del menú
    const navItems = mobileMenu.querySelectorAll('.mobile-nav-link');
    navItems.forEach((item, index) => {
      if (isMenuOpen) {
        item.style.animation = `slideInRight 0.5s ease forwards ${index * 0.1}s`;
      } else {
        item.style.animation = '';
      }
    });
  }

  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileMenuClose.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer clic en un enlace
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (isMenuOpen && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target) && 
        !mobileMenuClose.contains(e.target)) {
      toggleMenu();
    }
  });

  // Cerrar menú al cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && isMenuOpen) {
      toggleMenu();
    }
  });

  // Botón scroll to top
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
      scrollTopBtn.style.animation = 'fadeIn 0.3s ease forwards';
    } else {
      scrollTopBtn.classList.remove('visible');
      scrollTopBtn.style.animation = 'fadeOut 0.3s ease forwards';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Animar botón
    scrollTopBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      scrollTopBtn.style.transform = 'scale(1)';
    }, 200);
  });

  // Animaciones al hacer scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .service-card, .app-feature, .about-stat, .stat-item, .device');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
        element.classList.add('animate');
        
        if (element.classList.contains('device')) {
          const isPhone = element.classList.contains('phone');
          element.style.animation = isPhone ? 'floatPhone 6s ease-in-out infinite' : 'floatTablet 8s ease-in-out infinite';
        }
      }
    });
  }

  // Formulario de contacto
  const contactForm = document.querySelector('.contact-form');
  const formInputs = document.querySelectorAll('.form-input');

  formInputs.forEach(input => {
    const label = input.parentElement.querySelector('.form-label');
    const icon = input.parentElement.querySelector('.input-icon');
    
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
      label.classList.add('active');
      icon.style.color = 'var(--primary)';
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
        label.classList.remove('active');
        icon.style.color = '';
      }
    });
    
    input.addEventListener('input', () => {
      if (input.value) {
        input.classList.add('valid');
        icon.style.color = 'var(--primary)';
      } else {
        input.classList.remove('valid');
        icon.style.color = '';
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
      submitBtn.classList.add('success');
      submitBtn.style.animation = 'bounce 0.5s ease';
      
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('success');
        submitBtn.style.animation = '';
        
        formInputs.forEach(input => {
          input.parentElement.classList.remove('focused');
          input.classList.remove('valid');
          const label = input.parentElement.querySelector('.form-label');
          const icon = input.parentElement.querySelector('.input-icon');
          if (label) label.classList.remove('active');
          if (icon) icon.style.color = '';
        });
      }, 2000);
    }, 1500);
  });

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const button = newsletterForm.querySelector('button');
      
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      button.disabled = true;
      
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-paper-plane"></i>';
          button.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  // Efecto de escritura para el título
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        heroObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroTitle);
  }

  // Animación de números
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    const duration = 2000;
    const increment = finalValue / (duration / 16);
    
    const updateValue = () => {
      if (currentValue < finalValue) {
        currentValue += increment;
        requestAnimationFrame(() => {
          stat.textContent = Math.round(currentValue) + (stat.textContent.includes('%') ? '%' : '');
        });
        requestAnimationFrame(updateValue);
      } else {
        stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '');
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateValue();
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    
    observer.observe(stat);
  });

  // Efecto hover para tarjetas
  const cards = document.querySelectorAll('.feature-card, .service-card, .app-feature');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      requestAnimationFrame(() => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = 'var(--shadow-glow)';
      });
    });
    
    card.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
      });
    });
  });

  // Mejoras en animaciones de dispositivos
  const devices = document.querySelectorAll('.device');
  const showcase = document.querySelector('.showcase-devices');

  function updateDeviceTransform(e) {
    const { clientX, clientY } = e;
    const { left, top, width, height } = showcase.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    devices.forEach(device => {
      const isPhone = device.classList.contains('phone');
      const maxRotate = isPhone ? 5 : 15;
      const maxTranslate = isPhone ? 10 : 20;

      device.style.transform = `
        ${isPhone ? 'translateX(-50%)' : ''}
        rotateY(${x * maxRotate}deg)
        rotateX(${-y * maxRotate}deg)
        translateZ(${Math.abs(x * y * maxTranslate)}px)
      `;
    });
  }

  showcase.addEventListener('mousemove', updateDeviceTransform);
  showcase.addEventListener('mouseleave', () => {
    devices.forEach(device => {
      device.style.transform = '';
    });
  });

  // Parallax mejorado
  const handleParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-shape, .device');
    
    parallaxElements.forEach(element => {
      const speed = element.classList.contains('shape-1') ? 0.1 :
                   element.classList.contains('shape-2') ? 0.15 :
                   element.classList.contains('shape-3') ? 0.2 :
                   element.classList.contains('phone') ? 0.05 : 0.1;
      
      element.style.transform = `
        translateY(${scrolled * speed}px)
        ${element.classList.contains('device') ? 'rotateY(0deg)' : ''}
      `;
    });
  };

  window.addEventListener('scroll', () => {
    animateOnScroll();
    handleParallax();
  });
}