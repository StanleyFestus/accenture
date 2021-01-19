import React from 'react';

const Dashboard = ({name, street, postCode, locality, open}) => {
  return (
    <div 
      className="container-fluid">
      <div 
        className="row">
        <div className="card"
          style={{
            width: '50rem',
            color: '#6c7ac9',
            margin: 'auto'
          }}>
          <div className="card-body">
            <h2 className="card-title" style={{textDecoration: 'underline'}}>Name: {name}</h2>
            <div className="card-text" style={{fontWeight: '700'}}>
              <p>Address: {street}</p>
              <p>Postal Code: {postCode}</p>
              <p>Town: {locality}</p>
              <p>Open: {open}</p>
            </div>
          </div>
          </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
