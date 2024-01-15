import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    Name: "",
    Deparment: "",
    HireDate: "",
    DocType: "",
    Id: "",
    Country: "",
    Area: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function  submitNote(event) {
    props.onAdd(note);
    setNote({
      Name: "",
      Deparment: "",
      HireDate: "",
      DocType: "",
      Id: "",
      Country: "",
      Area: ""
      
    });
    event.preventDefault();

    const res = await fetch("http://localhost:3000/home",{
      method: "POST",
      // body: note
      body: JSON.stringify(note),
      headers: {"Content-Type": "application/json"}
    });
    console.log(res);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">

        <textarea 
          name="Name"
          onClick={expand}
          onChange={handleChange}
          value={note.Name}
          placeholder="Full legal name"          
        />

        {isExpanded && (
          <textarea          
            name="DocType"
            onChange={handleChange}
            value={note.DocType}
            placeholder="CC EXCC"
          />
        )}

        {isExpanded && (
          <textarea
            name="Id"
            onClick={expand}
            onChange={handleChange}
            value={note.Id}
            placeholder="Doc Number"
          />
        )}

        {isExpanded && (
          <textarea
            name="Country"
            onClick={expand}
            onChange={handleChange}
            value={note.Country}
            placeholder="Country"
          />
        )}

        {isExpanded && (
          <textarea
            name="HireDate"
            onClick={expand}
            onChange={handleChange}
            value={note.HireDate}
            placeholder="Hire date"
          />
        )}

        {isExpanded && (
          <textarea
            name="Deparment"
            onClick={expand}
            onChange={handleChange}
            value={note.Deparment}
            placeholder="Put your current roll"
          />
        )}
        {isExpanded && (
          <textarea
            name="Area"
            onClick={expand}
            onChange={handleChange}
            value={note.Area}
            placeholder="Deparment"
          />
        )}
        
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <p>add</p>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
