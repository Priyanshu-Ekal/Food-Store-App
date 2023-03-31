import React, { useContext } from "react";
import "./style.css";
import ThemeButton from "../theme-buton";
import { ThemeContext } from "../../App";
import { useState } from "react";

const FavouriteItem = (props)=>{
    const {id,image,title,removeFromFavourites} = props;
    const {theme} = useContext(ThemeContext);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
      };
    return(
        <div style={theme ? {backgroundColor:isHovering? "#333333":"#525252",borderColor:"transparent"}:{}} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            key={id} className="favouriteItemName">
            <div className="favouriteRecipeImage">
                <img src={image} alt="recipe image" />
            </div>
            <p style={theme? {color:"white"}:{}}>{title}</p>
            <button className="favouriteBtn" onClick={removeFromFavourites}>Remove from Favourites</button>
        </div>
    );
};

export default FavouriteItem;