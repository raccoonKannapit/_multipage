import { useState, useEffect, useRef } from "react";
import { fetchTodos } from "../../datas/todos";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

import "./Todo.css";

const initItemsPerPage = 10;
const initOnlyWaiting = false;

function Todo() {
  // todosRaw -> filters -> todos -> display
  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(0);

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();
  const newIdRef = useRef();
  const newTitleRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setOnlyWaiting(initOnlyWaiting);
    itemsPerPageRef.current.value = initItemsPerPage;
    setItemsPerPage(initItemsPerPage);
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(
        todosRaw.filter((todo) => {
          return !todo.completed;
        })
      );
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage === 0) setCurPage(1);
    else if (curPage > numPages) setCurPage(numPages);
  }, [numPages]);

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }

  function waitClick(id) {
    const todoRawSelected = todosRaw.find((todo) => todo.id === id);
    todoRawSelected.completed = true;
    setTodosRaw([...todosRaw]); // force update
  }

  const addClick = (id, title) => {
    setTodosRaw([...todosRaw, { userId: 1, id: id, title: title, completed: false }]);
  }

  // handle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="todo-container">
      {/* modal */}
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            <button className="btn btn-primary">
            <span className="bi bi-plus"></span></button>&nbsp;Add new Todo
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="number"
                // placeholder="name@example.com"
                autoFocus
                value={Number(todosRaw.reduce( (prev, todo) => {return prev < todo.id ? todo.id : prev}, 0)) + 1 }
                disabled
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Title:</Form.Label>
              <Form.Control as="textarea" rows={1} 
              ref={newTitleRef}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={ () => {
            const id = newIdRef.current.value;
            const title = newTitleRef.current.value;
            addClick(id, title)
            handleClose()
            }}>
            Add
          </Button>
        </Modal.Footer>

      </Modal>
      {/* --------------------------------------------------------------------------------------------- */}

      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
            ref={onlyWaitingRef}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;
            <button className="btn btn-warning">
              waiting&nbsp;<span className="bi bi-clock"></span>
            </button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped todo-table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ textAlign: "right" }}>
              Completed &nbsp;{" "}
              <button className="btn btn-primary" onClick={handleShow}>
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // itemsPerPage = 5
            // curPage = 1
            // item = 0...4
            // item = min...max
            // min = curPage - 1 * itemsPerPage
            // max = (curPage * itemsPerPage) - 1
            // item < curPage * itemsPerPage

            todos
              .filter((todo, index) => {
                const min = (curPage - 1) * itemsPerPage;
                const max = curPage * itemsPerPage - 1;
                return index >= min && index <= max;
              })
              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td>
                      <span
                        className="badge bg-secondary"
                        style={{ width: "3rem" }}
                      >
                        {todo.id}
                      </span>
                    </td>
                    <td style={{ textAlign: "left" }}>{todo.title}</td>
                    <td style={{ textAlign: "right" }}>
                      {todo.completed ? (
                        <span className="badge bg-success">
                          done&nbsp;
                          <span className="bi bi-check"></span>
                        </span>
                      ) : (
                        <button
                          className="btn btn-warning"
                          onClick={() => waitClick(todo.id)}
                        >
                          waiting&nbsp;
                          <span className="bi bi-clock"></span>
                        </button>
                      )}
                      {/* delete */}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteClick(todo.id)}
                      >
                        <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>

      {/* page control */}
      <div>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage <= 1}
        >
          First
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
