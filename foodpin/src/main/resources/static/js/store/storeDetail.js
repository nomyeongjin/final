// 마이 페이지 -> 개인 정보 수정 페이지로 보내는 동작
const storedetailmapbutton = document.querySelector("#storedetailmapbutton");

storedetailmapbutton.addEventListener("click", () => {
  location.href = "storeSearch";
  currentlocation();

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
  shutMenuImageBtn.style.display = 'inline-block'; 
  
  storeMenuList.style.display = 'visible';
 
})

shutMenuImageBtn.addEventListener("click",()=>{

  
  shutMenuImageBtn.style.display = 'none'; 
  moreMenuImageBtn.style.display = 'inline-block';
  storeMenuList.style.display = 'hidden';
 
})

/* ***************** 팝업 ****************** */
const popupClose = document.querySelector("#popupClose");
const popupLayer = document.querySelector("#popupLayer");
const reviewReportForm = document.querySelector("#reviewReportForm");
const reviewReport = document.querySelector("#reviewReport");

popupClose.addEventListener("click", () => {
  reviewReportForm.classList.add("popup-hidden");
});

reviewReport.addEventListener("click", ()=>{
  reviewReportForm.classList.remove("popup-hidden");
});

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

