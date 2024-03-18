import LayoutFooter from '@mlem-admin/components/LayoutFooter';
import LayoutHeader from '@mlem-admin/components/LayoutHeader';

export type Props = {
  children?: React.ReactNode;
};

const LayoutAdmin = ({ children }: Props) => {
  return (
    <>
      <div className="bg-black-900 flex flex-col font-lexend w-full">
        <div className="flex flex-col w-full">
          <div className="relative w-full">
            <div className="flex flex-col w-full">
              <LayoutHeader />
              <main className="flex flex-col w-full">{children}</main>
              <LayoutFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
