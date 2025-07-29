const Laporan = require('../models/Laporan');
const path = require('path');

// GET ALL
const getAllLaporan = async (req, res) => {
  try {
    console.log('USER:', req.user); // pastikan ini muncul
    const laporan = await Laporan.find().sort({ createdAt: -1 });
    res.json(laporan);
  } catch (err) {
    console.error('Error fetching laporan:', err); // lihat error detail
    res.status(500).json({ msg: 'Server error' });
  }
};


// GET BY USER
const getUserLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.find({ user: req.user.id });
    res.json(laporan);
  } catch (err) {
    console.error('Error fetching user laporan:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// GET BY ID
const getLaporanById = async (req, res) => {
  try {
    const laporan = await Laporan.findById(req.params.id);
    if (!laporan) return res.status(404).json({ msg: 'Laporan not found' });
    res.json(laporan);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// CREATE
const createLaporan = async (req, res) => {
  try {
    const { nama_merk, npwpd, alamat, hasil_pemeriksaan } = req.body;
    const foto = req.files ? req.files.map(file => file.filename) : [];
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    
    const laporan = new Laporan({
      user: req.user.id,
      nama_merk,
      npwpd,
      alamat,
      hasil_pemeriksaan,
      foto,
      latitude,
      longitude     
    });

    await laporan.save();
    res.status(201).json(laporan);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// UPDATE STATUS
const updateStatusLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findById(req.params.id);
    if (!laporan) return res.status(404).json({ msg: 'Laporan not found' });

    laporan.status = req.body.status || laporan.status;
    await laporan.save();
    res.json(laporan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// DELETE
const deleteLaporan = async (req, res) => {
  try {
    await Laporan.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Laporan deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// SEND PDF (placeholder, sesuaikan jika pakai WhatsApp logic)
const generateAndSendPdf = async (req, res) => {
  try {
    // Kirim file PDF logic
    res.json({ msg: 'PDF sent (dummy)' });
  } catch (err) {
    console.error('PDF error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Export semua
module.exports = {
  getAllLaporan,
  getUserLaporan,
  getLaporanById,
  createLaporan,
  updateStatusLaporan,
  deleteLaporan,
  generateAndSendPdf
};
