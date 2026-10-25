const { checkValues } = require('../utils/bloodPressure');

const NIS_PATTERN = /^\d{5}$/;

function toInteger(value) {
  if (typeof value === 'number') return value;
  const text = String(value ?? '').trim();
  return /^\d+$/.test(text) ? Number(text) : NaN;
}

function validateReading(req, res, next) {
  const body = req.body || {};

  const data = {
    nama_siswa: String(body.nama_siswa ?? '').trim(),
    nis: String(body.nis ?? '').trim(),
    kelas: String(body.kelas ?? '').trim(),
    pengukuran_ke: toInteger(body.pengukuran_ke),
    sistolik: toInteger(body.sistolik),
    diastolik: toInteger(body.diastolik)
  };

  const errors = [];

  if (!data.nama_siswa) errors.push('Nama siswa wajib diisi.');
  else if (data.nama_siswa.length > 100) errors.push('Nama siswa maksimal 100 karakter.');

  if (!data.nis) errors.push('NIS wajib diisi.');
  else if (!NIS_PATTERN.test(data.nis)) errors.push('NIS harus 5 digit angka.');

  if (!data.kelas) errors.push('Kelas wajib diisi.');
  else if (data.kelas.length > 20) errors.push('Kelas maksimal 20 karakter.');

  if (![1, 2, 3].includes(data.pengukuran_ke)) {
    errors.push('Pengukuran ke- harus 1, 2, atau 3.');
  }

  errors.push(...checkValues(data.sistolik, data.diastolik));

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

function validateClassifyQuery(req, res, next) {
  const sistolik = toInteger(req.query.sistolik);
  const diastolik = toInteger(req.query.diastolik);
  const errors = checkValues(sistolik, diastolik);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  req.bp = { sistolik, diastolik };
  next();
}

function validateReadingId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: 'ID pengukuran tidak valid.' });
  }

  req.readingId = id;
  next();
}

module.exports = { validateReading, validateClassifyQuery, validateReadingId };
