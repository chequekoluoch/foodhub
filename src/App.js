import React, { useState } from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

const App =()=> {

  const [ query, setQuery]=useState("");
  const [ recipes, setRecipes ]=useState([]);
  const [alert, setAlert]=useState("")

  const APP_ID="fd7fe0be"
  const APP_KEY="dd16c7b75539f4d9166456ae792c40a0"
  const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  
const getData=async()=>{
  if(query !== ""){
  const result = await Axios.get(url);
  if(!result.data.more){
    return setAlert("No food with such name")
    }
  setRecipes(result.data.hits)
  console.log(result)
  setAlert("");
  setQuery("");
 
  }else{
    setAlert('Please fill the form')
  }
}

const onSubmit=e=>{
  e.preventDefault();
  getData();
}

const onChange=(e)=>{
  //console.log(e.target.value)
  setQuery(e.target.value);
}
  return (
    <div className="App">
    
      <h1>FOOD SEARCHING APP</h1>
      <form className="search-form" onSubmit={onSubmit}>
      {alert !== "" && <Alert alert={alert}/>}
        <input type="text" placeholder="Search" 
        autoComplete="off" onChange={onChange} value={query}/>
      <input type="submit" value="search"/>
      </form>
      <div className="recipes">
     {recipes !==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
}

export default App;
