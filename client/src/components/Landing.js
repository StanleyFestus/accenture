import React, { useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Dashboard from './Dashboard';
import '../index.css';

const initialState = {
  loading: true,
  error: false,
  places: [],
}

const Landing = () => {

  const [state, setState] = useState(initialState);
  const [currentPage, setCurrPage] = useState(0);

  const getData = async() => {
    const res = await axios.get(`http://localhost:5000/api/places`)
    .catch(function(err){
      console.log(err)
      setState({
        ...state,
        error: true
      })
    })
    

    const data = res.data;
    console.log(res)

    if(data){
      setState({
        ...state, 
        places: data, 
        loading: false, 
        error: false
      })
    } else if(!data){
      setState({
        ...state,
        loading: true,
        error: false,
      })
    } else {
      setState({
        loading: false,
      })
    }
  }

  useEffect(() => {
    getData()
    return () => {
      console.log('cleaned')
    }
  }, [])

  // Helper function to render if shop is open or close
  const openingHour = (open, close) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    
    if(open === null && close === null){
      return 'No info about opening hours'
    } else if(open <= time && close >= time){
    return 'open now'
    } else {
      return 'closed'
    }
  }

  let open;
  let closed;

  // Declarations for page count
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  //Conditonally rendered component
  const currentPageData = () => {
    if(state.loading){
      return <h1 
      className="text-center">
        Loading...</h1>
    } else if(state.places){
      return state.places.slice(offset, offset + PER_PAGE)
        .map((place) =>{
        let time = place.opening_hours.hours;
        for(var key in time){
          // console.log(time[key].opens)
          open =  time[key].opens;
          closed = time[key].closes;
        }
        return (
            <Dashboard 
             key={place.id} 
            name={place.name.fi}
            street={place.location.address.street_address}
            postCode={place.location.address.postal_code}
            locality={place.location.address.locality}
            open={openingHour(open, closed)}/>
        )
      })
    }  else {
      return <div>Something went wrong!</div>
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