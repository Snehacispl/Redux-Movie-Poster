import React from "react";
import Slider from "react-touch-drag-slider";

import images from "./images";

// Whatever you render out in the Slider will be draggable 'slides'
function Slides() {
  return (
    <div className="main2">
      <Slider>
        {images.map(({ url, title }, index) => (
          <img src={url} key={index} alt={title} />
        ))}
      </Slider>
    </div>
  );
}
 {/* <div>
        {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
       
      )}  
     </div>
    */}
export default Slides;
