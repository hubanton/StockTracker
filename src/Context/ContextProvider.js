import { createContext, useEffect, useState} from "react";

// Enables information regarding the current list of Stocks 
// to be passed down to every component that requires it
export const Context = createContext()


export default function ContextProvider(props) {
    // The current list of Stocks to be displayed
    // If local storage is empty, then a selection
    // of default values is used


    const [watchList, setWatchList] = 
    useState(
        localStorage.getItem("watchList")
        ? localStorage.getItem("watchList").split(",") 
        : ['TSLA', 'GOOGL', 'PINS', 'AAPL', 'MSFT']   
    )

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
    console.log(theme)

    // Update local storage when the list is altered    
    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])


    function changeTheme() {
      if(theme === "light") {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    }

    useEffect(() => {
        switch (theme) {
          case "light":
            document.body.classList.add('light');
            document.body.classList.remove('dark');
            break;
          case "dark":
            document.body.classList.add('dark');
            document.body.classList.remove('light');
            break;
          default:
            break;
        }
        localStorage.setItem("theme", theme)
      }, [theme]);
    


    console.log(watchList)
    // Update local storage when the list is altered    
    useEffect(() => {
        localStorage.setItem("watchList", watchList)
    }, [watchList])


    function addStock(stock) {
        if(watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }
    
    function deleteStock(stock) {
        setWatchList(watchList.filter((el) =>  {
            return el !== stock
        }))
    }

    // The information to be passed down to all Children   
    return <Context.Provider 
    value={{
        watchList, addStock, deleteStock, theme, changeTheme
    }}>
        {props.children}
    </Context.Provider>
}
