# Model Discussion
## User Model
- id
- name
- email
- password in hashed

## Item Model
- id
- name
- description
- price
- image
- category
- status
- created_at
- updated_at



## Auction Model
- id
- item_id
- start_time
- end_time
- status
- created_at
- updated_at

## Bid Model
- id
- auction_id
- bidder_id
- amount
- created_at
- updated_at

