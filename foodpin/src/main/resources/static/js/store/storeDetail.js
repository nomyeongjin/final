// 누르면 상세 검색 페이지로 이동 해당 가게의 위치가 상세 페이지에서 검색됨
const storedetailmapbutton = document.querySelector("#storedetailmapbutton");

storedetailmapbutton.addEventListener("click", () => {
  location.href = "/store/storeSearch";
  currentlocation();

});



/* 가게 상세 설명 더보기 */
const storeDetailContent =document.querySelector('.store-detail-content');
const storeDetailText =document.querySelector('.store-detail-text');
const moreText =document.querySelector('.more-text');
const lessText =document.querySelector('.less-text');

moreText.addEventListener("click", () => {
  
  moreText.style.display = 'none'; 
  lessText.style.display = 'block'; 
  storeDetailText.style.display = 'inline';
});


lessText.addEventListener("click", ()=>{
 
 
  
  lessText.style.display = 'none'; 
  moreText.style.display = 'flex';
  storeDetailText.style.display = '-webkit-box'; 
});





/* ****************지도******************* */





function currentlocation(){

  var mapContainer = document.getElementById('detailMap'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        /* 지금은 현재 위치인데 나중에 가게 위치로 바꾸기 */
        /* 클릭 시 마커 설명 뜨는 이벤트도 추가/ 사진 없이 가게 이름만 */
        /* 
        draggable: false, 
        zoomable:false, 
        disableDoubleClickZoom: true, */

        level: 2 // 지도의 확대 레벨 
    }; 
  

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


map.setMaxLevel(3); /* 들어갈 때는 2 레벨인데 확대 시 3레벨까지 보이게 함 */

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">가게 이름</div>'; // 인포윈도우에 표시될 내용입니다
        
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
            
      });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
        message = 'geolocation을 사용할수 없어요..'
        
    displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
  
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}    

}



/* 화면 생성 시 자동 실행 */
window.onload = function() {
  // currentlocation 함수 실행
  currentlocation();
 
};


/* ****************지도******************* */


/* 별점  */

document.addEventListener('DOMContentLoaded', function () {
  
  
  function averageStar(totalRating){
    
    const AvgStar = document.getElementById('.realAvg-star');
    
 
   
    AvgStar.style.width = 'totalRating/5*100' + '%'; 
   
  }

});



/* 전화번호 - 넣기 */

document.addEventListener('DOMContentLoaded', function () {
  // phoneFormatter 함수 정의
  function phoneFormatter(storeTel) {
      var formatNum = '';
      formatNum = storeTel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
      return formatNum;
  }

  // storeTel 값을 가져옴
  var storeTelElement = document.getElementById('memberTel');
  var storeTel = storeTelElement.textContent.trim();

  // 포맷팅된 전화번호로 업데이트
  var formattedTel = phoneFormatter(storeTel);
  storeTelElement.textContent = formattedTel;
});

/* 폐점/ 정보 정정 신고 팝업 */


const popupShut = document.querySelector("#popupShut");
const popupbox = document.querySelector("#popupbox");
const storeReportForm = document.querySelector("#storeReportForm");
const storeReport = document.querySelector("#storeReport");


popupShut.addEventListener("click", () => {
  
  storeReportForm.classList.add("popup-storereport");
});


storeReport.addEventListener("click", ()=>{
 
  storeReportForm.classList.remove("popup-storereport");
});


/* ****************** 가게 영업 시간 더보기 *********************  */

const openContainer = document.querySelector(".storedetail-opencontainer");
const busiHoursShort = document.querySelector(".busi-hours-short");

const moreScheduleInfoBtn = document.querySelector("#moreScheduleInfoBtn");
const shutScheduleInfoBtn = document.querySelector("#shutScheduleInfoBtn");

moreScheduleInfoBtn.addEventListener('click',()=>{


  // 더보기 버튼을 숨기고 줄이기 버튼 보이게 하기
  moreScheduleInfoBtn.style.display = 'none'; 
  shutScheduleInfoBtn.style.display = 'inline-block'; 
  busiHoursShort.style.display = 'inline';
})

shutScheduleInfoBtn.addEventListener("click",()=>{

  
  shutScheduleInfoBtn.style.display = 'none'; 
  moreScheduleInfoBtn.style.display = 'inline-block';
  busiHoursShort.style.display = 'none'; 
})


/* ************************************************************* */

/* 메뉴 이미지 더보기 */

// 3개씩 불러오기




const storeMenuList = document.querySelector(".store-menu-list");
const menuImageContainer = document.querySelector(".menu-image-container");

const moreMenuImageBtn = document.querySelector("#moreMenuImageBtn");
const shutMenuImageBtn = document.querySelector("#shutMenuImageBtn");



moreMenuImageBtn.addEventListener('click',()=>{


  

  moreMenuImageBtn.style.display = 'none'; 
  shutMenuImageBtn.style.display = 'inline'; 
  
  storeMenuList.style.display = 'inline';
 
 
})

shutMenuImageBtn.addEventListener("click",()=>{

  
  shutMenuImageBtn.style.display = 'none'; 
  moreMenuImageBtn.style.display = 'inline';

  storeMenuList.style.display = 'flex';

  storeMenuList.style.overflow = 'hidden';

 

})


/* ****************************식당 사진 더보기*********************************** */

const detailImages = document.querySelector(".detail-images");
const storeLook = document.querySelector(".store-look");

const moreStoreImageBtn = document.querySelector("#moreStoreImageBtn");
const shutStoreImageBtn = document.querySelector("#shutStoreImageBtn");






/* ***************** 리뷰 신고 팝업 ****************** */
const popupClose = document.querySelector("#popupClose");
const popupLayer = document.querySelector("#popupLayer");
const reviewReportForm = document.querySelector("#reviewReportForm");
const reviewReport = document.querySelectorAll("#reviewReport");
const reivewComplete = document.querySelector("#reviewComplete");
const reportContent = document.querySelector("#reportContent");

popupClose.addEventListener("click", () => {
  reviewReportForm.classList.add("popup-hidden");
});
reviewReport.forEach((report) => {
  report.addEventListener("click", ()=>{
    reviewReportForm.classList.remove("popup-hidden");
    
    const reviewNo = reviewReport.getAttribute("data-review-no");
    const memberNo = reviewReport.getAttribute("data-member-no");

    reivewComplete.addEventListener("click" , (e) => {
    
      if(reportContent.value.trim().length == 0){
        alert("신고 내용을 입력해주세요");
        reportContent.focus();
        e.preventDefault();
        return;
      }

      const obj = {
        "reviewNo" : reviewNo,
        "reportContent" : reportContent.value,
        "memberNo" : memberNo
      };

      fetch("/store/reviewReport", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
      })
      .then(resp => resp.json())
      .then(result => {

        if(result > 0){
          alert("리뷰 신고가 접수 되었습니다.");
          reportContent.innerText = '';
          reviewReportForm.classList.add("popup-hidden");
        }
        else{
          alert("신고 내용을 입력해주세요").
          reportContent.focus();
          e.preventDefault();
        }

        
      })
      
    })
    



  })
})


/* ******************************************************** */

/* 리뷰> 클릭 시 아래 리뷰 페이지로 이동 */

const showReview = document.querySelector("#showReview");
/* const scrollPosition = targetElement.offsetTop; */

showReview.addEventListener("click", ()=>{

 
  window.scrollTo({
    
    left:0,
    top:3000,
    behavior:'smooth'
  })
})

/**************** 가게 찜, 좋아요 개수 ******************/

// 1. #bookmarkCheck 클릭 되었을 때
const bookmarkCheck = document.querySelector("#bookmarkCheck");
bookmarkCheck.addEventListener("click", e=>{

  
    // 3. 준비된 3개의 변수를 객체로 저장 -> (Json 변환 예정)
    const obj = {
        "memberNo" : loginMember,
        "storeNo"  : storeNo,
        "bookMark": bookMark
    };

    //4. 좋아요 INSERT / DELETE 비동기 요청
    fetch("/store/like", {

    method  : "POST",
    headers : {"Content-Type" : "application/json"},
    body    : JSON.stringify(obj) // 객체를 Json으로 문자화 

    })

    .then(resp =>resp.text()) // 반환 결과 text(글자) 형태로 변환
    .then(count =>{

        // count == 첫 번째 then의 파싱되어 반환된 값('-1' 또는 게시글 좋아요 수)
        //console.log("result :", result);


        if(count == -1){
            console.log("좋아요 처리 실패");
            return;
        }

        // 5. bookmark 값 0<->1 변환
        // (왜? 클릭 될 때 마다 INSERT/DELETE 동작을 번갈아 가면서 할 수 있음)
         bookMark = bookMark == 0? 1: 0;

        // 6. 하트를 채웠다/비웠다 바꾸기
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-solid");

        // 7. 게시글 좋아요 수 수정
        e.target.nextElementSibling.innerText = count;
       

    });

});

