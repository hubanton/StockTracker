import StockList from "../Components/StockList"
import AutoComplete from "../Components/AutoComplete"
import SiteHeader from "../Components/SiteHeader"
export default function StockOverviewPage() {
    return <div>
        <SiteHeader />
        <div className="content">
        <AutoComplete/>
        <StockList/>

        </div>
    </div>
}