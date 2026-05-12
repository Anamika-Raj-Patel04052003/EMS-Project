import {
  useNavigate
} from "react-router-dom";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/");
  };

  return (

    <div className="d-flex">

      {/* SIDEBAR */}

      <div
        className="text-white p-3"

        style={{
          width: "280px",
          minHeight: "100vh",
          background:
"linear-gradient(to bottom, #111827, #1f2937)"
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

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;