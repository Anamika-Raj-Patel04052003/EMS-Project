import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);

  const user = JSON.parse(
  localStorage.getItem(
    "user"
  )
);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("role");

navigate("/");
  };

  // MARK ATTENDANCE
  const markAttendance = async (attendanceStatus) => {

    const attendanceData = {

     employee: {
   id: user.employeeId
},

      date: new Date()
  .toISOString()
  .split("T")[0],

      status: attendanceStatus
    };

    await fetch(
      "http://localhost:8081/api/attendance",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(attendanceData)
      }
    );

    alert("Attendance Marked");

    fetchAttendance();
  };

  // FETCH ATTENDANCE
  const fetchAttendance = async () => {

    const response = await fetch(
  `http://localhost:8081/api/attendance/employee/${user.employeeId}`
);

    const data = await response.json();

    setAttendance(data);
  };

  useEffect(() => {

    fetchAttendance();

  }, []);

  return (

    <div className="d-flex">
 
      <div
  className="text-white p-3"

  style={{
    width: "260px",

    minHeight: "100vh",

    background:
      "linear-gradient(to bottom, #1e293b, #0f172a)"
  }}
>

  <h3 className="mb-4">
    Empify
  </h3>

  <ul className="list-unstyled">

    <li className="mb-3">
      Dashboard
    </li>

    <li className="mb-3">
      Attendance
    </li>


  </ul>

  <div
  className=
  "d-flex flex-column gap-3"
>

  <button
  className=
  "btn btn-warning text-dark"

  onClick={() =>
    navigate("/leave")
  }
>
  Apply Leave
</button>

<button

className=
"btn btn-dark"

onClick={() =>
navigate(
"/my-leaves"
)
}
>

My Leaves

</button>

 <button
  className="btn btn-danger"

  onClick={handleLogout}
>
  Logout
</button>

</div>
</div>
<div
  style={{
    flex: 1,

    backgroundColor: "#eef2f7",

    minHeight: "100vh",

    padding: "40px"
  }}
>

  <div
  className="shadow-lg"

  style={{

    background: "white",

    borderRadius: "20px",

    padding: "30px"
  }}
>

      <h1>Employee Dashboard</h1>

      <div
  className=
  "d-flex gap-3 mb-4 flex-wrap"
>


<button
  className="btn btn-primary"

  onClick={() =>
    navigate("/profile")
  }
>
  My Profile
</button>
<button
  className=
  "btn btn-warning text-dark"

  onClick={() =>
    navigate("/leave")
  }
>
  Apply Leave
</button>

<div
 className= "d-flex gap-3"
>

<button
  className= "btn btn-success"

  onClick={() =>
    markAttendance(
      "Present"
    )
  }
>

  Present

</button>

<button
  className=
  "btn btn-danger"

  onClick={() =>
    markAttendance(
      "Absent"
    )
  }
>

  Absent

</button>

</div>


</div>
      
      <h2>Attendance History</h2>

      <table 
      className= "table table-bordered table-hover mt-4 bg-white">

        <thead>

          <tr>

            <th>ID</th>
            <th>Date</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {attendance.map((a) => (

            <tr key={a.attendanceId}>

              <td>{a.attendanceId}</td>

              <td>{a.date}</td>

              <td>

<span

className={

a.status === "Present"

? "badge bg-success"

: "badge bg-danger"
}

>

{a.status}

</span>

</td>

            </tr>
          ))}

        </tbody>

      </table>

</div>
    </div>
    </div>
  );
}

export default EmployeeDashboard;