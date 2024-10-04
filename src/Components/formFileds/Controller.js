import InputField from "./CustomInput";

const Controller = (props) => {
  const { control, onChange, ...rest } = props;


  switch (control) {
    case "input":
      return <InputField {...rest} className={`${"form-control"}`} />;

    default:
      return null;
  }

};
export default Controller;
