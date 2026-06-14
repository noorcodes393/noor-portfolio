
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const backToTop   = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formNotice  = document.getElementById('formNotice');
const btnText     = document.getElementById('btnText');
const btnIcon     = document.getElementById('btnIcon');
const footerYear  = document.getElementById('footerYear');
const heroName    = document.getElementById('heroName');



footerYear.textContent = new Date().getFullYear();



const savedTheme = localStorage.getItem('nf-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nf-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
}



const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }


  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  highlightNavLink();
});


function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}


hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
 
  document.body.style.overflow = isOpen ? 'hidden' : '';
});


navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});


document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
});



const typedEl = document.getElementById('typedText');
const phrases = [
  'Web Developer Intern',
  'Frontend Enthusiast',
  'AI Explorer',
  'Problem Solver',
  'Lifelong Learner',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingPaused = false;

function typeEffect() {
  if (typingPaused) return; 

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
   
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
  
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  
  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
   
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
  
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

setTimeout(typeEffect, 900);


const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        revealObserver.unobserve(el); // animate once
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const fill  = bar.querySelector('.skill-fill');
        const width = bar.dataset.width + '%';

      
        setTimeout(() => {
          fill.style.width = width;
        }, 200);

        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach(bar => skillObserver.observe(bar));



contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('userName').value.trim();
  const email   = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('userMessage').value.trim();

  if (!name) {
    showNotice('Please enter your name.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showNotice('Please enter a valid email address.', 'error');
    return;
  }
  if (message.length < 10) {
    showNotice('Message must be at least 10 characters.', 'error');
    return;
  }

  setButtonLoading(true);

  setTimeout(() => {
    setButtonLoading(false);
    showNotice('✅ Message sent! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  }, 1800);

  /*
   * ── PHP BACKEND EXAMPLE ──
   * Uncomment the block below and comment out the setTimeout above
   * if you create a process.php file on your server.
   *
   * fetch('process.php', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ name, email, message })
   * })
   *   .then(res => res.json())
   *   .then(data => {
   *     setButtonLoading(false);
   *     if (data.success) {
   *       showNotice('✅ Message sent! I\'ll get back to you soon.', 'success');
   *       contactForm.reset();
   *     } else {
   *       showNotice('Something went wrong. Please try again.', 'error');
   *     }
   *   })
   *   .catch(() => {
   *     setButtonLoading(false);
   *     showNotice('Network error. Please try again later.', 'error');
   *   });
   */
});


function showNotice(msg, type) {
  formNotice.textContent = msg;
  formNotice.className   = 'form-notice ' + type;


  setTimeout(() => {
    formNotice.textContent = '';
    formNotice.className   = 'form-notice';
  }, 5000);
}


function setButtonLoading(loading) {
  if (loading) {
    btnText.textContent  = 'Sending...';
    btnIcon.className    = 'bx bx-loader-alt bx-spin';
    contactForm.querySelector('button').disabled = true;
  } else {
    btnText.textContent  = 'Send Message';
    btnIcon.className    = 'bx bx-send';
    contactForm.querySelector('button').disabled = false;
  }
}


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}




backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



function wrapLetters(el) {
  const text  = el.textContent;
  el.innerHTML = text
    .split('')
    .map(char =>
      char === ' '
        ? '<span class="letter">&nbsp;</span>'
        : `<span class="letter">${char}</span>`
    )
    .join('');

  el.querySelectorAll('.letter').forEach(span => {
    span.addEventListener('mouseenter', () => {
      span.style.color = `hsl(${Math.random() * 60 + 240}deg, 90%, 75%)`;
      span.style.transform = 'translateY(-4px) scale(1.15)';
      span.style.display = 'inline-block';
      span.style.transition = 'all 0.15s ease';
    });
    span.addEventListener('mouseleave', () => {
     
      setTimeout(() => {
        span.style.color     = '';
        span.style.transform = '';
      }, 300);
    });
  });
}

wrapLetters(heroName);



themeToggle.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* ─────────────────────────────────────────────────────────────
   NOTE: process.php (optional backend)
   ─────────────────────────────────────────────────────────────
   If you want to actually send emails from the contact form,
   create a file called process.php on your web server with:

   <?php
   header('Content-Type: application/json');
   $data    = json_decode(file_get_contents('php://input'), true);
   $to      = 'noor@example.com';
   $subject = 'Portfolio Contact: ' . htmlspecialchars($data['name']);
   $body    = "Name: {$data['name']}\nEmail: {$data['email']}\n\nMessage:\n{$data['message']}";
   $headers = "From: {$data['email']}";
   $sent    = mail($to, $subject, $body, $headers);
   echo json_encode(['success' => $sent]);
   ?>

   Then uncomment the fetch() block in the submit handler above
   and comment out the setTimeout block.
───────────────────────────────────────────────────────────── */
