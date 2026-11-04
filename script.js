// ========================================
// WEDDING CONFIGURATION
// Edit all wedding details here
// ========================================
const WEDDING_CONFIG = {
  couple: {
    groom: 'কিশোর সাহা',
    bride: 'ভূমিকা সাহা',
    groomFather: 'শ্রী বলাই সাহা',
    groomMother: '[পরবর্তীতে যাচাই করে যোগ করা হবে]',
    brideFather: 'শ্রী পুলক সাহা',
    brideMother: 'শ্রীমতি সরস্বতী সাহা'
  },
  events: {
    wedding: {
      title: 'শুভ বিবাহ',
      bengaliDate: '১লা অগ্রহায়ণ ১৪৩৩ বঙ্গাব্দ',
      englishDate: '১৬ নভেম্বর ২০২৬',
      day: 'সোমবার',
      barYatra: 'সন্ধ্যা ৬:০১ মিনিট',
      shubhoLagna: 'রাত ১১:২৬:৫২',
      venue: 'স্থান নির্ধারিত হবে',
      // Asia/Dhaka is UTC+6. 18:01 Dhaka = 12:01 UTC
      targetUTC: Date.UTC(2026, 10, 16, 12, 1, 0)
    },
    boubhat: {
      title: 'বউভাট (প্রীতিভোজ)',
      bengaliDate: '১২ই অগ্রহায়ণ ১৪৩৩ বঙ্গাব্দ',
      englishDate: '২৭ নভেম্বর ২০২৬',
      day: 'শুক্রবার',
      preetiBhoj: 'সন্ধ্যা ৭:০১ মিনিট',
      venue: 'স্থান নির্ধারিত হবে',
      // Asia/Dhaka is UTC+6. 19:01 Dhaka = 13:01 UTC
      targetUTC: Date.UTC(2026, 10, 27, 13, 1, 0)
    }
  }
};

// ========================================
// INVITATION CARD OPEN / CLOSE
// ========================================
const cardCover = document.getElementById('cardCover');
const openBtn = document.getElementById('openInvitation');
const closeBtn = document.getElementById('closeInvitation');

if (openBtn && cardCover) {
  openBtn.addEventListener('click', () => {
    cardCover.classList.add('opened');
  });
}

if (closeBtn && cardCover) {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cardCover.classList.remove('opened');
  });
}

// ========================================
// LIVE COUNTDOWN
// ========================================
function startCountdown(targetUTC, ids) {
  function update() {
    const now = Date.now();
    const distance = targetUTC - now;

    if (distance < 0) {
      document.getElementById(ids.days).textContent = '00';
      document.getElementById(ids.hours).textContent = '00';
      document.getElementById(ids.minutes).textContent = '00';
      document.getElementById(ids.seconds).textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(ids.days).textContent = String(days).padStart(2, '0');
    document.getElementById(ids.hours).textContent = String(hours).padStart(2, '0');
    document.getElementById(ids.minutes).textContent = String(minutes).padStart(2, '0');
    document.getElementById(ids.seconds).textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

startCountdown(WEDDING_CONFIG.events.wedding.targetUTC, {
  days: 'weddingDays',
  hours: 'weddingHours',
  minutes: 'weddingMinutes',
  seconds: 'weddingSeconds'
});

startCountdown(WEDDING_CONFIG.events.boubhat.targetUTC, {
  days: 'boubhatDays',
  hours: 'boubhatHours',
  minutes: 'boubhatMinutes',
  seconds: 'boubhatSeconds'
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// ========================================
// REVEAL ON SCROLL
// ========================================
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ========================================
// SHARE INVITATION (Web Share API + Clipboard)
// ========================================
const shareBtn = document.getElementById('shareBtn');

if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'কিশোর ও ভূমিকার বিবাহ আমন্ত্রণ',
      text: 'আমাদের বিবাহে আপনাকে সাদর আমন্ত্রণ জানাচ্ছি! ১৬ নভেম্বর ২০২৬',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('লিংক কপি করা হয়েছে!');
      }
    } catch (err) {
      console.error('Share error:', err);
      // Fallback: try clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('লিংক কপি করা হয়েছে!');
      } catch (clipErr) {
        alert('শেয়ার করতে সমস্যা হচ্ছে। দয়া করে ম্যানুয়ালি লিংক কপি করুন।');
      }
    }
  });
}