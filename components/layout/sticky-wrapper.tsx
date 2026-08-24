export const StickyWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden lg:block w-80 sticky self-start top-6">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};
