import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getpackage } from '../../redux/slice/package.slice';
import { getitineary } from '../../redux/slice/itineary.slice';


function PackageDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getpackage());
    dispatch(getitineary())

  }, []);

  const { id } = useParams();
  const packagedata = useSelector(State => State.package);

  const itnorydata = useSelector(State => State.itineary);

  console.log(itnorydata.itineary);

  const pD = packagedata.package?.find((v) => v.id == id);
  console.log(pD);

  const fit = itnorydata.itineary?.find(v => v.package_id === pD.id);

  console.log(fit);
  

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
              style={{ height: "300px", width: "100%", marginTop: "20px" }}
            />

            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "20px" }}>{pD?.name}</h5>

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

      <div className="row">
        <div className="col-6">
          <img
              src={"http://localhost:4000/" + fit?.itineary_img}
              className="card-img-top"
              alt="Location"
              style={{ height: "300px", width: "100%", marginTop: "20px" }}
            />
            <h2>{fit?.title}</h2>
           
               {fit?.description?.split("\n").map((i,key) => {
      return <p style={{margin: '14px 0'}} key={key}>{i}</p>;
   })}

        </div>
      </div>

      <NavLink to={'/BookPackage'} className="btn btn-1">Book Package</NavLink>
    </div>
  );
}

export default PackageDetails;