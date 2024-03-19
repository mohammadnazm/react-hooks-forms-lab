// ShoppingList.js
import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterItems(event.target.value, items);
  };

  const handleSearchChange = (searchTerm) => {
    if (searchTerm === "") {
      filterItems(selectedCategory, items);
    } else {
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const filterItems = (category, items) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  const addItem = (newItem) => {
    setFilteredItems([...filteredItems, newItem]);
  };

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={addItem} />{" "}
      {/* Ensure that onAddItem is passed correctly */}
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
