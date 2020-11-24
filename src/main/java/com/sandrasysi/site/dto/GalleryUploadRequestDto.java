package com.sandrasysi.site.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class GalleryUploadRequestDto {
    private String name;
    private String thumbnailImageName;
    private MultipartFile[] files;
}
