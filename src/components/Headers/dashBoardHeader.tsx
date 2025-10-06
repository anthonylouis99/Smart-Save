type Props = {
  title: string;
  content?: string;
  highlight?: string;
};

export const DashboardHeader = ({ title, content, highlight }: Props) => {
  return (
    <div className="block">
      <div className="sm:flex-auto">
        <p className=" text-2xl font-semibold leading-normal ">
          {title}
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          {content}{" "}
          {highlight ? (
            <span className="font-medium text-zinc-950">{highlight}</span>
          ) : null}{" "}
        </p>
      </div>
    </div>
  );
};
