import React from "react";
import {API, graphqlOperation} from 'aws-amplify';
import {searchBlogs} from "../graphql/queries";
import NewBlog from "../components/NewBlog";
import BlogList from "../components/BlogList";

class HomePage extends React.Component {
    state = {
        searchTerm: "",
        searchResults: [],
        isSearching: false
    };

    handleSearchChange = searchTerm => this.setState({searchTerm})

    handleClearSearch = () => this.setState({searchTerm: "", searchResults: []})

    handleSearch = async event => {
        try {
            event.preventDefault();
            console.log(this.state.searchTerm);
            this.setState({isSearching: true})
            const result = await API.graphql(graphqlOperation(searchBlogs, {
                filter: {
                    or: [
                        {name: {match: this.state.searchTerm}},
                        {owner: {match: this.state.searchTerm}},
                        {tags: {match: this.state.searchTerm}}
                    ]
                }
            }))
            console.log(result)
            this.setState({
                searchResults: result.data.searchBlogs.items,
                isSearching: false
            })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        return(
            <>
                <NewBlog
                    searchTerm={this.state.searchTerm}
                    isSearching={this.state.isSearching}
                    handleSearchChange={this.handleSearchChange}
                    handleClearSearch={this.handleClearSearch}
                    handleSearch={this.handleSearch}
                />
                <BlogList
                    searchResults={this.state.searchResults}
                />
            </>
        )
    }
}

export default HomePage