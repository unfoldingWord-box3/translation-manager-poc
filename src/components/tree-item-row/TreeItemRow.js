// react
  import React from 'react';

//material ui
  import { makeStyles } from '@material-ui/core/styles';
  import Box from '@material-ui/core/Box';
  //import TreeItem from '@material-ui/lab/TreeItem';

// dates
  import TextField from '@material-ui/core/TextField';

// table
  import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

  const useStyles = makeStyles( theme => ({
    root: {
      height: 216,
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
const { progress, scheduledDate, completedDate, 
        start, scheduled, started, yet, comp, early, project, behind, late, notes } = props;

return (
    <Table tableLayout='fixed'>
    <colgroup>
      <col style={ {width:'3%' } } />
      <col style={ {width:'3%' } } />
      <col style={ {width:'3%' } } />
      <col style={ {width:'60%'} } />
      <col style={ {width:'30%' } } />
    </colgroup>
      <TableHead>
        <TableCell> Progress  </TableCell>
        <TableCell> Scheduled </TableCell>
        <TableCell> Completed </TableCell>
        <TableCell> Status    </TableCell>
        <TableCell> Notes     </TableCell>
      </TableHead>

      <TableBody>
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
                  <div width="100%" >
                    <Box display="flex" flexDirection="column" flexWrap="nowrap"  css={{ maxWidth: 1000 }}>
                      <Box display="flex" flexDirection="row" alignContent="flex-start" css={{ maxWidth: 1000 }} >
                        {start    === "0" ? "" : <Box order={1} className={classes.bar} style={{ width: (start    -3)+ "px", backgroundColor: '#ffffff' }} >            </Box> }
                        {scheduled=== "0" ? "" : <Box order={2} className={classes.bar} style={{ width: (scheduled-3)+ "px", backgroundColor: '#608860' }} > Scheduled  </Box> }
                      </Box>   
                      <Box display="flex" flexDirection="row" alignContent="flex-start" css={{ maxWidth: 1000 }} >  
                        {started  === "0" ? "" : <Box order={1} className={classes.bar} style={{ width: (started-3)  + "px", backgroundColor: '#ffffff' }} >            </Box> }
                        {yet      === "0" ? "" : <Box order={2} className={classes.bar} style={{ width: (yet    -3)  + "px", backgroundColor: '#ffe599' }} > Yet        </Box> }
                        {comp     === "0" ? "" : <Box order={3} className={classes.bar} style={{ width: (comp   -3)  + "px", backgroundColor: '#00f200' }} > Comp       </Box> }
                        {project  === "0" ? "" : <Box order={4} className={classes.bar} style={{ width: (project-3)  + "px", backgroundColor: '#ff7400' }} > Proj       </Box> }
                        {early    === "0" ? "" : <Box order={5} className={classes.bar} style={{ width: (early  -3)  + "px", backgroundColor: '#cccccc' }} > Early      </Box> }
                        {behind   === "0" ? "" : <Box order={6} className={classes.bar} style={{ width: (behind -3)  + "px", backgroundColor: '#ff0000' }} > Behind     </Box> }
                        {late     === "0" ? "" : <Box order={7} className={classes.bar} style={{ width: (late   -3)  + "px", backgroundColor: '#f4cccc' }} > Late       </Box> }
                      </Box> 
                    </Box>
                  </div>
                </TableCell>
              </TableRow>
            </Table>
          </TableCell>
          <TableCell>
            <TextField id="standard-multiline-flexible" multiline defaultValue={notes} />  
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
);
}

