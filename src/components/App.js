import React, { Component } from 'react';



class App extends Component {
  render() {
    return (
      <div>
        <header style={styles.appHeader}>
          <h2>Save Me Some Space</h2>
          <p>A web app to store data to different cloud providers</p>
        </header>
      </div>
    );
  }
}
const styles = {
  appHeader: {
    backgroundColor: 'rgb(73, 151, 157)',
    color: 'white'
  }
}

export default App;
