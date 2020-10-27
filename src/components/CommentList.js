import React from "react";
import {Card, Loading} from "element-react";
import { graphqlOperation} from 'aws-amplify';
import {listComments} from "../graphql/queries";
import {onCreateComment} from "../graphql/subscriptions";
import {Connect} from "aws-amplify-react";
import Error from "./Error";

const CommentList = ({postId}) => {

    const onNewComment = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        updatedQuery.listComments.items = [
            newData.onCreateComment,
            ...prevQuery.listComments.items
        ]

        return updatedQuery
    }

    return (
        <Connect
            query={graphqlOperation(listComments, {
                filter: {
                    postID: {eq: postId}
                }
            })}
            subscription={graphqlOperation(onCreateComment)}
            onSubscriptionMsg={onNewComment}
        >
            {({data, loading, errors}) => {
                if (errors.length > 0)
                    return <Error errors={errors}/>
                if (loading || !data.listComments)
                    return <Loading fullscreen={true}/>
                const comments = data.listComments.items

                return (
                    <>
                        <h2 className="header"
                            style={{
                                width: "813px",
                                position: "relative",
                                margin: "auto"
                            }}
                        >
                            Comments
                        </h2>
                        {comments.map(comment => (
                            <div key={comment.id} className={"my-2"}>
                                <Card style={{
                                    border: "1px solid #d1dbe5",
                                    width: "813px",
                                    position: "relative",
                                    margin: "auto",
                                    borderRadius: "4px",
                                    backgroundColor: "#fff",
                                    overflow: "hidden",
                                    boxShadow: "0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)"
                                }}
                                    bodyStyle={{
                                        padding: "0.7em",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div>
                                        <span className="flex">
                                            <h3 style={{
                                                color: "#0278ae",
                                                margin: "0"
                                            }}>
                                                {comment.owner}
                                            </h3>
                                        </span>
                                        <div style={{color: 'var(--lightSquidInk)'}}>
                                            {comment.content}
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

export default CommentList;