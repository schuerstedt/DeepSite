/**
 * Interactive Features Handler for DeepSite
 * Manages tabs, accordions, modals, toggles, and progressive loading
 */
class InteractiveFeatures {
  constructor() {
    this.init();
  }

  init() {
    console.log('🎛️ Initializing Interactive Features...');
    this.initializeTabs();
    this.initializeAccordions();
    this.initializeModals();
    this.initializeToggles();
    this.initializeProgressiveLoader();
    this.initializeTooltips();
    this.initializeCardHovers();
    console.log('✅ Interactive Features initialized');
  }

  /**
   * Tab System Handler
   * Manages tabbed content with smooth transitions
   */
  initializeTabs() {
    document.querySelectorAll('[data-component="tabs"]').forEach(tabsContainer => {
      const buttons = tabsContainer.querySelectorAll('[role="tab"]');
      const contents = tabsContainer.querySelectorAll('[data-tab-content]');

      if (buttons.length === 0 || contents.length === 0) return;

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const targetTab = button.dataset.tab;
          
          // Update button states with smooth transitions
          buttons.forEach(btn => {
            btn.classList.remove('bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-slate-100');
            btn.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:text-slate-900', 'dark:hover:text-slate-100');
          });
          
          button.classList.add('bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-slate-100');
          button.classList.remove('text-slate-600', 'dark:text-slate-400');
          
          // Update content visibility with fade effect
          contents.forEach(content => {
            content.style.opacity = '0';
            setTimeout(() => {
              content.classList.add('hidden');
            }, 150);
          });
          
          const targetContent = tabsContainer.querySelector(`[data-tab-content="${targetTab}"]`);
          if (targetContent) {
            setTimeout(() => {
              targetContent.classList.remove('hidden');
              targetContent.style.opacity = '1';
            }, 150);
          }
        });
      });

      // Initialize first tab as active
      if (buttons.length > 0) {
        buttons[0].click();
      }
    });
  }

  /**
   * Accordion System Handler
   * Manages expandable content sections
   */
  initializeAccordions() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const itemId = trigger.dataset.accordionTrigger;
        const content = document.querySelector(`[data-accordion-content="${itemId}"]`);
        const icon = document.querySelector(`[data-accordion-icon="${itemId}"]`);
        
        if (!content) return;

        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
          // Expand
          content.classList.remove('hidden');
          content.style.maxHeight = '0px';
          content.style.overflow = 'hidden';
          
          // Animate expansion
          requestAnimationFrame(() => {
            content.style.transition = 'max-height 0.3s ease-out';
            content.style.maxHeight = content.scrollHeight + 'px';
          });
          
          if (icon) {
            icon.style.transform = 'rotate(180deg)';
            icon.style.transition = 'transform 0.3s ease';
          }
          
          // Remove max-height after animation
          setTimeout(() => {
            content.style.maxHeight = 'none';
            content.style.overflow = 'visible';
          }, 300);
        } else {
          // Collapse
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.overflow = 'hidden';
          
          requestAnimationFrame(() => {
            content.style.transition = 'max-height 0.3s ease-in';
            content.style.maxHeight = '0px';
          });
          
          if (icon) {
            icon.style.transform = 'rotate(0deg)';
            icon.style.transition = 'transform 0.3s ease';
          }
          
          setTimeout(() => {
            content.classList.add('hidden');
            content.style.maxHeight = '';
            content.style.overflow = '';
            content.style.transition = '';
          }, 300);
        }
      });
    });
  }

  /**
   * Modal System Handler
   * Manages popup dialogs and overlays
   */
  initializeModals() {
    // Modal triggers
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.dataset.modalTrigger;
        const overlay = document.querySelector(`[data-modal-overlay="${modalId}"]`);
        
        if (overlay) {
          overlay.classList.remove('hidden');
          overlay.style.opacity = '0';
          
          requestAnimationFrame(() => {
            overlay.style.transition = 'opacity 0.2s ease-out';
            overlay.style.opacity = '1';
          });
          
          // Prevent body scroll
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Modal close buttons
    document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modalId = closeBtn.dataset.modalClose;
        this.closeModal(modalId);
      });
    });

    // Close modal on overlay click
    document.querySelectorAll('[data-modal-overlay]').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          const modalId = overlay.dataset.modalOverlay;
          this.closeModal(modalId);
        }
      });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[data-modal-overlay]:not(.hidden)');
        if (openModal) {
          const modalId = openModal.dataset.modalOverlay;
          this.closeModal(modalId);
        }
      }
    });
  }

  closeModal(modalId) {
    const overlay = document.querySelector(`[data-modal-overlay="${modalId}"]`);
    if (overlay) {
      overlay.style.transition = 'opacity 0.2s ease-in';
      overlay.style.opacity = '0';
      
      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.style.opacity = '';
        overlay.style.transition = '';
      }, 200);
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }

  /**
   * Toggle Switch Handler
   * Manages toggle switches and preferences
   */
  initializeToggles() {
    document.querySelectorAll('[data-toggle-switch]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isPressed = toggle.getAttribute('aria-pressed') === 'true';
        const newState = !isPressed;
        
        toggle.setAttribute('aria-pressed', newState);
        const slider = toggle.querySelector('span');
        
        if (newState) {
          slider.classList.remove('translate-x-1');
          slider.classList.add('translate-x-6');
          toggle.classList.add('bg-blue-600');
          toggle.classList.remove('bg-slate-400');
        } else {
          slider.classList.remove('translate-x-6');
          slider.classList.add('translate-x-1');
          toggle.classList.remove('bg-blue-600');
          toggle.classList.add('bg-slate-400');
        }

        // Trigger custom event for other components to listen
        const toggleEvent = new CustomEvent('toggleChange', {
          detail: { 
            id: toggle.dataset.toggleSwitch, 
            value: newState 
          }
        });
        document.dispatchEvent(toggleEvent);
      });
    });
  }

  /**
   * Progressive Content Loader
   * Manages loading states and progressive content revelation
   */
  initializeProgressiveLoader() {
    const progressiveLoaders = document.querySelectorAll('[data-progressive-loader]');
    
    progressiveLoaders.forEach((loader, index) => {
      // Stagger loading for multiple loaders
      const delay = index * 500 + 1000;
      
      setTimeout(() => {
        const placeholder = loader.querySelector('[data-loading-placeholder]');
        const content = loader.querySelector('[data-progressive-content]');
        
        if (placeholder && content) {
          // Fade out placeholder
          placeholder.style.transition = 'opacity 0.3s ease-out';
          placeholder.style.opacity = '0';
          
          setTimeout(() => {
            placeholder.classList.add('hidden');
            
            // Fade in content
            content.classList.remove('hidden');
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            
            requestAnimationFrame(() => {
              content.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
              content.style.opacity = '1';
              content.style.transform = 'translateY(0)';
            });
          }, 300);
        }
      }, delay);
    });
  }

  /**
   * Tooltip Handler
   * Manages hover tooltips and help text
   */
  initializeTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      const tooltipText = element.dataset.tooltip;
      
      element.addEventListener('mouseenter', () => {
        // Create tooltip if it doesn't exist
        let tooltip = element.querySelector('.tooltip-content');
        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 'tooltip-content absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-sm rounded opacity-0 transition-opacity pointer-events-none whitespace-nowrap z-50';
          tooltip.textContent = tooltipText;
          
          // Add arrow
          const arrow = document.createElement('div');
          arrow.className = 'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900';
          tooltip.appendChild(arrow);
          
          element.appendChild(tooltip);
        }
        
        // Show tooltip
        setTimeout(() => {
          tooltip.style.opacity = '1';
        }, 100);
      });
      
      element.addEventListener('mouseleave', () => {
        const tooltip = element.querySelector('.tooltip-content');
        if (tooltip) {
          tooltip.style.opacity = '0';
        }
      });
    });
  }

  /**
   * Card Hover Effects
   * Enhanced hover interactions for card elements
   */
  initializeCardHovers() {
    document.querySelectorAll('.group[data-interactive="true"], .group.hover\\:shadow-lg').forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add subtle scale and glow effect
        card.style.transform = 'translateY(-4px) scale(1.02)';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        // Trigger group hover animations for child elements
        const icon = card.querySelector('.group-hover\\:bg-blue-200, .group-hover\\:bg-blue-900\\/50');
        const title = card.querySelector('.group-hover\\:text-blue-600, .group-hover\\:text-blue-400');
        
        if (icon) {
          icon.style.transition = 'background-color 0.3s ease';
        }
        if (title) {
          title.style.transition = 'color 0.3s ease';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  /**
   * Smooth Scroll Navigation
   * Enhanced scroll behavior for internal links
   */
  initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Form Enhancement
   * Add interactive validation and feedback
   */
  initializeFormEnhancements() {
    document.querySelectorAll('form[data-enhanced]').forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Real-time validation feedback
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
        
        // Clear validation on input
        input.addEventListener('input', () => {
          this.clearValidation(input);
        });
      });
      
      // Enhanced form submission
      form.addEventListener('submit', (e) => {
        let isValid = true;
        
        inputs.forEach(input => {
          if (!this.validateField(input)) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          e.preventDefault();
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';
    
    // Basic validation rules
    if (field.required && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }
    
    // Display validation feedback
    this.showValidationFeedback(field, isValid, message);
    
    return isValid;
  }

  clearValidation(field) {
    const feedback = field.parentElement.querySelector('.validation-feedback');
    if (feedback) {
      feedback.remove();
    }
    field.classList.remove('border-red-500', 'border-green-500');
  }

  showValidationFeedback(field, isValid, message) {
    this.clearValidation(field);
    
    if (!isValid) {
      field.classList.add('border-red-500');
      
      const feedback = document.createElement('p');
      feedback.className = 'validation-feedback text-sm text-red-600 mt-1';
      feedback.textContent = message;
      field.parentElement.appendChild(feedback);
    } else if (field.value.trim()) {
      field.classList.add('border-green-500');
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

/**
 * Lazy Loading for Images
 * Optimize image loading with intersection observer
 */
class LazyImageLoader {
  constructor() {
    this.imageObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.imageObserver.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('img[data-lazy]').forEach(img => {
        this.imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll('img[data-lazy]').forEach(img => {
        this.loadImage(img);
      });
    }
  }

  loadImage(img) {
    const src = img.dataset.lazy;
    if (src) {
      img.src = src;
      img.classList.add('fade-in');
      img.removeAttribute('data-lazy');
    }
  }
}

/**
 * Performance Monitor
 * Track and optimize page performance
 */
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.measurePerformance();
        }, 0);
      });
    }
  }

  measurePerformance() {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    console.log('📊 Performance Metrics:');
    console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
    console.log(`Page Load: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
    
    paint.forEach(entry => {
      console.log(`${entry.name}: ${entry.startTime}ms`);
    });
  }
}

// Initialize everything when DOM is ready
function initializeInteractiveFeatures() {
  // Core interactive features
  new InteractiveFeatures();
  
  // Image optimization
  new LazyImageLoader();
  
  // Performance monitoring (development only)
  if (window.location.hostname === 'localhost') {
    new PerformanceMonitor();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInteractiveFeatures);
} else {
  initializeInteractiveFeatures();
}

// Export for manual initialization if needed
window.DeepSiteInteractive = {
  InteractiveFeatures,
  LazyImageLoader,
  PerformanceMonitor,
  init: initializeInteractiveFeatures
};
