package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;

public interface AuthService {
    User register(String username, String password, String name);
    User validateLogin(String username, String password);
}