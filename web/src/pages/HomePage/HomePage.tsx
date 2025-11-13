import React from "react";
import { Header } from "../../components/common/Header/Header";
import HeroPage from "../../components/home/heroPage";
import Deals from "../../components/home/Deals";
import NewArrivals from "../../components/home/NewArrivals";
import MainProduct from "../../components/home/MainProduct";
import SocialContacts from "../../components/home/SocialContacts";
import CustomerReview from "../../components/home/CustomerReview";
import Footer from "../../components/common/Footer/Footer";

export const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroPage
        title="ULTIMATE"
        subtitle="SALE"
        description="NEW COLLECTION"
        primaryButton={{ text: "SHOP NOW", url: "/shop-page" }}
      />
      <Deals />
      <NewArrivals />
      <MainProduct />
      <SocialContacts />
      <CustomerReview />
      <Footer />
    </div>
  );
};

export default HomePage;
