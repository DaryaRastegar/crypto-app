import React from 'react'
import styles from './LayOuts.module.css'

function LayOuts({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="#">BoTostart</a> | React.js Full Course
        </p>
      </header>
      {children}
      <footer className={styles.footer}>Developed by Darya width ❤</footer>
    </>
  )
}

export default LayOuts
