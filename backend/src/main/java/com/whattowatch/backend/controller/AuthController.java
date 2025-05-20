package com.whattowatch.backend.controller;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.service.AuthService;
import com.whattowatch.backend.dto.AuthRequest;
import com.whattowatch.backend.security.JwtBlacklistService;
import com.whattowatch.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;
    private final JwtBlacklistService blacklistService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        authService.register(request.getUsername(), request.getPassword(), request.getName());
        return ResponseEntity.ok(Collections.singletonMap("message", "Registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = authService.validateLogin(request.getUsername(), request.getPassword());
        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "name", user.getName(),
                        "createdAt", user.getCreatedAt()
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader,
                                    Principal principal) {
        System.out.println("Logged out: " + principal.getName());
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header");
        }

        String token = authHeader.substring(7);
        var expiration = jwtUtil.getExpiration(token).toInstant();
        blacklistService.blacklistToken(token, expiration);

        return ResponseEntity.ok("Logged out successfully");
    }
}
