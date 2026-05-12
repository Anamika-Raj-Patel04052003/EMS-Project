package com.EMS.EMS.service;

import com.EMS.EMS.entity.User;
import com.EMS.EMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    // LOGIN METHOD
    public User login(String username, String password) {

        User user = repository.findByUsername(username);

        if (user != null &&
                user.getPassword().equals(password)) {

            return user;
        }

        return null;
    }
}