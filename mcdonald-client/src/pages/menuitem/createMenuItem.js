import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import JSONPretty from 'react-json-pretty';
import "./menuitem.css";

import React from 'react';

const CreateMenuItem = ({showModal, setShowModal, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, create} = UseFetch();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);
    
   const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {id: "", name: "", email: ""},
        shouldUseNativeValidation: false
    });
    const createFormOptions = {
        id: {required: "ID is required"},
        name: {required: "Name is required"},
        email: {required: "Email is required"}
    }

    const handleCreate = (menuitem) => {
        create(menuitem);
        setSubmitted(true);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Menu Items");
    }
    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Menu Items");
    }
    useEffect(() => {
        if (!submitted || error != null) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    })
    return (
        <div>
            <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Create Menu Item</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src={require(`../loading.gif`)} alt="Loading ......"/>
                        </div>
                    }
                    {response && <JSONPretty data={response}></JSONPretty>}
                    {(!submitted || error != null) &&
                        <form className="form-student" id="form-student-edit" onSubmit={handleSubmit(handleCreate)}>
                            <ul className="form-student-errors">
                                {errors?.id && <li>{errors.id.message}</li>}
                                {errors?.name && <li>{errors.name.message}</li>}
                                {errors?.email && <li>{errors.email.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Student ID</label>
                                <input name="id" {...register('id', createFormOptions.id)}/>
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" {...register('name', createFormOptions.name)}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" {...register('email', createFormOptions.email)}/>
                            </div>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button variant="primary" form="form-menuitem-edit" type="submit"
                            style={{display: (!showButton) ? "none" : ""}}>Create</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateMenuItem;





















    // const {error, isLoading, data: response, create} = UseFetch();
    // const [submitted, setSubmitted] = useState(false);
    // const [showButton, setShowButton] = useState(true)

    // const {register, handleSubmit, formState: {errors}} = useForm({
    //     defaultValues: {id: "", name: "", email: "", major: "", gpa: ""},
    //     shouldUseNativeValidation: false
    // });

    // const createFormOptions = {
    //     id: {required: "ID is required"},
    //     name: {required: "Name is required"},
    //     email: {required: "Email is required"},
    //     major: {required: "Major is required"},
    //     gpa: {required: "GPA is required"}
    // }

    // const handleCreate = (student) => {
    //     create(student);
    //     setSubmitted(true);
    // }

    // useEffect(() => {
    //     if (!submitted || error != null) {
    //         setShowButton(true);
    //     } else {
    //         setShowButton(false);
    //     }
    // })

    // const handleCancel = () => {
    //     setShowModal(false);
    //     setSubHeading("All Students");
    // }

    // const handleClose = () => {
    //     setShowModal(false);
    //     setShowButton(true);
    //     setSubmitted(false);
    //     setSubHeading("All Students");
    //     setReload(!reload);
    // }
