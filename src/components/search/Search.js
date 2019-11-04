import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResults';
import axios from 'axios';

class Search extends Component {
    state = {
        searchText: '',
        amount: '15',
        api: 'https://pixabay.com/api',
        key: '13948618-bd48ef98bc0dfbd9d99a226a2',
        images: []
    }

    onAmountChange = (e, index, value) => this.setState({ amount: value })


    onTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value },
            () => {
                axios.get(
                    `${this.state.api}/?key=${this.state.key}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount} `)
                    .then(res => this.setState({ images: res.data.hits }))
                    .catch(err => console.log(err))
            });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="search for images"
                    fullWidth={true}
                />
                <SelectField
                    floatingLabelText="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (
                    <ImageResults images={this.state.images} />
                ) : null}


            </div>
        )
    }


}

export default Search;