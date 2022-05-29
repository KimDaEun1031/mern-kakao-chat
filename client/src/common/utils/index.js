export function normalizeData(userData, roomData) {
  const initialState = {
    chatRooms: {
      allIds: [],
      byIds: {}
    },
    chatMessages: {
      allIds: [],
      byIds: {}
    },
    users: {
      allIds: [],
      byIds: {}
    },
    showChatView: false
  };

  const newState = Object.assign({}, initialState);

  const chatRoomsById = roomData.map(item => {
    return {
      [item.room_id]: {
        id: item.room_id,
        user: item.users.user_id,
        chatMessages: item.chat.map(data => `${item.room_id}#${data.user_id}&${data.timestamp}`)
      }
    };
  });

  const chatMessagesById = roomData.map(item => {
    return item.chat.map(chatData => {
      return {
        [`${item.room_id}#${chatData.user_id}&${chatData.timestamp}`]: {
          id: chatData.user_id,
          content: chatData.content,
          timestamp: chatData.timestamp
        }
      };
    });
  }).flat();

  const usersById = userData.map(item => {
    return {
      [item.user_id]: {
        id: item.user_id,
        name: item.user_name,
        profile: item.user_profile
      }
    };
  });

  return {
    ...newState,
    chatRooms : {
      ...newState.chatRooms,
      allIds: roomData.map(item => item.room_id),
      byIds: Object.assign({}, ...chatRoomsById)
    },
    chatMessages : {
      ...newState.chatMessages,
      allIds: roomData.map(item => item.chat.map(chatData => `${item.room_id}#${chatData.user_id}&${chatData.timestamp}`)).flat(),
      byIds: Object.assign({}, ...chatMessagesById)
    },
    users : {
      ...newState.users,
      allIds: userData.map(item => item.user_id),
      byIds: Object.assign({}, ...usersById)
    }
  };
}

export function timeStampToDate(timeStamp) {
  const date = new Date(Number(timeStamp));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timeDivision = hour < 12 ? "오전" : "오후";

  return `${year}년 ${month}월 ${day}일 ${timeDivision} ${hour}시 ${minute}분`;
}
