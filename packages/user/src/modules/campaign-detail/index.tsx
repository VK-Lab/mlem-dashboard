import Image from "next/image";
import { ListCampaigns } from "../list-campaigns";

export const CampaignDetail = () => {
    return (
        <div>
            <div>
                <h1>Week 8. Mode 🟡 First Dawn - DEX Week</h1>
                <div>
                This week we will explore the onchain functionality of Mode 🟡. Visit Dexilla and Kizuna dexes and make some testnet trades to finish this week’s campaign! All the onchain tasks might not be updated instantaneously, so you need to come back to claim for that task.
    Please note that the eighth week of the Galxe campaign will continue until October 2nd, 12:00 UTC.
                </div>
                <div>
                2023/09/27 21:00 - 2023/10/02 19:00 GMT+07:00
                </div>
                <div className="relative h-40 w-full">
                    <Image 
                        src="https://s3.ap-northeast-1.amazonaws.com/quest3.xyz/quest/811448470172901617.png" 
                        fill={true}
                        alt="Campaign Image"
                    />
                </div>
            </div>
            <div>
                <div>
                    Explore More
                </div>
                <ListCampaigns />
            </div>
        </div>
    );
}