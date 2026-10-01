const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('#main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  });
}

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Mở menu');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

const toTop = document.querySelector('#to-top');

window.addEventListener(
  'scroll',
  () => {
    toTop?.classList.toggle('show', window.scrollY > 500);
  },
  { passive: true }
);

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.gallery-card img').forEach((img) => {
  img.addEventListener('error', () => {
    img.hidden = true;
    img.closest('.gallery-card')?.classList.add('image-fallback');
  });
});

const quizData = [
  {
    q: 'Xã Triệu Phong chính thức đi vào hoạt động từ ngày nào?',
    options: ['01/01/2025', '01/7/2025', '16/6/2025'],
    answer: 1,
    why: 'Xã Triệu Phong đi vào hoạt động từ ngày 01/7/2025.'
  },
  {
    q: 'Xã Triệu Phong được thành lập trên cơ sở sáp nhập những đơn vị nào?',
    options: [
      'Triệu Thành, Triệu Thượng và thị trấn Ái Tử',
      'Triệu Đông, Triệu Thành và Triệu Long',
      'Triệu Thượng, Triệu Long và thị trấn Ái Tử'
    ],
    answer: 0,
    why: 'Đơn vị mới được thành lập từ xã Triệu Thành, xã Triệu Thượng và thị trấn Ái Tử.'
  },
  {
    q: 'Xã Triệu Phong có diện tích bao nhiêu?',
    options: ['68,79 km²', '80,79 km²', '90,79 km²'],
    answer: 1,
    why: 'Diện tích của xã là 80,79 km².'
  },
  {
    q: 'HĐND xã Triệu Phong có bao nhiêu đại biểu khóa I?',
    options: ['67', '77', '87'],
    answer: 1,
    why: 'HĐND xã có 77 đại biểu khóa I, nhiệm kỳ 2021–2026.'
  },
  {
    q: 'Xã Triệu Phong hiện có bao nhiêu thôn, khu phố?',
    options: ['19', '29', '92'],
    answer: 0,
    why: 'Xã được thành lập với 19 thôn, khu phố.'
  }
];

let quizIndex = 0;
let quizScore = 0;
let selected = null;
let answered = false;

const quizBox = document.querySelector('#quiz-box');
const progress = document.querySelector('#quiz-progress');
const nextBtn = document.querySelector('#quiz-next');
const restartBtn = document.querySelector('#quiz-restart');
const resultBox = document.querySelector('#quiz-result');

function renderQuestion() {
  if (!quizBox || !progress || !nextBtn) return;
  selected = null;
  answered = false;

  const item = quizData[quizIndex];

  progress.textContent = `${String(quizIndex + 1).padStart(2, '0')} / ${quizData.length}`;
  nextBtn.textContent = quizIndex === quizData.length - 1 ? 'Chấm điểm' : 'Câu tiếp theo →';
  nextBtn.disabled = false;
  nextBtn.classList.remove('hidden');
  restartBtn?.classList.add('hidden');
  resultBox?.classList.add('hidden');

  quizBox.innerHTML = `
    <div class="quiz-question">
      <h3>${item.q}</h3>
      <div class="quiz-options" role="radiogroup" aria-label="Các đáp án">
        ${item.options
          .map(
            (opt, i) => `
              <button class="quiz-option" type="button" data-index="${i}" aria-pressed="false">
                <span class="quiz-marker">${String.fromCharCode(65 + i)}</span>
                <span>${opt}</span>
              </button>`
          )
          .join('')}
      </div>
    </div>`;

  quizBox.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (answered) return;

      quizBox.querySelectorAll('.quiz-option').forEach((b) => {
        b.classList.remove('selected');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
      selected = Number(btn.dataset.index);
    });
  });
}

nextBtn?.addEventListener('click', () => {
  if (answered) {
    if (quizIndex < quizData.length - 1) {
      quizIndex += 1;
      renderQuestion();
    }
    return;
  }

  if (selected === null) {
    nextBtn.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 280 }
    );
    return;
  }

  const item = quizData[quizIndex];
  const correct = selected === item.answer;

  if (correct) quizScore++;
  answered = true;

  quizBox?.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === item.answer) btn.classList.add('correct');
    if (i === selected && !correct) btn.classList.add('wrong');
  });

  const explanation = document.createElement('div');
  explanation.className = 'quiz-explanation';
  explanation.innerHTML = `<strong>${correct ? 'Đúng.' : 'Chưa đúng.'}</strong> ${item.why}`;
  quizBox?.querySelector('.quiz-question')?.appendChild(explanation);

  if (quizIndex < quizData.length - 1) {
    nextBtn.textContent = 'Câu tiếp theo →';
    return;
  }

  const percent = Math.round((quizScore / quizData.length) * 100);
  progress.textContent = 'HOÀN TẤT';

  if (resultBox) {
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `<strong>Điểm: ${quizScore} / ${quizData.length} (${percent}%)</strong><br>${percent >= 80 ? 'Bạn đã nắm khá chắc những thông tin chính.' : 'Bạn có thể xem lại các phần tổng quan, tổ chức và phát triển để nhớ sâu hơn.'}`;
  }

  nextBtn.classList.add('hidden');
  restartBtn?.classList.remove('hidden');
});

restartBtn?.addEventListener('click', () => {
  quizIndex = 0;
  quizScore = 0;
  selected = null;
  answered = false;
  renderQuestion();
});

renderQuestion();
