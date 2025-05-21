# Quick setup and run

## Quick setup

### 1. Download repository to your workspace directory from github:

```
git clone https://github.com/Scribbler-Holdings-Limited/shopify_store_theme
```

## 2. Repository structure

```
master -> for live shop
staging -> for aproval before pushing to master/live
development -> for development
```

## 3. Updating all themes and synchronization (both ways)

### From local workstation

- use development branch and make changes,
- commit them and push to github,
- changes will be automatically updated on Shopify

### From shopify editor

- use "customize" button and edit theme settings in shopify (3 themes connected to corresponding branches)
- save changes using Save button in theme editor
- changes will be automatically pushed to repository
- to see changes in your local repository use "git pull" command on corresponding branch
