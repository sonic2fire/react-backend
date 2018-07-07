import React, { Component } from 'react';


export default function createCard(info) {


  return (

    <div className="card">
    
        <img className="App-logo" src={info.picture} alt="logo" />


      <div className="right">

        <h1 className="title"> {info.title} </h1>
        <ul>
        <li><p className="skills_title">Skills:</p></li>

        {info.skills}

        </ul>

        <ul>
        <li><p className="links">Links:</p></li>

        {info.links}

        </ul>

      </div>

      
      <p className="description"> {info.description}</p>
      
    </div>

  )
}