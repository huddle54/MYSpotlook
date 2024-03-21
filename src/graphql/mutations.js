/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createBlock = /* GraphQL */ `
  mutation CreateBlock(
    $input: CreateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    createBlock(input: $input, condition: $condition) {
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
export const updateBlock = /* GraphQL */ `
  mutation UpdateBlock(
    $input: UpdateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    updateBlock(input: $input, condition: $condition) {
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
export const deleteBlock = /* GraphQL */ `
  mutation DeleteBlock(
    $input: DeleteBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    deleteBlock(input: $input, condition: $condition) {
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
export const createFollowing = /* GraphQL */ `
  mutation CreateFollowing(
    $input: CreateFollowingInput!
    $condition: ModelFollowingConditionInput
  ) {
    createFollowing(input: $input, condition: $condition) {
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
export const updateFollowing = /* GraphQL */ `
  mutation UpdateFollowing(
    $input: UpdateFollowingInput!
    $condition: ModelFollowingConditionInput
  ) {
    updateFollowing(input: $input, condition: $condition) {
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
export const deleteFollowing = /* GraphQL */ `
  mutation DeleteFollowing(
    $input: DeleteFollowingInput!
    $condition: ModelFollowingConditionInput
  ) {
    deleteFollowing(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createUserChatRoom = /* GraphQL */ `
  mutation CreateUserChatRoom(
    $input: CreateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    createUserChatRoom(input: $input, condition: $condition) {
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
export const updateUserChatRoom = /* GraphQL */ `
  mutation UpdateUserChatRoom(
    $input: UpdateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    updateUserChatRoom(input: $input, condition: $condition) {
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
export const deleteUserChatRoom = /* GraphQL */ `
  mutation DeleteUserChatRoom(
    $input: DeleteUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    deleteUserChatRoom(input: $input, condition: $condition) {
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
