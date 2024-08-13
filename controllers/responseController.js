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
      const email = req.headers["x-user-email"];

      if (!email) {
        return response(400, null, "Email tidak diberikan", res);
      }
      client = await MongoClient.connect(mongoURL);
      const db = client.db(dbName);
      const collection = db.collection("response"); // Ganti dengan nama koleksi Anda

      const formResponse = await collection.findOne({ email: email });
      if (formResponse.length === 0) {
        return response(
          404,
          null,
          "Data tidak ditemukan untuk email tersebut",
          res
        );
      } else {
        response(
          200,
          formResponse,
          "Get Form Response Tes Minat berhasil",
          res
        );
      }
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
