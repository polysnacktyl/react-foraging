import React from 'react';

export const UploadForm = ({ onSubmit }) => {

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>File:</label><input type='file' placeholder='image'/><br/>
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
export default UploadForm;
