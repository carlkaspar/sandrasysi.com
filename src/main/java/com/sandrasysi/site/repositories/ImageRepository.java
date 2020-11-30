package com.sandrasysi.site.repositories;

import com.sandrasysi.site.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByNameAndRelativePath(String name, String path);
    Optional<Image> findImageById(Long id);
}
