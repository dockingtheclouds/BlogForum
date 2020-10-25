import React from "react";
import {API, graphqlOperation} from 'aws-amplify'
import {getPost} from "../graphql/queries";
import {Loading} from "element-react";
import NewComment from "../components/NewComment"
import Link from "react-router-dom/Link";
import CommentList from "../components/CommentList";

class PostPage extends React.Component {
    state = {
        post: null,
        isLoading: true,
        searchResults: [],
        searchTerm: ""
    }

    componentDidMount() {
        this.handleGetPost();
    }

    handleGetPost = async () => {
        const input = {
            id: this.props.postId
        }
        const result = await API.graphql(graphqlOperation(getPost, input))
        console.log(result)
        this.setState({post: result.data.getPost, isLoading: false})
    }

    render() {
        const {post, isLoading} = this.state

        return isLoading ? (
            <Loading fullscreen={true}/>
        ) : (
            <>
                <Link className={"link"} to={`/blogs/${post.blogID}`}>
                    Back to Posts
                </Link>
                <div className={"blog-header"}>
                    <h1>
                        {post.title}
                    </h1>
                </div>
                <div className={'my-2'}>
                    <div>
                            <span className={"flex"} style={{
                                fontWeight: "400px",
                                position: "relative",
                                lineHeight: "2",
                                margin: "20px auto",
                                textAlign: "left",
                                width: "75%"
                            }}>
                                {post.body}
                            </span>
                    </div>
                </div>
                <NewComment postId={this.props.postId}/>
                <CommentList/>
            </>
        );
    }
}

export default PostPage;