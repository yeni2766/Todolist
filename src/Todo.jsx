import { useState } from "react";

export default function Todo() {
  const [text, setText] = useState("");
  const [lists, addList] = useState([]);

  const addItem = () => {
    if (text.trim() === "") {
      alert("Please enter text");
    } else {
      // add a new todo object
      addList([...lists, { text: text.trim(), completed: false }]);
      setText("");
    }
  };

  function deleteItem(index) {
    const updatedList = lists.filter((item, i) => i !== index);
    addList(updatedList);
  }

  function toggleCompleted(index) {
    const updated = lists.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    addList(updated);
  }

  return (
    <div className="flex flex-col justify-center items-center bg-yellow-500 h-screen w-full">
      <h1 className="text-2xl font-bold my-8">My Todo List</h1>

      {lists.length === 0 ? (
        <p className="text-gray-600 italic">No items yet...</p>
      ) : (
        <ul className="space-y-2">
          {lists.map((item, index) => (
            <li
              key={index}
              className="flex items-center"
            >
              <span
                onClick={() => toggleCompleted(index)}
                className={`cursor-pointer ${
                  item.completed ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {item.text}
              </span>

              <button
                className="text-red-600 mx-4"
                onClick={() => deleteItem(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="my-6">You Typed: {text || "____"}</p>

      <input
        type="text"
        className="border-2 border-white rounded-2xl mb-5 px-3 py-1"
        placeholder="Type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="bg-black w-[100px] h-[30px] text-white text-sm rounded-sm"
        onClick={addItem}
      >
        Add List
      </button>
    </div>
  );
}