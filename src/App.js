import './App.css';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 400,
    margin: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const App = () => {
  const classes = useStyles();

  //MAIN RADIO BUTTON
  const courseData = [
    {
      id: 1,
      name: 'Technical Report Writing',
    },
    {
      id: 2,
      name: 'English Literature',
    },
    {
      id: 3,
      name: 'Computer Sciences',
    },
  ];
  const [value, setValue] = React.useState(1);

  const handleChange = event => {
    setValue(Number(event.target.value));
  };

  //SUBJECT DATA AND SELECTION
  const subjectData = [
    {
      id: 1,
      values: [
        { id: 1, name: 'Short Reports' },
        { id: 2, name: 'Annual Reports' },
        { id: 3, name: 'Presentations' },
      ],
    },
    {
      id: 2,
      values: [
        { id: 1, name: 'Poetry' },
        { id: 2, name: 'Short Stories' },
        { id: 3, name: 'Drama' },
      ],
    },
    {
      id: 3,
      values: [
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'Desktop Software Development' },
        { id: 3, name: 'Research and Analysis' },
      ],
    },
  ];

  const [subject, setSubject] = React.useState(1);

  const handleChangeSelect = event => {
    setSubject(event.target.value);
  };

  //DATE

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  //TEXTINPUT

  const [textValue, setTextValue] = React.useState('');

  //isLoading
  const [isLoading, setIsLoading] = React.useState(false);

  //snakebar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  //SUBMIT FORM
  const submitForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      let selectedCourseName = courseData.find(e => e.id === value).name,
        selectedSubjectName = subjectData
          .find(e => e.id === value)
          .values.find(e => e.id === subject).name;

      // setOpen(true);
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="mainWrap">
      <FormControl
        fullWidth={true}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Course</FormLabel>
        <RadioGroup
          aria-label="Course"
          name="Course"
          value={value}
          onChange={handleChange}
        >
          {courseData.map((e, i) => {
            return (
              <FormControlLabel
                key={i}
                value={e.id}
                control={<Radio color="primary" />}
                label={e.name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth={true} className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>

        {subjectData.map((e, i) => {
          if (e.id == value) {
            return (
              <Select
                key={i}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subject}
                onChange={handleChangeSelect}
              >
                {e.values.map((subject, i) => {
                  return (
                    <MenuItem key={i} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  );
                })}
              </Select>
            );
          }
        })}
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl fullWidth={true} className={classes.formControl}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Start Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
      <FormControl fullWidth={true} className={classes.formControl}>
        <TextField
          id="standard-multiline-static"
          label="Additional Notes"
          multiline
          rows="4"
          defaultValue={textValue}
          onChange={event => setTextValue(event.target.value)}
        />
      </FormControl>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Button
        onClick={() => submitForm()}
        variant="contained"
        color={isLoading ? 'default' : 'primary'}
        style={{ margin: 8 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="primary" /> : 'SUBMIT'}
      </Button>
    </div>
  );
};

export default App;
