import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Button, Modal, Form, Container } from 'react-bootstrap';

function CenterModal(props) {
    const { state } = useContext(Context);
    const image = state.images._id;
    const [form, setForm] = useState({});


    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    };

    async function axiosEdit(e) {
        try {
            await fetch('https://react-forager.herokuapp.com/auth/edit', {
                method: 'PUT',
                body: JSON.stringify({ name: form.name, _id: image, commonNames: form.common, notes: form.notes }),
                headers: { 'Content-Type': 'application/json' }
            })

            setForm({
                ...form,
                ['name']: '',
                ['common']: '',
                ['notes']: ''
            });

            props.loadImage();
            props.onHide(false);

        } catch (err) { console.log(err.message) }



    };

    return (
        <Modal
            {...props} show={props.show}
            size='md'
            aria-labelled-by='contained-modal-title' >
            <Modal.Body>
                <Container>
                    <Form >
                        <Form.Group controlId='form.Edit'>
                            <Form.Label>species</Form.Label>
                            <Form.Control
                                value={form.name}
                                type='text'
                                placeholder='species, if known'
                                onChange={e => setField('name', e.target.value)} />

                            <Form.Group
                                className='mb-3'
                                controlId='formBasicCheckbox'>
                            </Form.Group>

                            <Form.Group
                                controlId='form.common'>
                                <Form.Label>common name(s)</Form.Label>

                                <Form.Control
                                    value={form.common}
                                    type='text'
                                    placeholder='comma separated'
                                    onChange={e => setField('common', e.target.value)} />

                            </Form.Group>
                            <Form.Group controlId='form.Textarea'>
                                <Form.Label>notes</Form.Label>
                                <Form.Control
                                    as='textarea' rows={3}
                                    value={form.notes}
                                    placeholder='notes'
                                    onChange={e => setField('notes', e.target.value)} />
                            </Form.Group>
                        </Form.Group>
                    </Form>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={(e) => axiosEdit(e)}>
                    save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function NewModal(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <p onClick={(e) => setModalShow(true)}>
                edit details
            </p>

            <CenterModal
                show={modalShow}
                onHide={(e) => setModalShow(false)}
                loadImage={props.loadImage}
            />
        </>
    );
}

export default NewModal;