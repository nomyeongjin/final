/* ************************************* 헤더 ******************************************* */
// 지도 홈 버튼 (검색된게 리셋 현재 위치 기준으로 나옴)
const mapHome = document.querySelector("#mapHome");
const categoryCode = 1; // categoryCode를 실제 값으로 정의합니다.

mapHome.addEventListener("click", () => {
    const currentUrl = window.location.href;
    const targetUrl = `store/storeSearch/${categoryCode}`;

    if (currentUrl.includes(targetUrl)) {
        window.location.href = "1";
    } else {
        window.location.replace("storeSearch/1");
    }
});


const remS = document.querySelector("#remS");

remS.addEventListener('click', ()=>{

    if(loginMember == null ){
        alert('로그인이 필요한 기능입니다');
        location.href = "storeSearch"+c
        
        ategoryCode;
        return;
    }

   
  location.href = "/myPage/member/memberLike";

});

const resS = document.querySelector("#resS");

resS.addEventListener('click', ()=>{

    if(loginMember == null  ){
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


shortBar.addEventListener('click', () => {
    shortBar.style.display = 'none';
    bars.style.display = 'flex';

    // 트랜지션 설정 (transform과 height 모두 포함)
    searchCategoryCon.style.transition = 'transform 0.6s ease-in, height 1s';
    searchCategoryCon.style.transform = 'translateY(-700%)';
    searchCategoryCon.style.height = '0px';
});

bars.addEventListener('click', () => {
    bars.style.display = 'none';
    shortBar.style.display = 'flex';

    // 트랜지션 설정 (transform과 height 모두 포함)
    searchCategoryCon.style.transition = 'transform 0.6s ease-out, height 0.4s';
    searchCategoryCon.style.height = '170px';
    searchCategoryCon.style.transform = 'translateY(0%)';
});
  /* ************************************************************ */


  /* ----------------------------------------------------------- */


/* ************************************* 지도 ******************************************* */
var mapContainer;
var map;
let markers = [];

// 각 지역의 중심 좌표를 저장할 객체
const regionCenters = {
    '1': new kakao.maps.LatLng(37.5665, 126.9780), // 서울
    '2': new kakao.maps.LatLng(35.1796, 129.0756), // 부산
    '3': new kakao.maps.LatLng(35.8722, 128.6014), // 대구
    '4': new kakao.maps.LatLng(37.4562557, 126.7052062), // 인천
    '5': new kakao.maps.LatLng(35.1595, 126.8526), // 광주
    '6': new kakao.maps.LatLng(36.3504, 127.3845), // 대전
    '7': new kakao.maps.LatLng(35.5396, 129.3115), // 울산
    '8': new kakao.maps.LatLng(37.8853, 127.7298), // 강원
    '9': new kakao.maps.LatLng(37.567167, 127.190292), // 경기
    '10': new kakao.maps.LatLng(35.2383, 128.6925), // 경남
    '11': new kakao.maps.LatLng(36.5760, 128.5056), // 경북
    '12': new kakao.maps.LatLng(37.4171413, 127.2561413), // 전남
    '13': new kakao.maps.LatLng(35.8242238, 127.1479532), // 전북
    '14': new kakao.maps.LatLng(33.4996, 126.5312), // 제주
    '15': new kakao.maps.LatLng(36.6580, 126.6728), // 충남
    '16': new kakao.maps.LatLng(36.6350, 127.4914)  // 충북
};

function storelocation() {
    mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨 
    }; 

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHTTOP);

    detaillocation(); // 현재 위치를 지도 중심으로 설정

    // 지역 선택 이벤트 핸들러 설정
    document.getElementById('region-select').addEventListener('change', function() {
        var selectedRegion = this.value;
        if (selectedRegion && regionCenters[selectedRegion]) {
            map.setCenter(regionCenters[selectedRegion]);
            map.setLevel(6); 
        } else {
            detaillocation(); // 선택된 지역이 없으면 현재 위치를 중심으로 설정
        }
    });

    addMarker(); // 마커 추가 함수 호출

    // document.querySelector("#map").style.width = "100vw";
    // map.relayout();
}

// 현재 위치를 지도 중심으로 설정하는 함수
function detaillocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon); // 현재 위치
            map.panTo(locPosition); // 지도 중심을 현재 위치로 변경
        }, function(error) {
            console.error("현재 위치를 불러올 수 없습니다.", error);
        });
    } else {
        console.error("HTML5의 GeoLocation을 사용할 수 없습니다.");
    }
}




// 모든 마커를 지도에서 제거하는 함수
function removeMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = []; // 마커 배열 초기화
}

    // 마커를 추가하는 함수
function addMarker() {
    const storeAddressList = document.querySelectorAll('.detailLoc');
    const storeNameList = document.querySelectorAll('.storeNameS');

    let geocoder = new kakao.maps.services.Geocoder();
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    storeAddressList.forEach((storeAddress, i) => {
    geocoder.addressSearch(storeAddress.innerText, function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var storeName = storeNameList[i].innerText; // 해당 인덱스의 가게 이름 가져오기

        var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage,
            clickable: true
        });

        var iwContent = '<div id="smn" style="padding:5px;">' + storeName + '</div>';
        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: true
        });

        kakao.maps.event.addListener(marker, 'click', function() {
            map.panTo(marker.getPosition());
        });

        kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker);
        });
        kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close(map, marker);
        });

        markers.push(marker);
    }

    });

});

}

// 화면 크기가 변경될 때마다 지도 중심을 유지
window.addEventListener('resize', function() {
    detaillocation();
    mapContainer.style.height = window.innerHeight + 'px';
    mapContainer.style.width = window.innerWidth + 'px';
    map.relayout();
    var center = map.getCenter();
    map.setCenter(center);
});


// 화면 생성 시 자동 실행
window.onload = function() {
    storelocation();
};
/* ************************************* 지도 ******************************************* */



// 비동기로 카테고리 버튼 조회해옴
const searchCatBtns = document.querySelectorAll(".searchCat-btn");

searchCatBtns.forEach(btn => {
    const categoryCode = btn.getAttribute("data-category");

    btn.addEventListener("click", () => {
        searchCatSList(categoryCode);
    });
});bars

const createStoreElementForCategory = (store) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <div>
            <div class="storeNoI" data-storeNo=${store.storeNo}>
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
                    <i class="${store.bookmark == 1 ? 'fa-solid' : 'fa-regular'} fa-heart bookmarkCheck" data-bookmark="${store.bookmark}"></i>
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
                    <span type="text" class="searchMemberTel">${store.storeTel}</span>
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

// 비동기로 카테고리에 해당하는 가게 조회
const searchCatSList =  async (categoryCode)=>{

    console.log(categoryCode);

     fetch("/store/searchCat?categoryCode="+ categoryCode)
    .then(resp => resp.json())

    .then( async result=>{

        removeMarkers();

        const searchStoreList = result.searchStoreList;

        console.log(searchStoreList);

        //const searchstoreStoreCon = document.querySelector(".searchstore-storeList");
        document.querySelector("#storeList-a").innerHTML='';
        document.querySelector("#storeList-b").innerHTML='';

        if(searchStoreList ==null || searchStoreList.length ===0){
            let message = document.createElement("div");
            message.id = "noCommentMessage";
            message.innerText = "해당 가게가 없습니다.";

        
            searchstoreStoreCon.append(message);

        }else{
            searchStoreList.forEach( async store => {
                // 각 가게의 주소를 좌표로 변환
                let geocoder = new kakao.maps.services.Geocoder();
                await geocoder.addressSearch(store.address, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        
                        // 마커 추가
                        addMarker(store.storeName, coords);
            
                    } else {
                        console.error('주소를 좌표로 변환할 수 없습니다.');
                    }
                });

                // 가게 요소 생성 및 추가
                const storeElement = createStoreElementForCategory(store);
                document.querySelector("#storeList-a").append(storeElement);
            });

            
            setTimeout(()=>{
                addStoeLikeFn()
                applyFunctionsToNewElements();
            }, 100)
        }

    });
}


const searchStoreR = document.getElementById("searchStoreR");

if (searchStoreR) {
    const mainSearchValue = searchStoreR.value.trim(); // 검색어 가져오기

    
    if (mainSearchValue !== "") {
        searchStoreR.value = mainSearchValue;
    }
}

/* 비동기로 가게 검색하기 */

    const createStoreElementForSearch = (store) => {
        const div = document.createElement("div");
		/*alert("가게들 정보 가져옴 2");*/
        div.innerHTML = `
        <div>
            <div class="storeNoI" data-storeNo="${store.storeNo}">
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
                    <i class="${store.bookmark == 1 ? 'fa-solid' : 'fa-regular'} fa-heart bookmarkCheck" data-bookmark="${store.bookmark}"></i>
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
                    <span type="text" class="searchMemberTel">${store.storeTel}</span>
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


document.addEventListener('DOMContentLoaded', () => {
    applyFunctionsToNewElements();

    const searchButton = document.getElementById("searchButton");
    const searchStoreR = document.getElementById("searchStoreR");

    if (searchStoreR) {
        const mainSearchValue = searchStoreR.value.trim();
        if (mainSearchValue !== "") {
            searchStoreR.value = mainSearchValue;
        }
    }

    const searchStores = (searchStoreR) => {
        fetch("/store/search?searchStoreR=" + searchStoreR)
            .then(resp => resp.json())
            .then(result => {
                const storeAllList = result.storeAllList;
             /*   alert(":::: 겟엘레먼트 1");*/
                document.querySelector("#storeList-a").innerHTML='';
                document.querySelector("#storeList-b").innerHTML='';

                /*alert(":::: 겟엘레먼트 2");*/
                if (storeAllList == null || storeAllList.length === 0) {
                    let message = document.createElement("div");
                    message.id = "noCommentMessage";
                    message.innerText = "해당 가게가 없습니다.";
                    searchstoreStoreCon.append(message);
                } else {
					/*alert("가게들 정보 가져옴 1");*/
                    storeAllList.forEach(store => {
                        // 각 가게의 주소를 좌표로 변환
                        let geocoder = new kakao.maps.services.Geocoder();
                        geocoder.addressSearch(store.address, function(result, status) {
                            if (status === kakao.maps.services.Status.OK) {
                                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                                
                                // 마커 추가
                                addMarker(store.storeName, coords);
                    
                                // 가게 요소 생성 및 추가
                                const storeElement = createStoreElementForSearch(store);
                               /* alert("가게들 정보 가져옴 3");*/
                                document.querySelector("#storeList-b").append(storeElement);
                                /*alert("가게들 정보 가져옴 4");*/
                            } else {
                                console.error('주소를 좌표로 변환할 수 없습니다.');
                            }
                        });
                    });

                    
                    setTimeout(()=>{
                        addStoeLikeFn()
                        applyFunctionsToNewElements();
                    }, 100)
                }
            });
    }


    searchButton.addEventListener("click", () => {
        const searchStoreRValue = searchStoreR.value.trim();
        if (searchStoreRValue !== "") {
            searchStores(searchStoreRValue);
        } else {
            alert("검색어를 입력해주세요.");
        }
    });

    searchStoreR.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const searchStoreRValue = searchStoreR.value.trim();
            if (searchStoreRValue !== "") {
                searchStores(searchStoreRValue);
            } else {
                alert("검색어를 입력해주세요.");
            }
        }
    });
});





/* 가게 주소  */

/* 가게 주소 및 '더 보기/접기' 기능 추가 */
const applyFunctionsToNewElements = () => {
    // '더 보기/접기' 기능 추가
    const searchStoreLocContents = document.querySelectorAll('.searchstore-detailInfo-container');
    searchStoreLocContents.forEach(function (searchStoreLocContent) {
        const storelocboxTwo = searchStoreLocContent.querySelector('.storelocbox-two');
        const moreAddress = searchStoreLocContent.querySelector('.more-address');
        const lessAddress = searchStoreLocContent.querySelector('.less-address');

        moreAddress.addEventListener('click', () => {
            moreAddress.style.display = 'none';
            lessAddress.style.display = 'block';
            storelocboxTwo.style.display = 'block';
        });

        lessAddress.addEventListener('click', () => {
            lessAddress.style.display = 'none';
            moreAddress.style.display = 'flex';
            storelocboxTwo.style.display = 'none';
        });
    });

    // 가게 전화번호 포맷팅
    const phoneFormatter = (storeTel) => {
        return storeTel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    }
  
    const storeTelElements = document.querySelectorAll('.searchMemberTel');
    storeTelElements.forEach(function(storeTelElement) {
        var storeTel = storeTelElement.textContent.trim();
        var formattedTel = phoneFormatter(storeTel);
        storeTelElement.textContent = formattedTel;
    });
}