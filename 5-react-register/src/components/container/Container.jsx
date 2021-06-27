import React from 'react';
import './container.css';

const Container = ({ component, size = 'sm', children }) => {
	return React.createElement(
		component,
		{
			className: `container ${size}`,
		},
		children
	);
};

export default Container;
