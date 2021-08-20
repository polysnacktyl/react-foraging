import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Button, Modal, Form } from 'react-bootstrap';

function CenterModal(props) {
    const { state } = useContext(Context);
    const [tags, setTags] = useState('');
    const [common, setCommon] = useState('');
    const [notes, setNotes] = useState('');
    const image = state.images._id;


    const axiosEdit = async () => {
        if (tags.length === 0) { return };

        try {
            const res = await fetch('http://localhost:3000/auth/edit', {
                method: 'PUT',
                body: JSON.stringify({ tags: tags, _id: image, commonNames: common, notes: notes }),
                // headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            console.log(data);
            setNotes(data.notes);
            setTags(data.tags[0]);
            setCommon(data.commonNames[0]);


        } catch (err) { console.log(err.message) }
    }
    axiosEdit();


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Form.Control
                    size="sm"
                    type="text"
                    placeholder='species'
                    onChange={(e) => setTags(e.target.value)} />
            </Modal.Body>
            <Modal.Body>
                <Form.Control
                    size='sm'
                    type='text'
                    placeholder='common names'
                    onChange={(e) => setCommon(e.target.value)} />
            </Modal.Body>
            <Modal.Body>
                <Form.Control
                    size='sm'
                    type='notes'
                    placeholder='notes'
                    onChange={(e) => setNotes(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function NewModal() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <p onClick={() => setModalShow(true)}>
                edit details
            </p>

            <CenterModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default NewModal;