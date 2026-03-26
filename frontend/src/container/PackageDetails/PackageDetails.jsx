import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getpackage } from '../../redux/slice/package.slice';


function PackageDetails(props) {
    const dispatch = useDispatch();
    
      useEffect(() => {
    
        dispatch(getpackage());
    
    
      }, []);

      const { id } = useParams();
        const packagedata = useSelector(State => State.package);
        console.log(id, packagedata.package);
      
        const pD = packagedata.package?.find((v) => v.id == id);
        console.log(pD);

    return (
        <div className="container my-5">
    <div className="row justify-content-center">
      
      <div className="col-md-4">
        <div className="card shadow-sm">

          {/* Image */}
          <img
            src={"http://localhost:4000/" + pD?.image}
            className="card-img-top"
            alt="Location"
          style={{height:"300px",width:"100%",marginTop:"20px"}}
          />

          <div className="card-body">
            <h5 className="card-title"style={{fontSize:"20px"}}>{pD?.name}</h5>

            <p className="card-text">
              <strong>{pD?.location_id}</strong> <br />
              <strong>{pD?.itineary_id}</strong> <br />
              <strong>{pD?.duration}</strong> <br />
              <strong>{pD?.price}</strong> 
            </p>

           
          </div>

        </div>
      </div>

    </div>
  </div>
    );
}

export default PackageDetails;