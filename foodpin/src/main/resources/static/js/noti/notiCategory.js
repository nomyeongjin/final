document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelectorAll(".all-notification .all > a");

    nav.forEach(item => {

        item.addEventListener("click", e => {
            e.preventDefault();

            if( !(/\d+/.test(item.id)) ){ // 전체 클릭
                selectnNotificationFn();
                return;
            }

            const notiCode = item.id.match(/\d+/)[0]; // 숫자 추출
            const memberType = item.id.match(/[a-zA-Z]+/)[0]; // 문자 추출

            const url = `/${memberType.toLowerCase()}/notification/${notiCode}`;
            console.log("url :", url);

            // selectnNotificationFn 함수 호출
            selectnNotificationFn(url);
        })
    })
});
