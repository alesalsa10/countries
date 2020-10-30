import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({theme}) {
  let history = useHistory();
  const goBack = (e) => {
    history.push('/');
  };

  return (
    <div className={styles.buttonDiv} >
      <button className={`${styles.backButton} ${theme === 'light' ? styles.light : styles.dark}`} onClick={goBack}>
        Back
      </button>
    </div>
  );
}
