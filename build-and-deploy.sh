npm run build
rm -rf ../tomowallet-backend/applications/news/css
rm -rf ../tomowallet-backend/applications/news/index.html
rm -rf ../tomowallet-backend/applications/news/fonts
rm -rf ../tomowallet-backend/applications/news/img
rm -rf ../tomowallet-backend/applications/news/js
rm -rf ../tomowallet-backend/applications/news/favicon.ico

mv ./dist/* ../tomowallet-backend/applications/news