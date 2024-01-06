package fileuploader.app.demo.controllers;

import fileuploader.app.demo.services.UploadingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/files")
@AllArgsConstructor
public class FileUploadingController {

    private final String PATH_TO_UPLOAD = "C:\\test_upload";
    private final UploadingService uploadingService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadNewFile(@RequestParam("files") List<MultipartFile> files) {
        return ResponseEntity.status(HttpStatus.OK).body(uploadingService.uploadFiles(files, PATH_TO_UPLOAD));
    }
}
