// react
  import React /*, { useState, useContext } */ from 'react'; 

//material ui
  import Box from '@material-ui/core/Box';


function leapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
  


function LayoutDates( pxPerDay, width, interval, dolly, viewDate ) {
        // TBD Layout monthly, quarterly
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const days   = [  31,   28,   31,   30,   31,   30,   31,   31,   30,   31,   31,   31 ];
  const scale = pxPerDay / interval;
  var scalePx = scale + 'px';
  var dates = [];
  var mos = [];
  console.log( "LayoutDates: viewDate: " + viewDate  );
  const firstDate = new Date( viewDate.split("-").join(",") );
  var thisYear = firstDate.getFullYear();
  const viewportWidth = width * pxPerDay;
  const viewportMultiple = 5;
  const maxScheduleWidth = viewportMultiple * viewportWidth;
  var firstLoop = 1;
  const firstMonth = firstDate.getMonth();
  var order = 1;
  let showMonths = 3;

  switch( interval ) {
    case 1:
      break;

    case 7:
      scalePx = pxPerDay + 'px';
      showMonths = interval * 3; 
      break;

    case 30:
      //scalePx = pxPerDay + 'px';
      showMonths = interval * 1.8; 
      break;

    case 90:
      //scalePx = pxPerDay + 'px';
      showMonths = 80;
      break;

    default:
            console.log ( "Invalid interval: " + interval );        
  } 

//console.log( "pxPerDay: " + pxPerDay + " width: " + width  + " interval: " + interval  + " viewDate: " + viewDate + " scale: " + scale );
//console.log( "year: " + firstDate.getFullYear() + " month: " + (firstDate.getMonth() + 1 )  + " day: " + firstDate.getDate() );
  // display months with partial first month in progress

  for( let i = firstMonth; i <= firstMonth + showMonths; i++ ) {
    let thisDays = days[ i % 12 ];
    
    if( i === 1 && leapYear( thisYear ) ) {
      thisDays++;
    }

    let monthSize = ( ( ( scale * ( thisDays + 1 ) ) + 2 ) + ( 1 * thisDays ) -2 ) + 'px';
    const currentMonth = months[ i % 12 ];
console.log( "LayoutDates: month: " + i + " monthSize: " + monthSize + " thisDays: " + thisDays  );  

    if( firstLoop === 1 ) {
      let deltaDays =  days[ i % 12 ] - firstDate.getDate() + 1;
      monthSize = ( ( scale * ( deltaDays ) ) + ( 2 * deltaDays ) - 2 ) + 'px' ;
      firstLoop = 2;
    } 
    
    if( i%12 === 0 ) { 
      thisYear++;
    }

    mos.push( <Box order={order++}  style={{ width: monthSize, border: 'thin solid grey', borderRadius: 4, overflow: 'hidden', margin: 0, textAlign: 'center' }} > {currentMonth} {thisYear} </Box> );
  }

  // Display days for each month
  firstLoop = 1;

  if( interval < 30 ) {
    for( let mo = firstMonth; mo <= firstMonth + showMonths; mo++ ) {
      for( let j = 1; j <= days[ mo % 12 ]; j+=interval ) {
        if( firstLoop === 1 ) {
          firstLoop = 2;
          j = firstDate.getDate();
        }

        dates.push( <Box order={order++}  style={{ width: scalePx, border: 'thin solid grey', borderRadius: 4, overflow: 'hidden', margin: 0, textAlign: 'center' }} > {j} </Box> );
      }
    }
  }

  return (
    <>
      <Box display="flex" flexDirection="column" flexWrap="nowrap"  css={{ maxWidth: maxScheduleWidth }}> 
        <Box display="flex" flexDirection="row" alignContent="flex-start" flexWrap="wrap" flexGrow="0" flexShrink="0" css={{ maxWidth: maxScheduleWidth }} > 
          {mos}
        </Box>
        <Box display="flex" flexDirection="row" alignContent="flex-start" flexWrap="wrap" flexGrow="0" flexShrink="0" css={{ maxWidth: maxScheduleWidth }} > 
          {dates}
        </Box>
      </Box>       
   </>
  )
}


/**
 * @param {px}   cellWidth - width of visible cell 
 * @param {days} interval  - scaling factor for intervals of days, weeks, months and quarters
 * @param {days} dolly     - shift schedule left in viewport
 * @param {date} viewDate  - first date to display when dolly=0
 */
export default function DateHdr( props ) {
  const { cellWidth, interval, dolly, viewDate } = props;      
  const pxPerDay = 29;
  const viewportWidth = cellWidth * pxPerDay;
  const viewportMultiple = 6;
  const maxScheduleWidth = viewportMultiple * viewportWidth;

console.log( "DateHdr: cellWidth: " + cellWidth + " interval: " + interval + " dolly: " + dolly + " viewDate: " + viewDate );

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <div     className='viewport' style={{ width: viewportWidth + 'px', overflow: 'hidden' }} >    
      <div   className='schedule' style={{ width: maxScheduleWidth + 'px', left: ((0-dolly)*pxPerDay)+'px', 
                                           borderLeft:  'thin solid black', borderRight: 'thin solid red', 
                                           position: 'relative', padding: '0' }} >
        <Box display='flex' flexDirection='column' flexWrap='nowrap' css={{ maxWidth: maxScheduleWidth }} >
          { LayoutDates( pxPerDay, cellWidth, interval, dolly, viewDate ) }
        </Box> 
        
      </div>
    </div>
    </> 
  ) 
}

