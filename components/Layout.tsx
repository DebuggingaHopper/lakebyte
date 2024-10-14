import Header from "./Header";
import Sidebar from "./Sidebar";
type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div className="max-w-prose mx-auto px-4 sticky top-0 backdrop-blur-sm">
        <Header />
      </div>
      <div className="flex justify-start">
        <div className="h-screen sticky top-0">
        <Sidebar></Sidebar>
        </div>
        <div className=" max-w-prose mx-auto px-4 h-screen bg-transparent">
          <main className="pt-4 pb-12">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
