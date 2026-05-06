/**
 * @file main.js
 * @description Core functionality for Mani Sports Academy UI interactions and animations.
 */

// Disable browser's automatic scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Spy for Navigation Links
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-text, .animate-in');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Initial trigger for elements already in view (like Hero section text)
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text-container');
        if (heroText) heroText.classList.add('active');
    }, 100);

    // 6. Cinematic Promo Popup Logic
    const promoPopup = document.getElementById('promo-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const popupCta = document.getElementById('popup-cta');

    if (promoPopup && closePopupBtn) {
        // Show popup with a slight delay for cinematic effect
        setTimeout(() => {
            promoPopup.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
        }, 1200);

        // Close function
        const closePopup = () => {
            promoPopup.classList.remove('show');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };

        closePopupBtn.addEventListener('click', closePopup);

        // Close on CTA click (links to section)
        if (popupCta) {
            popupCta.addEventListener('click', closePopup);
        }

        // Close on overlay click (if clicking exactly on the overlay)
        promoPopup.addEventListener('click', (e) => {
            if (e.target === promoPopup) {
                closePopup();
            }
        });
    }
});
