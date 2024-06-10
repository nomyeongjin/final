/* 회원 정보 / 비밀번호 변경 화면 변경 */
const changePwBtn = document.querySelector("#changePwBtn");
const infoBtn = document.querySelector("#infoBtn");
const changePwContainer = document.querySelector("#changePwContainer");
const infoContainer = document.querySelector("#infoContainer");

document.addEventListener('DOMContentLoaded', function() {    

    infoBtn.classList.add('title-btn-checked');
    changePwBtn.classList.remove('title-btn-checked');

    infoContainer.style.display = "block";
    changePwContainer.style.display = "none";
    
    infoBtn.addEventListener("click", function() {
        document.querySelectorAll(".sub-title-btn").forEach(btn => {
            btn.classList.remove('title-btn-checked');
        });
        infoBtn.classList.add('title-btn-checked');
        changePwContainer.style.display = "none";
        infoContainer.style.display = "block";
    });

    changePwBtn.addEventListener("click", function() {
        changePwBtn.classList.add('title-btn-checked');
        infoBtn.classList.remove('title-btn-checked');
        infoContainer.style.display = "none";
        changePwContainer.style.display = "block";
    });
});


/* 프로필 사진 변경 / 삭제 */

/* 회원정보 수정 */
const memberInfo = document.querySelector("#updateInfo");

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

                const temp = backupInput.cloneNode(true);
                profileInput.after(backupInput);
                profileInput.remove();
                profileInput = backupInput;
                profileInput.addEventListener("change", changeImageFn);
                backupInput = temp;
                return;
        }
        

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.addEventListener("load", e => {
            const url = e.target.result;
            profileImg.setAttribute("src", url);
            backupInput = profileInput.cloneNode(true);
        });
    }

    profileInput.addEventListener("change", changeImageFn);

    deleteImage.addEventListener("click", () => {
        profileImg.src = "/images/user.png";
        profileInput.value = '';
        backupInput = undefined;
    });

         
    memberInfo.addEventListener("submit", e => {

        const memberNickname = document.querySelector("#memberNickname");
        const memberEmail = document.querySelector("#memberEmail");
        const memberTel = document.querySelector("#memberTel");
        
        let regExp = /^[가-힣\w\d]{2,10}$/;
        if(!regExp.test(memberNickname.value)) {
            alert("닉네임이 유효하지 않습니다");
            e.preventDefault();
            return;
        }

        regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regExp.test(memberEmail.value)) {
            alert("이메일이 유효하지 않습니다");
            e.preventDefault();
            return;
        }

        regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        if(!regExp.test(memberTel.value)) {
            alert("전화번호가 유효하지 않습니다");
            e.preventDefault();
            return;
        }

        let str;

        if(memberNickname.value.trim().length == 0) str = "닉네임을 입력해 주세요";
        else if(memberEmail.value.trim().length == 0) str = "이메일을 입력해 주세요";
        else if(memberTel.value.trim().length == 0) str = "전화번호를 입력해 주세요";
        
        if(str != undefined) {
            alert(str);
            e.preventDefault();
            return;
        }
    });
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