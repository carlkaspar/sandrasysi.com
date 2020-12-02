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
@RequestMapping("/gallery")
@CrossOrigin(origins = "*")
public class GalleryController {

    private FileService fileService;
    private GalleryService galleryService;
    private ImageService imageService;

    public GalleryController(FileService fileService, GalleryService galleryService, ImageService imageService) {
        this.fileService = fileService;
        this.galleryService = galleryService;
        this.imageService = imageService;
    }

    @PostMapping("/upload")
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

    @GetMapping("/get")
    public ResponseEntity<List<GalleryGetAllResponseDto>> getAllGalleries() throws IOException {
        List<Gallery> galleries = galleryService.findAllGalleries();
        List<GalleryGetAllResponseDto> response = new ArrayList<>();
        for (Gallery gallery: galleries) {
            File image = fileService.findFileById(gallery.getThumbnailId());
            response.add(new GalleryGetAllResponseDto(gallery.getId(), gallery.getName(), image.getName()));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<GalleryGetOneResponseDto> getOneById(@PathVariable(value = "id") Long id) {
        Gallery gallery = galleryService.findById(id);
        GalleryGetOneResponseDto responseDto = new GalleryGetOneResponseDto(gallery.getId(), gallery.getName());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<ImageResponseDto>> getImagesByGalleryId(@PathVariable(value = "id") Long id) throws IOException {
        Gallery gallery = galleryService.findById(id);
        List<ImageResponseDto> response = new ArrayList<>();

        for (String imageId: gallery.getGalleryImageIds().split(",")) {
            Image image = imageService.findImageById(Long.parseLong(imageId.trim()));
            File file = fileService.findFileById(image.getId());
            response.add(new ImageResponseDto(image.getId(), image.getName()));
        }

        return ResponseEntity.ok(response);

    }
}
