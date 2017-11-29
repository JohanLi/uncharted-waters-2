import * as React from "react";

const Dialog = (props: any) => {
  if (!props.options) {
    return (
      <div id={props.id} className="dialog">
        <div className="select">
          {props.children}
        </div>
      </div>
    );
  }

  const options = props.options.map((option: string, i: number) =>
    <div
      key={option}
      className={ props.dialogOption === i ? "active" : "" }
    >
      {option}
    </div>,
  );

  return (
    <div id={props.id} className="dialog">
      <div className="select">
        {options}
      </div>
    </div>
  );
};

export default Dialog;
