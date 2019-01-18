
import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { classify } from './../../actions';

class DataForm extends Component{
  constructor(props) {
     super(props);
     this._handleSubmit = this._handleSubmit.bind(this);
     this._handleAlgorithmChanged = this._handleAlgorithmChanged.bind(this);
     this.state= {algorithm : 'KNN'};
     this.fileInput = React.createRef();
   }
   _handleAlgorithmChanged(e) {
    this.setState({algorithm: e.target.value})
   }

    _handleSubmit(event) {
     event.preventDefault();
     const formData = new FormData();
     formData.append('selectedFile', this.fileInput.files[0]);
     formData.append('algorithm', this.state.algorithm);
     this.props.classify(formData, 'showAnalysisModal', !this.props.showAnalysisModal);
   }
   render(){
    return(
      <form onSubmit={this._handleSubmit} style={{ width: "100%" , display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} >
      <div>
      <label>
        Pick your Algorithm:
        <div className="input-field col s12">
         <p>
           <label>
             <input name="group1"
                onChange={this._handleAlgorithmChanged}
                value="KNN"
                checked={this.state.algorithm === 'KNN'}
                type="radio"
                style={styles.radioButtonStyle} />
             <span>KNN</span>
           </label>
         </p>
         <p>
           <label>
             <input name="group1"
                type="radio"
                value="NB"
                onChange={this._handleAlgorithmChanged}
                checked={this.state.algorithm === 'NB'}
                style={styles.radioButtonStyle} />
             <span>Navie Bayes</span>
           </label>
         </p>
         <p>
           <label>
             <input name="group1"
                onChange={this._handleAlgorithmChanged}
                type="radio"
                checked={this.state.algorithm === 'J48'}
                value="J48"
                style={styles.radioButtonStyle} />
             <span>J48</span>
           </label>
         </p>
        </div>
      </label>
      </div>
      <div style={{ width: "100%" , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <input type="file" ref={ref => this.fileInput = ref} name="selectedFile" />
        <button style={{ cursor: 'pointer',color:'#fff',backgroundColor: '#9CA9FF', height: 40, width: "30%", borderRadius:5}} type="submit">Create Modal</button>
      </div>
      </form>
    )
  }
}

const styles={
  quillStyle:{
    width: "80%",
    height: '100%',
    marginTop: '2%'
  },
  radioButtonStyle:{
    background: "#9CA9FF !important"
  }
}

export default connect(null, {classify})(DataForm);
