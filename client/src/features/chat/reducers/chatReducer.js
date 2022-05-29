import {
  SHOW_CHAT,
  ADD_MESSAGE,
  SHOW_LIST
} from "../types";

import roomData from "../../../data/room_data.json"
import userData from "../../../data/user_data.json"

import { normalizeData } from "../../../common/utils";

const data = normalizeData(userData, roomData);

const newState = Object.assign({}, data);

const userIds = newState.users.allIds.filter(item => item !== 9953);
const roomIds = newState.chatRooms.allIds;

const users = userIds.map(item => newState.users.byIds[item]);
const lastMessageList = roomIds.map(item => {
  const length = newState.chatRooms.byIds[item].chatMessages.length;
  const messageId = newState.chatRooms.byIds[item].chatMessages[length - 1];

  return {
    [newState.chatRooms.byIds[item].user]: {
      lastMessages: newState.chatMessages.byIds[messageId].content,
      lastMessagesTimeStamp: Number(messageId.split("&")[1])
    }
  };
});

const initialState = {
  chatAllData: data,
  showChatData: {},
  showListData: {
    users,
    lastMessageList: Object.assign({}, ...lastMessageList)
  }
};

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CHAT: {
      const { id, roomId } = action.payload;
      const newState = Object.assign({}, state);

      if (id && roomId) {
        const messageId = newState.chatAllData.chatRooms.byIds[roomId].chatMessages;
        const userId = newState.chatAllData.users.byIds[id];
        const messages = messageId.map(item => newState.chatAllData.chatMessages.byIds[item]);

        return {
          ...newState,
          showChatData : {
            ...newState.showChatData,
            chatRooms: newState.chatAllData.chatRooms.byIds[roomId],
            chatMessages: messages,
            users: userId
          },
          chatAllData : {
            ...state.chatAllData,
            showChatView: !newState.chatAllData.showChatView
          }
        };
      }

      return {
        ...newState,
        chatAllData : {
          ...newState.chatAllData,
          showChatView: !newState.chatAllData.showChatView
        }
      };
    }
    case ADD_MESSAGE: {
      const { message, roomId } = action.payload;
      const newState = Object.assign({}, state);
      const messageId = `${roomId}#${message.id}&${message.timestamp}`;

      return {
        ...newState,
        chatAllData: {
          ...newState.chatAllData,
          chatRooms: {
            allIds: [...newState.chatAllData.chatRooms.allIds],
            byIds: {
              ...newState.chatAllData.chatRooms.byIds,
              [roomId]: {
                ...newState.chatAllData.chatRooms.byIds[roomId],
                chatMessages: [
                  ...newState.chatAllData.chatRooms.byIds[roomId].chatMessages,
                  messageId
                ]
              }
            }
          },
          chatMessages: {
            allIds: [...newState.chatAllData.chatMessages.allIds, messageId],
            byIds: {
              ...newState.chatAllData.chatMessages.byIds,
              [messageId]: {
                ...message
              }
            }
          }
        },
        showChatData: {
          ...newState.showChatData,
          chatRooms: {
            ...newState.showChatData.chatRooms,
            chatMessages: [
              ...newState.showChatData.chatRooms.chatMessages,
              messageId
            ]
          },
          chatMessages: [
            ...newState.showChatData.chatMessages,
              message
          ]
        }
      };
    }
    case SHOW_LIST: {
      const { keyword } = action.payload;
      const newState = Object.assign({}, state);

      const userIds = newState.chatAllData.users.allIds.filter(item => item !== 9953);
      const roomIds = newState.chatAllData.chatRooms.allIds;

      const users = userIds.map(item => newState.chatAllData.users.byIds[item]);
      const lastMessageList = roomIds.map(item => {
        const length = newState.chatAllData.chatRooms.byIds[item].chatMessages.length;
        const messageId = newState.chatAllData.chatRooms.byIds[item].chatMessages[length - 1];
        const id = newState.chatAllData.chatRooms.byIds[item].user;

        return {
          [id]: {
            lastMessages: newState.chatAllData.chatMessages.byIds[messageId].content,
            lastMessagesTimeStamp: Number(messageId.split("&")[1])
          }
        };
      });

      if (keyword) {
        const user = users.filter(item => item.name.toLowerCase() === keyword.toLowerCase());

        if (user.length === 0) {
          return {
            ...newState,
            showListData: "일치하는 검색어가 없습니다."
          };
        }

        const message = lastMessageList.filter(item => item[user[0].id]);

        return {
          ...newState,
          showListData: {
            users: user,
            lastMessageList: Object.assign({}, ...message)
          }
        };
      }

      return {
        ...newState,
        showListData: {
          users,
          lastMessageList: Object.assign({}, ...lastMessageList)
        }
      };
    }
    default:
      return Object.assign({}, state);
  }
}

export default chatReducer;
