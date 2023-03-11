import React, { useEffect, useState } from 'react';
import Draggable from "react-draggable";
const Task = () => {


    // tasks container to hold given tasks
    const [tasks, settasks] = useState([]);
    const addNewTask = () => {
        var newTasks = [...tasks];
        newTasks.push({ name: "", video: "" })
        settasks(newTasks);
    }


    return (
        <div>

            <div className='cards_container'>
                {tasks.map((o) => {
                    return (
                        <Draggable>
                            <div className='card_style'>
                                <div>
                                    name:<input placeholder={o.name} onChange={(e) => { o.name = e.target.value }}></input>
                                </div>
                                <div>
                                    video link:<input placeholder={o.video} onChange={(e) => { o.video = e.target.value }}></input>
                                </div>

                            </div>

                        </Draggable>
                    )
                })}
            </div>

        </div>
    );
}

export default Task;
