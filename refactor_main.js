const fs = require('fs');

let content = fs.readFileSync('main.js', 'utf-8');

const bikeDataEndStr = "};\r\n\r\nlet currentBikeType = 'pro';";
let bikeDataEnd = content.indexOf(bikeDataEndStr);
if (bikeDataEnd === -1) {
  // Try without \r
  bikeDataEnd = content.indexOf("};\n\nlet currentBikeType = 'pro';");
}

if (bikeDataEnd === -1) {
  console.log("Could not find start marker.");
  process.exit(1);
}

const extraMatch = content.match(/const extraData = \{[\s\S]*?\n\};\n/);
if (!extraMatch) {
  console.log("Could not find extraData.");
  process.exit(1);
}
const extraDataStr = extraMatch[0];

const newLogic = `
const galleryState = {
  bike: {
    type: 'pro',
    imgIdx: 0,
    dataMap: bikeData,
    viewerId: 'bike-viewer',
    tabSelector: '#max-series .lineup-pill'
  },
  extra: {
    type: 'slim',
    imgIdx: 0,
    dataMap: extraData,
    viewerId: 'extra-viewer',
    tabSelector: '#extra-series .lineup-pill'
  }
};

window.showBikeImage = (type) => showGalleryImage('bike', type);
window.showExtraImage = (type) => showGalleryImage('extra', type);

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
    benefitHtml = \`
      <!-- 프리미엄 혜택 알림 영역 -->
      <div class="benefit-alert-box">
        <span class="benefit-alert-icon">🎁</span>
        <span>\${data.benefit}</span>
      </div>
    \`;
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
    swipeHintHtml = \`
      <div class="swipe-hint">좌우로 슬라이드</div>\`;
    dotsHtml = '<div class="viewer-dots">';
    data.images.forEach((imgUrl, idx) => {
      dotsHtml += \`<div class="viewer-dot \${idx === state.imgIdx ? 'active' : ''}"></div>\`;
    });
    dotsHtml += '</div>';
  }

  const stage = viewer.querySelector('.viewer-stage');
  if (!stage) {
    viewer.innerHTML = \`
      <div class="viewer-stage">
        <!-- 이미지 영역 -->
        <div class="viewer-img-container swipe-container" data-type="\${category}">
          \${swipeHintHtml}
          <img src="\${imageSrc}" alt="\${data.name} 이미지 \${state.imgIdx + 1}" class="viewer-bike-img">
          \${dotsHtml}
        </div>
        
        <!-- 가격 & 상세 배지 및 네비게이션 버튼 그룹 -->
        <div class="viewer-nav-group">
          <!-- 가격 배지 -->
          <a href="\${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-price-badge">
            <span class="viewer-price-name">\${data.name}</span>
            <span class="viewer-price-sep"></span>
            <span class="viewer-price-val">\${data.price}</span>
          </a>
          
          <!-- 상세 보기 버튼 -->
          <a href="\${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-detail-btn-wide">
            <span>상세페이지로 이동</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        
        \${benefitHtml}
        
      </div>
    \`;
    setupSwipeListener(viewer.querySelector('.swipe-container'), () => prevGalleryImage(category), () => nextGalleryImage(category));
  } else {
    // 기존 DOM 업데이트
    const img = stage.querySelector('.viewer-bike-img');
    if (img) {
      img.style.animation = 'none';
      img.getBoundingClientRect(); // 플로우 트리거
      img.src = imageSrc;
      img.alt = \`\${data.name} 이미지 \${state.imgIdx + 1}\`;
      img.style.transform = ''; 
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
        dotsContainer.innerHTML += \`<div class="viewer-dot \${idx === state.imgIdx ? 'active' : ''}"></div>\`;
      });
    } else if (dotsContainer) {
      if(dotsContainer && dotsContainer.parentNode) dotsContainer.remove();
    }
    
    const priceBadge = stage.querySelector('.viewer-price-badge');
    if (priceBadge) {
      priceBadge.href = data.link;
      const nameEl = priceBadge.querySelector('.viewer-price-name');
      const valEl = priceBadge.querySelector('.viewer-price-val');
      if (nameEl) nameEl.textContent = data.name;
      if (valEl) valEl.textContent = data.price;
    }
    
    const detailBtn = stage.querySelector('.viewer-detail-btn-wide');
    if (detailBtn) detailBtn.href = data.link;

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

// 화면이 불렸을 때 기본적으로 첫 항목 렌더링
window.addEventListener('DOMContentLoaded', () => {
  showGalleryImage('bike', 'pro');
  showGalleryImage('extra', 'slim');
});
`;

// Extract top part up to end of bikeData
const part1 = content.slice(0, bikeDataEnd + 2);

// Split at the end of updateExtraView
const endOfOldStr = "  updateExtraView();\r\n}\r\n\r\nfunction setupSwipeListener";
let endOfOld = content.indexOf(endOfOldStr);
if (endOfOld === -1) {
  endOfOld = content.indexOf("  updateExtraView();\n}\n\nfunction setupSwipeListener");
}

let part3 = "";
if (endOfOld !== -1) {
  // Move to start of function setupSwipeListener
  const offset = content.indexOf("function setupSwipeListener", endOfOld);
  part3 = "\n\n" + content.slice(offset);
} else {
  console.log("Could not find end of old block.");
  process.exit(1);
}

const finalContent = part1 + "\n\n" + extraDataStr + "\n" + newLogic + part3;

fs.writeFileSync('main.js', finalContent, 'utf-8');
console.log("REFACTOR_SUCCESS");
