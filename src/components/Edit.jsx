import React from "react";

function edit (props){
    function handleClick(){
        fetch("https//:localhost/");
        
    }
    return (
        <div className="note">
          <h1>{props.Name}</h1>
          <p>{props.Deparment}</p>
          <p>{props.HireDate}</p>
          <button href="C:\Users\admin\Documents\Projects\visual\8.5+Family+Travel+Tracker\8.5 Family Travel Tracker\a\public\edit.html" onClick={handleClick}>
            <p>EDIT</p>
          </button>
        </div>
    );
}

export default edit;