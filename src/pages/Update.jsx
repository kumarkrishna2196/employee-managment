import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Container,
  Row
} from 'reactstrap';
import { UpdateEmployee } from "../actions";
import { useParams } from "react-router-dom";
import {EmployeeForm} from "../components/EmployeeForm"
import {history} from "../store/configureStore"
import {PAGE_PATHS} from "../constants/PagePaths"

export const Update = () => {
  const employees = useSelector(state => state.employees)
  const {id} = useParams();
  let employee = {};

  employees.forEach((emp) => {
    if(emp.id === id) {
      employee = emp;
    }
  })


    const dispatch = useDispatch();

    return (
      <Container style={{ marginTop: 30 }}>
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'left'}}>
        
        <div>
     <h1>Update Employee {employee.id}</h1>
     <EmployeeForm initialValues={{ firstName: employee.firstName, lastName: employee.lastName, email: employee.email, contactNumber: employee.contactNumber }} 
     onFormSubmit={(values) => 
      {
        dispatch(UpdateEmployee({...employee, ...values}));
        history.push(PAGE_PATHS.HOME);
      }}
        />
   </div>
        </Row>
        </Container>
    );
}

