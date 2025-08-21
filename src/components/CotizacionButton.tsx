import { Link } from "react-router-dom";
import "./CotizacionButton.css";

const CotizacionButton = ({
  label,
  componentOption,
}: {
  label: string;
  componentOption: 1 | 2 | 3;
}) => {
  if (componentOption === 1) {
    return (
      <Link to={"/cotizacion"} className="btn btn-secondary l1 not-link-style">
        <div className="card-actions">{label}</div>
      </Link>
    );
  }

  if(componentOption === 2){
    return(
      <button 
        className="btn btn-secondary cta1"
      >
        <span className="material-icons">calculate</span>
        <Link 
        to={"/cotizacion"}
        >{label}</Link>
      </button>
    )
  }

  return (
    <Link to={"/cotizacion"} className="cotizacionLink2 not-link-style">
      <button className="btn btn-secondary cta1 cotizacion-button ">
        <span className="material-icons">email</span>
        {label}
      </button>
    </Link>
  );
};

export default CotizacionButton;
