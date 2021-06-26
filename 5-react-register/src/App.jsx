import './App.css';

import Container from './components/container/Container';
import Field from './components/field/Field';
import Form from './components/form/Form';

function App() {
  return (

    <Container component="main">
      <Form>
        <h3>Personal Information</h3>
        <Field label="First Name" col={6}/>
        <Field label="Last Name" col={6}/>
        <Field label="Telephone Number" type="tel" />
        <Field label="Email Address" type="email" />
        <Field label="NPI Number" />

        <h3>Business Address</h3>
        <Field label="Street Address" type="textarea" rows={2}/>
        <Field label="City" col={12} />
        <Field label="State" col={9}/>
        <Field label="Zip Code" col={3}/>

        <button type="submit" col={4}>Sign Up</button>
      </Form>
    </Container>
  );
}

export default App;
