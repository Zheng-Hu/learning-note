import React from 'react';

const useSemiPersistentState = (key,initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(()=>{
    localStorage.setItem(key,value);
  },[value,key]);

  return [value,setValue];
}
const App = () => { 
  const stories = [ {
    title: 'React',
    url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4,
    objectID: 0,
    }, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark', num_comments: 2,
    points: 5,
    objectID: 1,
    }, ];
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');
  
  const handleSearch = event => {
    setSearchTerm(event.target.value);
    localStorage.setItem('search',event.target.value);
  };

  const searchedStories = stories.filter(story=>{
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
       id = "search"
       label="Search"
       value={searchTerm}
       onInputChange={handleSearch} 
      />
      <hr />

      <List list = {searchedStories} />
    </div>
  )
};

const Search = ({search,onSearch}) => (
  <>
    <label htmlFor = "search">Search:</label>
    <input 
     id="search"  
     type="text"
     value={search}
     onChange={onSearch}
    />
  </>
)


const List = props => (props.list.map(item => (
  <div key={item.objectID}> <span>
    <a href={item.url}>{item.title}</a> </span>
    <span>{item.author}</span> 
    <span>{item.num_comments}</span> 
    <span>{item.points}</span>
  </div> 
  )))
  

export default App