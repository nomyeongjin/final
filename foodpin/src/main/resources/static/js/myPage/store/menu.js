/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const menuContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역
const menuBtn = document.querySelector("#menuBtn"); // 메뉴 정보 버튼




/**
 * (버튼) 메뉴 정보
 */
menuBtn.addEventListener("click", () => {

   menuContainer.innerHTML = "";
   console.log(storeNo);

   // DB에서 메뉴 정보 받아오기
   fetch("/myPage/store/menuSelect?storeNo=" + storeNo)
   .then(resp => resp.json())
   .then(menuList => {
      console.log(menuList);

      const menuEditFrm = document.createElement("form"); // form
      menuEditFrm.id = "menuEditFrm";

      // 조회된 데이터가 없는 경우 빈 입력폼 5개 생성
      if(menuList.length == 0) {

         for(let i = 0 ; i<5 ; i++) {

            const menuRow = document.createElement("div"); // menu_row
            menuRow.classList.add("menu_row");
         
            const menuImg = document.createElement("img"); // menu-img
            menuImg.classList.add("menu-img");
            
            const menuInputArea = document.createElement("div"); // menu-input-area
            menuInputArea.classList.add("menu-input-area");
         
            const menuTitle = document.createElement("input"); // menuTitle
            menuTitle.id = "menuTitle";
            menuTitle.setAttribute('name','menuTitle');
         
            const menuAmount = document.createElement("input"); // menuAmount
            menuAmount.id = "menuAmount";
            menuAmount.setAttribute('name','menuAmount');

            const spanWon = document.createElement("span"); // span(원)
            spanWon.classList.add("span-won");
            spanWon.innerText = "원";
         
            const menuContent = document.createElement("input"); // menuContent
            menuContent.id = "menuContent";
            menuContent.setAttribute('name','menuContent');

            const menuRowDel = document.createElement("i"); // 추가 버튼
            menuRowDel.classList.add('fa-solid', 'fa-xmark');
         
            menuInputArea.append(menuTitle, menuAmount, spanWon, menuContent, menuRowDel);
            menuRow.append(menuImg, menuInputArea);
            menuEditFrm.append(menuRow);//menu_row 까지  폼에 추가

            menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가
            menuAmount.setAttribute('placeholder','가격');
            menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');
         }
      }

      menuList.forEach(menu => { // 받아온 MenuList 내용으로 menu_row 요소 생성
      
         const menuRow = document.createElement("div"); // menu_row
         menuRow.classList.add("menu_row");

         const menuImg = document.createElement("img"); // menu-img
         menuImg.classList.add("menu-img");
         if(menu.menuImgUrl == null)   menuImg.src = menuDefaultImage; // 기본 이미지
         else  menuImg.src = menu.menuImgUrl; // 조회된 이미지
         
         const menuInputArea = document.createElement("div"); // menu-input-area
         menuInputArea.classList.add("menu-input-area");

         const menuTitle = document.createElement("input"); // menuTitle
         menuTitle.id = "menuTitle";
         menuTitle.setAttribute('name','menuTitle');
         menuTitle.value = menu.menuTitle;

         const amountArea = document.createElement("div"); // amount-area
         amountArea.classList.add("amount-area");

         const menuAmount = document.createElement("input"); // menuAmount
         menuAmount.id = "menuAmount";
         menuAmount.setAttribute('name','menuAmount');
         menuAmount.value = menu.menuAmount;

         const spanWon = document.createElement("span"); // span(원)
         spanWon.classList.add("span-won");
         spanWon.innerText = "원";

         amountArea.append(menuAmount, spanWon); // amountArea 관련 요소 적재

         const menuContent = document.createElement("input"); // menuContent
         menuContent.id = "menuContent";
         menuContent.setAttribute('name','menuContent');
         menuContent.value = menu.menuContent;
         
         const menuRowDel = document.createElement("i"); // 추가 버튼
         menuRowDel.classList.add('fa-solid', 'fa-xmark');
      
         menuInputArea.append(menuTitle, amountArea, menuContent, menuRowDel);
         menuRow.append(menuImg, menuInputArea);
         menuEditFrm.append(menuRow);//menu_row 까지 폼에 추가
      }) // forEach

      // 추가 버튼
      const menuRowAdd = document.createElement("i");
      menuRowAdd.classList.add('fa-solid', 'fa-circle-plus');
      menuRowAdd.id = "menuRowAdd";

      menuEditFrm.append(menuRowAdd);

      menuContainer.append(menuEditFrm); 
   })
   .catch( err => console.log(err));
   
}); // menuBtn.addEventListener("click", () => {


/**
 * 메뉴 추가 버튼 클릭시 한 행을 구성하는 요소 생성
 */
const createMenuRow = () => {

   const menuRow = document.createElement("div"); // menu_row
   menuRow.classList.add("menu_row");

   const menuImg = document.createElement("img"); // menu-img
   menuImg.classList.add("menu-img");
   
   const menuInputArea = document.createElement("div"); // menu-input-area
   menuInputArea.classList.add("menu-input-area");

   const menuTitle = document.createElement("input"); // menuTitle
   menuTitle.id = "menuTitle";
   menuTitle.setAttribute('name','menuTitle');
   menuTitle.setAttribute('placeholder','메뉴'); // placeholder 추가

   const menuAmount = document.createElement("input"); // menuAmount
   menuAmount.id = "menuAmount";
   menuAmount.setAttribute('name','menuAmount');
   menuAmount.setAttribute('placeholder','가격');

   const spanWon = document.createElement("span"); // span(원)
   spanWon.classList.add("span-won");
   spanWon.innerText = "원";

   const menuContent = document.createElement("input"); // menuContent
   menuContent.id = "menuContent";
   menuContent.setAttribute('name','menuContent');
   menuContent.setAttribute('placeholder','추가 내용이 있다면 입력해주세요.');

   const menuRowDel = document.createElement("i"); // menu-row-de (행 삭제)
   menuRowDel.classList.add('fa-solid', 'fa-xmark', 'menu-row-del');

   menuInputArea.append(menuTitle, menuAmount, spanWon, menuContent, menuRowDel);
   menuRow.append(menuImg, menuInputArea);
   menuEditFrm.append(menuRow);//menu_row 까지  폼에 추가
}

/**
 * (버튼) 행 추가
 */
document.querySelector("#menuRowAdd").addEventListener("click", () => {

   createMenuRow();
});
