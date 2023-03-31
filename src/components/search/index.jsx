import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import "./style.css";

const Search = (props)=>{
    console.log(props);
    const {getDataFrom, apiCallSuccess, setApiCallSuccess} = props;
    const {theme} = useContext(ThemeContext);

    const [inputValue, inputMethod] = useState(''); //Initial value

    const handleInputEvent = (event)=>{
        const {value} = event.target;
        inputMethod(value);    //set the updated value
    }   
    console.log(inputValue);

    const handleSubmit = (event)=>{
        event.preventDefault();
        getDataFrom(inputValue, '- data');
    }

    useEffect(()=>{
        if(apiCallSuccess)
        {
            inputMethod('')
            setApiCallSuccess(false)
        }
    },[apiCallSuccess, setApiCallSuccess])

    return(
        //form is required to call onSubmit method
        <form onSubmit={handleSubmit} className="Search"> 
            <input style={theme? {backgroundColor:"#52504e"}:{}} onChange={handleInputEvent} value={inputValue} id="search" placeholder="Search Recipe"/>
            <button style={theme? {backgroundColor:"#52504e",color:"white", borderColor:"transparent"}:{}} type="submit" className="searchBtn"><i class="bi bi-search"></i></button>
        </form>
    );
};

export default Search;