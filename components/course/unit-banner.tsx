type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="w-full rounded-2xl bg-trail p-5 text-white flex items-center justify-between shadow-[0_4px_0_0_#0a4a4a]">
      <div className="space-y-1.5">
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="text-white/85 text-sm">{description}</p>
      </div>
    </div>
  );
};
