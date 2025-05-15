package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.repository.UserRepository;
import com.whattowatch.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public User register(String username, String password) {
        if (userRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        return userRepo.save(user);
    }

    public String login(String username, String password) {
        System.out.println("Login attempt for: " + username);
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean matches = encoder.matches(password, user.getPassword());
        System.out.println("Password matches: " + matches);

        if (!matches) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getUsername());
    }
}

