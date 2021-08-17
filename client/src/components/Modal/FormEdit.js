import React from 'react';

export const EditForm = ({ onSubmit }) => {

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Name: </label><input type='text' placeholder='name'/><br/>
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
