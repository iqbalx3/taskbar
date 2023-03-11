import React, { useState } from "react";

const History = (setOfLinks) => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("linkhistory"))
  );
  const styles = {
    border: "1px solid white",
    borderCollapse: "collapse",
    backgroundColor: "#96D4D4",
    padding: "10px",
    margin: "10px",
    
  };
  return (
    <div style={{margin:"30px"}}>
      <table>
        <tr>
          <th style={styles}>Card</th>
          <th style={styles}> Link </th>
          <th style={styles}>Time</th>
        </tr>
        {history.map((o) => {
          return (
            <tr>
              <td style={styles}> {o.card} </td>
              <td style={styles}> {o.link} </td>
              <td style={styles}> {o.time} </td>
            </tr>
          );
        })}
      </table>
      {console.log(JSON.parse(localStorage.getItem("linkhistory")))}
    </div>
  );
};

export default History;
