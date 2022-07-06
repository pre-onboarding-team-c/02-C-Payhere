dockerize -wait tcp://mysql:3306 -timeout 30s

echo "Start server"
npm run start:prod