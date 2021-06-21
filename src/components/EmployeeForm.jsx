import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Button, Label } from 'reactstrap';


export const EmployeeForm = ({initialValues, onFormSubmit}) => {
    return (
        <div>
            <Formik
       initialValues={initialValues}
       validate={values => {
         const errors = {};
         if (!values.firstName) {
          errors.firstName = 'Required';
        } else if (!/^[A-Z]*$/i.test(values.firstName)) {
          errors.firstName = 'Invalid first name';
        }

        if (!values.lastName) {
          errors.lastName = 'Required';
        } else if (!/^[A-Z]*$/i.test(values.lastName)) {
          errors.lastName = 'Invalid last name';
        }

        if (!values.contactNumber) {
          errors.contactNumber = 'Required';
        } else if (!/^[0-9]{10}$/i.test(values.contactNumber)) {
          errors.contactNumber = 'Invalid contact number';
        }


         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(values)
           setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Row style={{ maxWidth: 1000, margin: '1rem auto', textAlign: 'left'}}>
           <Label><h5>FirstName</h5></Label>
           <Field type="text" name="firstName"/>
           <ErrorMessage name="firstName" component="div" />
           </Row>

           <Row style={{ maxWidth: 1000, margin: '1rem auto', textAlign: 'left'}}>
           <Label><h5>LastName</h5></Label>
           <Field type="text" name="lastName"/>
           <ErrorMessage name="lastName" component="div" />
           </Row>

           <Row style={{ maxWidth: 1000, margin: '1rem auto', textAlign: 'left'}}>
           <Label><h5>Email</h5></Label>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           </Row>

           <Row style={{ maxWidth: 1000, margin: '1rem auto', textAlign: 'left'}}>
           <Label><h5>Contact Number</h5></Label>
           <Field type="text" name="contactNumber" />
           <ErrorMessage name="contactNumber" component="div" />
           </Row>

           <Row style={{ maxWidth: 1000, margin: '1rem auto', textAlign: 'left'}}>
           <Button color={"primary"} type="submit" disabled={isSubmitting}>
             Submit
           </Button>
           </Row>
         </Form>
       )}
     </Formik>
        </div>
    )
}