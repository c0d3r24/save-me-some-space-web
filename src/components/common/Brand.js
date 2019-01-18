import React from 'react';

const Brand = (props) => {
  return (
    <div  style={styles.brandContainer} className="center-align">
      <h3 style={styles.brandStyle}>{ props.brandName }</h3>
      <span style={styles.copyrightStyle}>a project by Junaid Azhar Shaikh</span>
    </div>
  );
};

const styles = {
  brandContainer:{
      fontFamily: 'Montserrat, sans-serif',

  },
  brandStyle:{
    fontSize: 50,
    fontWeight: 'bold',
    color:'#9CA9FF'
  },
  copyrightStyle:{
    fontSize:12,
    fontWeight: 100,
  }
};
export {Brand};
