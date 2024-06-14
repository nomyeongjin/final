/* 가게 정보 수정 (휴무일) */

/* full Calendar 변수 생성 */
const calendarEl = document.createElement("div"); // 달력 넣어줄 div 생성
calendarEl.id = "calendar";

let calendar;


const selectWeekOff = () => {

   // 고정 휴무일 DB값 조회 
   fetch("/myPage/store/selectWeekOff", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(storeNo)
   })
   .then(resp => resp.json())
   .then(offList => {
      // console.log(offList);
      
      if(offList.isEmpty) return;

         for(let off of offList){
            
            // 기존 고정 휴무일 값과 li중 index 값이 일치시 -> 해당하는 li에 'checked' 클래스 추가
            document.querySelectorAll(".week-li").forEach( (item, index) => {
   
               if(parseInt(off.offWeek) === index) {
                  item.classList.add('checked');
               }
            })
   
            // 고정 휴무일 값 - 요일과 일치하는 경우 달력에 'week-off' 클래스 추가
            switch(parseInt(off.offWeek)) {
   
               case 0 : document.querySelectorAll(".fc-day-sun").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
   
               case 1 : document.querySelectorAll(".fc-day-mon").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
   
               case 2 : document.querySelectorAll(".fc-day-tue").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
   
               case 3 : document.querySelectorAll(".fc-day-wed").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
   
               case 4 : document.querySelectorAll(".fc-day-thu").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
   
               case 5 : document.querySelectorAll(".fc-day-fri").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
   
               case 6 : document.querySelectorAll(".fc-day-sat").forEach( (item) => {
                  item.classList.add('week-off');
               }); break;
            }
         }
   })

   // li 체크시 checked 클래스 toggle
   document.querySelectorAll(".week-li").forEach(item => {

      item.addEventListener("click", e => {
         e.target.classList.toggle("checked");
      });
   });
}




/**
 * full Calendar 생성하는 함수
 */
function calendar_rendering() {

   /*  DB에서 휴무일 목록 조회 */
   fetch("/myPage/store/calendarOffSelect", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(storeNo)
   })
   .then(resp => resp.json())
   .then(listMap => {
      // console.log(listMap);

      selectWeekOff();
      // 캘린더 생성
      calendar = new FullCalendar.Calendar(calendarEl, {

         locale: 'kr',
         timeZone: 'KST',
         initialView: 'dayGridMonth', // 홈페이지에서 다른 형태의 view를 확인할  수 있다.
         eventColor : '#E14C54',
         eventClick : function(info){ updatePopup(info) },
         dateClick: function(info){ insertPopup(info) },
         
         // 헤더
         headerToolbar: { left: 'addEventButton', center: 'title' },
         
         // 커스텀 버튼 설정에서 일정 추가 버튼 추가
         customButtons: {
            addEventButton: { // 추가한 버튼 설정
                  text : "일정 추가",  // 버튼 내용
                  click : function(){ createPopup(); }
            }
         },
         events: listMap // 화면 구현용 샘플 데이터 
      });
      calendar.render();
   })
   .catch( err => console.log(err));
}



/* 본문 영역, 서브메뉴 버튼 변수 선언 */
const StoreOffContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역

const dayoffBtn = document.querySelector("#dayoffBtn");



/**
 * (메뉴) 휴무일 버튼 클릭시 화면 구성
 */
dayoffBtn.addEventListener("click", () => {


   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(btn => { 

      btn.classList.remove('title-btn-checked');
   });
   dayoffBtn.classList.add('title-btn-checked'); // 선택된 요소 체크 클래스 추가

   StoreOffContainer.innerText = ""; // 본문 영역에 기존 내용 지우기
   
   /* 고정 휴무일 */
   // 고정 휴무일 타이틀 생성
   const offWeekSection = document.createElement("section");
   offWeekSection.classList.add("section-title");
   offWeekSection.innerHTML = "고정 휴무일";

   const weekOffFrm = document.createElement("form"); // div 생성
   weekOffFrm.id = "off-container";

   const ul = document.createElement("ul"); // ul 생성
   ul.classList.add("week-row");
   // 


   // 각 요일 li 생성 
   const weekList = ['일', '월', '화', '수', '목', '금', '토'];

   weekList.forEach( (week, index) => {

      const li = document.createElement("li");
      li.classList.add("week-li");
      li.innerText = week;
      li.setAttribute('value', index);
      ul.append(li);
   })

   selectWeekOff();

   // 버튼 생성
   const weekBtn = document.createElement("button");
   weekBtn.classList.add("update-btn");
   weekBtn.type = "button";
   weekBtn.id = "offUpdateBtn";
   weekBtn.innerText = "고정 휴무일 수정";

   weekOffFrm.append(ul, weekBtn);

   /**
    * (버튼) 고정 휴무일 폼 제출
    */
   weekBtn.addEventListener("click", () => {


      console.log("폼제출");
      const weekList = document.querySelectorAll(".checked"); // 선택된 li 요소 얻어오기
      const dataList = []; // 값 하나로 묶을 배열 생성

      for(const li of weekList) {

         data = {
            "offWeek" : li.value,
            "storeNo" : storeNo
         };

         dataList.push(data);
      }
      // console.log(dataList);

      fetch("/myPage/store/insertOffWeek", {
         method : "POST",
         headers : {"content-Type" : "application/json"},
         body : JSON.stringify(dataList)
      })
      .then(resp => resp.json())
      .then(result => {
         
         console.log(result);

         if(result > 0) {
            alert("고정 휴무일이 변경되었습니다.");
            calendar_rendering();
         }
      })
      .catch( err => console.log(err));
   });
   
   // --------------------------------

   // 지정 휴무일
   const offDaySection = document.createElement("section");
   offDaySection.classList.add("section-title");
   offDaySection.innerHTML = "지정 휴무일";

   const offDayEditFrm = document.createElement("form"); // form 생성
   offDayEditFrm.id = "offDayEditFrm";

   const dayOffContainer = document.createElement("div"); // div 생성
   dayOffContainer.classList.add("off-container");
   
   
   dayOffContainer.append(calendarEl);
   offDayEditFrm.append(dayOffContainer);
   
   // 마이페이지 본문 컨테이너에 각 휴무일 section, form 추가
   StoreOffContainer.append(offWeekSection, weekOffFrm, offDaySection, offDayEditFrm);
   calendar_rendering() // 달력 생성 함수 호출(calendarEl 내부에 생성)
   
});

// ----------------

const popupLayer = document.querySelector("#popupLayer");

let count = 0; // 등록된 휴무 갯수
let popupCheck = 0; // 등록된 휴무 갯수

/**
 * 일정 등록 팝업창 생성 
 */
let addBtn = document.querySelector("#addBtn"); //  팝업창 - 일정 등록 버튼

const createPopup = (info) => {
   
   const popupFrm = document.createElement("form");
   popupFrm.classList.add("popup-container");

   const headRow = document.createElement("div"); // 휴무일 등록
   headRow.classList.add("popup-title");
   headRow.innerText = "휴무일 등록";

   const titleRow = document.createElement("div"); // 일정명
   titleRow.classList.add("popup-row");
   titleRow.innerText = "일정명 : ";
   
   const title = document.createElement("input"); 
   title.setAttribute("type", "text");
   title.id = "title";
   title.focus();
   titleRow.append(title);
   
   const startRow = document.createElement("div"); // 시작 일자
   startRow.classList.add("popup-row");
   startRow.innerText = "시작 일자 : ";

   const start = document.createElement("input"); 
   start.setAttribute("type", "date");
   start.id = "start";
   if(info != null) start.value = info.dateStr;
   startRow.append(start);

   const endRow = document.createElement("div"); // 종료 일자
   endRow.classList.add("popup-row");
   endRow.innerText = "종료 일자 : ";

   const end = document.createElement("input"); 
   end.setAttribute("type", "date");
   end.id = "end";
   if(info != null) end.value = info.dateStr;
   endRow.append(end);

   const btnRow = document.createElement("div"); // 버튼 영역
   btnRow.classList.add("popup-btn-row");

   addBtn = document.createElement("button");
   addBtn.classList.add("popup-btn");
   addBtn.type = "button";
   addBtn.id = "addBtn";
   addBtn.innerText = "등록";
   
   const cancelBtn = document.createElement("button");
   cancelBtn.type = "button";
   cancelBtn.classList.add("popup-btn");
   cancelBtn.innerText = "취소";

   btnRow.append(addBtn, cancelBtn);
   popupFrm.append(headRow, titleRow, startRow, endRow, btnRow);
   StoreOffContainer.append(popupFrm);

   /**
    * (버튼) 취소 - 팝업창
    */
   cancelBtn.addEventListener("click", () => {popupFrm.classList.add("blind");})

   // 팝업창 외 다른 클릭 이벤트 방지
};

/**
 * 일정 등록하는 팝업창 생성 
 */

const insertPopup = (info) => {

   const data = {
      "storeNo" : storeNo,
      "offDayStart" : info.dateStr
   };

   fetch("/myPage/store/calendarOffCheck", {
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify(data)
   })
   .then(resp => resp.json())
   .then(count => {

      if(count > 0) {
         alert("휴무일 중복 등록 불가");
         return;
      }

      createPopup(info); // 팝업창 생성

      /**
       *  (버튼) 휴무 일정 등록 - 팝업창
       */
      document.querySelector("#addBtn").addEventListener("click", () => {
   
         const off = {
            "storeNo" : storeNo,
            "offDayTitle" : title.value,
            "offDayStart" : start.value,
            "offDayEnd" : end.value
         };
         
   
         fetch("/myPage/store/calendarOffInsert", {
            method : "POST",
            headers : {"content-Type" : "application/json"},
            body : JSON.stringify(off)
         })
         .then(resp => resp.json())
         .then(result => {
   
            if(result > 0) {
               alert("휴무 일정이 등록되었습니다.");
               document.querySelector(".popup-container").classList.add("blind");
               calendar_rendering();
            }
            else{
               alert("휴무 일정 등록 실패되었습니다.");
            }
         })
      }); // 일정 등록 클릭
   })
};
   



/**
 * 휴무일 수정 
 * @param {*} info 
 */
const updatePopup = (info) => {

   console.log(info.event.id);
   console.log(info.event.start);
   console.log(info.event.end);
   console.log(info.event.allDay);

   const popupFrm = document.createElement("form");
   popupFrm.classList.add("popup-container");

   const headRow = document.createElement("div"); // 휴무일 수정
   headRow.classList.add("popup-title");
   headRow.innerText = "휴무일 수정";

   const titleRow = document.createElement("div"); // 일정명
   titleRow.classList.add("popup-row");
   titleRow.innerText = "일정명 : ";

   const title = document.createElement("input"); 
   title.setAttribute("type", "text");
   title.id = "title";
   title.value = info.event.title;
   titleRow.append(title);

   const startRow = document.createElement("div"); // 시작 일자
   startRow.classList.add("popup-row");
   startRow.innerText = "시작 일자 : ";

   const start = document.createElement("input"); 
   start.setAttribute("type", "date");
   start.id = "start";
   start.value = info.event.start.toISOString().substring(0,10).replace(/\-/g, '-');
   startRow.append(start);

   const endRow = document.createElement("div"); // 종료 일자
   endRow.classList.add("popup-row");
   endRow.innerText = "종료 일자 : ";

   const end = document.createElement("input"); 
   end.setAttribute("type", "date");
   end.id = "end";

   if (info.event.end == null) end.value = info.event.start.toISOString().substring(0,10).replace(/\-/g, '-')
   else end.value = info.event.end.toISOString().substring(0,10).replace(/\-/g, '-');
   endRow.append(end);

   const btnRow = document.createElement("div"); // 버튼 영역
   btnRow.classList.add("popup-btn-row");

   deleteBtn = document.createElement("button");
   deleteBtn.classList.add("popup-btn");
   deleteBtn.type = "button";
   deleteBtn.id = "deleteBtn";
   deleteBtn.innerText = "삭제";

   updateBtn = document.createElement("button");
   updateBtn.classList.add("popup-btn");
   updateBtn.type = "button";
   updateBtn.id = "updateBtn";
   updateBtn.innerText = "변경";
   btnRow.append(deleteBtn, updateBtn);

   const cancelBtn = document.createElement("button");
   cancelBtn.type = "button";
   cancelBtn.classList.add("popup-btn");
   cancelBtn.innerText = "취소";

   btnRow.append(cancelBtn);
   popupFrm.append(headRow, titleRow, startRow, endRow, btnRow);
   StoreOffContainer.append(popupFrm);
   //-------

   /**
    * (버튼) 취소 - 팝업창
    */
   cancelBtn.addEventListener("click", () => {popupFrm.classList.add("blind");})


   // // 중복 휴무 체크
   // const data = {
   //    "storeNo" : storeNo,
   //    "offDayStart" : start,
   //    "offDayEnd" : end
   // };

   // offCheck(data); // 중복 휴무 체크


   /**
    *  (버튼) 휴무 일정 변경 - 팝업창
    */
   document.querySelector("#updateBtn").addEventListener("click", () => {

      const off = {
         "storeNo" : storeNo,
         "offDayNo" : info.event.id,
         "offDayTitle" : title.value,
         "offDayStart" : start.value,
         "offDayEnd" : end.value
      };

      fetch("/myPage/store/calendaroffUpdate", {
         method : "POST",
         headers : {"content-Type" : "application/json"},
         body : JSON.stringify(off)
      })
      .then(resp => resp.json())
      .then(result => {

         if(result > 0) {
            alert("일정이 수정되었습니다.");
            popupFrm.classList.add("blind");
            calendar_rendering();
         }
         else{
            alert("일정 수정이 실패되었습니다.");
         }

      }).catch( err => console.log(err));
   });

   /**
    *  (버튼) 삭제 일정 변경 - 팝업창
    */
   document.querySelector("#deleteBtn").addEventListener("click", () => {

      fetch("/myPage/store/calendaroffDelete", {
         method : "POST",
         headers : {"content-Type" : "application/json"},
         body : JSON.stringify(info.event.id)
      })
      .then(resp => resp.json())
      .then(result => {

         if(result > 0) {
            alert("일정이 삭제되었습니다.");
            popupFrm.classList.add("blind");
            calendar_rendering();
            
         }
         else{
            alert("일정 삭제가 실패되었습니다.");
         }
      }).catch( err => console.log(err));
   });

}



