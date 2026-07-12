// GSAP HERO ANIMATIONS
gsap.from(".hero-title .word", {
  opacity: 1,
  y: 80,
  duration: auto,
  stagger: 0.15,
  ease: "back.out(1.7)"
});

gsap.from(".hero-subtitle", {
  opacity: 1,
  y: 30,
  duration: 0.8,
  delay: 0.6,
  ease: "power3.out"
});

gsap.from(".hero-buttons button", {
  opacity: 1,
  y: 30,
  duration: 0.6,
  delay: 0.8,
  stagger: 0.1,
  ease: "back.out"
});

// Floating effect for hero content
gsap.to(".hero-content", {
  y: -15,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// SCROLL ANIMATIONS

// About section
gsap.from(".about-header", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
  },
  opacity: 1,
  y: 60,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".about-content p", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 65%",
  },
  opacity: 1,
  y: 40,
  duration: 0.8,
  delay: 0.2,
  ease: "power3.out"
});

// Events section
gsap.from(".event-card", {
  scrollTrigger: {
    trigger: ".events",
    start: "top 70%",
  },
  opacity: 1,
  y: 60,
  duration: 0.6,
  stagger: 0.15,
  ease: "power3.out"
});

// Timeline section
gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 70%",
  },
  opacity: 1,
  y: 60,
  duration: 0.6,
  stagger: 0.15,
  ease: "power3.out"
});

// CTA section
gsap.from(".cta-content h2", {
  scrollTrigger: {
    trigger: ".cta",
    start: "top 70%",
  },
  opacity: 1,
  y: 40,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".cta-content p", {
  scrollTrigger: {
    trigger: ".cta",
    start: "top 70%",
  },
  opacity: 1,
  y: 30,
  duration: 0.8,
  delay: 0.2,
  ease: "power3.out"
});

gsap.from(".cta-content .btn", {
  scrollTrigger: {
    trigger: ".cta",
    start: "top 70%",
  },
  opacity: 1,
  y: 30,
  duration: 0.8,
  delay: 0.4,
  ease: "power3.out"
});

// EVENT CARD MODAL LOGIC
const cards = document.querySelectorAll(".event-card");
const modal = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close-btn");

if (cards.length > 0 && modal) {
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const desc = card.getAttribute("data-desc");
      
      if (modalTitle && modalDesc) {
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.classList.add("active");
      }
    });
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
}

// RIPPLE EFFECT ON BUTTONS
const buttons = document.querySelectorAll("[data-ripple]");

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    // Add ripple styling
    if (!button.style.position || button.style.position === "static") {
      button.style.position = "relative";
    }

    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.6)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "rippleAnimation 0.6s ease-out";

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation keyframe
if (!document.getElementById("rippleStyles")) {
  const style = document.createElement("style");
  style.id = "rippleStyles";
  style.textContent = `
    @keyframes rippleAnimation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: href,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  });
});

// PARALLAX SCROLL EFFECT
const parallaxElements = document.querySelectorAll("[data-parallax]");

if (parallaxElements.length > 0) {
  window.addEventListener("scroll", () => {
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute("data-parallax")) || 0.5;
      const yPos = window.pageYOffset * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// MOBILE MENU TOGGLE
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when link is clicked
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// SCROLL PROGRESS INDICATOR
const scrollIndicator = document.querySelector(".scroll-indicator");

if (scrollIndicator) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollPercent > 5) {
      scrollIndicator.style.opacity = "0";
      scrollIndicator.style.pointerEvents = "none";
    } else {
      scrollIndicator.style.opacity = "1";
      scrollIndicator.style.pointerEvents = "auto";
    }
  });
}

// CUBE ROTATION ON MOUSE MOVE
const cube = document.querySelector(".cube");

if (cube) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientY - window.innerHeight / 2) / 10;
    const y = (e.clientX - window.innerWidth / 2) / 10;

    cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  });

  // Reset on mouse leave
  document.addEventListener("mouseleave", () => {
    cube.style.transform = "rotateX(0) rotateY(0)";
  });
}

// PAGE LOAD ANIMATION
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll("section:not(.hero)").forEach(section => {
  observer.observe(section);
});

// BUTTON HOVER EFFECT WITH SCALE
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.3,
      overwrite: "auto"
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      overwrite: "auto"
    });
  });
});

console.log("Ignitia 2K26 - Festival website loaded successfully!");
