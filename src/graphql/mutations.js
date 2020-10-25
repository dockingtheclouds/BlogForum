/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        items {
          id
          title
          body
          blogID
          createdAt
          updatedAt
          owner
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        items {
          id
          title
          body
          blogID
          createdAt
          updatedAt
          owner
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        items {
          id
          title
          body
          blogID
          createdAt
          updatedAt
          owner
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      body
      blogID
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
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      body
      blogID
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
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      body
      blogID
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
      owner
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        title
        body
        blogID
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
        owner
      }
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        title
        body
        blogID
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
        owner
      }
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        title
        body
        blogID
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
        owner
      }
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
