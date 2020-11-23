package com.sandrasysi.site.services;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    public void save(MultipartFile file);

    void saveAll(MultipartFile[] files);
}
