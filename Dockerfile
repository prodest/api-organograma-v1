FROM nodesource/node:6

ADD . .

EXPOSE 3000 

CMD ["node", "server/bin/www"]
