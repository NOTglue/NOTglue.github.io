// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const htmlEl = document.documentElement;

themeBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', targetTheme);
  themeBtn.textContent = targetTheme === 'dark' ? '☀️' : '🌙';
});

// Mobile Navbar Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Typewriter Effect
const roles = [
  "Home Servers & Linux Distros",
  "Network Ads & DNS Sinkholing",
  "Python Scripting & Debugging",
  "Android & iOS Device Modding"
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typeSpeed = 90;
const typewriterEl = document.getElementById('typewriter');

function typeEffect() {
  const currentRole = roles[roleIdx];
  
  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
    charIdx++;
  }

  let delta = typeSpeed;
  if (isDeleting) delta /= 2;

  if (!isDeleting && charIdx === currentRole.length) {
    delta = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delta = 450;
  }

  setTimeout(typeEffect, delta);
}
typeEffect();

// Scroll Reveal Animations
const revealElements = document.querySelectorAll(
  '.about-card, .stat-box, .skill-category, .project-card, .timeline-card, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => scrollObserver.observe(el));

// Skill Bar Animation on Scroll
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-progress');
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

// 3D Tilt Effect & Dynamic Mouse Spotlight
const spotlightCards = document.querySelectorAll(
  '.project-card, .skill-category, .about-card, .stat-box, .contact-card'
);

spotlightCards.forEach(card => {
  card.classList.add('spotlight-card');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    if (card.classList.contains('project-card') && window.innerWidth > 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('project-card')) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  });
});

// Contact Form Toast Simulation
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Show loading state on button
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Prepare parameters matching your EmailJS template variables
  const templateParams = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  // Send email via EmailJS
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function () {
      // Success feedback
      toast.textContent = 'Message sent successfully!';
      toast.style.background = '#10b981';
      toast.classList.add('show');
      contactForm.reset();
    })
    .catch(function (error) {
      // Error feedback
      toast.textContent = 'Failed to send message. Please try again.';
      toast.style.background = '#ef4444';
      toast.classList.add('show');
      console.error('EmailJS Error:', error);
    })
    .finally(function () {
      // Reset button state and auto-hide toast
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    });
});
