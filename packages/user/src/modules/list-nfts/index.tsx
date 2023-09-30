import Link from "next/link"
import { NFTItem } from "./components/nft-item"

export const ListNFTs = () => {

    return (
        <div className="flex flex-wrap gap-4">
            {
                [1, 2, 3, 4, 5].map((item, index) => {
                    return <div key={index}>
                       <Link href="/my-nfts/asd">
                            <NFTItem />
                       </Link>
                    </div>
                })
            }
        </div>
    )
}