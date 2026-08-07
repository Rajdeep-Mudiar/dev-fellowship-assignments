import { useState } from "react";
import MenuList from "./menu-list";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function MenuItem({ item }) {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  function handleToggleChildren(getCurrenlabel) {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrenlabel]: !displayCurrentChildren[getCurrenlabel],
    });
  }
  return (
    <li>
      <div className="menu-item">
        <p>{item.label}</p>
        {item && item.children && item.children.length ? (
          <span onClick={() => handleToggleChildren(item.label)}>
            {displayCurrentChildren[item.label] ? (
              <FaMinus color="#4a90e2" size={20} />
            ) : (
              <FaPlus color="#4a90e2" size={20} />
            )}
          </span>
        ) : null}
      </div>

      {
        // Checking whether the item has children or not
        item &&
        item.children &&
        item.children.length > 0 &&
        displayCurrentChildren[item.label] ? (
          <MenuList list={item.children} />
        ) : null
      }
    </li>
  );
}
