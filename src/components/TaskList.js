import {useState} from "react";
import {useData} from "../providers/DataProvider";
import {TaskItem} from "./TaskItem";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import "../global.scss"

export const TaskList = () => {
    const {data, setData} = useData();
    const [textValue, setTextValue] = useState("");

    const tasks = data.tasks;

    const handleTaskChange = (index) => () => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return {...task, isCompleted: !task.isCompleted};
            }

            return task;
        });

        setData((prev) => ({...prev, tasks: newTasks}));
    };

    const newTask = (name) => {
        const newTask = {
            id:toString(Math.floor(Math.random() * 100)),
            isCompleted: false,
            name: name,
            description:"",
            assignedTo:"",
            dueDate:"",
            status:"TODO"

        };
        setData((prev) => ({...prev, tasks: [...tasks, newTask]}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTextValue("");
        newTask(textValue);
    };

    const handleTextChange = (event) => {
        const value = event.target.value;
        setTextValue(value);
    };

    return (
        <article>

            <form onSubmit={handleSubmit}>
               {/* <input
                    value={textValue}
                    onChange={handleTextChange}
                    type="text"
                    placeholder="Task name"

                />*/}
                <Form.Control size="sm" type="text"  value={textValue}
                              onChange={handleTextChange}

                              placeholder="Task name" />
                <Button variant="warning" onClick={handleSubmit}>Create Task</Button>
                {/*<button onClick={handleSubmit}>Create Task</button>*/}
            </form>
            <Form >
                <Row xs={1} md={3} className="g-3">



                        {tasks.map((task, index) => {
                            return (
                                <Col>
                                    <Card className="mt-3" style={{width: '18rem'}}>
                                        <Card.Body>
                                            <TaskItem id={task.id}
                                                      isChecked={task.isCompleted}
                                                      taskName={task.name}
                                                      task={task}
                                                      onTaskChange={handleTaskChange(index)}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}

                </Row>
            </Form>

           {/* <ul>
                {tasks.map((task, index) => {
                    return (
                        <TaskItem
                            id={task.id}
                            isChecked={task.isCompleted}
                            taskName={task.name}
                            onTaskChange={handleTaskChange(index)}
                        />
                    );
                })}
            </ul>*/}
        </article>
    );
};
