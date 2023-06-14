
import React,{ useEffect, useState } from "react";
function Banner(imdbid) {
  const [banner, setBanner] =useState([]);
 useEffect( ()=>{
  const getBanner= async()=>{
    const reqData= await fetch(" https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb");
    const resData= await reqData.json();
    //console.log(resData);
    setBanner(resData);
  }
getBanner();
 },[]);
  return (
    <>
     
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
   <div className="carousel-inner">   
  {
    banner.map( (banners, index)=>(
    <div className={ index===0? "carousel-item active":"carousel-item" } key={banners.ban_id }>
      <img src={ ``} className="d-block w-100" alt='...'/>
    </div>
    ))
}

    
        
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
     
    </>
  );
}

export default Banner;
