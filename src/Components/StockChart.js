import Chart from "react-apexcharts"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../Context/ContextProvider"
export default function StockChart({chartData, symbol}) {
    const {theme} = useContext(Context)
    let textColor = (theme === "dark") ? "white" : "black"
    const {day, week, year} = chartData
    const [dateFormat, setDateFormat] = useState("24h")
    const options = {
        colors: [getColor()],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            },
            foreColor: textColor 
        },
        xaxis: {
            type: "datetime",
            labels: {
                dateTimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "dd MMM HH:MM"
            }
        },
        grid: {
            padding: {
                left: 30,
                right: 30
            }
        }
    }

    const series = [{
       name: symbol,
       data: getFormat()
    }]

    function getFormat() {
        switch(dateFormat) {
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day            
        }
    }


    function getColor() {
        let currentFormat = getFormat()
        if(currentFormat) {
            let values = currentFormat.map(item => {
                return item.y
            })
            return (values[0] < values[values.length - 1] ? "#008000" : "#FF0000")
        }
    }

    return <div className={`row border bg-${theme} rounded mb-3 shadow-sm p-4 mt-3`}>
        <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
        />
        <div className="btn-toolbar" role="toolbar">
            <div className="btn-group btn-group toggle" style={{width: "30%"}} data-toggle="buttons">
                <button className={`btn btn-outline-success ${dateFormat === "24h" && "active"}`} onClick={() => setDateFormat("24h")}>24h</button>
                <button className={`btn btn-outline-success ${dateFormat === "7d" && "active"}`} onClick={() => setDateFormat("7d")}>7D</button>
                <button className={`btn btn-outline-success ${dateFormat === "1y" && "active"}`} onClick={() => setDateFormat("1y")}>1Y</button>
            </div>
        </div>
    </div>
}