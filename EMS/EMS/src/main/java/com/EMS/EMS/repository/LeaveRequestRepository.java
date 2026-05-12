package com.EMS.EMS.repository;

import com.EMS.EMS.entity.LeaveRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestRepository
        extends JpaRepository<LeaveRequest, Long> {


    List<LeaveRequest>
    findByEmployee_Id(Long employeeId);


}