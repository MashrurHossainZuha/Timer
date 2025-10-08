const events = [
  {
    title: 'Chaitra Navaratri Maha Yajna',
    description: 'Nine days of Devi puja, evening cultural programs, and community garba.',
    date: '2024-04-09',
    time: '6:00 PM',
    location: 'Main Temple Hall',
    link: '#'
  },
  {
    title: 'Hanuman Jayanti Akhand Path',
    description: '24-hour Hanuman Chalisa chanting with prasad seva for all attendees.',
    date: '2024-04-22',
    time: '7:30 AM',
    location: 'Sanctum &amp; Courtyard',
    link: '#'
  },
  {
    title: 'Community Annadanam',
    description: 'Volunteer-led meal service supporting families and elders in need.',
    date: '2024-05-05',
    time: '11:30 AM',
    location: 'Community Kitchen',
    link: '#'
  },
  {
    title: 'Bhagavad Gita Retreat Weekend',
    description: 'Guided study sessions with Acharya Rahul Desai and contemplative meditation.',
    date: '2024-05-18',
    time: '9:00 AM',
    location: 'Meditation Pavilion',
    link: '#'
  }
];

function formatEventDate(isoDate) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }).format(date);
}

function renderEvents() {
  const eventContainer = document.getElementById('event-list');
  if (!eventContainer) return;

  const fragment = document.createDocumentFragment();

  events
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((event) => {
      const card = document.createElement('article');
      card.className = 'flex flex-col justify-between gap-4 rounded-3xl border border-amber-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl';

      card.innerHTML = `
        <div>
          <div class="flex items-center gap-3 text-sm font-semibold text-rose-600" aria-label="Event date">
            <span class="inline-flex min-w-[3.5rem] justify-center rounded-full bg-rose-100 px-3 py-1 text-rose-700">${formatEventDate(event.date)}</span>
            <span class="text-slate-500">${event.time}</span>
          </div>
          <h3 class="mt-4 text-xl font-semibold text-slate-900">${event.title}</h3>
          <p class="mt-2 text-sm text-slate-700">${event.description}</p>
        </div>
        <div class="flex items-center justify-between text-sm text-slate-600">
          <div class="flex items-center gap-2">
            <svg class="h-4 w-4 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.832 0 8.75-3.918 8.75-8.75S16.832 2.75 12 2.75 3.25 6.668 3.25 11.5c0 2.19.805 4.193 2.136 5.732.338.382.564.858.603 1.364l.078 1.04c.07.94.826 1.664 1.768 1.664H12z" />
            </svg>
            <span>${event.location}</span>
          </div>
          <a class="inline-flex items-center gap-2 font-semibold text-rose-600 hover:text-rose-700 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-offset-2" href="${event.link}" aria-label="View details for ${event.title}">
            View Details
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      `;

      fragment.appendChild(card);
    });

  eventContainer.textContent = '';
  eventContainer.appendChild(fragment);
}

function toggleMenuVisibility(menu, button) {
  if (!menu || !button) return;
  const isOpen = menu.classList.toggle('show');
  if (isOpen) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
  button.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    menu.setAttribute('aria-hidden', 'false');
  } else {
    menu.setAttribute('aria-hidden', 'true');
  }
}

function setupMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.getElementById('mobile-menu-button');
  if (!menu || !button) return;

  menu.setAttribute('aria-hidden', 'true');
  button.addEventListener('click', () => toggleMenuVisibility(menu, button));

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('show')) {
        toggleMenuVisibility(menu, button);
      }
    });
  });
}

function setupDonationModal() {
  const modal = document.getElementById('donation-modal');
  const closeButton = document.getElementById('donation-modal-close');
  const donationTriggers = document.querySelectorAll('[data-donate-trigger], #donate-button');
  if (!modal || !closeButton || donationTriggers.length === 0) return;

  const focusableSelectors = [
    'button',
    'a[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])'
  ];
  let lastFocusedElement = null;
  let previousOverflow = '';

  function getFocusableElements() {
    return Array.from(modal.querySelectorAll(focusableSelectors.join(',')))
      .filter((el) => !el.hasAttribute('disabled'));
  }

  function trapFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('show');
    modal.classList.remove('invisible');
    modal.setAttribute('aria-hidden', 'false');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = getFocusableElements();
    if (focusable.length) {
      focusable[0].focus();
    }
    document.addEventListener('keydown', handleKeydown);
    modal.addEventListener('keydown', trapFocus);
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('invisible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
    document.removeEventListener('keydown', handleKeydown);
    modal.removeEventListener('keydown', trapFocus);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  donationTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal());
    trigger.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !event.defaultPrevented) {
        event.preventDefault();
        openModal();
      }
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function setupDonationOptions() {
  const donationOptions = document.querySelectorAll('.donation-option');
  if (!donationOptions.length) return;

  function updateActiveOption(selectedLabel) {
    donationOptions.forEach((label) => {
      label.classList.toggle('is-active', label === selectedLabel);
    });
  }

  donationOptions.forEach((label) => {
    const input = label.querySelector('input');
    if (!input) return;

    input.addEventListener('change', () => updateActiveOption(label));

    label.addEventListener('click', () => {
      input.checked = true;
      updateActiveOption(label);
    });

    if (input.checked) {
      updateActiveOption(label);
    }
  });

  const customAmountInput = document.getElementById('custom-amount');
  if (customAmountInput) {
    customAmountInput.addEventListener('focus', () => {
      const customOption = Array.from(donationOptions).find((label) => {
        const input = label.querySelector('input');
        return input && input.value === 'custom';
      });
      if (customOption) {
        const radio = customOption.querySelector('input');
        if (radio) {
          radio.checked = true;
          updateActiveOption(customOption);
        }
      }
    });
  }
}

function setupDonationFormRedirect() {
  const donationForm = document.querySelector('#donation-modal form');
  if (!donationForm) return;

  donationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newWindow = window.open('https://example.com/donate', '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  });
}

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeButton = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!lightbox || !lightboxImage || !lightboxCaption || !closeButton) return;

  let lastFocusedElement = null;

  function openLightbox(imageSrc, altText, caption) {
    lastFocusedElement = document.activeElement;
    lightboxImage.src = imageSrc;
    lightboxImage.alt = altText;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    closeButton.focus();
    document.addEventListener('keydown', handleKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  }

  galleryItems.forEach((item) => {
    const image = item.querySelector('img');
    const caption = item.querySelector('figcaption');
    if (!image || !caption) return;

    function activateLightbox(event) {
      if (event) {
        event.preventDefault();
      }
      openLightbox(image.src, image.alt, caption.textContent);
    }

    item.addEventListener('click', activateLightbox);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        activateLightbox(event);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

function updateCopyrightYear() {
  const yearSpan = document.getElementById('copyright-year');
  if (!yearSpan) return;
  yearSpan.textContent = new Date().getFullYear();
}

function init() {
  renderEvents();
  setupMobileMenu();
  setupDonationModal();
  setupDonationOptions();
  setupDonationFormRedirect();
  setupLightbox();
  updateCopyrightYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
