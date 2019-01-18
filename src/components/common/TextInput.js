import React from 'react';

const TextInput = ({type, label, onChange, value, placeholder, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        style={{marginBottom: '10px'}}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
       />
    </div>
  )
}
export {TextInput};
