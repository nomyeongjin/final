// 마이 페이지 -> 개인 정보 수정 페이지로 보내는 동작
const storedetailmapbutton = document.querySelector("#storedetailmapbutton");

storedetailmapbutton.addEventListener("click", () => {
  location.href = "storeSearch";

});


/* 폐점/ 정보 정정 신고 팝업 */
var target = document.querySelectorAll('.btn_open');
var btnPopClose = document.querySelectorAll('.pop_wrap .btn_close');
var targetID;

// 팝업 열기
for(var i = 0; i < target.length; i++){
  target[i].addEventListener('click', function(){
    targetID = this.getAttribute('href');
    document.querySelector(targetID).style.display = 'block';
  });
}

// 팝업 닫기
for(var j = 0; j < target.length; j++){
  btnPopClose[j].addEventListener('click', function(){
    this.parentNode.parentNode.style.display = 'none';
  });
}