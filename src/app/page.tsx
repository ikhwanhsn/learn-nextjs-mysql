"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  const handleAddOrUpdateItem = async () => {
    if (isEditing) {
      const res = await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editId,
          name: newItem.name,
          description: newItem.description,
        }),
      });
      if (res.ok) {
        alert("Item updated");
        setIsEditing(false);
        setEditId(null);
      }
    } else {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        alert("Item added");
      }
    }
    fetchItems();
    setNewItem({ name: "", description: "" });
  };

  const handleDeleteItem = async (id: number) => {
    const res = await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert("Item deleted");
    }
    fetchItems();
  };

  const handleEditItem = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setNewItem({ name: item.name, description: item.description });
  };

  return (
    <div>
      <h1>Items</h1>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        className="border p-2 rounded-md"
      />
      <br />
      <textarea
        placeholder="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
        className="border p-2 rounded-md"
      />
      <br />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleAddOrUpdateItem}
      >
        {isEditing ? "Update" : "Add"}
      </button>

      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button
              className="bg-orange-500 text-white p-2 rounded-md"
              onClick={() => handleEditItem(item)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
