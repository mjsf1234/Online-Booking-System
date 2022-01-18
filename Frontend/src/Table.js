import "./Table.css";
import { React } from "react";

const Table = (props) => {
  console.log(props.bookingList);
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Start-Time</th>
            <th>End-Time</th>
          </tr>
          {props.bookingList.map((e) => {
            return (
              <tr key={e.id}>
                <th>{e.name}</th>
                <th>{e.Email}</th>
                <th>{e.date}</th>
                <th>{e.startTime}</th>
                <th>{e.endTime}</th>

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
