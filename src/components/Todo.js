import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Todo.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const handleOnSubmit = () => {
    if (!input) {
      alert("please fill data");
    } else if (input && !toggle) {
      setTodos(
        todos.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setToggle(true);
      setInput("");
      setIsEdit(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: input };
      setTodos([...todos, allInputData]);
      setInput("");
    }
  };
  const deleteItem = (def) => {
    const deleteTodo = todos.filter((elem) => {
      return def !== elem.id;
    });
    setTodos(deleteTodo);
  };
  const editItem = (id) => {
    let newEditItem = todos.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggle(false);
    setInput(newEditItem.name);
    setIsEdit(id);
  };
  const handleOnSubmitEdit = () => {};
  return (
    <>
      <main>
        <section className="glass">
          <Sidebar className="pro" />
          <div className="skills">
            <div className="status">
              <h1>TEEDO | Be Productive</h1>
              <input
                placeholder="Enter Tasks Here..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
                className="liner"
              />
              {toggle ? (
                <button onClick={handleOnSubmit} className="submit">
                  ADD
                </button>
              ) : (
                <button onClick={handleOnSubmit} className="submit">
                  EDIT
                </button>
              )}
            </div>
            <div className="cards">
              {todos.map((elem) => {
                return (
                  <div className="card">
                    <div className="card-info">
                      <h2 key={elem.id}>{elem.name}</h2>
                    </div>
                    <div className="pero">
                      <h3 className="percentage">
                        <FaEdit
                          title="Edit This Task"
                          onClick={() => {
                            editItem(elem.id);
                          }}
                        />
                      </h3>
                      <h3 className="percentage danger">
                        <AiOutlineDelete
                          title="Delete This Task"
                          onClick={() => deleteItem(elem.id)}
                        />
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </>
  );
};

export default Todo;
