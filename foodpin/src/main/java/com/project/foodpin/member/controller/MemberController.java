package com.project.foodpin.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.foodpin.member.model.dto.Member;
import com.project.foodpin.member.model.service.MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

	private final MemberService service;
	
	/** 로그인 페이지로 이동
	 * @return
	 */
	@GetMapping("login")
	public String loginPage() {
		return "/member/login";
	}
	
	/** 로그인
	 * @param inputMember : 커맨드 객체 (@ModelAttribute 생략)
	 * 						(memberEmail, memberPw 세팅된 상태)
	 * @param ra : 리다이렉트시 request scope로 데이터를 전달하는 객체
	 * @param model : 데이터 전달용 객체 (request scope)
	 * @param saveId : 아이디 저장 체크 여부
	 * @param resp : 쿠키 생성, 추가를 위해 얻어온 객체
	 * @return "redirect:/"
	 */
	@PostMapping("login")
	public String login(
		RedirectAttributes ra,
		Member inputMember,
		Model model,
		@RequestParam(value="saveId",required=false) String saveId,
		HttpServletResponse resp
			) {
		// 로그인 서비스 호출
		Member loginMember = service.login(inputMember);
		
		// 로그인 실패 시
		if(loginMember == null) {
			ra.addFlashAttribute("message","아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		
		// 로그인 성공 시
		if(loginMember != null) {
			// Session scope에 loginMember 추가
			model.addAttribute("loginMember",loginMember);
			
			/*************************************************************/
		
			// 아이디 저장(Cookie) 
			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
			
			cookie.setPath("/");
			
			// 만료 기간 지정
			if(saveId !=null) {
				cookie.setMaxAge(60*60*24*30); // 초 단위로 지정
			}else { // 미 체크시
				cookie.setMaxAge(0); // 0초 -> 이전 기록을 덮어써 쿠키를 삭제하기 위함
			}
			
			// 응답객체에 쿠키 추가 -> 클라이언트로 전달
			resp.addCookie(cookie);
			
			
			/*************************************************************/
		}
		
		return "redirect:/";
	}
	
	
	/** 로그아웃
	 * @param SessionStatus 
	 * @return
	 */
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete();//세션을 완료 시킴 (없앰)
		return "redirect:/";
		
	}
	
	/** 빠른 로그인
	 * @param memberId
	 * @param model
	 * @param ra
	 * @return
	 */
	@GetMapping("quickLogin")
	public String quickLogin(
			@RequestParam("memberId") String memberId,
			Model model, 
			RedirectAttributes ra
			) {
		
			Member loginMember = service.quickLogin(memberId);
			
			
			if(loginMember==null) {
				ra.addFlashAttribute("message","해당 이메일을 가진 회원이 존재하지 않습니다.");
			}else {
				model.addAttribute("loginMember",loginMember);
			}
 		
			
			
		return "redirect:/";
	}
	
	
	
	
}
