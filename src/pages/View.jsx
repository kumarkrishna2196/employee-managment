import React from "react";
import { useSelector} from "react-redux";
import { Row, Col} from 'reactstrap';
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export const View = () => {

  const employees = useSelector(state => state.employees)
  const {id} = useParams();
  let employee = {};

  employees.forEach((emp) => {
    if(emp.id === id) {
      employee = emp;
    }
  })

    return (
      <Container style={{ marginTop: 30 }}>
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'left'}}>
    
        <Col md={8}>
        <Card style={{ width: '40rem', margin: '0 auto' }}>
        <CardBody>
          <CardTitle>
            <strong>Name</strong>: {`${employee.firstName} ${employee.lastName}`} <br />
          </CardTitle>
          <CardText>
            <strong>Employee ID</strong>: {employee.id} <br />
            <strong>E-mail</strong>: {employee.email} <br />
            <strong>Contact Number</strong>: {employee.contactNumber} <br />
          </CardText>
        </CardBody>
      </Card>
        </Col>

        </Row>
        </Container>
    );
}

