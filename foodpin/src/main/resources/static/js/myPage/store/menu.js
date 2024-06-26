/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const menuContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역
const menuBtn = document.querySelector("#menuBtn"); // 메뉴 정보 버튼


/**
 * (버튼) 메뉴 정보
 */
menuBtn.addEventListener("click", () => {

   let imgStatus = -1; // 이미지 기록 상태 변수
   let backupInput; // 

   // 서브 메뉴에 버튼 기존 체크 클래스 제거 + 해당 메뉴 체크
   document.querySelectorAll(".sub-title-btn").forEach(btn => { 

      btn.classList.remove('title-btn-checked');
   });
   menuBtn.classList.add('title-btn-checked'); // 선택된 요소 체크 클래스 추가

   menuContainer.innerHTML = "";
   console.log(storeNo);

   // DB에서 메뉴 정보 받아오기
   fetch("/myPage/store/menuSelect?storeNo=" + storeNo)
   .then(resp => resp.json())
   .then(menuList => {
      // console.log(menuList);

      const menuEditFrm = document.createElement("form"); // form
      menuEditFrm.setAttribute('enctype', 'multipart/form-data');
      menuEditFrm.id = "menuEditFrm";

      const menuRowContainer = document.createElement("div"); // div
      menuRowContainer.id = "menuRowContainer";

      
      /**
       * 메뉴 추가 버튼 클릭시 한 행을 구성하는 요소 생성
       */
      const createMenuRow = (rowCount) => {

         const i = rowCount + 1;

         const menuRow = document.createElement("section"); // menu_row
         menuRow.classList.add("menu-row");

         // 이미지
         const menuImgArea = document.createElement("div"); // menu-img-area
         menuImgArea.classList.add("menu-img-area");

         const menuImgInput = document.createElement("input"); // menu-img-input
         menuImgInput.id = "inputMenuImg" + i;
         menuImgInput.classList.add("input-menu-img");
         menuImgInput.setAttribute('type','file');
         menuImgInput.setAttribute('accept','image/*');
         menuImgInput.setAttribute('name','menuList['+ i + '].menuImg'); // !!! name="menuList[0].menuImg" !!!
         
         const labelMenuImg = document.createElement("label"); // input 연결된 label
         labelMenuImg.setAttribute('for', 'inputMenuImg' + i);

         const iconPic = document.createElement("i"); // i (사진)
         iconPic.classList.add('fa-regular', 'fa-image');

         const iconPlus = document.createElement("i"); // i (+)
         iconPlus.classList.add('fa-solid', 'fa-plus');

         labelMenuImg.append(iconPic, iconPlus); // 이미지 관련 요소 적재
         menuImgArea.append(menuImgInput, labelMenuImg);

         // 텍스트
         const menuInputArea = document.createElement("div"); // menu-input-area
         menuInputArea.classList.add("menu-input-area");

         const menuTitle = document.createElement("input"); // menu-title
         menuTitle.classList.add("menu-title");
         menuTitle.setAttribute('name','menuList['+ i + '].menuTitle'); // name="menuList[0].menuTitle"
         menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가

         const amountArea = document.createElement("div"); // amount-area
         amountArea.classList.add("amount-area");

         const menuAmount = document.createElement("input"); // menu-amount
         menuAmount.classList.add("menu-amount");
         menuAmount.setAttribute('name','menuList['+ i + '].menuAmount');
         menuAmount.setAttribute('placeholder','가격');

         const spanWon = document.createElement("span"); // span(원)
         spanWon.classList.add("span-won");
         spanWon.innerText = "원";

         amountArea.append(menuAmount, spanWon); // amountArea 관련 요소 적재

         const menuContent = document.createElement("input"); // menu-content
         menuContent.classList.add("menu-content");
         menuContent.setAttribute('name','menuList['+ i + '].menuContent');
         menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');
         
         const menuRowDel = document.createElement("i"); // .menu-row-del (행 삭제)
         menuRowDel.classList.add('fa-solid', 'fa-xmark', 'menu-row-del');

         menuInputArea.append(menuTitle, amountArea, menuContent, menuRowDel);
         menuRow.append(menuImgArea, menuInputArea);
         menuRowContainer.append(menuRow);//menu_row 까지 폼에 추가

         // 행이 새로 생성된 경우 추가 버튼 생성
         const menuRowAdd = document.createElement("i"); // #menuRowAdd (행 추가)
         menuRowAdd.classList.add('fa-solid', 'fa-circle-plus');
         menuRowAdd.id = "menuRowAdd";


         // 기존 행 추가 버튼이 존재하는 경우 삭제
         menuRowAdd.addEventListener("click", e => {

            // 기존에 있던 행 개수 구하기
            const rowCount = document.querySelectorAll(".menu-row").length;

            // console.log(rowCount);

            createMenuRow(rowCount);
            e.target.remove();
         }) // menuRowAdd.addEventListener("click"

         menuRowContainer.append(menuRowAdd);

         /**
          * (버튼) 행 삭제
          */
         document.querySelectorAll(".menu-row-del").forEach(del => {
            
            del.addEventListener("click", e => {

               e.target.closest("div > section").remove();
            })
         }); // forEach(del)

         let imgStatus = -1; // 이미지 기록 상태 변수
         let backupInput; // 
   
         document.querySelectorAll(".menu-row").forEach( (row, i) => {
   
            const menuImgArea = row.querySelector(".menu-img-area"); // 이미지 관련 요소 묶는 div
            const inputMenuImg = row.querySelector(".input-menu-img"); // input
            
            /**
             * 이미지 변경
             * @param {*} e 
             */
            const changeMenuImageFn = e => {
   
               const maxSize =  1024 * 1024 * 5; // 이미지 최대 업로드 사이즈 지정
               const file = e.target.files[0]; // 업로드 된 파일 정보
   
               // console.log(file);
   
   
               /* 선택된 이미지 미리보기 */
               const reader = new FileReader();
   
               reader.readAsDataURL(file);
               
               console.log(reader);
               /**
                * 업로드 이미지 파일 읽기 완료시 미리보기
                */
               reader.addEventListener("load", e => {
               
                  const url = e.target.result; // 이미지 정보
   
                  // 이미지, 이미지 제거 버튼(X) 요소 추가
                  // menuImgArea.classList.add("img-ari");
                  
                  console.log(inputMenuImg.nextSibling);
   
                  inputMenuImg.nextSibling.classList.add('hidden');
   
                  const menuImgDel = document.createElement("i"); // .menu-img-del (이미지 삭제 버튼 x)
                  menuImgDel.classList.add('fa-solid', 'fa-xmark', 'menu-img-del');
   
                  const menuImg = document.createElement("img"); // .menu-img
                  menuImg.classList.add("menu-img");
                  menuImg.setAttribute("src", url);
   
                  // console.log(url); 
   
                  menuImgArea.append(menuImgDel, menuImg); // menuImgArea에 버튼, 이미지 태그 추가
   
                  imgStatus = 1; // 이미지 업로드 상태 기록
   
                  backupInput = inputMenuImg.cloneNode(true);
   
                  /**
                   *  x 버튼 클릭시 이미지태그 제거 + 기본 이미지, input 태그 다시 추가
                   */
                  menuImgDel.addEventListener("click", () => {
         
                     console.log("이미지 삭제");
                     menuImgArea.classList.remove("img-ari"); // 테두리 없애는 클래스 추가
                     
                     menuImg.setAttribute("src", ''); // 이미지 태그 hidden
                     menuImg.classList.add('hidden');
                     menuImgDel.classList.add('hidden');
   
                     inputMenuImg.nextSibling.classList.remove('hidden');
   
                     statusCheck = 0;
                  }) // menuImgDel.addEventListener("click"
   
               }) // 파일 읽기 - 미리보기
               console.log("미리보기 호출됨");
            } // changeImageFn ----
   
   
            /**
             * inputMenuImg 이미지 변경시 changeImageFn 호출
             */
            inputMenuImg.addEventListener("change", changeMenuImageFn);
   
         }); // .forEach( (row, i)

      }

      /* 조회된 데이터가 없는 경우 빈 입력폼 3개 생성 */
      if(menuList.length == 0) {

         for(let i = 0 ; i<3 ; i++) {

            const menuRow = document.createElement("section"); // menu_row
            menuRow.classList.add("menu-row");
   
            // 이미지
            const menuImgArea = document.createElement("div"); // menu-img-area
            menuImgArea.classList.add("menu-img-area");
   
            const menuImgInput = document.createElement("input"); // menu-img-input
            menuImgInput.id = "inputMenuImg" + i;
            menuImgInput.classList.add("input-menu-img");
            menuImgInput.setAttribute('type','file');
            menuImgInput.setAttribute('accept','image/*');
            menuImgInput.setAttribute('name','menuList['+ i + '].menuImg'); // !!! name="menuImg" !!!
            
            const labelMenuImg = document.createElement("label"); // input 연결된 label
            labelMenuImg.setAttribute('for', 'inputMenuImg' + i);
   
            const iconPic = document.createElement("i"); // i (사진)
            iconPic.classList.add('fa-regular', 'fa-image');
   
            const iconPlus = document.createElement("i"); // i (+)
            iconPlus.classList.add('fa-solid', 'fa-plus');
   
            labelMenuImg.append(iconPic, iconPlus); // 이미지 관련 요소 적재
            menuImgArea.append(menuImgInput, labelMenuImg);
   
            // 텍스트
            const menuInputArea = document.createElement("div"); // menu-input-area
            menuInputArea.classList.add("menu-input-area");
   
            const menuTitle = document.createElement("input"); // menu-title
            menuTitle.classList.add("menu-title");
            menuTitle.setAttribute('name','menuList['+ i + '].menuTitle');
            menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가
   
            const amountArea = document.createElement("div"); // amount-area
            amountArea.classList.add("amount-area");
   
            const menuAmount = document.createElement("input"); // menu-amount
            menuAmount.classList.add("menu-amount");
            menuAmount.setAttribute('name','menuList['+ i + '].menuAmount');
            menuAmount.setAttribute('placeholder','가격');
   
            const spanWon = document.createElement("span"); // span(원)
            spanWon.classList.add("span-won");
            spanWon.innerText = "원";
   
            amountArea.append(menuAmount, spanWon); // amountArea 관련 요소 적재
   
            const menuContent = document.createElement("input"); // menu-content
            menuContent.classList.add("menu-content");
            menuContent.setAttribute('name','menuList['+ i + '].menuContent');
            menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');
            
            const menuRowDel = document.createElement("i"); // .menu-row-del (행 삭제)
            menuRowDel.classList.add('fa-solid', 'fa-xmark', 'menu-row-del');
   
            menuInputArea.append(menuTitle, amountArea, menuContent, menuRowDel);
            menuRow.append(menuImgArea, menuInputArea);
            menuRowContainer.append(menuRow);//menu_row 까지 폼에 추가

            // createMenuRow();
         }
      }

      /* 조회된 MenuList 존재할 경우 menu_row 요소 생성 + 데이터 넣기 */
      menuList.forEach( (menu, i) => { 

         const menuRow = document.createElement("section"); // menu_row
         menuRow.classList.add("menu-row");

         // 이미지
         const menuImgArea = document.createElement("div"); // menu-img-area
         menuImgArea.classList.add("menu-img-area", 'img-ari');

         const menuImgInput = document.createElement("input"); // menu-img-input
         menuImgInput.id = "inputMenuImg" + i;
         menuImgInput.classList.add("input-menu-img");
         menuImgInput.setAttribute('type','file');
         menuImgInput.setAttribute('accept','image/*');
         menuImgInput.setAttribute('name','menuList['+ i + '].menuImg'); // !!! name="menuImg" !!!
         
         const labelMenuImg = document.createElement("label"); // input 연결된 label
         labelMenuImg.setAttribute('for', 'inputMenuImg' + i);
         labelMenuImg.classList.add('hidden');

         const iconPic = document.createElement("i"); // i (사진)
         iconPic.classList.add('fa-regular', 'fa-image');

         const iconPlus = document.createElement("i"); // i (+)
         iconPlus.classList.add('fa-solid', 'fa-plus');

         const menuImgDel = document.createElement("i"); // .menu-img-del (이미지 삭제)
         menuImgDel.classList.add('fa-solid', 'fa-xmark', 'menu-img-del');

         const menuImg = document.createElement("img"); // menu-img
         menuImg.classList.add('menu-img');

         labelMenuImg.append(iconPic, iconPlus); // 이미지 관련 요소 적재
         menuImgArea.append(menuImgInput, labelMenuImg, menuImgDel, menuImg);

         // 텍스트
         const menuInputArea = document.createElement("div"); // menu-input-area
         menuInputArea.classList.add("menu-input-area");

         const menuTitle = document.createElement("input"); // menu-title
         menuTitle.classList.add("menu-title");
         menuTitle.setAttribute('name','menuList['+ i + '].menuTitle');
         menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가

         const amountArea = document.createElement("div"); // amount-area
         amountArea.classList.add("amount-area");

         const menuAmount = document.createElement("input"); // menu-amount
         menuAmount.classList.add("menu-amount");
         menuAmount.setAttribute('name','menuList['+ i + '].menuAmount');
         menuAmount.setAttribute('placeholder','가격');

         const spanWon = document.createElement("span"); // span(원)
         spanWon.classList.add("span-won");
         spanWon.innerText = "원";

         amountArea.append(menuAmount, spanWon); // amountArea 관련 요소 적재

         const menuContent = document.createElement("input"); // menu-content
         menuContent.classList.add("menu-content");
         menuContent.setAttribute('name','menuList['+ i + '].menuContent');
         menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');
         
         const menuRowDel = document.createElement("i"); // .menu-row-del (행 삭제)
         menuRowDel.classList.add('fa-solid', 'fa-xmark', 'menu-row-del');

         if(i == 0) menuRowDel.classList.add('blind'); // 첫번쨰 행인 경우 삭제 버튼 숨기기

         menuInputArea.append(menuTitle, amountArea, menuContent, menuRowDel);
         menuRow.append(menuImgArea, menuInputArea);
         menuRowContainer.append(menuRow);//menu_row 까지 폼에 추가

         // 조회 내용 
         menuImg.src = menu.menuImgUrl; // 조회된 이미지

         menuTitle.value = menu.menuTitle;
         menuAmount.value = menu.menuAmount;
         menuContent.value = menu.menuContent;

         /**
          *  x 버튼 클릭시 이미지태그 제거 + 기본 이미지, input 태그 다시 추가
          */
         menuImgDel.addEventListener("click", () => {

            console.log("이미지 삭제");
            menuImgArea.classList.remove("img-ari"); // 테두리 없애는 클래스 추가
            
            menuImg.setAttribute("src", ''); // 이미지 태그 hidden
            menuImg.classList.add('hidden');
            menuImgDel.classList.add('hidden');

            menuImgInput.nextSibling.classList.remove('hidden');

            statusCheck = 0;
         }) // menuImgDel.addEventListener("click"

         document.querySelectorAll(".menu-row").forEach( (row, i) => {

            const menuImgArea = row.querySelector(".menu-img-area"); // 이미지 관련 요소 묶는 div
            const inputMenuImg = row.querySelector(".input-menu-img"); // input
            
            /**
             * 이미지 변경
             * @param {*} e 
             */
            const changeMenuImageFn = e => {
   
               const maxSize =  1024 * 1024 * 5; // 이미지 최대 업로드 사이즈 지정
               const file = e.target.files[0]; // 업로드 된 파일 정보
   
               // console.log(file);
   
               // 파일 업로드 취소 + 백업본 (추가예정)
   
               /* 선택된 이미지 미리보기 */
               const reader = new FileReader();
   
               reader.readAsDataURL(file);
               
               console.log(reader);
               /**
                * 업로드 이미지 파일 읽기 완료시 미리보기
                */
               reader.addEventListener("load", e => {
               
                  const url = e.target.result; // 이미지 정보
   
                  // 이미지, 이미지 제거 버튼(X) 요소 추가
                  // menuImgArea.classList.add("img-ari");
                  
                  console.log(inputMenuImg.nextSibling);
   
                  inputMenuImg.nextSibling.classList.add('hidden');
   
                  const menuImgDel = document.createElement("i"); // .menu-img-del (이미지 삭제 버튼 x)
                  menuImgDel.classList.add('fa-solid', 'fa-xmark', 'menu-img-del');
   
                  const menuImg = document.createElement("img"); // .menu-img
                  menuImg.classList.add("menu-img");
                  menuImg.setAttribute("src", url);
   
                  // console.log(url); 
   
                  menuImgArea.append(menuImgDel, menuImg); // menuImgArea에 버튼, 이미지 태그 추가
   
                  imgStatus = 1; // 이미지 업로드 상태 기록
   
                  backupInput = inputMenuImg.cloneNode(true);
   
                  /**
                   *  x 버튼 클릭시 이미지태그 제거 + 기본 이미지, input 태그 다시 추가
                   */
                  menuImgDel.addEventListener("click", () => {
         
                     console.log("이미지 삭제");
                     menuImgArea.classList.remove("img-ari"); // 테두리 없애는 클래스 추가
                     
                     menuImg.setAttribute("src", ''); // 이미지 태그 hidden
                     menuImg.classList.add('hidden');
                     menuImgDel.classList.add('hidden');
   
                     inputMenuImg.nextSibling.classList.remove('hidden');
   
                     statusCheck = 0;
                  }) // menuImgDel.addEventListener("click"
   
               }) // 파일 읽기 - 미리보기
               console.log("미리보기 호출됨");
            } // changeImageFn ----
   
   
            /**
             * inputMenuImg 이미지 변경시 changeImageFn 호출
             */
            inputMenuImg.addEventListener("change", changeMenuImageFn);
   
         }); // .forEach( (row, i)

         
      }) // forEach

      const menuRowAdd = document.createElement("i"); // #menuRowAdd (행 추가)
      menuRowAdd.classList.add('fa-solid', 'fa-circle-plus');
      menuRowAdd.id = "menuRowAdd";
      menuRowContainer.append(menuRowAdd);
      
      const menuSubmitBtn = document.createElement("button"); // menuSubmitBtn
      menuSubmitBtn.type = "button";
      menuSubmitBtn.id = "menuSubmitBtn";
      menuSubmitBtn.classList.add("update-btn");
      menuSubmitBtn.innerText = "메뉴 수정";

      menuEditFrm.append(menuRowContainer, menuSubmitBtn);
      menuContainer.append(menuEditFrm); 

      // ------------------------------------

      
      /**
       * (버튼) 행 추가
       */
      menuRowAdd.addEventListener("click", e => {

         // 기존에 있던 행 개수 구하기
         const rowCount = document.querySelectorAll(".menu-row").length;

         // console.log(rowCount);

         createMenuRow(rowCount);
         e.target.remove();
         
         document.querySelectorAll(".menu-row-del").forEach(del => {

            del.addEventListener("click", e => {

               e.target.closest("div > section").remove();
            })
         }); // forEach(del)

      }) //  menuRowAdd.addEventListener



      /**
       * (버튼) 행 삭제
       */
      document.querySelectorAll(".menu-row-del").forEach(del => {
         
         del.addEventListener("click", e => {

            e.target.closest("div > section").remove();
         })
      }); // forEach(del)





      document.querySelectorAll(".menu-row").forEach( (row, i) => {

         const menuImgArea = row.querySelector(".menu-img-area"); // 이미지 관련 요소 묶는 div
         const inputMenuImg = row.querySelector(".input-menu-img"); // input
         
         /**
          * 이미지 변경
          * @param {*} e 
          */
         const changeMenuImageFn = e => {

            const maxSize =  1024 * 1024 * 5; // 이미지 최대 업로드 사이즈 지정
            const file = e.target.files[0]; // 업로드 된 파일 정보

            // console.log(file);

            // 파일 업로드 취소 + 백업본 (추가예정)

            /* 선택된 이미지 미리보기 */
            const reader = new FileReader();

            reader.readAsDataURL(file);
            
            console.log(reader);
            /**
             * 업로드 이미지 파일 읽기 완료시 미리보기
             */
            reader.addEventListener("load", e => {
            
               const url = e.target.result; // 이미지 정보

               // 이미지, 이미지 제거 버튼(X) 요소 추가
               // menuImgArea.classList.add("img-ari");
               
               console.log(inputMenuImg.nextSibling);

               inputMenuImg.nextSibling.classList.add('hidden');

               const menuImgDel = document.createElement("i"); // .menu-img-del (이미지 삭제 버튼 x)
               menuImgDel.classList.add('fa-solid', 'fa-xmark', 'menu-img-del');

               const menuImg = document.createElement("img"); // .menu-img
               menuImg.classList.add("menu-img");
               menuImg.setAttribute("src", url);

               // console.log(url); 

               menuImgArea.append(menuImgDel, menuImg); // menuImgArea에 버튼, 이미지 태그 추가

               imgStatus = 1; // 이미지 업로드 상태 기록

               backupInput = inputMenuImg.cloneNode(true);

               /**
                *  x 버튼 클릭시 이미지태그 제거 + 기본 이미지, input 태그 다시 추가
                */
               menuImgDel.addEventListener("click", () => {
      
                  console.log("이미지 삭제");
                  menuImgArea.classList.remove("img-ari"); // 테두리 없애는 클래스 추가
                  
                  menuImg.setAttribute("src", ''); // 이미지 태그 hidden
                  menuImg.classList.add('hidden');
                  menuImgDel.classList.add('hidden');

                  inputMenuImg.nextSibling.classList.remove('hidden');

                  statusCheck = 0;
               }) // menuImgDel.addEventListener("click"

            }) // 파일 읽기 - 미리보기
            console.log("미리보기 호출됨");
         } // changeImageFn ----


         /**
          * inputMenuImg 이미지 변경시 changeImageFn 호출
          */
         inputMenuImg.addEventListener("change", changeMenuImageFn);

      }); // .forEach( (row, i)


      /**
       * (버튼) 메뉴 수정
       */
      menuSubmitBtn.addEventListener("click", e => {

         // const formData = new FormData(document.querySelector("#menuEditFrm")) // 폼 내부 input 내용 자동으로 들어감
         const formData = new FormData(); 


         document.querySelectorAll(".menu-row").forEach( (row, index) => {

            const input = row.querySelector(".input-menu-img");
            const file = input.files[0]; // 업로드 된 파일 정보 (단일 이미지 -> [0])
            const pattern = /^[0-9]$/;
            data = {
               "menuImg" : file,
               "menuTitle" : row.querySelector(".menu-title").value,
               "menuAmount" : row.querySelector(".menu-amount").value,
               "menuContent" : row.querySelector(".menu-content").value,
               "storeNo" : storeNo
            };

            if(input.files.length === 0) {
               alert("메뉴 이미지를 등록해주세요.");
               e.preventDefault();
               return;
            }

            if(data.menuTitle.trim().length === 0) {
               alert("메뉴 이름을 입력해주세요.");
               e.preventDefault();
               return;
            }
            if(data.menuAmount.trim().length === 0) {
               alert("메뉴가격을 입력해주세요.");
               e.preventDefault();
               return;
            } else if(pattern.test(data.menuAmount)){
               alert("숫자만 입력해주세요.");
               e.preventDefault();
               return;
            }

            if(file && input.files.length === 1){
               // 등록된 메뉴 이미지가 있는 경우
               if(input.files.length === 1) formData.append(`menuList[${index}].menuImg`, data.menuImg);
            }
            formData.append(`menuList[${index}].menuTitle`, data.menuTitle);
            formData.append(`menuList[${index}].menuAmount`, data.menuAmount);
            formData.append(`menuList[${index}].menuContent`, data.menuContent);
            formData.append(`menuList[${index}].storeNo`, data.storeNo);

         });

         
         fetch("/myPage/store/menuUpdate", {
            method : "POST",
            // headers : {"content-Type" : "multipart/form-data"},
            headers : {},
            body : formData //JSON.stringify(dataList)
         })
         .then(resp => resp.text())
         .then(result => {
            
            if(result > 0) alert("메뉴 등록이 완료되었습니다.");
         })
         .catch( err => console.log(err)); // 메뉴 정보 등록하는 fetch
      }); // menuSubmitBtn.addEventListener("click"
   })
   .catch( err => console.log(err)); // 메뉴 정보 받아오는 fetch
}); // menuBtn.addEventListener
