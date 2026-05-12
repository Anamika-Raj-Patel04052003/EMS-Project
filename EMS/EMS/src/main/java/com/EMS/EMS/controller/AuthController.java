package com.EMS.EMS.controller;

import com.EMS.EMS.entity.User;
import com.EMS.EMS.security.JwtUtil;
import com.EMS.EMS.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import com.EMS.EMS.entity.Employee;
import com.EMS.EMS.repository.EmployeeRepository;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin

public class AuthController {



    @Autowired
    private UserService service;

    @Autowired
    private EmployeeRepository employeeRepository;

    // LOGIN API
    @PostMapping("/login")

    public Map<String, Object> login(
            @RequestBody User user
    ) {

        User loggedInUser =
                service.login(user.getUsername(), user.getPassword()
                );

        Map<String, Object> response
                = new HashMap<>();

        if (loggedInUser != null) {

            String token =
                    JwtUtil.generateToken(
                            loggedInUser.getUsername()
                    );

            Employee employee =
                    employeeRepository.findByUserUserId(
                            loggedInUser.getUserId()
                    );

            Map<String, Object> userData =
                    new HashMap<>();

            if (employee != null) {

                userData.put(
                        "employeeId",
                          employee.getId()
                );
            }

            userData.put(
                    "username",
                    loggedInUser.getUsername()
            );

            userData.put(
                    "role",
                    loggedInUser.getRole()
            );

            userData.put(
                    "userId",
                    loggedInUser.getUserId()
            );

            response.put("token", token);

            response.put("user", userData);
        }

        return response;
    }
}