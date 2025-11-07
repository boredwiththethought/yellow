import React from "react";
import HeaderHome from "../../components/common/Header/HeaderHome"; 
import FooterHome from "../../components/common/Footer/FooterHome";
import HeroPage from "../../components/home/heroPage";
import Deals from "../../components/home/Deals";
import NewArrivals from "../../components/home/NewArrivals";
import "../../components/home/MainProduct";
import MainProduct from "../../components/home/MainProduct";
import SocialContacts from "../../components/home/SocialContacts";
import CustomerReview from "../../components/home/CustomerReview";

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderHome />
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
      <FooterHome />
    </div>
  );
};

export default HomePage;