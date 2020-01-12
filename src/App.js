import React from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormFilterContainer from './components/FormFilter/FormFilterContainer'
import CardMemes from './components/GridCards/CardMemes'
import SearchFilterContainer from './components/SearchFilter/SearchFilterContainer'
import Chip from '@material-ui/core/Chip'
import _ from 'lodash'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            datas: [],
            rowdata: [],
            filters: {
                Human: false,
                Alien: false,
                Male: false,
                Female: false,
                unknown: false,
                OUnknown: false,
                Earth: false
            },
            filterdata: [],
            selectedfilters: []
        }
    }
    componentDidMount() {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    rowdata: res.results, 
                    datas: res.results, 
                    filterdata: res.results
                })
            })
    }
    orders = (type) => {
        this.setState(prevState => {
            return {
                datas: type === 'ascending'
                    ? _.orderBy(prevState.datas, ['id'], ['asc'])
                    : _.orderBy(prevState.datas, ['id'], ['desc'])
            }
        })
    }
    namefilter = (name) => {
        this.setState(prevState => {
            return {
                datas: name
                    ? _.filter(prevState.datas, {'name': name})
                    : prevState.filterdata
            }
        })
    }
    handleDelete = (e, item) => {
        this.setState(prevState => {
            return {
                selectedfilters: prevState
                    .selectedfilters
                    .filter(x => x !== item),
                filters: {
                    ...prevState.filters,
                    [item]: false
                }
            }
        }, () => {
            let filterdataresult = []
            let data = []
            let selectedfilters = this
                .state
                .selectedfilters
                .filter(x => x !== item)

            for (const filter of selectedfilters) {
                data = (filter === 'Human' || filter === 'Alien')
                    ? _.filter(this.state.rowdata, {'species': filter})
                    : (filter === 'Male' || filter === 'Female' || filter === 'Unknown')
                        ? _.filter(this.state.rowdata, {'gender': filter})
                        : _.filter(this.state.rowdata, {'origin': filter})
                filterdataresult.push(...data)
            }
            if(selectedfilters.length <= 0) {
                filterdataresult = this.state.rowdata
            }
            filterdataresult = _.uniqBy(filterdataresult, 'id')
            this.setState(prevState => {
                return {
                    datas: filterdataresult
                }
            })
        })
    }
    handleChange = (event) => {
        const {name, checked} = event.target
        this.setState(prevState => {
                let selectedfilter = _.includes(prevState.selectedfilters, name) === true
                    ? prevState
                        .selectedfilters
                        .filter(o => o !== name)
                    : [
                        ...prevState.selectedfilters,
                        name
                    ]
                return {
                    filters: {
                        ...prevState.filters,
                        [name]: checked
                    },
                    selectedfilters: selectedfilter
                }
            }, () => {
                let filterdataresult = []
                let selectedfilters = this.state.selectedfilters
                let rowdata = this.state.rowdata
                let filterobj = {}
                for (let filter of selectedfilters) {
                    if (filter === 'Human' || filter === 'Alien'){
                        if(filterobj.hasOwnProperty('species')) {
                            filterobj.species.push(filter)
                        } else {
                            filterobj.species = []
                            filterobj.species.push(filter)
                        }
                    } else if (filter === 'Male' || filter === 'Female' || filter === 'unknown'){
                        if(filterobj.hasOwnProperty('gender')){
                            filterobj.gender.push(filter)
                        } else {
                            filterobj.gender = []
                            filterobj.gender.push(filter)
                        }
                    } else {
                        if(filter === 'OUnknown') filter = 'unknown'
                        if(filterobj.hasOwnProperty('origin')){
                            filterobj.origin.push(filter)
                        } else {
                            filterobj.origin = []
                            filterobj.origin.push(filter)
                        }
                    }
                 }
                console.log('filterobj:', filterobj)
                let filterdataobj = {species: [], gender: [], origin: []}
                _.forOwn(filterobj, function(value, key) { 
                    if (key === 'species') {
                        _.forEach(value, v => {
                            filterdataobj.species.push(..._.filter(rowdata, (data) => data.species.includes(v)))
                        })  
                    } else if(key === 'gender') {
                        _.forEach(value, v => {
                            filterdataobj.gender.push(..._.filter(rowdata, (data) => data.gender.includes(v)))
                        })  
                    }  else if(key === 'origin') {
                        _.forEach(value, v => {
                            filterdataobj.origin.push(..._.filter(rowdata, (data) => data.origin.name.includes(v)))
                        })
                    }
                } )
                _.mapKeys(filterdataobj, function(value, key) {
                    if(value.length > 0){
                        filterdataresult.push(value)
                    }
                  });
                  console.log('filterdataresult:', filterdataresult)
                filterdataresult = _.size(filterdataresult) === 1 ? filterdataresult[0] :  _.size(filterdataresult) === 2 ?  _.intersectionWith(filterdataresult[0],filterdataresult[1], _.isEqual) : _.intersectionWith(filterdataresult[0],filterdataresult[1], filterdataresult[2], _.isEqual)
                console.log('filterdataobj:', filterdataobj, filterdataresult)
                this.setState(prevState => {
                    return {
                        datas:  _.size(filterobj) > 0 ?   filterdataresult : this.state.rowdata
                    }
                })
            })
    }

    render() {
        const filtertags = this
            .state
            .selectedfilters
            .map((item, i) => (<Chip
                label={item}
                key={i}
                onDelete={(e) => this.handleDelete(e, item)}
                style={{
                margin: 4
            }}
                color="primary"/>))
        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={2}>
                            <FormFilterContainer
                                data={this.state.filters}
                                handleChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={12} lg={10}>
                            {this.state.selectedfilters.length > 0 && (
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h1>Search Filter:</h1>
                                        {filtertags}
                                    </Grid>
                                </Grid>
                                )
                            }
                            <SearchFilterContainer
                                autodata={this.state.datas}
                                filters={this.namefilter}
                                orders={this.orders}/>
                            <CardMemes datas={this.state.datas}/>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

export default App
