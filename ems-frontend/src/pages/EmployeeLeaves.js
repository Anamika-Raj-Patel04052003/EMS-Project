
import {
  useEffect,
  useState
} from "react";

function EmployeeLeaves() {

  const [leaves, setLeaves] = useState([]);

  const user = JSON.parse(

    localStorage.getItem("user")
  );

  // FETCH EMPLOYEE LEAVES
  const fetchLeaves = async () => {

    const response = await fetch(`http://localhost:8081/api/leaves/employee/${user.employeeId}`);

    const data = await response.json();

    // FILTER CURRENT USER

//console.log(data);

    setLeaves(data);
  };

 useEffect(() => {

  fetchLeaves();

  const interval = setInterval(() => {

    fetchLeaves();

  }, 3000);

  return () => clearInterval(interval);

}, []);

  return (

<div
  style={{

    minHeight: "100vh",

    background: "#eef2f7",

    padding: "40px"
  }}
>

<div className="container">

<div
  className="shadow-lg p-4"

  style={{

    background: "white",

    borderRadius: "20px"
  }}
>

<h2 className="mb-4">

  My Leave History

</h2>

<table
className= "table table-hover"
>

<thead className= "table-dark"
>

<tr>

<th>ID</th>

<th>Reason</th>

<th>Start Date</th>

<th>End Date</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{leaves.map((leave) => (

<tr key={leave.leaveId}>

<td>
{leave.leaveId}
</td>

<td>
{leave.reason}
</td>

<td>
{leave.startDate}
</td>

<td>
{leave.endDate}
</td>

<td>

<span

className={

leave.status === "Approved"

? "badge bg-success"

: leave.status ==="Rejected"? "badge bg-danger": "badge bg-warning text-dark"
}

>

{leave.status}

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

export default EmployeeLeaves;

