import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

function SearchFilterContainer(props) {
    // console.log('props:', props)
    const classes = useStyles();
      const flatProps = {
        options: props.autodata.map(option => option.name),
      }
      
      const [value, setValue] = useState(null)
      const [order, setOrder] = useState('')

    function updateValue(e, v, type) {
        console.log('value:', v, type)
        if(type === 'search'){
            setValue(v)
            props.filters(v)
        } else if(type === 'select'){
            setOrder(e.target.value)
            props.orders(e.target.value)
        }
        
    }
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={1}>
            <Grid item xs={12} lg={10}>
            <FormControl className={classes.formControl}>
                <Autocomplete
                    {...flatProps}
                    inputValue={value}
                    id="search"
                    onChange={(e, v) => updateValue(e, v, 'search')}
                    renderInput={params => <TextField {...params} label="Search By Name" margin="normal" fullWidth />}
                />
            </FormControl>
            </Grid>
            <Grid item xs={12} lg={2}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Order By ID</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select" 
                        value={order}
                        onChange={(e, v) => updateValue(e, v, 'select')}
                        >
                        <MenuItem value={'ascending'}>Ascending</MenuItem>
                        <MenuItem value={'descending'}>Descending</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            </Grid>
        </form>
    )

}

export default SearchFilterContainer