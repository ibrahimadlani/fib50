const PageTitle = ({ title, subtitle }) => (
  <>
    <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      {title}
    </h2>
    <p className="text-center text-sm text-gray-500">{subtitle}</p>
  </>
);

export default PageTitle;
