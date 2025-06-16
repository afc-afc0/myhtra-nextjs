To Do:

1. Lexical Rich extent it with Image, Select, Code, Points, Header(BlockFormatDropdown in )

For Updating the site for now, should create a script for this:

1. sudo docker build . -t icanjump/myhtra-nextjs
2. sudo docker push icanjump/myhtra-nextjs
3. k rollout restart deployment myhtra-deployment

Jun 16: Updated next.config because there was an issue with CSS order on deployment: https://github.com/vercel/next.js/issues/64921
For resolving this issue I updated the shared styles of that component and carried to globals.css which I didn't wanted to do.
