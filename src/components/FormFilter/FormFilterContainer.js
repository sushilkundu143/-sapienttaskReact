import React from 'react'
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      padding: theme.spacing(1)
    },
    headingTitle: {
        marginBottom: '1rem'
    },
    FormLabelStyle: {
        margin: '1rem 0'
    }
  }))

function FormFilterContainer(props) {
    const classes = useStyles()
    // console.log("props:", props)
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Typography variant="h4" className={classes.headingTitle}>Filter</Typography>
            </ThemeProvider>
            <form>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.FormLabelStyle}>SPECIES</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.Human} onChange={props.handleChange} name="Human" value="Human" />
                        }
                        label="Human"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.Alien} onChange={props.handleChange} name="Alien" value="Alien" />
                        }
                        label="Alien"
                    />
                    </FormGroup>
                    <FormLabel component="legend" className={classes.FormLabelStyle}>GENDER</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.Male} type="checkbox" onChange={props.handleChange} name="Male" value="Male" />
                        }
                        label="Male"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.Female} onChange={props.handleChange} name="Female" value="Female" />
                        }
                        label="Female"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.unknown} onChange={props.handleChange} name="unknown" value="unknown" />
                        }
                        label="Unknown"
                    />
                    </FormGroup>
                    <FormLabel component="legend" className={classes.FormLabelStyle}>ORIGIN</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.OUnknown} type="checkbox" onChange={props.handleChange} name="OUnknown" value="OUnknown" />
                        }
                        label="Unknown"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={props.data.Earth} onChange={props.handleChange} name="Earth" value="Earth" />
                        }
                        label="Earth"
                    />
                    </FormGroup>
                </FormControl>
            </form>
        </React.Fragment>
    )
  }
    

// export default makeStyles(useStyles)(FormFilterContainer)
export default FormFilterContainer