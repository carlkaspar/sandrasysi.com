package com.sandrasysi.site.controllers;

import com.sandrasysi.site.dto.GalleryUploadRequestDto;
import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.services.FileService;
import com.sandrasysi.site.services.GalleryService;
import com.sandrasysi.site.services.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private FileService fileService;
    private GalleryService galleryService;
    private ImageService imageService;

    public AdminController(FileService fileService, GalleryService galleryService, ImageService imageService) {
        this.fileService = fileService;
        this.galleryService = galleryService;
        this.imageService = imageService;
    }

    @PostMapping("/gallery/upload")
    public ResponseEntity<Map<String, String>> uploadGallery(@RequestParam(value = "files", required = false) MultipartFile[] files,
                                           @RequestParam(value = "name") String name,
                                           @RequestParam(value = "thumbnailImageName") String thumbnailImageName) {

        GalleryUploadRequestDto requestDto = new GalleryUploadRequestDto(name, thumbnailImageName, files);

        Map<String, String> response = new HashMap<>();
        try {
            fileService.saveGallery(requestDto);
            response.put("message", "Files added to album: " + name + "with thumbnail: " + thumbnailImageName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Files not added");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(response);
        }
    }

    @PostMapping("/gallery/delete")
    public ResponseEntity<String> deleteGallery(@RequestParam(value = "id") Long id) {
        try {
            Gallery gallery = galleryService.findById(id);
            fileService.deleteGallery(gallery);
            galleryService.deleteById(id);
            imageService.deleteImagesOfGallery(gallery);
            return ResponseEntity.ok("Gallery deleted");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/image/delete")
    public ResponseEntity<String> deleteImage(@RequestParam(value = "id") Long id, @RequestParam(value = "galId") Long galleryId) {
        try {
            Image image = imageService.findImageById(id);
            Gallery gallery = galleryService.findById(galleryId);
            fileService.deleteImage(image);
            imageService.deleteImageById(image.getId());
            galleryService.removeImageFromGallery(image, gallery);
            return ResponseEntity.ok("Image deleted!");
        } catch (IOException e) {
           throw new RuntimeException(e);
        }
    }

}
