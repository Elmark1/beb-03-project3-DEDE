# API Document

## Create Account

### [Request]

#### URL

```
POST /account/signup HTTP/1.1
Host : http://127.0.0.1:4000
```

#### body

| Key         | Description                                                                            | Type   | Required |
| :---------- | :------------------------------------------------------------------------------------- | :----- | :------: |
| userId      | User ID                                                                                | String |    O     |
| password    | User Password                                                                          | String |    O     |
| nickName    | User Nickname. When user type is "restaurant", it should be a restaurant name.         | String |    O     |
| address     | User Address                                                                           | String |    O     |
| phoneNumber | User Phone Number                                                                      | Number |    O     |
| type        | User type. "Restaurant" type is 1, "Delivery Man" type is 2, and "Customer" type is 3. | Number |    O     |

### [Response]

| Name          | Type    | Description                                                                            | Required |
| :------------ | :------ | :------------------------------------------------------------------------------------- | :------: |
| userId        | String  | User ID                                                                                |    O     |
| nickName      | String  | User Nickname. When user type is "restaurant", it should be a restaurant name.         |    O     |
| walletAddress | Address | Wallet Address. This address is created on the server side.                            |    O     |
| privateKey    | Address | Private Key. This key is created on the server side.                                   |    O     |
| type          | Number  | User type. "Restaurant" type is 1, "Delivery Man" type is 2, and "Customer" type is 3. |    O     |

### [Sample]

#### req.body

```
{
  "userId": "USER ID",
  "password": "USER PASSWORD",
  "nickName": "USER NICKNAME",
  "address": "USER ADDRESS",
  "phoneNumber": "USER PHONE NUMBER",
  "type": "USER TYPE"
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "userId": "USER ID",
  "nickName": "USER NICKNAME",
  "walletAddress": "WALLET ADDRESS",
  "privateKey": "WALLET PRIVATEKEY",
  "type": "USER TYPE"
}
```

---

## Login

### [Request]

#### URL

```
POST /account/login HTTP/1.1
Host : http://127.0.0.1:4000
```

#### body

| Key      | Description                                                                            | Type   | Required |
| :------- | :------------------------------------------------------------------------------------- | :----- | :------: |
| userId   | User ID                                                                                | String |    O     |
| password | User Password                                                                          | String |    O     |
| type     | User type. "Restaurant" type is 1, "Delivery Man" type is 2, and "Customer" type is 3. | Number |    O     |

### [Response]

| Name          | Type    | Description                                                                                                                                                                                           | Required |
| :------------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| userId        | String  | User ID                                                                                                                                                                                               |    O     |
| nickName      | Object  | User Nickname. When user type is "restaurant", it should be a restaurant name.                                                                                                                        |    O     |
| address       | String  | User Address                                                                                                                                                                                          |    O     |
| walletAddress | Address | Wallet Address. This address is created on the server side.                                                                                                                                           |    O     |
| privateKey    | Address | Private Key. This key is created on the server side.                                                                                                                                                  |    O     |
| type          | Number  | User type. "Restaurant" type is 1, "Delivery Man" type is 2, and "Customer" type is 3.                                                                                                                |    O     |
| token         | Array   | The first element is the number of DEDE tokens that is in the user's wallet. The second element is the number of KLAY that is in the user's wallet. <br/><br/> **[{BalanceOfDEDE}, {BalanceOfKLAY}]** |    O     |
| staking       | Number  | The number of DEDE tokens that have been staked.                                                                                                                                                      |    O     |
| nft           | Array   | The list of NFTs that is in the user's wallet.                                                                                                                                                        |    O     |

### [Sample]

#### req.body

```
{
  "userId": "USER ID",
  "password": "USER PASSWORD",
  "type": "USER TYPE"
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "userId": "USER ID",
  "nickName": "USER NICKNAME",
  "address": "USER ADDRESS",
  "walletAddress": "WALLET ADDRESS",
  "privateKey": "WALLET PRIVATEKEY",
  "type": "USER TYPE",
  "token": ["BALANCE OF DEDE Token", "Balance Of KLAY"],
  "staking": "BALANCE OF STAKING",
  "nft": "USER COLLECTED NFT",
}
```

---

## Place Order

### [Request]

#### URL

```
POST /order HTTP/1.1
Host : http://127.0.0.1:4000
```

#### body

| Key            | Description                                                         | Type          | Required |
| :------------- | :------------------------------------------------------------------ | :------------ | :------: |
| restaurantName | Restaurant Name                                                     | String        |    O     |
| orderList      | Customer's order list that is the selected menus at the restaurant. | Array<number> |    O     |
| totalPrice     | The total price of selected menus.                                  | Number        |    O     |

### [Response]

| Name   | Type   | Description                                                                   | Required |
| :----- | :----- | :---------------------------------------------------------------------------- | :------: |
| status | String | "Pending" or "Rejected"                                                       |    O     |
| data   | Object | Order's Object ID. When "status" is rejected, data should be an empty object. |    O     |

### [Sample]

#### req.body

```
{
  "restaurant": "RESTAURANT NAME",
  "orderList": [{MENU NUMBER}],
  "totalPrice": {TOTAL PRICE}
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "status": "Pending or Rejected",
  "data": {
    "orderId": "Order's Object ID"
  }
}
```

---

## Get Orders By ID

### [Request]

#### URL

```
GET /order/:orderId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### body

```

```

### [Response]

| Name   | Type   | Description                                                                   | Required |
| :----- | :----- | :---------------------------------------------------------------------------- | :------: |
| status | String | "Pending" or "Rejected" or "In delivery" or "Complete"                        |    O     |
| data   | Object | Order's Object ID. When "status" is rejected, data should be an empty object. |    O     |

#### Response: success

```
HTTP/1.1 200 OK
{
  "status": "pending or rejected or complete",
  "data": {
      "id": "Order's Object ID",
      "restaurant": "RESTAURANT NAME",
      "orderList": ["MENU NUMBER"],
      "totalPrice": "Total Price",
      "createdAt": "2022-04-21T05:22:05.709Z"
  }
}
```

---

## Get Menus

### [Request]

#### URL

```
GET /menus/:restaurantId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### body

```

```

### [Response]

| Name  | Type  | Description                                                          | Required |
| :---- | :---- | :------------------------------------------------------------------- | :------: |
| menus | Array | This value is an array of menu objects registered at the restaurant. |    O     |

### [Sample]

#### Response: success

```
HTTP/1.1 200 OK
{
  "menus": [{MENU}]
}
```

---

## Add Menu

Restaurant-type user can add menus. The menu will be added to the menu list.

### [Request]

#### URL

```
POST /menus/:restaurantId HTTP/1.1
Host : http://127.0.0.1:4000
```

#### body

| Key             | Description                               | Type   | Required |
| :-------------- | :---------------------------------------- | :----- | :------: |
| menuName        | The name of this menu                     | String |    O     |
| menuDescription | Default: "We serve delicious food." <br/> | String |    X     |
| price           | The price of this menu. The unit is KRW.  | Number |    O     |

### [Response]

| Name            | Type   | Description                                                                                                                                                                                                                                           | Required |
| :-------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| menuName        | String | The name of this menu                                                                                                                                                                                                                                 |    O     |
| menuDescription | String | Default: "We serve delicious food." <br/>                                                                                                                                                                                                             |    O     |
| price           | Number | The price of this menu. The unit is KRW.                                                                                                                                                                                                              |    O     |
| message         | String | If the same menu name exists, adding a menu fails. <br/> When restaurant-type user added menu successfully on the menu list, the message is "Add Menu Successfully". When restaurant-type user failed to add menu, the message is "Fail to Add Menu". |    O     |

### [Sample]

#### req.body

```
{
  "menuName": "MENU NAME",
  "menuDescription": "MENU DESCRIPTION",
  "price": "MENU PRICE
}
```

#### Response: success

```
HTTP/1.1 200 OK
{
  "menuName": "MENU NAME",
  "menuDescription": "MENU DESCRIPTION",
  "price": "MENU PRICE
  "message": "Add Menu Successfully"
}
```

---
