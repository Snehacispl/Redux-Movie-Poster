import React, { useEffect, useState } from "react";
import Slider from "react-touch-drag-slider";
// import images from "./images";


const Banner = () => {
   const [users, setUsers] = useState([])

   const fetchUserData = () => {
     fetch("https://api.unsplash.com/photos/?client_id=vC0jNOPkkxT8ZXoDm3EvSxeEN-S1eNBigNqc0jBr5Iw")
       .then(response => {
         return response.json()
       })
       .then(data => {
         setUsers(data)
      })
   }

  useEffect(() => {
    fetchUserData()
   }, [])

  return (
    <div className="main2">
      <Slider>
        {users.map(user => (
          <img src={user.urls.regular} key={user.id}  />
        ))}
      </Slider>
    </div>
      
  );
}

export default Banner;