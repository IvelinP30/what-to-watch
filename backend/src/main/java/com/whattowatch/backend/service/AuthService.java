package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.exception.InvalidCredentialsException;
import com.whattowatch.backend.exception.UsernameAlreadyExistsException;
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

    public User register(String username, String password, String name) {
        if (userRepo.findByUsername(username).isPresent()) {
            throw new UsernameAlreadyExistsException();
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        user.setName(name);
        return userRepo.save(user);
    }

    public User validateLogin(String username, String password) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid username or password");
        }

        return user;
    }
}

