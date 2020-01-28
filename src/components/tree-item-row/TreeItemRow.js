// react
  import React from 'react';

//material ui
  import { makeStyles } from '@material-ui/core/styles';
  //import Box from '@material-ui/core/Box';
  //import TreeItem from '@material-ui/lab/TreeItem';

// dates
  import TextField from '@material-ui/core/TextField';

// table
  import { Table, /* TableHead, TableBody, */ TableRow, TableCell } from '@material-ui/core';
  import ScheduleBox from '../schedule-box';
  
  
  /* height: 216, */
  const useStyles = makeStyles( theme => ({
    root: {
      height: 20,
      flexGrow: 1,
      minWidth: 1000,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150,
    },
    bar: {
      paddingLeft: '3px',
      marginBottom: '3px',
      height: '22px',
      borderWidth: 0, 
      margin: 0,
     
    }
    }));


export default function TreeItemRow(props) {
 
const classes = useStyles();
const { width, interval, progress, scheduledDate, completedDate, 
        start, duration, started, yet, comp, early, project, behind, late, notes } = props;

return (
  <>
    <TableRow>
      <TableCell>
        <TextField id="text" type="text" defaultValue={progress} /> 
      </TableCell>
      <TableCell>
        <TextField
          id="date"
          /* label="Scheduled" */
          type="date"
          defaultValue={scheduledDate} 
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="date"
          /* label="Completed" */
          type="date"
          defaultValue={completedDate} 
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell> 

      <TableCell> 
        <Table>
          <TableRow>
            <TableCell style={{ width: '100%' }}>
              <ScheduleBox interval={interval} 
                  width={width} start={start} duration={duration} 
                  started={started} yet={yet} comp={comp} early={early} project={project} behind={behind} late={late} />
            </TableCell>
          </TableRow>
        </Table>
      </TableCell>
      <TableCell>
        <TextField id="standard-multiline-flexible" multiline defaultValue={notes} />  
      </TableCell>
    </TableRow>
  </> 
);
}

