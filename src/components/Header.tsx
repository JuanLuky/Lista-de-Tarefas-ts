import reactLogo from '../assets/Logo.png'

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={reactLogo} alt="to.do"/>
      </div>
    </header>
  )
}