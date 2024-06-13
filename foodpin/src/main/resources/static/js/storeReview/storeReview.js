const popupClose = document.querySelector("#popupClose");
const popupLayer = document.querySelector("#popupLayer");
const selectMenu = document.querySelector("#selectMenu");
const menuSection = document.querySelector("#menuSection");
const selectMenuButton = document.querySelector("#selectMenuButton");
const menuBody = document.querySelector("#menuBody");

popupClose.addEventListener("click", () => {
  menuSection.classList.add("popup-hidden");
});

selectMenuButton.addEventListener("click", () => {
  menuSection.classList.add("popup-hidden");
})

selectMenu.addEventListener("click", () => {
  menuSection.classList.remove("popup-hidden");
});








/* ************************************************************* */
const previewList = document.getElementsByClassName("preview");
const inputImageList = document.getElementsByClassName("inputImage");
const deleteImageList = document.getElementsByClassName("delete-image");


const backupInputList = new Array(inputImageList.length);

const changeImageFn = (inputImage, order) => {

  const maxSize = 1024 * 1024 * 10;
  const file = inputImage.files[0];

  if (file == undefined) {
    console.log("파일 선택 취소됨");
    const temp = backupInputList[order].cloneNode(true);

    inputImage.after(temp);
    inputImage.remove();
    inputImage = temp;

    inputImage.addEventListener("change", e => {
      changeImageFn(e.target, order);
    });

    return;
  }

  if (file.size > maxSize) {
    alert("10MB 이하의 이미지를 선택해주세요");

    if (backupInputList[order] == undefined || backupInputList[order].value == '') {
      inputImage.value = "";
      return;
    }

    const temp = backupInputList[order].cloneNode(true);

    inputImage.after(temp);
    inputImage.remove();
    inputImage = temp;

    inputImage.addEventListener("change", e => {
      changeImageFn(e.target, order);
    });

    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", e => {
    const url = e.target.result;

    previewList[order].src = url;

    backupInputList[order] = inputImage.cloneNode(true);

  });

}

for (let i = 0; i < inputImageList.length; i++) {

  inputImageList[i].addEventListener("change", e => {
    changeImageFn(e.target, i);
  })

  deleteImageList[i].addEventListener("click", () => {

    previewList[i].src = "";
    inputImageList[i].value = "";
    backupInputList[i].value = "";
  });
}

/* ********************************** 별점 ************************************** */
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

printRatingResult(ratingResult);

function executeRating(stars, result) {
  const starClassActive = "rating__star fas fa-star";
  const starClassUnactive = "rating__star far fa-star";
  const starsLength = stars.length;

  stars.map((star) => {
    star.onclick = () => {
      const i = stars.indexOf(star);

      if (star.className.indexOf(starClassUnactive) !== -1) {
        printRatingResult(result, i + 1);
        for (let j = 0; j <= i; j++) stars[j].className = starClassActive;
        for (let j = i + 1; j < starsLength; j++) stars[j].className = starClassUnactive;
      } else {
        printRatingResult(result, i + 1);
        for (let j = 0; j < starsLength; j++) {
          if (j <= i) {
            stars[j].className = starClassActive;
          } else {
            stars[j].className = starClassUnactive;
          }
        }
      }
    };
  });
}

function printRatingResult(result, num = 0) {
  result.value = num;
}

executeRating(ratingStars, ratingResult);

/* ***************************** 리뷰 해시태그 ******************************** */
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

/* ***************************************************************************** */

const menuCheckbox = document.querySelectorAll(".menu-checkbox");
const reviewForm = document.querySelector("#reviewForm");
const reviewContent = document.querySelector("#reviewContent");
const reviewRating = document.querySelector("#reviewRating");
const reviewKeyword = document.querySelector(".review-keyword");

reviewForm.addEventListener("submit", e => {

  const menuChecked = document.querySelectorAll(".menu-checkbox:checked");
  if (menuChecked.length == 0) {
    alert("메뉴를 선택해주세요.");
    selectMenu.focus();
    e.preventDefault();
    return;
  }

  if (reviewRating.value === '0') {
    alert("별점을 입력해주세요");
    selectMenu.focus();
    e.preventDefault();
    return;
  }


  const hashChecked = document.querySelectorAll(".keyword-checkbox:checked");
  if (hashChecked.length == 0) {
    alert("해시태그를 선택해주세요.");
    reviewKeyword.focus();
    e.preventDefault();
    return;
  }

  if (reviewContent.value.trim().length == 0) {
    alert("리뷰를 작성해주세요")
    e.preventDefault();
    return;
  }


  const memberNickname = loginMember.memberNickname;

  const actionUrl = reviewForm.getAttribute('action');

  // URL에서 reservNo 추출
  const urlParts = actionUrl.split('/');
  const reservNo = urlParts[urlParts.length - 1];
  // console.log(reservNo);
  sendNotificationFn("insertMemberReview", null, reservNo, null, null, memberNickname);

  reviewForm.submit();



});

console.log(document.querySelector("#reservDate").value);

/****************  메뉴 가격 합계  ****************/

document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('.menu-checkbox');
  const totalAmount = document.getElementById('totalAmount');

  function updateTotalAmount() {
    let total = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const menuAmount = parseInt(checkbox.dataset.amount);
        total += menuAmount;
      }
    });
    totalAmount.textContent = total;
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalAmount);
  });

  document.getElementById('selectMenuButton').addEventListener('click', updateTotalAmount);
});






