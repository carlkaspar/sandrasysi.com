package com.sandrasysi.site.controllers;

import com.sandrasysi.site.dto.GalleryUploadRequestDto;
import com.sandrasysi.site.services.FileService;
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
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadGallery(@RequestParam(value = "files", required = false) MultipartFile[] files,
                                           @RequestParam(value = "name") String name,
                                           @RequestParam(value = "thumbnail") String thumbnailImageName) {

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
