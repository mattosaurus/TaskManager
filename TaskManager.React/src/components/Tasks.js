import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from './Tasks/TaskList';

import { useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([
        { name: "Learn React", id: 1, date: "2021-01-03 10:00", status: "Complete" },
        { name: "Profit", id: 2, date: "2021-01-05 10:00", status: "ToDo" },
    ]);

    const [statuses, setStatuses] = useState([
        "ToDo",
        "InProgress",
        "Complete",
        "Cancelled"
    ]);

    const handleUpdate = (task) => {
        var index = tasks.findIndex(x => x.id === task.id);
        const newTasks = [...tasks];
        newTasks[index] = task;
        setTasks(newTasks);
      }

    return (
        <div>
            <Button variant="primary">Primary</Button>
            <Row>
                {statuses.map((status) => (
                    <Col>
                        <h3>{status}</h3>
                        <TaskList tasks={ tasks.filter(task => {
                            return task.status === status
                        }) }
                        handleUpdate={handleUpdate} 
                        status={status}/>
                    </Col>
                ))};
            </Row>
            
        </div>
    );
}

export default Tasks;