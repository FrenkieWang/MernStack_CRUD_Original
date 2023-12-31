import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

function ExercisesList(){
  const [exercises, setExercises] = useState([]);

  useEffect(( ) => {
    axios.get('http://localhost:5000/exercises/')
    .then(response => {
      setExercises(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  function deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    setExercises(exercises.filter(el => el._id !== id));
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(currentexercise =>(
            <tr key = {currentexercise._id}>
              <td>{currentexercise.username}</td>
              <td>{currentexercise.description}</td>
              <td>{currentexercise.duration}</td>
              <td>{currentexercise.date.substring(0,10)}</td>
              <td>
                <Link to={"/edit/"+currentexercise._id}>edit</Link> | 
                <a href="#" onClick={() => {deleteExercise(currentexercise._id) }}>delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )  
}

export default ExercisesList;