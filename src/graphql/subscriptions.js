/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateBlock = /* GraphQL */ `
  subscription OnCreateBlock($filter: ModelSubscriptionBlockFilterInput) {
    onCreateBlock(filter: $filter) {
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
export const onUpdateBlock = /* GraphQL */ `
  subscription OnUpdateBlock($filter: ModelSubscriptionBlockFilterInput) {
    onUpdateBlock(filter: $filter) {
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
export const onDeleteBlock = /* GraphQL */ `
  subscription OnDeleteBlock($filter: ModelSubscriptionBlockFilterInput) {
    onDeleteBlock(filter: $filter) {
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
export const onCreateFollowing = /* GraphQL */ `
  subscription OnCreateFollowing(
    $filter: ModelSubscriptionFollowingFilterInput
  ) {
    onCreateFollowing(filter: $filter) {
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
export const onUpdateFollowing = /* GraphQL */ `
  subscription OnUpdateFollowing(
    $filter: ModelSubscriptionFollowingFilterInput
  ) {
    onUpdateFollowing(filter: $filter) {
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
export const onDeleteFollowing = /* GraphQL */ `
  subscription OnDeleteFollowing(
    $filter: ModelSubscriptionFollowingFilterInput
  ) {
    onDeleteFollowing(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
      id
      userID
      postID
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
      id
      userID
      postID
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
      id
      userID
      postID
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateUserChatRoom = /* GraphQL */ `
  subscription OnCreateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onCreateUserChatRoom(filter: $filter) {
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
export const onUpdateUserChatRoom = /* GraphQL */ `
  subscription OnUpdateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onUpdateUserChatRoom(filter: $filter) {
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
export const onDeleteUserChatRoom = /* GraphQL */ `
  subscription OnDeleteUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onDeleteUserChatRoom(filter: $filter) {
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
