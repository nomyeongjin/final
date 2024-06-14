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
var mapContainer;
var map;
function storelocation() {
    mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨 
        }; 

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHTTOP);

    /* 현재 내 위치를 기본으로 표시 */
    function detaillocation() {
        // HTML5의 geolocation을 사용할 수 있는지 확인
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옴
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon); // 현재 위치

                // 지도 중심을 현재 위치로 변경
                map.setCenter(locPosition);
            }, function(error) {
                console.error("현재 위치를 불러올 수 없습니다.", error);
            });
        } else { 
            // HTML5의 GeoLocation을 사용할 수 없을때
            console.error("HTML5의 GeoLocation을 사용할 수 없습니다.");
        }
    }

    detaillocation();// 나중에 호출해서 지도 중심을 현재 위치로 함
    
    

 
   // 마커를 추가하는 함수
   function addMarker() {
        // 실행 시 초기 마커 생성
        const storeAddressList = document.querySelectorAll(".detailLoc"); //.getAttribute("data-address");
        const storeNameList = document.querySelectorAll(".storeNameS"); //.getAttribute("data-storeName");

        let geocoder = new kakao.maps.services.Geocoder();

        



        storeAddressList.forEach((storeAddress, i) => {

            geocoder.addressSearch(storeAddress.innerText, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
                    // positions.push({  title: storeNameList[i].innerText,  latlng: coords  })
                    // console.log("positions:", positions);

                    // 마커 이미지의 이미지 주소입니다
                    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

                    // 마커 이미지의 이미지 크기입니다
                    var imageSize = new kakao.maps.Size(24, 35); 

                    // 마커 이미지를 생성합니다    
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: coords, // 마커를 표시할 위치
                      /*   title: storeNameList[i].title,  */// 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image: markerImage, // 마커 이미지 
                        clickable : true
                    });

                        var iwContent= '<div id="smn" style="padding:5px;">'
                                         +storeNameList[i].innerText+
                                        '</div>', 
                        iwRemoveable = true;

                        var infowindow = new kakao.maps.InfoWindow({
                            content : iwContent,
                            removable : iwRemoveable
                        });
                    console.log("Marker created:", marker); // 마커가 제대로 생성되었는지 콘솔 확인

                   

                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        // 마커 위에 인포윈도우를 표시합니다
                        infowindow.open(map, marker);  
                  });
                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        // 마커 위에 인포윈도우를 표시합니다
                        infowindow.close(map, marker);  
                  });



                   
                }
            });

        })
         
     
    
    }

    addMarker();

}

// 화면 크기가 변경될 때마다 지도 중심을 유지
window.addEventListener('resize', function() {
    detaillocation();
    
    // 지도 크기 조정
    mapContainer.style.height = window.innerHeight + 'px';
    mapContainer.style.width = window.innerWidth + 'px';

    // 지도를 재배치하여 크기를 적용
    map.relayout();

    // 지도의 중심을 현재 중심으로 다시 설정
    var center = map.getCenter();
    map.setCenter(center);
});


/* 화면 생성 시 자동 실행 */
window.onload = function() {
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



  /* ************************************************************ */

// 비동기로 내용 불러올 공간
const searchstoreStoreCon = document.querySelector(".searchstore-storeList");




/* 비동기로 카테고리 검색하기 */
// 버튼을 다 가져와서 카테고리 코드를 보내줌

// 비동기로 카테고리 버튼 조회해옴
const searchCatBtns = document.querySelectorAll(".searchCat-btn");

searchCatBtns.forEach(btn => {
    const categoryCode = btn.getAttribute("data-category");

    btn.addEventListener("click", () => {
        searchCatSList(categoryCode);
    });
});bars

// 비동기로 카테고리에 해당하는 가게 조회
const searchCatSList =(categoryCode)=>{

    console.log(categoryCode);

    fetch("/store/searchCat?categoryCode="+ categoryCode)
    .then(resp => resp.json())

    .then(result=>{

     const searchStoreList = result.searchStoreList;

        console.log(searchStoreList);

     const searchstoreStoreCon = document.querySelector(".searchstore-storeList");
     searchstoreStoreCon.innerHTML ="";
     
     if(searchStoreList ==null || searchStoreList.length ===0){
		 let message = document.createElement("div");
        message.id = "noCommentMessage";
        message.innerText = "해당 가게가 없습니다.";

     
        searchstoreStoreCon.append(message);

	 }else{
                searchStoreList.forEach(store => {
                    const storeElement = createStoreElement(store);
                    searchstoreStoreCon.append(storeElement);
                });
            }
        });
}

const createStoreElement = (store) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <div>
            <div>
                <a href="/store/storeDetail/${store.storeNo}">
                    <img src="${store.storeImg}" id="searchStoreImg">
                </a>
            </div>
            <div class="storesearch-firstrow">
                <div>
                    <a class="searchstore-nameLink" href="/store/storeDetail/${store.storeNo}">
                        <span class="storeNameS" data-storeName="${store.storeName}">
                            ${store.storeName}
                        </span>
                    </a>
                    ${store.searchStoreCategoryList.map(category => `
                        <span class="searchstore-categoryL">${category.categoryTitle}</span>
                    `).join('')}
                    <a class="storesearch-reservationLink" href="/store/storeDetail/${store.storeNo}/reservation">예약</a>
                </div>
                <div class="bookmark-box">
                    <i class="fa-heart" id="bookmarkCheck" class="${store.bookmark == 1 ? 'fa-solid' : 'fa-regular'}"></i>
                    <span id="storeLikeCount">${store.likeCount}</span>
                </div>
            </div>
            <div class="searchstore-detailinfo">
                <div>
                    <i class="total_star fas fa-star"></i>
                    <span>${store.totalRating}</span>
                </div>
                <div>
                    <span>리뷰</span>
                    <span>${store.reviewCount}</span>
                </div>
            </div>
            <div class="searchstore-detailInfo-container">
                <div class="detailstoreloc-content">
                    <div class="storelocbox-one">
                        <span class="detailLoc" data-address="${store.address}">${store.address}</span>
                        <div>
                            <span class="more-address">
                                <i class="fa-solid fa-chevron-down"></i>
                            </span>
                            <span class="less-address">
                                <i class="fa-solid fa-chevron-up"></i>
                            </span>
                        </div>
                    </div>
                    <div class="storelocbox-two">
                        <div class="detailLocHide">
                            <div class="detailLoc-m">
                                <span class="storeloc-detail">도로명</span>
                                <span>${store.address}</span>
                            </div>
                            <div class="detailLoc-m">
                                <span class="storeloc-detail">지번</span>
                                <span>${store.detailAddress}</span>
                            </div>
                            <div class="detailLoc-m">
                                <span class="storeloc-detail">우</span>
                                <span>${store.postcode}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span type="text" id="searchMemberTel">${store.storeTel}</span>
                </div>
            </div>
            <div>
                <a class="storesearch-info" href="/store/storeDetail/${store.storeNo}">
                    ${store.storeInfo != null ? `
                        <div class="store-detail-content">
                            <pre class="store-detail-text">${store.storeInfo}</pre>
                        </div>
                    ` : ''}
                </a>
            </div>
        </div>
    `;

    return div;
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

    if (searchStoreR !== "") {
        searchStores(searchStoreR); 
    } else {
        alert("검색어를 입력해주세요.");
    }
});

// Enter 키 눌렀을 때 검색 이벤트 처리
searchButton.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const searchStoreR = searchStoreR.value.trim(); 

        if (searchStoreR !== "") {
            searchStores(searchStoreR); // 검색 함수 호출
        } else {
            alert("검색어를 입력해주세요.");
        }
    }
});

// 검색 함수 정의


const searchStores = (searchStoreR) => {
    // 서버로 검색어를 보내는 비동기 요청
    fetch("/store/search?searchStoreR=" + searchStoreR)
        .then(resp => resp.json())
        .then(result => {
           
   const storeAllList = result.storeAllList;

        console.log(storeAllList);

     const searchstoreStoreCon = document.querySelector(".searchstore-storeList");
     searchstoreStoreCon.innerHTML ="";
     
     if(storeAllList ==null || storeAllList.length ===0){
		 let message = document.createElement("div");
        message.id = "noCommentMessage";
        message.innerText = "해당 가게가 없습니다.";

     
        searchstoreStoreCon.append(message);

	 }else{
                storeAllList.forEach(store => {
                    const storeElement = createStoreElement(store);
                    searchstoreStoreCon.append(storeElement);
                });
            }
        });
}

const createStoreElements = (store) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <div>
            <div>
                <a href="/store/storeDetail/${store.storeNo}">
                    <img src="${store.storeImg}" id="searchStoreImg">
                </a>
            </div>
            <div class="storesearch-firstrow">
                <div>
                    <a class="searchstore-nameLink" href="/store/storeDetail/${store.storeNo}">
                        <span class="storeNameS" data-storeName="${store.storeName}">
                            ${store.storeName}
                        </span>
                    </a>
                    ${store.searchStoreCategoryList.map(category => `
                        <span class="searchstore-categoryL">${category.categoryTitle}</span>
                    `).join('')}
                    <a class="storesearch-reservationLink" href="/store/storeDetail/${store.storeNo}/reservation">예약</a>
                </div>
                <div class="bookmark-box">
                    <i class="fa-heart" id="bookmarkCheck" class="${store.bookmark == 1 ? 'fa-solid' : 'fa-regular'}"></i>
                    <span id="storeLikeCount">${store.likeCount}</span>
                </div>
            </div>
            <div class="searchstore-detailinfo">
                <div>
                    <i class="total_star fas fa-star"></i>
                    <span>${store.totalRating}</span>
                </div>
                <div>
                    <span>리뷰</span>
                    <span>${store.reviewCount}</span>
                </div>
            </div>
            <div class="searchstore-detailInfo-container">
                <div class="detailstoreloc-content">
                    <div class="storelocbox-one">
                        <span class="detailLoc" data-address="${store.address}">${store.address}</span>
                        <div>
                            <span class="more-address">
                                <i class="fa-solid fa-chevron-down"></i>
                            </span>
                            <span class="less-address">
                                <i class="fa-solid fa-chevron-up"></i>
                            </span>
                        </div>
                    </div>
                    <div class="storelocbox-two">
                        <div class="detailLocHide">
                            <div class="detailLoc-m">
                                <span class="storeloc-detail">도로명</span>
                                <span>${store.address}</span>
                            </div>
                            <div class="detailLoc-m">
                                <span class="storeloc-detail">지번</span>
                                <span>${store.detailAddress}</span>
                            </div>
                            <div class="detailLoc-m">
                                <span class="storeloc-detail">우</span>
                                <span>${store.postcode}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span type="text" id="searchMemberTel">${store.storeTel}</span>
                </div>
            </div>
            <div>
                <a class="storesearch-info" href="/store/storeDetail/${store.storeNo}">
                    ${store.storeInfo != null ? `
                        <div class="store-detail-content">
                            <pre class="store-detail-text">${store.storeInfo}</pre>
                        </div>
                    ` : ''}
                </a>
            </div>
        </div>
    `;

    return div;
}




/* 비동기로 거리순 리뷰순 좋아요순 평점순  */



/* 화면 비동기로 바꾸는 버튼 얻어오기 */
//-> 버튼 값만 보내서 조회 순서를 바꾸는게 가능한가?

// 리뷰 많은 순으로 조회하는 버튼
const storeSearchReviewBtn = document.querySelector("#storeSearchReviewBtn");

// 찜 많은 순으로 조회하는 버튼
const storeSearchLikeBtn = document.querySelector("#storeSearchLikeBtn");

// 평점 높은 순으로 조회하는 버튼
const storeRatingBtn = document.querySelector("#storeRatingBtn");



/* ----------------------------------------------------------- */



