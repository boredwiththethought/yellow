import React from "react";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import Newsletter from "../../components/common/Newsletter/Newsletter";

interface MainLayoutProps {
  children: React.ReactNode;
  showNewsletter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showNewsletter = true }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>

      {showNewsletter && <Newsletter />}

      <Footer />
    </div>
  );
};

export default MainLayout;
