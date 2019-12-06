// react
  import React /*, { useState, useContext } */ from 'react';

//material ui
  import { makeStyles } from '@material-ui/core/styles';
  import Box from '@material-ui/core/Box';
  import { CalendarToday, Healing, Done, LastPage, AlarmOn, EventAvailable } from '@material-ui/icons';

const useStyles = makeStyles( theme => ({
  bar: {
    paddingLeft: '3px',
    marginBottom: '3px',
    height: '25px',
    borderWidth: 0, 
    overflow: 'hidden',
    margin: 0,
    border: 'thin solid black',
    borderRadius: '4px',
    color: '#ffffff'
  }
 } ) );

/**
 * @param {days} width    - width of visible cell 
 * @param {days} interval - scaling factor for intervals of days, weeks, months and quarters
 * @param {days} dolly    - shift schedule left in viewport
 * @param {days} current  - place vertical line at current date
 * @param {days} start    - offset from startDate
 * @param {days} duration - length of scheduled task
 * @param {days} started  - offest from startDate for executed task
 * @param {days} yet      - delay from scheduled date
 * @param {days} comp     - completed so far
 * @param {days} project  - projected to complete
 * @param {days} early    - projected to complete early only one of this and next are non-zero
 * @param {days} behind   - projected to complete after scheduled completion cannot be past current
 * @param {days} late     - Completed after scheduled date
 *
 */ 


export default function ScheduleBox( props ) {
  const { width, interval, dolly, current, start, duration, started, yet, comp, project, early, behind, late } = props;
  const classes = useStyles();
  const pxPerDay = 29;
  const viewportWidth = width * pxPerDay;
  const viewportMultiple = 5;
  const maxScheduleWidth = viewportMultiple * viewportWidth;

  //console.log( "width: "    + width   + " interval: "  + interval + " dolly: "    + dolly + 
  //             " current: " + current + " start: "     + start    + " duration: " + duration + 
  //             " started: " + started + " yet: "       + yet      + " comp: "     + comp    +
  //             " project: " + project + " early: "     + early    + " behind: "   + behind   + 
  //             " late: "    + late    + ' dates: "     + dates ");
  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <div     className='viewport' style={{ width: viewportWidth + 'px', overflow: 'hidden' }} >    
      <div   className='schedule' style={{ width: maxScheduleWidth + 'px', left: ((0-dolly)*pxPerDay)+'px', 
                                           borderLeft:  'thin solid black', borderRight: 'thin solid red', 
                                           position: 'relative', padding: '0' }} >
        <div className='current'  style={{ width: '2px',  height: '0.53in', border: 'thin solid black', position: 'absolute', 
                                           left: (current*pxPerDay/interval)+'px', backgroundColor: '#777777', 
                                           zIndex: '10', bottom: '1', margin: '0' }} >
        </div>
        <Box display="flex" flexDirection="column" flexWrap="nowrap"  css={{ maxWidth: maxScheduleWidth }}>
          <Box display="flex" flexDirection="row" alignContent="flex-start" css={{ maxWidth: maxScheduleWidth }} >
            {start     <  1   ? "" : <Box order={2} className={classes.bar} style={{ width: ((start    * pxPerDay - (interval    ) ) / interval) + 'px', borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' }} >            </Box> }
            {duration === "0" ? "" : <Box order={3} className={classes.bar} style={{ width: ((duration * pxPerDay - (interval * 3) ) / interval) + 'px', borderColor: '#8CACB9', backgroundColor: '#004763' }} > <CalendarToday color='inherit'> Scheduled </CalendarToday>   </Box> } 
          </Box>   
          <Box display="flex" flexDirection="row" alignContent="flex-start" css={{ maxWidth: maxScheduleWidth }} >  
            {started  === "0" ? "" : <Box order={4} className={classes.bar} style={{ width: ((started  * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' }} >            </Box> }
            {yet      === "0" ? "" : <Box order={5} className={classes.bar} style={{ width: ((yet      * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#E1F3FE', backgroundColor: '#35B1F6' }} > <LastPage       color='inherit'> Yet      </LastPage>      </Box> }
            {comp     === "0" ? "" : <Box order={6} className={classes.bar} style={{ width: ((comp     * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#283910', backgroundColor: '#A2E33E' }} > <Done           color='inherit'> Comp     </Done>          </Box> } 
            {project  === "0" ? "" : <Box order={7} className={classes.bar} style={{ width: ((project  * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#FCF0E2', backgroundColor: '#E89A39' }} > <EventAvailable color='inherit'> Proj     </EventAvailable></Box> }
            {early    === "0" ? "" : <Box order={8} className={classes.bar} style={{ width: ((early    * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#8CACB9', backgroundColor: '#cccccc' }} > <Done           color='inherit'> Early    </Done>          </Box> } 
            {behind   === "0" ? "" : <Box order={9} className={classes.bar} style={{ width: ((behind   * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#8CACB9', backgroundColor: '#ff0000' }} > <Healing        color='inherit'> Behind   </Healing>       </Box> }
            {late     === "0" ? "" : <Box order={10} className={classes.bar} style={{ width: ((late     * pxPerDay - (interval * 3) ) / interval)  + 'px', borderColor: '#8CACB9', backgroundColor: '#f4cccc' }} > <AlarmOn        color='inherit'> Behind   </AlarmOn>       </Box> } 
          </Box> 
        </Box>
      </div>
    </div>
    </> 
  ) 
}


//function ScheduleContext( props ) { 
//  return {children};
//}


//export default function ScheduleBox( props ) {
//  const interval = 1;

//  return(
//    <ScheduleContext>
//          <ScheduleViewer interval={interval} {...props} />
//    </ScheduleContext>
//  )        
//}
