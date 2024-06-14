function averageStar(totalRatingElement) {
  var totalRating = Number(totalRatingElement.textContent);
  var AvgStar = totalRatingElement.closest('.store-avgScore').querySelector('.realAvg-star');
  AvgStar.style.width = (totalRating * 107 / 5) + 'px';
}

document.querySelectorAll('#totalScoreR').forEach(function(element) {
  averageStar(element);
});

/* ************************************************************** */
document.addEventListener("DOMContentLoaded", function() {
  var hashNo = document.getElementById("mHashNo").value;
  var initiallyChecked = [];

  // hashNo 값에 해당하는 체크박스 선택
  var checkbox = document.querySelector("input[name='hashNo'][value='" + hashNo + "']");
  if (checkbox) {
      checkbox.checked = true;
      initiallyChecked.push(checkbox);
  }

  // popupClose 버튼 이벤트 핸들러
  document.querySelector("#popupClose").addEventListener("click", () => {
      hashSelectForm.classList.add("popup-hidden");

      // 체크된 체크박스들을 모두 체크 해제
      const checkedKeywords = document.querySelectorAll(".keyword-checkbox:checked");
      checkedKeywords.forEach((keyword) => {
          if (!initiallyChecked.includes(keyword)) {
              keyword.checked = false;
          }
      });
  });

  // add 버튼 이벤트 핸들러
  document.querySelector(".add").addEventListener("click", () => {
      hashSelectForm.classList.remove("popup-hidden");
  });

  // addBtn 클릭 이벤트 핸들러
  const addBtn = document.querySelectorAll("#addBtn");
  addBtn.forEach(btn => {
      btn.addEventListener("click", function() {
          hashSelectForm.classList.add("popup-hidden");
          const checkedValues = [];

          // 체크된 체크박스들의 값을 수집
          const checkedHash = document.querySelectorAll(".keyword-checkbox:checked");
          checkedHash.forEach(keyword => {
              const hashObj = {
                  hashNo: parseInt(keyword.value),  // assuming the value is hashNo
                  hashTitle: keyword.dataset.title  // assuming there's a data attribute for title
              };
              checkedValues.push(hashObj);
          });

          fetch('/store/addHash', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ "checkedValues": checkedValues })
          })
          .then(response => response.json())
          .then(result => {
              console.log(result);
              updateStoreList(result);
          });
      });
  });

  // 해시태그 체크박스 클릭 이벤트 핸들러
  const keywords = document.querySelectorAll(".keyword-checkbox");
  keywords.forEach((keyword) => {
      keyword.addEventListener("click", (e) => {
          const checked = document.querySelectorAll(".keyword-checkbox:checked");
          if (checked.length > 5) {
              alert("해시태그는 최대 5개까지만 선택할 수 있습니다.");
              e.preventDefault();
          }
      });
  });
});

function updateStoreList(result) {
  const storeListContainer = document.querySelector(".storeList-container");

  // storeList-container 요소가 없을 경우 에러 처리
  if (!storeListContainer) {
      console.error("storeList-container element not found");
      return;
  }

  // 기존 내용을 지움
  storeListContainer.innerHTML = '';

  // storeList와 hashTitle을 result에서 추출
  const { storeList, hashTitle } = result;

  // storeList가 없을 경우 처리
  if (!storeList || storeList.length === 0) {
      console.error("storeList is empty");
      return;
  }

  // storeList를 순회하며 상점 정보를 화면에 추가
  storeList.forEach(store => {
      const storeElement = createStoreElement(store, hashTitle);
      storeListContainer.appendChild(storeElement);
  });
}

// 상점 요소를 생성하는 함수
function createStoreElement(store, hashTitle) {
  const storeElement = document.createElement("div");
  storeElement.className = "store-List";
  storeElement.innerHTML = `
      <div class="storeList-left">
          <img src="${store.storeImg}" alt="">
      </div>
      <div class="storeList-mid">
          <div class="store-info">
              <a href="/store/storeDetail/${store.storeNo}">${store.storeName}</a>
              <div class="allstar-box">
                  <div class="store-avgScore">
                      <div class="realAvg-star">
                          <i class="total_star fas fa-star"></i>
                      </div>
                      <div>
                          <span id="totalScoreR">${store.totalRating} 점</span>
                      </div>
                  </div>
              </div>
              <span class="review-count">리뷰 ${store.reviewCount} 개</span>
              <span class="store-address">${store.postcode} | ${store.address} | ${store.detailAddress}</span>
              <div class="store-time">
                  <table>
                      <tbody class="time-table">
                          <tr>
                              <td style="width: 100px;">영업 시간 :</td>
                              <td>${store.openHour} ~ ${store.closeHour}</td>
                          </tr>
                          <tr>
                              <td style="width: 100px;">브레이크 타임 :</td>
                              <td>${store.breaktimeStart === '00:00' || store.breaktimeEnd === '00:00' ? '없음' : `${store.breaktimeStart} ~ ${store.breaktimeEnd}`}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              ${createHashTags(store, hashTitle)}
          </div>
      </div>
      <div class="storeList-right">
          <a class="store-reservation" href="/store/storeDetail/${store.storeNo}/reservation">예약하기</a>
      </div>
  `;
  return storeElement;
}

// 해시태그 요소를 생성하는 함수
function createHashTags(store, hashTitle) {
  let hashTagsHTML = '';
  hashTitle.forEach(hash => {
      hashTagsHTML += `
          <div class="hashtag">
              <span>${hash.hashTitle}</span>
              <span>${store.hashCount}</span>
          </div>
      `;
  });
  return hashTagsHTML;
}


