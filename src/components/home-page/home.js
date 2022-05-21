import { NavigationBar } from "../navigationBar/navigationBar";
import { Header } from "./header/header";
import { Mission } from "./mission/mission";
import { Categories } from "./categories/categories";
import { ContactForm } from "./contact-form/contactForm";
import { Footer } from "../products/footer/footer";
import { useEffect, useContext } from "react";
import { ProductContext } from "../../context/productsState";
import { UserContext } from "../../context/userState";

export const HomePage = () => {
  const { saveCurrentFilters, getProducts } = useContext(ProductContext);
  const { resetError } = useContext(UserContext);

  useEffect(() => {
    getProducts();
    saveCurrentFilters("All Products", "", "All Brands");
    resetError();
    localStorage.setItem("perPage", 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <NavigationBar />
      <Header />
      <Mission />
      <Categories />
      <ContactForm />
      <Footer />
    </div>
  );
};
