import React from "react";
import { Link } from "react-router-dom";

const RouteLinkTest = () => {
  return (
    <>
      <Link to="/">Home</Link> <br />
      <Link to="/journal">Journal</Link> <br />
      <Link to="/new">New</Link> <br />
      <Link to="/edit">Edit</Link>
    </>
  );
};

export default RouteLinkTest;
