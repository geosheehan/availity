import './field.css'

const Field = ({label, type, id, rows}) => {
   id = id ?? label;
   type = type || "text";
   return (
      <>
         <label htmlFor={id}>{label}</label>
         {
            type === "textarea"
            ? <textarea rows={rows || 1}></textarea>
            : <input id={id} type={type}  />
         }
      </>
   )
}

export default Field
