import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Container } from './EditContainer';
import './Modal.css';


const MegaEdit = (props) => {
  const { state } = useContext(Context);
  const [tags, setTags] = useState('');
  const triggerText = 'edit information';
  const image = state.images._id;


  const onSubmit = async (e) => {
    e.preventDefault(e);
    setTags(e.target[0].value);

  };

  const axiosEdit = async (props) => {
    try {
      const res = await fetch('http://localhost:3000/auth/edit', {
        method: 'PUT',
        body: JSON.stringify({ tags: tags, _id: image }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      setTags(data.tags[0])


    } catch (err) { console.log(err.message) }
    console.log(tags);
  }
  axiosEdit();

  return (
    <div className="App">
      <Container triggerText={triggerText} user={state.user} onSubmit={onSubmit} />
    </div>
  );
};

export default MegaEdit;