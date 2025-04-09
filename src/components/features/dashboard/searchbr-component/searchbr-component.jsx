// components/features/dashboard/searchbar-component/SearchBar.jsx
import React from 'react';
import styles from '../styles-components/searchbr-component.module.css';

function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchInner}>
        <input
          type="text"
          placeholder="Search for student portfolios by name or skills..."
          className={styles.searchInput}
        />
        <div className={styles.dropdownPlaceholder}>
          <span style={{ fontSize: '24px', color: '#616161' }}>&#9660;</span>
        </div>
        <button className={styles.searchButton}>
          <span style={{ fontSize: '30px', color: 'white' }}>&#128269;</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;