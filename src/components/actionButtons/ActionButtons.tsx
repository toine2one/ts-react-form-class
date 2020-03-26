import React, { FC, useContext, MouseEvent } from "react";
import "./ActionButtons.scss";
import { FormContext } from "../form/Form";

export const ActionButtons: FC<{}> = () => {
  const { fieldsData, onSubmit, fieldsToOriginalProps, resetFields } = useContext(FormContext);

  const onClickSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await onSubmit(fieldsToOriginalProps(fieldsData));
    if (response) {
      resetFields();
    }
  };

  return (
    <div className="actionButtons-container">
      <div className="action">
        <button onClick={e => onClickSubmit(e)}>Submit</button>
      </div>
      <div className="action">
        <button>Reset</button>
      </div>
    </div>
  );
};
