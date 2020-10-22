import React from "react";
import {Card, Loading, Icon} from "element-react";
import {graphqlOperation} from 'aws-amplify';
import {listPosts} from "../graphql/queries";
import {onCreatePost} from "../graphql/subscriptions";
import {Connect} from "aws-amplify-react";
import Link from "react-router-dom/Link";
import Error from "./Error";

const Post = ({searchResults}) => {
    const onNewPost = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        updatedQuery.listPosts.items = [
            newData.onCreateMarket,
            ...prevQuery.listPosts.items
        ]

        return updatedQuery
    }

    return (
        <Connect
            query={graphqlOperation(listPosts)}
            subscription={graphqlOperation(onCreatePost)}
            onSubscriptionMsg={onNewPost}
        >
            {({data, loading, errors}) => {
                if (errors.length > 0)
                    return <Error errors={errors}/>
                if (loading || !data.listPosts)
                    return <Loading fullscreen={true}/>
                const posts = searchResults.length > 0 ? searchResults : data.listPosts.items

                return (
                    <>
                        {searchResults.length > 0 ? (
                            <h2 className="text-green">
                                <Icon type={"success"}
                                      name={"check"}
                                      className={"icon"}/>
                                {searchResults.length} Results
                            </h2>
                        ) : (
                            <h2 className="header">
                                Posts
                            </h2>
                        )}

                        {posts.map(post => (
                            <div key={post.id} className={"my-2"}>
                                <Card
                                    bodyStyle={{
                                        padding: "0.7em",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div>
                                        <span className="flex">
                                            <Link className={"link"} to={`/posts/${post.id}`}>
                                                <h3 style={{
                                                    color: "#0278ae",
                                                    margin: "auto"
                                                }}>
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <span style={{
                                                color: '#709fb0',
                                                marginTop: "auto"
                                            }}>
                                                {post.owner}
                                            </span>
                                        </span>
                                        <div style={{color: 'var(--lightSquidInk)'}}>
                                            {post.body.substring(0, 100)}...
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </>
                )
            }}
        </Connect>
    )
}

export default Post;