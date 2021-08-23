import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Button, Modal, Form, Row } from 'react-bootstrap';

function UploadModal(props) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState([]);
    const [tags, setTags] = useState();
    const { state } = useContext(Context);
    const user = state.user;

    const handleSubmitFile = (e) => {
        let file = selectedFile;
        console.log(props)

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('oop');
        };
        props.onHide();
        uploadImage(selectedFile);
    };


    const uploadImage = async () => {
        try {
            await fetch('https://react-forager.herokuapp.com/auth/upload', {
                method: 'POST',
                body: JSON.stringify({ data: selectedFile, user: user, tags: tags }),
                headers: { 'Content-Type': 'application/json' },
            });
            props.loadImages();

        } catch (err) {
            console.error(err.message);

        }
    };


    return (<>
        <button variant='light' onClick={() => setModalShow(true)} selectedFile={selectedFile}>
            add an image
        </button>
        <Modal show={modalShow} onHide={() => setModalShow(false)} selectedFile={selectedFile} tags={tags}>


            <Modal.Body>

                <Form.Group as={Row} controlId="formFileSm" className="mb-3" >
                    <Form.Control
                        type="file"
                        size="sm"
                        onChange={(e) => setSelectedFile(e.target.value)} />
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label column>Name</Form.Label>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder='name that mushroom'
                        onChange={(e) => setTags(e.target.value)} />

                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => handleSubmitFile(e)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

// function UploadModal() {
//     const [modalShow, setModalShow] = useState(false);

//     return (
//         <>
//             <button variant='light' onClick={() => setModalShow(true)}>
//                 add an image
//             </button>

//             <CenterModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

export default UploadModal;