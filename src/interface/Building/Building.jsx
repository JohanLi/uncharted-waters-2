import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import Dialog from '../Dialog/Dialog';
import State from '../../state';

import styles from './building.css';

const Building = observer(class Building extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', State.buildingKeydown);
    document.addEventListener('mousedown', State.buildingMousedown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', State.buildingKeydown);
    document.removeEventListener('mousedown', State.buildingMousedown);
  }

  render() {
    const options = State.buildingMenuOptions.map((option, i) => {
      const optionClass = classNames({
        [styles.option]: true,
        [styles.active]: State.buildingMenuSelected === i,
        [styles.disabled]: option !== 'Sail',
      });

      return (
        <div
          key={option}
          className={optionClass}
          onClick={() => State.buildingOnClick(i)}
        >
          {option}
        </div>
      );
    });

    return (
      <div className={styles.hud}>
        <div className={styles.building}>
          <img src={State.buildingImg} alt=""/>
        </div>
        <Dialog position="building">
          {State.buildingGreeting}
        </Dialog>
        <Dialog position="buildingMenu">
          {options}
        </Dialog>
      </div>
    );
  }
});

export default Building;
