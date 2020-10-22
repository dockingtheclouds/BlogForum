import React from "react";
import {API, graphqlOperation} from 'aws-amplify'
import {getPost} from "../graphql/queries";
import {Card, Loading} from "element-react";
import Link from "react-router-dom/Link";

class PostPage extends React.Component {
    state = {
        post: null,
        isLoading: true,
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
        this.setState({post: result.data.getPost, isLoading: false}, () => {
            this.checkPostOwner();
        })
    }

    checkPostOwner = () => {
        const {user} = this.props
        const {post} = this.state
        if (user) {
            this.setState({isMarketOwner: user.username === post.owner})
        }
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

            </>
        );
    }
}

export default PostPage;