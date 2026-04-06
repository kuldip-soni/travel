import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getlocation } from '../../redux/slice/location.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { getvendor } from '../../redux/slice/vendor.slice';

function LocationDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getlocation());
    dispatch(getpackage());
    dispatch(getvendor());


  }, []);

  const { id } = useParams();
  const locationdata = useSelector(State => State.location);
  console.log(locationdata.location);
  console.log(id);

  const packagedata = useSelector(State => State.package);
  console.log(id, packagedata.package);


  const pD = packagedata.package?.filter(v1 => v1.location_id == id);
  console.log(pD);

  const lD = locationdata.location?.find((v) => v.id == id);
  console.log(lD);

  const vendordata = useSelector(State => State.vendor);
  console.log("vd",id, vendordata.vendor);

  // const vD= vendordata.vendor?.filter(v3 => v3.location_id == id );
  // console.log("vdd",vD);
  



  return (
    <div className="container py-5" style={{}}>
      <div className="row justify-between" style={{ justifyContent: 'space-between', marginTop: '50px' }}>

        <div className="col-md-6">
          <div className="card shadow-lg" style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
            <img src={"http://localhost:4000/" + lD?.image} className="card-img-top" style={{ height: "300px", width: "100%", }} />

          </div>
        </div>
        <div className="col-md-5">
          <div className="card-body text-center" style={{ width: "50%", marginTop: '3rem' }}>
            <h3 className="card-title" style={{ fontSize: "20px" }}>{lD?.name}</h3>
            <p className="card-text" style={{ fontSize: "15px" }}>
              {lD?.description}
            </p>

          </div>
        </div>


      </div>


      <div className="row card">
  {pD?.map((v2) => (
    <div className="col-lg-4 col-md-6" key={v2.id}>
      <NavLink to={`/packagedetails/${v2.id}`}>
        <div className="card-data resultImg">
          <div className="pckImg">
            <img src={`http://localhost:4000/${v2.image}`} alt={v2.name} />
          </div>
          <div className="Packages-data">
            <div className="day-price">
              <h4>{v2.name}</h4>
              <p>{v2.price}</p>
            </div>
            <p>{v2.duration}</p>
          </div>
        </div>
      </NavLink>
    </div>
  ))}
</div>

<div className="row card">
  {vendordata?.vendor
    ?.filter((v3) => v3.location_id == id)
    ?.map((vv) => (
      <div className="col-lg-4 col-md-6" key={vv.id}>
        <div className="card-data resultImg">
          <div className="Packages-data">
            <div className="day-price">
              <h4>{vv.name}</h4>
            </div>
          </div>
        </div>
      </div>
    ))}
</div>

    </div>

  );
}

export default LocationDetails;