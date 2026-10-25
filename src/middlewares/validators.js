const NIS_PATTERN = /^\d{5}$/;

function validatePatient(req, res, next) {
  const body = req.body || {};

  const data = {
    nama_siswa: String(body.nama_siswa ?? '').trim(),
    nis: String(body.nis ?? '').trim(),
    kelas: String(body.kelas ?? '').trim(),
    keluhan: String(body.keluhan ?? '').trim()
  };

  const errors = [];

  if (!data.nama_siswa) errors.push('Nama siswa wajib diisi.');
  else if (data.nama_siswa.length > 100) errors.push('Nama siswa maksimal 100 karakter.');

  if (!data.nis) errors.push('NIS wajib diisi.');
  else if (!NIS_PATTERN.test(data.nis)) errors.push('NIS harus 5 digit angka.');

  if (!data.kelas) errors.push('Kelas wajib diisi.');
  else if (data.kelas.length > 20) errors.push('Kelas maksimal 20 karakter.');

  if (!data.keluhan) errors.push('Sakit/keluhan wajib diisi.');
  else if (data.keluhan.length > 1000) errors.push('Sakit/keluhan maksimal 1000 karakter.');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Data belum lengkap atau tidak valid.',
      errors
    });
  }

  req.body = data;
  next();
}

function validateId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: 'ID pasien tidak valid.' });
  }

  req.patientId = id;
  next();
}

module.exports = { validatePatient, validateId };