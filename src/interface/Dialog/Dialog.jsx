import React from 'react';
import classNames from 'classnames';

import styles from './dialog.css';

const Dialog = ({ position, children }) => {
  const dialogClass = classNames({
    [styles.dialog]: true,
    [styles.building]: position === 'building',
    [styles.buildingMenu]: position === 'buildingMenu',
  });

  return (
    <div className={dialogClass}>
      <div>
        {children}
      </div>
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
      <div className={styles.cornerBottomRight} />
    </div>
  );
};

export default Dialog;
