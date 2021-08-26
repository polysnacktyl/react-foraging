import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Button, Modal, Form } from 'react-bootstrap';

function CenterModal(props) {
    const [fileInputState, setFileInputState] = useState('');
    const [nameInputState, setNameInputState] = useState('');
    const [commonInputState, setCommonInputState] = useState('');
    const [notesInputState, setNotesInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [common, setCommon] = useState();
    const [notes, setNotes] = useState();
    const [name, setName] = useState();
    const [known, setKnown] = useState(true);
    const urlBase = process.env.REACT_APP_API_URL;
    const { state } = useContext(Context);
    const user = state.user;


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const handleNameInputChange = (e) => {
        const name = e.target.value;
        if (name) { setName(name) };
        setNameInputState(e.target.value);
    }

    const handleCommonInputChange = (e) => {
        const commonName = e.target.value.split(',');
        if (commonName) { setCommon(commonName) };
        setCommonInputState(e.target.value);
    }

    const handleNotesInputChange = (e) => {
        const notesInput = e.target.value;
        if (notesInput) { setNotes(notesInput) };
        setNotesInputState(e.target.value);
    }

    const toggleKnown = (e) => {
        if (!known) { setKnown(true) };
        if (known) { setKnown(false) }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error('line 58: ', error.message);

        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch(`${urlBase}/auth/upload`, {
                method: 'POST',
                body: JSON.stringify({
                    data: base64EncodedImage, user: user, name: name, commonNames: common, notes: notes, identification: known
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            // setFileInputState('');
            // setNameInputState('');
            // setCommonInputState('');
            // setNotesInputState('');

            props.loadimages();
            props.onHide(false);

        } catch (err) {
            console.error(err.message);

        }
    };

    return (


        <Modal show={props.show}
        size='lg'>
            <Modal.Body>

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
                            id='name'
                            type='text'
                            placeholder='name that fungus'
                            value={nameInputState}
                            onChange={handleNameInputChange} />
                        <Form.Group
                            className='mb-3'
                            controlId='formBasicCheckbox'>
                            <Form.Check
                                type='checkbox'
                                label='uncertain/unknown'
                                onChange={toggleKnown} />
                        </Form.Group>
                        <Form.Control
                            id='common'
                            type='text'
                            placeholder='common names'
                            value={commonInputState}
                            onChange={handleCommonInputChange} />
                        <Form.Control
                            id='notes'
                            type='text'
                            placeholder='notes'
                            value={notesInputState}
                            onChange={handleNotesInputChange} />
                        <div className='upload-button'>
                        </div>
                    </>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => handleSubmitFile(e)}>
                    upload
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

function UploadModal(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <button 
            className='show-modal-button'
            onClick={(e) => setModalShow(true)}>
                add an image
            </button>

            <CenterModal
                show={modalShow}
                onHide={(e) => setModalShow(false)}
                loadimages={props.loadimages}
            />
        </>
    );
}

export default UploadModal;