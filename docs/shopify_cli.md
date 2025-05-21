# Usage of shopify CLI

## Install

(https://shopify.dev/themes/tools/cli/installation)

Windows - RubyGems.org

```
gem install shopify-cli
```

MacOS - RubyGems.org

```
gem install shopify-cli
```

MacOS - Homebrew

```
brew tap shopify/shopify
brew install shopify-cli
```

Linux - RubyGems.org

```
gem install shopify-cli
```

### 1. Login

CLI login to Scribbler online shop

```
shopify logout
shopify login --password "" --store STORE  --> example
shopify login --password "" --store scribbler-development --> development
shopify login --store=https://scribbler-cards-gifts.myshopify.com --> production
```

### 2. push/pull themes

It is preferable to update themes by git however you can also push and pull curent versions using CLI

```
shopify theme push
shopify theme pull
```

### 3. Serve

Run this command in main directory and it will run your local version of theme and also give you links to open shop front and admin

```
shopify theme serve
```
