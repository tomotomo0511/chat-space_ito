# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
## Association
- has_many :messages
- has_many :groups


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|
## Association
- belongs_to :user
- has_many :groups_users


## groupsテーブル
|Colum|Type|Options|
|-----|----|-------|
|groupname|text|null: false|
|user_id|integer|null: false, foreign_key: true|
## Association
- belongs_to :user
- has_many :groups_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
