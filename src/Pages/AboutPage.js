import { useContext } from "react"
import SiteHeader from "../Components/SiteHeader";
import { Context } from "../Context/ContextProvider";

export default function AboutPage() {

    const { theme } = useContext(Context)
    let textColor = (theme === "dark") ? "white" : "black"


    return <div>
        <SiteHeader />
        <div className="content">
            <div className={`row border bg-${theme} rounded mb-3 shadow-sm p-5 mt-3`} style={{ color: textColor }}>
                <h4 style={{ marginBottom: "30px" }}><b>This simple Stock Tracker was created as a means to explore the usage of API-Calls using React.js</b></h4>
                <h5>All Stock Data is derived from <a href="https://finnhub.io/" rel="noopener noreferrer" target="_blank">finnhub.io</a></h5>
                <h5>API-Calls are performed with the help of <a href="https://axios-http.com/docs/intro" rel="noopener noreferrer" target="_blank">Axios</a></h5>
                <h5>General styling and the header-icon is provided by the <a href="https://getbootstrap.com/docs/5.2/getting-started/introduction/" rel="noopener noreferrer" target="_blank">Bootstrap Toolkit</a></h5>
                <h5>Charts are created with the help of <a href="https://apexcharts.com/docs/react-charts/" rel="noopener noreferrer" target="_blank">ApexCharts</a></h5>

            </div>
        </div>
    </div>
}