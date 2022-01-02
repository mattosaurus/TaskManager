import React from 'react';
import Row from 'react-bootstrap/Row';
import Task from './Task';
import { useDrop } from 'react-dnd'

const TaskList = ({ tasks, handleUpdate, status }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'TASK',
        // Props to collect
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        }),
        drop: (task) => {
            task.status = status;
            handleUpdate(task)
        }
      }))

    return (
        <Row
            ref={drop}
            role={'Dustbin'}
            style={{ backgroundColor: isOver ? 'red' : 'white' }}
            className="h-100"
            >
            {tasks &&
                tasks.map((task) => (
                    <Task task={task}/>
                ))
            }
        </Row>
    );
}

export default TaskList;