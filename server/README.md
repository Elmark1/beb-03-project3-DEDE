# API Document

## Create Customer Account

### [Request]

#### URL

```
POST /customer HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key             | Description           | Type   | Required |
| :-------------- | :-------------------- | :----- | :------: |
| customerUserId  | Customer User ID      | String |    O     |
| password        | Customer Password     | String |    O     |
| customerName    | Customer Nickname     | String |    O     |
| customerAddress | Customer Address      | String |    O     |
| customerNumber  | Customer Phone Number | String |    O     |

### [Response]

| Name          | Type   | Description                                                                                                          | Required |
| :------------ | :----- | :------------------------------------------------------------------------------------------------------------------- | :------: |
| message       | String | Message. "Created" or "Fail".                                                                                        |    O     |
| customerName  | String | Customer Nickname.                                                                                                   |    O     |
| walletAddress | String | Wallet Address. This address and private key are created on the server side. The only address is sent to the client. |    O     |

---

## Create Restaurant Account

### [Request]

#### URL

```
POST /restaurant HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key               | Description             | Type   | Required |
| :---------------- | :---------------------- | :----- | :------: |
| restaurantUserId  | Restaurant User ID      | String |    O     |
| password          | Restaurant Password     | String |    O     |
| restaurantName    | Restaurant Name         | String |    O     |
| restaurantAddress | Restaurant Address      | String |    O     |
| restaurantNumber  | Restaurant Phone Number | String |    O     |

### [Response]

| Name           | Type   | Description                                                                                                          | Required |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------------- | :------: |
| message        | String | Message. "Created" or "Fail".                                                                                        |    O     |
| restaurantName | String | It should be a restaurant name.                                                                                      |    O     |
| walletAddress  | String | Wallet Address. This address and private key are created on the server side. The only address is sent to the client. |    O     |

### [Sample]

#### req.body

```
{
  "restaurantUserId": "RestaurantUserID",
  "password": "RestaurantPassword",
  "restaurantName": "RestaurantName",
  "restaurantAddress": "Restaurant Address",
  "restaurantNumber": "01012345678",
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "message": "Created",
  "restaurantName": "RestaurantName",
  "walletAddress": "WalletAddress",
}
```

---

## Create Delivery Man Account

### [Request]

#### URL

```
POST /deliveryman HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key                | Description               | Type   | Required |
| :----------------- | :------------------------ | :----- | :------: |
| deliveryManUserId  | Delivery Man User ID      | String |    O     |
| password           | Delivery Man Password     | String |    O     |
| deliveryManName    | Delivery Man Nickname     | String |    O     |
| deliveryManAddress | Delivery Man Address      | String |    O     |
| deliveryManNumber  | Delivery Man Phone Number | String |    O     |

### [Response]

| Name            | Type   | Description                                                                                                          | Required |
| :-------------- | :----- | :------------------------------------------------------------------------------------------------------------------- | :------: |
| message         | String | Message. "Created" or "Fail"                                                                                         |    O     |
| deliveryManName | String | Delivery Man Nickname                                                                                                |    O     |
| walletAddress   | String | Wallet Address. This address and private key are created on the server side. The only address is sent to the client. |    O     |

---

## Login Customer

### [Request]

#### URL

```
POST /customer/login HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key            | Description      | Type   | Required |
| :------------- | :--------------- | :----- | :------: |
| customerUserId | Customer User ID | String |    O     |
| password       | User Password    | String |    O     |

### [Response]

| Name           | Type   | Description                                                                                                | Required |
| :------------- | :----- | :--------------------------------------------------------------------------------------------------------- | :------: |
| customerUserId | String | Customer User ID                                                                                           |    O     |
| jsonWebToken   | String | JWT. If the customer receives JWT completely, customer can put it in req.header and send it to the server. |    O     |

### [Sample]

#### req.body

```
{
  "customerUserId": "Customer User ID",
  "password": "Customer Password",
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "customerUserId": "Customer User ID",
  "jsonWebToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

---

## Login Restaurant

### [Request]

#### URL

```
POST /restaurant/login HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key              | Description        | Type   | Required |
| :--------------- | :----------------- | :----- | :------: |
| restaurantUserId | restaurant User ID | String |    O     |
| password         | User Password      | String |    O     |

### [Response]

| Name             | Type   | Description                                                                                                    | Required |
| :--------------- | :----- | :------------------------------------------------------------------------------------------------------------- | :------: |
| restaurantUserId | String | Restaurant User ID                                                                                             |    O     |
| jsonWebToken     | String | JWT. If the Restaurant receives JWT completely, restaurant can put it in req.header and send it to the server. |    O     |

### [Sample]

#### req.body

```
{
  "restaurantUserId": "Restaurant User ID",
  "password": "Restaurant Password",
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "restaurantUserId": "Restaurant User ID",
  "jsonWebToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

---

## Login Delivery Man

### [Request]

#### URL

```
POST /deliveryman/login HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

| Key               | Description           | Type   | Required |
| :---------------- | :-------------------- | :----- | :------: |
| deliveryManUserId | Delivery Man User ID  | String |    O     |
| password          | Delivery Man Password | String |    O     |

### [Response]

| Name              | Type   | Description                                                                                                        | Required |
| :---------------- | :----- | :----------------------------------------------------------------------------------------------------------------- | :------: |
| deliveryManUserId | String | Delivery Man User ID                                                                                               |    O     |
| jsonWebToken      | String | JWT. If the Delivery Man receives JWT completely, Delivery Man can put it in req.header and send it to the server. |    O     |

### [Sample]

#### req.body

```
{
  "deliveryManUserId": "Delivery Man User ID",
  "password": "Delivery Man Password",
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "deliveryManUserId": "Delivery Man User ID",
  "jsonWebToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

---

## Get Customer Information

### [Request]

#### URL

```
GET /customer/:userId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name            | Type   | Description                                                                                                                                                                                           | Required |
| :-------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| customerUserId  | String | Customer User ID                                                                                                                                                                                      |    O     |
| customerName    | String | Customer Nickname                                                                                                                                                                                     |    O     |
| customerAddress | String | Customer Address                                                                                                                                                                                      |    O     |
| customerNumber  | String | Customer Phone Number                                                                                                                                                                                 |    O     |
| walletAddress   | String | Wallet Address. This address was created on the server side.                                                                                                                                          |    O     |
| token           | Array  | The first element is the number of DEDE tokens that is in the user's wallet. The second element is the number of KLAY that is in the user's wallet. <br/><br/> **[{BalanceOfDEDE}, {BalanceOfKLAY}]** |    O     |
| staking         | Number | The number of DEDE tokens that have been staked.                                                                                                                                                      |    O     |
| nft             | Array  | The list of NFT metadata URIs that is in the user's wallet.                                                                                                                                           |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "customerUserId": "CustomerUserId",
  "customerName": "CustomerNickName",
  "customerAddress": "Customer Address",
  "customerNumber": "Customer Phone Number",
  "walletAddress": "Customer Wallet Address",
  token: [3000, 150],
  nft: ["https://cryptowatchbearclub.mypinata.cloud/ipfs/QmX8kGmiRD5crgp3WZHgch2M7wEhCyStev9vpqxycQ713p/1752", "https://api.mooncat.community/traits/15581"]
}
```

---

## Get Restaurants

### [Request]

#### URL

```
GET /restaurant HTTP/1.1
Host : http://127.0.0.1:4000
```

### [Response]

| Name        | Type  | Description                                                                                                                                                    | Required |
| :---------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| restaurants | Array | The Array of restaurant data objects. <br/><br/> **[{restaurantUserId: String, restaurantName: String, restaurantAddress: String, restaurantNumber: String}]** |    O     |

---

## Get Restaurant Information

### [Request]

#### URL

```
GET /restaurant/:userId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name              | Type   | Description                                                                                                                                                                                           | Required |
| :---------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| restaurantUserId  | String | Restaurant User ID                                                                                                                                                                                    |    O     |
| restaurantName    | String | Restaurant Nickname                                                                                                                                                                                   |    O     |
| restaurantAddress | String | Restaurant Address                                                                                                                                                                                    |    O     |
| restaurantNumber  | String | Restaurant Phone Number                                                                                                                                                                               |    O     |
| menu              | Array  | The list of menu data objects that is written by the restaurant. <br/><br/> **[{menuName: String, menuDescription: String, menuPrice: Number}]**                                                      |    O     |
| walletAddress     | String | Wallet Address. This address was created on the server side.                                                                                                                                          |    O     |
| token             | Array  | The first element is the number of DEDE tokens that is in the user's wallet. The second element is the number of KLAY that is in the user's wallet. <br/><br/> **[{BalanceOfDEDE}, {BalanceOfKLAY}]** |    O     |
| staking           | Number | The number of DEDE tokens that have been staked.                                                                                                                                                      |    O     |
| sellingNft        | Array  | The list of NFT data objects that is written by the restaurant. <br/><br/> **[{restaurantId: ObjectId, restaurantName: String, discountRate: Number, nftPrice: Number}]**                             |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "restaurantUserId": "RestaurantId",
  "restaurantName": "RestaurantName",
  "restaurantAddress": "Restaurant Address",
  "restaurantNumber": "Restaurant Phone Number",
  "menu": [{"menuName": "pasta", "menuDescription": "Very delicious", "menuPrice": 12500}, {"menuName": "salad", "menuDescription": "Very fresh", "menuPrice": 8000}],
  "walletAddress": "Restaurant Wallet Address",
  "token": [3000, 150],
  "staking": 1000,
  "sellingNft": [{"restaurantId": "RestaurantObjectId", "restaurantName": "RestaurantName", "discountRate": 10, "nftPrice": 300}]
}
```

---

## Get Delivery Man Information

### [Request]

#### URL

```
GET /deliveryman/:userId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name              | Type   | Description                                                                                                                                                                                           | Required |
| :---------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| userId            | String | Delivery Man ID                                                                                                                                                                                       |    O     |
| deliveryManName   | String | Delivery Man Nickname.                                                                                                                                                                                |    O     |
| deliveryManNumber | String | Delivery Man Phone Number                                                                                                                                                                             |    O     |
| walletAddress     | String | Wallet Address. This address was created on the server side.                                                                                                                                          |    O     |
| token             | Array  | The first element is the number of DEDE tokens that is in the user's wallet. The second element is the number of KLAY that is in the user's wallet. <br/><br/> **[{BalanceOfDEDE}, {BalanceOfKLAY}]** |    O     |
| staking           | Number | The number of DEDE tokens that have been staked.                                                                                                                                                      |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "deliveryManUserId": "DeliveryManId",
  "deliveryManName": "Delivery Man Name",
  "deliveryManAddress": "Delivery Man Address",
  "deliveryManNumber": "Delivery Man Phone Number",
  "walletAddress": "Delivery Man Wallet Address",
  "token": "["3000, 150"]",
  "staking": 1000
}
```

---

## Get Orders

### [Request] : Use Json Web Token

#### URL

```
GET /order HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

### [Response]

| Name   | Type  | Description                                                                                                                                                                                                                                                                                                    | Required |
| :----- | :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| orders | Array | Orders is an array of order objects. Each object contains the data of the order. <br/> **Default**: Orders are sorted in the latest order.<br/><br/> **[{customerUserId: String, restaurantUserId: String, deliveryManUserId: String, orderedMenu: [{menuName: String, menuPrice: Number}], status: String}]** |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "orders": [
    {
      "customerUserId": "Customer 1 userId",
      "restaurantUserId": "Restaurant 1 userId",
      "deliveryManUserId": "Delivery 1 userId",
      "orderedMenu": [{"menuName": "pasta", "menuPrice": 1250}],
      "status": "Pending" or "Rejected" or "Cooking" or "Delivery" or "Complete",
    }, {
      "customerUserId": "Customer 2 userId",
      "restaurantUserId": "Restaurant 2 userId",
      "deliveryManUserId": "Delivery 2 userId",
      "orderedMenu": [{"menuName": "salad", "menuPrice": 750}],
      "status": "Pending" or "Rejected" or "Cooking" or "Delivery" or "Complete",
    }
  ]
}
```

---

## Get Order By ID

### [Request]

#### URL

```
GET /order/:orderId HTTP/1.1
Host : http://127.0.0.1:4000
```

### [Response]

| Name              | Type   | Description                                                                                                                                     | Required |
| :---------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| customerUserId    | String | Customer User ID                                                                                                                                |    O     |
| restaurantUserId  | String | Restaurant User ID                                                                                                                              |    O     |
| deliveryManUserId | String | Delivery Man User ID                                                                                                                            |    O     |
| orderedMenu       | Array  | orderedMenu is an array of menu data objects. Each object contains the data of the menu. <br/><br/> **[{menuName: String, menuPrice: Number}]** |    O     |
| status            | String | "Pending" or "Rejected" or "Cooking" or "Delivery" or "Complete"                                                                                |    O     |

#### Response: success

```
HTTP/1.1 200 OK
{
    "customerUserId": "Customer userId",
    "restaurantUserId": "Restaurant userId",
    "deliveryManUserId": "Delivery userId",
    "orderedMenu": [{"menuName": "pasta", "menuPrice": 1250}],
    "status": "Pending" or "Rejected" or "Cooking" or "Delivery" or "Complete",
}
```

---

## Create Order

### [Request]

#### URL

```
POST /order HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

| Key              | Description                                                                                                                | Type          | Required |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ | :------: |
| restaurantUserId | Restaurant User ID                                                                                                         | String        |    O     |
| orderedMenu      | The array of menu data objects that is the selected by the customer. <br/><br/>**[{menuName: String, menuPrice: Number}]** | Array<number> |    O     |

### [Response]

| Name    | Type   | Description | Required |
| :------ | :----- | :---------- | :------: |
| message | String | "Created"   |    O     |

### [Sample]

#### req.body

```
{
  "restaurantUserId": "Restaurant User ID",
  "orderedMenu": [{"menuName": "pasta", "menuPrice": 740}],
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

## Get Menus

### [Request]

#### URL

```
GET restaurant/menu/:restaurantId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

### [Response]

| Name  | Type  | Description                                                                                                                                                  | Required |
| :---- | :---- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| menus | Array | This is an array of menu objects registered at the restaurant. <br/><br/>**[{menuName: String, menuDescription: String, menuPrice: Number}, { ... }, ... ]** |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "menus": [{"menuName": "pasta", "menuDescription": "Very delicious food", "menuPrice": 400}]
}
```

---

## Create Menu

Restaurant-type user can add menus. The menu will be added to the menu list.

### [Request]

#### URL

```
POST restaurant/menu/:restaurantId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

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

## List NFT on the restaurant

### [Request]

#### URL

```
POST /restaurant/nft/:restaurantId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Body

```
{
  "restaurantName": "RestaurantName", "discountRate": 10, "nftPrice": 300
}
```

### [Response]

```
{
  "message": "Success"
}
```

---

## Accept or Reject Order

### [Request]

#### URL

```
PATCH /order/:orderId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

```
{
  status: 'Cooking' or 'Rejected'
}
```

### [Response]

```
{
  customerUserId: String,
  restaurantUserId: String,
  deliveryManUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Cooking' or 'Rejected'
}
```

---

## Take Order for Delivery

### [Request]

#### URL

```
PATCH /order/:orderId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

```
{
  status: 'Delivery'
}
```

### [Response]

```
{
  customerUserId: String,
  restaurantUserId: String,
  deliveryManUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Delivery'
}
```

---

## Finish Order

### [Request]

#### URL

```
PATCH /order/:orderId(ObjectId) HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

```
{
  status: 'Completed'
}
```

### [Response]

```
{
  customerUserId: String,
  restaurantUserId: String,
  deliveryManUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Completed'
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

```
{
    adminId: "Admin's Id",
    adminPassword: "Admin's Password"
}
```

### [Response]

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

```
{
    userId: "UserId",
    type: "DEDEtoKLAY"
    amount: Number
}
```

### [Response]

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

```
{
    userId: "UserId",
    to: "Address"
    amount: Number
}
```

### [Response]

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

```
{
    userId: "UserId",
    amount: Number
}
```

### [Response]

```
{
    "message": "Success"
}
```

---

## Create and Buy NFT

### [Request]

#### URL

```
POST /nft HTTP/1.1
Host : http://127.0.0.1:4000
```

#### Request Header

| Name          | Description                                                                           | Required |
| ------------- | ------------------------------------------------------------------------------------- | :------: |
| Authorization | 사용자 인증 수단, Json Web Token <br/><br/> **Authorization: Bearer ${JsonWebToken}** |    O     |

#### Body

```
{
  restaurantId: "RestaurantId",
  restaurantName: "RestaurantName",
  discountRate: 10,
  nftPrice: 300
}
```

### [Response]

```
{
  "message": "Success"
```

---
