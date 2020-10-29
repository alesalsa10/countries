import React from 'react';
import styles from './Header.module.css'

export default function Header({onClick, theme}) {

  let lightButton = (
    <button className={`${styles.button} ${theme === 'light' ? styles.light: styles.dark} `} onClick={onClick}>
      <i className="fas fa-sun"></i>
      Light Mode 
    </button>
  )

    let darkButton = (
      <button className={`${styles.button} ${theme === 'light' ? styles.light: styles.dark} `} onClick = {onClick}>
        <i className="fas fa-moon"></i>
        Dark Mode
      </button>
    )

  return (
    <div className={styles.header}>
      <h2 className={styles.headerName}>Where in the world?</h2>
      <div className={styles.themeSwitcher}>
        {theme === 'light' ? darkButton : lightButton}      
      </div>
    </div>
  );
}