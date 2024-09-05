import { useState } from "react";
import "./App.css";
const initialItems = [
  {
    id: 1,
    name: "Milk",
    quantity: 2,
    purchased: false,
  },
  {
    id: 2,
    name: "Bread",
    quantity: 1,
    purchased: false,
  },
  {
    id: 3,
    name: "Eggs",
    quantity: 12,
    purchased: false,
  },
];
function App() {
  const fruits = initialItems;
  const [Item, setItem] = useState(fruits);
  return (
    <div className="app">
      <ItemList fruits={Item} addItem={setItem} />
      <FormAddItem addItem={setItem} />
    </div>
  );
}
export default App;

function ItemList({ fruits, addItem }) {
  const handleTogglePurchased = (id) => {
    addItem(
      fruits.map((fruit) =>
        fruit.id === id ? { ...fruit, purchased: !fruit.purchased } : fruit
      )
    );
  };
  return (
    <ul>
      {fruits.map((fruit) => (
        <Item
          fruit={fruit}
          key={fruit.id}
          handleTogglePurchased={() => handleTogglePurchased(fruit.id)}
        />
      ))}
    </ul>
  );
}
function FormAddItem({ addItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: name,
      quantity: quantity,
      purchased: false,
    };
    addItem((item) => [...item, newItem]);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Add your Item</button>
    </form>
  );
}
function Item({ fruit, handleTogglePurchased }) {
  return (
    <li className={fruit.purchased ? "purchased" : ""}>
      <p>
        {fruit.name}(x{fruit.quantity})
      </p>
      <button onClick={handleTogglePurchased}>
        {fruit.purchased ? "Undo" : "Mark as Purchased"}
      </button>
    </li>
  );
}
