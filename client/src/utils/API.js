import axios from "axios";
// eslint-disable-next-line
export default {
  getUploads: function () {
    return axios.get("/api/uploads");
  },
  getUpload: function (_id) {
    return axios.get("/api/uploads/" + _id);
  },
  deleteUpload: function (_id) {
    return axios.delete("/api/uploads/" + _id);
  },
  saveUpload: function (uploadData) {
    return axios.post("/api/uploads", uploadData);
  },

};
