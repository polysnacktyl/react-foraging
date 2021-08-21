import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Button, Modal, Form, Container } from 'react-bootstrap';

function CenterModal(props) {
    const { state } = useContext(Context);
    const [tags, setTags] = useState('');
    const [common, setCommon] = useState('');
    const [notes, setNotes] = useState('');
    const image = state.images._id;
    const [form, setForm] = useState({});

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

    };

    async function axiosEdit() {
        try {
            const res = await fetch('http://localhost:3000/auth/edit', {
                method: 'PUT',
                body: JSON.stringify({ name: form.name, _id: image, commonNames: form.common, notes: form.notes }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            console.log(data);
            setNotes(data.notes);
            setTags(data.tags[0]);
            setCommon([data.commonNames]);

        } catch (err) { console.log(err.message) }
    };

    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby='contained-modal-title'
        // centered
        >
            <Modal.Body>

                <Container>
                    <Form >
                        <Form.Group controlId='form.Edit'>
                            <Form.Label>species</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='species, if known'
                                onChange={e => setField('name', e.target.value)} />

                            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                                <Form.Check type='checkbox' label='uncertain/unknown' />
                            </Form.Group>


                            <Form.Group controlId='form.Common'>
                                <Form.Label>common name(s)</Form.Label>

                                <Form.Control
                                    type='text'
                                    placeholder='comma separated'
                                    onChange={e => setField('common', e.target.value)} />

                            </Form.Group>
                            <Form.Group controlId='form.Textarea'>
                                <Form.Label>notes</Form.Label>
                                <Form.Control
                                    as='textarea' rows={3}
                                    placeholder='notes'
                                    onChange={e => setField('notes', e.target.value)} />
                            </Form.Group>
                        </Form.Group>
                    </Form>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={axiosEdit}>
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