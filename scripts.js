// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
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

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Establecer tema inicial
  if (localStorage.getItem('theme') === 'light' || 
      (!localStorage.getItem('theme') && !prefersDarkScheme.matches)) {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    // Animar icono
    icon.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
      icon.style.transform = 'rotate(0) scale(1)';
    }, 500);
    
    // Cambiar icono
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Guardar preferencia
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Actualizar colores
    updateThemeColors(isLight);
  });

  // Función para actualizar colores según el tema
  function updateThemeColors(isLight) {
    const elements = document.querySelectorAll('.feature-card, .service-card, .app-feature');
    elements.forEach(element => {
      element.style.transition = 'all 0.5s ease';
      element.style.background = isLight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';
    });
  }

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

  // Menú móvil
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  let isMenuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    
    // Animar elementos del menú
    const navItems = navLinksContainer.querySelectorAll('.nav-link');
    navItems.forEach((item, index) => {
      if (isMenuOpen) {
        item.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
      } else {
        item.style.animation = '';
      }
    });
    
    // Animar botón del menú
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (isMenuOpen) {
        span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                              index === 1 ? 'scale(0)' :
                              'rotate(-45deg) translate(5px, -5px)';
      } else {
        span.style.transform = '';
      }
    });
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
    const elements = document.querySelectorAll('.feature-card, .service-card, .app-feature, .about-stat, .stat-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('animate');
        
        // Efecto escalonado para elementos en grid
        if (element.parentElement.classList.contains('grid')) {
          const items = element.parentElement.children;
          Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
          });
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
}