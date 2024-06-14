/* ************************************* 헤더 ******************************************* */
// 지도 홈 버튼 (검색된게 리셋 현재 위치 기준으로 나옴)
const mapHome = document.querySelector("#mapHome");

mapHome.addEventListener("click", () => {
  location.href = "storeSearch"+categoryCode;
  currentlocation();
  
/* 버튼 클릭 시 해당 가게 storeNo를 넘겨서 전체에서 그 가게 위치 지도에 표시 */
});

const remS = document.querySelector("#remS");

remS.addEventListener('click', ()=>{

    if(loginMember == null){
        alert('로그인이 필요한 기능입니다');
        location.href = "storeSearch"+categoryCode;
        return;
    }
  location.href = "/myPage/member/memberLike";

});

const resS = document.querySelector("#resS");

resS.addEventListener('click', ()=>{

    if(loginMember == null){
        alert('로그인이 필요한 기능입니다');
        location.href = "storeSearch"+categoryCode;
        return;
    }
  location.href = "/myPage/member/reservation/fix";

});

// 누르면 채팅 페이지로 이동 해당 가게의 위치가 상세 페이지에서 검색됨
const storedetailmapbutton = document.querySelector("#chatS");

storedetailmapbutton.addEventListener("click", () => {
    
    if(loginMember == null){
        alert('로그인이 필요한 기능입니다');
        location.href = "storeSearch"+categoryCode;
        return;
    }
    
    location.href = "/chatting/chat";
});


/* 사이드바 접기 */

const hideSideBar = document.querySelector("#hideSideBar");
const blind = document.querySelector(".blind");
const show = document.querySelector(".show");
const searchSidebarBox = document.querySelector(".search-sidebarbox");

blind.addEventListener('click', ()=>{

    blind.style.display= 'none';
    show.style.display = 'flex';
    searchSidebarBox.style.transform = 'translateX(-100%)';
    searchSidebarBox.style.transition = 'transform 0.4s ease-out';
    
})
show.addEventListener('click', ()=>{

    show.style.display= 'none';
    blind.style.display = 'flex';
    searchSidebarBox.style.transform = 'translateX(0%)';
    
})





/* 카테고리 박스 접기 */

const searchCategoryCon = document.querySelector('.search-categoryContainer')
const searchCategoryBtnBox = document.querySelector('.searchcategory-Btnbox')
const bars = document.querySelector('.bars')
const shortBar = document.querySelector('.short-bar')

shortBar.addEventListener('click', ()=>{
    shortBar.style.display = 'none';
    bars.style.display = 'flex';

    searchCategoryCon.style.transform = 'translateY(-100%)';
    searchCategoryCon.style.transition = 'transform 0.4s ease-out';
    searchCategoryCon.style.transition = 'transition:height 1s';
    /* searchCategoryCon.style.height = '166px'; */
 
})

bars.addEventListener('click', ()=>{
    bars.style.display = 'none';
    shortBar.style.display = 'flex';
    
    searchCategoryCon.style.transform = 'translateY(0%)';
    searchCategoryCon.style.transition = 'transform 0.4s ease-out';
    
    
})


 
/* ************************************* 지도 ******************************************* */
function storelocation() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨 
        }; 

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


     /*현재 내 위치를 기본으로 표시 / 나중에 가게 위치 주소를 좌표로 변경해서 마커로 띄우기*/
    function detaillocation(){

        
        // HTML5의 geolocation으로 사용할 수 있는지 확인
        if (navigator.geolocation) {
            try {
                // GeoLocation을 이용해서 접속 위치를 얻어옴
                const position =  new Promise ((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                position.then(resp => {
                    var lat = resp.coords.latitude, // 위도
                        lon = resp.coords.longitude; // 경도
                    
                    var locPosition = new kakao.maps.LatLng(lat, lon) // 현재 위치
                    
                    // 마커와 인포윈도우를 표시
                    displayMarker(locPosition, message);

                })
                
            } catch (error) {
                console.error('Error getting geolocation:', error);
                var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                    message = 'geolocation을 사용할수 없어요..';
                displayMarker(locPosition, message);
            }
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
            displayMarker(locPosition, message);
        }
    

    };

    detaillocation();

    // 화면 크기가 변경될 때마다 지도 중심을 유지
    window.addEventListener('resize', function() {
                 
        detaillocation();
       
    
            /* 지도 크기 줄이면  */
          mapContainer.style.height = map.innerHeight + 'px';
          mapContainer.style.width = map.innerWidth + 'px';
        
            // 지도를 재배치하여 크기를 적용
            map.relayout();
        
            // 지도의 중심을 현재 중심으로 다시 설정
            var center = map.getCenter();
    
            
            map.setCenter(center);


        });  
             // 지도에 마커와 인포윈도우를 표시하는 함수
       function displayMarker(locPosition, message) {
        /* 나중에 현재 위치는 마커 지우고 근처 가게들에 마커 생성 */

        // 마커를 생성
        var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 

        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

        // 인포윈도우를 생성
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });

        // 인포윈도우를 마커위에 표시 
        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경
        map.setCenter(locPosition);      
    }    

}


/* 화면 생성 시 자동 실행 */
window.onload = function() {
    // currentlocation 함수 실행
    storelocation();
   
   
};


/* ************************************* 지도 ******************************************* */

/* 가게 주소  */

document.addEventListener('DOMContentLoaded', function () {
    const searchStoreLocContent =document.querySelector('.searchstore-detailInfo-container');
    const storelocboxTwo =document.querySelector('.storelocbox-two');
    const moreAddress =document.querySelector('.more-address');
    const lessAddress =document.querySelector('.less-address');
    
    moreAddress.addEventListener("click", () => {
      
      moreAddress.style.display = 'none'; 
      lessAddress.style.display = 'block'; 
      storelocboxTwo.style.display = 'inline';
    });
    
    
    lessAddress.addEventListener("click", ()=>{
     
     
      
      lessAddress.style.display = 'none'; 
      moreAddress.style.display = 'flex';
      storelocboxTwo.style.display ='none'; 
    });
});

/*  가게 전화번호 */

document.addEventListener('DOMContentLoaded', function () {
    // phoneFormatter 함수 정의
    function phoneFormatter(storeTel) {
        var formatNum = '';
        formatNum = storeTel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
        return formatNum;
    }
  
    // storeTel 값을 가져옴
    var storeTelElement = document.getElementById('searchMemberTel');
    var storeTel = storeTelElement.textContent.trim();
  
    // 포맷팅된 전화번호로 업데이트
    var formattedTel = phoneFormatter(storeTel);
    storeTelElement.textContent = formattedTel;
  });

/* 가게 설명 */


// 비동기로 내용 불러올 공간
/* const sidebarMenu = document.querySelector(".sidebar-menu");



const remS = document.querySelector("#remS");

storedetailmapbutton.addEventListener("click", () => {

    sidebarMenu.innerHTML = "";

   
});
const resS = document.querySelector("#resS");

storedetailmapbutton.addEventListener("click", () => {
    sidebarMenu.innerHTML = "";


}); */



// 비동기로 내용 불러올 공간
const searchstoreStoreList = document.querySelector(".searchstore-storeList");




/* 비동기로 카테고리 검색하기 */
// 버튼을 다 가져와서 카테고리 코드를 보내줌

const searchCatBtns = document.querySelectorAll(".searchCat-btn");

searchCatBtns.forEach(btn => {
    const categoryCode = btn.getAttribute("data-category");

    btn.addEventListener("click", () => {
        searchCatSList(categoryCode);
    });
});
const searchCatSList =(categoryCode)=>{

    console.log(categoryCode);

    fetch("/store/searchCat?categoryCode="+ categoryCode)
    .then(resp => resp.json())

    .then(result=>{

        console.log(result);

  
       
    })
}



const searchStoreR = document.getElementById("searchStoreR");

if (searchStoreR) {
    const mainSearchValue = searchStoreR.value.trim(); // 검색어 가져오기

    
    if (mainSearchValue !== "") {
        searchStoreR.value = mainSearchValue;
    }
}

/* 비동기로 가게 검색하기 */

const searchButton = document.getElementById("searchButton");

// 검색 버튼 클릭 시 이벤트 리스너 추가
searchButton.addEventListener("click", () => {
    const searchR = searchStoreR.value.trim(); // 검색어 가져오기 및 공백 제거

    if (searchR !== "") {
        searchStores(searchR); 
    } else {
        alert("검색어를 입력해주세요.");
    }
});

// Enter 키 눌렀을 때 검색 이벤트 처리
searchStoreR.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const searchR = searchStoreR.value.trim(); 

        if (searchR !== "") {
            searchStores(searchR); // 검색 함수 호출
        } else {
            alert("검색어를 입력해주세요.");
        }
    }
});

// 검색 함수 정의
const searchStores = (searchR) => {
    // 서버로 검색어를 보내는 비동기 요청
    fetch(`/store/search?keyword=${encodeURIComponent(searchR)}`)
        .then(resp => resp.json())
        .then(result => {
           
            console.log(result); 

        
        })
        .catch(error => {
            console.error('검색 요청 중 오류 발생:', error);
        });
};

/* 비동기로 거리순 리뷰순 좋아요순 평점순  */



/* 화면 비동기로 바꾸는 버튼 얻어오기 */
//-> 버튼 값만 보내서 조회 순서를 바꾸는게 가능한가?
// 거리순으로 리스트를 조회하는 버튼 (기본)
const storeSearchBasicBtn = document.querySelector("#storeSearchBasicBtn");

// 리뷰 많은 순으로 조회하는 버튼
const storeSearchReviewBtn = document.querySelector("#storeSearchReviewBtn");

// 찜 많은 순으로 조회하는 버튼
const storeSearchLikeBtn = document.querySelector("#storeSearchLikeBtn");

// 평점 높은 순으로 조회하는 버튼
const storeRatingBtn = document.querySelector("#storeRatingBtn");



/* ----------------------------------------------------------- */



