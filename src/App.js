import React, { createContext, useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import ThemeButton from "./components/theme-buton";

/*JSX --> Javascript XML --> Writing HTML in React
createElement(HTML elements, properties{classname, id, etc.}, children/body)*/

// create the context
// provide the context
// consume the context

export const ThemeContext = createContext(null);

function App() {    /*Here, App is a component which holds the arrow function ... /You can use direct function name starting with function keyword*/

  const [theme, setTheme] = useState(false)
  return ( 
    <ThemeContext.Provider value={{theme, setTheme,}}>
      <h1 className="App">
        <ThemeButton/>
        <Homepage/>
      </h1>
    </ThemeContext.Provider>              
  )
}

export default App;  //Exporting the component is IMPORTANT with default keyword
