package com.project.foodpin.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.MultipartConfigElement;



@Configuration // 시작하면 모든 메소드 다 읽음
@PropertySource("classpath:/config.properties") // <- 프로퍼티즈 파일 값을 읽어와서 필드의 value에 값을 넣음
public class FileConfig implements WebMvcConfigurer {

	// config.properties에 작성된 파일 업로드 임계값 얻어와 필드에 대입
	@Value("${spring.servlet.multipart.file-size-threshold}")
	private long fileSizeThreshold;
	
	@Value("${spring.servlet.multipart.max-request-size}")
	private long maxRequestSize; // 요청당 파일 최대 크기
	
	@Value("${spring.servlet.multipart.max-file-size}")
	private long maxFileSize; // 개별 파일당 최대 크기
	
	@Value("${spring.servlet.multipart.location}")
	private String location; // 임계값 초과 시 임시 저장 폴더 경로
	
	//---------
	// 프로필 이미지
	
	@Value("${my.profile.resource-handler}")
	private String profileResourceHandler; // 프로필 이미지 요청 주소 
	
	@Value("${my.profile.resource-location}")
	private String profileResourceLocation; // 프로필 이미지 요청 시 연결할 서버 폴더 경로
	
	//---------
	// 리뷰
	
	
	@Value("${my.board.resource-handler}")
	private String boardResourceHandler; // 게시글 이미지 요청 주소 
	
	@Value("${my.board.resource-location}")
	private String boardResourceLocation; // 게시글 이미지 요청 시 연결할 서버 폴더 경로
	
	//---------
	// 가게 이미지
	
	
	@Value("${my.store.resource-handler}")
	private String storeResourceHandler; // 게시글 이미지 요청 주소 
	
	@Value("${my.store.resource-location}")
	private String storeResourceLocation; // 게시글 이미지 요청 시 연결할 서버 폴더 경로

	
	// 요청 주소에 따라 서버 컴퓨터의 어떤 경로에 접근할지 설정 
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry
		.addResourceHandler("/myPage/file/**") // 클라이언트 요청 주소 패턴 <- 위 주소로 요청이 오면
		.addResourceLocations("file:///C:\\uploadFiles\\test\\"); // 아래 주로로 다운로드 (자원 요청 지정)
		
		// 프로필 이미지 요청 - 서버 폴더 연결 추가
		registry
		.addResourceHandler(profileResourceHandler)
		.addResourceLocations(profileResourceLocation);
		
		// -----
		// 리뷰 이미지 요청 - 서버 폴더 연결 추가
		registry
		.addResourceHandler(boardResourceHandler).addResourceLocations(boardResourceLocation);
		
		// -----
		// 리뷰 이미지 요청 - 서버 폴더 연결 추가
		registry
		.addResourceHandler(storeResourceHandler).addResourceLocations(storeResourceLocation);
		
		
		
	}
	
	/* MultipartResolver 설정 */
	@Bean
	public MultipartConfigElement configElement() { // 업로드된 파일이 팩토리의 파일을 조건에 맞는지 검사
		
		MultipartConfigFactory factory = new MultipartConfigFactory();
		
		factory.setFileSizeThreshold(DataSize.ofBytes(fileSizeThreshold)); // long을 byte만큼 치환해서 단위 지정
		factory.setMaxFileSize(DataSize.ofBytes(maxFileSize));
		factory.setMaxRequestSize(DataSize.ofBytes(maxRequestSize));
		factory.setLocation(location);
		
		return factory.createMultipartConfig(); //설정 완료후
	}
	
	
	// MultipartResolver 객체를 bean으로 추가 -> 추가후 위에서 만든 MultipartConfig를 자동으로 이용
	@Bean
	public MultipartResolver multipartResolver() { // 검사 설정 완료한 파일을 업로드
		StandardServletMultipartResolver multipartResolver
			= new StandardServletMultipartResolver();
		
		return multipartResolver;
	}
}
