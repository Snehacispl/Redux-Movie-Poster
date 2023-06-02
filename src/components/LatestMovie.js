import React from 'react';
import { Link } from "react-router-dom";

function LatestMovie() {
    return (
        <div>
            <div className="row">
                            <h1 className='text-center'>Latest Movies</h1>
							<div className="col-sm-6 col-md-3">
								<div className="latest-movie">
                                <Link to="/MovieDetail"><img src="images/thumb-3.jpg" alt="Movie 3"/></Link>
								</div>
							</div>
							<div className="col-sm-6 col-md-3">
								<div className="latest-movie">
                                <Link to="/MovieDetail"><img src="images/thumb-4.jpg" alt="Movie 4"/></Link>
								</div>
							</div>
							<div className="col-sm-6 col-md-3">
								<div className="latest-movie">
                                <Link to="/MovieDetail"><img src="images/thumb-5.jpg" alt="Movie 5"/></Link>
								</div>
							</div>
							<div className="col-sm-6 col-md-3">
								<div className="latest-movie">
                                <Link to="/MovieDetail"><img src="images/thumb-6.jpg" alt="Movie 6"/></Link>
								</div>
							</div>
						</div> 
        </div>
    )
}

export default LatestMovie
