import {useState} from "react";
import {useHistory, useParams} from "react-router";
import {tasks, useData} from "../providers/DataProvider";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";

export const TaskForm = () => {
    const history = useHistory();
    const {data, setData} = useData();
    const {taskId} = useParams();
    const task = data.tasks.find((task) => task.id === taskId);
    console.log(task,data.tasks)
    const [select, setSelect] = useState(task.status);
    const [text, setText] = useState(task?.name ?? "");

    if (!task) {
        return <div>Task not found</div>;
    }

    const handleChange = (e) => {
        const inputName = e.target.value;

        setText(inputName);
    };
    const handleTextChange = (event) => {
        console.log(event)
        const value = event.target.value;
        let newdata = data.tasks
        let modifiedData = newdata.map((item) => {
            return (item.id === taskId) ? {...item, [event.target.name]: event.target.value} : item;
        })


        //console.log(data)

        setData(() => ({...data, tasks: modifiedData}))
    }
    const handleSelect = (e) => {
        console.log(e, "select");
        setSelect(e)
        let newdata = data.tasks
        let modifiedData = newdata.map((item) => {

            return (item.id === taskId) ? {...item, status: e} : item;
        })
        console.log("entra a ese item", modifiedData)
        setData(() => ({...data, tasks: modifiedData}))
    }
    const handleChangeCheckbox = (task) => {
        //task.isCompleted = !task.isCompleted;
        //const completed= task.isCompleted
        let newdata = data.tasks
        //console.log(data)
        let modifiedData = newdata.map((item) => {
            return (item.id === taskId) ? {...item, isCompleted: !item.isCompleted} : item;
        })
        setData(() => ({...data, tasks: modifiedData}))
    }

    const handleSave = () => {
        const newTasks = data.tasks.map((task) => {
            if (task.id === taskId) {
                return {...task, name: text};
            }

            return task;
        });

        setData((prev) => ({...prev, tasks: newTasks}));

        history.goBack();
    };

    return (
        <Row className={"mt-5"}>
            <Col></Col>
            <Col className={"col-3"}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text"

                                      value={text} placeholder="Task Name" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={task.description} name={"description"}
                                      onChange={(event) => handleTextChange(event)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>assignedTo</Form.Label>
                        <Form.Control type="text" placeholder="Task Name" value={task.assignedTo} name={"assignedTo"}
                                      onChange={(event) => handleTextChange(event)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>dueDate</Form.Label>
                        <Form.Control type="text" placeholder="Task Name" value={task.dueDate} name={"dueDate"}
                                      onChange={(event) => handleTextChange(event)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Status</Form.Label>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                status {select}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={"TODO"}>TODO</Dropdown.Item>
                                <Dropdown.Item eventKey={"IN_PROGRESS"}>IN_PROGRESS</Dropdown.Item>
                                <Dropdown.Item eventKey={"REVIEW"}>REVIEW</Dropdown.Item>
                                <Dropdown.Item eventKey={"DONE"}>DONE</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    {/*<input type="checkbox" checked={task.isCompleted} onChange={() => handleChangeCheckbox(task)}/>
                   */}
                    <Form.Check
                        inline
                        label="Check Task"
                        name="group1"
                        type={"checkbox"}

                        checked={task.isCompleted} onChange={() => handleChangeCheckbox(task)}
                    />
                    <Button variant="primary" className={""} type="button" onClick={handleSave}>
                        Submit
                    </Button>
                </Form>

            </Col>
            <Col></Col>
        </Row>
    );
};