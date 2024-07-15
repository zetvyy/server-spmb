const response = require("../response");

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
};
