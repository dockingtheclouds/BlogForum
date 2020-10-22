/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
      id
      name
      posts {
        items {
          id
          title
          body
          blogID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
      id
      name
      posts {
        items {
          id
          title
          body
          blogID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
      id
      name
      posts {
        items {
          id
          title
          body
          blogID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String!) {
    onCreatePost(owner: $owner) {
      id
      title
      body
      blogID
      owner
      createdAt
      blog {
        id
        name
        posts {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          content
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!) {
    onUpdatePost(owner: $owner) {
      id
      title
      body
      blogID
      owner
      createdAt
      blog {
        id
        name
        posts {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          content
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!) {
    onDeletePost(owner: $owner) {
      id
      title
      body
      blogID
      owner
      createdAt
      blog {
        id
        name
        posts {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          content
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      post {
        id
        title
        body
        blogID
        owner
        createdAt
        blog {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        updatedAt
      }
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      post {
        id
        title
        body
        blogID
        owner
        createdAt
        blog {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        updatedAt
      }
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      post {
        id
        title
        body
        blogID
        owner
        createdAt
        blog {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        updatedAt
      }
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
