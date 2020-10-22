import React from 'react';
import {API, graphqlOperation} from 'aws-amplify'
import {createPost} from "../graphql/mutations";
import {Form, Button, Input, Notification} from "element-react";

const initialState = {
    title: '',
    body: '',
    isUploading: false
}

class NewPost extends React.Component {
    state = {
        ...initialState
    }

    handleAddPost = async () => {
        try {
            this.setState({isUploading: true})
            const input = {
                title: this.state.title,
                body: this.state.body,
                blogID: this.props.blogId
            }
            const result = await API.graphql(graphqlOperation(createPost, {input}))
            console.log("Create product", result)
            Notification({
                title: "Success",
                message: "Post successfully created",
                type: "success"
            })
            this.setState({...initialState})
        } catch (err) {
            console.error("Error adding product", err)
        }
    }

    render() {
        const {title, body, isUploading} = this.state
        return (
            <div className={"flex-center"}>
                <h2 className={"header"}>
                    Add New Post
                </h2>
                <div className={'post-input'}>
                    <Form className={"blog-header"}>
                        <Form.Item label={"Title"} className={'post-area'}>
                            <Input
                                type={"text"}
                                placeholder={"Title"}
                                value={title}
                                onChange={title => this.setState({title})}/>
                        </Form.Item>
                        <Form.Item label={"Post"} className={'post-area'}>
                            <Input
                                type={"textarea"}
                                rows={7}
                                cols={30}
                                placeholder={"Write your post here..."}
                                value={body}
                                onChange={body => this.setState({body})}
                            />
                        </Form.Item>
                        <Button disabled={!title || !body}
                                type={"primary"}
                                onClick={this.handleAddPost}
                                loading={isUploading}
                        >
                            {isUploading ? "Posting Blog" : "Add Post"}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewPost;