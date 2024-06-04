CREATE TABLE "MEMBER" (
	"MEMBER_NO"	NUMBER		NOT NULL,
	"MEMBER_CODE"	CHAR(1)	DEFAULT 1	NOT NULL,
	"MEMBER_ID"	NVARCHAR2(20)		NOT NULL,
	"MEMBER_EMAIL"	NVARCHAR2(50)		NOT NULL,
	"MEMBER_NAME"	NVARCHAR2(15)		NOT NULL,
	"MEMBER_NICKNAME"	NVARCHAR2(20)		NULL,
	"MEMBER_PW"	NVARCHAR2(100)		NOT NULL,
	"MEMBER_TEL"	CHAR(11)		NOT NULL,
	"PROFILE_IMG"	VARCHAR2(300)	DEFAULT '/images/user.png'	NULL,
	"ENROLL_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"MEMBER_STATUS"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"MEMBER_FLAG"	NUMBER	DEFAULT 0	NULL
);

COMMENT ON COLUMN "MEMBER"."MEMBER_NO" IS '회원 번호(PK)';

COMMENT ON COLUMN "MEMBER"."MEMBER_CODE" IS '일반 회원: 1 / 가게  주인: 2 / 관리자 : 3';

COMMENT ON COLUMN "MEMBER"."MEMBER_ID" IS '회원 아이디';

COMMENT ON COLUMN "MEMBER"."MEMBER_EMAIL" IS '회원 이메일';

COMMENT ON COLUMN "MEMBER"."MEMBER_NAME" IS '회원 이름';

COMMENT ON COLUMN "MEMBER"."MEMBER_NICKNAME" IS '회원 닉네임';

COMMENT ON COLUMN "MEMBER"."MEMBER_PW" IS '회원 비밀번호(암호화)';

COMMENT ON COLUMN "MEMBER"."MEMBER_TEL" IS '회원 전화번호';

COMMENT ON COLUMN "MEMBER"."PROFILE_IMG" IS '프로필 이미지';

COMMENT ON COLUMN "MEMBER"."ENROLL_DATE" IS '회원 가입일';

COMMENT ON COLUMN "MEMBER"."MEMBER_STATUS" IS '회원 탈퇴 여부 ( Y / N / W )';

COMMENT ON COLUMN "MEMBER"."MEMBER_FLAG" IS '회원 경고 횟수';

CREATE TABLE "RESERVATION" (
	"RESERV_NO"	NUMBER		NOT NULL,
	"RESERV_DATE"	DATE		NOT NULL,
	"RESERV_TIME"	NVARCHAR2(20)		NOT NULL,
	"RESERV_COUNT"	NUMBER		NOT NULL,
	"RESERV_STATUS_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"RESERV_REQUEST"	NVARCHAR2(2000)		NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL
);

COMMENT ON COLUMN "RESERVATION"."RESERV_NO" IS '예약 번호 (PK)';

COMMENT ON COLUMN "RESERVATION"."RESERV_DATE" IS '예약 일자';

COMMENT ON COLUMN "RESERVATION"."RESERV_TIME" IS '이용 시간';

COMMENT ON COLUMN "RESERVATION"."RESERV_COUNT" IS '예약 인원';

COMMENT ON COLUMN "RESERVATION"."RESERV_STATUS_FL" IS '예약 상태 ( N: 예약대기 / Y:예약확정 / C: 예약 취소 /  X: 노쇼)';

COMMENT ON COLUMN "RESERVATION"."RESERV_REQUEST" IS '예약 시 요청사항';

COMMENT ON COLUMN "RESERVATION"."MEMBER_NO" IS '회원 번호(FK)';

COMMENT ON COLUMN "RESERVATION"."STORE_NO" IS '사업자 등록 번호 (fK)';

CREATE TABLE "STORE" (
	"STORE_NO"	NVARCHAR2(30)		NOT NULL,
	"STORE_NAME"	NVARCHAR2(50)		NOT NULL,
	"STORE_INFO"	NVARCHAR2(1000)		NULL,
	"STORE_LOCATION"	NVARCHAR2(300)		NOT NULL,
	"STORE_STATUS"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"STORE_MAX_NUMBER"	NUMBER		NULL,
	"STORE_TEL"	CHAR(11)		NOT NULL,
	"OPEN_HOUR"	NVARCHAR2(20)		NOT NULL,
	"CLOSE_HOUR"	NVARCHAR2(20)		NOT NULL,
	"BREAKTIME_START"	NVARCHAR2(20)		NULL,
	"BREAKTIME_END"	NVARCHAR2(20)		NULL,
	"STORE_CLOSED"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"STORE_IMG"	NVARCHAR2(300)		NOT NULL,
	"TOTAL_RATING"	NUMBER		NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"STORE_MAX_TABLE"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "STORE"."STORE_NO" IS '사업자 등록 번호 (PK)';

COMMENT ON COLUMN "STORE"."STORE_NAME" IS '음식점 이름';

COMMENT ON COLUMN "STORE"."STORE_INFO" IS '음식점 소개';

COMMENT ON COLUMN "STORE"."STORE_LOCATION" IS '음식점 위치';

COMMENT ON COLUMN "STORE"."STORE_STATUS" IS '예약 가능 여부( Y / N )';

COMMENT ON COLUMN "STORE"."STORE_MAX_NUMBER" IS '최대 예약 인원';

COMMENT ON COLUMN "STORE"."STORE_TEL" IS '음식점 전화번호';

COMMENT ON COLUMN "STORE"."OPEN_HOUR" IS '영업 시간';

COMMENT ON COLUMN "STORE"."CLOSE_HOUR" IS '영업 종료 시간';

COMMENT ON COLUMN "STORE"."BREAKTIME_START" IS '브레이크 타임 시작 시간';

COMMENT ON COLUMN "STORE"."BREAKTIME_END" IS '브레이크 타임 종료 시간';

COMMENT ON COLUMN "STORE"."STORE_CLOSED" IS '폐업 여부 ( Y / N )';

COMMENT ON COLUMN "STORE"."STORE_IMG" IS '가게 이미지';

COMMENT ON COLUMN "STORE"."TOTAL_RATING" IS '합산, 계산한 별점';

COMMENT ON COLUMN "STORE"."MEMBER_NO" IS '회원 번호(FK)';

COMMENT ON COLUMN "STORE"."STORE_MAX_TABLE" IS '쵀대 예약 팀 수(테이블)';

CREATE TABLE "REVIEW" (
	"REVIEW_NO"	NUMBER	NOT NULL,
	"REVIEW_RATING"	NUMBER		NULL,
	"REVIEW_CONTENT"	NVARCHAR2(1000)		NULL,
	"REVIEW__REG_DATE"	DATE		NOT NULL,
	"REVIEW_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL,
	"MENU_NO"	NUMBER	NOT NULL
);

COMMENT ON COLUMN "REVIEW"."REVIEW_NO" IS '후기글 번호 (PK)';

COMMENT ON COLUMN "REVIEW"."REVIEW_RATING" IS '개인이 부여한 별점';

COMMENT ON COLUMN "REVIEW"."REVIEW_CONTENT" IS '후기 내용';

COMMENT ON COLUMN "REVIEW"."REVIEW__REG_DATE" IS '후기 작성일';

COMMENT ON COLUMN "REVIEW"."REVIEW_DEL_FL" IS '후기 삭제 여부 ( Y / N )';

COMMENT ON COLUMN "REVIEW"."MEMBER_NO" IS '예약한 회원 번호(FK)';

COMMENT ON COLUMN "REVIEW"."STORE_NO" IS '사업자 등록 번호 (FK)';

COMMENT ON COLUMN "REVIEW"."MENU_NO" IS '메뉴 번호 (PK)';

CREATE TABLE "REVIEW_HASH" (
	"REVIEW_NO"	NUMBER		NOT NULL,
	"HASH_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "REVIEW_HASH"."REVIEW_NO" IS '후기글 번호 (PFK)';

COMMENT ON COLUMN "REVIEW_HASH"."HASH_NO" IS '해시태그 번호 (PFK)';

CREATE TABLE "CATEGORY" (
	"CATEGORY_CODE"	NUMBER		NOT NULL,
	"CATEGORY_TITLE"	NVARCHAR2(15)		NOT NULL
);

COMMENT ON COLUMN "CATEGORY"."CATEGORY_CODE" IS '카테고리 코드 (PK)';

COMMENT ON COLUMN "CATEGORY"."CATEGORY_TITLE" IS '카테고리 이름';

CREATE TABLE "BOOKMARK" (
	"MEMBER_NO"	NUMBER		NOT NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL
);

COMMENT ON COLUMN "BOOKMARK"."MEMBER_NO" IS '회원 번호(PFK)';

COMMENT ON COLUMN "BOOKMARK"."STORE_NO" IS '사업자 등록 번호 (PFK)';

CREATE TABLE "STORE_CATEGORY" (
	"STORE_NO"	NVARCHAR2(30)		NOT NULL,
	"CATEGORY_CODE"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "STORE_CATEGORY"."STORE_NO" IS '사업자 등록 번호 (PFK)';

COMMENT ON COLUMN "STORE_CATEGORY"."CATEGORY_CODE" IS '카테고리 코드 (PFK)';

CREATE TABLE "HASH" (
	"HASH_NO"	NUMBER		NOT NULL,
	"HASH_TITLE"	NVARCHAR2(20)		NOT NULL
);

COMMENT ON COLUMN "HASH"."HASH_NO" IS '해시태그 번호 (PK)';

COMMENT ON COLUMN "HASH"."HASH_TITLE" IS '해시태그 내용';

CREATE TABLE "MENU" (
	"MENU_NO"	NUMBER	NOT NULL,
	"MENU_TITLE"	NVARCHAR2(100)		NOT NULL,
	"MENU_AMOUNT"	NUMBER		NOT NULL,
	"MENU_CONTENT"	NVARCHAR2(300)		NULL,
	"MENU_IMG_URL"	VARCHAR2(300)		NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL
);

COMMENT ON COLUMN "MENU"."MENU_NO" IS '메뉴 번호 (PK)';

COMMENT ON COLUMN "MENU"."MENU_TITLE" IS '메뉴';

COMMENT ON COLUMN "MENU"."MENU_AMOUNT" IS '가격';

COMMENT ON COLUMN "MENU"."MENU_CONTENT" IS '추가 기재 내용';

COMMENT ON COLUMN "MENU"."MENU_IMG_URL" IS '메뉴 이미지';

COMMENT ON COLUMN "MENU"."STORE_NO" IS '사업자 등록 번호 (FK)';

CREATE TABLE "REVIEW_REPLY" (
	"REPLY_NO"	NUMBER		NOT NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL,
	"REPLY_CONENT"	NVARCHAR2(1000)		NOT NULL,
	"REPLY_REG_DATE"	DATE		NOT NULL,
	"REPLY_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"REVIEW_NO"	NUMBER	NOT NULL
);

COMMENT ON COLUMN "REVIEW_REPLY"."REPLY_NO" IS '사장님 댓글 번호 (PK)';

COMMENT ON COLUMN "REVIEW_REPLY"."STORE_NO" IS '사업자 등록 번호';

COMMENT ON COLUMN "REVIEW_REPLY"."REPLY_CONENT" IS '댓글 내용';

COMMENT ON COLUMN "REVIEW_REPLY"."REPLY_REG_DATE" IS '댓글 작성일';

COMMENT ON COLUMN "REVIEW_REPLY"."REPLY_DEL_FL" IS '댓글 삭제 여부 ( Y /  N)';

COMMENT ON COLUMN "REVIEW_REPLY"."REVIEW_NO" IS '후기글 번호 (PK)';

CREATE TABLE "REPORT" (
	"REPORT_NO"	NUMBER		NOT NULL,
	"REPORT_CONTENT"	NVARCHAR2(1000)		NOT NULL,
	"REVIEW_NO"	NUMBER		NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "REPORT"."REPORT_NO" IS '댓글 신고 번호 (PK)';

COMMENT ON COLUMN "REPORT"."REPORT_CONTENT" IS '신고 내용';

COMMENT ON COLUMN "REPORT"."REVIEW_NO" IS '후기글 번호 (FK)';

COMMENT ON COLUMN "REPORT"."MEMBER_NO" IS '회원 번호(PK)';

CREATE TABLE "UPLOAD_IMAGE" (
	"IMAGE_NO"	NUMBER	NOT NULL,
	"IMAGE_PATH"	VARCHAR2(500)		NOT NULL,
	"IMG_RENAME"	VARCHAR2(100)		NOT NULL,
	"IMG_UPLOAD_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"IMAGE_ORDER"	NUMBER		NOT NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL,
	"REVIEW_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "UPLOAD_IMAGE"."IMAGE_NO" IS '이미지 번호 (PK)';

COMMENT ON COLUMN "UPLOAD_IMAGE"."IMAGE_PATH" IS '이미지 경로';

COMMENT ON COLUMN "UPLOAD_IMAGE"."IMG_RENAME" IS '이미지 변경명';

COMMENT ON COLUMN "UPLOAD_IMAGE"."IMG_UPLOAD_DATE" IS '이미지 업로드 날짜';

COMMENT ON COLUMN "UPLOAD_IMAGE"."IMAGE_ORDER" IS '이미지 순서';

COMMENT ON COLUMN "UPLOAD_IMAGE"."STORE_NO" IS '사업자 등록 번호 (FK)';

COMMENT ON COLUMN "UPLOAD_IMAGE"."REVIEW_NO" IS '후기글 번호 (FK)';

CREATE TABLE "REQUEST_EDIT" (
	"REQUEST_NO"	NUMBER		NOT NULL,
	"REQUEST_CONTENT"	NVARCHAR2(1000)		NOT NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"REQUEST_CATEGORY_CODE"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "REQUEST_EDIT"."REQUEST_NO" IS '정정 접수 번호 (PK)';

COMMENT ON COLUMN "REQUEST_EDIT"."REQUEST_CONTENT" IS '신고 내용';

COMMENT ON COLUMN "REQUEST_EDIT"."STORE_NO" IS '사업자 등록 번호 (FK)';

COMMENT ON COLUMN "REQUEST_EDIT"."MEMBER_NO" IS '회원 번호(PK)';

COMMENT ON COLUMN "REQUEST_EDIT"."REQUEST_CATEGORY_CODE" IS '신고 카테고리 번호';

CREATE TABLE "STORE_OFF" (
	"OFF_NO"	NUMBER		NOT NULL,
	"OFF_DAY"	DATE		NULL,
	"OFF_WEEK"	NUMBER		NULL,
	"STORE_NO"	NVARCHAR2(30)		NOT NULL
);

COMMENT ON COLUMN "STORE_OFF"."OFF_NO" IS '휴무일 번호 (PK)';

COMMENT ON COLUMN "STORE_OFF"."OFF_DAY" IS '지정 휴일 (달력에서 선택!)';

COMMENT ON COLUMN "STORE_OFF"."STORE_NO" IS '사업자 등록 번호 (FK)';

CREATE TABLE "NOTIFICATION" (
	"NOTIFICATION_NO"	NUMBER		NOT NULL,
	"NOTIFICATION_CONTENT"	NVARCHAR2(500)		NOT NULL,
	"NOTIFICATION_CHECK"	CHAR	DEFAULT 'N'	NOT NULL,
	"NOTIFICATION_DATE"	DATE	DEFAULT CURRENT_DATE	NOT NULL,
	"NOTIFICATION_URL"	NVARCHAR2(500)		NOT NULL,
	"SEND_MEMBER_PROFILE_IMG"	VARCHAR2(300)		NULL,
	"SEND_MEMBER_NO"	NUMBER		NOT NULL,
	"RECEIVE_MEMBER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_NO" IS '알림 번호';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_CONTENT" IS '알림 내용';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_CHECK" IS '알림 확인';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_DATE" IS '알림 시간';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_URL" IS '알림 클릭시 이동하는 주소';

COMMENT ON COLUMN "NOTIFICATION"."SEND_MEMBER_PROFILE_IMG" IS '알림 보낸 회원 프로필 이미지';

COMMENT ON COLUMN "NOTIFICATION"."SEND_MEMBER_NO" IS '알림 보낸 회원 번호';

COMMENT ON COLUMN "NOTIFICATION"."RECEIVE_MEMBER_NO" IS '회원 번호 (FK)';

CREATE TABLE "REQUEST_CATEGORY" (
	"REQUEST_CATEGORY_CODE"	NUMBER		NOT NULL,
	"REQUEST_CATEGORY_TITLE"	NVARCHAR2(10)		NOT NULL
);

CREATE TABLE "AUTH_KEY" (
	"KEY_NO"	NUMBER		NOT NULL,
	"TEL_NUMBER"	NVARCHAR2(11)		NOT NULL,
	"AUTH_KEY"	NVARCHAR2(6)		NOT NULL,
	"CREATE_TIME"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "AUTH_KEY"."KEY_NO" IS '인증키 구분 번호 (시퀀스 생성)';

COMMENT ON COLUMN "AUTH_KEY"."TEL_NUMBER" IS '인증 전화번호';

COMMENT ON COLUMN "AUTH_KEY"."AUTH_KEY" IS '인증번호';

COMMENT ON COLUMN "AUTH_KEY"."CREATE_TIME" IS '인증 번호 생성 시간';


-----------------------------------------------------------------------------------------------------

ALTER TABLE "AUTH_KEY" ADD CONSTRAINT "PK_AUTH_KEY" PRIMARY KEY (
	"KEY_NO"
);

ALTER TABLE "MEMBER" ADD CONSTRAINT "PK_MEMBER" PRIMARY KEY (
	"MEMBER_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "PK_RESERVATION" PRIMARY KEY (
	"RESERV_NO"
);

ALTER TABLE "STORE" ADD CONSTRAINT "PK_STORE" PRIMARY KEY (
	"STORE_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "PK_REVIEW" PRIMARY KEY (
	"REVIEW_NO"
);

ALTER TABLE "REVIEW_HASH" ADD CONSTRAINT "PK_REVIEW_HASH" PRIMARY KEY (
	"REVIEW_NO",
	"HASH_NO"
);

ALTER TABLE "CATEGORY" ADD CONSTRAINT "PK_CATEGORY" PRIMARY KEY (
	"CATEGORY_CODE"
);

ALTER TABLE "BOOKMARK" ADD CONSTRAINT "PK_BOOKMARK" PRIMARY KEY (
	"MEMBER_NO",
	"STORE_NO"
);

ALTER TABLE "STORE_CATEGORY" ADD CONSTRAINT "PK_STORE_CATEGORY" PRIMARY KEY (
	"STORE_NO",
	"CATEGORY_CODE"
);

ALTER TABLE "HASH" ADD CONSTRAINT "PK_HASH" PRIMARY KEY (
	"HASH_NO"
);

ALTER TABLE "MENU" ADD CONSTRAINT "PK_MENU" PRIMARY KEY (
	"MENU_NO"
);

ALTER TABLE "REVIEW_REPLY" ADD CONSTRAINT "PK_REVIEW_REPLY" PRIMARY KEY (
	"REPLY_NO"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "PK_REPORT" PRIMARY KEY (
	"REPORT_NO"
);

ALTER TABLE "UPLOAD_IMAGE" ADD CONSTRAINT "PK_UPLOAD_IMAGE" PRIMARY KEY (
	"IMAGE_NO"
);

ALTER TABLE "REQUEST_EDIT" ADD CONSTRAINT "PK_REQUEST_EDIT" PRIMARY KEY (
	"REQUEST_NO"
);

ALTER TABLE "STORE_OFF" ADD CONSTRAINT "PK_STORE_OFF" PRIMARY KEY (
	"OFF_NO"
);

ALTER TABLE "NOTIFICATION" ADD CONSTRAINT "PK_NOTIFICATION" PRIMARY KEY (
	"NOTIFICATION_NO"
);

ALTER TABLE "REQUEST_CATEGORY" ADD CONSTRAINT "PK_REQUEST_CATEGORY" PRIMARY KEY (
	"REQUEST_CATEGORY_CODE"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "FK_MEMBER_TO_RESERVATION_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "FK_STORE_TO_RESERVATION_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "STORE" ADD CONSTRAINT "FK_MEMBER_TO_STORE_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_MEMBER_TO_REVIEW_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_STORE_TO_REVIEW_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_MENU_TO_REVIEW_1" FOREIGN KEY (
	"MENU_NO"
)
REFERENCES "MENU" (
	"MENU_NO"
);

ALTER TABLE "REVIEW_HASH" ADD CONSTRAINT "FK_REVIEW_TO_REVIEW_HASH_1" FOREIGN KEY (
	"REVIEW_NO"
)
REFERENCES "REVIEW" (
	"REVIEW_NO"
);

ALTER TABLE "REVIEW_HASH" ADD CONSTRAINT "FK_HASH_TO_REVIEW_HASH_1" FOREIGN KEY (
	"HASH_NO"
)
REFERENCES "HASH" (
	"HASH_NO"
);

ALTER TABLE "BOOKMARK" ADD CONSTRAINT "FK_MEMBER_TO_BOOKMARK_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "BOOKMARK" ADD CONSTRAINT "FK_STORE_TO_BOOKMARK_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "STORE_CATEGORY" ADD CONSTRAINT "FK_STORE_TO_STORE_CATEGORY_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "STORE_CATEGORY" ADD CONSTRAINT "FK_CATEGORY_TO_STORE_CATEGORY_1" FOREIGN KEY (
	"CATEGORY_CODE"
)
REFERENCES "CATEGORY" (
	"CATEGORY_CODE"
);

ALTER TABLE "MENU" ADD CONSTRAINT "FK_STORE_TO_MENU_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "REVIEW_REPLY" ADD CONSTRAINT "FK_REVIEW_TO_REVIEW_REPLY_1" FOREIGN KEY (
	"REVIEW_NO"
)
REFERENCES "REVIEW" (
	"REVIEW_NO"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "FK_REVIEW_TO_REPORT_1" FOREIGN KEY (
	"REVIEW_NO"
)
REFERENCES "REVIEW" (
	"REVIEW_NO"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "FK_MEMBER_TO_REPORT_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "UPLOAD_IMAGE" ADD CONSTRAINT "FK_STORE_TO_UPLOAD_IMAGE_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "UPLOAD_IMAGE" ADD CONSTRAINT "FK_REVIEW_TO_UPLOAD_IMAGE_1" FOREIGN KEY (
	"REVIEW_NO"
)
REFERENCES "REVIEW" (
	"REVIEW_NO"
);

ALTER TABLE "REQUEST_EDIT" ADD CONSTRAINT "FK_STORE_TO_REQUEST_EDIT_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "REQUEST_EDIT" ADD CONSTRAINT "FK_MEMBER_TO_REQUEST_EDIT_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "REQUEST_EDIT" ADD CONSTRAINT "FK_REQUEST_CATEGORY_TO_REQUEST_EDIT_1" FOREIGN KEY (
	"REQUEST_CATEGORY_CODE"
)
REFERENCES "REQUEST_CATEGORY" (
	"REQUEST_CATEGORY_CODE"
);

ALTER TABLE "STORE_OFF" ADD CONSTRAINT "FK_STORE_TO_STORE_OFF_1" FOREIGN KEY (
	"STORE_NO"
)
REFERENCES "STORE" (
	"STORE_NO"
);

ALTER TABLE "NOTIFICATION" ADD CONSTRAINT "FK_MEMBER_TO_NOTIFICATION_1" FOREIGN KEY (
	"RECEIVE_MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);





----- Check 제약 조건 --------------------------------------------------------------
-- 예약 가능 여부
ALTER TABLE "STORE"  ADD
CONSTRAINT "STORE_STATUS_CHECK"
CHECK("STORE_STATUS" IN('Y','N'));

-- 폐업 여부
ALTER TABLE "STORE"  ADD
CONSTRAINT "STORE_CLOSED_CHECK"
CHECK("STORE_CLOSED" IN('Y','N'));

-- 회원 상태 여부
ALTER TABLE "MEMBER"  ADD
CONSTRAINT "MEMBER_STATUS_CHECK"
CHECK("MEMBER_STATUS" IN('Y','N','W'));

-- 후기 삭제 여부
ALTER TABLE "REVIEW"  ADD
CONSTRAINT "REVIEW_DEL_FL_CHECK"
CHECK("REVIEW_DEL_FL" IN('Y','N'));

-- 사장님 댓글 삭제 여부
ALTER TABLE "REVIEW_REPLY"  ADD
CONSTRAINT "REPLY_DEL_FL_CHECK"
CHECK("REPLY_DEL_FL" IN('Y','N'));

-- 알림 확인 여부
ALTER TABLE "NOTIFICATION"  ADD
CONSTRAINT "NOTIFICATION_CHECK"
CHECK("NOTIFICATION_CHECK" IN('Y','N'));


-- 시퀀스 번호 모음 -----------------------------------------------------------------

--신고 카테고리 시퀀스 번호
CREATE SEQUENCE SEQ_REQUEST_CATEGORY_CODE NOCACHE;

--음식점 등록정보 시퀀스 번호
CREATE SEQUENCE SEQ_STORE_NO NOCACHE;

--메뉴 시퀀스 번호
CREATE SEQUENCE SEQ_MENU_NO NOCACHE;

--휴무일 시퀀스 번호
CREATE SEQUENCE SEQ_OFF_NO NOCACHE;

--가게 정보 정정요청 시퀀스 번호
CREATE SEQUENCE SEQ_REQUEST_NO NOCACHE;

--예약 정보 시퀀스 번호
CREATE SEQUENCE SEQ_RESERV_NO NOCACHE;

--가게 카테고리(검색용) 시퀀스 번호
CREATE SEQUENCE SEQ_CATEGORY_CODE NOCACHE;

--회원 시퀀스 번호
CREATE SEQUENCE SEQ_MEMBER_NO NOCACHE;

--후기글 시퀀스 번호
CREATE SEQUENCE SEQ_REVIEW_NO NOCACHE;

--댓글 신고 접수 시퀀스 번호
CREATE SEQUENCE SEQ_REPORT_NO NOCACHE;

--사장님 댓글 시퀀스 번호
CREATE SEQUENCE SEQ_REPLY_NO NOCACHE;

--해시태그 시퀀스 번호
CREATE SEQUENCE SEQ_HASH_NO NOCACHE;

--이미지 시퀀스 번호
CREATE SEQUENCE SEQ_IMAGE_NO NOCACHE;

--알림 시퀀스 번호
CREATE SEQUENCE SEQ_NOTIFICATION_NO NOCACHE;

--인증번호 시퀀스 번호
CREATE SEQUENCE SEQ_KEY_NO NOCACHE;

CREATE SEQUENCE SEQ_ROOM_NO NOCACHE;


--------------------------------------------------------

-- 멤버 샘플 데이터
INSERT INTO "MEMBER" VALUES(
 SEQ_MEMBER_NO.NEXTVAL,
 1,
 'member01',
 'member01@naver.com',
 '김일반',
 '일반 회원',
 '$2a$10$Hk7o/lS4Zebk3OMVyIbqqO3bcCGCG6WeMpqYz2K9accxXuB/S1aWm',
 '01011112222',
  DEFAULT,
  DEFAULT,
  DEFAULT,
	DEFAULT
 );
INSERT INTO "MEMBER" VALUES(
 SEQ_MEMBER_NO.NEXTVAL,
 2,
 'member02',
 'member02@naver.com',
 '김사장',
 '사장 회원',
 '$2a$10$Hk7o/lS4Zebk3OMVyIbqqO3bcCGCG6WeMpqYz2K9accxXuB/S1aWm',
 '01033334444',
 DEFAULT,
 DEFAULT,
 DEFAULT,
 DEFAULT
 );
INSERT INTO "MEMBER" VALUES(
 SEQ_MEMBER_NO.NEXTVAL,
 3,
 'member03',
 'member03@naver.com',
 '관리자',
 '관리자',
 '$2a$10$Hk7o/lS4Zebk3OMVyIbqqO3bcCGCG6WeMpqYz2K9accxXuB/S1aWm',
 '01055552222',
 DEFAULT,
 DEFAULT,
 DEFAULT,
 DEFAULT
 );

COMMIT;

-- 로그인 
SELECT MEMBER_NO, MEMBER_ID, MEMBER_CODE, MEMBER_EMAIL, MEMBER_NAME, MEMBER_NICKNAME, MEMBER_PW,
					MEMBER_TEL, PROFILE_IMG, MEMBER_STATUS, MEMBER_FLAG, 
					TO_CHAR(ENROLL_DATE,'YYYY"년" MM"월" DD"일" HH24"시" MI"분" SS"초"') ENROLL_DATE
			FROM MEMBER
			WHERE MEMBER_ID = 'member01'
			AND MEMBER_STATUS = 'N';

		

-- 예약 가능한 팀(테이블) 수 컬럼 추가
ALTER TABLE "STORE" ADD STORE_MAX_TABLE NUMBER;
SELECT * FROM STORE;

-- 멤버 수정
UPDATE "MEMBER" SET MEMBER_STATUS = 'N';

SELECT * FROM "MEMBER" m ORDER BY MEMBER_NO;

DELETE FROM STORE WHERE STORE_NO = 0000111111;

SELECT * FROM STORE ;

DELETE FROM "MEMBER" WHERE MEMBER_NO = '11';

COMMIT;

SELECT * FROM "MEMBER";

SELECT * FROM "MENU";

SELECT * FROM "RESERVATION"
WHERE STORE_NO=1;

DELETE FROM "REPORT"
WHERE STORE_NO= 1;

/*사장 회원 상태 변경*/
UPDATE "MEMBER" SET 
MEMBER_STATUS = 'N';

UPDATE "MEMBER" SET 
MEMBER_NICKNAME ='게살통통'
WHERE MEMBER_NO =20;

/*member02(사장회원), 멤버 코드 2 멤버 넘버 2 가게 넘버 1 샘플*/
UPDATE "STORE" SET  
 BREAKTIME_START ='13:00',
 BREAKTIME_END ='14:00',
 STORE_STATUS ='Y',

 WHERE MEMBER_NO =2;

ROLLBACK;


UPDATE "MEMBER" SET MEMBER_NAME = '노명진' WHERE MEMBER_TEL ='01026624515';


/*가게 신고 카테고리 넣기*/

ALTER TABLE "REQUEST_CATEGORY" MODIFY REQUEST_CATEGORY_TITLE NVARCHAR2(50);


INSERT INTO "REQUEST_CATEGORY" VALUES(
 SEQ_REQUEST_NO.NEXTVAL,
 '가게 기본 정보 수정'
);

SELECT * FROM "BOOKMARK" 
WHERE STORE_NO=1;

 INSERT INTO "BOOKMARK" (MEMBER_NO, STORE_NO)
     VALUES(1, 1);
    
   DELETE FROM "BOOKMARK"
   WHERE STORE_NO=1000112345;
    
SELECT * FROM "REQUEST_CATEGORY";


COMMIT;
	
INSERT INTO "CATEGORY" VALUES(
 SEQ_CATEGORY_CODE.NEXTVAL,
 '가게 기본 정보 수정'
);
	   