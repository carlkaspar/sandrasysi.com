package com.sandrasysi.site.services;

import com.sandrasysi.site.models.User;
import com.sandrasysi.site.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("No user found!");
        }
        return optionalUser.get();
    }
}
