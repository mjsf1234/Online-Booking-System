import "./Table.css";
import { React } from "react";
import { Table } from "reactstrap";

const DisplayTable = ({ bookingData, onDelete }) => {
  console.log(bookingData);
  return (
    <div className="table-main">
      <h2>Bookings Details</h2>

      <Table bordered hover responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Booked SLots</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((e, index) => {
            return (
              <tr key={index}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.bookedSlots}</td>

                <th>
                  <button
                    onClick={() => {
                      onDelete(e.id);
                    }}
                  >
                    delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
          {bookingData.map((e) => {
            return (
              <tr key={e.id}>
                <th>{e.name}</th>
                <th>{e.email}</th>
                <th>{e.bookedSlots}</th>

                <th>
                  <button
                    onClick={() => {
                      Ondelete(e.id);
                    }}
                  >
                    delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};
export default DisplayTable;
