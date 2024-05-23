package com.project.foodpin.myPage.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.myPage.model.service.StoreMyPageService;
import com.project.foodpin.reservation.model.dto.Reservation;
import com.project.foodpin.store.model.dto.Store;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("myPage/store")
@SessionAttributes({"storeNo"})
public class StoreMyPageController {

	private final StoreMyPageService service;
	
	
//	@GetMapping("selectStoreNo")
//	public String selectStoreNo(@SessionAttribute("loginMember") Member loginMember, Model model) {
//		
//		int memberNo = loginMember.getMemberNo();
//		int storeNo  = service.selectStoreNo(memberNo); // 세션에서 얻어온 회원번호로 사업자 번호 조회
//		
//		model.addAttribute("storeNo", storeNo); // 사업자 번호
//		
//		return "redirect:/";
//	}
	

	/** 가게 정보 수정 화면 이동 + 가게 기본 정보 조회
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("storeInfo")
	public String storeInfo(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		Store store = service.selectstoreInfo(loginMember.getMemberNo());
		model.addAttribute("store", store);
		
		return "myPage/store/storeInfo";
	}
	
	
	
	
	
//	@GetMapping("storeInfo")
//	public String storeInfo() {
//		return "myPage/store/storeInfo";
//	}
	
	
	
	
	
	
	
	// -----------------------------
	
	/** 예약 관리 화면 이동 (+ 예약 전체 조회)
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("reservation")
	public String reservation(@SessionAttribute("loginMember") Member loginMember, Model model) {
		
		List<Reservation> reservList = service.reservAll(loginMember.getMemberNo());
		
		model.addAttribute("reservList", reservList);
		
		return "myPage/store/reservation";
	}

	/** 예약 전체 조회 (비동기)
	 * @return reservList
	 */
	@ResponseBody
	@GetMapping("selectReserv")
	public List<Reservation> selectReserv(@RequestParam("statusFl") String statusFl, @SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		
		System.out.println(statusFl);
		if(statusFl == null) {
			List<Reservation> reservList = service.reservAll(memberNo);
			
			return reservList;
		}
		
		return null;
	}
	
	/** 확정된 예약 전체 조회 (비동기)
	 * @return reservList
	 */
	@ResponseBody
	@GetMapping("reservConfirm")
	public List<Reservation> reservConfirm(@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
		return service.reservConfirm(memberNo);
	}
	
	
	//----
	@GetMapping("review")
	public String review() {
		return "myPage/store/review";
	}
	
	
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
	@PostMapping("ceoInfo")
	@ResponseBody
	public Member ceoInfo(@RequestBody int memberNo) {
		
		return service.selectCeoInfo(memberNo);
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
	
	
	
	
	
	

}
