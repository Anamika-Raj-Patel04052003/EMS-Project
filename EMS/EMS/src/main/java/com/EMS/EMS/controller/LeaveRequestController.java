package com.EMS.EMS.controller;

import com.EMS.EMS.entity.LeaveRequest;

import com.EMS.EMS.service.LeaveRequestService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.EMS.EMS.service.EmailService;

@RestController
@RequestMapping("/api/leaves")

@CrossOrigin
public class LeaveRequestController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private LeaveRequestService service;

    @PostMapping
    public LeaveRequest applyLeave(
            @RequestBody LeaveRequest leave
    ) {

        return service.saveLeave(leave);
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {

        return service.getAllLeaves();
    }

    @PutMapping("/{id}")

    public LeaveRequest updateLeave(

            @PathVariable Long id,

            @RequestBody LeaveRequest leave
    ) {

        LeaveRequest existingLeave =
                service.getLeaveById(id);

        existingLeave.setStatus(
                leave.getStatus()
        );

        LeaveRequest updatedLeave =
                service.saveLeave(existingLeave);

// EMAIL SUBJECT
        String subject =
                "Leave Request Status";

        if (updatedLeave.getEmployee() != null) {

            // EMAIL BODY
            String body =

                    "Hello "
                            + updatedLeave
                            .getEmployee()
                            .getName()

                            + ",\n\n"

                            + "Your leave request has been "

                            + updatedLeave.getStatus()

                            + ".\n\n"

                            + "Thank you.\nEMS Team";

            // SEND EMAIL
            emailService.sendEmail(

                    updatedLeave
                            .getEmployee()
                            .getEmail(),

                    subject,

                    body
            );
        }

        return updatedLeave;
    }

    @GetMapping("/employee/{employeeId}")

    public List<LeaveRequest>
    getLeavesByEmployee(

            @PathVariable Long employeeId
    ) {

        return service
                .getLeavesByEmployee(employeeId);
    }
}

