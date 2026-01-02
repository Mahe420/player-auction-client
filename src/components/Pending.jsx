import { useState } from "react";
import { useAuction } from "../context/AuctionContext"
import Modal from "./Modal";





export default function Pending() {
    const { firstPool, unsoldPool } = useAuction();
    const [selectedImg, setSelectedImg] = useState(null)

    const displayCards = (elements) => {

        return (
            <><div className="card-box">
                {elements.map((item) => (
                    <img src={item.img} key={item.id} style={{ width: '50px', height: 'auto', cursor: 'pointer' }} alt={item.name} onClick={() => setSelectedImg(item.img)} />
                ))}
            </div>
                <Modal visible={!!selectedImg} onClose={() => setSelectedImg(null)}>
                    <img src={selectedImg} style={{ width: '100%', height: 'auto' }} alt="Player" />
                </Modal>
            </>)
    }

    return firstPool.length > 0 ? displayCards(firstPool) : displayCards(unsoldPool);
}