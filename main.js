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
    link: '#', // 실제 상세페이지 링크로 수정
    images: ['images/1-1_xtron_pro_max_b.png', 'images/1-2_xtron_pro_max_g.png', 'images/1-3_xtron_pro_max_w.png'],
    benefit: ''
  },
  'city': {
    name: '시티맥스',
    price: '1,790,000원',
    link: '#',
    images: ['images/2-1_xtron_city_max_b.png', 'images/2-2_xtron_city_max_g.png'],
    benefit: ''
  },
  'tour': {
    name: '투어맥스',
    price: '1,790,000원',
    link: '#',
    images: ['images/3-1_xtron_tour_max_b.png', 'images/3-2_xtron_tour_max_g.png'],
    benefit: ''
  },
  'promini': {
    name: '프로미니맥스',
    price: '1,490,000원 ~',
    link: '#',
    images: ['images/4-1_xtron_pro_mini_max_b.png', 'images/4-2_xtron_pro_mini_max_g.png', 'images/4-3_xtron_pro_mini_max_w.png'],
    benefit: ''
  }
};

let currentBikeType = 'pro';
let currentImgIdx = 0;

function showBikeImage(type) {
  currentBikeType = type;
  currentImgIdx = 0; // 모델 변경 시 첫 번째 사진부터 노출
  updateBikeView();
}

function updateBikeView() {
  const viewer = document.getElementById('bike-viewer');
  const data = bikeData[currentBikeType];
  const imageSrc = data.images[currentImgIdx];

  // 16인치 등 바퀴가 작은 특정 모델(미니, EQ) 이미지 15% 축소 하드코딩
  const imgScale = (imageSrc.includes('_mini_') || imageSrc.includes('_eq_')) ? '0.85' : '1.0';

  let benefitHtml = '';
  if (data.benefit) {
    benefitHtml = `
      <!-- 프리미엄 혜택 알림 영역 (베네핏 01 연계) -->
      <div class="benefit-alert-box">
        <span class="benefit-alert-icon">🎁</span>
        <span>${data.benefit}</span>
      </div>
    `;
  }

  // 라인업 버튼 활성화 상태 업데이트
  document.querySelectorAll('.lineup-pill').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('btn-' + currentBikeType);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  let dotsHtml = '';
  if (data.images.length > 1) {
    dotsHtml = '<div class="viewer-dots">';
    data.images.forEach((imgUrl, idx) => {
      dotsHtml += `<div class="viewer-dot ${idx === currentImgIdx ? 'active' : ''}"></div>`;
    });
    dotsHtml += '</div>';
  }

  // 뷰어 내용 업데이트: DOM 덮어쓰기로 인한 깜빡임 방지
  const stage = viewer.querySelector('.viewer-stage');
  if (!stage) {
    viewer.innerHTML = `
      <div class="viewer-stage">
        <!-- 이미지 영역 -->
        <div class="viewer-img-container swipe-container" data-type="bike">
          <img src="${imageSrc}" alt="${data.name} 이미지 ${currentImgIdx + 1}" class="viewer-bike-img" style="transform: scale(${imgScale});">
          ${dotsHtml}
        </div>
        
        <!-- 가격 & 상세 배지 및 네비게이션 버튼 그룹 -->
        <div class="viewer-nav-group">
          <!-- 가격 배지 -->
          <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-price-badge">
            <span class="viewer-price-name">${data.name}</span>
            <span class="viewer-price-sep"></span>
            <span class="viewer-price-val">${data.price}</span>
          </a>
          
          <!-- 상세 보기 버튼 -->
          <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-detail-btn">
            <!-- 말풍선 -->
            <span class="tt-bike">
              상세페이지로 이동!
              <span class="tt-arrow"></span>
            </span>
            <!-- 문서 아이콘 -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </a>
        </div>
        
        ${benefitHtml}
        
      </div>
    `;
    setupSwipeListener(viewer.querySelector('.swipe-container'), prevBike, nextBike);
  } else {
    // 기존 DOM 업데이트 (깜빡임 최소화)
    const img = stage.querySelector('.viewer-bike-img');
    if (img) {
      img.style.animation = 'none';
      img.getBoundingClientRect(); // 플로우 트리거
      img.src = imageSrc;
      img.alt = `${data.name} 이미지 ${currentImgIdx + 1}`;
      img.style.transform = `scale(${imgScale})`;
      img.style.animation = 'fadeIn 0.4s ease both';
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
        dotsContainer.innerHTML += `<div class="viewer-dot ${idx === currentImgIdx ? 'active' : ''}"></div>`;
      });
    } else if (dotsContainer) {
      dotsContainer.remove();
    }
    
    const priceBadge = stage.querySelector('.viewer-price-badge');
    if (priceBadge) {
      priceBadge.href = data.link;
      const nameEl = priceBadge.querySelector('.viewer-price-name');
      const valEl = priceBadge.querySelector('.viewer-price-val');
      if (nameEl) nameEl.textContent = data.name;
      if (valEl) valEl.textContent = data.price;
    }
    
    const detailBtn = stage.querySelector('.viewer-detail-btn');
    if (detailBtn) detailBtn.href = data.link;

    const oldBenefit = stage.querySelector('.benefit-alert-box');
    if (oldBenefit) oldBenefit.remove();

    if (data.benefit) {
      stage.insertAdjacentHTML('beforeend', benefitHtml);
    }
  }
}

function prevBike() {
  const data = bikeData[currentBikeType];
  const bikeKeys = Object.keys(bikeData);
  currentImgIdx--;

  if (currentImgIdx < 0) {
    // 현재 모델의 첫 사진에서 이전을 누르면, 이전 모델의 마지막 사진으로 이동
    const currentModelIdx = bikeKeys.indexOf(currentBikeType);
    const prevModelIdx = (currentModelIdx - 1 + bikeKeys.length) % bikeKeys.length;
    currentBikeType = bikeKeys[prevModelIdx];
    currentImgIdx = bikeData[currentBikeType].images.length - 1;
  }
  updateBikeView();
}

function nextBike() {
  const data = bikeData[currentBikeType];
  const bikeKeys = Object.keys(bikeData);
  currentImgIdx++;

  if (currentImgIdx >= data.images.length) {
    // 현재 모델의 마지막 사진에서 다음을 누르면, 다음 모델의 첫 사진으로 이동
    const currentModelIdx = bikeKeys.indexOf(currentBikeType);
    const nextModelIdx = (currentModelIdx + 1) % bikeKeys.length;
    currentBikeType = bikeKeys[nextModelIdx];
    currentImgIdx = 0;
  }
  updateBikeView();
}

// 화면이 불렸을 때 기본적으로 프로 맥스 표시
window.addEventListener('DOMContentLoaded', () => {
  showBikeImage('pro');
  showExtraImage('slim'); // 엑스트라 라인업 기본 표시
});

const extraData = {
  'slim': {
    name: '슬림',
    price: '1,590,000원 ~',
    link: '#',
    images: ['images/5-2_xtron_slim_b.png'],
    benefit: '슬림 컴팩트 전용 리어랙'
  },
  'mini': {
    name: '미니',
    price: '1,730,000원 ~',
    link: '#',
    images: ['images/5-1_xtron_mini_b.png'],
    benefit: '미니/슬림 모델 리어랙 무상 장착'
  },
  'eqneo': {
    name: 'EQ NEO',
    price: '1,730,000원',
    link: '#',
    images: ['images/6_xtron_neo_be.png'],
    benefit: '자전거 바구니 무상 장착'
  },
  'gt': {
    name: 'GT',
    price: '1,690,000원 ~',
    link: '#',
    images: ['images/7-2_xtron_gt_g.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'gtmini': {
    name: 'GT 미니',
    price: '1,390,000원 ~',
    link: '#',
    images: ['images/7-3_xtron_gt_mini_w.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'gts': {
    name: 'GT S',
    price: '2,130,000원 ~',
    link: '#',
    images: ['images/7-1_xtron_gt_s_b.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xpro': {
    name: '프로',
    price: '1,690,000원 ~',
    link: '#',
    images: ['images/8-2_xtron_pro_g.png', 'images/8-1_xtron_pro_s_w.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xcity': {
    name: '시티',
    price: '추후공개',
    link: '#',
    images: ['images/8-3_xtron_city_g.png'],
    benefit: ''
  },
  'xtour': {
    name: '투어',
    price: '1,690,000원 ~',
    link: '#',
    images: ['images/8-4_xtron_tour_g.png'],
    benefit: '프리미엄 썬투어 싯포스트 무상 장착'
  },
  'xpromini': {
    name: '프로미니',
    price: '1,390,000원 ~',
    link: '#',
    images: ['images/8-5_xtron_pro_mini_w.png'],
    benefit: ''
  },
  'eq': {
    name: 'EQ',
    price: '1,330,000원 ~',
    link: '#',
    images: ['images/8-6_xtron_eq_w.png'],
    benefit: '프론트 바구니 및 포폴라(+모어) 제공'
  }
};

let currentExtraType = 'slim';
let currentExtraIdx = 0;

function showExtraImage(type) {
  currentExtraType = type;
  currentExtraIdx = 0;
  updateExtraView();
}

function updateExtraView() {
  const viewer = document.getElementById('extra-viewer');
  if (!viewer) return;
  const data = extraData[currentExtraType];
  const imageItem = data.images[currentExtraIdx];

  // 16인치 등 바퀴가 작은 특정 모델(미니, EQ) 이미지 15% 축소 하드코딩
  const imgScale = (imageItem.includes('_mini_') || imageItem.includes('_eq_')) ? '0.85' : '1.0';

  let benefitHtml = '';
  if (data.benefit) {
    benefitHtml = `
      <!-- 프리미엄 혜택 알림 영역 (베네핏 01 연계) -->
      <div class="benefit-alert-box">
        <span class="benefit-alert-icon">🎁</span>
        <span>${data.benefit}</span>
      </div>
    `;
  }

  // 라인업 버튼 활성화 상태 업데이트 (extra 라인업)
  document.querySelectorAll('#extra-series .lineup-pill').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('btn-' + currentExtraType);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  let dotsHtml = '';
  if (data.images.length > 1) {
    dotsHtml = '<div class="viewer-dots">';
    data.images.forEach((imgUrl, idx) => {
      dotsHtml += `<div class="viewer-dot ${idx === currentExtraIdx ? 'active' : ''}"></div>`;
    });
    dotsHtml += '</div>';
  }

  // 뷰어 내용 업데이트: DOM 덮어쓰기로 인한 깜빡임 방지
  const stage = viewer.querySelector('.viewer-stage');
  if (!stage) {
    viewer.innerHTML = `
      <div class="viewer-stage">
        <!-- 이미지 영역 -->
        <div class="viewer-img-container swipe-container" data-type="extra">
          <img src="${imageItem}" alt="${data.name} 이미지 ${currentExtraIdx + 1}" class="viewer-bike-img" style="transform: scale(${imgScale});">
          ${dotsHtml}
        </div>
        
        <!-- 가격 & 상세 배지 등 버튼 그룹 -->
        <div class="viewer-nav-group">
          <!-- 가격 배지 -->
          <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-price-badge">
            <span class="viewer-price-name">${data.name}</span>
            <span class="viewer-price-sep"></span>
            <span class="viewer-price-val">${data.price}</span>
          </a>
          
          <!-- 상세 보기 버튼 -->
          <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-detail-btn">
            <!-- 말풍선 -->
            <span class="tt-extra">
              상세페이지로 이동!
              <span class="tt-arrow"></span>
            </span>
            <!-- 문서 아이콘 -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </a>
        </div>
        
        ${benefitHtml}
        
      </div>
    `;
    setupSwipeListener(viewer.querySelector('.swipe-container'), prevExtra, nextExtra);
  } else {
    // 기존 DOM 업데이트 (깜빡임 최소화)
    const img = stage.querySelector('.viewer-bike-img');
    if (img) {
      img.style.animation = 'none';
      img.getBoundingClientRect(); // 플로우 트리거
      img.src = imageItem;
      img.alt = `${data.name} 이미지 ${currentExtraIdx + 1}`;
      img.style.transform = `scale(${imgScale})`;
      img.style.animation = 'fadeIn 0.4s ease both';
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
        dotsContainer.innerHTML += `<div class="viewer-dot ${idx === currentExtraIdx ? 'active' : ''}"></div>`;
      });
    } else if (dotsContainer) {
      dotsContainer.remove();
    }
    
    const priceBadge = stage.querySelector('.viewer-price-badge');
    if (priceBadge) {
      priceBadge.href = data.link;
      const nameEl = priceBadge.querySelector('.viewer-price-name');
      const valEl = priceBadge.querySelector('.viewer-price-val');
      if (nameEl) nameEl.textContent = data.name;
      if (valEl) valEl.textContent = data.price;
    }
    
    const detailBtn = stage.querySelector('.viewer-detail-btn');
    if (detailBtn) detailBtn.href = data.link;

    const oldBenefit = stage.querySelector('.benefit-alert-box');
    if (oldBenefit) oldBenefit.remove();

    if (data.benefit) {
      stage.insertAdjacentHTML('beforeend', benefitHtml);
    }
  }
}

function prevExtra() {
  const data = extraData[currentExtraType];
  const extraKeys = Object.keys(extraData);
  currentExtraIdx--;

  if (currentExtraIdx < 0) {
    // 현재 모델의 첫 사진에서 이전을 누르면, 이전 모델의 마지막 사진으로 이동
    const currentModelIdx = extraKeys.indexOf(currentExtraType);
    const prevModelIdx = (currentModelIdx - 1 + extraKeys.length) % extraKeys.length;
    currentExtraType = extraKeys[prevModelIdx];
    currentExtraIdx = extraData[currentExtraType].images.length - 1;
  }
  updateExtraView();
}

function nextExtra() {
  const data = extraData[currentExtraType];
  const extraKeys = Object.keys(extraData);
  currentExtraIdx++;

  if (currentExtraIdx >= data.images.length) {
    // 현재 모델의 마지막 사진에서 다음을 누르면, 다음 모델의 첫 사진으로 이동
    const currentModelIdx = extraKeys.indexOf(currentExtraType);
    const nextModelIdx = (currentModelIdx + 1) % extraKeys.length;
    currentExtraType = extraKeys[nextModelIdx];
    currentExtraIdx = 0;
  }
  updateExtraView();
}

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
  
  // 엑스트라 라인업 이미지 수집
  if (typeof extraData !== 'undefined') {
    Object.values(extraData).forEach(data => {
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
