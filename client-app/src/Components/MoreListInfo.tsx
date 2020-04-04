import React, {Component} from 'react';
import './../App/Layout/styles.css';
import IActivitiesObject from '../App/Models/IActivitiesObject';

const MoreListInfo = (props: IActivitiesObject) => {

    return(
        <div key={props.id}>
            <p>Description: {props.description}</p>
            <p>Category: {props.category}</p>
            <p>Date: {new Date(props.date).toDateString()} | {new Date(props.date).toLocaleTimeString()}</p>
            <p>City: {props.city}</p>
            <br></br>
        </div>
    )

}

export default MoreListInfo;