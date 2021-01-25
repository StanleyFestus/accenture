import React, { useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Dashboard from './Dashboard';
import '../index.css';

const initialState = {
  places: [],
}

const Landing = () => {

  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrPage] = useState(0);

  const getData = async() => {
    const res = await axios.get(`http://localhost:5000/api/places`)
    .catch(function(err){
      setError(true);
    })
    
    const data = res.data;
    console.log(res)

    if(data){
      setState({...state, places: data})
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // Helper function to render if shop is open or close
  const openingHour = (open, close) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    
    if(open === null && close === null){
      return 'No info about opening hours'
    } else if(open <= time && close >= time){
    return 'open now'
    } else {
      return 'closed'
    }
  }

  // Declarations for page count
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  //Conditonally rendered component
  const currentPageData = () => {

    if(loading){
      return <h1 className="text-center">Loading...</h1>

    } else if(state.places){
      return state.places.slice(offset, offset + PER_PAGE)
        .map((place) =>{
        const {id, name, location:{address:{street_address, postal_code, locality}}, opening_hours:{hours:{open, closes}}} = place;
      
        return (
            <Dashboard 
            key={id} 
            name={name.fi}
            street={street_address}
            postCode={postal_code}
            locality={locality}
            open={openingHour(open, closes)}/>
            )
          })
        
      }  else if(error){
      return <div>An error occurred!</div>
    }
  }
  
  // 
  const pageCount = Math.ceil(state.places.length / PER_PAGE);
  
  const hanldePagePick = ({selected: selectedPage}) => {
    setCurrPage(selectedPage)
  }

  return (
   <div
    style={{
      width: '70vw',
      margin: 'auto'
    }}>
     <div>
     {currentPageData()}
     </div>
      <div>
        {state.places && <ReactPaginate
          style={{width: '300px'}}
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={hanldePagePick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link_left"}
          nextLinkClassName={"pagination__link_right"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />}
      </div>
   </div>
  );
};

export default Landing;