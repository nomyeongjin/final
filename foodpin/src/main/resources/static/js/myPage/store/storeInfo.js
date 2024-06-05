/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const StoreInfoContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역

const storeEditFrm = document.querySelector("#storeEditFrm"); // form



/* 가게 이미지 */

const storeImg = document.querySelector("#storeImg");
let imageInput = document.querySelector("#imageInput"); 

let imgStatus = -1; // 이미지 기록 상태 변수
let backupInput; // 


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
   
      imgStatus = 1; // 이미지 업로드 상태 기록
   
      backupInput = imageInput.cloneNode(true);
   })

   // console.log(storeNo);
   
}

imageInput.addEventListener("change", changeImageFn);





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


