import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AddManagerForm from "./AddManagerForm";
import AddEmployeeForm from "./AddEmployeeForm";
import EditManagerForm from "./EditManagerForm";
import AIChatbot from "./AIChatbot";
import ResumeAnalyzer from "./ResumeAnalyzer";


function AdminDashboard() {

  const navigate =useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/");
  };

  const [showAddManager,setShowAddManager] = useState(false);

  const [showAddEmployee,setShowAddEmployee] = useState(false);

const [managers, setManagers] = useState([]);

const [showManagers, setShowManagers] = useState(false);




const [selectedManager, setSelectedManager] = useState(null);

const [showEditManager,setShowEditManager] = useState(false);

const fetchManagers = async () => {

  const response = await fetch(
    "http://localhost:8081/api/managers"
  );

  const data = await response.json();

  setManagers(data);
};

// DELETE MANAGER

const deleteManager = async (id) => {

  if (
    !window.confirm(
      "Delete this manager?"
    )
  ) return;

  await fetch(

    `http://localhost:8081/api/managers/${id}`,

    {
      method: "DELETE"
    }
  );

  fetchManagers();
};

// EDIT MANAGER

const editManager = (manager) => {

  setSelectedManager(manager);

  setShowEditManager(true);
};

useEffect(() => {

  fetchManagers();

}, []);

  return (

     <div className="d-flex">

      {/* SIDEBAR */}

      <div
        className="text-white p-3"

        style={{
          width: "280px",
          minHeight: "100vh",
          background:"linear-gradient(to bottom, #111827, #1f2937)"
        }}
      >

        <h2 className="mb-4">
          Admin Panel
        </h2>

        <ul className="list-unstyled">

          <li className="mb-3">
            Dashboard
          </li>

          <li className="mb-3">
            Manage Employees
          </li>

          <li className="mb-3">
            Manage Managers
          </li>

          <li className="mb-3">
            Reports
          </li>

          <li className="mb-3">
            Analytics
          </li>

        </ul>

        <button
          className="btn btn-danger"

          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
          padding: "40px"
        }}
      >

        <h1>
          Welcome Admin 😎
        </h1>


        <button

className="btn btn-dark mt-3"

onClick={() =>
setShowAddManager(true)
}>

Add Manager

</button>

<button

className=
"btn btn-success mt-3 ms-3"

onClick={() =>
setShowAddEmployee(true)
}

>

Add Employee

</button>

<button

  className="btn btn-primary mt-3 ms-3"

  onClick={() =>
    setShowManagers(!showManagers)
  }
>

  {

    showManagers

    ? "Hide Managers"

    : "Show Managers"
  }

</button>

        {
!showAddManager && (

<div className="row mt-4">

          <div className="col-md-4">

            <div className=
            "card shadow text-center">

              <div className=
              "card-body">

                <h5>
                  Total Employees
                </h5>

                <h2>25</h2>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className=
            "card shadow text-center">

              <div className=
              "card-body">

                <h5>
                  Total Managers
                </h5>

                <h2>5</h2>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className=
            "card shadow text-center">

              <div className=
              "card-body">

                <h5>
                  Reports
                </h5>

                <h2>12</h2>

              </div>

            </div>

          </div>
          {
  showManagers && (

    <div className="card shadow mt-4">

      <div className="card-body">

        <h3>
          Managers List
        </h3>

        <table className="table table-bordered">

          <thead className="table-dark">

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Photo</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Department</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              managers.map((manager) => (

                <tr key={manager.managerId}>

                  <td>{manager.managerId}</td>

                  <td>{manager.name}</td>

                  <td>

                   <img

  src={
    manager.photo
      ? manager.photo
      : "https://via.placeholder.com/90"
  }

  alt="manager"

  style={{

    width: "90px",

    height: "90px",

    objectFit: "cover",

    borderRadius: "0px",

    border: "1px solid #ccc"
  }}
/>

                  </td>

                  <td>{manager.email}</td>

                  <td>{manager.phone}</td>

                  <td>
                    {
                      manager.department
                      ?.departmentName
                    }
                  </td>

                  <td>

  <button

    className="btn btn-primary btn-sm me-2"

    onClick={() => editManager(manager)}
  >

    Edit

  </button>

  <button

    className="btn btn-danger btn-sm"

    onClick={() =>
      deleteManager(manager.managerId)
    }
  >

    Delete

  </button>

</td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

<div className="mt-5">

  <AIChatbot />

</div>

<ResumeAnalyzer />

        </div>
        
)
}

      </div>

      

      {
showAddManager && (

<AddManagerForm

fetchEmployees={() => {}}

setShowAddEmployee=
{setShowAddManager}

/>

)
}

{
showAddEmployee && (

<AddEmployeeForm

fetchEmployees={() => {}}

setShowAddEmployee=
{setShowAddEmployee}

/>

)
}


{
showEditManager && (

<EditManagerForm

manager={selectedManager}

fetchManagers={fetchManagers}

setShowEditManager=
{setShowEditManager}

/>

)
}



    </div>
  );
}

export default AdminDashboard;