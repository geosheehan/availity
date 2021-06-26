
import { useState } from 'react';
import './field.css';

const Field = ({label, type, id, rows, required, error, helperText, onChange, onBlur}) => {
   // Fixing nullish props
   id = id ?? label;
   type = type || "text";

   const [selected, setSelected] = useState(false);

   const handleFocus = () => setSelected(true);
   const handleBlur = (e) => {
      onBlur && onBlur(e);
      setSelected(false);
   };

   const classes = [];

   if (error) classes.push('error');
   if (selected) classes.push('selected');

   return (
      <>
         <label
            className={error ? 'error--text' : selected ? 'selected--text' : ''}
            htmlFor={id}
         >
            {required && <span className='error--text'>*</span>}
            {' '}
            {label}
         </label>
         {
            type === "textarea"
            ? <textarea
                  id={id}
                  className={classes.join(' ')}
                  rows={rows || 1}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={onChange}
               ></textarea>
            : <input
                  id={id}
                  className={classes.join(' ')}
                  type={type}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={onChange}
               />
         }
         <span className={error ? 'error--text' : ''}>{helperText}</span>
      </>
   )
}

export default Field
