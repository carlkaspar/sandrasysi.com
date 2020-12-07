package com.sandrasysi.site.controllers;

import com.sandrasysi.site.dto.GalleryGetAllResponseDto;
import com.sandrasysi.site.dto.GalleryGetOneResponseDto;
import com.sandrasysi.site.dto.GalleryUploadRequestDto;
import com.sandrasysi.site.dto.ImageResponseDto;
import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.services.FileService;
import com.sandrasysi.site.services.GalleryService;
import com.sandrasysi.site.services.ImageService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

}
