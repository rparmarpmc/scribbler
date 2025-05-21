#!/bin/bash
if [ -e ../shopify_store_theme/assets/react-admin.js ]; then
  sed -i 's|assets_replace|assets|g' ../shopify_store_theme/assets/react-admin.js
  sed -i 's|static/js/||g' ../shopify_store_theme/assets/react-admin.js
  sed -i 's|static/css/||g' ../shopify_store_theme/assets/react-admin.js
fi