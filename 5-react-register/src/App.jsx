import { useState } from 'react';

import Container from './components/container/Container';
import Field from './components/field/Field';
import Form from './components/form/Form';

import './App.css';

function App() {
	// Form states to validate
	const [name, setName] = useState({ first: '', last: '' });
	const [contact, setContact] = useState({ phone: '', email: '' });
	const [npi, setNPI] = useState('');
	const [address, setAddress] = useState({
		street: '',
		extended: '',
		city: '',
		state: '',
		zip: '',
	});

	// Error states
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
	});

	// Show the submit message next to the submit button
	const [showSubmit, setShowSubmit] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		delete errors.submit;
		if (Object.keys(errors).length)
			return setErrors({
				...errors,
				submit: 'Please handle all form errors and submit again.',
			});

		// Normally this would be where I invoke my api to create a new user and store this data in the database.
		// However, for this demo, enjoy a nice table view in the console.
		console.table({
			first: name.first,
			last: name.last,
			phone: contact.phone,
			email: contact.email,
			npi,
			street: address.street,
			extended: address.extended,
			state: address.state,
			zip: address.zip,
		});

		// Redirect to login, dashboard, homepage, etc.
		setShowSubmit(true);
	};

	// Generic validators
	const validateFilled = (e, key, field) => {
		const msg = `${field} cannot be blank.`;

		if (e.target.value.trim().length === 0) {
			setErrors({ ...errors, [key]: msg });
			return false;
		}
		return true;
	};
	const validatePattern = (e, key, field, pattern) => {
		if (!validateFilled(e, key, field)) return false;

		if (!pattern.test(e.target.value)) {
			setErrors({ ...errors, [key]: `Invalid ${field}` });
			return false;
		}

		return true;
	};

	// Specific validators
	const validateZipCode = (e, key) => {
		validatePattern(e, key, 'Zip Code', /^\d{5}(?:[-\s]\d{4})?$/);
	};
	const validatePhoneNumber = (e, key) => {
		validatePattern(
			e,
			key,
			'Telephone Number',
			/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
		);
	};
	const validateEmail = (e, key) => {
		// Very minimal, very rough, email validation.
		validatePattern(e, key, 'Email Address', /^\S+@\S+$/);
	};
	const validateNPI = (e, key) => {
		if (!validatePattern(e, key, 'NPI', /^(?:80840)?\d{10}$/)) return false;

		// Luhn NPI validation method
		// Formula from: https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand/Downloads/NPIcheckdigit.pdf
		const check = parseInt(e.target.value.slice(-1));
		let sum = e.target.value
			.slice(-10, -1)
			.split('')
			.reduce((sum, d, index) => {
				let digit = parseInt(d);
				if (index % 2 === 0) digit *= 2;

				if (digit > 9) digit = ~~(digit / 10) + (digit % 10);
				return sum + digit;
			}, 24); // 24 is constant value using this algorithm for the 80840 prefix

		// Confirming with check digit
		if (check !== 10 - (sum % 10)) {
			setErrors({
				...errors,
				npi: 'Failed NPI validator. Verify your number.',
			});
			return false;
		}
		return true;
	};

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
						const { first, ...others } = errors;
						setErrors(others);
						setName({ ...name, first: e.target.value });
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
						const { last, ...others } = errors;
						setErrors(others);
						setName({ ...name, last: e.target.value });
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
						const { phone, ...others } = errors;
						setErrors(others);
						setContact({ ...contact, phone: e.target.value });
					}}
				/>
				<Field
					label="Email Address"
					required
					type="email"
					col={8}
					error={Boolean(errors.email)}
					helperText={errors.email || ''}
					onBlur={(e) => validateEmail(e, 'email')}
					onChange={(e) => {
						const { email, ...others } = errors;
						setErrors(others);
						setContact({ ...contact, email: e.target.value });
					}}
				/>
				<Field
					label="NPI Number"
					required
					error={Boolean(errors.npi)}
					helperText={errors.npi || ''}
					onBlur={(e) => validateNPI(e, 'npi')}
					onChange={(e) => {
						const { npi, ...others } = errors;
						setErrors(others);
						setNPI(e.target.value);
					}}
				/>

				<h3>Business Address</h3>
				<Field
					label="Street Address"
					required
					error={Boolean(errors.street)}
					helperText={errors.street || ''}
					onBlur={(e) => validateFilled(e, 'street', 'Street Address')}
					onChange={(e) => {
						const { street, ...others } = errors;
						setErrors(others);
						setAddress({ ...address, street: e.target.value });
					}}
				/>
				<Field
					label="Apartment, building, floor (optional)"
					onChange={(e) =>
						setAddress({ ...address, extended: e.target.value })
					}
				/>
				<Field
					label="City"
					required
					col={6}
					error={Boolean(errors.city)}
					helperText={errors.city || ''}
					onBlur={(e) => validateFilled(e, 'city', 'City')}
					onChange={(e) => {
						const { city, ...others } = errors;
						setErrors(others);
						setAddress({ ...address, city: e.target.value });
					}}
				/>
				<Field
					label="State"
					required
					col={3}
					error={Boolean(errors.state)}
					helperText={errors.state || ''}
					onBlur={(e) => validateFilled(e, 'state', 'State')}
					onChange={(e) => {
						const { state, ...others } = errors;
						setErrors(others);
						setAddress({ ...address, state: e.target.value });
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
						const { zip, ...others } = errors;
						setErrors(others);
						setAddress({ ...address, zip: e.target.value });
					}}
				/>

				<button type="submit" col={4}>
					Sign Up
				</button>
				<span
					className={
						errors.submit ? 'error--text' : showSubmit ? '' : 'hide'
					}
					col={8}
				>
					{errors.submit || 'Check console to see submitted data.'}
				</span>
			</Form>
		</Container>
	);
}

export default App;
