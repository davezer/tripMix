import React from 'react';

function Header(props) {

  return (
    <header className="flex-row space-between px-1">
      {props.children}
    </header>
  );
}

export default Header;