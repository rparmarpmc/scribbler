import React, { useState } from "react";
import PropTypes from "prop-types";
import eventBus from "../../event-bus";
window.eventBus = eventBus;

const MenuList = ({ items, handleMenuChange, activeLevel }) => {
    const [submenuOpened, setSubmenuOpened] = useState(null);
    const menuAction = (menuItem, index) => {
        if (menuItem.links) {
            handleMenuChange(index);
            if (index === submenuOpened) {
                setSubmenuOpened(null);
            } else {
                setSubmenuOpened(activeLevel === 1 ? index : null);
            }
        } else {
            window.location.replace(menuItem.url);
        }
    };

    return (
        <ul className="first-level">
            {items.map((menuItem, index) => {
                return (
                    <li
                        className="first-level-item"
                        style={{
                            maxHeight:
                                index === submenuOpened ? "500px" : "35px",
                        }}
                        key={index}
                    >
                        <div
                            className="first-level-item-name"
                            onClick={() => menuAction(menuItem, index)}
                        >
                            {menuItem.title ? menuItem.title : null}
                            {menuItem.links && activeLevel === 0 && (
                                <svg
                                    width="54"
                                    viewBox="0 0 54 75"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M36.1431 34.0049L4.74177 8.29298C2.41941 6.38989 2.41941 3.31255 4.74177 1.42971C7.06414 -0.453132 10.8195 -0.453134 13.1418 1.42971L48.7185 30.5632C50.9667 32.4055 51.0161 35.3614 48.8914 37.2645L13.1665 66.6004C12.0053 67.5519 10.4736 68.0176 8.96651 68.0176C7.45944 68.0176 5.92767 67.5519 4.76648 66.6004C2.44412 64.6973 2.44412 61.62 4.76648 59.7371L36.1431 34.0049Z"
                                        fill="black"
                                    ></path>
                                </svg>
                            )}
                            {menuItem.links && activeLevel === 1 && (
                                <svg
                                    width="54"
                                    viewBox="0 0 54 75"
                                    fill="none"
                                    transform={
                                        index === submenuOpened
                                            ? "rotate(270)"
                                            : "rotate(90)"
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M36.1431 34.0049L4.74177 8.29298C2.41941 6.38989 2.41941 3.31255 4.74177 1.42971C7.06414 -0.453132 10.8195 -0.453134 13.1418 1.42971L48.7185 30.5632C50.9667 32.4055 51.0161 35.3614 48.8914 37.2645L13.1665 66.6004C12.0053 67.5519 10.4736 68.0176 8.96651 68.0176C7.45944 68.0176 5.92767 67.5519 4.76648 66.6004C2.44412 64.6973 2.44412 61.62 4.76648 59.7371L36.1431 34.0049Z"
                                        fill="black"
                                    ></path>
                                </svg>
                            )}
                        </div>
                        {menuItem.links && activeLevel === 1 && (
                            <ul className="first-level-item-submenu">
                                {menuItem.links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.url}>{link.title}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default MenuList;

MenuList.propTypes = {
    items: PropTypes.array.isRequired,
    handleMenuChange: PropTypes.func.isRequired,
    activeLevel: PropTypes.number.isRequired,
};
