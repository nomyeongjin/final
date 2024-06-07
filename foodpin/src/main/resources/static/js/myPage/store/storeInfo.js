/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const StoreInfoContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역

const storeEditFrm = document.querySelector("#storeEditFrm"); // form





/**
 *  (버튼) checked 클래스 toggle
 */
const categoryCheck = (btn) => {

   btn.addEventListener("click", () => {
      btn.classList.toggle("checked");
   });
}; // categoryCheck

/**
 * (버튼) x 클릭시 이미지 삭제
 */
const storeImgDel = () => {


}

// -1 : 초기 상태(변화 없음)
//   0: 프로필 이미지 삭제
//  1 : 새 이미지 선택 선택
let imgStatus = -1;
let backupInput; // 요소 복제해서 백업하는 변수

/* 가게 이미지 */
const storeImg = document.querySelector("#storeImg"); // img
let storeImgInput = document.querySelector("#storeImgInput"); // input

/**
 * 가게 이미지 변경
 * @param {*} e 
 */
const changeImageFn = e => {

   const maxSize =  1024 * 1024 * 5; // 이미지 최대 업로드 사이즈 지정
   const file = e.target.files[0]; // 업로드 된 파일 정보

   console.log(file);

   // 파일 업로드 취소 + 백업본 (추가예정)


   /* 선택된 이미지 미리보기 */
   const reader = new FileReader();
   reader.readAsDataURL(file);
   
   /**
    * 업로드 이미지 파일 읽기 완료시 미리보기
    */
   reader.addEventListener("load", e => {
   
      const url = e.target.result;
      storeImg.setAttribute("src", url);
   
      imgStatus = 1; // 1 <- 새 이미지 선택됨
   
      backupInput = imageInput.cloneNode(true);
   })

   // console.log(storeNo);
   
}

// imageInput.addEventListener("change", changeImageFn);

storeImgInput.addEventListener("change", changeImageFn);




/* ---------------------- */
 document.addEventListener('DOMContentLoaded', () => {

   /**
    * 카테고리 조회
    */
   const checkCategory = () => {

      const ctgBtnList = document.querySelectorAll(".category-btn"); // 카테고리 버튼

      // 카테고리 조회
      fetch("/myPage/store/selectCategory?storeNo=" + storeNo)
      .then(resp => resp.json())
      .then(categoryList => {
   
         categoryList.forEach(ctg => {

            ctgBtnList.forEach(btn => {

               // 기존 저장된 카테고리인 경우 체크 표시
               if(btn.value == ctg.categoryCode) btn.classList.add('checked');

               categoryCheck(btn); // 클릭시 버튼 토글

            }); // ctgBtnList.forEach
         }); // categoryList.forEach

      }).catch( err => console.log(err)); // fetch (카테고리 조회)
   } // checkCategory

   checkCategory(); // 저장된 카테고리 조회 + 해당 카테고리에 체크 클래스 추가 

   //-----------
   // 이미지 삭제
   document.querySelector(".store-img-del").addEventListener("click", () => {

      document.querySelector(".storeInfo-img-container").classList.remove("img-ari"); // 테두리 없애는 클래스 추가

      const storeImg = document.querySelector("#storeImg"); // img
      storeImg.setAttribute("src", '');
      storeImg.classList.add('hidden');
      console.log(storeImg);

      // document.querySelector(".store-img-del").classList.add('hidden'); // x

      imgStatus = 0; // 이미지 여부 체크 0
      
      console.log("이미지 삭제" + imgStatus);
   });

   
}); // DOMContentLoaded


// // 이미지 삭제
// document.querySelector(".store-img-del").addEventListener("click", () => {

//    document.querySelector(".storeInfo-img-container").classList.remove("img-ari"); // 테두리 없애는 클래스 추가

//    const storeImg = document.querySelector("#storeImg"); // img
//    storeImg.setAttribute("src", '');
//    storeImg.classList.add('hidden');
//    console.log(storeImg);

//    // document.querySelector(".store-img-del").classList.add('hidden'); // x

//    imgStatus = 0; // 이미지 여부 체크 0
   
//    console.log("이미지 삭제" + imgStatus);
// });








   /* -------------------------- */
   /* 예약 신청 허용/미허용 선택 */
   /* -------------------------- */

   const statusCheck  = document.querySelector("label[for='storeStatus']");
   const storeStatus = document.querySelector("#storeStatus"); // checkbox

   /** 예약 신청 여부 선택시
    * 내용 변경
    */
   storeStatus.addEventListener("change", () => {

      if(storeStatus.checked) {
         statusCheck.innerText = "예약 허용";
         storeStatus.value = "Y";
      }
      else {
         statusCheck.innerText = "예약 미허용";
         storeStatus.value = "N";
      }
      console.log(storeStatus.value);
});


/* ------------------ */
/* 영업시간 종일 선택 */
/* ------------------ */

const openCloseArea = document.querySelector("#openCloseArea"); // input 감싸는 div 영역

const openHour = document.querySelector("#openHour"); // input- 영업시간 시작 / 종료
const closeHour = document.querySelector("#closeHour");

const openClose = document.querySelector("#openClose"); // 종일 선택하는 checkbox

let preOpenHour = "";  // 종일 선택하기 전 시간 임시저장하는 변수
let preCloseHour = "";


/** 영업시간 종일 선택시
 * input 값 '00:00' 으로 변경 + .blind 클래스 추가
 */
openClose.addEventListener("change", () => {

   if(openClose.checked) { // 종일 선택

      preOpenHour = openHour.value; 
      preCloseHour = closeHour.value;

      openHour.setAttribute('value', '00:00');
      closeHour.setAttribute('value', '00:00');

      openCloseArea.classList.add('blind');

   } else { // 선택 해제

      openHour.setAttribute('value', preOpenHour);
      closeHour.setAttribute('value', preCloseHour);

      openCloseArea.classList.remove('blind');
   }
});

/* ---------------------- */
/* 브레이크타임 없음 선택 */
/* ---------------------- */
const breaktimeArea = document.querySelector("#breaktimeArea"); // input 감싸는 div 영역

const breaktimeStart = document.querySelector("#breaktimeStart"); // input- 브레이크타임 시작 / 종료
const breaktimeEnd = document.querySelector("#breaktimeEnd");

const breaktime = document.querySelector("#breaktime"); // 없음 선택하는 checkbox

let preBreaktimeStart = "";  // 없음 선택하기 전 시간 임시저장하는 변수
let preBreaktimeEnd = "";

/** 브레이크타임 없음 선택시
 * input 값 '00:00' 으로 변경 + .blind 클래스 추가
 */
breaktime.addEventListener("change", () => {

   if(breaktime.checked) { // 없음 선택

      preBreaktimeStart = breaktimeStart.value; 
      preBreaktimeEnd = breaktimeEnd.value;

      breaktimeStart.setAttribute('value', '00:00');
      breaktimeEnd.setAttribute('value', '00:00');

      breaktimeArea.classList.add('blind');

   } else { // 선택 해제

      breaktimeStart.setAttribute('value', preBreaktimeStart);
      breaktimeEnd.setAttribute('value', preBreaktimeEnd);

      breaktimeArea.classList.remove('blind');
   }
})


