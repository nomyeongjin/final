package com.project.foodpin.myPage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
import com.project.foodpin.store.model.dto.Menu;
import com.project.foodpin.store.model.dto.Store;

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

		Store store = service.selectstoreInfo(loginMember.getMemberNo());
		
		// 불러온 store 정보에서 주소 쪼개기
		String storeLocation = store.getStoreLocation();
		String[] arr = storeLocation.split("\\^\\^\\^");
		
		model.addAttribute("store", store);
		
		model.addAttribute("postcode", arr[0]);
		model.addAttribute("address", arr[1]);
		model.addAttribute("detailAddress", arr[2]);
		
		return "myPage/store/storeInfo";
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
	@GetMapping(value="menuSelect", produces = "application/json")
	@ResponseBody
	public List<Menu> menuSelect(@RequestParam("storeNo") int storeNo) {
		
		return service.menuSelect(storeNo);
	}
	
	/** 메뉴 수정
	 * @param menuList
	 * @return
	 */
	@PostMapping(value="menuUpdate", produces = "application/json")
	@ResponseBody
	public int menuUpdate(@RequestBody List<Menu> inputMenuList) {
		
		List<MultipartFile> imgUrlList = new ArrayList<>();
		
		for (Menu menu : inputMenuList) {
			imgUrlList.add(menu.getImgUrl());
		}
		
//		MultipartFile imgUrl = inputList.;
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
	@PostMapping("calendarOffInsert")
	@ResponseBody
	public int calendarOffInsert(@RequestBody Off inputOff) {
		
		return service.calendarOffInsert(inputOff);
	}

	
	/** 예약 관리 화면 이동 (+예약 전체 조회)
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
