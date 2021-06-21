import React from "react";
import {useDispatch} from "react-redux";
import {
  Container,
  Row
} from 'reactstrap';
import { AddEmployee } from "../actions";
import {EmployeeForm} from "../components/EmployeeForm"
import {history} from "../store/configureStore"
import {PAGE_PATHS} from "../constants/PagePaths"

export const Create = () => {

    const dispatch = useDispatch();

    return (
      <Container style={{ marginTop: 30 }}>
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'left'}}>
        
        <div>
     <h1>Add Employee</h1>
     <EmployeeForm initialValues={{ firstName: '', lastName: '', email: '', contactNumber: '' }}
      onFormSubmit={(values) => {dispatch(AddEmployee(values)); history.push(PAGE_PATHS.HOME)}}/>
   </div>
        </Row>
        </Container>
    );
}

