import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item";
import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import "./style.css";
import FavouriteItem from "../../components/favourite-item";
import { ThemeContext } from "../../App";

const reducer = (state,action)=>{
    switch (action.type) {
        case 'filterFavourites':
            console.log(action);
           return {
            ...state,
            filteredValue: action.value
           };
    
        default:
            return state;
    }
}

const initialState = {
    filteredValue : ''
}

const Homepage = () => {

    // States to load data, recipes, favourites & check api call status
    const [loadingState, setLoadingState] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [apiCallSuccess, setApiCallSuccess] = useState(false);

    const [filteredState, dispatch] = useReducer(reducer, initialState);
    // States to load data, recipes, favourites & check api call status

    const getDataFromSearchComponent = (getData) => {
        setLoadingState(true);
        console.log(getData, 'recipe');

    // API calling
        async function getRecipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a0a0a0432ec841b3bcc42408a4ffbb92&query=${getData}`)
            const result = await apiResponse.json();
            const { results } = result;

            if (results && results.length > 0) {
                setLoadingState(false);
                setRecipes(results);
                setApiCallSuccess(true);
            }
            console.log(result);
        }

        getRecipes();
    };
    console.log(loadingState, recipes, 'Loading recipes');

    // Adding Items to Favourites
const addToFavourites = useCallback((currentRecipeItem)=>{
    console.log(currentRecipeItem);
        let cpyFavourites = [...favourites];

        const index = cpyFavourites.findIndex(item => item.id === currentRecipeItem.id);
        console.log(index);
        if(index === -1)
        {
            cpyFavourites.push(currentRecipeItem);
            setFavourites(cpyFavourites);
            // Local storage
            localStorage.setItem('Favourites',JSON.stringify(cpyFavourites))
        }
        else{alert('Item is already present in favourites')}
}, [favourites])

    // const addToFavourites = (currentRecipeItem) => {
    //     console.log(currentRecipeItem);
    //     let cpyFavourites = [...favourites];

    //     const index = cpyFavourites.findIndex(item => item.id === currentRecipeItem.id);
    //     console.log(index);
    //     if(index === -1)
    //     {
    //         cpyFavourites.push(currentRecipeItem);
    //         setFavourites(cpyFavourites);
    //         // Local storage
    //         localStorage.setItem('Favourites',JSON.stringify(cpyFavourites))
    //     }
    //     else{alert('Item is already present in favourites')}
    // };

    useEffect(()=>{
        const extractFavourites = JSON.parse(localStorage.getItem('Favourites'));
        setFavourites(extractFavourites);
    },[])
    console.log(filteredState);

    // Removing Items from Favourites
    const removeFromFavourites = (currentRecipeItem)=>{
        let cpyFavourites = [...favourites];
        cpyFavourites = cpyFavourites.filter(item => item.id !== currentRecipeItem);
        setFavourites(cpyFavourites);

        localStorage.setItem('Favourites', JSON.stringify(cpyFavourites));
        window.scrollTo({top: "0", behavior: "smooth"})
    }

    // Filtering Favourites
    const filteredFavouriteItems = favourites.filter((item)=>
        item.title.toLowerCase().includes(filteredState.filteredValue)
    )

    const {theme} = useContext(ThemeContext)

    const renderRecipes = useCallback(()=>{
        if(recipes && recipes.length > 0){
            return(
                recipes.map(item => 
                    <RecipeItem 
                        addToFavourites={()=>addToFavourites(item)} 
                        id={item.id} 
                        image={item.image} 
                        title={item.title} />)
            )
        }
    }, [recipes, addToFavourites])

    return (
        <div style={theme? {backgroundColor:"#2e2d2d", height:"100vh"}:{}} className="Homepage">
            <div style={theme? {position: "sticky", top: 0}:{}} className="navbar">
                <div className="searchBar">
            <div className="app-title" style={theme? {color:"white"}:{}}>Food Store App</div>
                <Search
                    getDataFrom={getDataFromSearchComponent}
                    apiCallSuccess = {apiCallSuccess}
                    setApiCallSuccess = {setApiCallSuccess}
                />
                </div>
                <div className="search-fav">
                    <input style={theme? {backgroundColor:"#52504e"}:{}}
                    onChange={(event)=>dispatch({type:"filterFavourites", value: event.target.value})}
                    value={filteredState.filteredValue}
                    placeholder="Search Favorites" />
                </div>
                
            </div>
            <p style={theme? {color:"white"}:{}} className="favourites-title">Favourites</p>
            <div className="favourites-wrapper">
                
                {
                filteredFavouriteItems && filteredFavouriteItems.length > 0 ?
                    filteredFavouriteItems.map(item => 
                        <FavouriteItem 
                            removeFromFavourites ={()=>removeFromFavourites(item.id)}
                            id={item.id} 
                            image={item.image} 
                            title={item.title} />) : null
                }
                {
                    !filteredFavouriteItems.length && <div style={theme? {color:"white"}:{}} className="no-recipes">No Favourites Found. Please check the typo.</div>
                }
            </div>
            {/* showing favourites */}

            {/* showing Loading Page */}
            {
                loadingState && <div style={theme? {color:"white"}:{}} className="loading">Loading Recipe! Please wait...</div>
            }
            {/* showing Loading Page */}

            {/* Mapping through all recipes */}

            <div style={theme? {backgroundColor:"#2e2d2d"}:{}} className="items">
                {
                    renderRecipes()
                    // recipes.map(item => 
                    //     <RecipeItem 
                    //         addToFavourites={()=>addToFavourites(item)} 
                    //         id={item.id} 
                    //         image={item.image} 
                    //         title={item.title} />) : null
                }
                {
                    !loadingState && !recipes.length && <div style={theme? {color:"white"}:{}} className="no-items">Search to fetch the Recipes...</div>
                }
                
            </div>
            {/* Mapping through all recipes */}
            <div className="footer">
                <p style={{float:"left", clear:"both", textAlign:"center", margin:"0px 0px 0px 60px"}}>P.E.</p>
                <p><ul style={{margin:"0px 40px 0px 0px"}} className="footer-list">
                    <li><i class="bi bi-facebook"></i></li>
                    <li><i class="bi bi-instagram"></i></li>
                    <li><a href="https://github.com/Priyanshu-Ekal"><i class="bi bi-github"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/dktepriyanshuekal"><i class="bi bi-linkedin"></i></a></li></ul></p>
            </div>
        </div>
    );
};

export default Homepage;