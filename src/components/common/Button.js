import React from 'react';



const Button = (props) => {
  
  return (
    <button
      onClick={props.onClick}
      className = "btn-flat white-text" style={styles.baseStyle}>
      {props.children}
    </button>
  )
};

const styles = {
  baseStyle :{backgroundColor: '#9CA9FF', height: 50, width: "50%"}
}
export {Button};
