const TopBar = () => {
  return (
    <div
      className="bg-background-light border-accent-dark-200/5 sticky top-0 z-20 h-16 w-full border-b"
      style={{
        boxShadow: "0px 1px 8px var(--color-accent-dark-300)",
        backdropFilter: "blur(50px)",
      }}
    >
      <div></div>
    </div>
  );
};

export default TopBar;
