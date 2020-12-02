package com.sandrasysi.site.controllers;

import com.sandrasysi.site.dto.ImageResponseDto;
import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.services.FileService;
import com.sandrasysi.site.services.GalleryService;
import com.sandrasysi.site.services.ImageService;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/uploads")
@CrossOrigin(origins = "*")
public class UploadsController {

    private FileService fileService;
    private GalleryService galleryService;
    private ImageService imageService;

    public UploadsController(FileService fileService, GalleryService galleryService, ImageService imageService) {
        this.fileService = fileService;
        this.galleryService = galleryService;
        this.imageService = imageService;
    }


    @GetMapping("/{galleryName}/{fileName}")
    public ResponseEntity<byte[]> getImageByGalleryNameAndImageNameAsResourse(@PathVariable String galleryName,
                                                                              @PathVariable String fileName) throws IOException {
        File file = fileService.findFileByGalleryNameAndFileName(galleryName, fileName);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(IOUtils.toByteArray(file.toURI()));
    }

    @GetMapping("/{galleryName}/getimages")
    public ResponseEntity<List<ImageResponseDto>> getImagesByGalleryName(@PathVariable String galleryName) {
        Gallery gallery = galleryService.findByName(galleryName);
        List<ImageResponseDto> response = new ArrayList<>();

        for (String imageId: gallery.getGalleryImageIds().split(",")) {
            Image image = imageService.findImageById(Long.parseLong(imageId.trim()));
            File file = fileService.findFileById(image.getId());
            response.add(new ImageResponseDto(image.getId(), image.getName()));
        }

        return ResponseEntity.ok(response);
    }

}
