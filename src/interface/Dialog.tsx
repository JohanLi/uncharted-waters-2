import * as React from "react";

const Dialog = (props: any) => (
  <div id={props.id} className="dialog">
    <div className="corner top-left" />
    <div className="corner top-right" />
    <div className="corner bottom-left" />
    <div className="corner bottom-right" />
    {props.children}
  </div>
);

export default Dialog;
