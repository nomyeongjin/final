const popupLayer = document.querySelector("#popupLayer");
const selectMenu = document.querySelector("#selectMenu");
const menuSection = document.querySelector("#menuSection");
const selectMenuButton = document.querySelector("#selectMenuButton");

popupClose.addEventListener("click", () => {
  menuSection.classList.add("popup-hidden");
});

selectMenuButton.addEventListener("click", () => {
  menuSection.classList.add("popup-hidden");
  const menuBody = document.querySelector("#menuBody");
})



selectMenu.addEventListener("click", ()=>{
  menuSection.classList.remove("popup-hidden");
});

const previewList = document.getElementsByClassName("preview");
const inputImageList = document.getElementsByClassName("inputImage");
const deleteImageList = document.getElementsByClassName("delete-image");

const deleteOrder = new Set();


const backupInputList = new Array(inputImageList.length);

const changeImageFn = (inputImage, order) => {

  const maxSize = 1024 * 1024 * 10;
  const file = inputImage.files[0];

  if(file == undefined){
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

  if(file.size > maxSize){
    alert("10MB 이하의 이미지를 선택해주세요");

    if(backupInputList[order] == undefined || backupInputList[order].value ==''){
      inputImage.value=""; 
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

    deleteOrder.delete(order);
  });

}

for(let i=0 ; i<inputImageList.length ; i++){

  inputImageList[i].addEventListener("change", e => {
    changeImageFn(e.target, i);
  })

  deleteImageList[i].addEventListener("click", () => {

    if(previewList[i].getAttribute("src") != null && previewList[i].getAttribute("src") != ""){
      
      if(orderList.includes(i)){

        deleteOrder.add(i);
      }
    }

    previewList[i].src = "";      
    inputImageList[i].value  = ""; 
    backupInputList[i].value = ""; 
  });
}

/* ********************************** 별점 ************************************** */

const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

printRatingResult(ratingResult, OriginReviewRating);
setInitialRating(ratingStars, OriginReviewRating);

function executeRating(stars, result) {
  const starClassActive = "rating__star fas fa-star";
  const starClassUnactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className.indexOf(starClassUnactive) !== -1) {
        printRatingResult(result, i + 1);
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        printRatingResult(result, i);
        for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
      }
    };
  });
}

function printRatingResult(result, num = OriginReviewRating) {
  result.value = num;
}

function setInitialRating(stars, rating) {
  const starClassActive = "rating__star fas fa-star";
  for (let i = 0; i < rating; i++) {
    stars[i].className = starClassActive;
  }
}

executeRating(ratingStars, ratingResult);

/* ***************************************************************************** */

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
  if(menuChecked.length == 0){
    alert("메뉴를 선택해주세요.");
    selectMenu.focus();
    e.preventDefault();
    return;
  }

  if(reviewRating.value === '0'){
    alert("별점을 입력해주세요");
    selectMenu.focus();
    e.preventDefault();
    return;
  }

  
  const hashChecked = document.querySelectorAll(".keyword-checkbox:checked");
  if(hashChecked.length == 0) {
    alert("해시태그를 선택해주세요.");
    reviewKeyword.focus();
    e.preventDefault();
    return;
  }

  if(reviewContent.value.trim().length == 0 ){
    alert("리뷰를 작성해주세요")
    e.preventDefault();
    return;
  }

  document.querySelector("[name='deleteOrder']").value = Array.from(deleteOrder);

});

/****************  메뉴 가격 합계  ****************/

document.addEventListener('DOMContentLoaded', function() {
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

  // 페이지 로드 시 이미 체크된 체크박스의 amount를 포함하여 total을 업데이트
  updateTotalAmount();

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalAmount);
  });

  document.getElementById('selectMenuButton').addEventListener('click', updateTotalAmount);
});


/* ************************************************************ */
for(let hash of hashList){
  keywords[hash.hashNo - 1].checked = true;
}
/* ************************************************************ */
for(let menu of menuList){
  // menuCheckbox[menu.menuNo - 1].checked = true;

  for(let box of menuCheckbox){
    if(box.value == menu.menuNo){
      box.checked = true;
    }
  }
}
/* ************************************************************ */