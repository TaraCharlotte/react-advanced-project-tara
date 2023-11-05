import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav style={{ color: "orange", textAlign: "center" }}>
      <ul
        style={{
          listStyle: "none",
          paddingTop: "20px",
          minWidth: "696px",
          display: "inline-block",
        }}
      >
        <li style={{ display: "inline", paddingInline: "20px" }}>
          <Link to="/">All events</Link>
        </li>
        <li style={{ display: "inline", paddingInline: "20px" }}>
          <Link to="/newevent">Add event</Link>
        </li>
      </ul>
    </nav>
  );
};
