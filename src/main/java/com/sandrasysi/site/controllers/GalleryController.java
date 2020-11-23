package com.sandrasysi.site.controllers;

import com.sandrasysi.site.dto.GalleryUploadRequestDto;
import com.sandrasysi.site.dto.GalleryUploadResponseDto;
import com.sandrasysi.site.services.FileService;
import com.sandrasysi.site.services.FileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/gallery")
@CrossOrigin(origins = "*")
public class GalleryController {

    @Autowired
    private FileServiceImpl fileService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadGallery(@RequestParam(required = false) MultipartFile[] files) {
        Map<String, String> response = new HashMap<>();
        try {
            fileService.saveAll(files);
            response.put("message", "Files added");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Files not added");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(response);
        }
    }
}
