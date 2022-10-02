import { useContext } from "react"
import { useEffect, useState } from "react"
import finnHub from "../APIs/finnHub"
import { Context } from "../Context/ContextProvider"

export default function StockData(props) {
    const [stockData, setStockData] = useState([])
    const {theme} = useContext(Context)
    let textColor = (theme === "dark") ? "white" : "black"
    try {
        useEffect(() => {
            let isMounted = true
            async function fetchData() {
                const response =
                    await finnHub.get('/stock/profile2', {
                        params : {
                            symbol: props.symbol
                        }
                    })
                    if(isMounted) {
                        setStockData(response.data) 
                    }   
            }
            fetchData()
            return () => {isMounted = false}
        }, [props.symbol])

    } catch(err) {
        console.log(err)
    }
    

    return <div className={`row border bg-${theme} rounded mb-3 shadow-sm p-2 mt-3`}
    style={{color: textColor, fontSize: "12px"}}
    
    >
        <div className="col">
            <div>
                <span className="fw-bold">Name: {stockData.name}</span>
            </div>
            <div>
                <span className="fw-bold">Country: {stockData.country}</span>
            </div>
            <div>
                <span className="fw-bold">Ticker: {stockData.ticker}</span>
            </div>
        </div>
        <div className="col">
            <div>
                <span className="fw-bold">Exchange: {stockData.exchange}</span>
            </div>
            <div>
                <span className="fw-bold">Industry: {stockData.finnhubIndustry}</span>
            </div>
            <div>
                <span className="fw-bold">IPO: {stockData.ipo}</span>
            </div>
        </div>
        <div className="col">
            <div>
                <span className="fw-bold">Market Cap: {(stockData.marketCapitalization / 1000).toFixed(2)} MM</span>
            </div>
            <div>
                <span className="fw-bold">Shares Outstanding: {stockData.shareOutstanding}</span>
            </div>
            <div>
                <span className="fw-bold">URL: <a style={{color : textColor}} href={stockData.weburl}>{stockData.weburl}</a></span>
            </div>
        </div>
    </div>
}