import React from "react";
import {Button, Form, Input} from "element-react";

class PostSearch extends React.Component {

    render() {
        return (
            <div className={"blog-header"}>
                <h2>
                    Search For Post
                </h2>
                <Form inline={true}
                      onSubmit={this.props.handleSearch}>
                    <Form.Item>
                        <Input
                            placeholder={"search post by title..."}
                            value={this.props.searchTerm}
                            icon={'circle-cross'}
                            onIconClick={this.props.handleClearSearch}
                            onChange={this.props.handleSearchChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{backgroundColor: "#3797a4"}}
                            icon={"search"}
                            onClick={this.props.handleSearch}
                            loading={this.props.isSearching}
                        >
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default PostSearch;
