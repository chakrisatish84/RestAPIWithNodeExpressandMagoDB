const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Getting All
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one

router.get("/:id", getSubsciberById, (req, res) => {
  res.json(res.subscriber);
});

//Create one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    role: req.body.role
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one
router.patch("/:id", getSubsciberById, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.role != null) {
    res.subscriber.role = req.body.role;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
      res.status(400).json({message:err.message})
  }
});

//Delete one
router.delete("/:id", getSubsciberById, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.status(200).json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubsciberById(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: "cannot find the subscriber" });
    }
    res.subscriber = subscriber;
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

module.exports = router;
