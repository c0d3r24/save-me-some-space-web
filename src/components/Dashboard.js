import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large red" to="/surveys/new">
          <i className="material-icons" style={{background:'rgba(180,10,10,.2)'}}>add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
