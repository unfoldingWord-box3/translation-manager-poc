Two rows are used to compare planned vs actual
Actual could have 9 parts 8 at a time
### Parts include
* Start - is delayed start of plan
* Duration - is length of plan
* Started - is delay of actual progress (defaults to start. Only useful if starting ahead of plan)
* Yet - is delay from plan from start
* comp - is days of plan completed
* Projected - days to complete
* Early - Projected days to complete early
* Behind - Projected days to complete late
* Late - Actualy completed late
### Features
* each part is optional by setting value to 0
* all parameters are in calendar days
* Width determines horizontal space of viewport
* Interval determines scale factor in days (Setting to 7 would indicate weeks, 30 would be months)
* Dolly indicates shift left to see future schedule
* Viewport is 1/4 of visualizable schedule
* A vertical bar indicates current date
* Scheduled before startdate are shifted to startdate

```js
<ScheduleBox 
  width='30'
  interval='1'
  dolly='0'
  current='3'
  dates='yes'
  start='0' 
  duration='12' 
  started='0' 
  yet='2' 
  comp='2' 
  project='2' 
  early='2'
  behind='2' 
  late='2' 
/>  
```
