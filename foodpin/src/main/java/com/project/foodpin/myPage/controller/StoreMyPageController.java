package com.project.foodpin.myPage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.dto.Off;
import com.project.foodpin.myPage.model.service.StoreMyPageService;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.ReviewReply;
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.MenuContainer;
import com.project.foodpin.store.model.dto.Store;
import com.project.foodpin.store.model.dto.StoreCategory;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/store")
public class StoreMyPageController {

	private final StoreMyPageService service;
	

	/** 가게 정보 수정 화면 이동 (+ 가게 기본 정보 조회)
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("storeInfo")
	public String storeInfo(@SessionAttribute("loginMember") Member loginMember, Model model) {

		Store store = service.selectstoreInfo(loginMember.getMemberNo()); // 가게 정보
		
		List<StoreCategory> allCategory = service.selectCategoryAll(); // 존재하는 모든 카테고리 조회
		
		// 불러온 store 정보에서 주소 쪼개기
		String storeLocation = store.getStoreLocation();
		String[] arr = storeLocation.split("\\^\\^\\^");
		
		model.addAttribute("store", store); // 가게 정보
		model.addAttribute("category", allCategory); // 모든 카테고리 정보
		
		model.addAttribute("address", arr[1]);
		model.addAttribute("detailAddress", arr[2]);
		
		return "myPage/store/storeInfo";
	}
	
	/** 가게 정보 조회
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("storeInfoJs")
	@ResponseBody
	public Store storeInfoJs(@RequestParam("storeNo") String storeNo) {
		
		//Store store = service.selectstoreInfoJs(storeNo); // 가게 정보
		
		
		
		// 불러온 store 정보에서 주소 쪼개기
//		String storeLocation = store.getStoreLocation();
//		String[] arr = storeLocation.split("\\^\\^\\^");
//		
//		Map<String, Object> map = new HashMap<>();
//		
//		map.put("store", store);
//		map.put("address", arr[1]);
//		map.put("detailAddress", arr[2]);
		
		return service.selectstoreInfoJs(storeNo);
	}

	
	/** 카테고리 조회
	 * @param storeNo
	 * @return
	 */
	@GetMapping("selectCategoryAll")
	@ResponseBody
	public List<StoreCategory> selectCategory() {
		
		return service.selectCategoryAll();
	}
	
	/** 가게 카테고리 조회
	 * @param storeNo
	 * @return
	 */
	@GetMapping("selectCategory")
	@ResponseBody
	public List<StoreCategory> selectCategory(@RequestParam("storeNo") String storeNo) {
		
		return service.selectCategory(storeNo);
	}
	
	
	
	/** 가게 정보 수정
	 * @param loginMember
	 * @param storeImg
	 * @param inputStore
	 * @param model
	 * @param ra
	 * @return
	 */
	@PostMapping("storeInfoUpdate")
	public String storeInfoUpdate(@SessionAttribute("loginMember") Member loginMember, 
			@RequestParam("image") MultipartFile image, 
			Store inputStore, 
			Model model, RedirectAttributes ra) {
		
		inputStore.setMemberNo(loginMember.getMemberNo());
		
		int result = service.storeInfoUpdate(inputStore, image);
		
		String message = "";
		
		if(result > 0)	message = "가게 정보가 변경되었습니다.";
		
		else message = "가게 정보 변경을 실패했습니다.";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:/myPage/store/storeInfo";
	}
	
	// ------ 메뉴 ------
	
	/** 메뉴 조회 (비동기)
	 * @param loginMember
	 * @return menuList
	 */
	@GetMapping("menuSelect")
	@ResponseBody
	public List<Menu> menuSelect(@RequestParam("storeNo") int storeNo) {
		
		return service.menuSelect(storeNo);
	}
	
	/** 메뉴 수정
	 * @param menuList
	 * @return
	 */
	@PostMapping("menuUpdate")
	@ResponseBody
	public int menuUpdate(@RequestBody @ModelAttribute MenuContainer menuContainer) {
		
		// menuContainer에서 이미지파일 제외한 정보 inputMenuList로 분리
		List<Menu> inputMenuList =  menuContainer.getMenuList();
		
		List<MultipartFile> imgUrlList = new ArrayList<>(); // 이미지파일만 담아 줄 리스트 생성
		
		for (Menu menu : inputMenuList) {
			imgUrlList.add(menu.getMenuImg());
		}
		
		return service.menuUpdate(inputMenuList, imgUrlList);
	}
	
	
	// ------ 휴무일 ------
	
	/** 고정 휴무일 등록 / 수정 (비동기)
	 * @param off
	 * @return result
	 */
	@PostMapping("insertOffWeek")
	@ResponseBody
	public int insertOffWeek(@RequestBody List<Off> offList) {

		return service.updateOffWeek(offList);
	}
	
	
	/** 고정 휴무일 조회 (비동기, li로 불러오기)
	 * @param storeNo
	 * @return offList
	 */
	@PostMapping("selectWeekOff")
	@ResponseBody
	public List<Off> selectWeekOff(@RequestBody int storeNo) {
		
		List<Off> list = service.selectWeekOff(storeNo);
	
		return list;
	}
	
	/** 지정 휴무일 조회 (비동기, 캘린더로 불러오기)
	 * @param storeNo
	 * @return map
	 */
	@PostMapping("calendarOffSelect")
	@ResponseBody
	public List<Map<String, String>> calendarOffSelect(@RequestBody int storeNo) {
		
		List<Off> offList = service.calendarOffSelect(storeNo);
		
//		if(offList.isEmpty()) return null; // 지정 휴무일 조회 결과 없는 경우
			
		List<Map<String, String>> listMap = new ArrayList<>();
		
		for (Off off : offList) {
			
			Map<String, String> map = new HashMap<>();
			
			map.put("title", off.getOffDayTitle());
			map.put("start", off.getOffDayStart());
			map.put("end", off.getOffDayEnd());
			
			listMap.add(map);
		}
		
		return listMap;
	}
	
	/** 팝업창에서 지정 휴무일 등록
	 * @param inputOff
	 * @return
	 */
	@PostMapping("calendarOffCheck")
	@ResponseBody
	public int calendarOffCheck(@RequestBody Off inputOff) {
		
		return service.calendarOffCheck(inputOff);
	}

	/** 팝업창에서 지정 휴무일 등록
	 * @param inputOff
	 * @return
	 */
	@PostMapping("calendarOffInsert")
	@ResponseBody
	public int calendarOffInsert(@RequestBody Off inputOff) {
		
		return service.calendarOffInsert(inputOff);
	}
	
	/** 팝업창에서 지정 휴무일 변경
	 * @param inputOff
	 * @return
	 */
	@PostMapping("calendaroffUpdate")
	@ResponseBody
	public int calendaroffUpdate(@RequestBody Off inputOff) {
		
		return service.calendaroffUpdate(inputOff);
	}
	
	/** 팝업창에서 지정 휴무일 삭제 
	 * @param inputOff
	 * @return
	 */
	@PostMapping("calendaroffDelete")
	@ResponseBody
	public int calendaroffDelete(@RequestBody String storeNo) {
		
		return service.calendaroffDelete(storeNo);
	}
	
	// ------ 예약 관리 ------
	
	/** 예약 관리 화면 이동 (+예약 전체 조회)
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("reservation")
	public String reservation(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		List<Reservation> reservList = service.reservAll(loginMember.getMemberNo());
		
		model.addAttribute("reservList", reservList);
		model.addAttribute("storeNo", reservList.get(0).getStoreNo());
		
		return "myPage/store/reservation";
	}

	/** 예약 조회 (조건값 : reservStatusFl) (비동기)
	 * @return reservList
	 */
	@ResponseBody
	@GetMapping("selectReserv")
	public List<Reservation> selectReserv(@RequestParam("storeNo") String storeNo, @RequestParam("reservStatusFl") String reservStatusFl) {
		
		return service.selectReserv(storeNo, reservStatusFl);
	}
	
	/** 예약 승인 (비동기)
	 * @return result
	 */
	@ResponseBody
	@GetMapping("updateReservStatus")
	public int updateReservStatus(@RequestParam("reservNo") int reservNo) {
		
		return service.updateReservStatus(reservNo);
	}
	
	/** 예약 거절 (비동기)
	 * @return result
	 */
	@ResponseBody
	@GetMapping("rejectReservStatus")
	public int rejectReservStatus(@RequestParam("reservNo") int reservNo) {
		
		return service.rejectReservStatus(reservNo);
	}
	
	/** 캘린더에 맞는 형태로 확정된 예약 전체 조회 (비동기)
	 * @return reservList
	 */
	@ResponseBody
	@GetMapping("reservConfirm")
	public List<Map<String, String>> reservConfirm(@RequestParam("storeNo") String storeNo) {
		
		List<Reservation> reservList = service.reservConfirm(storeNo);
		
		// 확정된 예약 조회 결과 없는 경우
		if(reservList.isEmpty()) return null; 
			
		List<Map<String, String>> listMap = new ArrayList<>();
		
		for (Reservation reserv : reservList) {
			
			Map<String, String> map = new HashMap<>();
			
			map.put("title", reserv.getReservTime() + ", " + reserv.getReservCount() + "인");
			map.put("start", reserv.getReservDate());
			map.put("end", reserv.getReservDate());
			
			listMap.add(map);
		}
		
		return listMap;
	}
	
	
	
	//----
	@GetMapping("review")
	public String review(
		@SessionAttribute("loginMember") Member loginMember,
		Model model, RedirectAttributes ra
		) {
		
		int memberNo = loginMember.getMemberNo();
		
		List<Review> reviewList = service.reviewAll(memberNo);
		
		model.addAttribute("reviewList", reviewList);
		
		
		return "myPage/store/review/review";
	}
	
	
	// -----
	
	// -----
	

	/** 사장님 정보 변경 화면으로 전환
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("ceoInfo")
	public String ceoInfo(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		Member member = service.selectCeoInfo(loginMember.getMemberNo());
		
		model.addAttribute("member", member);
		
		return "myPage/store/ceoInfo";
	}
	
	/** 사장님 정보 변경 화면으로 전환 (비동기)
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@PostMapping("ceoInfoJs")
	@ResponseBody
	public Member ceoInfoJs(@SessionAttribute("loginMember") Member loginMember) {
		
		return service.selectCeoInfo(loginMember.getMemberNo());
	}
	
	/** 사장님 정보 변경
	 * @param loginMember
	 * @param inputMember
	 * @param model
	 * @param ra
	 * @return
	 */
	@PostMapping("ceoInfoUpdate")
	public String ceoInfoUpdate(@SessionAttribute("loginMember") Member loginMember, Member inputMember, 
			Model model, RedirectAttributes ra) {
		
		inputMember.setMemberNo(loginMember.getMemberNo());
		
		int result = service.ceoInfoUpdate(inputMember);
		
		String message = "";
		
		if(result > 0)	message = "사장님 정보가 변경되었습니다.";
		else	message = "사장님 정보에 실패했습니다.";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:/myPage/store/ceoInfo";
	}
	
	/** 사장님 정보 변경 (비동기)
	 * @param member
	 * @return result
	 */
	@PostMapping("ceoInfoUpdateJs")
	public int ceoInfoUpdateJs(@RequestBody Member member) {

		return service.ceoInfoUpdate(member);
	}
	
	/** 사장님 비밀번호 변경 (비동기)
	 * @param member
	 * @return result
	 */
	@PostMapping("ceoPwUpdate")
	@ResponseBody
	public int ceoPwUpdate(@SessionAttribute("loginMember") Member loginMember, @RequestBody Map<String, Object> map) {

		return service.ceoPwUpdate(loginMember.getMemberNo(), map);
	}
	
	@GetMapping("reviewAnswered")
	public String reviewAnsered(
		@SessionAttribute("loginMember") Member loginMember,
		Model model, RedirectAttributes ra) {
		
		int memberNo = loginMember.getMemberNo();
		
		List<Review> reviewList = service.reviewReply(memberNo);
		
		model.addAttribute("reviewList", reviewList);
		
		return "myPage/store/review/reviewAnswered";
	}
	
	
	
	/** 사장님 미답변 조회
	 * @param loginMember
	 * @param model
	 * @param ra
	 * @return
	 */
	@GetMapping("reviewUnanswered")
	public String reviewUnanswered(
			@SessionAttribute("loginMember") Member loginMember,
			Model model, RedirectAttributes ra
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		List<Review> reviewList = service.reviewAllNoReply(memberNo);
		
		model.addAttribute("reviewList", reviewList);
		
		
		return "myPage/store/review/reviewUnanswered";
	}
	
	/** 사장님 댓글 삽입
	 * @param loginMember
	 * @param replyContent
	 * @param inputReply
	 * @param ra
	 * @return
	 */
	@PostMapping("insertReply")
	public String insertReply(
	    @SessionAttribute("loginMember") Member loginMember,
	    ReviewReply inputReply,
	    RedirectAttributes ra) {
		
	    int result = service.insertReply(inputReply);
	    
	    String message = null;
	    
	    if(result > 0) {
	    	message = "답글이 작성되었습니다.";
	    } else {
	    	message = "답글 작성 실패했습니다.";
	    }
	    
	    ra.addFlashAttribute("message", message);
	    
	    return "redirect:/myPage/store/review";
	}
	
	
	/** 사장님 댓글 수정
	 * @param map
	 * @return
	 */
	@ResponseBody
	@PostMapping("updateReply")
	public int updateReply(@RequestBody Map<String, Object> map) {
		return service.updateReply(map);
	}
	
	
	/** 사장님 댓글 삭제
	 * @param replyNo
	 * @return
	 */
	@ResponseBody
	@PostMapping("deleteReply")
	public int deleteReply(@RequestBody int replyNo) {
		return service.deleteReply(replyNo);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
