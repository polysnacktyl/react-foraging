import React, { useState, useContext } from 'react';
import { Context } from '../../utils/Reducer';
import { Button, Form } from 'react-bootstrap';
import './style.css';

export default function Upload(props) {
    const [fileInputState, setFileInputState] = useState('');
    const [tagInputState, setTagInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [tags, setTags] = useState();
    const { state } = useContext(Context);
    const user = state.user;

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileInputState(e.target.value);

    };

    const handleTagInputChange = (e) => {
        const tag = e.target.value;
        if (tag) { setTags(tag) };
        setTagInputState(e.target.value);
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('oop');

        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch('http://localhost:3000/auth/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage, user: user, tags: tags }),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(user, tags);

            setFileInputState('');
            setTagInputState('');

            props.loadImages();

        } catch (err) {
            console.error(err);

        }
    };
    return (

        <div className='image-upload'>
            <Form onSubmit={handleSubmitFile} className="image-form">
                <>
                    <Form.Control
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        className="form-input" />
                    <Form.Control
                        id='tags'
                        type='text'
                        name='tags'
                        placeholder='name that fungus'
                        value={tagInputState}
                        onChange={handleTagInputChange} />
                    <div className='upload-button'>
                        <Button
                            size="sm"
                            className='image-submit'
                            type='submit'>
                            upload
                        </Button>
                    </div>
                </>

            </Form>
        </div>

    );
}
