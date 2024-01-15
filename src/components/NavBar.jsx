import React from 'react';

function NavBar() {
    return <div>
      <ul className="sidenav">
        <li><a href="/home">Home</a></li>
        <li><input type="text" name="search" placeholder='Search' id="" /></li>
      </ul>
    </div>
}

export default NavBar;