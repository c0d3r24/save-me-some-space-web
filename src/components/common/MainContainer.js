import React from 'react';

const MainContainer = (props) => {
  return (
    <div  style={styles.containerStyle}>
      {props.children}
    </div>
  );
};

const styles = {
  containerStyle:{
    paddingLeft: 5,
    paddingRight: 5

  }
};

export {MainContainer}
