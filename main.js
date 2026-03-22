/* ---- D-Day 카운터 ---- */
function updateCountdown() {
  const target = new Date('2026-03-27T10:30:00+09:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    const timerEl = document.getElementById('dday-timer');
    const openEl = document.getElementById('dday-open');
    if (timerEl) timerEl.style.display = 'none';
    if (openEl) openEl.style.display = 'flex';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('dd').textContent = String(days).padStart(2, '0');
  document.getElementById('dh').textContent = String(hours).padStart(2, '0');
  document.getElementById('dm').textContent = String(mins).padStart(2, '0');
  document.getElementById('ds').textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---- 히어로 패럴랙스 ---- */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
}, { passive: true });

/* ---- FAQ 아코디언 ---- */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // 모두 닫기
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  // 클릭한 것이 닫혀있었으면 열기
  if (!isOpen) item.classList.add('open');
}

/* ---- 해시태그 복사 ---- */
function copyTag(el) {
  navigator.clipboard.writeText(el.textContent).then(() => {
    const sb = document.getElementById('snackbar');
    sb.classList.add('show');
    setTimeout(() => sb.classList.remove('show'), 2000);
  });
}

/* ---- 스크롤 애니메이션 ---- */
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .overview-item, .max-feature-item, .faq-item, .gift-image-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.32s cubic-bezier(.4,0,.2,1), border-color 0.32s ease';
  observer.observe(el);
});

/* ---- 자전거 이미지 뷰어 ---- */
const bikeData = {
  'pro': {
    name: '프로맥스',
    price: '1,790,000원',
    prices: [
      { opt: '19.6Ah', val: '1,790,000원' }
    ],
    link: '#', // 실제 상세페이지 링크로 수정
    images: ['images/1-1_xtron_pro_max_b.png', 'images/1-2_xtron_pro_max_g.png', 'images/1-3_xtron_pro_max_w.png'],
    benefit: '',
    detailImages: [
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_01_메인.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_02_불편사항.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_03_매직카펫라이드.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_04_서스펜션(1)_01.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_04_서스펜션(1)_02.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_04_서스펜션(1)_05.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_05_타이어(2).jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_06_브레이크(3)_01.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_07_변속기(4)_01.jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_08_모터,등판각도(5).jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_09_배터리(6).jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_10_계기판&기능(7).jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_11_폴딩시스템(8).jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_12_라이트(9).jpg',
      'images/detail/promax/엑스트론_프로_맥스_상세페이지_13_사이즈,구성품,제품정보.jpg'
    ]
  },
  'city': {
    name: '시티맥스',
    price: '1,790,000원',
    prices: [
      { opt: '19.6Ah', val: '1,790,000원' }
    ],
    link: '#',
    images: ['images/2-1_xtron_city_max_b.png', 'images/2-2_xtron_city_max_g.png'],
    benefit: ''
  },
  'tour': {
    name: '투어맥스',
    price: '1,790,000원',
    prices: [
      { opt: '19.6Ah', val: '1,790,000원' }
    ],
    link: '#',
    images: ['images/3-1_xtron_tour_max_b.png', 'images/3-2_xtron_tour_max_g.png'],
    benefit: ''
  },
  'promini': {
    name: '프로미니맥스',
    price: '1,490,000원 ~',
    prices: [
      { opt: '19.6Ah', val: '1,490,000원' },
      { opt: '28.5Ah', val: '1,590,000원' }
    ],
    link: '#',
    images: ['images/4-1_xtron_pro_mini_max_b.png', 'images/4-2_xtron_pro_mini_max_g.png', 'images/4-3_xtron_pro_mini_max_w.png'],
    benefit: ''
  }
};

const xtronData = {
  'slim': {
    name: '슬림',
    price: '1,590,000원 ~',
    prices: [
      { opt: '15Ah', val: '1,590,000원', highlightOpt: true, tag: 'BEST' },
      { opt: '20Ah', val: '1,630,000원' }
    ],
    link: '#',
    images: ['images/5-2_xtron_slim_b.png', 'images/5-2_xtron_slim_G.png'],
    benefit: '슬림 컴팩트 전용 리어랙'
  },
  'mini': {
    name: '미니',
    price: '1,730,000원 ~',
    prices: [
      { opt: '15Ah', val: '1,730,000원', highlightOpt: true, tag: 'BEST' },
      { opt: '20Ah', val: '1,830,000원' }
    ],
    link: '#',
    images: ['images/5-1_xtron_mini_b.png', 'images/5-1_xtron_mini_G.png'],
    benefit: '미니/슬림 모델 리어랙 무상 장착'
  },
  'eqneo': {
    name: 'EQ NEO',
    price: '1,730,000원',
    prices: [
      { opt: '20Ah', val: '1,730,000원' }
    ],
    link: '#',
    images: ['images/6_xtron_neo_be.png'],
    benefit: '자전거 바구니 무상 장착'
  },
  'gt': {
    name: 'GT',
    price: '1,690,000원 ~',
    prices: [
      { opt: '19.6Ah', val: '1,690,000원' },
      { opt: '28.5Ah', val: '1,790,000원' }
    ],
    link: '#',
    images: ['images/7-2_xtron_gt_g.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'gtmini': {
    name: 'GT 미니',
    price: '1,390,000원 ~',
    prices: [
      { opt: '19.6Ah', val: '1,390,000원' },
      { opt: '28.5Ah', val: '1,490,000원' }
    ],
    link: '#',
    images: ['images/7-3_xtron_gt_mini_w.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'gts': {
    name: 'GT S',
    price: '2,130,000원 ~',
    prices: [
      { opt: '19.6Ah', val: '2,130,000원' },
      { opt: '28.5Ah', val: '2,230,000원' }
    ],
    link: '#',
    images: ['images/7-1_xtron_gt_s_b.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xpro': {
    name: '프로',
    price: '1,690,000원 ~',
    prices: [
      { opt: '19.6Ah', val: '1,690,000원' },
      { opt: '28.5Ah', val: '1,790,000원' }
    ],
    link: '#',
    images: ['images/8-2_xtron_pro_g.png', 'images/8-2_xtron_pro_B.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xpros': {
    name: '프로 S',
    price: '1,690,000원 ~',
    link: '#',
    images: ['images/8-1_xtron_pro_s_w.png', 'images/9-1_xtron_proS_b.png', 'images/9-1_xtron_proS_g.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xcity': {
    name: '시티',
    price: '추후공개',
    link: '#',
    images: ['images/8-3_xtron_city_g.png', 'images/8-3_xtron_city_B.png'],
    benefit: ''
  },
  'xtour': {
    name: '투어',
    price: '1,690,000원 ~',
    prices: [
      { opt: '19.6Ah', val: '1,690,000원' },
      { opt: '28.5Ah', val: '1,790,000원' }
    ],
    link: '#',
    images: ['images/8-4_xtron_tour_g.png', 'images/8-4_xtron_tour_b.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xpromini': {
    name: '프로미니',
    price: '1,390,000원 ~',
    prices: [
      { opt: '20Ah', val: '1,390,000원' },
      { opt: '28.5Ah', val: '1,490,000원' }
    ],
    link: '#',
    images: ['images/8-5_xtron_pro_mini_w.png', 'images/8-5_xtron_pro_mini_b.png', 'images/8-5_xtron_pro_mini_g.png'],
    benefit: ''
  },
  'eq': {
    name: 'EQ',
    price: '1,330,000원 ~',
    prices: [
      { opt: '19.6Ah (기본 포폴라)', val: '1,330,000원', tag: '기본형' },
      { opt: '포폴라 모어 업그레이드', val: '+ 30,000원', highlightOpt: true, highlightVal: true }
    ],
    link: '#',
    images: ['images/8-6_xtron_eq_w.png', 'images/8-6_xtron_eq_B.png', 'images/8-6_xtron_eq_G.png'],
    benefit: '프론트 바구니 및 포폴라 제공'
  }
};

const galleryState = {
  bike: {
    type: 'pro',
    imgIdx: 0,
    dataMap: bikeData,
    viewerId: 'bike-viewer',
    tabSelector: '#max-series .lineup-pill'
  },
  xtron: {
    type: 'slim',
    imgIdx: 0,
    dataMap: xtronData,
    viewerId: 'xtron-viewer',
    tabSelector: '#xtron-series .lineup-pill'
  }
};

window.showBikeImage = (type) => showGalleryImage('bike', type);
window.showXtronImage = (type) => showGalleryImage('xtron', type);

function showGalleryImage(category, type) {
  galleryState[category].type = type;
  galleryState[category].imgIdx = 0;
  updateGalleryView(category);
}

function updateGalleryView(category) {
  const state = galleryState[category];
  const viewer = document.getElementById(state.viewerId);
  if (!viewer) return;

  const data = state.dataMap[state.type];
  const imageSrc = data.images[state.imgIdx];

  let benefitHtml = '';
  if (data.benefit) {
    benefitHtml = `
      <!-- 프리미엄 혜택 알림 영역 (베네핏 연계) -->
      <div class="benefit-alert-box">
        <span class="benefit-alert-icon">🎁</span>
        <span>${data.benefit}</span>
      </div>
    `;
  }

  // 라인업 버튼 활성화 상태 업데이트
  document.querySelectorAll(state.tabSelector).forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('btn-' + state.type);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  let dotsHtml = '';
  let swipeHintHtml = '';
  if (data.images.length > 1) {
    swipeHintHtml = `
      <div class="swipe-hint">좌우로 슬라이드</div>`;
    dotsHtml = '<div class="viewer-dots">';
    data.images.forEach((imgUrl, idx) => {
      dotsHtml += `<div class="viewer-dot ${idx === state.imgIdx ? 'active' : ''}"></div>`;
    });
    dotsHtml += '</div>';
  }

  const stage = viewer.querySelector('.viewer-stage');
  if (!stage) {
    viewer.innerHTML = `
      <div class="viewer-stage">
        <!-- 이미지 영역 -->
        <div class="viewer-img-container swipe-container" data-type="${category}">
          ${swipeHintHtml}
          <img src="${imageSrc}" alt="${data.name} 이미지 ${state.imgIdx + 1}" class="viewer-bike-img">
          ${dotsHtml}
        </div>
        
        <!-- 가격 & 상세 배지 및 네비게이션 버튼 그룹 -->
        <div class="viewer-nav-group">
          <!-- 가격 배지 -->
          <a href="#" onclick="openDetailModal(event, '${category}', '${state.type}')" class="viewer-price-badge ${data.prices && data.prices.length > 1 ? 'multi-price' : ''}">
            ${data.prices && data.prices.length > 1 ? 
              data.prices.map(p => `
                <div class="price-row">
                  <span class="viewer-price-name">${data.name} <small class="${p.highlightOpt ? 'highlight-opt' : ''}">${p.opt}</small>${p.tag ? `<span class="opt-tag">${p.tag}</span>` : ''}</span>
                  <span class="viewer-price-sep" style="display:none;"></span>
                  <span class="viewer-price-val ${p.highlightVal ? 'highlight-val' : ''}">${p.val}</span>
                </div>
              `).join('')
            : `
              <span class="viewer-price-name">${data.name} ${data.prices && data.prices[0] ? `<small class="${data.prices[0].highlightOpt ? 'highlight-opt' : ''}">${data.prices[0].opt}</small>` : ''}</span>
              <span class="viewer-price-sep"></span>
              <span class="viewer-price-val">${data.price}</span>
            `}
          </a>
          
          <!-- 상세 보기 버튼 -->
          <a href="#" onclick="openDetailModal(event, '${category}', '${state.type}')" class="viewer-detail-btn-wide">
            <span>제품 상세 보기</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        
        ${benefitHtml}
        
      </div>
    `;
    setupSwipeListener(viewer.querySelector('.swipe-container'), () => prevGalleryImage(category), () => nextGalleryImage(category));
  } else {
    // 기존 DOM 업데이트 (깜빡임 최소화)
    const img = stage.querySelector('.viewer-bike-img');
    if (img) {
      img.style.animation = 'none';
      img.getBoundingClientRect(); // 플로우 트리거
      img.src = imageSrc;
      img.alt = `${data.name} 이미지 ${state.imgIdx + 1}`;
      img.style.transform = ''; // 인라인 트랜스폼 초기화
      img.style.animation = 'fadeIn 0.4s ease both';
    }
    
    // 스와이프 힌트 업데이트
    let hintEl = stage.querySelector('.swipe-hint');
    if (data.images.length > 1) {
      if (!hintEl) {
        hintEl = document.createElement('div');
        hintEl.className = 'swipe-hint';
        hintEl.innerHTML = '좌우로 슬라이드';
        stage.querySelector('.viewer-img-container').prepend(hintEl);
      }
    } else if (hintEl) {
      hintEl.remove();
    }
    
    // 도트 업데이트
    let dotsContainer = stage.querySelector('.viewer-dots');
    if (data.images.length > 1) {
      if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'viewer-dots';
        stage.querySelector('.viewer-img-container').appendChild(dotsContainer);
      }
      dotsContainer.innerHTML = '';
      data.images.forEach((imgUrl, idx) => {
        dotsContainer.innerHTML += `<div class="viewer-dot ${idx === state.imgIdx ? 'active' : ''}"></div>`;
      });
    } else if (dotsContainer) {
      dotsContainer.remove();
    }
    
    const priceBadge = stage.querySelector('.viewer-price-badge');
    if (priceBadge) {
      priceBadge.href = '#';
      priceBadge.onclick = (e) => openDetailModal(e, category, state.type);
      
      if (data.prices && data.prices.length > 1) {
        priceBadge.classList.add('multi-price');
        priceBadge.innerHTML = data.prices.map(p => `
          <div class="price-row">
            <span class="viewer-price-name">${data.name} <small class="${p.highlightOpt ? 'highlight-opt' : ''}">${p.opt}</small>${p.tag ? `<span class="opt-tag">${p.tag}</span>` : ''}</span>
            <span class="viewer-price-sep" style="display:none;"></span>
            <span class="viewer-price-val ${p.highlightVal ? 'highlight-val' : ''}">${p.val}</span>
          </div>
        `).join('');
      } else {
        priceBadge.classList.remove('multi-price');
        const p = data.prices ? data.prices[0] : null;
        priceBadge.innerHTML = `
          <span class="viewer-price-name">${data.name} ${p ? `<small class="${p.highlightOpt ? 'highlight-opt' : ''}">${p.opt}</small>` : ''}</span>
          <span class="viewer-price-sep"></span>
          <span class="viewer-price-val">${data.price}</span>
        `;
      }
    }
    
    const detailBtn = stage.querySelector('.viewer-detail-btn-wide');
    if (detailBtn) {
      detailBtn.href = '#';
      detailBtn.onclick = (e) => openDetailModal(e, category, state.type);
    }

    const oldBenefit = stage.querySelector('.benefit-alert-box');
    if (oldBenefit) oldBenefit.remove();

    if (data.benefit) {
      stage.insertAdjacentHTML('beforeend', benefitHtml);
    }
  }
}

function prevGalleryImage(category) {
  const state = galleryState[category];
  const keys = Object.keys(state.dataMap);
  state.imgIdx--;

  if (state.imgIdx < 0) {
    const currentModelIdx = keys.indexOf(state.type);
    const prevModelIdx = (currentModelIdx - 1 + keys.length) % keys.length;
    state.type = keys[prevModelIdx];
    state.imgIdx = state.dataMap[state.type].images.length - 1;
  }
  updateGalleryView(category);
}

function nextGalleryImage(category) {
  const state = galleryState[category];
  const keys = Object.keys(state.dataMap);
  state.imgIdx++;

  if (state.imgIdx >= state.dataMap[state.type].images.length) {
    const currentModelIdx = keys.indexOf(state.type);
    const nextModelIdx = (currentModelIdx + 1) % keys.length;
    state.type = keys[nextModelIdx];
    state.imgIdx = 0;
  }
  updateGalleryView(category);
}

// 화면이 불렸을 때 기본적으로 프로 맥스 및 슬림 렌더링
window.addEventListener('DOMContentLoaded', () => {
  showGalleryImage('bike', 'pro');
  showGalleryImage('xtron', 'slim');
});

function setupSwipeListener(container, prevFunc, nextFunc) {
  if (!container || container.dataset.swipeBound === "true") return;
  container.dataset.swipeBound = "true";
  
  let startX = 0;
  let isDragging = false;
  let currentX = 0;

  const onStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    currentX = startX;
    container.style.cursor = 'grabbing';
  };

  const onMove = (e) => {
    if (!isDragging) return;
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    
    const diffX = currentX - startX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) prevFunc();
      else nextFunc();
    }
    startX = 0; currentX = 0;
  };

  container.addEventListener('mousedown', onStart);
  container.addEventListener('touchstart', onStart, {passive: true});
  
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive: true});
  
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
  
  container.style.cursor = 'grab';
}

/* ============================================
   라인업 버튼 스크롤 이동 (모바일)
============================================ */
function scrollPills(direction, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const scrollAmount = Math.max(container.clientWidth * 0.6, 180); // 가시 영역의 60% 또는 최소 180px
  
  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

/* ============================================
   벚꽃 흩날리는 효과 (Cherry Blossom Effect)
============================================ */
// 벚꽃잎 생성 개수 세팅
const BLOSSOM_COUNT = 35;

function createCherryBlossom() {
  const container = document.getElementById('cherry-blossom-container');
  if (!container) return;

  for (let i = 0; i < BLOSSOM_COUNT; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // 다양한 랜덤 속성 부여
    const size = Math.random() * 8 + 6; // 6px ~ 14px
    const startPosX = Math.random() * 100; // 가로 시작 위치 (0~100%)
    
    // 떨어지는 속도 및 흔들림 속도, 딜레이
    const fallDuration = Math.random() * 8 + 8; // 8s ~ 16s
    const swayDuration = Math.random() * 4 + 3; // 3s ~ 7s
    const animationDelay = Math.random() * 10;  // 0s ~ 10s (시작 오프셋)
    
    // 약간의 투명도 차이로 원근감
    const opacity = Math.random() * 0.5 + 0.3; // 0.3 ~ 0.8

    // 스타일 적용
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.2}px`;
    petal.style.left = `${startPosX}vw`;
    petal.style.opacity = opacity;
    
    // 낙하 애니메이션 + 흔들림 애니메이션 다중 적용
    petal.style.animation = `
      fall ${fallDuration}s linear ${animationDelay}s infinite,
      sway ${swayDuration}s ease-in-out ${animationDelay}s infinite alternate
    `;

    container.appendChild(petal);
  }
}

// 스크립트 로드 시 벚꽃 생성
window.addEventListener('DOMContentLoaded', () => {
  createCherryBlossom();
});

/* ============================================
   최상단 이동 버튼 로직
============================================ */
window.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* ============================================
   럭키 드로우 미니게임
============================================ */
const luckyItems = [
  { name: '신세계 상품권', chance: 5, icon: '🎫', color: 'var(--c-gold)' },
  { name: '퀄리스포츠 백', chance: 15, icon: '🎒', color: 'var(--c-blue)' },
  { name: '퀄리 티셔츠', chance: 20, icon: '👕', color: '#ff66a3' },
  { name: '브레이크 패드', chance: 25, icon: '🛑', color: 'var(--c-cyan)' },
  { name: '퀄리 키링', chance: 35, icon: '🔑', color: '#ffb347' }
];

function playLuckyDraw() {
  const modal = document.getElementById('luckyModal');
  const resultBox = document.getElementById('luckyResultBox');
  
  modal.classList.add('show');
  resultBox.innerHTML = '<div class="lucky-loading">🎁 두근두근... 캡슐 뽑는 중!</div>';
  
  setTimeout(() => {
    const random = Math.random() * 100;
    let sum = 0;
    let wonItem = luckyItems[2];
    
    for (let item of luckyItems) {
      sum += item.chance;
      if (random <= sum) {
        wonItem = item;
        break;
      }
    }
    
    resultBox.innerHTML = `
      <div class="lucky-won-icon" style="color: ${wonItem.color};">${wonItem.icon}</div>
      <h3 class="lucky-won-title">축하합니다!</h3>
      <div class="lucky-won-name" style="color: ${wonItem.color};">${wonItem.name}</div>
      <p class="lucky-won-desc">당첨되셨습니다 🎉<br>현장에서 진짜 캡슐을 뽑아보세요!</p>
      <button class="lucky-retry-btn" onclick="retryLuckyDraw()">다시 뽑아보기</button>
    `;
  }, 1200);
}

function closeLuckyModal() {
  document.getElementById('luckyModal').classList.remove('show');
}

function retryLuckyDraw() {
  playLuckyDraw();
}

/* ============================================
   상세페이지 모달
============================================ */
const modelDetailImages = {
  // 맥스 시리즈 (bikeData)
  'pro': [
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_01_메인.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_02_불편사항.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_03_매직카펫라이드.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_04_서스펜션(1)_01.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_04_서스펜션(1)_02.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_04_서스펜션(1)_05.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_05_타이어(2).jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_06_브레이크(3)_01.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_07_변속기(4)_01.jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_08_모터,등판각도(5).jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_09_배터리(6).jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_10_계기판&기능(7).jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_11_폴딩시스템(8).jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_12_라이트(9).jpg',
    'images/detail/promax/엑스트론_프로_맥스_상세페이지_13_사이즈,구성품,제품정보.jpg'
  ],
  'city': [
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_01_메인.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_02_불편사항.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_03_매직카펫라이드.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_04_서스펜션(1)_01.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_04_서스펜션(1)_02.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_04_서스펜션(1)_05.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_05_타이어(2).jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_06_브레이크(3)_01.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_07_변속기(4)_01.jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_08_모터,등판각도(5).jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_09_배터리(6).jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_10_계기판&기능(7).jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_11_라이트(8).jpg',
    'images/detail/citymax/엑스트론_시티_맥스_상세페이지_12_사이즈,구성품,제품정보.jpg'
  ],
  'tour': [
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_01_메인.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_02_불편사항.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_03_매직카펫라이드.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_04_서스펜션(1)_01.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_04_서스펜션(1)_02.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_04_서스펜션(1)_05.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_05_타이어(2).jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_06_브레이크(3)_01.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_07_변속기(4)_01.jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_08_모터,등판각도(5).jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_09_배터리(6).jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_10_계기판&기능(7).jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_11_라이트(8).jpg',
    'images/detail/tourmax/엑스트론_투어_맥스_상세페이지_12_사이즈,구성품,제품정보.jpg'
  ],
  'promini': [
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_01_메인.jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_02_불편사항.jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_03_매직카펫라이드.jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_04_서스펜션(1)_01.jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_04_서스펜션(1)_02.jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_04_서스펜션(1)_05.jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_05_타이어(2).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_06_브레이크(3).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_07_모터,등판각도(4).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_08_배터리(5).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_09_계기판&기능(6).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_10_폴딩(7).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_11_라이트(8).jpg',
    'images/detail/prominimax/엑스트론_프로미니_맥스_상세페이지_13_사이즈,구성품,제품정보.jpg'
  ],
  
  // 엑스트론 시리즈(xtronData)
  'slim': ['images/detail/slim/2025_엑스트론_슬림_상세페이지_02.jpg'],
  'mini': ['images/detail/mini/2026_엑스트론_미니_상세페이지.jpg'],
  'gt': [
    'images/detail/GT/2025_엑스트론_GT_상세페이지_01.jpg',
    'images/detail/GT/2025_엑스트론_GT_상세페이지_02.jpg'
  ],
  'gtmini': ['images/detail/GTmini/2025_엑스트론_GT미니_상세페이지.jpg'],
  'xpro': [
    'images/detail/pro/2025_엑스트론_프로_상세페이지_01.jpg',
    'images/detail/pro/2025_엑스트론_프로_상세페이지_02.jpg'
  ],
  'xpros': ['images/detail/proS/2025_엑스트론_프로S_상세페이지.jpg'],
  'xcity': [
    'images/detail/city/2025_엑스트론_시티_상세페이지_01.jpg',
    'images/detail/city/2025_엑스트론_시티_상세페이지_02.jpg'
  ],
  'xtour': [
    'images/detail/tour/2025_엑스트론_투어_상세페이지_01.jpg',
    'images/detail/tour/2025_엑스트론_투어_상세페이지_02.jpg'
  ],
  'xpromini': ['images/detail/promini/2025_엑스트론_프로미니_상세페이지.jpg'],
  'eqneo': ['images/detail/EQ/2025_엑스트론_EQ_상세페이지.jpg'],
  'eq': ['images/detail/EQ/2025_엑스트론_EQ_상세페이지.jpg']
};

function openDetailModal(e, category, type) {
  if (e) e.preventDefault();
  
  const modal = document.getElementById('detailModal');
  const resultBox = document.getElementById('detailResultBox');
  
  if (modal && resultBox) {
    let targetImages = [];
    
    // 모델별 상세 이미지가 정의되어 있으면 로드
    if (type && modelDetailImages[type]) {
      targetImages = modelDetailImages[type];
    }
    // 데이터 구조(bikeData.detailImages)에 있다면 불러옴
    else if (category && type && galleryState[category] && galleryState[category].dataMap[type]) {
      const data = galleryState[category].dataMap[type];
      if (data.detailImages && data.detailImages.length > 0) {
        targetImages = data.detailImages;
      }
    }
    
    // 타겟 이미지가 맵핑되지 않았다면 임시 목업 (또는 빈 화면 방지용 메인 이미지 등)
    if (targetImages.length === 0) {
      targetImages = [
        'images/1-1_xtron_pro_max_b.png',
        'images/1-2_xtron_pro_max_g.png',
        'images/1-3_xtron_pro_max_w.png',
        'images/2-1_xtron_city_max_b.png'
      ];
    }
    
    let html = '';
    targetImages.forEach((src, index) => {
      // 최상단 1개 이미지는 즉시 뜨도록 하고, 나머지는 스크롤 시 로딩되도록 최적화
      const loadingAttr = index === 0 ? '' : 'loading="lazy"';
      html += `<img src="${src}" alt="상세 이미지" ${loadingAttr} style="width:100%; height:auto; display:block;">`;
    });
    
    resultBox.innerHTML = html;
    modal.classList.add('show');
    
    // 모달 띄울 때 본문 스크롤 방지
    document.body.style.overflow = 'hidden';
  }
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.remove('show');
    // 본문 스크롤 복구
    document.body.style.overflow = '';
  }
}

/* ============================================
   이미지 사전 로딩 (Preload) - 성능 최적화 (순차 로딩)
============================================ */
window.addEventListener('load', () => {
  const preloadImages = [];
  
  // 맥스 시리즈 이미지 수집
  if (typeof bikeData !== 'undefined') {
    Object.values(bikeData).forEach(data => {
      if (data.images) preloadImages.push(...data.images);
    });
  }
  
  // 엑스트론 라인업 이미지 수집
  if (typeof xtronData !== 'undefined') {
    Object.values(xtronData).forEach(data => {
      if (data.images) preloadImages.push(...data.images);
    });
  }
  
  // 브라우저 렌더링에 지장을 주지 않도록 한 장씩 순차적으로 로드
  let preloadIndex = 0;
  function loadNextImage() {
    if (preloadIndex >= preloadImages.length) return;
    
    // requestIdleCallback을 지원하면 활용하여 유휴 시간에만 로드
    const doLoad = () => {
      const img = new Image();
      img.src = preloadImages[preloadIndex];
      // 해당 이미지 처리가 끝나면 잠시 쉬었다가 다음 이미지 호출
      img.onload = img.onerror = () => {
        preloadIndex++;
        setTimeout(loadNextImage, 200); // 0.2초 간격을 두어 메인 스레드 부하 분산
      };
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(doLoad);
    } else {
      setTimeout(doLoad, 50);
    }
  }

  // 페이지 로드 직후 렌더링 및 스크롤이 안정화될 수 있도록 지연 시작
  setTimeout(() => {
    loadNextImage();
  }, 2500);
});
