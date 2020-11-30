package com.sandrasysi.site.services;

import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public Long saveImageToDatabaseAndReturnId(Image image) {
        return imageRepository.save(image).getId();
    }

    public Image findImageByNameAndRelativePath(String name, String path) {
        Optional<Image> imageOptional = imageRepository.findByNameAndRelativePath(name, path);
        if (!imageOptional.isPresent()) {
            throw new RuntimeException("Image not present");
        }
        return imageOptional.get();
    }

    public Image findImageById(Long id) {
        Optional<Image> imageOptional = imageRepository.findImageById(id);
        if (!imageOptional.isPresent()) {
            throw new RuntimeException("Image not present");
        }
        return imageOptional.get();
    }

    public List<Image> findManyImagesByListOfIds(List<Long> ids) {
        List<Image> images = new ArrayList<>();
        for (Long id: ids) {
            images.add(findImageById(id));
        }

        return images;
    }
}
