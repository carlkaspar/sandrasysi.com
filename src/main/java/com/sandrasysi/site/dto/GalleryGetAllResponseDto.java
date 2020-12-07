package com.sandrasysi.site.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@AllArgsConstructor
public class GalleryGetAllResponseDto {
    private Long id;
    private String name;
    private String thumbnailImageUrl;
}
