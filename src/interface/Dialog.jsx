import * as React from 'react';

const Dialog = (props) => {
  if (!props.options) {
    return (
      <div id={props.id} className='dialog'>
        <div className='select'>
          {props.children}
        </div>
      </div>
    );
  }

  const options = props.options.map((option, i) =>
    <div
      key={option}
      className={ props.dialogOption === i ? 'active' : '' }
    >
      {option}
    </div>,
  );

  return (
    <div id={props.id} className='dialog'>
      <div className='select'>
        {options}
      </div>
    </div>
  );
};

export default Dialog;
