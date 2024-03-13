import LayoutHeader from '@mlem-admin/components/LayoutHeader';
import LayoutFooter from '@mlem-admin/components/LayoutFooter';

export type Props = {
  children?: React.ReactNode;
};

const LayoutAdmin = ({children}: Props) => {
  return (
    <>
      <div className="bg-black-900 flex flex-col font-lexend items-start justify-end mx-auto w-full">
        <div className="flex flex-col items-center w-full">
          <div className="h-[1184px] sm:h-[1222px] md:h-[2313px] md:px-5 relative w-full">
            <div className="bg-black-900 absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[0] w-auto md:w-full">
              <LayoutHeader/>
              <main className="w-[100%] max-w-[1440px]">{children}</main>
              <LayoutFooter/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
