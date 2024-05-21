package com.project.foodpin.review.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.foodpin.common.util.Utility;
import com.project.foodpin.review.model.dto.Review;
import com.project.foodpin.review.model.dto.UploadImg;
import com.project.foodpin.review.model.exception.ReviewInsertException;
import com.project.foodpin.review.model.mapper.ReviewMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class ReviewServiceImpl implements ReviewService {

	private final ReviewMapper mapper;

	@Value("${my.board.web-path}")
	private String webPath; 
	
	@Value("${my.board.folder-path}")
	private String folderPath; 
	
	
	// 리뷰 작성
	@Override
	public int insertReview(Review inputReview, List<MultipartFile> images) throws IllegalStateException, IOException {
		
		int result = mapper.reviewInsert(inputReview);
		
		if(result == 0) return 0;
		
		int reviewNo = inputReview.getReviewNo();

		List<UploadImg> uploadList = new ArrayList<>();
		
		for(int i=0 ; i<images.size() ; i++) {
			
			if(!images.get(i).isEmpty()) {
				
				String originalName = images.get(i).getOriginalFilename();
				
				String rename = Utility.fileRename(originalName);
				
				UploadImg img = UploadImg.builder()
								.imgRename(rename)
								.imagePath(webPath)
								.reviewNo(reviewNo)
								.imageOrder(i)
								.uploadFile(images.get(i))
								.imgOriginalName(originalName)
								.build();
				uploadList.add(img);
			}
			
		}
		
		if(uploadList.isEmpty()) {
			return reviewNo;
		}
		
		result = mapper.insertUploadList(uploadList);
		
		if(result == uploadList.size()) {
			
			// 서버에 파일 저장
			for(UploadImg img : uploadList) {
				img.getUploadFile().transferTo(new File(folderPath + img.getImgRename()));
			}
			
		}else {
			// 부분적으로 삽입 실패 -> 전체 서비스 실패로 판단
			// -> 이전에 삽입된 내용 모두 Rollback
			
			// -> rollback 하는 방법 == RuntimeException 강제 발생(@Transactional)
			
			throw new ReviewInsertException("이미지가 정상 삽입되지 않음");
			
		}
		
		
		return 0;
	}
	
}
