import { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Button  } from 'reactstrap';

const fechaActual = new Date();
const fechaISO8601 = fechaActual.toISOString();

const modelCustomer = {
    "id": 0,
    "fistName": "",
    "lastName":"",
    "phone":"",
    "email":"",
    "address":"",
    "city":"",
    "postalCode": 0,
    "createDate": fechaISO8601,
    "modifiedDate": null
    }

const ModalCustomer = ({ showModal, setShowModal, saveCustomer, update, setUpdate, updateCustomer }) => {

    const [customer, setCustomer] = useState(modelCustomer);

    const updateData = (e) => {
        
        let value = e.target.value;
        if (e.target.name === "postalCode") {
            value = parseInt(value, 10); // convierte a entero base 10
        }
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
         })
    }

    const sendData = () => {
        if (customer.id == 0) {
            saveCustomer(customer);
        } else {
            updateCustomer(customer);
        }

        setCustomer(modelCustomer);
    }

    useEffect(() => {
        if (update != null) {
            setCustomer(update);
        } else {
            setCustomer(modelCustomer)
        }
    }, [update])

    const closeModal = () => {
        setShowModal(!showModal);
        setUpdate(null);
    }

    return (
        <Modal isOpen={ showModal }>
            <ModalHeader>
                {customer.id == 0 ? "New Customer" : "Update Customer"}
            </ModalHeader>
            <ModalBody>
                <Form>

                    <FormGroup>
                        <Label>First Name</Label>
                        <Input name="fistName" onChange={(e) => updateData(e)} value={customer.fistName}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input name="lastName" onChange={(e) => updateData(e)} value={customer.lastName}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input name="phone" onChange={(e) => updateData(e)} value={customer.phone}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input name="email" onChange={(e) => updateData(e)} value={customer.email}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input name="address" onChange={(e) => updateData(e)} value={customer.address}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>City</Label>
                        <Input name="city" onChange={(e) => updateData(e)} value={customer.city}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Postal Code</Label>
                        <Input name="postalCode" onChange={(e) => updateData(e)} value={customer.postalCode}></Input>
                    </FormGroup>
                    
                    
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={sendData}>Save</Button>
                <Button color="danger" size="sm" onClick={closeModal}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalCustomer;