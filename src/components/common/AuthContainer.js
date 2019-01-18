import React from 'react';

const AuthContainer = (props) => {
  return (
    <div  style={styles.containerStyle}>
      {props.children}
    </div>
  );
};

const styles = {
  containerStyle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export {AuthContainer}
