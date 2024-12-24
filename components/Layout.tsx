import Sidebar from "./Sidebar";
type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="max-w-prose mx-auto px-4 h-screen bg-transparent">
          <main className="pt-4 pb-12">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
