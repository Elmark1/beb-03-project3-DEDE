## User Model

| Name              | Type             | Description                                                                                                                                  | Required |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| userType          | Number           | User type. <br/>**Customer type is 1, restaurant type is 2, and delivery man type is 3**.                                                    |    O     |
| userId            | String           | User ID                                                                                                                                      |    O     |
| password          | String           | User Password                                                                                                                                |    O     |
| userName          | String           | User Nickname                                                                                                                                |    O     |
| phoneNumber       | String           | User Phone Number                                                                                                                            |    O     |
| roadNameAddress   | String           | User Road Name Address                                                                                                                       |    O     |
| sigungu           | String           | This field's value is gotten from [Daum Postcode Service](https://postcode.map.daum.net/guide).                                              |    O     |
| encryptedKeystore | String           | User Encrypted Keystore. It will be used to get a keyring by decrypting the keystore.                                                        |    O     |
| token             | [Number, Number] | Balance of Tokens <br/><br/> **[{DEDEToken}, {KLAY}]**                                                                                       |    O     |
| stakedToken       | Number           | Balance of Staked DEDE Tokens                                                                                                                |    O     |
| collectedNft      | [String, ...]    | The list of NFT metadata URIs that is in the user's wallet. It is always **undefined** for type2 (restaurant) or type3 (delivery man) users. |    O     |

---

## Order Model

| Name        | Type           | Description                                                                                                                                                                                                          | Required |
| ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| user1_id    | ObjectId       | Customer Object ID                                                                                                                                                                                                   |    O     |
| user2_id    | ObjectId       | Restaurant Object ID                                                                                                                                                                                                 |    O     |
| user3_id    | ObjectId       | Delivery Man Object ID                                                                                                                                                                                               |    O     |
| status      | String         | "Pending", "Rejected", "Cooking", "Delivery", "Completed" <br/><br/> **Default:** "Pending"                                                                                                                          |    O     |
| orderedMenu | [Object, ... ] | Each Object contains **menuName, menuDescription, menuPrice**. This data is on the Menu Model, and it is given by Client Side. (이전에 레스토랑 정보를 띄우면서, customer에게 메뉴를 보여줬던 정보를 기반으로 해서 ) |    O     |

---

## Menu Model

| Name            | Type     | Description                                                                                                               | Required |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- | :------: |
| user_id         | ObjectId | Each ObjectId means user model object ID. It is used to read a **users** collection, and get data of **restaurant** user. |    O     |
| menuName        | String   | Restaurant Menu Name                                                                                                      |    O     |
| menuPrice       | Number   | Restaurant Menu Price                                                                                                     |    O     |
| menuDescription | String   | Restaurant Menu Description                                                                                               |    O     |

---

## CustomMadeNFT Model

| Name         | Type     | Description                                                                                                                  | Required |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- | :------: |
| user_id      | ObjectId | Each ObjectId means **restaurnt object ID**. It is used to read a **users** collection, and get data of **restaurant** user. |    O     |
| nftName      | String   | Restaurant NFT Name                                                                                                          |    O     |
| nftPrice     | Number   | Restaurant NFT Price                                                                                                         |    O     |
| discountRate | Number   | Restaurant NFT Discount Rate for discounting food prices.                                                                    |    O     |

---

## Contract Model

| Name         | Type   | Description                                      | Required |
| ------------ | ------ | ------------------------------------------------ | :------: |
| contractType | String | Determine whether this contract is "FT" or "NFT" |    O     |
| address      | String | This Contract's Address                          |    O     |

---

## Admin Model

| Name       | Type   | Description                                | Required |
| ---------- | ------ | ------------------------------------------ | :------: |
| adminType  | String | Determine what the admin's account is for. |    O     |
| address    | String | This Account's Address                     |    O     |
| privateKey | String | This Account's Private Key                 |    O     |

---

# API Document

## Sign Up

### [Request]

#### URL

```
POST /signup HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key             | Description                                       | Type   | Required |
| :-------------- | :------------------------------------------------ | :----- | :------: |
| userType        | Customer: 1<br/>Restaurant: 2<br/>Delivery Man: 3 | Number |    O     |
| userId          | User ID                                           | String |    O     |
| password        | User Password                                     | String |    O     |
| userName        | User Nickname                                     | String |    O     |
| phoneNumber     | User Phone Number                                 | String |    O     |
| roadNameAddress | User Road Name Address                            | String |    O     |

### [Response]

| Name          | Type   | Description                                                                                                          | Required |
| :------------ | :----- | :------------------------------------------------------------------------------------------------------------------- | :------: |
| message       | String | Message. "Created" or "Fail".                                                                                        |    O     |
| userType      | Number | User type. **Customer type is 1, restaurant type is 2, and delivery man type is 3**.                                 |    O     |
| userName      | String | User Nickname                                                                                                        |    O     |
| walletAddress | String | Wallet Address. This address and private key are created on the server side. The only address is sent to the client. |    O     |

### [Sample]

#### req.body

```
{
  "userType": 1,
  "userId": "UserID",
  "password": "UserPassword",
  "userName": "UserName",
  "phoneNumber": "01012345678",
  "roadNameAddress": "User Road Name Address",
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "message": "Created",
  "userName": "UserName",
  "walletAddress": "WalletAddress",
}
```

---

## Sign In

### [Request]

#### URL

```
POST /signin HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key      | Description   | Type   | Required |
| :------- | :------------ | :----- | :------: |
| userId   | User ID       | String |    O     |
| password | User Password | String |    O     |

### [Response]

| Name         | Type   | Description                                                                                   | Required |
| :----------- | :----- | :-------------------------------------------------------------------------------------------- | :------: |
| userType     | Number | Customer: 1<br/>Restaurant: 2<br/>Delivery Man: 3                                             |    O     |
| userObjectId | String | User Object ID                                                                                |    O     |
| accessToken  | String | If the user receives JWT completely, user can put it in req.header and send it to the server. |    O     |
| refreshToken | String | If the user receives JWT completely, user can put it in req.header and send it to the server. |    O     |

### [Sample]

#### req.body

```
{
  "userId": "User ID",
  "password": "User Password",
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "userType": 2,
  "userObjectId": "User Object ID",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0b2tlblR5cGUiOiJyZWZyZXNoIn0.4BaFhrfDsHiqDIGBB6FubGHhH-7RPvoW7zDjzYBslCU"
}
```

---

## Sign Out

### [Request]

#### URL

```
POST /signout HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name    | Type   | Description                               | Required |
| :------ | :----- | :---------------------------------------- | :------: |
| message | String | "✅ Sign Out Successfully!" or "❌ Fail!" |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "message": "✅ Sign Out Successfully!"
}
```

---

## Get User Information

### [Request]

#### URL

```
GET /users/:userId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name            | Type   | Description                                                                                                                                                                                                                |                Required                |
| :-------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------: |
| userType        | Number | User type. **Customer type is 1, restaurant type is 2, and delivery man type is 3**.                                                                                                                                       |                   O                    |
| userId          | String | User ID                                                                                                                                                                                                                    |                   O                    |
| userName        | String | User Nickname                                                                                                                                                                                                              |                   O                    |
| roadNameAddress | String | User Road Name Address                                                                                                                                                                                                     |                   O                    |
| sigungu         | String | This field's value is gotten from [Daum Postcode Service](https://postcode.map.daum.net/guide).                                                                                                                            |                   O                    |
| phoneNumber     | String | User Phone Number                                                                                                                                                                                                          |                   O                    |
| walletAddress   | String | Wallet Address. This address was created on the server side.                                                                                                                                                               |                   O                    |
| token           | Array  | The first element is the number of DEDE tokens that is in the user's wallet. The second element is the number of KLAY that is in the user's wallet. <br/><br/> **[{BalanceOfDEDE}, {BalanceOfKLAY}]**                      |                   O                    |
| stakedToken     | Number | The number of DEDE tokens that have been staked.                                                                                                                                                                           |                   O                    |
| collectedNft    | Array  | The list of NFT metadata URIs that is in the user's wallet.                                                                                                                                                                |  △ <br/>(Only required for customers)  |
| customMadeNft   | Array  | The list of custom-made NFT datas that is found from CustomMadeNFT Collections. **This field is returned only for restaurant-type user.** <br/><br/> **[{nftName: String, nftPrice: Number, discountRate: String}, ... ]** | △ <br/>(Only required for restaurants) |
| restaurantMenu  | Array  | The list of menu datas that is found from Menu Collections. **This field is returned only for restaurant-type user.** <br/><br/> **[{menuName: String, menuPrice: Number, menuDescription: String}, ... ]**                | △ <br/>(Only required for restaurants) |

### [Sample]

#### Response: success - restaurant user

```
HTTP/1.1 200 OK
{
  "userType": 2,
  "userId": "UserId",
  "userName": "UserNickName",
  "roadNameAddress": "User Road Name Address",
  "sigungu": "성남시 분당구",
  "phoneNumber": "User Phone Number",
  "walletAddress": "User Wallet Address",
  "token": [3000, 150],
  "stakedToken": 1000,
  "customMadedNft": [
    {
      "nftName": "NFT 1 Name",
      "discountRate": 10,
      "nftPrice": 300
    },{
      "nftName": "NFT 2 Name",
      "discountRate": 20,
      "nftPrice": 500
    }
  ],
  "restaurantMenu": [
    {
      "menuName": "Pasta",
      "menuDescription": "Very Delicious",
      "menuPrice": 400
    }, {
      "menuName": "Salad",
      "menuDescription": "Very Nice",
      "menuPrice": 150
    }
  ]
}
```

---

## Listing Custom-Made NFT on the restaurant

### [Request]

#### URL

```
POST /restaurants/:restaurantId(ObjectId)/nfts HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Name         | Description   | Type   | Required |
| :----------- | :------------ | :----- | :------: |
| nftName      | NFT Name      | String |    O     |
| discountRate | Discount Rate | Number |    O     |
| nftPrice     | NFT Price     | Number |    O     |

### [Response]

| Name    | Type   | Description                     | Required |
| :------ | :----- | :------------------------------ | :------: |
| message | String | "Created!" or "Fail to Create!" |    O     |

### [Sample]

#### req.body

```
{
  "nftName": "NFT Name", "discountRate": 10, "nftPrice": 300
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "message": "Created"
}
```

---

## Create Menu

Restaurant-type user can add menus. The menu will be added to the menu list.

### [Request]

#### URL

```
POST restaurants/:restaurantId(ObjectId)/menus HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Key             | Description                                     | Type   | Required |
| :-------------- | :---------------------------------------------- | :----- | :------: |
| menuName        | The name of this menu                           | String |    O     |
| menuDescription | Default: "We serve delicious food." <br/>       | String |    X     |
| menuPrice       | The price of this menu. The unit is DEDE token. | Number |    O     |

### [Response]

| Name    | Type   | Description                                                                                                                                                                                                                                                    | Required |
| :------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| message | String | If the same menu name exists, adding a menu fails. <br/> When restaurant-type user added menu successfully on the menu list, the message is "Create Menu Successfully". When restaurant-type user failed to create menu, the message is "Fail to Create Menu". |    O     |

### [Sample]

#### req.body

```
{
  "menuName": "Pasta",
  "menuDescription": "Very Delicious",
  "menuPrice": 400
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
    "message": "Create Menu Successfully"
}
```

---

## Get Menus By Id

### [Request]

#### URL

```
GET restaurants/:restaurantId(ObjectId)/menus HTTP/1.1
Host : http://127.0.0.1:4000
```

### [Response]

| Name     | Type  | Description                                                                                                                                                  | Required |
| :------- | :---- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| menuList | Array | This is an array of menu objects registered at the restaurant. <br/><br/>**[{menuName: String, menuDescription: String, menuPrice: Number}, { ... }, ... ]** |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "menuList": [{"menuName": "pasta", "menuDescription": "Very delicious food", "menuPrice": 400}]
}
```

---

## Create Order

### [Request]

#### URL

```
POST /orders HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Key                | Description                                                                                                                                                                                      | Type   | Required |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :------: |
| customerObjectId   | Customer Object ID                                                                                                                                                                               | String |    O     |
| restaurantObjectId | Restaurant Object ID                                                                                                                                                                             | String |    O     |
| orderedMenu        | orderedMenu is an array of object. Each object contains menuName, menuDescriptioin and menuPrice. <br/><br/> **[{menuName: String, menuDescription: String, menuPrice: Number}, { ... }, ... ]** | Array  |    O     |

### [Response]

| Name    | Type   | Description | Required |
| :------ | :----- | :---------- | :------: |
| message | String | "Created"   |    O     |

### [Sample]

#### req.body

```
{
  "customerObjectId": "Customer Object ID",
  "restaurantObjectId": "Restaurant Object ID",
  "orderedMenu": [
      {
        "menuName": "Pasta",
        "menuDescription": "Very Delicious",
        "menuPrice": 400
      }, {
        "menuName": "Salad",
        "menuDescription": "Very Nice",
        "menuPrice": 150
      }
    ],
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "message": "Created"
}
```

---

## Get Orders

### [Request] : Use Json Web Token

#### URL

```
GET /orders HTTP/1.1
Host : http://127.0.0.1:4000
```

### [Response]

| Name      | Type  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required |
| :-------- | :---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| orderList | Array | OrderList is an array of orders. Each order object contains the data of the order. **If status is "Pending", there is no value of user3_id which contains user3 Object ID and userName (Delivery Man Name).** Please refer to the sample below. <br/><br/> **Default**: OrderList is sorted in the latest order.<br/><br/> **[{ \_id: ObjectId(Order), <br/>user1_id: { \_id: ObjectId(customer), userName: String }, user2_id: { \_id: ObjectId(restaurant), userName: String }, user3_id: { \_id: ObjectId(delivery man), userName: String }, status: String, orderedMenu: [{menuName: String, menuDescription: String, menuPrice: Number}, { ... }], ... ]** |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "orderList": [
    {
      "user1_id": { _id: "Customer1 Object Id", userName: "Customer1 Name" },
      "user2_id": { _id: "Restaurant1 Object Id", userName: "Restaurant1 Name" },
      "status": "Pending",
      "orderedMenu": [
        {
          "menuName": "Pasta",
          "menuDescription": "Very Delicious",
          "menuPrice": 400
        }, {
          "menuName": "Salad",
          "menuDescription": "Very Nice",
          "menuPrice": 150
        }
      ]
    }, {
      "user1_id": { _id: "Customer2 Object Id", userName: "Customer2 Name" },
      "user2_id": { _id: "Restaurant2 Object Id", userName: "Restaurant2 Name" },
      "user3_id": { _id: "DeliveryMan2 Object Id", userName: "DeliveryMan2 Name" },
      "status": "Cooking",
      "orderedMenu": [
        {
          "menuName": "Pasta",
          "menuDescription": "Very Delicious",
          "menuPrice": 400
        }, {
          "menuName": "Salad",
          "menuDescription": "Very Nice",
          "menuPrice": 150
        }
      ]
    }
  ]
}
```

---

## Get Order History

### [Request]

#### URL

```
GET /orders/history HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name    | Type  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Required |
| :------ | :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------: |
| history | Array | "history" is an array of **orders of the user who requested.** Each order object contains the data of the order. **If status is "Pending", there is no value of user3_id which contains user3 Object ID and userName (Delivery Man Name).** Please refer to the sample below. <br/><br/> **Default**: OrderList is sorted in the latest order.<br/><br/> **[{ \_id: ObjectId(Order), <br/>user1_id: { \_id: ObjectId(customer), userName: String }, user2_id: { \_id: ObjectId(restaurant), userName: String }, user3_id: { \_id: ObjectId(delivery man), userName: String }, status: String, orderedMenu: [{menuName: String, menuDescription: String, menuPrice: Number}, { ... }], { ... } ]** |    O     |

---

## Get Order By ID

### [Request]

#### URL

```
GET /orders/:orderId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

### [Response]

| Name        | Type   | Description                                                                                                                                                                                      | Required |
| :---------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| user1_id    | Object | { \_id: "Customer Object Id", userName: "Customer Name" }                                                                                                                                        |    O     |
| user2_id    | Object | { \_id: "Restaurant Object Id", userName: "Restaurant Name" }                                                                                                                                    |    O     |
| user3_id    | Object | { \_id: "DeliveryMan Object Id", userName: "DeliveryMan Name" }                                                                                                                                  |    O     |
| status      | String | "Pending", "Rejected", "Cooking", "Delivery", "Complete"<br/><br/>**Default: "Pending"**                                                                                                         |    O     |
| orderedMenu | Array  | orderedMenu is an array of object. Each object contains menuName, menuDescriptioin and menuPrice. <br/><br/> **[{menuName: String, menuDescription: String, menuPrice: Number}, { ... }, ... ]** |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
     "user1_id": { _id: "Customer Object Id", userName: "Customer Name" },
      "user2_id": { _id: "Restaurant Object Id", userName: "Restaurant Name" },
      "user3_id": { _id: "DeliveryMan Object Id", userName: "DeliveryMan Name" },
    "status": "Cooking",
    "orderedMenu": [
      {
        "menuName": "Pasta",
        "menuDescription": "Very Delicious",
        "menuPrice": 400
      }, {
        "menuName": "Salad",
        "menuDescription": "Very Nice",
        "menuPrice": 150
      }
    ],
}
```

---

## PATCH Order

### [Request]

#### URL

```
PATCH /orders/:orderId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Name   | Description                                    | Type   | Required |
| ------ | ---------------------------------------------- | ------ | :------: |
| status | "Cooking", "Rejected", "Delivery", "Completed" | String |    O     |

### [Response]

| Name    | Type   | Description                                                                                                                                                                                                                                                                                                                                                                    | Required |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------: |
| message | String | **1. Restaurant의 요청** <br/>"Cooking" -> message: "👨‍🍳 배달원이 도착하기 전까지 레스토랑이 음식을 조리합니다!"<br/> "Rejected" -> message: "🙅 레스토랑이 해당 주문을 거절하셨습니다!" <br/><br/> **2. 배달원의 요청** <br/> "Delivery" -> message: "🚴‍♂️ 배달원이 음식을 건네받았습니다"!<br/><br/> **3. 완료** <br/> "Completed" -> message: "✅ 해당 주문은 완료되었습니다!" |    O     |

### [Sample]

#### req.body

```
{
  status: 'Cooking'
}
```

#### Response: success

```
{
  "message": "👨‍🍳 배달원이 도착하기 전까지 레스토랑이 음식을 조리합니다!",

}
```

---

## Deploy Contract: Server

### [Request]

#### URL

```
POST /deploy HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Name          | Description    | Type   | Required |
| ------------- | -------------- | ------ | :------: |
| adminId       | Admin Id       | String |    O     |
| adminPassword | Admin Password | String |    O     |

### [Response]

| Name    | Type   | Description       | Required |
| ------- | ------ | ----------------- | :------: |
| message | String | "Success", "Fail" |    O     |

### [Sample]

#### req.body

```
{
    adminId: "Admin Id",
    adminPassword: "Admin's Password"
}
```

#### Response: success

```
{
    "message": "Success"
}
```

---

## Swap Token

### [Request]

#### URL

```
POST /swap HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Name         | Description                                                         | Type   | Required |
| ------------ | ------------------------------------------------------------------- | ------ | :------: |
| userObjectId | User Object Id                                                      | String |    O     |
| swapType     | **1**: Swap KLAY to DEDE token <br/> **2**: Swap DEDE token to KLAY | Number |    O     |
| amount       | Amount of Tokens to transfer                                        | Number |    O     |

### [Response]

| Name    | Type   | Description       | Required |
| ------- | ------ | ----------------- | :------: |
| message | String | "Success", "Fail" |    O     |

### [Sample]

#### req.body

```
{
    userObjectId: "User Object Id",
    swapType: 2,
    amount: Number
}
```

#### Response: success

```
{
    "message": "Success"
}
```

---

## Transfer Token

### [Request]

#### URL

```
POST /transfer HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Name         | Description                              | Type   | Required |
| ------------ | ---------------------------------------- | ------ | :------: |
| userObjectId | User Object Id                           | String |    O     |
| to           | **Address** that tokens will be sent to. | String |    O     |
| amount       | Amount of Tokens to transfer             | Number |    O     |

### [Response]

| Name    | Type   | Description       | Required |
| ------- | ------ | ----------------- | :------: |
| message | String | "Success", "Fail" |    O     |

### [Sample]

#### req.body

```
{
    userObjectId: "User Object Id",
    amount: Number
}
```

#### Response: success

```
{
    "message": "Success"
}
```

---

## Staking Token

### [Request]

#### URL

```
POST /stake HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Name         | Description               | Type   | Required |
| ------------ | ------------------------- | ------ | :------: |
| userObjectId | User Object Id            | String |    O     |
| amount       | Amount of Tokens to stake | Number |    O     |

### [Response]

| Name    | Type   | Description       | Required |
| ------- | ------ | ----------------- | :------: |
| message | String | "Success", "Fail" |    O     |

### [Sample]

#### req.body

```
{
    userObjectId: "User Object Id",
    amount: Number
}
```

#### Response: success

```
{
    "message": "Success"
}
```

---

## Buy NFT

### [Request]

#### URL

```
POST /nfts HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Name               | Description                                          | Type   | Required |
| ------------------ | ---------------------------------------------------- | ------ | :------: |
| restaurantObjectId | Restaurant Object Id                                 | String |    O     |
| nftName            | NFT Name                                             | String |    O     |
| discountRate       | **Discount Rate** to be applied when ordering a menu | String |    O     |
| nftPrice           | NFT Price                                            | Number |    O     |

### [Response]

| Name    | Type   | Description       | Required |
| ------- | ------ | ----------------- | :------: |
| message | String | "Success", "Fail" |    O     |

### [Sample]

#### req.body

```
{
  restaurantObjectId: "Restaurant Object Id",
  nftName: "NFT Name",
  discountRate: 10,
  nftPrice: 300
}
```

#### Response: success

```
{
    "message": "Success"
}
```
