import { Table, Button } from 'reactstrap';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableCustomer = ({ data, setUpdate, showModal, setShowModal, removeCustomer }) => {

    const sendData = (customer) => {
        setUpdate(customer);
        setShowModal(!showModal);
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Postal Code</th>
                    <th>Created Date</th>
                    <th>Modified Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data < 1) ? (
                        <tr>
                            <td colSpan="12">Sin registros</td>
                        </tr>
                    ) : (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td>{ item.fistName}</td>
                                    <td>{ item.lastName}</td>
                                    <td>{ item.phone}</td>
                                    <td>{ item.email}</td>
                                    <td>{ item.address}</td>
                                    <td>{ item.city}</td>
                                    <td>{ item.postalCode}</td>
                                    <td>{new Date(item.createDate).toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                    <td>{new Date(item.modifiedDate).toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                    <td>
                                        <Button color="primary" size="sm" className="me-2" onClick={() => sendData(item)}><FontAwesomeIcon icon={faEdit} /></Button>
                                        <Button color="danger" size="sm" onClick={() => removeCustomer(item.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                    </td>
                                </tr>
                                )
                            )
                     )
                }
            </tbody>
        </Table>
        )
}

export default TableCustomer; 