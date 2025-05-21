import React, { useState } from "react";
import PropTypes from "prop-types";
import eventBus from "../../event-bus";
import MenuList from "./MenuList";
import "./DrawerMenu.css";
window.eventBus = eventBus;

const DrawerMenu = ({ data }) => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [activeLevel, setActiveLevel] = useState(0);
    const [firstLevel, setFirtsLevel] = useState(0);
    const [secondLevel, setSecondLevel] = useState(0);

    const handleCardTab = () => {
        setActiveTab("tab1");
        setActiveLevel(0);
    };

    const handleGiftTab = () => {
        setActiveTab("tab2");
        setActiveLevel(0);
    };

    const handleMenuChange = (item) => {
        if (activeLevel === 0) {
            setFirtsLevel(item);
        }
        if (activeLevel === 1) {
            setSecondLevel(item);
        }
        setActiveLevel(activeLevel === 0 ? 1 : 1);
    };

    const goBack = () => {
        setActiveLevel(activeLevel - 1);
    };

    const getItems = () => {
        const currentMenu =
            activeTab === "tab1" ? data.menu_cards : data.menu_gifts;

        if (activeLevel === 0) {
            return currentMenu;
        } else if (activeLevel === 1) {
            return currentMenu[firstLevel].links;
        } else if (activeLevel === 2) {
            return currentMenu[firstLevel].links[secondLevel].links;
        }
    };

    return (
        <>
            {activeLevel > 0 && (
                <button className="go-back" onClick={() => goBack()}>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 54 75"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M36.1431 34.0049L4.74177 8.29298C2.41941 6.38989 2.41941 3.31255 4.74177 1.42971C7.06414 -0.453132 10.8195 -0.453134 13.1418 1.42971L48.7185 30.5632C50.9667 32.4055 51.0161 35.3614 48.8914 37.2645L13.1665 66.6004C12.0053 67.5519 10.4736 68.0176 8.96651 68.0176C7.45944 68.0176 5.92767 67.5519 4.76648 66.6004C2.44412 64.6973 2.44412 61.62 4.76648 59.7371L36.1431 34.0049Z"
                            fill="#CBD81D"
                        ></path>
                    </svg>
                </button>
            )}
            <div className="tab">
                <a
                    href="#"
                    className={
                        activeTab === "tab1" ? " tablinks active" : "tablinks"
                    }
                    onClick={handleCardTab}
                >
                    Cards
                </a>
                <a
                    href="#"
                    className={
                        activeTab === "tab2" ? "tablinks active" : "tablinks"
                    }
                    onClick={handleGiftTab}
                >
                    Gifts
                </a>
            </div>
            <MenuList
                items={getItems()}
                activeLevel={activeLevel}
                handleMenuChange={handleMenuChange}
            />
        </>
    );
};

export default DrawerMenu;

DrawerMenu.propTypes = {
    data: PropTypes.object.isRequired,
};
