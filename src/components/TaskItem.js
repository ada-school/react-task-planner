import {useHistory} from "react-router";
import {Button} from "react-bootstrap";

export const TaskItem = ({id, isChecked, taskName, onTaskChange, task}) => {
    const history = useHistory();

    const styleOfTheComponent = {
        textDecoration: isChecked ? "line-through" : "",
    };

    const handleClick = () => {
        const url = `/tasks/${id}`;
        history.push(url);
    };
    const statusStyle=()=>{
        if (task.status==='TODO'){
            return'todo-color'
        }
        else if(task.status==='IN_PROGRESS'){
            return  "in-progress-color"
        }
        else if(task.status === 'REVIEW'){
            return  "review-color"
        }
        else if(task.status === 'DONE'){
            return "done-color"
        }
        return " ";
    }

    return (

        <li>
            {console.log(task.status === 'REVIEW',task.status,task.status === 'TODO')}
            <input onChange={onTaskChange} checked={isChecked} type="checkbox"/>
            <strong className={"d-flex justify-content-center "} style={styleOfTheComponent}>{taskName}</strong>
            <br/>
            <span className={"d-flex justify-content-center "} style={styleOfTheComponent}>{task.description}</span>
            <br/>
            <span className={"d-flex justify-content-center "} style={styleOfTheComponent}>{task.dueDate}</span>
            <br/>
            <span className={"d-flex justify-content-center "} style={styleOfTheComponent}>{task.assignedTo}</span>
            <br/>
            <p><strong
                className={"d-flex justify-content-center  text-center "+statusStyle()}>{task.status}</strong>
            </p>
            <br/>
            <Button className={"d-flex justify-content-center text-center col-12 "} variant={"info"}
                    onClick={handleClick}>Edit</Button>
        </li>
    );
};
