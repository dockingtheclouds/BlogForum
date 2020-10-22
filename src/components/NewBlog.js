import React from "react";
import {API, graphqlOperation} from 'aws-amplify'
import {createBlog} from "../graphql/mutations";
import {Form, Button, Dialog, Input, Select, Notification} from 'element-react'
import {UserContext} from "../App";

class NewBlog extends React.Component {
    state = {
        name: "",
        tags: ['Art', 'Computers', 'Technology', 'DevOps', 'Entertainment', 'Sports'],
        selectedTags: [],
        options: [],
        addBlogDialog: false
    }

    handleAddBlog = async user => {
        try {
            this.setState({addBlogDialog: false})
            const input = {
                name: this.state.name,
                owner: user.username,
                tags: this.state.selectedTags
            }
            const result = await API.graphql(graphqlOperation(createBlog, {input}))
            console.log({result})
            console.log(`Created blog: id ${result.data.createBlog.id}`)
            this.setState({name: "", selectedTags: []})
        } catch (err) {
            console.log("Error adding Blog")
            Notification.error({
                title: "Error",
                message: `${err.message || "error adding blog"}`
            })
        }
    }

    handleFilterTags = query => {
        const options = this.state.tags
            .map(tag => ({value: tag, label: tag}))
            .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()))
        this.setState({options})
    }

    render() {
        return (
            <UserContext.Consumer>
                {({user}) => <>
                    <div className={"blog-header"}>
                        <h1 className={"blog-title"}>
                            Create Your Blog
                            <Button
                                type={"text"}
                                icon={"edit"}
                                className={"blog-title-button"}
                                onClick={() => this.setState({addBlogDialog: true})}/>
                        </h1>

                        <Form inline={true}
                              onSubmit={this.props.handleSearch}>
                            <Form.Item>
                                <Input
                                    placeholder={"search blogs..."}
                                    value={this.props.searchTerm}
                                    icon={"circle-cross"}
                                    onIconClick={this.props.handleClearSearch}
                                    onChange={this.props.handleSearchChange}/>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type={'info'}
                                    icon={'search'}
                                    onClick={this.props.handleSearch}
                                    loading={this.props.isSearching}
                                >
                                    Search
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <Dialog visible={this.state.addBlogDialog}
                            title={"Create New Blog"}
                            onCancel={() => this.setState({addBlogDialog: false})}
                            size={'large'}
                            customClass={'dialog'}
                    >
                        <Dialog.Body>
                            <Form labelPosition={"top"}>
                                <Form.Item label={"Add Blog Name"}>
                                    <Input
                                        placeholder={"Blog Name"}
                                        trim={true}
                                        onChange={name => this.setState({name})}/>
                                    value={this.state.name}
                                </Form.Item>
                                <Form.Item label={"Add tags"}>
                                    <Select multiple={true}
                                            filterable={true}
                                            placeholder={"Blog Tags"}
                                            onChange={selectedTags => this.setState({selectedTags})}
                                            remoteMethod={this.handleFilterTags}
                                            remote={true}
                                    >
                                        {this.state.options.map(option => (
                                            <Select.Option
                                                key={option.value}
                                                label={option.label}
                                                value={option.value}/>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => this.setState({addBlogDialog: false})}>
                                Cancel
                            </Button>
                            <Button type={'primary'}
                                    disabled={!this.state.name}
                                    onClick={() => this.handleAddBlog(user)}>
                                Add
                            </Button>
                        </Dialog.Footer>
                    </Dialog>
                </>
                }
            </UserContext.Consumer>
        )
    }
}

export default NewBlog;