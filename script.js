document.addEventListener('DOMContentLoaded', function() {
  // ==================== Scroll do góry ====================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== Płynne przewijanie dla menu ====================
  const menu = document.querySelector('.menu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  if (menu && hamburgerBtn) {
    document.querySelectorAll('.menu li a').forEach(link => {
      link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
          event.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Zamknij menu po kliknięciu linku (na mobile)
            if (window.innerWidth <= 768) {
              menu.classList.remove('open');
              hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });
  }

  // ==================== Animacje elementów przy scrollu ====================
  const animatedElements = document.querySelectorAll('.icon-box, .animate-on-scroll');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ==================== Animacje sekcji info i about ====================
  function setupSectionAnimation(selector, xOffset) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.opacity = '0';
      element.style.transform = `translateX(${xOffset}px)`;
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(element);
    }
  }

  setupSectionAnimation('#zasady h2', -100);
  setupSectionAnimation('#zasady .info-list', 100);
  setupSectionAnimation('#about img', 100);
  setupSectionAnimation('#about div[style*="font-size"]', -100);

  // ==================== Obsługa hamburger menu ====================
  if (hamburgerBtn && menu) {
    hamburgerBtn.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Pokazuj/ukrywaj hamburgera przy scrollu (tylko na mobile)
    function checkScreenSize() {
      if (window.innerWidth <= 768) {
        window.addEventListener('scroll', function() {
          if (window.scrollY > 100) {
            hamburgerBtn.style.display = 'flex';
          } else {
            hamburgerBtn.style.display = 'none';
            menu.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
          }
        });
      } else {
        hamburgerBtn.style.display = 'none';
        menu.classList.remove('open');
      }
    }

    // Inicjalizacja i nasłuchiwanie zmiany rozmiaru okna
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Zamknij menu po kliknięciu gdzieś indziej
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !menu.contains(e.target) && 
          e.target !== hamburgerBtn) {
        menu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==================== Obsługa submenu na mobile ====================
  document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  // ==================== Tooltipy ====================
  document.querySelectorAll('.tooltip').forEach(el => {
    el.addEventListener('mouseenter', function() {
      const tooltip = this.querySelector('.tooltip-text');
      if (tooltip) tooltip.classList.add('visible');
    });
    el.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.tooltip-text');
      if (tooltip) tooltip.classList.remove('visible');
    });
  });
});

// Sprawdzanie hasła
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('passwordInput');
  const loginButton = document.getElementById('loginButton');
  const errorMessage = document.getElementById('errorMessage');
  const loginOverlay = document.getElementById('loginOverlay');
  const pageContent = document.getElementById('pageContent');
  

  
  loginButton.addEventListener('click', function() {
    if (passwordInput.value === 'matma55') {
      // Poprawne hasło
      localStorage.setItem('authenticated', 'true');
      loginOverlay.style.display = 'none';
      pageContent.style.display = 'block';
    } else {
      // Niepoprawne hasło
      errorMessage.style.display = 'block';
      passwordInput.value = '';
    }
  });
  
  // Obsługa klawisza Enter
  passwordInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      loginButton.click();
    }
  });
});

// Obserwator Intersection Observer dla animacji
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Dodatkowe opóźnienie dla elementów listy w info-box
        if (entry.target.classList.contains('info-box')) {
          const listItems = entry.target.querySelectorAll('li');
          listItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 100);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Obserwuj wszystkie elementy, które mają być animowane
  document.querySelectorAll('.info-box, .media-box, .section-title, .schedule-box').forEach(element => {
    observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Płynne przewijanie tylko dla mobile
  if (window.innerWidth <= 992) { // Ta sama wartość co w media query
    const mobileCta = document.querySelector('.mobile-only[href="#kursy"]');
    
    if (mobileCta) {
      mobileCta.addEventListener('click', function(e) {
        e.preventDefault();
        const kursySection = document.getElementById('kursy');
        
        if (kursySection) {
          kursySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
  }
});