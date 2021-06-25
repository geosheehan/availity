import './field.css'

const Field = ({label, type, id, rows, style}) => {
   id = id ?? label;
   type = type || "text";
   return (
      <div className="field" style={style}>
         <label htmlFor={id}>{label}</label>
         {
            type === "textarea"
            ? <textarea rows={rows || 1}></textarea>
            : <input id={id} type={type}  />

         }
      </div>
   )
}

export default Field
