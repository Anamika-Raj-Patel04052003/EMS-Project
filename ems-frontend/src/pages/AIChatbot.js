import { useState } from "react";

function AIChatbot() {

  const [message, setMessage]
  = useState("");

  const [reply, setReply]
  = useState("");

  const askAI = async () => {

    const response = await fetch(

      "http://localhost:8081/api/ai/chat",

      {

        method: "POST",

        headers: {

          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({

          message: message
        })
      }
    );

    const data =
    await response.json();

    setReply(data.reply);
  };

  return (

    <div className="card shadow p-4">

      <h2>
        EMS AI Chatbot 🤖
      </h2>

      <input

        type="text"

        className="form-control mt-3"

        placeholder=
        "Ask something..."

        value={message}

        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button

        className=
        "btn btn-dark mt-3"

        onClick={askAI}
      >

        Ask AI

      </button>

      {

        reply && (

          <div
            className=
            "alert alert-info mt-4"
          >

            <strong>
              AI:
            </strong>

            <br/>

            {reply}

          </div>
        )
      }

    </div>
  );
}

export default AIChatbot;