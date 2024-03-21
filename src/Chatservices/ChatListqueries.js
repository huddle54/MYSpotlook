export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            updatedAt
            users {
              items {
                id
                user {
                  id
                  image
                  name
                }
              }
            }
            LastMessage {
              id
              text
              images
              createdAt
            }
          }
        }
      }
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            updatedAt
            users {
              items {
                id
                user {
                  id
                  image
                  name
                }
              }
            }
            LastMessage {
              id
              images
              text
              createdAt
            }
          }
        }
      }
    }
  }
`;
