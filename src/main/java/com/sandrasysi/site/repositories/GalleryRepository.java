package com.sandrasysi.site.repositories;

import com.sandrasysi.site.models.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
}
