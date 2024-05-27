/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const StoreInfoContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역


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
