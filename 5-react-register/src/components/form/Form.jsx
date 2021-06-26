import React from 'react';

import './form.css';

const Form = ({children, onSubmit}) => {
   return (
      <form onSubmit={onSubmit}>
         {children.map((child, index) => {
            const col = `c${Math.min(Math.max(child.props.col ?? 12, 1), 12)}`;

            return (
               <div key={index} className={`field ${col}`}>
                  {child}
               </div>
            )
         })}
      </form>
   )
}

export default Form
