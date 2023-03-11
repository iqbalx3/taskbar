import React, { useEffect, useState } from 'react';
import Draggable from "react-draggable";
const Container = () => {
    const [newContainer, setnewContainer] = useState("");
    const [containers, setcontainers] = useState([]);
    const [name, setname] = useState("");
    const [videolink, setvideolink] = useState("");
    const [iframelink, setiframelink] = useState("");
    const [currentCard, setcurrentCard] = useState("");

    const [setOfLinks, setSetOfLinks] = useState([]);

    useEffect(() => {
        if (iframelink) {
            var linkhistory = [...setOfLinks]
            var today = new Date()
            linkhistory.push({ "card": currentCard, "link": iframelink, "time": today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() })
            setSetOfLinks(linkhistory)
            localStorage.setItem("linkhistory", JSON.stringify(setOfLinks))

        }
    }, [iframelink]);


    // console.log("history of playlist", setOfLinks)
    useEffect(() => {
        if (containers?.length > 0)
            localStorage.setItem("containers", JSON.stringify(containers))
        else if (JSON.parse(localStorage.getItem("containers"))) {
            setcontainers(JSON.parse(localStorage.getItem("containers")))

        }
    }, [containers]);



    const setStreamingVideo = (name, videolink) => {
        setcurrentCard(name)
        setiframelink(videolink)
    }

    const addNewContainer = (containerName) => {
        var newContainers = [...containers]
        newContainers.push({ name: containerName, tasks: [] })
        setcontainers(newContainers)
    }

    const addNewTask = (containerName, taskName, videoLink) => {
        var newContainers = [...containers]
        newContainers.map((container) => {
            if (container.name === containerName) {
                container.tasks.push({ name: taskName, video: videoLink, edit: false, })
            }
        })
        setcontainers(newContainers)
        // setname("")
        // setvideolink("")

    }

    const SetEditFunc = (selectedcontainer, selectedtask) => {
        var newcontainers = [...containers];
        newcontainers.map((container) => {
            if (container == selectedcontainer) {

                container.tasks && container.tasks.map((task) => {
                    if (task == selectedtask) {
                        task.edit = true
                    }
                })
            }
        })
        setcontainers(newcontainers)

    }

    const unSetEditFunc = (selectedcontainer, selectedtask) => {
        var newcontainers = [...containers];
        newcontainers.map((container) => {
            if (container == selectedcontainer) {

                container.tasks && container.tasks.map((task) => {
                    if (task == selectedtask) {
                        task.edit = false
                    }
                })
            }
        })
        setcontainers(newcontainers)
    }
    const DeleteTask = (selectedcontainer, selectedtask) => {
        var newcontainers = [...containers];
        newcontainers.map((container) => {
            if (container == selectedcontainer) {

                container.tasks = container.tasks.filter((task) => task != selectedtask)
            }
        })
        setcontainers(newcontainers)
    }

    // console.log(containers)
    return (
        <div>

            <input placeholder="Add New Container" onChange={(e) => { setnewContainer(e.target.value) }} className="container_name_input_field"></input>
            <button onClick={() => { addNewContainer(newContainer) }} >Add Container</button>

            <div className='set_of_containers'>
                {containers.map((o) => {
                    return (
                        <div className='container_style'>
                            {o.name}

                            <div className='card_style' style={{margin:"15px",backgroundColor:"white"}}>
                                <div>
                                    <input placeholder="enter name of card" onChange={(e) => { setname(e.target.value) }} ></input>
                                </div>
                                <div>
                                    <input placeholder="enter video link" onChange={(e) => { setvideolink(e.target.value) }}></input>
                                </div>

                            </div>
                            <button onClick={() => { addNewTask(o.name, name, videolink) }} >Add task</button>
                            {o.tasks.map((task) => {
                                return (
                                    <div className='cards_container'>
                                        <Draggable>
                                            <div >

                                                {task.edit ?
                                                    <div className='card_style'>
                                                        {console.log(task.edit, task.edit ? "hello" : "noo")}
                                                        <div>
                                                            name:<input placeholder={task.name} onChange={(e) => { task.name = e.target.value }}></input>
                                                        </div>
                                                        <div>
                                                            video link:<input placeholder={task.video} onChange={(e) => { task.video = e.target.value }}></input>
                                                        </div>
                                                        <button onClick={() => { unSetEditFunc(o, task) }}>Save</button>

                                                    </div>
                                                    :
                                                    <div className='card_style'>
                                                        <div style={{ cursor: "pointer" }}>
                                                            <div onClick={() => { setStreamingVideo(task.name, task.video) }}>{task.name}</div>
                                                        </div>
                                                        <button onClick={() => { SetEditFunc(o, task) }}>Edit</button>
                                                        <button onClick={() => { DeleteTask(o, task) }}>Delete</button>

                                                    </div>}
                                            </div>

                                        </Draggable>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <iframe width="560" height="315" src={iframelink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}

export default Container;
