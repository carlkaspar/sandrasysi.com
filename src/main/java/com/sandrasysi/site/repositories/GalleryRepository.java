package com.sandrasysi.site.repositories;

import com.sandrasysi.site.models.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    Optional<Gallery> findById(Long id);

    Optional<Gallery> findByName(String name);

    void deleteById(Long id);
}
