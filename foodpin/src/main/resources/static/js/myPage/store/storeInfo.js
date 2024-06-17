/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const StoreInfoContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역
const storeEditFrm = document.querySelector("#storeEditFrm"); // form
let imgStatus = document.querySelector("#imgStatus"); // form

//-------------- 가게 이미지 --------------


let backupInput; // 요소 복제해서 백업하는 변수

/**
 * (버튼) x 클릭시 이미지 삭제
 */
const storeImgDel = () => {
   document.querySelector(".storeInfo-img-container").classList.remove("img-ari"); // 테두리 없애는 클래스 추가

   const storeImg = document.querySelector("#storeImg"); // img
   storeImg.setAttribute("src", '');
   storeImg.classList.add('hidden');
   // console.log(storeImg);

   document.querySelector(".store-img-del").classList.add('hidden'); // x 버튼
   document.querySelector("#storeImgLabel").classList.remove('hidden'); // input label

   imgStatus.value = "0"; // 이미지 삭제됨
} // storeImgDel

// x 버튼 클릭시 이미지 삭제
document.querySelector(".store-img-del").addEventListener("click", () => {
   
   storeImgDel();
});


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
      document.querySelector("#storeImg").setAttribute("src", url);

      document.querySelector("#storeImg").classList.remove('hidden'); // img
      document.querySelector(".store-img-del").classList.remove('hidden'); // x 버튼
      document.querySelector("#storeImgLabel").classList.add('hidden'); // input label
   
      imgStatus.value = "1"; // 이미지 변경됨
   
      backupInput = storeImgInput.cloneNode(true);

   })

   // console.log(storeNo);
   
}
document.querySelector("#storeImgInput").addEventListener("change", changeImageFn);

//-------------- 예약 신청 허용/미허용 선택 --------------

// 예약 신청 여부 선택 +  토글
const checkStoreStatus = () => {

   document.querySelectorAll(".store-status-btn").forEach(btn => {
   
      // 저장된 값에 체크
      if(storeStatus == btn.value) btn.classList.add("checked");
   
      // 토글
      btn.addEventListener("click", e => {
         document.querySelectorAll(".store-status-btn").forEach(button => {
            button.classList.remove("checked");
         });
   
         e.target.classList.add("checked");
      });
   });
};


//-------------- 영업시간 종일 선택 --------------

const checkBoxOpenClose = () => {

   const openCloseArea = document.querySelector("#openCloseArea"); // input 감싸는 div 영역
   
   let preOpenHour = "";  // 종일 선택하기 전 시간 임시저장하는 변수
   let preCloseHour = "";
   
   /** 영업시간 종일 선택시
    * input 값 '00:00' 으로 변경 + .blind 클래스 추가
    */
   document.querySelector("#openClose").addEventListener("change", () => {
   
      const openHour = document.querySelector("#openHour"); // input- 영업시간 시작 / 종료
      const closeHour = document.querySelector("#closeHour");
      
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
};

/**
 * (체크박스) 브레이크타임 없음 선택
 */
const checkBoxBreak = () => {

   const breaktimeArea = document.querySelector("#breaktimeArea"); // input 감싸는 div 영역
   
   const breaktimeStart = document.querySelector("#breaktimeStart"); // input- 브레이크타임 시작 / 종료
   const breaktimeEnd = document.querySelector("#breaktimeEnd");
   
   let preBreaktimeStart = "";  // 없음 선택하기 전 시간 임시저장하는 변수
   let preBreaktimeEnd = "";
   
   /** 브레이크타임 없음 선택시
    * input 값 '00:00' 으로 변경 + .blind 클래스 추가
    */
   document.querySelector("#breaktime").addEventListener("change", e => {
   
      if(e.target.checked) { // 없음 선택
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
   });
} // checkBoxBreak





//-------------- 카테고리 --------------

/**
 * 저장된 카테고리 조회 + 해당 카테고리에 체크 클래스 추가 
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
         }); // ctgBtnList.forEach
      }); // categoryList.forEach
   }).catch( err => console.log(err)); // fetch (카테고리 조회)
} // checkCategory

/**
 * 카테고리 체크시 클래스 토글
 */
const toggleCategory = () => {

   document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", e => {
         e.target.classList.toggle("checked");

      });
   });
}




//-------------- 가게 소개 --------------







/* ----------- DOMContentLoaded ----------- */
document.addEventListener('DOMContentLoaded', () => {

   checkCategory(); // 저장된 카테고리 조회 + 체크
   toggleCategory(); // 카테고리 선택시 클래스 토글


}); // DOMContentLoaded

// --------------------------
/**
 * (메뉴) 가게 정보
 */
const infoBtn = document.querySelector("#infoBtn");
infoBtn.addEventListener("click", () => {

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(btn => { 

      btn.classList.remove('title-btn-checked');
   });
   infoBtn.classList.add('title-btn-checked'); // 선택된 요소 체크 클래스 추가

   StoreInfoContainer.innerHTML = "";


   fetch("/myPage/store/storeInfoJs?storeNo=" + storeNo)
   .then(resp => resp.json())
   .then(store => {

      // const store = map.get(store);

      const storeEditFrm = document.createElement("form"); // storeEditFrm
      storeEditFrm.id = "storeEditFrm";
      storeEditFrm.setAttribute('enctype', 'multipart/form-data');

      // 이미지
      const storeImgContainer = document.createElement("div"); // storeImgContainer
      storeImgContainer.classList.add("storeInfo-img-container");

      const storeImg = document.createElement("img"); // storeImg
      storeImg.id = "storeImg";

      const storeImgDel = document.createElement("i"); // x
      storeImgDel.classList.add('fa-solid', 'fa-xmark', 'store-img-del');

      const storeImgLabel = document.createElement("label"); // label
      storeImgLabel.setAttribute('for', 'storeImgInput');
      storeImgLabel.id = "storeImgLabel";

      const iconPic = document.createElement("i"); // i (사진)
      iconPic.classList.add('fa-regular', 'fa-image');

      const iconPlus = document.createElement("i"); // i (+)
      iconPlus.classList.add('fa-solid', 'fa-plus');

      const storeImgInput = document.createElement("input");
      storeImgInput.setAttribute('name', 'image');
      storeImgInput.setAttribute('accept', 'image/*');
      storeImgInput.classList.add('hidden');
      storeImgInput.type = "file";
      storeImgInput.id = "storeImgInput";

      storeImgLabel.append(iconPic, iconPlus);
      storeImgContainer.append(storeImg, storeImgDel, storeImgLabel, storeImgInput);

      // 이미지외 내용
      const storeInfoContainer = document.createElement("div"); // storeInfoContainer
      storeInfoContainer.classList.add("storeInfo-container");

      arr = ['storeName', 'storeTel', 'storeLocation'];

      arr.forEach( (el, index) => {

         const row = document.createElement("div"); // non-edit-area-row
         row.classList.add("non-edit-area-row");

         const label = document.createElement("label"); // label 상호명
         label.setAttribute('for', el);

         const div = document.createElement("div"); // div
   
         if(index < 2) {
            const input = document.createElement("input"); // input
            input.id = el
   
            if (index == 0) label.innerText = "상호명 :";
            if (index == 1) label.innerText = "전화번호 :";

            div.append(input);
         }

         if (index == 2) {
            label.innerText = "가게 주소 :";

            const input1 = document.createElement("input"); // input
            input1.id = "address";

            const input2 = document.createElement("input"); // input
            input2.id = "detailAddress";

            div.append(input1, input2);
         }

         row.append(label, div);
         storeInfoContainer.append(row);
      });

      // 예약 오픈
      const rowStatus = document.createElement("div"); 
      rowStatus.classList.add("edit-area-row");

      const labelStatus = document.createElement("label"); // label 
      labelStatus.innerText = "예약 신청 받는 여부 : ";

      const divStatus = document.createElement("div"); // div
      divStatus.classList.add("input-row");
   
      const inputStuatusY = document.createElement("button"); // button Y
      inputStuatusY.classList.add("store-status-btn");
      inputStuatusY.value = "Y";
      inputStuatusY.type = "button";
      inputStuatusY.innerText = "받음";

      const inputStuatusN = document.createElement("button"); // button N
      inputStuatusN.classList.add("store-status-btn");
      inputStuatusN.value = "N";
      inputStuatusN.type = "button";
      inputStuatusN.innerText = "받지 않음";

      divStatus.append(inputStuatusY, inputStuatusN);
      rowStatus.append(labelStatus, divStatus);

      // 예약 가능
      const rowMax = document.createElement("div"); // Max
      rowMax.classList.add("edit-area-row");

      const labelMax = document.createElement("label"); // label 
      labelMax.innerText = "예약 가능 : ";
      labelMax.id = "labelstoreMax";

      const divMax = document.createElement("div"); // div
      divMax.classList.add("input-row");
   
      const storeMaxNumber = document.createElement("input"); // input
      storeMaxNumber.id = "storeMaxNumber";
      storeMaxNumber.classList.add("s-input");

      const spanMaxNumber = document.createElement("span");
      spanMaxNumber.innerText = "인";
      storeMaxNumber.append(spanMaxNumber);

      const storeMaxTable = document.createElement("input"); // input
      storeMaxTable.id = "storeMaxTable";
      storeMaxTable.classList.add("s-input");

      const spanMaxTable = document.createElement("span");
      spanMaxTable.innerText = "테이블";
      spanMaxTable.append(storeMaxTable);

      divMax.append(storeMaxNumber, spanMaxNumber, storeMaxTable, spanMaxTable);
      rowMax.append(labelMax, divMax);

      // 영업시간 
      const rowHour = document.createElement("div"); // Hour
      rowHour.classList.add("edit-area-row");

      const labelHour = document.createElement("label"); // label 
      labelHour.innerText = "영업시간 : ";

      const divHour = document.createElement("div"); // div
      divHour.id = "openCloseArea";

      const inputRowHour = document.createElement("div"); // div
      inputRowHour.classList.add("input-row");

      const openHour = document.createElement("input"); // time
      openHour.setAttribute('name', 'openHour');
      openHour.type = "time";
      openHour.id = "openHour";

      const spanHour = document.createElement("span");
      spanHour.innerText = "~";

      const closeHour = document.createElement("input"); // time
      closeHour.setAttribute('name', 'closeHour');
      closeHour.type = "time";
      closeHour.id = "closeHour";

      const openClose = document.createElement("input"); // input 종일
      openClose.id = "openClose";
      openClose.type = "checkbox";

      const labelopenClose = document.createElement("label"); // label 
      labelopenClose.setAttribute('for', 'openClose');
      labelopenClose.innerText = "종일";

      divHour.append(openHour, spanHour, closeHour);
      inputRowHour.append(divHour, openClose, labelopenClose);
      rowHour.append(labelHour, inputRowHour);

      // 브레이크 타임
      const rowBreak = document.createElement("div"); // Breack
      rowBreak.classList.add("edit-area-row");

      const labelBreak = document.createElement("label"); // label 
      labelBreak.innerText = "브레이크 타임 : ";

      const inputRowBreak = document.createElement("div"); // div
      inputRowBreak.classList.add("input-row");

      const divBreak = document.createElement("div"); // div
      divBreak.id = "breaktimeArea";

      const breaktimeStart = document.createElement("input"); // time
      breaktimeStart.setAttribute('name', 'breaktimeStart');
      breaktimeStart.type = "time";
      breaktimeStart.id = "breaktimeStart";

      const spanBreak = document.createElement("span");
      spanBreak.innerText = "~";

      const breaktimeEnd = document.createElement("input"); // time
      breaktimeEnd.setAttribute('name', 'breaktimeEnd');
      breaktimeEnd.type = "time";
      breaktimeEnd.id = "breaktimeEnd";

      const breaktime = document.createElement("input"); // input 종일
      breaktime.id = "breaktime";
      breaktime.type = "checkbox";

      const labelCheckBreak = document.createElement("label"); // label 
      labelCheckBreak.setAttribute('for', 'breaktime');
      labelCheckBreak.innerText = "없음";

      divBreak.append(breaktimeStart, spanBreak, breaktimeEnd);
      inputRowBreak.append(divBreak, breaktime, labelCheckBreak);
      rowBreak.append(labelBreak, inputRowBreak);

      // 카테고리 조회 + 생성
      const categoryArea = document.createElement("div"); // Breack
      categoryArea.classList.add("category-area");

      const labelCategory = document.createElement("label"); // label 
      labelCategory.innerText = "카테고리";

      const categoryRow = document.createElement("div"); // div
      categoryRow.classList.add("category-row");
      fetch("/myPage/store/selectCategoryAll")
      .then(resp => resp.json())
      .then(categorys => {

         categorys.forEach(ctg => {
            const ctgBtn = document.createElement("button");
            ctgBtn.classList.add("category-btn");
            ctgBtn.type = "button";
            ctgBtn.innerText = ctg.categoryTitle;
            ctgBtn.value = ctg.categoryCode;

            categoryRow.append(ctgBtn);
         }); // categorys.forEach

         categoryArea.append(labelCategory, categoryRow);

         checkCategory(); // 저장된 카테고리 체크
         toggleCategory(); // 체크시 토글

         // categoryCheck(); // 토글
      }).catch( err => console.log(err)); // fetch (카테고리 조회)

      // 가게 소개
      const storeInfo = document.createElement("textarea");
      storeInfo.setAttribute('name', 'storeInfo');
      storeInfo.setAttribute('rows', '10');
      storeInfo.id = "storeInfo";

      const storeInfoEditBtn = document.createElement("button");
      storeInfoEditBtn.type = "button";
      storeInfoEditBtn.classList.add("update-btn");
      storeInfoEditBtn.innerText = "수정";

      // 정보 넣기
      storeInfoContainer.append(rowStatus, rowMax, rowHour, rowBreak, categoryArea);
      storeEditFrm.append(storeImgContainer, storeInfoContainer, storeInfo, storeInfoEditBtn);
      StoreInfoContainer.append(storeEditFrm);
      
      // 이미지 없는 경우
      if(store.storeImg == null) {
         storeImg.classList.add("hidden"); // img
         storeImgDel.classList.add("hidden"); // x

      } else {
         storeImgContainer.classList.add('img-ari');
         storeImg.src = store.storeImg;
         storeImgLabel.classList.add("hidden"); // label
         storeImgDel.classList.remove("hidden"); // x
      }

      document.querySelector("#storeName").value = store.storeName;
      document.querySelector("#storeTel").value = store.storeTel;
      document.querySelector("#address").value = store.storeLocation.split('^^^')[1];
      document.querySelector("#detailAddress").value = store.storeLocation.split('^^^')[2];

      // 예약 정보
      document.querySelectorAll(".store-status-btn").forEach(btn => {
         if(btn.value == store.storeStatus) btn.classList.add("checked");

         checkStoreStatus();
      });

      storeMaxNumber.value = store.storeMaxNumber;
      storeMaxTable.value = store.storeMaxTable;

      openHour.value = store.openHour;
      closeHour.value = store.closeHour;

      breaktimeStart.value = store.breaktimeStart;
      breaktimeEnd.value = store.breaktimeEnd;
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

      document.querySelector("#storeInfo").value = store.storeInfo;
      // 예약 신청 여부 선택 토글
      document.querySelectorAll(".store-status-btn").forEach(btn => {
         btn.addEventListener("click", e => {

            document.querySelectorAll(".store-status-btn").forEach(button => {

               button.classList.remove("checked");
            });
            e.target.classList.add("checked");
         });
      });

      checkBoxBreak();

      //---
      // x 버튼 클릭시 이미지 삭제
      storeImgDel.addEventListener("click", () => { 
         document.querySelector(".storeInfo-img-container").classList.remove("img-ari"); // 테두리 없애는 클래스 추가

         const storeImg = document.querySelector("#storeImg"); // img
         storeImg.setAttribute("src", '');
         storeImg.classList.add('hidden');
         // console.log(storeImg);
      
         document.querySelector(".store-img-del").classList.add('hidden'); // x 버튼
         document.querySelector("#storeImgLabel").classList.remove('hidden'); // input label
      
         imgStatus = 0; // 이미지 여부 체크 0 (삭제)
      });

      document.querySelector("#storeImgInput").addEventListener("change", changeImageFn);


         
      /**
       * (버튼) 가게 정보 수정
       */

      storeInfoEditBtn.addEventListener("click", e => {

         let storeStatus = "";

         document.querySelectorAll(".store-status-btn").forEach(btn => {
            if(btn.classList.contains("checked")) storeStatus = btn.value;
         });
         // console.log(status);

         let categorys = "";
         let str = "";
         console.log(storeStatus);

         document.querySelectorAll(".category-btn").forEach(btn => {
      
            if(btn.classList.contains("checked")) {
               str = btn.value + "/";
               categorys += str;
            } 
         }); // (".category-btn").forEach
         console.log(categorys);

         // 유효성 검사
         if(categorys.length < 1){
            alert("하나 이상의 카테고리를 선택해주세요.");
            e.preventDefault();
            return;
         }
      
         // 최대 인원수
         const storeMaxNumber = document.querySelector("#storeMaxNumber");

         console.log(storeMaxNumber);
         console.log(storeMaxNumber.value);
         if(storeMaxNumber.value.length === 0) {
            alert("한 테이블당 착석 가능한 최대 인원을 입력해주세요.");
            e.preventDefault();
            return;
         } else if(storeMaxNumber.value < 1) {
            alert("한 테이블당 최소 1명 이상의 인원만 입력이 가능합니다.");
            e.preventDefault();
            return;
         }
      
         // 테이블수
         const storeMaxTable = document.querySelector("#storeMaxTable");
         if(storeMaxTable.value.length === 0 || storeMaxTable.value < 1) {
            alert("예약 가능한 가게의 테이블 수를 입력해주세요.");
            e.preventDefault();
            return;
         } else if(storeMaxNumber.value < 1) {
            alert("가게의 테이블 수는 최소 1개 이상만 입력이 가능합니다.");
            e.preventDefault();
            return;
         }
      
         // 영업시간
         const openHour = document.querySelector("#openHour").value;
         const closeHour = document.querySelector("#closeHour").value;
      
         if(openHour.trim().length === 0 || closeHour.trim().length === 0) {
            alert("영업 시간을 입력해주세요.");
            e.preventDefault();
            return;
         }
      
         if(categorys.isEmpty) {
            alert("하나 이상의 카테고리를 선택해주세요.");
         }
      
         const storeInfo = document.querySelector("#storeInfo").value;
         if(storeInfo.trim().length === 0) {
            alert("가게 소개를 입력해주세요.");
         }

         // 폼데이터 생성 + 추가 
         let formData = new FormData();

         formData.append('storeNo', storeNo);
         formData.append('image',document.querySelector("#storeImgInput").files[0]);
         formData.append('imgStatus', imgStatus); // 이미지 변경 상태
         formData.append('openHour', document.querySelector("#openHour").value);
         formData.append('closeHour', document.querySelector("#closeHour").value);
         formData.append('breaktimeStart', document.querySelector("#breaktimeStart").value);
         formData.append('breaktimeEnd', document.querySelector("#breaktimeEnd").value);
         formData.append('categorys', categorys);
         formData.append('storeInfo', document.querySelector("#storeInfo").value);

         fetch("/myPage/store/storeInfoUpdateJs", {
            method : "POST",
            headers : {},
            body : formData
         })
         .then(resp => resp.text())
         .then(result => {
            console.log(result);
         }).catch( err => console.log(err));
      });
   })
});


/**
 * (버튼) 가게 정보 수정
 */
document.querySelector("#storeEditFrm").addEventListener("submit", e => {

   const storeStatustInput = document.querySelector("input[name='storeStatus']");

   document.querySelectorAll(".store-status-btn").forEach(btn => {

      if(btn.classList.contains("checked")) {
         console.log(btn.value);
         storeStatustInput.value = btn.value;
      } 
   });
   // console.log(storeStatustInput.value);


   let ctg = "";
   let categorys = "";
   let categorysinput = document.querySelector("input[name='categorys']");

   // console.log(categorys);
   document.querySelectorAll(".category-btn").forEach(btn => {

      let code = "";

      if(btn.classList.contains("checked")) {
         // checkData.category = true;
         code = btn.value + "/";
         
         ctg += code;
      } 
   }); // (".category-btn").forEach

   categorysinput.value = ctg;
   console.log(categorysinput.value);

   if(ctg.length < 1){
      alert("하나 이상의 카테고리를 선택해주세요.");
      e.preventDefault();
      return;
   }

   // 최대 인원수
   const storeMaxNumber = document.querySelector("#storeMaxNumber");
   if(storeMaxNumber.value.length === 0) {
      alert("한 테이블당 착석 가능한 최대 인원을 입력해주세요.");
      e.preventDefault();
      return;
   } else if(storeMaxNumber.value < 1) {
      alert("한 테이블당 최소 1명 이상의 인원만 입력이 가능합니다.");
      e.preventDefault();
      return;
   }

   // 테이블수
   const storeMaxTable = document.querySelector("#storeMaxTable");
   const pattern = /^[0-9]$/;
   if(storeMaxTable.value.length === 0 || storeMaxTable.value < 1) {
      alert("가게의 테이블 수는 최소 1개 이상만 입력이 가능합니다.");
      e.preventDefault();
      return;
   } else if(storeMaxNumber.value.length === 0 || storeMaxNumber.value < 1) {
      alert("한 테이블에 착석 가능한 최소 인원이 올바르지 않습니다.");
      e.preventDefault();
      return;
   } else if(pattern.test(storeMaxTable) || pattern.test(storeMaxNumber)){
      alert("숫자만 입력해주세요.");
      e.preventDefault();
      return;
   }

   // 영업시간
   const openHour = document.querySelector("#openHour").value;
   const closeHour = document.querySelector("#closeHour").value;

   if(openHour.trim().length === 0 || closeHour.trim().length === 0) {
      alert("영업 시간을 입력해주세요.");
      e.preventDefault();
      return;
   }

   if(categorys.isEmpty) {
      alert("하나 이상의 카테고리를 선택해주세요.");
   }

   const storeInfo = document.querySelector("#storeInfo").value;
   if(storeInfo.trim().length === 0) {
      alert("가게 소개를 입력해주세요.");
   }

});

checkStoreStatus();
checkBoxOpenClose();
checkBoxBreak();