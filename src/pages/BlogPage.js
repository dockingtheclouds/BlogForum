import React from "react";
import {API, graphqlOperation} from 'aws-amplify'
import {getBlog} from "../graphql/queries";
import Link from "react-router-dom/Link";
import {Loading, Tabs, Icon} from "element-react";
import NewPost from '../components/NewPost';
import Post from "../components/Post";


class BlogPage extends React.Component {
    state = {
        blog: null,
        isLoading: true,
        isBlogOwner: false
    };

    componentDidMount() {
        this.handleGetBlog();
    }

    handleGetBlog = async () => {
        const input = {
            id: this.props.blogId
        }
        const result = await API.graphql(graphqlOperation(getBlog, input))
        console.log(result)
        this.setState({blog: result.data.getBlog, isLoading: false}, () => {
            this.checkBlogOwner()
        })
    }

    checkBlogOwner = () => {
        const {user} = this.props
        const {blog} = this.state
        if (user) {
            this.setState({isBlogOwner: user.username === blog.owner})
        }
    }

    render() {
        const {blog, isLoading, isBlogOwner} = this.state;

        return isLoading ? (
            <Loading fullscreen={true}/>
        ) : (
            <>
                <Link className={"link"} to={"/"}>
                    Back to Blogs List
                </Link>

                {/*market metadata*/}
                <span className="items-center pt-2">
            <h2 className="mb-mr">{blog.name}</h2>- {blog.owner}
          </span>
                <div className={"items-center pt-2"}>
            <span style={{color: 'var(--lightSquidInk)', paddingBottom: "1em"}}>
              <Icon name="date" className={"icon"}/>
                {blog.createdAt}
            </span>
                </div>

                {/*New product area*/}
                <Tabs type={"border-card"} value={isBlogOwner ? "1" : "2"}>
                    {isBlogOwner && (
                        <Tabs.Pane
                            label={
                                <>
                                    <Icon name={"plus"} className={"icon"}/>
                                    Add Post
                                </>
                            }
                            name={"1"}
                        >
                            <NewPost blogId={this.props.blogId}/>
                        </Tabs.Pane>
                    )}

                    {/*Products list */}
                    <Tabs.Pane
                        label={
                            <>
                                Posts ({blog.posts.items.length})
                            </>
                        }
                        name={"2"}
                    >
                        <div className="post-list">
                            {blog.posts.items.map(post => (
                                <Post
                                    post={post}/>
                            ))}
                        </div>
                    </Tabs.Pane>

                </Tabs>
            </>
        )
    }
}

export default BlogPage;
