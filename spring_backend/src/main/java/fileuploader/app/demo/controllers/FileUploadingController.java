package fileuploader.app.demo.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fileuploader.app.demo.models.UploadParams;
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

    private final UploadingService uploadingService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadNewFile(@RequestParam("files") List<MultipartFile> files,
                                                @RequestParam("requestParams") String requestParams) throws JsonProcessingException {
        ObjectMapper ob = new ObjectMapper();
        UploadParams params = ob.readValue(requestParams, UploadParams.class);
        return uploadingService.uploadFiles(files, params.getPath());
    }
}
