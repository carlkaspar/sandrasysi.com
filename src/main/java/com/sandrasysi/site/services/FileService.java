package com.sandrasysi.site.services;

import com.sandrasysi.site.dto.GalleryUploadRequestDto;
import com.sandrasysi.site.models.Gallery;
import com.sandrasysi.site.models.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
public class FileService {
    @Autowired
    private ImageService imageService;
    @Autowired
    private GalleryService galleryService;


    private final Path root = Paths.get("uploads");


    public void saveGallery(GalleryUploadRequestDto requestDto) {
        Path createdFolderPath = createFolderIfNotExistsAndReturnPath(requestDto.getName());
        List<Long> listOfImageIds = new ArrayList<>();

        for (MultipartFile file: requestDto.getFiles()) {
            Path savedImagePath = saveImage(file, createdFolderPath);
            Image image = Image.builder()
                    .name(file.getOriginalFilename())
                    .relativePath(savedImagePath.toString())
                    .build();
            listOfImageIds.add(imageService.saveImageToDatabaseAndReturnId(image));
        }



        Gallery gallery = Gallery.builder()
                .name(requestDto.getName())
                .thumbnailId(imageService.findImageByNameAndRelativePath(requestDto.getThumbnailImageName()
                        , createdFolderPath.resolve(requestDto.getThumbnailImageName()).toString()).getId())
                .galleryImageIds(listOfImageIds.toString().replace("[", "").replace("]", ""))
                .relativePath(createdFolderPath.toString())
                .build();

        galleryService.saveGalleryToDataBase(gallery);

    }


    public Path saveImage(MultipartFile file, Path path) {
        Path targetFile = path.resolve(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            Files.copy(file.getInputStream(), targetFile);
            return targetFile;
        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public Path createFolderIfNotExistsAndReturnPath(String name) {
        File galleryDirectory = new File(root.resolve(name).toFile().toString());

        if (!galleryDirectory.mkdir()) {
            throw new RuntimeException("Gallery exists");
        }

        return galleryDirectory.toPath();
    }

    public File findFileById(Long id) {
        Image image = imageService.findImageById(id);
        return new File(image.getRelativePath());
    }

    public File findFileByGalleryNameAndFileName(String galleryName, String fileName) {
        String relativePath = galleryService.findByName(galleryName).getRelativePath() + "\\" + fileName;
        Image image = imageService.findImageByNameAndRelativePath(fileName, relativePath);
        return findFileById(image.getId());
    }

    public void deleteGallery(Gallery gallery) throws IOException {
        Path directoryToBeDeleted = Paths.get(gallery.getRelativePath());
        Files.walk(directoryToBeDeleted)
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
    }
}
