import {
  useEffect,
  useState
} from "react";

function ManagerLeaves() {

  const [leaves, setLeaves] = useState([]);

  // FETCH LEAVES
  const fetchLeaves = async () => {

    const response = await fetch(
      "http://localhost:8081/api/leaves"
    );

    const data = await response.json();

    setLeaves(data);
  };

  // UPDATE STATUS
  const updateStatus = async (
    leave, status
  ) => {

    const updatedLeave = {

      ...leave,

      status: status
    };

    await fetch(

      `http://localhost:8081/api/leaves/${leave.leaveId}`,

      {
        method: "PUT",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify(
          updatedLeave
        )
      }
    );

    fetchLeaves();
  };

  useEffect(() => {

    fetchLeaves();

  }, []);

  return (

    <div className="container mt-5">

      <div
className= "shadow-lg p-4"

style={{

background: "white", borderRadius: "20px"
}}
>

        <h2 className="mb-4">

          Leave Requests

        </h2>

        <table className= "table table-hover align-middle">

          <thead className= "table-dark">

            <tr>

              <th>ID</th>

              <th>Employee</th>

              <th>Reason</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr key={leave.leaveId}>

                <td>
                  {leave.leaveId}
                </td>

                <td>
                  {leave.employee?.name}
                </td>

                <td>
                  {leave.reason}
                </td>

                <td>

<span

className={

leave.status ===
"Approved"

? "badge bg-success"

: leave.status ===
"Rejected"

? "badge bg-danger"

: "badge bg-warning text-dark"
}

>

{leave.status}

</span>

</td>

                <td>

                  <button

                    className= "btn btn-success me-2"

                    onClick={() =>
                      updateStatus(
                        leave,
                        "Approved"
                      )
                    }
                  >

                    Approve

                  </button>

                  <button

                    className= "btn btn-danger"

                    onClick={() =>
                      updateStatus(
                        leave,
                        "Rejected"
                      )
                    }
                  >

                    Reject

                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManagerLeaves;