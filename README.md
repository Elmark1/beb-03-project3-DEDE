# beb-03-project3-team6

## Git Strategy

- codestates의 remote repository를 로컬로 clone 후 작업
- 자신의 브랜치를 생성 후 작업은 해당 브랜치에서만 실시 (명령어: git checkout -b 브랜치명)
- 매일 code review meeting 전에 작업한 자신의 브랜치를 remote repository로 푸쉬 (명령어: git push origin 자신의 브랜치 이름)
- GitHub에서 자신의 브랜치에서 dev 브랜치로 pull request 실시
- 모든 pull request를 확인하고 모든 작업들을 dev 브랜치로 merge
- dev 브랜치의 merge가 끝났다면 각자의 local repository의 자신의 브랜치를 최신화
  - remote repository의 dev 브랜치를 local repository의 dev 브랜치로 pull (명령어: git checkout dev 후 git pull origin dev)
  - 자신의 브랜치로 변경한 후 dev 브랜치를 자신의 브랜치로 merge (명령어: git checkout 자신의 브랜치 후 git merge dev)
  - 이후 자신의 브랜치에서 계속 작업 실시
- commit 할 때 commit message는 항상 영어 동사로 시작, 첫 글자는 대문자 (예: 'Finish user route', 명령어: git commit -m 'Finish user route')

## DB Schema

### Contract Model

- type: String (해당 contract가 FT인지 NFT인지 확인하기 위한 필드)
- address: String (해당 contract의 주소)

### Admin Model

- type: String (해당 admin account가 어떤 용도인지 확인하기 위한 필드)
- address: String (해당 account의 주소)
- privateKey: String (해당 account의 private key)

### Customer Model

- userId: String
- password: String
- customerAddress: String
- phoneNumber: String
- address: String
- privateKey: String
- token: Number
- nft: [String]

### Restaurant Model

- userId: String
- password: String
- restaurantName: String
- restaurantAddress: String
- restaurantNumber: String
- menu: [{menuName: String, menuPrice: Number}]
- address: String
- privateKey: String
- token: Number
- stakedToken: Number
- sellingNft: [{restaurantId: ObjectId, restaurantName: String, discountRate: Number, nftPrice: Number}]

### DeliveryMan Model

- userId: String
- password: String
- phoneNumber: String
- address: String
- privateKey: String
- token: Number
- stakedToken: Number

### Order Model

- customerUserId: String
- restaurantUserId: String
- deliveryManUserId: String
- orderedMenu: [{menuName: String, menuPrice: Number}]
- status: String (현재 주문이 어떤 상태인지 나타냄 / 'Pending', 'Rejected', 'Cooking', 'Delivery', 'Completed')

## API

### Create Customer Account

#### Request

`POST /customer`

#### Required Body

```
{
  userId: String,
  password: String,
  customerAddress: String,
  phoneNumber: String
}
```

#### Response

```
{
  message: 'Created'
}
```

### Create Restaurant Account

#### Request

`POST /restaurant`

#### Required Body

```
{
  userId: String,
  password: String,
  restaurantName: String,
  restaurantAddress: String,
  restaurantNumber: String
}
```

#### Response

```
{
  message: 'Created'
}
```

### Create Delivery Man Account

#### Request

`POST /deliveryman`

#### Required Body

```
{
  userId: String,
  password: String,
  phoneNumber: String,
}
```

#### Response

```
{
  message: 'Created'
}
```

### Log in by Customer Account

#### Request

`POST /customer/login`

#### Required Body

```
{
  userId: String,
  password: String
}
```

#### Response

```
{
  jsonWebToken: String,
  userId: String
}
```

### Log in by Restaurant Account

#### Request

`POST /restaurant/login`

#### Required Body

```
{
  userId: String,
  password: String
}
```

#### Response

```
{
  jsonWebToken: String,
  userId: String
}
```

### Log in by Delivery Man Account

#### Request

`POST /deliveryman/login`

#### Required Body

```
{
  userId: String,
  password: String
}
```

#### Response

```
{
  jsonWebToken: String,
  userId: String
}
```

### Get Customer Information

#### Request

`GET /customer/:userId`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Response

```
{
  userId: String,
  customerAddress: String,
  phoneNumber: String,
  address: String,
  token: Number,
  nft: [String]
}
```

### Get Restaurant Information

#### Request

`GET /restaurant/:userId`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Response

```
{
  userId: String,
  restaurantName: String,
  restaurantAddress: String,
  restaurantNumber: String,
  menu: [{menuName: String, menuPrice: Number}],
  address:String,
  token: Number,
  stakedToken: Number,
  sellingNft: [{restaurantId: ObjectId, restaurantName: String, discountRate: Number, nftPrice: Number}]
}
```

### Get Delivery Man Information

#### Request

`GET /deliveryman/:userId`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Response

```
{
  userId: String,
  phoneNumber: String,
  adress: String,
  token: Number,
  stakedToken: Number
}
```

### Get Restaurants

#### Request

`GET /restaurant`

#### Response

```
[
  {
	restaurantName: String,
	restaurantAddress: String,
	restaurantNumber: String,
	menu: [{menuName: String, menuPrice: Number}],
	stakedToken: Number,
	sellingNft: [{restaurantId: ObjectId, restaurantName: String, discountRate: Number, nftPrice: Number}]
  },
  {...},
  {...}, ...
]
```

### Create Order

#### Request

`POST /order`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Required Body

```
{
  customerUserId: String,
  restaurantUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Pending'
}
```

#### Response

```
{
  message: 'Created'
}
```

### Get Orders

#### Request

`GET /order`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Response

```
[
  {
	customerUserId: String,
	restaurantUserId: String,
	deliveryManUserId: String,
	orderedMenu: [{menuName: String, menuPrice: Number}],
	status: String
  },
  {...},
  {...}, ...
]
```

### Accept or Reject Order

#### Request

`PATCH /order/:orderId(ObjectId)`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Required Body

```
{
  status: 'Cooking' or 'Rejected'
}
```

#### Response

```
{
  customerUserId: String,
  restaurantUserId: String,
  deliveryManUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Cooking' or 'Rejected'
}
```

### Take Order for Delivery

#### Request

`PATCH /order/:orderId(ObjectId)`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Required Body

```
{
  status: 'Delivery'
}
```

#### Response

```
{
  customerUserId: String,
  restaurantUserId: String,
  deliveryManUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Delivery'
}
```

### Finish Order

#### Request

`PATCH /order/:orderId(ObjectId)`

#### Required Header

`Authorization: Bearer jsonWebToken`

#### Required Body

```
{
  status: 'Completed'
}
```

#### Response

```
{
  customerUserId: String,
  restaurantUserId: String,
  deliveryManUserId: String,
  orderedMenu: [{menuName: String, menuPrice: Number}],
  status: 'Completed'
}
```
