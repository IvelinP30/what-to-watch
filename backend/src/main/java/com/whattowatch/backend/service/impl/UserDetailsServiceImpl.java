package com.whattowatch.backend.service.impl;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.repository.UserRepository;
import com.whattowatch.backend.service.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements AppUserDetailsService {

    private final UserRepository userRepo;

    @Override
    public User getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || auth.getPrincipal() == null) {
            throw new RuntimeException("Authentication is missing");
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof User) {
            return (User) principal;
        } else if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepo.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            String username = principal.toString();
            return userRepo.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
    }
}