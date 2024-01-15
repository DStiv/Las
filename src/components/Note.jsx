import React from "react";

function Note(props) {
  async function handleClick() {
    props.onDelete(props.id);
    const res = await fetch("http://localhost:3000/home/$Number(props.Id)",{
      method: "DELETE",
      body: Number(props.Id),
      headers: {"Content-Type": "application/json"}
    });
    console.log(Number(props.Id))
    console.log(res);
  }

  return (
    <div className="note">
      <h1>{props.Name}</h1>
      <p>{props.Deparment}</p>
      <p>{props.HireDate}</p>
      <button onClick={handleClick}>
        <p>DEL</p>
      </button>
    </div>
  );
}

export default Note;
