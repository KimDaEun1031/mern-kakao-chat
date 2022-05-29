# React Chat App 구현
![asfeafsdafsdfadaf](https://user-images.githubusercontent.com/73865700/164135850-c1cf5f52-77cf-49ed-9268-7dc961bac77e.PNG)
> NOTE

> - React와 Redux를 사용하여 Chat Application을 구현하였습니다.
> - Header : 검색 기능과 친구 목록, 채팅 목록을 이동할 수 있는 기능을 포함하였습니다.
> - Main : 친구 목록 페이지는 친구 목록과 이름 기준 정렬 기능, 채팅 화면 open 기능을 포함하였습니다.
> - Main : 채팅 목록 페이지는 채팅방 목록과 채팅 화면 open 기능을 포함하였습니다.
> - Main : 채팅 페이지는 메시지 추가 기능과 채팅 화면 close 기능을 포함하였습니다.
> - Netlify 배포 : 미정
> - Test Code 작성 : 미정

# React Chat App TODO : 구현 완료
- [x] 친구 목록 페이지, 채팅 목록 페이지, 채팅 페이지가 있습니다.
- [x] 친구 목록 페이지에는 채팅 목록으로 이동할 수 있는 버튼이 있어야 합니다.
- [x] 친구 목록 페이지에는 친구 이름, 사진과 함께 채팅을 시작할 수 있는 버튼이 있어야 합니다.
- [x] 친구 목록 페이지에 있는 대화하기 버튼을 이용해 친구와의 채팅 페이지로 바로 이동 할 수 있습니다.
- [x] 친구 목록은 이름을 기준으로 오름차순 또는 내림차순 정렬할 수 있는 기능이 있어야 합니다.
- [x] 친구 목록에 있는 검색창을 이용해 친구 이름을 기준으로 검색할 수 있는 기능이 있어야 합니다.
- [x] 채팅 목록에는 진행중인 채팅이 날짜 순으로 나열되어야 합니다. (최신 닐짜가 상위)
- [x] 채팅 목록 페이지에는 친구 목록으로 이동할 수 있는 버튼이 있어야 합니다.
- [x] 채팅 목록에는 진행 중인 채팅의 친구 이름, 가장 최신 메시지의 첫 30글자, 가장 최신 메시지 전송 날짜가 표기되어야 합니다.
- [x] 채팅 목록에서 채팅을 선택하면 채팅 페이지로 이동합니다.
- [x] 채팅 페이지에는 상대방과 나눈 대화가 시간 순으로 나열되어야 합니다. 상대방 이름, 메시지 내용, 전송 날짜 및 시간이 모두 표기되어야 합니다.
- [x] 채팅 페이지는 별도 URL이 없습니다.
- [x] 채팅 페이지에서 메시지를 전송할 경우, 현재 채팅 페이지와 채팅 목록 페이지에 새로운 메시지가 반영되어야 합니다. (서버가 없으므로 전송된 메시지를 화면에 표기하는 것은 가능하지만, 메시지 수신은 불가능합니다.)
- [x] 페이지 새로고침에 대한 대응은 하지 않아도 괜찮습니다.
- [x] 초기 어플리케이션 상태에서 나타나는 친구 및 채팅 데이터는 직접 JSON 파일 형식으로 만들어 사용하세요.

# React Chat App Description
### Project directory tree

```
.
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│  
├─node_modules
├─public
│      favicon.ico
│      index.html
│
└─src
    │  index.js
    │  setupTests.js
    │
    ├─app
    │      App.js
    │      configureStore.js
    │
    ├─common
    │  └─utils
    │          index.js
    │
    ├─components
    │  ├─Chat
    │  │      Chat.js
    │  │      ChattingList.js
    │  │      FriendList.js
    │  │      Message.js
    │  │
    │  ├─Header
    │  │      Header.js
    │  │
    │  ├─NotFound
    │  │      NotFound.js
    │  │
    │  └─shared
    │          Button.js
    │          Container.js
    │          Image.js
    │          Input.js
    │          List.js
    │          Ul.js
    │
    ├─data
    │      room_data.json
    │      user_data.json
    │
    └─features
        └─chat
            │  actions.js
            │  index.js
            │  types.js
            │
            └─reducers
                    chatReducer.js
                    toggleReducer.js
```

#### 1. app
App 컴포넌트와 redux의 store 컴포넌트가 있는 폴더입니다.

#### 2. common/utils
공용으로 사용하는 함수를 저장하는 폴더입니다. 데이터를 정규화해주는 함수와 타임스탬프를 날짜로 변환해주는 함수가 있습니다.

#### 3. components
#### 3-1. Chat
메인 화면을 구성하는데 사용되는 컴포넌트인 Chat, ChattingList, FriendList, Message 컴포넌트가 있는 폴더입니다.
- Chat.js : 채팅 화면을 보여주는 컴포넌트입니다. Message 컴포넌트와 합성되어 있습니다.
- ChattingList.js : 채팅 목록을 보여주는 컴포넌트입니다. 최근 날짜 순으로 정렬되어 있습니다.
- FriendList.js : 친구 목록을 보여주는 컴포넌트입니다. 이름을 기준으로 오름차순과 내림차순으로 정렬할 수 있습니다.
- Message.js : 메시지를 보여주는 컴포넌트입니다. 이름, 메시지, 날짜를 보여줍니다.

#### 3-2. Header
Header를 구성하는데 사용되는 컴포넌트가 있는 폴더입니다.
- Header : 이름 검색을 통해 ChattingList, FriendList에서 알맞는 이름이 있다면 해당 이름의 친구와 채팅방을 볼 수 있습니다.  채팅 목록과 친구 목록을 번갈아 갈 수 있는 버튼이 존재합니다.

#### 3-3. NotFound
404 에러 페이지를 띄울 때 사용되는 컴포넌트가 있는 폴더입니다.
- NotFound : 잘못된 경로로 이동했을 때 보여주는 컴포넌트입니다. 돌아가기 버튼을 사용해 처음 위치로 돌아갈 수 있습니다.

#### 3-4. shared
공용으로 사용하는 styled-component인 Button, Container, Image, Input, List, Ul 컴포넌트가 있는 폴더입니다.

#### 4. data
애플리케이션 작동을 위한 mock data를 모아둔 컴포넌트가 있는 폴더입니다.
- room_data.json : 채팅방 데이터입니다. 방 아이디와 방 안에 있는 유저의 아이디, 날짜 순으로 나열된 메시지가 각 방 아이디 별로 나열되어 있습니다. 방 안에 있는 유저는 자기자신을 뺀 모든 유저입니다. 현재 1명으로만 구성되어 있습니다.
- user_data.json : 채팅방과 이어져 있는 유저 데이터입니다. 채팅방이 생성되어 있는 유저들의 유저 아이디와 이름, 프로필 사진이 들어가있습니다.

#### 5. features/chat
redux 사용을 위한 actions, index, types 컴포넌트와 reducer 폴더가 있는 폴더입니다.

#### 5-1. reducer
채팅 관련 chatReducer 와 토글 관련 toggleReducer 컴포넌트가 있는 폴더입니다.
- chatReducer : 초기값으로 chatAllData, showChatData, shoWListData가 존재합니다.
    - initialState
        - chatAllData : 정규화된 mock data의 데이터가 들어가있습니다. 채팅 데이터의 모든 데이터를 수집합니다.
        - showChatData : 채팅 화면으로 들어갈 시 해당 방 아이디에 맞는 채팅 메시지들과 유저를 수집한 데이터입니다.
        - showListData : 채팅 목록과 친구 목록에서 쓰이는 데이터입니다. 유저와 마지막 메세지, 마지막 타임스탬프가 들어가있습니다.
    - type
        - SHOW_CHAT : 채팅 화면을 토글 가능하며, 채팅 화면에 채팅 데이터를 뿌려줍니다.
        - ADD_MESSAGE : 채팅 화면에 채팅 데이터를 추가합니다.
        - SHOW_LIST : 유저와 각 방의 마지막 메세지와 마지막 타임스탬프 데이터를 가지고 있습니다.
- toggleReducer : 친구 목록의 이름 순 정렬과 검색 활성화 토글 기능을 가지고 있습니다.


## Dependency
react-redux, react-router-dom, react-icons, styled-components가 추가되었습니다.

## Getting Started
#### Clone the repository
```
https://gitlab.com/kde.ryan31/react-chat-app.git
```
#### Installation
```
npm install
```
#### Start
```
npm start
```

## Screen shot
#### 친구 목록 화면 & 채팅 목록 화면
<img src="https://user-images.githubusercontent.com/73865700/164130798-06c412cc-c05c-4a25-908e-412996cc6465.PNG" height="500px" width="400px">
<img src="https://user-images.githubusercontent.com/73865700/164131072-a978a4ed-2319-4b33-8a3d-7ac536c6c2fe.PNG" height="500px" width="400px">

#### 채팅 화면 && 메세지 추가
<img src="https://user-images.githubusercontent.com/73865700/164132796-ba918d5c-d5da-4c27-bf09-614c8ecb06c2.PNG" height="450px" width="350px">
<img src="https://user-images.githubusercontent.com/73865700/164132824-331278fe-296c-4dba-8900-99ea657d0487.PNG" height="450px" width="350px">

#### 이름 순 정렬 & 검색
<img src="https://user-images.githubusercontent.com/73865700/164133021-6f3b3375-6dc5-4dd2-96f6-7e3b7a31b908.PNG" height="500px" width="350px">
<img src="https://user-images.githubusercontent.com/73865700/164133024-844fcd7f-5348-4049-b7c1-ca485a789c0c.PNG" height="500px" width="350px">

#### 검색 시 찾는 이름이 없는 경우 & 404 페이지
<img src="https://user-images.githubusercontent.com/73865700/164133221-4c7286f4-9a24-4ca0-bb0a-15102734d609.PNG" height="500px" width="400px">
<img src="https://user-images.githubusercontent.com/73865700/164133223-b3dc3b2b-b78d-4ce4-8854-99b7d4e2b39c.PNG" height="500px" width="400px">
