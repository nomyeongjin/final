/* 회원 정보 / 비밀번호 변경 화면 변경 */
const changePwBtn = document.querySelector("#changePwBtn");
const infoBtn = document.querySelector("#infoBtn");
const changePwContainer = document.querySelector("#changePwContainer");
const infoContainer = document.querySelector("#infoContainer");

document.addEventListener('DOMContentLoaded', function() {    

    infoContainer.style.display = "block";
    changePwContainer.style.display = "none";
    
    infoBtn.addEventListener("click", function() {
        changePwContainer.style.display = "none";
        infoContainer.style.display = "block";
    });

    changePwBtn.addEventListener("click", function() {
        infoContainer.style.display = "none";
        changePwContainer.style.display = "block";
    });
});


/* 프로필 사진 변경 / 삭제 */

/* 회원정보 수정 */
const memberInfo = document.querySelector("#updateInfo");

let statusCheck = -1;

let backupInput;

if(memberInfo != null) {

    const profileImg = document.querySelector("#profileImg");
    const profileInput = document.querySelector("#profileInput");
    const deleteImage = document.querySelector("#deleteImage");

    const changeImageFn = e => {
        const maxSize = 1024 * 1024 * 5;

        const file = e.target.files[0];

        if(file == undefined) {
            const temp = backupInput.cloneNode(true);
            profileInput.after(backupInput);
            profileInput.remove();
            profileInput = backupInput;
            profileInput.addEventListener("change", changeImageFn);
            backupInput = temp;
            return;
        }

        if(file.size > maxSize) {
            alert("5MB 이하의 이미지 파일을 선택해 주세요");

            if(statusCheck == -1) {
                profileInput.value = '';
            } else {
                const temp = backupInput.cloneNode(true);
                profileInput.after(backupInput);
                profileInput.remove();
                profileInput = backupInput;
                profileInput.addEventListener("change", changeImageFn);
                backupInput = temp;
            }
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.addEventListener("load", e => {
            const url = e.target.result;
            profileImg.setAttribute("src", url);
            statusCheck = 1;
            backupInput = profileInput.cloneNode(true);
        });
    }

    profileInput.addEventListener("change", changeImageFn);

    deleteImage.addEventListener("click", () => {
        profileImg.src = "/images/user.png";
        profileInput.value = '';
        backupInput = undefined;
        statusCheck = 0;
    });

    memberInfo.addEventListener("submit", e => {

        let flag = true; 

        // 기존 프로필 이미지가 없다가 새 이미지가 선택된 경우
        if(loginMemberProfileImg == null && statusCheck == 1) flag = false;

        // 기존 프로필 이미지가 있다가 삭제한 경우
        if(loginMemberProfileImg != null && statusCheck == 0) flag = false;

        // 기존 프로필 이미지가 있다가 새 이미지가 선택된 경우
        if(loginMemberProfileImg != null && statusCheck == 1) flag = false;
        
        if(flag) {
            e.preventDefault();
            alert("이미지 변경 후 클릭하세요")
        }

        const memberNickname = document.querySelector("#memberNickname");
        const memberEmail = document.querySelector("#memberEmail");
        const memberTel = document.querySelector("#memberTel");
        
        let str;
        
        if(memberNickname.value.trim().length == 0) str = "닉네임을 입력해 주세요";
        else if(memberEmail.value.trim().length == 0) str = "이메일을 입력해 주세요";
        else if(memberTel.value.trim().length == 0) str = "전화번호를 입력해 주세요";
        
        if(str != undefined) {
            alert(str);
            e.preventDefault();
            return;
        }
        
        // 닉네임, 이멜, 전번 유효성 추가하세요
        
        
    })
}

/* 회원 비밀번호 변경 */
const memberChangePw = document.querySelector("#memberChangePw");

if(memberChangePw != null) {
    memberChangePw.addEventListener("submit", e => {
        
        const currentPw = document.querySelector("#currentPw");
        const newPw = document.querySelector("#newPw");
        const newPwConfirm = document.querySelector("#newPwConfirm");
        
        let str;
        
        if(currentPw.value.trim().length == 0) str = "현재 비밀번호를 입력해 주세요";
        else if(newPw.value.trim().length == 0) str = "새 비밀번호를 입력해 주세요";
        else if(newPwConfirm.value.trim().length == 0) str = "새 비밀번호의 확인창을 입력해 주세요";
        
        if(str != undefined) {
            alert(str);
            e.preventDefault();
            return;
        }
        
        const regExp = /^[a-zA-Z0-9!@#_-]{6,20}$/;
        
        if(!regExp.test(newPw.value)) {
            alert("새 비밀번호가 유효하지 않습니다");
            e.preventDefault();
            return;
        }
        
        if(newPw.value != newPwConfirm.value) {
            alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다");
            e.preventDefault();
            return;
        }
    });
}