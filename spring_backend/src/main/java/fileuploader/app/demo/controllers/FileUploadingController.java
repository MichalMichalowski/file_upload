package fileuploader.app.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/files")
public class FileUploadingController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadNewFile() {
        return ResponseEntity.ok("Operation OK");
    }
}
