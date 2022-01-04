import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './dialog.css';

interface Props {
  position: 'building' | 'buildingMenu';
  children: ReactNode;
}

export const Dialog = (props: Props) => {
  const dialogClass = classNames({
    [styles.dialog]: true,
    [styles.building]: props.position === 'building',
    [styles.buildingMenu]: props.position === 'buildingMenu',
  });

  return (
    <div className={dialogClass}>
      <div>
        {props.children}
      </div>
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
      <div className={styles.cornerBottomRight} />
    </div>
  );
};
