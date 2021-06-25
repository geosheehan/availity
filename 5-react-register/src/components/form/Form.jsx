import React from 'react';

import './form.css';

const Form = ({children}) => {
   return (
      <form>
         {children.map(child => {
            const col = `c${Math.min(Math.max(child.props.col ?? 12, 1), 12)}`;

            return (
               <div className={`field ${col}`}>
                  {child}
               </div>
            )
         })}
      </form>
   )
}

export default Form
