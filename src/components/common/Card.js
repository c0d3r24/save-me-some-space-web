import React from 'react';

const Card = (props) => {
  return (
    <div className=""
          style={styles.cardStyle}>
          {props.children}
    </div>);
}

const styles = {
  cardStyle : {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    marginTop:'7%',
    display: 'flex',
    justifyContent: 'spacearound',
    flexDirection: 'column',
    borderRadius: '10px',
    width: '40%',
    height: '50%',
    border: '1px solid #898488',
  }
}
export {Card};
