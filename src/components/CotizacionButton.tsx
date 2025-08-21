import { Link } from "react-router-dom";


const CotizacionButton = ({label, componentOption}:{label: string, componentOption: 1 | 2}) => {

  if(componentOption === 1){
    return (
        <div className="card-actions">
            <Link 
            to={"/cotizacion"}
            className="btn btn-secondary l1"
            >
            {label}
            </Link>
        </div>
    )
  }

  return (
    <button 
        className="btn btn-secondary cta1"
        onClick={() => {
        }}
        >
        <span className="material-icons">email</span>
        {label}
    </button>
  );
};

export default CotizacionButton;