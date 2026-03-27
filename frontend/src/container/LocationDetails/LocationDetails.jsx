import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getlocation } from '../../redux/slice/location.slice';

function LocationDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getlocation());


  }, []);

  const { id } = useParams();
  const locationdata = useSelector(State => State.location);
  console.log(id, locationdata.location);

  const lD = locationdata.location?.find((v) => v.id == id);
  console.log(lD);


  return (
    <div className="container py-5" style={{}}>
      <div className="row justify-between" style={{justifyContent: 'space-between', marginTop: '50px'}}>

        <div className="col-md-6">
          <div className="card shadow-lg"style={{ display: 'flex', justifyContent: 'space-between',width:"100%" }}>
            <img src={"http://localhost:4000/" + lD?.image} className="card-img-top" style={{height:"300px",width:"100%",}}/>
            
          </div>
        </div>
        <div className="col-md-5">
          <div className="card-body text-center" style={{width:"50%", marginTop: '3rem'}}>
              <h3 className="card-title"style={{fontSize:"20px"}}>{lD?.name}</h3>
              <p className="card-text">
                {lD?.description}
              </p>
            </div>
        </div>


      </div>
    </div>



  );
}

export default LocationDetails;