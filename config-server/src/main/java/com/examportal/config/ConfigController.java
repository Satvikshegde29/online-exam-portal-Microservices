// filepath: config-server/src/main/java/com/examportal/config/ConfigController.java
package com.examportal.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigController {
    @GetMapping("/status")
    public String status() {
        return "Config Server is running!";
    }
}