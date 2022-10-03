import {BrowserRouter, Route, Routes} from "react-router-dom"
import StockDetailPage from "./Pages/StockDetailPage";
import StockOverviewPage from "./Pages/StockOverviewPage";
import ContextProvider from "./Context/ContextProvider";
import AboutPage from "./Pages/AboutPage";

function App() {

 

  return (
    <div>
      <ContextProvider>
      <div>
            <BrowserRouter>
              <Routes>
                <Route path="/StockTracker/" element={<StockOverviewPage/>}/>
                <Route path="StockTracker/detail/:symbol" element={<StockDetailPage/>}/>
                <Route path="StockTracker/about" element={<AboutPage/>}/>
              </Routes>
            </BrowserRouter>
      </div>
      </ContextProvider>
    </div>
  );
}

export default App;
