import React from 'react';
import ThemeSwitcher from 'react-theme-switcher';
//import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <div class='header'>
      <h1 id='header'>Where in the world?</h1>
      <div className='themeSwitcher'>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
