import "./Table.css";
import { React } from "react";

const Table = (props) => {
  console.log(props.bookingDetails);
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
          {props.bookingDetails.map((e) => {
            return (
              <tr key={e.id}>
                <th>{e.name}</th>
                <th>{e.email}</th>
                <th>{e.bookedSlots}</th>

                <th>
                  <button
                    onClick={() => {
                      props.Ondelete(e.id);
                    }}
                  >
                    delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
