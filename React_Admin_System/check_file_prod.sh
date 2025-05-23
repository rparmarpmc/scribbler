#!/bin/bash
export CDN_FOLDER="cdn/shop/t/52/assets"
if [ -e ../shopify_store_theme/assets/react-admin.js ]; then
  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    sed -i "s|assets_replace|$CDN_FOLDER|g" ../shopify_store_theme/assets/react-admin.js &&
    sed -i "s|static/js/||g" ../shopify_store_theme/assets/react-admin.js &&
    sed -i "s|static/css/||g" ../shopify_store_theme/assets/react-admin.js
  else
    sed -i "s|assets_replace|$CDN_FOLDER|g" ../shopify_store_theme/assets/react-admin.js &&
    sed -i "s|static/js/||g" ../shopify_store_theme/assets/react-admin.js &&
    sed -i "s|static/css/||g" ../shopify_store_theme/assets/react-admin.js
  fi
fi