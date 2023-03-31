import { hover } from '@testing-library/user-event/dist/hover';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './style.css';

const ThemeButton = ()=>{

    const {theme,setTheme} = useContext(ThemeContext)
    console.log(theme, setTheme);

    return(
        <div className="theme-button-wrapper">
            <button style={theme ? {backgroundColor : "#191b1f"}:{}} onClick={()=> setTheme(!theme)} className="themeButton">
                <i style={theme? {color:"white"}:{}} class="bi bi-circle-half"></i>
            </button>
        </div>
    )
}

export default ThemeButton;