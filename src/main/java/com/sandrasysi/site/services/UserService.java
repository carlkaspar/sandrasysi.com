package com.sandrasysi.site.services;

import com.sandrasysi.site.models.User;
import com.sandrasysi.site.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }
}
