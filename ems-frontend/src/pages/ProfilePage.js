
import { useEffect, useState } from "react";

function ProfilePage() {

  const [employee, setEmployee] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // FETCH PROFILE
  const fetchProfile = async () => {

    const response = await fetch(

      `http://localhost:8081/api/employees/${user.employeeId}`
    );

    const data = await response.json();

    setEmployee(data);
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (!employee) {

    return <h2>Loading...</h2>;
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: "40px"
      }}
    >

      <div
        className="shadow-lg"

        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "40px"
        }}
      >

        <h1 className="mb-4">
          My Profile
        </h1>

        <div className="row">

          <div className="col-md-6 mb-3">

            <h5>Name</h5>

            <p>{employee.name}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Email</h5>

            <p>{employee.email}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Phone</h5>

            <p>{employee.phone}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Salary</h5>

            <p>{employee.salary}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Job Role</h5>

            <p>{employee.jobRole}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Joining Date</h5>

            <p>{employee.joiningDate}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Gender</h5>

            <p>{employee.gender}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Status</h5>

            <p>{employee.status}</p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Department</h5>

            <p>
              {employee.department?.departmentName}
            </p>

          </div>

          <div className="col-md-6 mb-3">

            <h5>Username</h5>

            <p>
              {employee.user?.username}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;

