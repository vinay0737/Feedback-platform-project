const express = require("express");
const Response = require("../models/Response");
const router = express.Router();

router.post("/:formId", async (req, res) => {
  const { answers } = req.body;
  await Response.create({ formId: req.params.formId, answers });
  res.json({ message: "Response submitted" });
});

router.get("/form/:formId", async (req, res) => {
  const responses = await Response.find({ formId: req.params.formId });
  res.json(responses);
});

module.exports = router;
