import Image from 'next/image';
import { NFTAsset } from './components/NFTAsset';

const ADDITIONAL_INFORMATIONS = [
    {
        title: 'Contract Address',
        key: 'contractAddress',
    },
    {
        title: 'Token ID',
        key: 'tokenId',
    },
    {
        title: 'Token Standard',
        key: 'tokenStandard',
    },
    {
        titlle: 'Token Type',
        key: 'tokenType',
    },
    {
        title: 'Tier',
        key: 'tier',
    }
]

export const NFTDetail = () => {
    return (
        <div className="flex flex-wrap gap-4">
            <div>
                <NFTAsset />
            </div>
           <div>
                <div>
                    NFT Name
                </div>
                <div>
                    NFT Description
                </div>
                <div>
                    Benefits
                </div>
                <div>
                    Addition Information
                    <div>
                        {
                            ADDITIONAL_INFORMATIONS.map((item, index) => {
                                return (
                                    <div className="flex" key={index}>
                                        <div>
                                            {item.title}
                                        </div>
                                        <div>
                                            {item.key}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
           </div>
        </div>
    )
}