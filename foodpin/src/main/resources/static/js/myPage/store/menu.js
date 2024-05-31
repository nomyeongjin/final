/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const menuContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역
const menuBtn = document.querySelector("#menuBtn"); // 메뉴 정보 버튼



/**
 * (버튼) 메뉴 정보
 */
menuBtn.addEventListener("click", () => {

   menuContainer.innerHTML = "";
   // console.log(storeNo);

   // DB에서 메뉴 정보 받아오기
   fetch("/myPage/store/menuSelect?storeNo=" + storeNo)
   .then(resp => resp.json())
   .then(menuList => {
      // console.log(menuList);

      const menuEditFrm = document.createElement("form"); // form
      menuEditFrm.id = "menuEditFrm";

      const menuRowContainer = document.createElement("div"); // div
      menuRowContainer.id = "menuRowContainer";

      /**
       * 메뉴 추가 버튼 클릭시 한 행을 구성하는 요소 생성
       */
      const createMenuRow = () => {

         const menuRow = document.createElement("section"); // menu_row
         menuRow.classList.add("menu-row");

         const menuImg = document.createElement("img"); // menu-img
         menuImg.classList.add("menu-img");
         
         const menuInputArea = document.createElement("div"); // menu-input-area
         menuInputArea.classList.add("menu-input-area");

         const menuTitle = document.createElement("input"); // menuTitle
         menuTitle.classList.add("menuTitle");
         menuTitle.setAttribute('name','menuTitle');
         menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가

         const amountArea = document.createElement("div"); // amount-area
         amountArea.classList.add("amount-area");

         const menuAmount = document.createElement("input"); // menuAmount
         menuAmount.classList.add("menuAmount");
         menuAmount.setAttribute('name','menuAmount');
         menuAmount.setAttribute('placeholder','가격');

         const spanWon = document.createElement("span"); // span(원)
         spanWon.classList.add("span-won");
         spanWon.innerText = "원";

         amountArea.append(menuAmount, spanWon); // amountArea 관련 요소 적재

         const menuContent = document.createElement("input"); // menuContent
         menuContent.classList.add("menuContent");
         menuContent.setAttribute('name','menuContent');
         menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');
         
         const menuRowDel = document.createElement("i"); // .menu-row-del (행 삭제)
         menuRowDel.classList.add('fa-solid', 'fa-xmark', 'menu-row-del');

         menuInputArea.append(menuTitle, amountArea, menuContent, menuRowDel);
         menuRow.append(menuImg, menuInputArea);
         menuRowContainer.append(menuRow);//menu_row 까지 폼에 추가

         // 행이 새로 생성된 경우 추가 버튼 생성

         const menuRowAdd = document.createElement("i"); // #menuRowAdd (행 추가)
         menuRowAdd.classList.add('fa-solid', 'fa-circle-plus');
         menuRowAdd.id = "menuRowAdd";

         // 기존 행 추가 버튼이 존재하는 경우 삭제
         menuRowAdd.addEventListener("click", e => {

            createMenuRow();
            e.target.remove();
         }) 

         menuRowContainer.append(menuRowAdd);
      }

      /* 조회된 데이터가 없는 경우 빈 입력폼 3개 생성 */
      if(menuList.length == 0) {

         for(let i = 0 ; i<3 ; i++) {

            createMenuRow();

            const menuRowAdd = document.createElement("i"); // #menuRowAdd (행 추가)
            menuRowAdd.classList.add('fa-solid', 'fa-circle-plus', 'menu-row-add');
            menuRowContainer.append(menuRowAdd);
         }
      }

      /* 조회된 MenuList 존재할 경우 menu_row 요소 생성 + 데이터 넣기 */
      menuList.forEach( (menu, index) => { 

         const menuRow = document.createElement("section"); // menu_row
         menuRow.classList.add("menu-row");

         const menuImg = document.createElement("img"); // menu-img
         menuImg.classList.add("menu-img");
         
         const menuInputArea = document.createElement("div"); // menu-input-area
         menuInputArea.classList.add("menu-input-area");

         const menuTitle = document.createElement("input"); // menuTitle
         menuTitle.classList.add("menuTitle");
         menuTitle.setAttribute('name','menuTitle');
         menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가

         const amountArea = document.createElement("div"); // amount-area
         amountArea.classList.add("amount-area");

         const menuAmount = document.createElement("input"); // menuAmount
         menuAmount.classList.add("menuAmount");
         menuAmount.setAttribute('name','menuAmount');
         menuAmount.setAttribute('placeholder','가격');

         const spanWon = document.createElement("span"); // span(원)
         spanWon.classList.add("span-won");
         spanWon.innerText = "원";

         amountArea.append(menuAmount, spanWon); // amountArea 관련 요소 적재

         const menuContent = document.createElement("input"); // menuContent
         menuContent.classList.add("menuContent");
         menuContent.setAttribute('name','menuContent');
         menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');
         
         const menuRowDel = document.createElement("i"); // .menu-row-del (행 삭제)
         menuRowDel.classList.add('fa-solid', 'fa-xmark', 'menu-row-del');

         if(index == 0) menuRowDel.classList.add('blind'); // 첫번쨰 행인 경우 삭제 버튼 숨기기

         menuInputArea.append(menuTitle, amountArea, menuContent, menuRowDel);
         menuRow.append(menuImg, menuInputArea);
         menuRowContainer.append(menuRow);//menu_row 까지 폼에 추가

         // 조회 내용 
         if(menu.menuImgUrl == null)   menuImg.src = menuDefaultImage; // 기본 이미지
         else  menuImg.src = menu.menuImgUrl; // 조회된 이미지

         menuTitle.value = menu.menuTitle;
         menuAmount.value = menu.menuAmount;
         menuContent.value = menu.menuContent;
      }) // forEach



      const menuRowAdd = document.createElement("i"); // #menuRowAdd (행 추가)
      menuRowAdd.classList.add('fa-solid', 'fa-circle-plus');
      menuRowAdd.id = "menuRowAdd";
      menuRowContainer.append(menuRowAdd);
      
      const menuSubmitBtn = document.createElement("button"); // menuSubmitBtn
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

         createMenuRow();
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


      /**
       * (버튼) 메뉴 수정
       */
      menuSubmitBtn.addEventListener("click", () => {

         const dataList = [];

         document.querySelectorAll(".menu-row").forEach(menu => {

            console.log(document.querySelector(".input"));
            // data = {
            //    "menuImgUrl" : menu.menuImgUrl.value,
            //    "menuTitle" : menu.menuTitle.value,
            //    "menuContent" : menu.menuContent.value
            // };
         });


         dataList.push(data);

         console.log(dataList);

         // fetch("/myPage/store/menu", {
         //    method : "PUT",
         //    headers : {"content-Type" : "application/json"},
         //    body : JSON.stringify(dataList)
         // })
         // .then(resp => resp.json())
         // .then(menuList => {});

      });






   })
   .catch( err => console.log(err));






}); // menuBtn.addEventListener







