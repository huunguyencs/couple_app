import axios from "axios";

const imageService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:3000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

export default imageService;
