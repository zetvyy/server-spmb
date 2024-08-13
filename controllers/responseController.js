const response = require("../response");
const { MongoClient } = require("mongodb");

const mongoURL =
  "mongodb+srv://athallahzaidandev:Idan123@cluster0.njiqqzk.mongodb.net/";
const dbName = "test";

module.exports = {
  responseForm: async (req, res) => {
    const formData = req.body;
    const newResponse = new Response({ responses: formData });
    try {
      await newResponse.save();
      response(201, formData, "Form saved succesfully!", res);
    } catch (error) {
      response(400, "invalid", "Error saving form data", res);
    }
  },
  getDataTest: async (req, res) => {
    let client;
    try {
      client = await MongoClient.connect(mongoURL);
      const db = client.db(dbName);
      const collection = db.collection("response"); // Ganti dengan nama koleksi Anda
      const emailUser = localStorage.getItem("email");

      const formResponse = await collection.findOne({ email: emailUser });
      response(200, formResponse, "Get Form Response Tes Minat berhasil", res);
    } catch (error) {
      console.error("Error in getDataTest:", error);
      response(500, null, "Terjadi kesalahan saat mengambil data", res);
    } finally {
      if (client) {
        await client.close();
      }
    }
  },
};
