import React from 'react';

export const EditForm = ({ onSubmit }) => {

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Notes: </label><input type='text' placeholder='new notes'/><br/>
        <label>Names: </label><input type='text' placeholder='new name' />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          save
        </button>
      </div>
    </form>
  );
};
export default EditForm;
