import React, { useState } from "react";
import Selected from "../Components/common/SelectedComp";
import Account from "../Components/MyAccount/Myaccount";
import WishlistPage from "../Components/Wishlist/Wishlist";
import wishlistBanner from "../Components/Wishlist/Shared/Banner";
import Accountbanner from "../Components/MyAccount/shared/banner";

const SelectedComp = () => {
  const [selectedComponent, setSelectedComponent] = useState("Account");

  const handleSetSelectedComponent = (componentName) => {
    setSelectedComponent(componentName);
  };
  return (
    <>
      <main>
        {selectedComponent === "Favourite" && <wishlistBanner />}
        {selectedComponent === "Account" && <Accountbanner />}
        <div class="profile">
          <div class="container">
            <div class="row justify-content-between">
              {selectedComponent === "Favourite" && <WishlistPage />}
              {selectedComponent === "Account" && <Account />}

              <Selected setSelectedComponent={handleSetSelectedComponent} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SelectedComp;
