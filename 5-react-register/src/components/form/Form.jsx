import React from 'react';

import './form.css';

const Form = ({children}) => {
   console.log({children});
   return (
      <form>
         {children.map(child => {
            const width = Math.min(Math.max(child.props.col ?? 12, 1), 12) / 12 * 100;
            return React.cloneElement(child, {...child.props, style: {width: `${width}%`}});
         })}
      </form>
   )
}

export default Form
