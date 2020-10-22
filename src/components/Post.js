import React from "react";
// prettier-ignore
import {Card} from "element-react";


class Post extends React.Component {
    state = {};

    render() {
        const {post} = this.props

        return (
            <div className={"card-container"}>
                <Card bodyStyle={{padding: 0, minWidth: '200px'}}>
                    <div className={"card-body"}>
                        <h3 className="m-0">{post.title}</h3>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Post;
