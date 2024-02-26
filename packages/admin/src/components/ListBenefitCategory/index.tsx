import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import AdmBenefitCategory from '@mlem-admin/modules/AdmBenefitCategory/AdminBenefitCategoryTable';

type ListBenefitCategoryProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > &
  Partial<{}>;

const ListBenefitCategory: React.FC<ListBenefitCategoryProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo />
          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <TabContentHeader />
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-full">
              <AdmBenefitCategory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListBenefitCategory.defaultProps = {};

export default ListBenefitCategory;
