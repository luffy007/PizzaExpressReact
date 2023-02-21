import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import TableCustomer from "./components/TableCustomer";
import {useState, useEffect} from "react";
import ModalCustomer from "./components/ModalCustomer";

const App = () => {

    const [customers, setCustomers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [update, setUpdate] = useState(null);

    const showCustomers = async () => {
        const response = await fetch("api/customer/GetListCustomers");

        if (response.ok) {
            const data = await response.json();
            setCustomers(data);
            console.log(data);
        } else {
            console.log("error getting customer list");
        }
    }

    useEffect(() => {
        showCustomers()
    }, []);

    const saveCustomer = async (customer) => {
        const response = await fetch("api/customer/AddCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(customer)
        })

        if (response.ok) {
            setShowModal(!showModal);
            showCustomers();
        } else {
            console.log(customer)
        }
    } 

    const updateCustomer = async (customer) => {
        const response = await fetch("api/customer/UpdateCustomer", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(customer)
        })

        if (response.ok) {
            setShowModal(!showModal);
            showCustomers();
        } else {
            console.log(customer)
        }
    } 

    const removeCustomer = async (id) => {

        const sureRemove = window.confirm('Do you really wanna remove this customer?');
        if (!sureRemove)
            return;


        const response = await fetch("api/customer/DesactiveCustomer/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(id)
        })

        if (response.ok) {
            showCustomers();
        }
    } 

    return (
        <Container >
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Customer List</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setShowModal(!showModal)}
                            >New Customer</Button>
                            <hr></hr>
                            <TableCustomer data={customers}
                                setUpdate={setUpdate}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                removeCustomer={removeCustomer }
                            />
                        </CardBody> 
                    </Card>
                </Col>
            </Row>
            <ModalCustomer
                showModal={showModal}
                setShowModal={setShowModal}
                saveCustomer={saveCustomer}

                update={update}
                setUpdate={setUpdate}
                updateCustomer={updateCustomer}
            />
        </Container>

    )
}
export default App;