const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// 生成一个随机数在指定范围内
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成一个子对象
function generateChildObject(parentId) {
  const id = Math.random().toString(36).substring(7); // 生成一个随机的id
  const number = getRandomInt(100, 150); // 生成100-150的随机数
  return { pid: parentId, id, number };
}

// 生成一个包含父对象和五个子对象的数组
function generateObjects() {
  const parentId = 10000; // 父对象的id
  const childLength = 20;
  const childNumberMin = 100;
  const childNumberMax = 150;
  const numMin = childLength * childNumberMin;
  const numMax = childLength * childNumberMax;
  const parentNumber = getRandomInt(numMin, numMax); // 父对象的数据
  const parent = { id: parentId, number: parentNumber };
  const children = Array.from({ length: childLength }, () =>
    generateChildObject(parentId)
  );
  return [parent, ...children];
}

router.get("/init", (req, res) => {
  try {
    const objects = generateObjects();
    const jsonData = JSON.stringify(objects, null, 2);
    fs.writeFile(path.join(__dirname, "data.json"), jsonData, "utf8", (err) => {
      if (err) throw err;
      console.log("Data has been written to data.json");
    });
    res.status(200).appsend("数据发送成功  ")
  } catch (error) {
    res.status(500).send("Error generating objects");
  }
});

module.exports = router;
