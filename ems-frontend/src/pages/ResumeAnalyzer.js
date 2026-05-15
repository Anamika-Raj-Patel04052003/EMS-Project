import { useState, useEffect } from "react";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  // EXTRACT SCORE FROM AI RESULT

const scoreMatch =
  result.match(/Resume Score:\s*(\d+)/);

const score =
  scoreMatch ? Number(scoreMatch[1]) : 0;

  // EXTRACT SKILLS

const skillsSection =
  result.match(
    /Technical Skills:([\s\S]*?)Experience Level:/
  );

const skills =
  skillsSection
    ? skillsSection[1]
        .split("-")
        .map(skill => skill.trim())
        .filter(skill => skill !== "")
    : [];

    // EXTRACT RECOMMENDATION

const recommendationMatch =
  result.match(
    /Hiring Recommendation:\s*(.*)/
  );

const recommendation =
  recommendationMatch
    ? recommendationMatch[1]
    : "";

    // FETCH HISTORY

const fetchHistory = async () => {

  try {

    const response = await fetch(

      "http://localhost:8081/api/resume/all"
    );

    const data = await response.json();

    setHistory(data);

  } catch (error) {

    console.error(error);
  }
};


// DELETE ANALYSIS

const deleteAnalysis = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this candidate analysis?"
    );

  if (!confirmDelete) return;

  try {

    await fetch(

      `http://localhost:8081/api/resume/delete/${id}`,

      {
        method: "DELETE"
      }
    );

    // REFRESH HISTORY

    fetchHistory();

  } catch (error) {

    console.error(error);

    alert("Delete failed");
  }
};

  const analyzeResume = async () => {

    if (!file) {

      alert("Please upload a resume");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      // LOADING START
      setLoading(true);

      // CLEAR OLD RESULT
      setResult("");

      const response = await fetch(

        "http://localhost:8081/api/resume/analyze",

        {
          method: "POST",

          body: formData
        }
      );

      const data = await response.text();

      // SAVE RESULT
      setResult(data);

      fetchHistory();

      // LOADING STOP
      setLoading(false);

    } catch (error) {

      console.error(error);

      // LOADING STOP
      setLoading(false);

      alert("Resume analysis failed");
    }
  };

  useEffect(() => {

  fetchHistory();

}, []);

  return (

    <div
      className="card shadow p-4 mt-4"
      style={{
        borderRadius: "15px"
      }}
    >

      <h3 className="mb-3">
        AI Resume Analyzer 🤖
      </h3>

      <input

        type="file"

        className="form-control"

        accept=".pdf"

        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button

        className="btn btn-primary mt-3"

        onClick={analyzeResume}
      >

        Analyze Resume

      </button>

      {
        loading && (

          <div className="mt-4">

            <h5 className="text-primary">

              Analyzing Resume...

            </h5>

          </div>
        )
      }

      {

        result && (

          <div className="mt-4">

            <h5 className="mb-3">
              AI Analysis Result
            </h5>

            <div className="mb-3">

  <h6>
    Resume Score: {score}/100
  </h6>

  <div
    style={{
      height: "25px",
      backgroundColor: "#e9ecef",
      borderRadius: "10px",
      overflow: "hidden"
    }}
  >

    <div
      style={{
        width: `${score}%`,
        height: "100%",
        backgroundColor:
          score >= 75
            ? "#198754"
            : score >= 50
            ? "#ffc107"
            : "#dc3545",

        textAlign: "center",

        color: "white",

        fontWeight: "bold",

        lineHeight: "25px",

        transition: "0.5s"
      }}
    >

      {score}%

    </div>

  </div>

</div>

<div className="mb-4">

  <h5 className="mb-3">
    Hiring Recommendation
  </h5>

  <span

    className="badge"

    style={{

      backgroundColor:

        recommendation.includes("Strong")
          ? "#198754"

          : recommendation.includes("Average")
          ? "#ffc107"

          : "#dc3545",

      padding: "12px 20px",

      fontSize: "15px",

      borderRadius: "20px"
    }}
  >

    {recommendation}

  </span>

</div>

<div className="mb-4">

  <h5 className="mb-3">
    Technical Skills
  </h5>

  <div className="d-flex flex-wrap gap-2">

    {
      skills.map((skill, index) => (

        <span

          key={index}

          className="badge"

          style={{
            backgroundColor: "#0d6efd",
            padding: "10px 15px",
            fontSize: "14px",
            borderRadius: "20px"
          }}
        >

          {skill}

        </span>
      ))
    }

  </div>

</div>

            <div

              className="card p-3"

              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "12px"
              }}
            >

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "15px",
                  background: "transparent",
                  border: "none",
                  margin: 0
                }}
              >
                {
  result
    .replace(
      /Technical Skills:[\s\S]*?Experience Level:/,
      "Experience Level:"
    )
}
              </pre>

            </div>

            <div className="mt-5">

  <h3 className="mb-3">

    Resume Analysis History

  </h3>

  <div className="table-responsive">

    <table className="table table-bordered table-hover">

      <thead className="table-dark">

        <tr>

          <th>ID</th>

          <th>Candidate</th>

          <th>Score</th>

          <th>Recommendation</th>

          <th>Suggested Role</th>

          <th>Date</th>

          <th>Email</th>

<th>Phone</th>

<th>Contact</th>

<th>Delete</th>

        </tr>

      </thead>

      <tbody>

        {
          history.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.candidateName}</td>

              <td>

                <span
                  className="badge bg-primary"
                >

                  {item.score}

                </span>

              </td>

              <td>{item.recommendation}</td>

              <td>{item.suggestedRole}</td>

              <td>{item.analysisDate}</td>

              <td>{item.email}</td>

<td>{item.phone}</td>



<td>

  <div className="d-flex gap-2">

    <a

      href={`mailto:${item.email}`}

      className="btn btn-primary btn-sm"
    >

      Email

    </a>

    <a

      href={`tel:${item.phone}`}

      className="btn btn-success btn-sm"
    >

      Call

    </a>

  </div>

</td>

<td>

  <button

    className="btn btn-danger btn-sm"

    onClick={() =>
      deleteAnalysis(item.id)
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

          </div>
        )
      }

    </div>
  );
}

export default ResumeAnalyzer;