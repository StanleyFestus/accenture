import React from 'react';

const Opens = (week_day) => {
 return (
   <div>
     <div>{week_day.monday}</div>
     <div>{week_day.tuesday}</div>
     <div>{week_day.wednesday}</div>
   </div>
 )
}

export default Opens;