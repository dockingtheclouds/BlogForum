import React from "react";
import {graphqlOperation} from 'aws-amplify'
import {listBlogs} from "../graphql/queries";
import {onCreateBlog} from "../graphql/subscriptions";
import {Connect} from 'aws-amplify-react'
import {Card, Icon, Loading, Tag} from "element-react";
import Link from "react-router-dom/Link";
import Error from "./Error";


const BlogList = ({searchResults}) => {
    const onNewBlog = (prevQuery, newData) => {
        let updatedQuery = {...prevQuery}
        updatedQuery.listBlogs.items = [
            newData.onCreateBlog,
            ...prevQuery.listBlogs.items
        ]
        return updatedQuery
    }

    return (
        <Connect
            query={graphqlOperation(listBlogs)}
            subscription={graphqlOperation(onCreateBlog)}
            onSubscriptionMsg={onNewBlog}
        >
            {({data, loading, errors}) => {
                if (errors.length > 0)
                    return <Error errors={errors}/>
                if (loading || !data.listBlogs)
                    return <Loading fullscreen={true}/>
                const blogs = searchResults.length > 0 ? searchResults : data.listBlogs.items

                return (
                    <>
                        {searchResults.length > 0 ? (
                            <h2 className="text-green">
                                <Icon type={"success"}
                                      name={"check"}
                                      className={"icon"}/>
                                {searchResults.length} Results
                            </h2>
                        ) : (<h2 className="header">
                            Blogs
                        </h2>)}

                        {blogs.map(blog => (
                            <div key={blog.id} className={"my-2"}>
                                <Card
                                    bodyStyle={{
                                        padding: "0.7em",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div>
                                        <span className={"flex"}>
                                            <Link className={"link"} to={`/blogs/${blog.id}`}>
                                                {blog.name}
                                            </Link>
                                        </span>
                                        <div style={{color: 'var(--lightSquidInk)'}}>
                                            {blog.owner}
                                        </div>
                                    </div>
                                    <div>
                                        {blog.tags && blog.tags.map(tag => (
                                            <Tag key={tag} type={"danger"} className={"mx-1"}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </>
                )
            }}
        </Connect>
    )
};

export default BlogList;
