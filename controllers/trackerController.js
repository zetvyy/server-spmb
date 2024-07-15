const Profile = require("../models/Profile");
const Projects = require("../models/Projects");
const Topic = require("../models/Topic");
const response = require("../response");
const jwt = require("jsonwebtoken");
const REFRESH_SECRET = "refreshSecret";

module.exports = {
  getProfile: async (req, res) => {
    const authHeader = req.headers["authorization"]; // Mendapatkan header Authorization

    if (!authHeader) {
      return response(400, null, "Token tidak disediakan", res);
    }

    const refreshToken = authHeader.split(" ")[1]; // Mengambil token dari header

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const userId = decoded.id;

      const profile = await Profile.findOne({ userId: userId });
      if (profile) {
        return response(200, profile, "Fetching Data berhasil", res);
      } else {
        return response(404, null, "Profile tidak ditemukan", res);
      }
    } catch (error) {
      response(500, null, "Fetching data tidak berhasil", res);
    }
  },

  addProfile: async (req, res) => {
    const { imageUrl, nama, jurusan, peminatan, keahlian, refreshToken } =
      req.body;

    if (!refreshToken) {
      return response(400, null, "Token tidak disediakan", res);
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const userId = decoded.id;

      const dataProfile = await Profile.create({
        imageUrl: imageUrl,
        nama: nama,
        jurusan: jurusan,
        peminatan: peminatan,
        keahlian: keahlian,
        userId: userId,
      });

      response(200, dataProfile, "Berhasil menambahkan data profile", res);
    } catch (error) {
      response(500, null, "gagal menambahkan data profile", res);
    }
  },

  editProfile: async (req, res) => {
    const { imageUrl, nama, jurusan, peminatan, keahlian, refreshToken } =
      req.body;
    if (!refreshToken) {
      return response(400, null, "Token tidak disediakan", res);
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const userId = decoded.id;
    try {
      const profile = await Profile.findOne({ userId: userId });
      if (!profile) {
        return response(404, null, "Profile tidak ditemukan", res); // Tambahkan pengecekan ini
      }
      profile.imageUrl = imageUrl;
      profile.nama = nama;
      profile.jurusan = jurusan;
      profile.peminatan = peminatan;
      profile.keahlian = keahlian;

      await profile.save();
      response(200, "valid", "Berhasil edit profile", res);
    } catch (error) {
      response(500, console.log(error), "Gagal edit profile", res);
    }
  },

  getProject: async (req, res) => {
    const authHeader = req.headers["authorization"]; // Mendapatkan header Authorization

    if (!authHeader) {
      return response(400, null, "Token tidak disediakan", res);
    }

    const refreshToken = authHeader.split(" ")[1]; // Mengambil token dari header

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const userId = decoded.id;

      const project = await Projects.findOne({ userId: userId });
      if (project) {
        return response(200, project, "Fetching Data berhasil", res);
      } else {
        return response(404, null, "Project tidak ditemukan", res);
      }
    } catch (error) {
      response(500, null, "Fetching data tidak berhasil", res);
    }
  },

  addProjects: async (req, res) => {
    const { imageUrl, nama, deskripsi, refreshToken } = req.body;

    if (!refreshToken) {
      return response(400, null, "Token tidak disediakan", res);
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const userId = decoded.id;

      const dataProject = await Projects.create({
        imageUrl: imageUrl,
        nama: nama,
        deskripsi: deskripsi,
        userId: userId,
      });

      response(200, dataProject, "Berhasil menambahkan data project", res);
    } catch (error) {
      response(500, console.log(error), "gagal menambahkan data project", res);
    }
  },

  getTopic: async (req, res) => {
    const authHeader = req.headers["authorization"]; // Mendapatkan header Authorization

    if (!authHeader) {
      return response(400, null, "Token tidak disediakan", res);
    }

    const refreshToken = authHeader.split(" ")[1]; // Mengambil token dari header

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const userId = decoded.id;

      const topic = await Topic.findOne({ userId: userId });
      if (topic) {
        return response(200, topic, "Fetching Data berhasil", res);
      } else {
        return response(404, null, "Project tidak ditemukan", res);
      }
    } catch (error) {
      response(500, null, "Fetching data tidak berhasil", res);
    }
  },

  addTopic: async (req, res) => {
    const { topikPembelajaran, refreshToken } = req.body;

    if (!refreshToken) {
      return response(400, null, "Token tidak disediakan", res);
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const userId = decoded.id;

      const topics = await Topic.create({
        topikPembelajaran: topikPembelajaran,
        userId: userId,
      });

      response(200, topics, "Berhasil menambahkan data topik", res);
    } catch (error) {
      response(500, console.log(error), "gagal menambahkan data topik", res);
    }
  },
};
