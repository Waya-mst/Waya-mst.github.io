"use client";

import styles from './about.module.css';

export default function About() {
    return (
      <div>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>This is the about page.</p>
      </div>
    );
  }