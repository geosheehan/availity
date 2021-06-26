import { useState } from 'react';

import Container from './components/container/Container';
import Field from './components/field/Field';
import Form from './components/form/Form';

import './App.css';

function App() {
  // Form states to validate
  const [name, setName] = useState({first: '', last: ''});
  const [contact, setContact] = useState({phone: null, email: ''});
  const [npi, setNPI] = useState(null);

  const [address, setAddress] = useState({
    street: '',
    extended: '',
    city: '',
    state: '',
    zip: null
  })

  const [errors, setErrors] = useState({
    // errors will be empty if there are no errors.
    // Otherwise, a key to the field with a list of error messages will appear
    // first:  '',
    // last: '',
    // phone: '',
    // email: '',
    // npi: '',
    // street: '',
    // city: '',
    // state: '',
    // zip: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors)) return;

    // Redirect to login, dashboard, homepage, etc.

  }

  const validateFilled = (e, key, field) => {
    const msg = `${field} cannot be blank.`;

    if (e.target.value.trim().length === 0) {
      setErrors({...errors, [key]: msg});
      return false;
    }
    return true;
  }

  const validatePattern = (e, key, field, pattern) => {

    if (!validateFilled(e, key, field)) return false;

    if (!pattern.test(e.target.value)) {
      setErrors({...errors, [key]: `Invalid ${field}`})
    }
  }

  const validateZipCode = (e, key) => {
    validatePattern(e, key, 'Zip Code', /^\d{5}(?:[-\s]\d{4})?$/);
  }

  const validatePhoneNumber = (e, key) => {
    validatePattern(e, key, 'Telephone Number', /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
  }

  return (
    <Container component="main">
      <Form onSubmit={handleSubmit}>
        <h3>Personal Information</h3>
        <Field
          label="First Name"
          required
          col={6}
          error={Boolean(errors.first)}
          helperText={errors.first || ''}
          onBlur={(e) => validateFilled(e, 'first', 'First Name')}
          onChange={(e) => {
            delete errors.first;
            setName({...name, first: e.target.value});
          }}
        />
        <Field
          label="Last Name"
          required
          col={6}
          error={Boolean(errors.last)}
          helperText={errors.last || ''}
          onBlur={(e) => validateFilled(e, 'last', 'Last Name')}
          onChange={(e) => {
            delete errors.last
            setName({...name, last: e.target.value});
          }}
        />
        <Field
          label="Telephone Number"
          required
          type="tel"
          col={4}
          error={Boolean(errors.phone)}
          helperText={errors.phone || ''}
          onBlur={(e) => validatePhoneNumber(e, 'phone')}
          onChange={(e) => {
            delete errors.phone
            setContact({...contact, phone: e.target.value});
          }}
        />
        <Field label="Email Address" required type="email" col={8}/>
        <Field label="NPI Number" required />

        <h3>Business Address</h3>
        <Field
          label="Street Address"
          required
          error={Boolean(errors.street)}
          helperText={errors.street || ''}
          onBlur={(e) => validateFilled(e, 'street', 'Street Address')}
          onChange={(e) => {
            delete errors.street
            setAddress({...address, street: e.target.value})
          }}
        />
        <Field label="Apartment, building, floor (optional)" />
        <Field
          label="City"
          required
          col={6}
          error={Boolean(errors.city)}
          helperText={errors.city || ''}
          onBlur={(e) => validateFilled(e, 'city', 'City')}
          onChange={(e) => {
            delete errors.city
            setAddress({...address, city: e.target.value})
          }}
        />
        <Field
          label="State" required col={3}
          error={Boolean(errors.state)}
          helperText={errors.state || ''}
          onBlur={(e) => validateFilled(e, 'state', 'State')}
          onChange={(e) => {
            delete errors.state
            setAddress({...address, state: e.target.value})
          }}
        />
        <Field
          label="Zip Code"
          required
          col={3}
          error={Boolean(errors.zip)}
          helperText={errors.zip || ''}
          onBlur={(e) => validateZipCode(e, 'zip')}
          onChange={(e) => {
            delete errors.zip
            setAddress({...address, zip: e.target.value})
          }}
        />

        <button type="submit" col={4}>Sign Up</button>
      </Form>
    </Container>
  );
}

export default App;
