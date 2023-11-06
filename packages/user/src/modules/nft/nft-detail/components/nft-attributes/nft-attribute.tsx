export type NFTAttributeProps = {
  name: string;
  value: string;
};

export const NFTAttribute = ({ name, value }: NFTAttributeProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs text-gray-400">{name}</div>
      <div className="text-sm text-gray-800">{value}</div>
    </div>
  );
};
