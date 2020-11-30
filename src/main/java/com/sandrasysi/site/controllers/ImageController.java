package com.sandrasysi.site.controllers;

import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "*")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/get/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable(value = "id") Long id) {
        Image image = imageService.findImageById(id);
        return ResponseEntity.ok(image);
    }
}
