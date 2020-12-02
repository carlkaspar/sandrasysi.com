package com.sandrasysi.site.controllers;

import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.services.FileService;
import com.sandrasysi.site.services.GalleryService;
import com.sandrasysi.site.services.ImageService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.ServletContextResource;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "*")
public class ImageController {
    @Autowired
    private ImageService imageService;
    @Autowired
    private GalleryService galleryService;
    @Autowired
    private FileService fileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable(value = "id") Long id) {
        Image image = imageService.findImageById(id);
        return ResponseEntity.ok(image);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImageByGalleryNameAndImageNameAsResourse(@PathVariable Long id) throws IOException {
        File file = fileService.findFileById(id);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(IOUtils.toByteArray(file.toURI()));
    }
}
