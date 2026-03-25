

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getlocation } from '../../redux/slice/location.slice';
import { NavLink } from 'react-router-dom';

function Location(props) {
   const dispatch = useDispatch();
    useEffect(() => {
   
           dispatch(getlocation());
          
   
       }, []);
       const locationdata = useSelector(State => State.location);
    console.log(locationdata.location);

  return (
    <div>
       <section id="Popular-Packages">
                <div className="container">
                    <h2 className="main-title">Popular Travel Location</h2>
                   
                 
                    <div className="row card">
                        {
                            locationdata.location?.map((v2) => (
                                <div className="col-lg-4 col-md-6">
                                   <NavLink to={`/locationdetails/${v2.id}`}>
                                    <div className="card-data resultImg">
                                        <div className="pckImg">
                                            <img src={"http://localhost:4000/" + v2.image} />                                        </div>
                                        <div className="Packages-data">
                                            <div className="day-price">
                                                <h4>{v2.name}</h4>


                                                
                                            </div>
                                            <p>
                                                {v2.description}
                                            </p>
                                           
                                        </div>
                                    </div>
                                    </NavLink>
                                </div>

                            )
                            )

                        };

                    </div>
                </div>
            </section>
      
    </div>
  );
}

export default Location;