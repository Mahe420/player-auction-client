import PlayerCard from "./PlayerCard";
import SoldHistory from "./SoldHistory";
import TeamBoard from "./TeamBoard";
import TeamSetup from "./TeamSetup";


export default function  Home() {
    return (
            <div className="layout">
                <div className="left">
                    <PlayerCard />
                    <SoldHistory />
                </div>
                <div className="right">
                    <TeamSetup />
                    <TeamBoard />
                </div>
            </div>
    )
}