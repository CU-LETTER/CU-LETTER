package com.culetter;

import com.culetter.api.dto.FileDto;
import com.culetter.api.service.FileService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CuletterApplicationTests {

	private final FileService fileService;

	@Autowired
	CuletterApplicationTests(FileService fileService) {
		this.fileService = fileService;
	}

	@Test
	void contextLoads() {
	}

	@Test
	void fileServiceTest() {
//		List<FileDto.FileInfoWithEmotion> fileInfoWithEmotionList = fileService
//				.getFileInfoWithEmotionListByType("music","happy");
//		for (FileDto.FileInfoWithEmotion f:fileInfoWithEmotionList) {
//			System.out.println(f.getFileName()+" "+f.getFilePath()+" "+f.getUrl()+" "+f.getEmotion());
//		}
	}

}
