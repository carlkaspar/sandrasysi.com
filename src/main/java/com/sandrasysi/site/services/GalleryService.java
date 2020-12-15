package com.sandrasysi.site.services;

import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.models.Image;
import com.sandrasysi.site.repositories.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    public void saveGalleryToDataBase(Gallery gallery){
        galleryRepository.save(gallery);
    }

    public List<Gallery> findAllGalleries() {
        return galleryRepository.findAll();
    }

    public Gallery findById(Long id) {
        Optional<Gallery> optionalGallery = galleryRepository.findById(id);
        if (!optionalGallery.isPresent()) {
            throw new RuntimeException("Gallery not found!");
        }
        return optionalGallery.get();
    }

    public Gallery findByName(String name) {
        Optional<Gallery> optionalGallery = galleryRepository.findByName(name);
        if (!optionalGallery.isPresent()) {
            throw new RuntimeException("Gallery not found!");
        }
        return optionalGallery.get();
    }

    public void deleteById(Long id) {
        galleryRepository.deleteById(id);
    }


    public void removeImageFromGallery(Image image, Gallery gallery) {
        String[] imageIds = gallery.getGalleryImageIds().split(",");
        List<Long> newImageIds = new ArrayList<>();

        for (String imageId: imageIds) {
            if (Long.parseLong(imageId.trim()) != image.getId()) {
                newImageIds.add(Long.parseLong(imageId.trim()));
            }
        }

        gallery.setGalleryImageIds(newImageIds.toString().replace("[", "").replace("]", ""));
        galleryRepository.save(gallery);
    }
}
