function averageStar(totalRatingElement) {
  var totalRating = Number(totalRatingElement.textContent);
  var AvgStar = totalRatingElement.closest('.store-avgScore').querySelector('.realAvg-star');
  AvgStar.style.width = (totalRating * 107 / 5) + 'px';
}

document.querySelectorAll('#totalScoreR').forEach(function(element) {
  averageStar(element);
});

/* ************************************************************** */
const addBtn = document.querySelectorAll("#addBtn");

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
  addBtn.forEach(btn => {
    btn.addEventListener("click", function() {
      const checkedValues = [];

      // 체크된 체크박스들의 값을 수집
      const checkedHash = document.querySelectorAll(".keyword-checkbox:checked");
      checkedKeywords.forEach(keyword => {
        checkedHash.push(keyword.value);
      });

      fetch('/store/addHash', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "checkedHash" : checkedHash })
      })
      .then(response => response.json())
      .then(result => {
      console.log(result);
      })

    });
  });

  // 해시태그 체크박스 클릭 이벤트 핸들러
  const keywords = document.querySelectorAll(".keyword-checkbox");
  keywords.forEach((keyword) => {
    keyword.addEventListener("click", (e) => {
      const checked = document.querySelectorAll(".keyword-checkbox:checked");
      if (checked.length > 4) {
        alert("해시태그는 최대 4개까지만 선택할 수 있습니다.");
        e.preventDefault();
      }
    });
  });
});


