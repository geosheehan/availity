import './App.css';

import Container from './components/container/Container';
import Field from './components/field/Field';
import Form from './components/form/Form';

function App() {
  return (

    <Container component="main">
      <Form>
        <Field label="First Name" col={6}/>
        <Field label="Last Name" col={6}/>
        <Field label="NPI Number" />
        <Field label="Business Address" type="textarea" rows={4}/>
        <Field label="Telephone Number" type="tel" />
        <Field label="Email Address" type="email" />
        <button type="submit">Sign Up</button>
      </Form>
    </Container>
  );
}

export default App;
