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
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-6">
          <div className="card shadow-lg">
            <img src={"http://localhost:4000/" + lD?.image} className="card-img-top" style={{height:"300px",width:"100%",marginTop:"20px"}}/>
            <div className="card-body text-center">
              <h3 className="card-title"style={{fontSize:"20px"}}>{lD?.name}</h3>
              <p className="card-text">
                {lD?.description}
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>



  );
}

export default LocationDetails;