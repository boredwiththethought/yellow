import React from "react";
import { useEffect } from "react";
import { fetchFilters } from "../../api/filters";
import { Header } from "../../components/common/Header";
import MainProduct from "../../components/home/MainProduct";
import SocialContacts from "../../components/home/SocialContacts";
import Footer from "../../components/common/Footer/Footer";
import * as Cell from "../../components/shop/CellItem";

const ShopPage = () => {
  const [filters, setFilters] = React.useState<any>(null);

  useEffect(() => {
    fetchFilters().then(setFilters);
  }, []);

  React.useEffect(() => {
    if (filters) console.log("Фильтры с backend:", filters);
  }, [filters]);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[80px] flex w-full flex-col gap-[100px] px-4">
        <div className="flex flex-col items-center gap-5">
          <h1
            style={{ fontFamily: "Volkhov" }}
            className="text-center align-middle text-[42px] leading-[32px] font-normal tracking-normal capitalize"
          >
            Fashion
          </h1>
          <div className="flex items-center gap-3.5">
            <span
              style={{ fontFamily: "Jost" }}
              className="text-center align-middle text-[15px] leading-[22.5px] font-normal tracking-normal"
            >
              Home
            </span>
            <img src="../../../public/images/shop/SVG.svg" alt="" />
            <span
              style={{ fontFamily: "Jost" }}
              className="text-center align-middle text-[15px] leading-[22.5px] font-normal tracking-normal"
            >
              Fashion
            </span>
          </div>
        </div>
        <div className="flex">
          
        </div>
      </div>
      <MainProduct />
      <SocialContacts />
      <Footer />
    </>
  );
};

export default ShopPage;
