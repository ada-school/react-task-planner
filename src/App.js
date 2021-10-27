import { TaskList } from "./components/TaskList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import "./global.scss"
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Switch >

            <Route path="/" exact>
              <TaskList />
            </Route>
            <Route path="/tasks/:taskId">
              <TaskForm />
            </Route>
            <Route>
              <div>Not found</div>
            </Route>

      </Switch>
    </Router>
  );
}

export default App;
