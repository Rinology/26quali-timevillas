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
    price: '1,590,000원',
    link: '#', // 실제 상세페이지 링크로 수정
    images: ['images/1-1_xtron_pro_max_b.png', 'images/1-2_xtron_pro_max_g.png', 'images/1-3_xtron_pro_max_w.png'],
    benefit: '프로맥스 혜택 상세 내용을 여기에 입력해주세요.'
  },
  'city': {
    name: '시티맥스',
    price: '1,490,000원',
    link: '#',
    images: ['images/2-1_xtron_city_max_b.png', 'images/2-2_xtron_city_max_g.png'],
    benefit: '시티맥스 혜택 상세 내용을 여기에 입력해주세요.'
  },
  'tour': {
    name: '투어맥스',
    price: '1,490,000원',
    link: '#',
    images: ['images/3-1_xtron_tour_max_b.png', 'images/3-2_xtron_tour_max_g.png'],
    benefit: '투어맥스 혜택 상세 내용을 여기에 입력해주세요.'
  },
  'promini': {
    name: '프로미니맥스',
    price: '예상가 0,000,000원',
    link: '#',
    images: ['images/4-1_xtron_pro_mini_max_b.png', 'images/4-2_xtron_pro_mini_max_g.png', 'images/4-3_xtron_pro_mini_max_w.png'],
    benefit: '프로미니맥스 혜택 상세 내용을 여기에 입력해주세요.'
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

  let benefitHtml = '';
  if (data.benefit) {
    benefitHtml = `
      <!-- 프리미엄 혜택 알림 영역 (베네핏 01 연계) -->
      <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255, 77, 136, 0.08); border: 1px solid rgba(255, 77, 136, 0.3); border-radius: 100px; color: #ff4d88; font-weight: 700; font-size: 15px; display: inline-flex; justify-content: center; align-items: center; gap: 8px; animation: fadeInUp 0.5s 0.3s ease both; text-align: center;">
        <span style="font-size: 18px;">🎁</span>
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

  // 뷰어 내용 업데이트: 컨테이너 높이를 꽉 차게 하고(height:100%), 내부 이미지도 뷰어를 벗어나지 않도록 강제(max-height:100%)
  viewer.innerHTML = `
    <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; border-radius: 18px; padding-bottom: 24px; box-sizing: border-box;">
      <!-- 이미지 영역 -->
      <div style="width: 100%; height: calc(100% - 60px); flex: 1; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden;">
        <img src="${imageSrc}" alt="${data.name} 이미지 ${currentImgIdx + 1}" style="width: 100%; height: 100%; object-fit: contain; animation: fadeIn 0.4s ease both; transition: transform 0.3s ease;">
      </div>
      
      <!-- 가격 & 상세 배지 및 네비게이션 버튼 그룹 -->
      <div style="position: relative; margin-top: 15px; display: flex; gap: 12px; align-items: center; justify-content: center; animation: fadeInUp 0.5s 0.2s ease both; width: 100%;">
        
        <!-- 이전 버튼 -->
        <button onclick="event.stopPropagation(); prevBike();" aria-label="이전 자전거" style="width: 48px; height: 48px; border-radius: 50%; background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; justify-content: center; align-items: center; color: var(--c-blue); cursor: pointer; transition: all 0.2s ease; flex-shrink: 0;" onmouseover="this.style.background='var(--c-light)'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='white'; this.style.transform='scale(1)';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- 가격 배지 -->
        <a href="${data.link}" target="_blank" rel="noopener noreferrer" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 14px 28px 14px 36px; border-radius: 100px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid rgba(79, 124, 255, 0.15); display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; transition: all 0.2s ease; white-space: nowrap;">
          <span style="font-size: 16px; font-weight: 800; color: var(--c-cyan);">${data.name}</span>
          <span style="width: 1px; height: 14px; background: rgba(30, 45, 90, 0.2);"></span>
          <span style="font-size: 20px; font-weight: 900; color: var(--c-blue);">${data.price}</span>
        </a>
        
        <!-- 상세 보기 버튼 -->
        <a href="${data.link}" target="_blank" rel="noopener noreferrer" style="position: relative; display: flex; align-items: center; justify-content: center; width: 54px; height: 54px; background: var(--c-blue); color: white; border-radius: 50%; box-shadow: 0 4px 12px rgba(79, 124, 255, 0.3); transition: transform 0.2s ease, background 0.2s ease; flex-shrink: 0;" onmouseover="this.style.transform='scale(1.05)'; this.style.background='var(--c-cyan)'; this.querySelector('.tt-bike').style.opacity='1'; this.querySelector('.tt-bike').style.visibility='visible'; this.querySelector('.tt-bike').style.transform='translateX(-50%) translateY(0)';" onmouseout="this.style.transform='scale(1)'; this.style.background='var(--c-blue)'; this.querySelector('.tt-bike').style.opacity='0'; this.querySelector('.tt-bike').style.visibility='hidden'; this.querySelector('.tt-bike').style.transform='translateX(-50%) translateY(5px)';">
          <!-- 말풍선 -->
          <span class="tt-bike" style="position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(5px); background: #191919; color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity 0.2s, transform 0.2s, visibility 0.2s; pointer-events: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10;">
            상세페이지로 이동!
            <span style="content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 6px; border-style: solid; border-color: #191919 transparent transparent transparent;"></span>
          </span>
          <!-- 문서 아이콘 -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </a>

        <!-- 다음 버튼 -->
        <button onclick="event.stopPropagation(); nextBike();" aria-label="다음 자전거" style="width: 48px; height: 48px; border-radius: 50%; background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; justify-content: center; align-items: center; color: var(--c-blue); cursor: pointer; transition: all 0.2s ease; flex-shrink: 0;" onmouseover="this.style.background='var(--c-light)'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='white'; this.style.transform='scale(1)';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

      </div>
      
      ${benefitHtml}
      
    </div>
  `;
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
  showExtraImage('zato'); // 엑스트라 라인업 기본 표시
});

/* ---- 엑스트라 라인업 이미지 뷰어 ---- */
const extraData = {
  'zato': {
    name: '자토바이',
    price: '예상가 0,000,000원',
    link: '#', // 실제 링크 연결
    images: ['images/5-1_xtron_mini_b.png', 'images/5-2_xtron_slim_b.png', 'images/5-3_xtron_urban_b.png'],
    benefit: '자토바이 혜택 상세 내용을 여기에 입력해주세요.'
  },
  'samryun': {
    name: '삼륜 모델',
    price: '예상가 0,000,000원',
    link: '#',
    images: ['images/6_xtron_neo_be.png'],
    benefit: '삼륜 모델 혜택 상세 내용을 여기에 입력해주세요.'
  },
  'nonfold': {
    name: '비접이식 라인업',
    price: '예상가 0,000,000원',
    link: '#',
    images: ['images/7-1_xtron_gt_s_b.png', 'images/7-2_xtron_gt_g.png', 'images/7-3_xtron_gt_mini_w.png'],
    benefit: '비접이식 라인업 혜택 상세 내용을 여기에 입력해주세요.'
  },
  'xseries': {
    name: 'X시리즈',
    price: '예상가 0,000,000원',
    link: '#',
    images: ['images/8-1_xtron_pro_s_w.png', 'images/8-2_xtron_pro_g.png', 'images/8-3_xtron_city_g.png', 'images/8-4_xtron_tour_g.png', 'images/8-5_xtron_pro_mini_w.png', 'images/8-6_xtron_eq_w.png'],
    benefit: 'X시리즈 혜택 상세 내용을 여기에 입력해주세요.'
  }
};

let currentExtraType = 'zato';
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

  let benefitHtml = '';
  if (data.benefit) {
    benefitHtml = `
      <!-- 프리미엄 혜택 알림 영역 (베네핏 01 연계) -->
      <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255, 77, 136, 0.08); border: 1px solid rgba(255, 77, 136, 0.3); border-radius: 100px; color: #ff4d88; font-weight: 700; font-size: 15px; display: inline-flex; justify-content: center; align-items: center; gap: 8px; animation: fadeInUp 0.5s 0.3s ease both; text-align: center;">
        <span style="font-size: 18px;">🎁</span>
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

  // 뷰어 내용 업데이트: 컨테이너와 이미지의 높이 비율을 100%로 강제하여 벗어나지 않도록 방지
  viewer.innerHTML = `
    <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; border-radius: 18px; padding-bottom: 24px; box-sizing: border-box;">
      <!-- 이미지 영역 -->
      <div style="width: 100%; height: calc(100% - 60px); flex: 1; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden;">
        <img src="${imageItem}" alt="${data.name} 이미지 ${currentExtraIdx + 1}" style="width: 100%; height: 100%; object-fit: contain; animation: fadeIn 0.4s ease both; transition: transform 0.3s ease;">
      </div>
      
      <!-- 가격 & 상세 배지 및 네비게이션 버튼 그룹 -->
      <div style="position: relative; margin-top: 15px; display: flex; gap: 12px; align-items: center; justify-content: center; animation: fadeInUp 0.5s 0.2s ease both; width: 100%;">
        
        <!-- 이전 버튼 -->
        <button onclick="event.stopPropagation(); prevExtra();" aria-label="이전 모델" style="width: 48px; height: 48px; border-radius: 50%; background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; justify-content: center; align-items: center; color: var(--c-blue); cursor: pointer; transition: all 0.2s ease; flex-shrink: 0;" onmouseover="this.style.background='var(--c-light)'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='white'; this.style.transform='scale(1)';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- 가격 배지 -->
        <a href="${data.link}" target="_blank" rel="noopener noreferrer" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 14px 28px 14px 36px; border-radius: 100px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid rgba(79, 124, 255, 0.15); display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; transition: all 0.2s ease; white-space: nowrap;">
          <span style="font-size: 16px; font-weight: 800; color: var(--c-cyan);">${data.name}</span>
          <span style="width: 1px; height: 14px; background: rgba(30, 45, 90, 0.2);"></span>
          <span style="font-size: 20px; font-weight: 900; color: var(--c-blue);">${data.price}</span>
        </a>
        
        <!-- 상세 보기 버튼 -->
        <a href="${data.link}" target="_blank" rel="noopener noreferrer" style="position: relative; display: flex; align-items: center; justify-content: center; width: 54px; height: 54px; background: var(--c-blue); color: white; border-radius: 50%; box-shadow: 0 4px 12px rgba(79, 124, 255, 0.3); transition: transform 0.2s ease, background 0.2s ease; flex-shrink: 0;" onmouseover="this.style.transform='scale(1.05)'; this.style.background='var(--c-cyan)'; this.querySelector('.tt-extra').style.opacity='1'; this.querySelector('.tt-extra').style.visibility='visible'; this.querySelector('.tt-extra').style.transform='translateX(-50%) translateY(0)';" onmouseout="this.style.transform='scale(1)'; this.style.background='var(--c-blue)'; this.querySelector('.tt-extra').style.opacity='0'; this.querySelector('.tt-extra').style.visibility='hidden'; this.querySelector('.tt-extra').style.transform='translateX(-50%) translateY(5px)';">
          <!-- 말풍선 -->
          <span class="tt-extra" style="position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(5px); background: #191919; color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity 0.2s, transform 0.2s, visibility 0.2s; pointer-events: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10;">
            상세페이지로 이동!
            <span style="content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 6px; border-style: solid; border-color: #191919 transparent transparent transparent;"></span>
          </span>
          <!-- 문서 아이콘 -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </a>

        <!-- 다음 버튼 -->
        <button onclick="event.stopPropagation(); nextExtra();" aria-label="다음 모델" style="width: 48px; height: 48px; border-radius: 50%; background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; justify-content: center; align-items: center; color: var(--c-blue); cursor: pointer; transition: all 0.2s ease; flex-shrink: 0;" onmouseover="this.style.background='var(--c-light)'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='white'; this.style.transform='scale(1)';">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

      </div>
      
      ${benefitHtml}
      
    </div>
  `;
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
  { name: '신세계 상품권', chance: 15, icon: '🎫', color: 'var(--c-gold)' },
  { name: '퀄리스포츠 백', chance: 55, icon: '🎒', color: 'var(--c-blue)' },
  { name: '브레이크 패드', chance: 30, icon: '🛑', color: 'var(--c-cyan)' }
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
