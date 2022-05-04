package com.culetter.api.service;

import com.culetter.db.entity.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface FileService {
    String uploadImage(MultipartFile multipartFile, String folderPath);
    List<File> getFileListByType(String type);
//    List<FileDto.FileInfoWithEmotion> loadFileInfoWithEmotionListByType(String type, String emotion);
//    List<FileDto.FileInfoWithEmotion> getFileInfoWithEmotionListByType(String type, String emotion);
    void deleteImage(String url);
}
