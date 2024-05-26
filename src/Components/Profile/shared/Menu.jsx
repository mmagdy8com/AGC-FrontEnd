import React from "react";

const Menu = ({ profileList, activeComponent, setActiveComponent }) => {
  return (
    <div className="col-xxl-3 col-4 d-none d-lg-block cursor-pointer">
      <div
        className="personal-information"
        data-aos="fade-left"
        data-aos-delay="2500"
        data-aos-duration="1000"
      >
        <ul className="d-flex flex-column">
          {profileList.map((data) => (
            <li
              className={activeComponent == data.key ? "active" : ""}
              onClick={() => setActiveComponent(data.key)}
            >
              <a className="d-flex align-items-center">
                <img src={data.image} />
                <span>{data.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
