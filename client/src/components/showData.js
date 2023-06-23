import React from 'react';
import { useLocation } from 'react-router-dom';

const ShowData = () => {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="card-title">Submitted Details:</h2>
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{data.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{data.lastName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{data.countries}</td>
              </tr>
              <tr>
                <td>State:</td>
                <td>{data.state}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{data.city}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{data.gender}</td>
              </tr>
              <tr>
                <td>Date of Birth:</td>
                <td>{data.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{data.age}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowData;