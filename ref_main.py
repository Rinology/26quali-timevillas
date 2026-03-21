import sys
import re

try:
    with open('main.js', 'r', encoding='utf-8') as f:
        text = f.read()

    text_norm = text.replace('\r\n', '\n')

    start_idx = text_norm.find("let currentBikeType = 'pro';")
    end_idx = text_norm.find("  updateExtraView();\n}\n")
    if end_idx != -1:
        end_idx += len("  updateExtraView();\n}\n")

    if start_idx == -1 or end_idx == -1 or end_idx < start_idx:
        print("Indices not found:")
        print("start:", start_idx)
        print("end:", end_idx)
        sys.exit(1)

    extra_data_match = re.search(r'(const extraData = \{.*?\n\};\n)', text_norm, re.DOTALL)
    if not extra_data_match:
        print("extraData not found")
        sys.exit(1)
    extra_data = extra_data_match.group(1)

    new_logic = """
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
    benefitHtml = `
      <!-- 프리미엄 혜택 알림 영역 -->
      <div class="benefit-alert-box">
        <span class="benefit-alert-icon">🎁</span>
        <span>${data.benefit}</span>
      </div>
    `;
  }

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
        <div class="viewer-img-container swipe-container" data-type="${category}">
          ${swipeHintHtml}
          <img src="${imageSrc}" alt="${data.name} 이미지 ${state.imgIdx + 1}" class="viewer-bike-img">
          ${dotsHtml}
        </div>
        
        <div class="viewer-nav-group">
          <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-price-badge">
            <span class="viewer-price-name">${data.name}</span>
            <span class="viewer-price-sep"></span>
            <span class="viewer-price-val">${data.price}</span>
          </a>
          
          <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="viewer-detail-btn-wide">
            <span>상세페이지로 이동</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        
        ${benefitHtml}
        
      </div>
    `;
    setupSwipeListener(viewer.querySelector('.swipe-container'), () => prevGalleryImage(category), () => nextGalleryImage(category));
  } else {
    const img = stage.querySelector('.viewer-bike-img');
    if (img) {
      img.style.animation = 'none';
      img.getBoundingClientRect();
      img.src = imageSrc;
      img.alt = `${data.name} 이미지 ${state.imgIdx + 1}`;
      img.style.transform = '';
      img.style.animation = 'fadeIn 0.4s ease both';
    }
    
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

window.addEventListener('DOMContentLoaded', () => {
  showGalleryImage('bike', 'pro');
  showGalleryImage('extra', 'slim');
});
"""

    part1 = text_norm[:start_idx]
    part3 = text_norm[end_idx:]

    final_text = part1 + extra_data + "\n" + new_logic + "\n" + part3

    # Add back \r\n for Windows
    final_text = final_text.replace('\n', '\r\n')

    with open('main.js', 'w', encoding='utf-8') as f:
        f.write(final_text)

    # test output
    with open('pytest.txt', 'w', encoding='utf-8') as f:
        f.write("OKOK")

    print("Success")

except Exception as e:
    import traceback
    with open('pytest_error.txt', 'w', encoding='utf-8') as f:
        f.write(traceback.format_exc())
    print("Error")
