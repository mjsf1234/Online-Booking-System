import "./Form.css";

const Form = (props) => {
  return (
    <div className="">
      <form>
        <div>
          <label>name</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email"></input>
        </div>
        <div>
          <label>Date</label>
          <input type="Date"></input>
        </div>
      </form>
    </div>
  );
};
export default Form;
