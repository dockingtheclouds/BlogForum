import React from "react";
import {API, graphqlOperation} from "aws-amplify";
import {createComment} from "../graphql/mutations";
import {Button, Form, Input, Notification} from "element-react";
import {UserContext} from "../App";

const initialState = {
    content: "",
    isCommenting: false
}

class NewComment extends React.Component {
    state = {
        ...initialState
    }

    handleAddComment = async user => {
        try {
            this.setState({isCommenting: true})
            const input = {
                content: this.state.content,
                owner: user.username,
                postID: this.props.postId
            }
            const result = await API.graphql(graphqlOperation(createComment, {input}))
            console.log("Create comment", result)
            Notification({
                title: "Success",
                message: "Comment successfully created",
                type: "success"
            })
            this.setState({...initialState})
        } catch (err) {
            console.error("Error adding comment", err)
        }
    }

    render() {
        const {content, isCommenting} = this.state
        return (
            <UserContext.Consumer>
                {({user}) =>
                <>
                    <div className={"flex-center"}>
                        <h2 className={"header"}>
                            Add Comment
                        </h2>
                        <div className={'comment-input'}>
                            <Form className={"blog-header"}>
                                <Form.Item label={"Comments"} className={'comment-area'}>
                                    <Input
                                        type={"text"}
                                        placeholder={"What did you think?"}
                                        value={content}
                                        onChange={content => this.setState({content})}/>
                                </Form.Item>
                                <Button disabled={!content}
                                        type={"primary"}
                                        onClick={() => this.handleAddComment(user)}
                                        loading={isCommenting}
                                >
                                    {isCommenting ? "Posting Comment" : "Add Comment"}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </>}
            </UserContext.Consumer>
        );
    }
}

export default NewComment;