import { useContext, useEffect, useState } from "react";
import finnhubClient from "../APIs/finnHub";
import { Context } from "../Context/ContextProvider";
import { BsFillCaretDownFill, BsCaretUpFill, BsTrash } from "react-icons/bs"
import { useNavigate } from "react-router";
import { Table } from "react-bootstrap";


export default function StockList() {
    // list containing all selected stock Symbols
    const { watchList, deleteStock, theme } = useContext(Context)

    //Used to route to detail page
    const navigate = useNavigate()

    // list containing corresponding stockData
    const [stocks, setStocks] = useState([])
    // Only call the API once every time the page is loaded
    useEffect(() => {
        let isMounted = true
        async function fetchData() {
            try {
                // Fetch responses for all stocks in the 
                // watchList simultaneously
                const responses =
                    await Promise.all(
                        watchList.map(stockSymbol => {
                            return finnhubClient.get("/quote", {
                                params: {
                                    symbol: stockSymbol
                                }
                            })
                        })

                    )
                // Only set data if component is actually in use
                if (isMounted) {
                    // Filter out all relevant 
                    // information from response
                    const data = responses.map((response) => {
                        return {
                            data: response.data,
                            symbol: response.config.params.symbol
                        }
                    })
                    setStocks(data)
                }
                console.log(responses)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        // Remove mount if component is closed
        return () => (isMounted = false)
    }, [watchList])

    function changeColor(d) {
        return (d > 0) ? "success" : "danger"
    }

    function changeCaret(d) {
        return (d > 0) ? <BsCaretUpFill /> : <BsFillCaretDownFill />
    }

    function handleStockSelect(stockName) {
        navigate(`detail/${stockName}`)
    }
    return (
        <Table hover striped variant={theme}
            className="mt-5 mb-5 rounded"
        >
            <thead style={{ color: "#006c66" }}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                    <th style={{ textAlign: "center" }} scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map(stock => {
                    return <tr
                        onClick={() => { handleStockSelect(stock.symbol) }}
                        key={stock.symbol}
                        style={{ cursor: "pointer" }}
                        className="table-row"
                    >
                        <td><b>{stock.symbol}</b></td>
                        <td>{stock.data.c.toFixed(2)}</td>
                        <td
                            className={`text-${changeColor(stock.data.d)}`}>
                            {stock.data.d.toFixed(2)}
                        </td>
                        <td
                            className={`text-${changeColor(stock.data.dp)}`}>
                            {stock.data.dp.toFixed(3)}
                            {changeCaret(stock.data.dp)}
                        </td>
                        <td>{stock.data.h.toFixed(2)}</td>
                        <td>{stock.data.l.toFixed(2)}</td>
                        <td>{stock.data.o.toFixed(2)}</td>
                        <td>{stock.data.pc.toFixed(2)}</td>
                        <td style={{ textAlign: "center" }}><button className="btn btn-sm btn-outline-danger m-0 "
                            style={{ margin: "auto" }}
                            onClick={(event) => {
                                event.stopPropagation()
                                deleteStock(stock.symbol)

                            }}>
                            <BsTrash />
                        </button></td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
} 