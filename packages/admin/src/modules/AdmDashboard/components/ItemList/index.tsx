import {useGetAllCampaigns} from '@mlem-admin/hooks/queries';
import {Campaign} from '@mlem-admin/types/campaign';

import {Img} from '@mlem-admin/components/Img';
import {Text} from '@mlem-admin/components/Text';

import ItemUpdate from '@mlem-admin/modules/AdmDashboard/components/ItemUpdate';

const ItemList = () => {
  const {data: {items = []} = {items: [], total: 0}, isLoading} =
    useGetAllCampaigns();

  return (
    <>
      {items.map((item: Campaign, indexItem) => {
        return (
          <>
            <div key={item.id}>
              <div className="bg-indigo-900_cc flex flex-1 flex-col gap-2.5 h-auto items-center justify-center p-4 m-1 rounded-lg w-full">
                <div className="flex gap-3 items-start justify-start w-full relative">
                  <ItemUpdate item={item} />
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="text-gray-600 text-sm w-auto truncate pr-8"
                      size="txtLexendSemiBold14Gray300"
                    >
                      {item.id}
                    </Text>
                    <Text
                      className="text-gray-100 text-sm w-auto truncate pr-8"
                      size="txtLexendSemiBold14Gray300"
                    >
                      {item.name}
                    </Text>
                  </div>
                </div>
                <Img
                  className="h-[150px] md:h-auto object-cover rounded w-full"
                  src={item.imageUrl ? item.imageUrl : '/v2/images/img_frame1321315620.png'}
                  alt={item.id}
                />
                <div className="flex flex-col items-start justify-start w-full">
                  {item.nftCollections && item.nftCollections.map((nftCollectionItem, indexCollection) => {
                    return (
                      <>
                        <div key={nftCollectionItem.id}>
                          <Text
                            className="bg-amber-500 px-2 py-0.5 rounded-sm text-[13px] m-1 text-black-900_01 w-auto"
                            size="txtLexendRegular8"
                          >
                            {nftCollectionItem.name}
                          </Text>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                  {item.benefits && item.benefits.map((nftBenefit, indexBenefit) => {
                    return (
                      <>
                        <div key={nftBenefit.id}>
                          <Text
                            className="bg-teal-A700 px-2 py-0.5 rounded-sm text-[13px] m-1 text-black-900_01 w-auto"
                            size="txtLexendRegular8"
                          >
                            {nftBenefit.name}
                          </Text>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ItemList;
