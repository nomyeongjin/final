const popupClose = document.querySelector("#popupClose");
const popupLayer = document.querySelector("#popupLayer");
const selectMenu = document.querySelector("#selectMenu");
const menuSection = document.querySelector("#menuSection");

popupClose.addEventListener("click", () => {
  menuSection.classList.add("popup-hidden");
});

selectMenu.addEventListener("click", ()=>{
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

  });

}

for(let i=0 ; i<inputImageList.length ; i++){

  inputImageList[i].addEventListener("change", e => {
    changeImageFn(e.target, i);
  })

  deleteImageList[i].addEventListener("click", () => {

    previewList[i].src = "";      
    inputImageList[i].value  = ""; 
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

function printRatingResult(result, num = 0) {
  result.textContent = num;
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
const selectMenuButton = document.querySelector("selectMenuButton");
const reviewForm = document.querySelector("#reviewForm");
const reviewContent = document.querySelector("#reviewContent");
const ul = document.querySelector("#keywords");

reviewForm.addEventListener("submit", e => {
  
  const menuChecked = document.querySelectorAll(".menu-checkbox:checked");
  if(menuChecked.length == 0){
    alert("메뉴를 선택해주세요.");
    selectMenu.focus();
    e.preventDefault();
    return;
  }
  
  const hashChecked = document.querySelectorAll(".keyword-checkbox:checked");
  if(hashChecked.length == 0) {
    alert("해시태그를 선택해주세요.");
    ul.focus();
    e.preventDefault();
    return;
  }

  if(reviewContent.value.trim().length == 0 ){
    alert("리뷰를 작성해주세요")
    e.preventDefault();
    return;
  }

});







