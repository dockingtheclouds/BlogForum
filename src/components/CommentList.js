import React from "react";
import {Card, Loading, Icon} from "element-react";
import {graphqlOperation} from 'aws-amplify';
import {listComments} from "../graphql/queries";
import {onCreateComment} from "../graphql/subscriptions";
import {Connect} from "aws-amplify-react";
import Error from "./Error";

const CommentList = () => {
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
            query={graphqlOperation(listComments)}
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
                        <h2 className="header">
                            Comments
                        </h2>
                        {comments.map(comment => (
                            <div key={comment.id} className={"my-2"}>
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