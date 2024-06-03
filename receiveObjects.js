const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/handle", (req, res) => {
  try {
    const { body } = req;
    try {
      let startTime = performance.now();

      const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf8");
      const parsedData = JSON.parse(data);
      const objects = parsedData;

      // 查找父对象和所有子对象
      let parent = null;
      let children = [];
      objects.forEach((obj) => {
        if (obj.pid) {
          children.push(obj);
        } else {
          parent = obj;
        }
      });

      if (!parent || children.length === 0) {
        return res
          .status(400)
          .send("Invalid objects: no parent or children found");
      }

      const parentSum = parent.number;
      const childrenSum = children.reduce(
        (sum, child) => sum + child.number,
        0
      );
      const ratio = parentSum / childrenSum;
      console.log("总分表比例是:", ratio);

      res.json({ ratio });
      let endTime = performance.now();
      let timeTaken = endTime - startTime;
      console.log(`Execution time: ${timeTaken.toFixed(3)}ms`); // 使用 toFixed 保留3位小数
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error calculating ratio");
  }
});

module.exports = router;
