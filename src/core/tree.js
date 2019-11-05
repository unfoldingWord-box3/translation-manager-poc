// TBD make an RCL
// TBD convert to mui-datatable
// TBD normalize data
// Make Data structure
// extract from repos

// react
import React from 'react';
//mport { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
//material ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// treeview
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import TreeItemRow from '../components/tree-item-row';

const useStyles = makeStyles( theme => ({
root: {
  height: 216,
  flexGrow: 1,
  minWidth: 1000,
},
textField: {
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 200,
},
}));



export default function TreeAll() {
  const classes = useStyles();

return (
  <Container maxWidth="xl">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        unfoldingWord Project Manager POC
      </Typography>
      <Typography  gutterBottom>
        Interval: Monthly
      </Typography>
    </Box>

    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Projects">
        <TreeItem nodeId="2" label="Sponsor: uW">
          <TreeItem nodeId="3" label="Language: en">
            <TreeItem nodeId="4" label="Type: gl">
              <TreeItem nodeId="5" label="Translation: ULT">
                <TreeItem nodeId="6" label="Testament: OT">
                  <TreeItem nodeId="7" label="Check: All">
                    <TreeItemRow                 
                      progress="20%" scheduledDate="2017-05-24" completedDate=""
                      start="0"   scheduled="800"
                      started="0" yet="0" comp="30" early="0" project="770" behind="0" late="0"   
                      notes="Just getting started"    
                    />
                  </TreeItem>  
                  <TreeItem nodeId="11" label="Book: gen"> 
                    <TreeItem  nodeId="12"  label="Check: Text Complete" >
                      <TreeItemRow progress="20%" scheduledDate="2017-05-24" completedDate=""
                        start="0"   scheduled="200"
                        started="0" yet="30" comp="70" early="0" project="100" behind="30" late="0"   
                        notes="time shifted"    
                      />
                    </TreeItem>

{ /*                
                    <TreeItem  nodeId="14" label="Check: Internal Review" >
                    <TreeItemRow          
                      progress="0%" scheduledDate="2017-05-24" completedDate=""
                      start="30"   scheduled="300"
                      started="30" yet="0" comp="150" early="0" project="100" behind="0" late="0"  
                      notes="Projected to be under budget" 
                    >
                    </TreeItemRow>
                  </TreeItem>

                  <TreeItem nodeId="15" label="Book: rut">

                    <TreeItemRow                   
                      nodeId="17" 
                      label="Check: Text Complete"
                      progress="10%" scheduledDate="2017-05-24" completedDate=""
                      start="60"   scheduled="400"
                      started="60" yet="70" comp="100" early="0" project="230" behind="70" late="0"  
                      notes="Projected way over budget" 
                    >
                    </TreeItemRow>

                    <TreeItemRow 
                      nodeId="19" 
                      label="Check: Internal Review"
                      progress="30%" scheduledDate="2017-05-24" completedDate=""
                      start="90"   scheduled="300"
                      started="90" yet="0" comp="300" early="0" project="0" behind="0" late="50"  
                      notes="Finisthed a little late" 
                    >
                    </TreeItemRow>
                  </TreeItem>

                  <TreeItem nodeId="21" label="Book: jon">

                    <TreeItemRow 
                      nodeId="22" 
                      label="Check: Text Complete"
                      progress="0%" scheduledDate="2017-05-24" completedDate=""
                      start="110"   scheduled="300"
                      started="110" yet="0" comp="300" early="0" project="0" behind="0" late="0" 
                      notes="Finished on time"  
                    >
                    </TreeItemRow>

                    <TreeItemRow 
                      nodeId="24" 
                      label="Check: Internal Review"
                      progress="0%" scheduledDate="2017-05-24" completedDate=""
                      start="140"   scheduled="300"
                      started="140" yet="0" comp="250" early="50" project="0" behind="0" late="0" 
                      notes="Under budget"  
                    >
                    </TreeItemRow>
                  </TreeItem>
                </TreeItem>

                <TreeItem nodeId="21" label="Testament: NT">
                  <TreeItem nodeId="22" label="Book: mat">
                 
                    <TreeItemRow 
                      nodeId="26" 
                      label="Check: Text Complete"
                      progress="0%" scheduledDate="2017-05-24" completedDate=""
                      start="170"   scheduled="300"
                      started="170" yet="70" comp="0" early="0" project="0" behind="0" late="0"  
                      notes="Have not started and late" 
                    >
                    </TreeItemRow>

                    <TreeItemRow 
                      nodeId="28" 
                      label="Check: Internal Review"
                      progress="0%" scheduledDate="2017-05-24" completedDate=""
                      start="200"   scheduled="300"
                      started="200" yet="0" comp="0" early="0" project="0" behind="0" late="0"
                      notes="Scheduled"   
                    >
                    </TreeItemRow>

                    <TreeItem nodeId="30" label="Check: Text Complete" />
                    <TreeItem nodeId="31" label="Progress: 30%" />
                    <TreeItem nodeId="32" label="Check: Internal Review" />
                    <TreeItem nodeId="33" label="Progress: 0%" />
                  </TreeItem>  
                  <TreeItem nodeId="34" label="Book: mrk">
                    <TreeItem nodeId="35" label="Check: Text Complete" />
                    <TreeItem nodeId="36" label="Progress: 90%" />
                    <TreeItem nodeId="37" label="Check: Internal Review" />
                    <TreeItem nodeId="38" label="Progress: 30%" />
                  </TreeItem>
                  <TreeItem nodeId="39" label="Book: luk">
                    <TreeItem nodeId="40" label="Check: Text Complete" />
                    <TreeItem nodeId="41" label="Progress: 50%" />
                    <TreeItem nodeId="42" label="Check: Internal Review" />
                    <TreeItem nodeId="43" label="Progress: 10%" />
                  </TreeItem>
                </TreeItem>
                <TreeItem nodeId="44" label="Resource: OBS">
                  <TreeItem nodeId="45" label="Story: 1">
                    <TreeItem nodeId="46" label="Check: Text Complete" />
                    <TreeItem nodeId="47" label="Progress: 30%" />
                    <TreeItem nodeId="48" label="Check: Internal Review" />
                    <TreeItem nodeId="49" label="Progress: 0%" />
                  </TreeItem>  
                  <TreeItem nodeId="50" label="Story: 2">
                    <TreeItem nodeId="51" label="Check: Text Complete" />
                    <TreeItem nodeId="52" label="Progress: 90%" />
                    <TreeItem nodeId="53" label="Check: Internal Review" />
                    <TreeItem nodeId="54" label="Progress: 30%" />
                  </TreeItem>
                  <TreeItem nodeId="60" label="Story: 3">
                    <TreeItem nodeId="61" label="Check: Text Complete" />
                    <TreeItem nodeId="62" label="Progress: 50%" />
                    <TreeItem nodeId="63" label="Check: Internal Review" />
                    <TreeItem nodeId="6" label="Progress: 10%" />
                  </TreeItem>
                  <TreeItem nodeId="70" label="OBS: uTN">
                    <TreeItem nodeId="71" label="Check: Text Complete" />
                    <TreeItem nodeId="72" label="Progress: 50%" />
                    <TreeItem nodeId="73" label="Check: Internal Review" />
                    <TreeItem nodeId="74" label="Progress: 10%" />
                  </TreeItem>
                  <TreeItem nodeId="80" label="OBS: uTQ">
                    <TreeItem nodeId="81" label="Check: Text Complete" />
                    <TreeItem nodeId="82" label="Progress: 40%" />
                    <TreeItem nodeId="83" label="Check: Internal Review" />
                    <TreeItem nodeId="84" label="Progress: 0%" />
                  </TreeItem>
                  <TreeItem nodeId="90" label="OBS: uTW">
                    <TreeItem nodeId="91" label="Check: Text Complete" />
                    <TreeItem nodeId="92" label="Progress: 23%" />
                    <TreeItem nodeId="93" label="Check: Internal Review" />
                    <TreeItem nodeId="94" label="Progress: 2%" />
                  </TreeItem>
                </TreeItem>
                <TreeItem nodeId="100" label="Document: uTN">
                  <TreeItem nodeId="101" label="Check: Text Complete" />
                  <TreeItem nodeId="102" label="Progress: 30%" />
                  <TreeItem nodeId="103" label="Check: Internal Review" />
                  <TreeItem nodeId="104" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="110" label="Document: uTW">
                  <TreeItem nodeId="111" label="Check: Text Complete" />
                  <TreeItem nodeId="112" label="Progress: 30%" />
                  <TreeItem nodeId="113" label="Check: Internal Review" />
                  <TreeItem nodeId="114" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="120" label="Document: uTA">
                  <TreeItem nodeId="121" label="Check: Text Complete" />
                  <TreeItem nodeId="122" label="Progress: 30%" />
                  <TreeItem nodeId="123" label="Check: Internal Review" />
                  <TreeItem nodeId="124" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="130" label="Document: uTQ">
                  <TreeItem nodeId="131" label="Check: Text Complete" />
                  <TreeItem nodeId="132" label="Progress: 30%" />
                  <TreeItem nodeId="133" label="Check: Internal Review" />
                  <TreeItem nodeId="134" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="140" label="Document: uSN">
                  <TreeItem nodeId="141" label="Check: Text Complete" />
                  <TreeItem nodeId="142" label="Progress: 30%" />
                  <TreeItem nodeId="143" label="Check: Internal Review" />
                  <TreeItem nodeId="144" label="Progress: 0%" />
                </TreeItem>  
              </TreeItem>  
              <TreeItem nodeId="150" label="Translation: UST">
                <TreeItem nodeId="151" label="Testament: OT">
                  <TreeItem nodeId="152" label="Book: gen">
                    <TreeItem nodeId="153" label="Check: Text Complete" />
                    <TreeItem nodeId="154" label="Progress: 20%" />
                    <TreeItem nodeId="155" label="Check: Internal Review" />
                    <TreeItem nodeId="156" label="Progress: 5%" />
                  </TreeItem>
                  <TreeItem nodeId="160" label="Book: rut">
                    <TreeItem nodeId="161" label="Check: Text Complete" />
                    <TreeItem nodeId="162" label="Progress: 100%" />
                    <TreeItem nodeId="163" label="Check: Internal Review" />
                    <TreeItem nodeId="164" label="Progress: 90%" />
                  </TreeItem>  
                  <TreeItem nodeId="170" label="Book: jon">
                    <TreeItem nodeId="171" label="Check: Text Complete" />
                    <TreeItem nodeId="172" label="Progress: 90%" />
                    <TreeItem nodeId="173" label="Check: Internal Review" />
                    <TreeItem nodeId="174" label="Progress: 20%" />
                  </TreeItem>
                </TreeItem>
                <TreeItem nodeId="180" label="Testament: NT">
                  <TreeItem nodeId="181" label="Book: mat">
                    <TreeItem nodeId="182" label="Check: Text Complete" />
                    <TreeItem nodeId="183" label="Progress: 30%" />
                    <TreeItem nodeId="184" label="Check: Internal Review" />
                    <TreeItem nodeId="185" label="Progress: 0%" />
                  </TreeItem>  
                </TreeItem>
                <TreeItem nodeId="190" label="Resource: OBS">
                  <TreeItem nodeId="191" label="Story: 1">
                    <TreeItem nodeId="192" label="Check: Text Complete" />
                    <TreeItem nodeId="193" label="Progress: 30%" />
                    <TreeItem nodeId="194" label="Check: Internal Review" />
                    <TreeItem nodeId="195" label="Progress: 0%" />
                  </TreeItem>  
                  <TreeItem nodeId="200" label="Story: 2">
                    <TreeItem nodeId="201" label="Check: Text Complete" />
                    <TreeItem nodeId="202" label="Progress: 90%" />
                    <TreeItem nodeId="203" label="Check: Internal Review" />
                    <TreeItem nodeId="204" label="Progress: 30%" />
                  </TreeItem>
                  <TreeItem nodeId="210" label="OBS: uTN">
                    <TreeItem nodeId="211" label="Check: Text Complete" />
                    <TreeItem nodeId="212" label="Progress: 50%" />
                    <TreeItem nodeId="213" label="Check: Internal Review" />
                    <TreeItem nodeId="214" label="Progress: 10%" />
                  </TreeItem>
                  <TreeItem nodeId="220" label="OBS: uTQ">
                    <TreeItem nodeId="221" label="Check: Text Complete" />
                    <TreeItem nodeId="222" label="Progress: 40%" />
                    <TreeItem nodeId="223" label="Check: Internal Review" />
                    <TreeItem nodeId="224" label="Progress: 0%" />
                  </TreeItem>
                  <TreeItem nodeId="230" label="OBS: uTW">
                    <TreeItem nodeId="231" label="Check: Text Complete" />
                    <TreeItem nodeId="232" label="Progress: 23%" />
                    <TreeItem nodeId="233" label="Check: Internal Review" />
                    <TreeItem nodeId="234" label="Progress: 2%" />
                  </TreeItem>
                </TreeItem>
                <TreeItem nodeId="240" label="Document: uTN">
                  <TreeItem nodeId="241" label="Check: Text Complete" />
                  <TreeItem nodeId="242" label="Progress: 30%" />
                  <TreeItem nodeId="243" label="Check: Internal Review" />
                  <TreeItem nodeId="244" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="250" label="Document: uTW">
                  <TreeItem nodeId="251" label="Check: Text Complete" />
                  <TreeItem nodeId="252" label="Progress: 30%" />
                  <TreeItem nodeId="253" label="Check: Internal Review" />
                  <TreeItem nodeId="254" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="260" label="Document: uTA">
                  <TreeItem nodeId="261" label="Check: Text Complete" />
                  <TreeItem nodeId="262" label="Progress: 30%" />
                  <TreeItem nodeId="263" label="Check: Internal Review" />
                  <TreeItem nodeId="264" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="270" label="Document: uTQ">
                  <TreeItem nodeId="271" label="Check: Text Complete" />
                  <TreeItem nodeId="272" label="Progress: 30%" />
                  <TreeItem nodeId="273" label="Check: Internal Review" />
                  <TreeItem nodeId="274" label="Progress: 0%" />
                </TreeItem>  
                <TreeItem nodeId="280" label="Document: uSN">
                  <TreeItem nodeId="281" label="Check: Text Complete" />
                  <TreeItem nodeId="282" label="Progress: 30%" />
                  <TreeItem nodeId="283" label="Check: Internal Review" />
                  <TreeItem nodeId="284" label="Progress: 0%" />
                </TreeItem>  
              </TreeItem>  
              <TreeItem nodeId="290" label="Document: Whitepaper">
                <TreeItem nodeId="291" label="Check: Text Complete" />
                <TreeItem nodeId="292" label="Progress: 30%" />
                <TreeItem nodeId="293" label="Check: Internal Review" />
                <TreeItem nodeId="294" label="Progress: 0%" />
              </TreeItem>  
              <TreeItem nodeId="300" label="Document: app-strings">
                <TreeItem nodeId="300" label="Check: Text Complete" />
                <TreeItem nodeId="300" label="Progress: 30%" />
                <TreeItem nodeId="300" label="Check: Internal Review" />
                <TreeItem nodeId="300" label="Progress: 0%" />
              </TreeItem> 
              <TreeItem nodeId="310" label="Document: Recording">
                <TreeItem nodeId="311" label="Check: Audio Complete" />
                <TreeItem nodeId="312" label="Progress: 30%" />
                <TreeItem nodeId="313" label="Check: Internal Review" />
                <TreeItem nodeId="314" label="Progress: 0%" />
              </TreeItem> 
              <TreeItem nodeId="320" label="Resource: How to CCBT">
                <TreeItem nodeId="321" label="Check: Text Complete" />
                <TreeItem nodeId="322" label="Progress: 30%" />
                <TreeItem nodeId="323" label="Check: Internal Review" />
                <TreeItem nodeId="324" label="Progress: 0%" />
              </TreeItem> 
              <TreeItem nodeId="331" label="Document: Lexicon">
                <TreeItem nodeId="331" label="Check: Text Complete" />
                <TreeItem nodeId="331" label="Progress: 30%" />
                <TreeItem nodeId="331" label="Check: Internal Review" />
                <TreeItem nodeId="331" label="Progress: 0%" />
              </TreeItem> 
            </TreeItem> */ }
            </TreeItem>   </TreeItem>   </TreeItem>   </TreeItem> </TreeItem>  
          </TreeItem> 
        </TreeItem> 
      <TreeItem nodeId="340" label="Documents">
        <TreeItem nodeId="341" label="Material-UI">
          <TreeItem nodeId="342" label="src">
            <TreeItem nodeId="343" label="index.js" />
            <TreeItem nodeId="344" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  </Container>  
  );
}
