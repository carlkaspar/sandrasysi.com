package com.sandrasysi.site.services;

import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.repositories.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    public void saveGalleryToDataBase(Gallery gallery){
        galleryRepository.save(gallery);
    }
}
