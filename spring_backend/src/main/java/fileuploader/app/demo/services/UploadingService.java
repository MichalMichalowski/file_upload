package fileuploader.app.demo.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class UploadingService {

    public ResponseEntity<String> uploadFiles(List<MultipartFile> files, String path) {
        if (files.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No files provided");
        }
        try {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    byte[] bytes = file.getBytes();
                    Path pathToWrite = Paths.get(path + File.separator + file.getOriginalFilename());
                    Files.write(pathToWrite, bytes);
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body("Files sent to: " + path);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.OK).body("Error while sending files: " + e.getMessage());
        }

    }
}
