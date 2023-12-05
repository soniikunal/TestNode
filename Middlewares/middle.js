const handleServerError = (res, message) => {
  return res.status(500).json({ error: message || "Internal Server Error" });
};

const handleNotFound = (res, message) => {
  return res.status(404).json({ error: message || "Not found" });
};

const successfullResponse = (res, message) => {
  return res.status(404).json({ error: message || "Not found" });
};

export  { handleServerError, handleNotFound };
