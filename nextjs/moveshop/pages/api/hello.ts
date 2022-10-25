export default function handler(req, res) {
  if (req.methos == "POST") {
    res.status(200).json({ result: "Hello POST" });
  } else {
    res.status(200).json({ result: "Hello GET" });
  }
}
