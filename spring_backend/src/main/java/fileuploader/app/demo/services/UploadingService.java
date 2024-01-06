package fileuploader.app.demo.services;

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

    public String uploadFiles(List<MultipartFile> files, String path) {
        if (files.isEmpty()) {
            return "No files provided";
        }
        try {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    byte[] bytes = file.getBytes();
                    Path pathToWrite = Paths.get(path + File.separator + file.getOriginalFilename());
                    if (!Files.exists(pathToWrite)) {
                        return "Provided path doesn't exist";
                    }
                    Files.write(pathToWrite, bytes);
                }
            }
            return "Files sent to: " + path;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error while sending files: " + e.getMessage();
        }

    }
}
