import React, { useContext, useState } from "react";
import { ThemeContext } from "../../App";
import "./style.css";

const RecipeItem = (props)=>{
    const {id,image,title,addToFavourites} = props;
    const {theme} = useContext(ThemeContext);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
      };

    return(
        <div style={theme ? {backgroundColor:isHovering? "#333333":"#525252", borderColor:"transparent"}:{}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            key={id} className="itemName">
            <div className="recipeImage">
                <img src={image} alt="recipe image" />
            </div>
            <div>
                <p style={theme? {color:"white"}:{}}>{title}</p>
                <button onClick={addToFavourites} className="favouriteBtn">
                    Add To Favourites
                </button>
            </div>
        </div>
    );
};

export default RecipeItem;