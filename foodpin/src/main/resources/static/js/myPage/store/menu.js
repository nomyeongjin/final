/* 본문 영역, 서브 메뉴 버튼 변수 선언 */
const menuContainer = document.querySelector(".myPage-content-container"); // 본문 div 영역
const menuBtn = document.querySelector("#menuBtn"); // 메뉴 정보 버튼

/**
 * (버튼) 메뉴 정보
 */
menuBtn.addEventListener("click", () => {

   menuContainer.innerHTML = "";

   // 요소 생성
   const menuEditFrm = document.createElement("form"); // forrm
   menuEditFrm.id = "menuEditFrm";

   const menuRow = document.createElement("div"); // menu_row
   menuRow.classList.add("menu_row");

   const menuImg = document.createElement("img"); // menu-img
   menuImg.classList.add("menu-img");

   const menuInputArea = document.createElement("div"); // menu-input-area
   menuInputArea.classList.add("menu-input-area");

   const menuTitle = document.createElement("input"); // menuTitle
   menuTitle.id = "menuTitle";
   menuTitle.setAttribute('name','menuTitle');
   menuTitle.setAttribute('placeholder','메뉴');

   const menuAmount = document.createElement("input"); // menuAmount
   menuAmount.id = "menuAmount";
   menuAmount.setAttribute('name','menuAmount');
   menuAmount.setAttribute('placeholder','가격');

   const menuContent = document.createElement("input"); // menuContent
   menuContent.id = "menuContent";
   menuContent.setAttribute('name','menuContent');
   menuContent.setAttribute('placeholder','추가 내용');

   menuInputArea.append(menuTitle, menuAmount, menuContent);
   menuRow.append(menuImg, menuInputArea);
   menuEditFrm.append(menuRow);
   menuContainer.append(menuEditFrm);
});