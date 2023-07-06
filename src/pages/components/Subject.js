import React from "react";


const Subject = ({subject, onDelete}) => {
    return (
        <li>
        <span>{subject.semester}</span>
        <span>{subject.school}</span>
        <span>{subject.subname}</span>
        <span>{subject.cosscode}</span>
        <span>{subject.subcode}</span>
        <span>{subject.credit}</span>
        <span>{subject.oriname}</span>
        <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default Subject;