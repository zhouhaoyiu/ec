const express = require('express');  
const bodyParser = require('body-parser');  
const sendObjectsRouter = require('./sendObjects');  
const receiveObjectsRouter = require('./receiveObjects');  
  
const app = express();  
app.use(bodyParser.json()); // 用于解析JSON数据  
app.use('/api', sendObjectsRouter); // 发送对象的路由前缀为 /api  
app.use('/api', receiveObjectsRouter); // 接收对象的路由也使用 /api 前缀（注意：在实际应用中，你可能会希望使用不同的前缀或路径来区分它们）  
  
const PORT = process.env.PORT || 3001;  
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}.`);  
});