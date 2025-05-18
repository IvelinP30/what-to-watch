package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;

public interface AppUserDetailsService {
    User getCurrentUser();
}