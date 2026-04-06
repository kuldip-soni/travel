import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getpackage } from '../../redux/slice/package.slice';

function Package(props) {
    const dispatch = useDispatch();
        useEffect(() => {
       
               dispatch(getpackage());
              
       
           }, []);
            const packagedata = useSelector(State => State.package);
               console.log(packagedata.package);
    return (
        <div>
            <section id="Popular-Packages">
                <div className="container">
                    <h2 className="main-title">Packages</h2>
                    <p className="sub-title">
                        Our travel management system offers a variety of travel packages designed to meet the needs of different types of users. These packages include arrangements for transportation, accommodation, and sightseeing activities. The main objective is to provide a complete travel solution in one place.
                    </p>
                    <div className="row all-popular">
                        <div className="Popular-data col-lg-6">
                            <h2>Popular Packages</h2>
                            <p>
                                The popular packages section highlights the most frequently selected travel plans by users. These packages are chosen based on demand and user interest.
                            </p>
                        </div>
                        <div className="col-lg-3">
                           <NavLink to={'/customizedpackage'} className="btn btn-1">Customize Package</NavLink>
                        </div>
                    </div>
                    <div className="row card">
                        {
                            packagedata.package?.map((v2) => (
                                <div className="col-lg-4 col-md-6">
                                     <NavLink to={`/packagedetails/${v2.id}`}>
                                    <div className="card-data resultImg">
                                        <div className="pckImg">
                                            <img src={"http://localhost:4000/" + v2.image} />                                      
                                              </div>
                                        <div className="Packages-data">
                                            <div className="day-price">


                                                <h4>{v2.name}</h4>
                                                <p>{v2.price}</p>
                                            </div>
                                            <p>
                                                {v2.duration}
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

export default Package;