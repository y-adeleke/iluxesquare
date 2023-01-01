import "./FeatureHelper.css";

const FeatureHelper = (props) => {
  return (
    <div className={`wrapper ${props.conClassName}`}>
      <div className={`img-wrap`}>
        <img src={props.src} alt={props.alt} />
      </div>
      <div className={`text-wrap`}>
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
};
export default FeatureHelper;
