import React, { useState, useContext } from 'react';
import { Context } from '../../utils/Reducer';
import './style.css';

export default function Upload(props) {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const { state } = useContext(Context);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

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
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage, user: state.user }),
                headers: { 'Content-Type': 'application/json' },
            });

            setFileInputState('');

            props.loadUploads();

        } catch (err) {
            console.error(err);

        }
    };
    return (

        <div className='image-upload'>
            <form onSubmit={handleSubmitFile} className="image-form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input" />
                <button
                    className="btn"
                    type="submit">
                    Submit
                </button>
            </form>
        </div>

    );
}
