import MenuItem from "./menu-item";

export default function MenuList({ list = [] }) {
  return (
    <ul className="menu-list-container">
      {list && list.length
        ? list.map((listItem, index) => <MenuItem key={`${listItem.to}-${listItem.label}-${index}`} item={listItem} />)
        : null}
    </ul>
  );
}
