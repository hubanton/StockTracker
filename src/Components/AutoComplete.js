import { useState, useEffect, useContext } from "react"
import finnHub from "../APIs/finnHub"
import { Context } from "../Context/ContextProvider"
import { Dropdown, FloatingLabel, Form} from "react-bootstrap"
export default function AutoComplete() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const { addStock } = useContext(Context)


    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                if (isMounted) {
                    // Basically avoids providing any Stock that is not from US Markets
                    const filteredResults = response.data.result.filter(e => e.symbol.indexOf(".") === -1)
                    setResults(filteredResults)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (search.length > 0) {
            fetchData()
        } else {
            setResults([])
        }
        return () => { isMounted = false }
    }, [search])

    function adjustSearch(event) {
        setSearch(event.target.value)
    }

    function renderDropdown() {
        const dropDownClass = search && "show"
        console.log(results[0])
        return (
            <Dropdown.Menu
                style={{height: "500px",
                overflowY: "scroll", 
                overflowX: "hidden",
                cursor: "pointer",}}
                show={dropDownClass}
            >
                {results.map(result => {
                    return <Dropdown.Item
                        key={result.symbol}
                        onClick={() => {
                            addStock(result.symbol)
                            setSearch("")
                        }}
                    >
                        {result.description} ({result.symbol})
                    </Dropdown.Item>
                })}
            </Dropdown.Menu>
        )
    }

    return (
        <Form className="rounded mx-auto mt-5 p-4 w-50">
            <FloatingLabel label="Search Stock">
                <Form.Control
                    type="text"
                    placeholder="Search Stock"
                    id="search"
                    autoComplete="off"
                    className="form-floating"
                    value={search}
                    onChange={adjustSearch}
                />
            </FloatingLabel>
            {renderDropdown()}
        </Form>


    )
}