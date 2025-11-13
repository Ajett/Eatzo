import React, { useState } from "react";
const User = ({ name, location, contact }) => {
  const [count,setcount] = useState(0);
  const [count2] = useState(2);
  return (
    
    <div className="user-card">
      <h1>Count:{count}</h1>
      <h1>Count2:{count2}</h1>
      <button onClick={() => {
        setcount(count + 1);
      }}>Count Increse</button>
      <h2>{ name}</h2>
      <h3>{location}</h3>
      <h4>{ contact}</h4>
    </div>
  )
}

export default User;