import React from 'react';
import { useDrag } from 'react-dnd'
import Card from 'react-bootstrap/Card';

const Task = ({ task }) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
        type: 'TASK',
            // The collect function utilizes a "monitor" instance (see the Overview for what this is)
            // to pull important pieces of state from the DnD system.
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1}} key={task.id}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{task.name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
}

export default Task;