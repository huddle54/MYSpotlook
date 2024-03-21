/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      image
      email
      bio
      posts {
        items {
          id
          content
          image
          userID
          username
          name
          user {
            id
            username
            name
            image
            email
            bio
            createdAt
            updatedAt
          }
          likes {
            items {
              id
              userID
              postID
              createdAt
              updatedAt
            }
            nextToken
          }
          comments {
            items {
              id
              postID
              userID
              text
              username
              name
              image
              createdAt
              updatedAt
              user {
                id
                username
                name
                image
                email
                bio
                createdAt
                updatedAt
              }
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      following {
        items {
          id
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      blockedBy {
        items {
          id
          userID
          blockedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      blockedUsers {
        items {
          id
          userID
          blockedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          images
          TTL
          updatedAt
        }
        nextToken
      }
      ChatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          images
          TTL
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          user {
            id
            username
            name
            image
            email
            bio
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        TTL
        updatedAt
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        Messages {
          nextToken
        }
        users {
          nextToken
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          images
          TTL
          updatedAt
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      createdAt
      text
      chatroomID
      userID
      images
      TTL
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        images
        TTL
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBlock = /* GraphQL */ `
  query GetBlock($id: ID!) {
    getBlock(id: $id) {
      id
      userID
      blockedUserID
      user {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      blockedUser {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBlocks = /* GraphQL */ `
  query ListBlocks(
    $filter: ModelBlockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        blockedUserID
        user {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        blockedUser {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollowing = /* GraphQL */ `
  query GetFollowing($id: ID!) {
    getFollowing(id: $id) {
      id
      followerID
      followingID
      follower {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      following {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFollowings = /* GraphQL */ `
  query ListFollowings(
    $filter: ModelFollowingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        followerID
        followingID
        follower {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        following {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      content
      image
      userID
      username
      name
      user {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          postID
          userID
          text
          username
          name
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        image
        userID
        username
        name
        user {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        comments {
          items {
            id
            postID
            userID
            text
            username
            name
            image
            createdAt
            updatedAt
            user {
              id
              username
              name
              image
              email
              bio
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      userID
      text
      username
      name
      image
      user {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      post {
        id
        content
        image
        userID
        username
        name
        user {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        userID
        text
        username
        name
        image
        user {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        post {
          id
          content
          image
          userID
          username
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserChatRoom = /* GraphQL */ `
  query GetUserChatRoom($id: ID!) {
    getUserChatRoom(id: $id) {
      id
      userID
      chatRoomID
      user {
        id
        username
        name
        image
        email
        bio
        posts {
          nextToken
        }
        following {
          nextToken
        }
        blockedBy {
          nextToken
        }
        blockedUsers {
          nextToken
        }
        Messages {
          nextToken
        }
        ChatRooms {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
        }
        users {
          nextToken
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          images
          TTL
          updatedAt
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserChatRooms = /* GraphQL */ `
  query ListUserChatRooms(
    $filter: ModelUserChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatRoomID
        user {
          id
          username
          name
          image
          email
          bio
          createdAt
          updatedAt
        }
        chatRoom {
          id
          name
          image
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMessagesByChatRoom = /* GraphQL */ `
  query ListMessagesByChatRoom(
    $chatroomID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByChatRoom(
      chatroomID: $chatroomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        images
        TTL
        updatedAt
      }
      nextToken
    }
  }
`;
