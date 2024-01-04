import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header style={{ background: 'lightgreen', textAlign: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 150px' }}> 
        <h3>UBERNOME</h3>
        <Link to="/login"><h3>LOGIN</h3></Link>
      </div>
    </header>
  );
}
