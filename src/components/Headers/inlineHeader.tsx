type Props = {
  title?: string;
};

export const InlineHeader = ({ title }: Props) => {
  return <h3 className="font-Urbanist font-medium text-black">{title}</h3>;
};
