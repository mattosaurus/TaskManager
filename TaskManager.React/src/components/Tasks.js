import React, { useState, useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from './Tasks/TaskList';
import NewTaskModal from './Tasks/NewTaskModal';
import axios from 'axios';
import { apiConfig } from "../config/apiConfig";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = useCallback(() => {
        axios.get(apiConfig.baseUrl + apiConfig.taskEndpoint)
            .then((response) => setTasks(response.data));
    }, []);

    const createTask = useCallback((task) => {
        axios.post(apiConfig.baseUrl + apiConfig.taskEndpoint, task)
            .then(() => getTasks());
    }, [getTasks]);

    const updateTask = useCallback((task) => {
        axios.put(apiConfig.baseUrl + apiConfig.taskEndpoint, task)
            .then(() => getTasks());
    }, [getTasks]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    const [statuses, setStatuses] = useState([
        "ToDo",
        "InProgress",
        "Complete",
        "Cancelled"
    ]);

    const [modalShow, setModalShow] = useState(false);

    const handleUpdateTask = (task) => {
        updateTask(task);
      }

    const handleAddTask = (task) => {
        createTask(task);
        setModalShow(false);
    }

    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>Primary</Button>
            <Row>
                {statuses.map((status) => (
                    <Col>
                        <h3>{status}</h3>
                        {tasks !== undefined && tasks.length > 0 &&
                            <TaskList tasks={ tasks.filter(task => {
                                return task.status === status
                            }) }
                            handleUpdate={handleUpdateTask} 
                            status={status}/>
                        }
                    </Col>
                ))};
            </Row>
            <NewTaskModal
                show={modalShow}
                onHide={() => setModalShow(false)} 
                handleAddTask={handleAddTask} />
        </div>
    );
}

export default Tasks;