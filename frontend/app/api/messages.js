import client from "./client";

const send = (message, listingId) =>
  client.post("/messages", {
    message,
    listingId,
  });

const get = () => client.get("/messages");

export default {
  send,
  get,
};
