const LogoDisplay = ({ logoSrc }) => (
  <div className="rounded-sm flex items-center justify-center">
    <div className="rounded-md flex h-12 w-12 border items-center justify-center shadow-sm">
      <img className="h-8" src={logoSrc} alt="Fibonacci" />
    </div>
  </div>
);

export default LogoDisplay;
