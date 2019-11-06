import React from 'react';
import { Link } from "react-router-dom";


export default function Navigation() {
  return (
    <nav className="nav">
      <h1 className="nav__title">BeautifulSearch</h1>
      <div className="nav__links">
        <Link className="nav__link" to="/">Home</Link>
        <Link className="nav__link" to="/schema">Schema</Link>
        <Link className="nav__link" to="/documents">Documents</Link>
      </div>
    </nav>
  );
}
