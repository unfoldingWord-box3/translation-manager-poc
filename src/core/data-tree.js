// TBD Sync comp to Progress
// TBD Show current date
// TBD Sync comp to completed
// TBD Make Sort Work ?
// TBD Make rollup work
// TBD normalize offsets to start date
// TBD Editable Progress, Scheduled and Completed
// TBD Sticky table header
// TBD Support cancel search
// TBD Support resource assignement and display
// TBD Make proj scale to comp by now
// + finish deriving scheduleBox parms from DCS
// + extract schedule from DCS
// TBD BUG ViewDate is off by 1 day
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import ScheduleBox from '../components/schedule-box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { differenceInCalendarDays } from 'date-fns';
import DateHdr from '../components/date-hdr';
import axios from 'axios';


const useStyles = makeStyles( theme => ( 
  {
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    head: {
      position: 'sticky', 
      top: '0' 
    }
  }    
) );


export async function DataTree( language, release ) {
  const widgitWidth = 25;
  const classes = useStyles();

  const dte = new Date();
  const defaultStartDate = dte.getFullYear() + '-' + ( dte.getMonth() + 1 ) + '-' + dte.getDate();
console.log( "DataTree: defaultStartDate: " + defaultStartDate );
  const [ interval, setInterval ]   = React.useState( 1 );
  const [ dolly, setDolly ]         = React.useState( 0 );
  const [ startDate, setStartDate ] = React.useState( defaultStartDate );
  const [ viewDate, setViewDate ]   = React.useState( defaultStartDate ); 

  //const [ current, setCurrent ]     = React.useState( 0 ); 
  //const current = 10;
  const handleIntervalChange  = event            => { setInterval( event.target.value ); };
  const handleDollyChange     = ( event, value ) => { setDolly( value );  };
  const handleStartDateChange = event            => { setStartDate( event.target.value ); };
  const handleViewDateChange  = event            => { setViewDate( event.target.value ); };
//const handleCurrentChange   = ( event, value ) => { setCurrent( value );};

console.log( "DataTree: got here 1" );
  /*
   * A Translation Project Schedule has a planned stert date 
   *   The scheduled date for a task is offset from that
   *   The task duration is given as number of days 
   *   Duration allows computation of end date for sceheduled task
   * 
   * The view of a schedule has a View date which may be before or after start date
   *   View date determines when we start showing schedule information
   *   The viewer has a viewport that lets us look at a time portion of the schedule
   * 
   * An interval sets the units of display. Units are one of: days, weeks, months or quarters 
   * 
   * A "View From" slider lets us navigate the duration of the schedule through the viewport 
   * 
   * A scheduled task has several visible viewpoints
   *   "yet" displays from scheduled date till progress begins or current date
   *   "complete" shows from first task progress to last task progress
   *   "proj" shows from last task progress until lesser of
   *      scheduled completion
   *      remaining tasks less complete
   *         remaining tasks is effort not complete multiplied by completed 
   *   "Early" time between completion and scheduled completion if less than scheduled completion
   *   "Behind" time scheduled to complete if after shcedduled completion
   *   "Late" Time between current and complete if greater than scheduled completion
   * 
   * Given:
   *   * startDate
   *   * viewDate
   *   * interval 
   *   * width
   * for each task
   *   * start   = scheduled - startDate
   *   * current = today - viewDate
   *   + started = start
   *   - yet     = <first completed task> ?
   *   * comp    = progress/100 * duration
   *   + project = duration - comp * ?
   *   - early   = ?
   *   - behind  = project - ?
   *   - late    = completed - ?
   */
console.log( "DataTree: got here 1.1" );
  var scheduleData = await getScheduleData( language, release );
  //const datum = dataRollup( scheduleData );
console.log( "DataTree: scheduleData: ", JSON.stringify( scheduleData ) );
  //const datum = scheduleData;
  const flattened = flatten( scheduleData );
console.log( "DataTree: flattened: ", JSON.stringify( flattened ) );
//console.log( "Should be 9 days: " + differenceInCalendarDays( new Date( 2019, 10, 10 ), new Date( 2019, 10, 1 )) );
  //var rawData = {[]};
  console.log( "DataTree: got here 2" );
  //for( var sponsorIdx)
  return (
    <div style={{ maxWidth: '100%'}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          unfoldingWord Project Manager POC
        </Typography>
        <Typography gutterBottom> 
          <InputLabel id='select-label' labelWidth='1in'> Interval  </InputLabel>
          <Select
            labelId="select-label"
            type="simpleSelect"
            id="demo-simple-select"
            value={interval}
            onChange={handleIntervalChange}
          >
            <MenuItem value={90}>Quarterly</MenuItem>
            <MenuItem value={30}>Monthly</MenuItem>
            <MenuItem value={7}>Weekly</MenuItem>
            <MenuItem value={1}>Daily</MenuItem>
          </Select>
          
          <TextField
            id="date"
            label="Start Date" 
            type="date"
            defaultValue={startDate} 
            onChange={handleStartDateChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />  
        
          <TextField
            id="date"
            label="View Date"
            type="date"
            defaultValue={viewDate} 
            onChange={handleViewDateChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Typography>
        <Typography id="continuous-slider" gutterBottom>
          View Schedule from
        </Typography>
        <Slider 
          max={102}
          min={0}
          defaultValue={dolly}
          aria-labelledby="continuous-slider" 
          onChange={handleDollyChange}
          valueLabelDisplay="auto"
          step={1}
          marks
        />
    </Box>
    {/*<ScheduleContext.Consumer>  start={rowData.start}  */}
        <MaterialTable 
          options={{ headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '5in' }}
          columns={[
            { title: 'Task',      field: 'task' },
            { title: 'Progress',  field: 'progress' },
            { title: 'Scheduled', field: 'scheduled', type: 'date' },
            { title: 'Completed', field: 'completed', type: 'date' },
            { title: <DateHdr cellWidth={widgitWidth} interval={interval} dolly={dolly} viewDate={viewDate}  />,    field: 'schedule', render: rowData => 
                <ScheduleBox
                  width={widgitWidth}        
                  interval={interval} 
                  dolly={dolly} 
                  current={differenceInCalendarDays( new Date( Date.now() ), new Date( viewDate ) )}
                  start={ differenceInCalendarDays( new Date( rowData.scheduled ), new Date( startDate ) ) - 1 }  
                  duration={rowData.duration} 
                  started={differenceInCalendarDays( new Date( rowData.scheduled ), new Date( startDate ) ) - 1}   
                  yet={rowData.yet}   
                  comp={rowData.duration * ('.' + ( "0" + parseInt( rowData.progress )).substr( -2, 2) )}  
                  project={ rowData.duration - ( rowData.duration * ('.' + ( "0" + parseInt( rowData.progress )).substr( -2, 2) ) ) }  
                  early={rowData.early}  
                  behind={rowData.behind}  
                  late={rowData.late}  
                />
            },
            { title: 'Notes',     field: 'notes' }
          ]}
          
          parentChildData = { ( row, rows ) => rows.find( a => a.id === row.parentId ) }
          title='Translation Manager - Accounting POC'
          /* data={flattened}  */
        
          
          data={[
            { id: '1', parentId: '0',             
              task: 'Projects', progress: '20%',  scheduled: '2019-09-01', completed: '', 
              notes: 'Time Shifted' ,  
                  dates: 'yes',
                  duration: '20',  yet: '1', early: '1', behind: '1',  late: '1' 
            },
            { id: '2', parentId: '1', 
              task: 'Sponsor: uW',  progress: '20%',  scheduled: '2019-09-05', completed: '',    
              notes: 'Projected to be under budget',  
                  duration: '20',  yet: '0',early: '0', behind: '0', late: '0' 
            } ,
            { id: '3', parentId: '2', 
              task: 'uW: Language: en', progress: '30%', scheduled: '2019-09-10', completed: '', 
              notes: 'Projected way over budget', 
                  duration: '30',  yet: '0',  early: '0', behind: '0', late: '0'
              },
            { id: '4', parentId: '3', 
              task: 'uW/en: type: gl',  progress: '35%', scheduled: '2019-09-21', completed: '2019-11-01', 
              notes: 'Finisthed a little late', 
                   duration: '40', yet: '7', early: '0', behind: '70', late: '0'
           },
            { id: '5', parentId: '4', 
              task: 'uW/en/gl: Translation: ULT', progress: '40%', scheduled: '2019-09-25', completed: '', 
             notes: 'Under budget' ,
                  duration: '3', yet: '0', early: '0',  behind: '0', late: '5' 
             },
            { id: '6', parentId: '5', 
              task: 'uW/en/gl/ULT: Testament: OT', progress: '45%',  scheduled: '2019-10-01',   completed: '',
              notes: 'Have not started and late',
                  duration: '30', yet: '0',  early: '0', behind: '0', late: '0' 
            },
            { id: '7',  parentId: '6', 
              task: 'uW/en/gl/ULT/OT: Book: gen', progress: '50%', scheduled: '2019-10-10', completed: '',  
              notes: '' ,
                  duration: '30',  yet: '0',  early: '0', behind: '0', late: '0'
            },
            { id: '8', parentId: '7', 
              task: 'uW/en/gl/ULT/OT/gen: Check: Text Complete', progress: '50%', scheduled: '2019-10-15', completed: '',
              notes: 'Finished in no time', 
                  duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '9', parentId: '7', 
              task: 'uW/en/gl/ULT/OT/gen: Check: Internal Review', progress: '50%', scheduled: '2019-10-20', completed: '',  
              notes: '',
                  duration: '32',  yet: '0', early: '5', behind: '0', late: '0' 
            },
            { id: '10',  parentId: '6', 
              task: 'uW/en/gl/ULT/OT: Book: rut',  progress: '50%', scheduled: '2019-10-25',   completed: '',  
              notes: 'Finished in no time', 
                  duration: '35', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '11',  parentId: '10', 
              task: 'uW/en/gl/ULT/OT/rut: Check: Text Complete',  progress: '50%', scheduled: '2019-11-01', completed: '', 
              notes: '',
                  duration: '20', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '12',   parentId: '10', 
              task: 'uW/en/gl/ULT/OT/rut: Check: Internal Review',  progress: '50%',  scheduled: '2019-11-05',  completed: '',  
              notes: 'Finished in no time', 
                  duration: '22', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '13',  parentId: '6', 
              task: 'uW/en/gl/ULT/OT: Book: jon',  progress: '50%', scheduled: '2019-11-10',   completed: '',  
             notes: '', 
                  duration: '24', yet: '0',  early: '5', behind: '0', late: '0'
             },
            { id: '14',  parentId: '13', 
              task: 'uW/en/gl/ULT/OT/jon: Check: Text Complete',  progress: '50%', scheduled: '2019-11-15', completed: '', 
              notes: 'Finished in no time',
                  duration: '25', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '15',   parentId: '13', 
              task: 'uW/en/gl/ULT/OT/jon: Check: Internal Review',  progress: '50%',  scheduled: '2019-11-20',  completed: '', 
              notes: '', 
                  duration: '30', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '16', parentId: '5', 
              task: 'uW/en/gl/ULT: TestamenT/NT', progress: '45%',  scheduled: '2019-11-25',   completed: '', 
              notes: 'Have not started and late',
                  duration: '30', yet: '0',  early: '0', behind: '0', late: '0'
            },
            { id: '17',  parentId: '16', 
              task: 'uW/en/gl/ULT/NT: Book: mat', progress: '50%', scheduled: '2019-12-01', completed: '', 
              notes: '', 
                  duration: '30', yet: '0',early: '5', behind: '0', late: '0'
            },
            { id: '18', parentId: '17', 
              task: 'uW/en/gl/ULT/NT/mat: Check: Text Complete', progress: '50%', scheduled: '2019-12-05', completed: '', 
              notes: 'Finished in no time', 
                  duration: '30', yet: '0',early: '5', behind: '0', late: '0'
            },
            { id: '19', parentId: '17', 
              task: 'uW/en/gl/ULT/NT/mat: Check: Internal Review', progress: '50%', scheduled: '2019-12-10', completed: '', 
              notes: 'Finished in no time',
                  duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '20',  parentId: '16', 
              task: 'uW/en/gl/ULT/NT: Book: mrk',  progress: '50%', scheduled: '2019-10-01',   completed: '',  
              notes: 'Finished in no time', 
                  duration: '30', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '21',  parentId: '20', 
              task: 'uW/en/gl/ULT/NT/mrk: Check: Text Complete',  progress: '50%', scheduled: '2019-10-15', completed: '',  
              notes: 'Finished in no time',
                  duration: '30', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '22',   parentId: '20', 
              task: 'uW/en/gl/ULT/NT/mrk: Check: Internal Review',  progress: '50%',  scheduled: '2019-10-20',  completed: '', 
              notes: 'Finished in no time', 
                  duration: '30',  yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '23',  parentId: '16', 
              task: 'uW/en/gl/ULT/NT: Book: luk',  progress: '50%', scheduled: '2019-10-01',   completed: '',  
              notes: 'Finished in no time', 
                  duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '24',  parentId: '23', 
              task: 'uW/en/gl/ULT/NT/luk: Check: Text Complete',  progress: '50%', scheduled: '2019-10-25', completed: '',  
              notes: 'Finished in no time',
                  duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '25',   parentId: '23', 
              task: 'uW/en/gl/ULT/NT/luk: Check: Internal Review',  progress: '50%',  scheduled: '2019-11-01',  completed: '', 
              notes: 'Finished in no time' ,
                  duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },


            { id: '26', parentId: '1', 
              task: 'Sponsor: BCS',  progress: '20%',  scheduled: '2018-09-01', completed: '',    
              notes: 'Projected to be under budget',             
                  duration: '80', yet: '0', early: '0',behind: '0', late: '0' 
            } ,
            { id: '27', parentId: '26', 
              task: 'BCS: Language: en', progress: '30%', scheduled: '2019-08-10', completed: '', 
              notes: 'Projected way over budget',  
                  duration: '30', yet: '0',  early: '0',behind: '0', late: '0'
              },
            { id: '28', parentId: '27', 
              task: 'BCS/en: type: gl',  progress: '35%', scheduled: '2019-08-20', completed: '2019-11-01', 
              notes: 'Finisthed a little late', 
                  duration: '400', et: '70',  early: '0',  behind: '70', late: '0'
            },
            { id: '29', parentId: '28', 
              task: 'BCS/en/gl: Translation: ULT', progress: '40%', scheduled: '2019-09-01', completed: '', 
              notes: 'Under budget', 
                  duration: '30', yet: '0',early: '0', behind: '0', late: '50' 
            },
            { id: '30', parentId: '29', 
              task: 'BCS/en/gl/ULT: Testament: OT', progress: '45%',  scheduled: '2019-09-15',   completed: '', 
              notes: 'Have not started and late',
                  duration: '30', yet: '0', early: '0', behind: '0', late: '0'
            },
            { id: '31',  parentId: '30', 
              task: 'BCS/en/gl/ULT/OT: Book: gen', progress: '50%', scheduled: '2019-10-01', completed: '',  
              notes: '', 
                  duration: '30', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '32', parentId: '30', 
              task: 'BCS/en/gl/ULT/OT: gen: Check: Text Complete', progress: '50%', scheduled: '2019-10-10', completed: '', 
              notes: '', 
                  duration: '3', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '33', parentId: '30', 
              task: 'BCS/en/gl/ULT/OT: gen: Check: Internal Review', progress: '50%', scheduled: '2019-10-15', completed: '',  
              notes: '',
                  duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '34',  parentId: '30', 
              task: 'BCS/en/gl/ULT/OT: Book: rut',  progress: '50%', scheduled: '2019-10-20',   completed: '',  
              notes: '', 
                  duration: '3', yet: '0', early: '5', behind: '0', late: '0'
            },
            { id: '35',  parentId: '34', 
              task: 'BCS/en/gl/ULT/OT: rut: Check: Text Complete',  progress: '50%', scheduled: '2019-10-25', completed: '', 
               notes: '',
                 duration: '30', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '36',   parentId: '34', 
              task: 'BCS/en/gl/ULT/OT: rut: Check: Internal Review',  progress: '50%',  scheduled: '2019-11-01',  completed: '',  
              notes: 'Finished in no time', 
                  duration: '3',  yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '37',  parentId: '30', 
              task: 'BCS/en/gl/ULT/OT: Book: jon',  progress: '50%', scheduled: '2019-11-05',   completed: '',  
              notes: 'Finished  timone' ,
                  duration: '3', yet: '0',  early: '5', behind: '0', late: '0'
            },
            { id: '38',  parentId: '37', 
              task: 'BCS/en/gl/ULT/OT/jon: Check: Text Complete',  progress: '50%', scheduled: '2019-11-10', completed: '', 
              notes: 'Finished in no time',
                  duration: '30', yet: '0',early: '5', behind: '0', late: '0'
            },
            { id: '39',   parentId: '37', 
              task: 'BCS/en/gl/ULT/OT/jon: Check: Internal Review',  progress: '50%',  scheduled: '2019-11-15',  completed: '',  
              notes: 'Finished in no time' ,
                  duration: '3', yet: '0',  early: '5', behind: '0', late: '0'
            },
          ]}
          
        />
        { /*</ScheduleContext.Consumer> */}
      </div>
    )
  }


/**
 * 
 * @param {obj} project - hierarchical project of form:
 *   projects.sponsors[uW|BCS].languages[en|swa].category.translations[ult|ust].collections[ot|nt].books[mat|mar|...].book.milestones
 * 
 *   map the milestones and tasks:
 * 
 * 
 *   onto the ui
 *   progress: '50%', scheduled: '2019-11-15', completed: '', notes: 'Finished in no time', duration: '3', yet: '0', early: '5', behind: '0', late: '0'
 */

function flatten( project ) {
  var flattened = [];
  var id = 1;

//console.log( "flatten: project: ", JSON.stringify( project ) );

  for( var sponsorItem of project.sponsors ) {
//console.log( "flatten: sponsorItem: ", JSON.stringify( sponsorItem ) );
    var sponsorId = id;
    flattened.push( {  id: sponsorId, parentId: 0, task: "Sponsor: " + sponsorItem.sponsor } );
    id++;

    for( var languageItem of sponsorItem.languages ) {
//console.log( "flatten: language: ", JSON.stringify( languageItem ) );
      var languageId = id;
      flattened.push( { id: languageId, parentId: sponsorId, task: sponsorItem.sponsor + " Language: " + languageItem.languageCode })   
      id++;    

      flattened.push( { id: languageId, parentId: languageId, task: sponsorItem.sponsor + 
        "/" + languageItem.languageCode +
        " Scope: " + languageItem.category.scope });

      if( languageItem.category.translations ) {
        for( var translationItem of languageItem.category.translations ) {
//console.log( "flatten: translationItem: ", JSON.stringify( translationItem ) );
          var translationId = id;
          flattened.push( { id: translationId, parentId: languageId, task: sponsorItem.sponsor + 
              "/" + languageItem.languageCode +
              "/" + languageItem.category.scope +
              " Translation: " + translationItem.translation })   
          id++;    

          if( translationItem.collections ) {
            for( var collectionItem of translationItem.collections ) {
//console.log( "flatten: collectionItem: ", JSON.stringify( collectionItem ) );
              var collectionId = id;
              flattened.push( { id: collectionId, parentId: translationId, task: sponsorItem.sponsor + 
                  "/" + languageItem.languageCode +
                  "/" + languageItem.category.scope +
                  "/" + translationItem.translation +
                  " Collection: " + collectionItem.collection })   
              id++;    

              if( collectionItem.books ) {
                for( var bookItem of collectionItem.books ) {
//console.log( "flatten: collectionItem: ", JSON.stringify( collectionItem ) );
                  var bookId = id;
                  flattened.push( { id: bookId, parentId: collectionId, task: sponsorItem.sponsor + 
                      "/" + languageItem.languageCode +
                      "/" + languageItem.category.scope +
                      "/" + translationItem.translation +
                      "/" + collectionItem.collection +
                      " Book: " + bookItem.book })   
                  id++;    

                  if( bookItem.milestones ) {
                    for( var milestoneItem of bookItem.milestones ) {
//console.log( "flatten: collectionItem: ", JSON.stringify( collectionItem ) );
                      var milestoneId = id;
                      flattened.push( { id: milestoneId, parentId: bookId, task: sponsorItem.sponsor + 
                          "/" + languageItem.languageCode +
                          "/" + languageItem.category.scope +
                          "/" + translationItem.translation +
                          "/" + collectionItem.collection +
                          "/" + bookItem.book +
                          " Milestone: " + milestoneItem.title})   
                      id++;    
                    }
                  }    
                }
              }
            }
          }
        }
      }
    }
  }

  console.log( "flatten: flattened: ", JSON.stringify( flattened ) );
  return flattened;
}


//import { NoMeetingRoom } from '@material-ui/icons';
//const dte = new Date( Date.now() );
//const startDate = dte.getFullYear() + '-' + ( dte.getMonth() + 1 ) + '-' + dte.getDate();
//const viewDate = startDate;
//
//const scheduleScope = {
//  interval: '1',
//  dolly: '0',
//  startDate,
//  viewDate
//}

//const ScheduleContext = React.createContext({ scheduleScope });

/**
 * @param {pathname} path - linux path into repo
 *
function basename( path ) {
  return path.replace(/.*\//, '');
}
*/

/**
 * @param {string} endpoint - path into dcs after version: v1/
 * @param {string} filter   - optional query string for search0
 */
async function getDCS( endpoint, filter ) {
  var options = {
    url: 'https://git.door43.org/api/v1/' + endpoint,
    auth: {
      username: '',
      timeout:  10000,
      password: 'YnJ1Y2Uuc3BpZGVsQGdtYWlsLmNvbTpibXNzbWJfMQ=='
    }
  }

  if( filter ) {
    // add query string if provided
    options.params = {};
    options.params.q = filter;
  }  


//console.log( "getDCS: request: " + JSON.stringify( options ) );

  const response = axios( options )
    .catch( function( error ) {
      return { status: 400 };
    } )
  
  //equivalent to: `curl -X GET "https://bg.door43.org/api/v1/repos/search?q=_rel" -H "accept: application/json" -H "authorization: Basic YnJ1Y2Uuc3BpZGVsQGdtYWlsLmNvbTpibXNzbWJfMQ=="`;
//console.log( "getDCS: endpoint: " + endpoint + " response.code: ", JSON.stringify( response.status ) );
  return response;
}


function getJustIssues( issues ) {
  var justIssues = [];

  for( var idx = 0; idx < issues.length; idx++ ) {
    justIssues.push( objectPick (issues[ idx ], [ 'number', 'title', 'description', 'created_at', 'due_date' ] ) );
  }

  return justIssues;
}


function objectPick( obj, attrs ) {
//console.log ( "issuePick: " + JSON.stringify( obj ) );
  var filtered = {};

  for( var attr in obj ) {
//console.log( attr + " " + obj[ attr ] );
    if( attrs.indexOf( attr ) >= 0 ) {
        filtered[ attr ] = obj[ attr ];
    }
  }

  return filtered;
}

/*
function dataRollup( root ) {
  var rolledUp = {};
  return rolledUp;
}
*/

/**
 * @param {string} languageCode - 2 or 3 digit code for language
 * @param {string} release      - semantic 3 part version
 * 
 * extract this info from DCS and roll up to top
 * 
 * /projects/sponsor/language/type/translation/document/chapter/check/possible
 *                           |           |             /complete        
 *                           |           /check/possible
 *                           |                 /Complete  
 *                           /check/possible
 *                           |     /complete
 *                           /_rel/issues/effort_estimate
 *                                |      /start_date
 *                                |      /Complete
 *                                /milestones/due_date 
 *                                           /issue_count
 *                                           /issues_complete
 */

async function getScheduleData( languageCode, release ) {
console.log( "getScheduleData: args: languageCode: " + languageCode + ", rel: " + release );
  var projects = {
    sponsors: [ {
      sponsor: 'uW',
      languages: [ {
        languageCode: 'en',
        owner: 'lrsallee',
        version: '1.2.1',
        start_date: '2019-10-10',
        due_date: '2019-10-10',
        milestones: [ {
          tasks: []
        } ],
        checks: [ {
          check: 'textComplete',
          possible: 'r',
          complete: 'q'
        },{
          check: 'alignment',
          possible: 'r',
          complete: 'q'
        },{
          check: 'selection',
          possible: 'r',
          complete: 'p'
        } ],
        category: {
          scope: 'gl',
          translations: [ {
            translation: 'ult',
            milestones: [ {
              tasks: []
            } ],
            checks: [ {
              check: 'textComplete',
              possible: 'r',
              complete: 'q'
            },{
              check: 'alignment',
              possible: 'r',
              complete: 'q'
            },{
              check: 'selection',
              possible: 'r',
              complete: 'p'
            } ],
            collections: [ {
              collection: 'ot', /* tN|tW|tQ|tA|sQ|sN|whitepaper|apocrapha|epigrapha|pseudapigrapha' */ 
              books: [ {
                book:'rut',
                chapters: 'n',
                verses: 'm',
                milestones: [ {
                  tasks: []
                }],
                checks: [{
                  check: 'alignment',
                  possible: 'r',
                  complete: 'q'
                },{
                  check: 'selection',
                  possible: 'r',
                  complete: 'p'
                }],
              } ]
            }, {
              collection: 'nt',
              books: [ {
                book: 'mat',
                chapters: '...'
              } ] 
            } ]
          }, { 
            translation: 'obs',
            stories: [ {
              story: 1,
              milestones: [ {
                tasks: []
              } ],

            }]  
          }, {
            translation: 'ust'
          }, {
            translation: 'unt'
          }, {
            translation: 'ta',
            articles: [ {
              article: 'metaphor'
            }]
          } ]
        } 
      } ] 
    }, {
      sponsor: 'bcs',
      languages: []
    } ]
  };

  const booksOfBible = [ 
    'mat', 'mrk', 'luk', 'jhn', 
    'act', 
    'rom', '1co', '2co', 'gal', 'eph', 'php', 'col', '1th', '2th', '1ti', '2ti', 'tit', 'phm', 'heb', 
    'jas', 
    '1pe', '2pe', 
    '1jn', '2jn', '3jn', 
    'jud', 
    'rev', 
    'ot', 
      'gen', 'exo', 'lev', 'num', 'deu', 
      'jos', 'jdg', 'rut', '1sa', '2sa', '1ki', '2ki', '1ch', '2ch', 'ezr', 'neh', 'est', 'job', 
      'psa', 'pro', 'ecc', 'sng', 
      'isa', 'jer', 'lam', 'ezk', 'dan', 
      'hos', 'jol', 'amo', 'oba', 'jon', 'mic', 'nam', 'hab', 'zep', 'hag', 'zec', 'mal' 
  ];
  const docsOfProject = [
    "ult",
    "ust",
    "unt",
    "ta",
    "tw",
    "tn",
    "whtppr",
    "obs",
    "obs-tn",
    "obs-tq",
    "obs-tw",
    "tq",
    "sq",
    "sn",
    "app-str"
  ]

  var repo = "";
  repo = [ languageCode, release, 'rel' ].join( '_' );
  var dcsRawIssues = await getDCS( 'repos/bspidel/' + repo + '/issues' );

  if( dcsRawIssues.status < '300' ) {
    var justIssues = getJustIssues( dcsRawIssues.data );
  }
  
    //const current = projects.sponsors[0].languages;
//console.log( "getScheduleData: current project: " + JSON.stringify( current ) );

    // look for milestones and issues
    dcsRawIssues = await getDCS( 'repos/bspidel/' + repo + '/issues' );

    if( dcsRawIssues.status < '300' ) {
      justIssues = getJustIssues( dcsRawIssues.data );
    
console.log( "getScheduleData: repo: " + repo + " justIssues: " + JSON.stringify( justIssues ) );   

      //projects.sponsors[].languages[].milestones
      const sponsorIdx = projects.sponsors.findIndex( x => x.sponsor ===  'uW' );
//console.log( "getScheduleData: sponsorIdx: " + sponsorIdx );  
      const sponsorRef = projects.sponsors[ sponsorIdx ];
//console.log( "getScheduleData: sponsorRef: " + JSON.stringify( sponsorRef ) );

      var languageIdx = sponsorRef.languages.findIndex( x => x.languageCode === languageCode );

    if( languageIdx < 0 ) {
      languageIdx = sponsorRef.languages.push( { 
        languageCode: languageCode, 
        version: release, 
        owner: "bspidel", 
        category: { 
          translations: [] 
        } 
      } ) - 1;
    }

    const languageRef = sponsorRef.languages[ languageIdx ];
  
    // place in hierachy for release
    languageRef.milestones = justIssues;

    var collect = "";
//console.log( "getScheduleData: Initial project: " + JSON.stringify( projects ) );

    for( const translate of docsOfProject ) {
      if( [ 'ust', 'ult', 'unt' ].indexOf( translate ) >= 0 ) {
        collect = "nt";

        for( const book of booksOfBible ) {
          if( book === "ot" ) {
            collect = "ot";
            continue;
          }
        
          repo = [ languageCode, translate, book, 'book' ].join( '_' );
          dcsRawIssues = await getDCS( 'repos/bspidel/' + repo + '/issues' );

          if( dcsRawIssues.status < '300' ) {
            justIssues = getJustIssues( dcsRawIssues.data );  

            if( justIssues.length > 0 ) {
  //console.log(  "getScheduleData: translate: " + translate + ", collect: " + collect + ", book: " + book + ", issues: " + justIssues.length );
              //projects.sponsors[].languages[].category.translations[].collections[].books[].book.milestones
  //console.log(  "getScheduleData: languageRef: ",  JSON.stringify( languageRef ) );
              var translateIdx = myFindIndex( languageRef.category.translations, "translation", translate );

              if( translateIdx < 0 ) {
                translateIdx = languageRef.category.translations.push( { translation: translate } ) - 1;
              }

              const translationRef = languageRef.category.translations[ translateIdx ];

              if( ! translationRef.collections ) {
                translationRef.collections = [];
              }

              let collectIdx = myFindIndex( translationRef.collections, "collection", collect );

              if( collectIdx < 0 ) {
                collectIdx = translationRef.collections.push( { collection: collect, books: [] } ) - 1;
              }

  //console.log(  "getScheduleData: collectionIdx: " + collectionIdx );
              const collectionRef = translationRef.collections[ collectIdx ];

              var bookIdx = myFindIndex( collectionRef.books, "book", book );
  //console.log(  "getScheduleData: before bookIdx: ", bookIdx );

              if( bookIdx < 0 ) {
                bookIdx = collectionRef.books.push( { book: book, milestones: [] }) - 1;
              }
  //console.log(  "getScheduleData: collectionRef: ",  JSON.stringify( collectionRef ) );
  //console.log(  "getScheduleData: after bookIdx: ", bookIdx );
              const bookRef = collectionRef.books[ bookIdx ];
  //console.log( "getScheduleData: Mid Project: ", JSON.stringify( projects ) );  

              bookRef.milestones = justIssues;  
            } else {
              //console.log( "getScheduleData: No issues." );
            }
          } else {
            //console.log( "getScheduleData: No repo." );
          }
        }
      } else {
        repo = [ languageCode, collect ].join( '_' );
        dcsRawIssues = await getDCS( 'repos/bspidel/' + repo + '/issues' );

        if( dcsRawIssues.status < '300' ) {
          justIssues = getJustIssues( dcsRawIssues.data );
        }  

        if( justIssues.length > 0 ) {
          //console.log(  "getScheduleData: translate: " + translate + ", collect: " + collect + ", book: " + book + ", issues: " + justIssues.length );
                      //projects.sponsors[].languages[].category.translations[].collections[].books[].book.milestones
          //console.log(  "getScheduleData: languageRef: ",  JSON.stringify( languageRef ) );
          var translationIdx = myFindIndex( languageRef.category.translations, "translation", translate );

          if( translationIdx < 0 ) {
            translationIdx = languageRef.category.translations.push( { translation: translate } ) - 1;
          }

          const translationRef = languageRef.category.translations[ translationIdx ];

          if( ! translationRef.collections ) {
            translationRef.collections = [];
          }

          var collectionIdx = myFindIndex( translationRef.collections, "collection", collect );

          if( collectionIdx < 0 ) {
            collectionIdx = translationRef.collections.push( { collection: collect, books: [] } ) - 1;
          }

console.log(  "getScheduleData: collectionIdx: " + collectionIdx );
          const collectionRef = translationRef.collections[ collectionIdx ];
          collectionRef.milestones = justIssues;
        }  
      }
    }
  } 

console.log( "getScheduleData: Full Project: ", JSON.stringify( projects ) );  
  return projects;
}


function myFindIndex( obj, attr, val ) {
console.log( "myFindIndex: ", attr, val );

  return obj.findIndex( x => x[ attr ] === val )
}



