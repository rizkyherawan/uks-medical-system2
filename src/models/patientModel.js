const { pool } = require('../config/db');

const COLUMNS = 'id, nama_siswa, nis, kelas, keluhan, created_at, updated_at';

const PatientModel = {
  async findAll({ search = '' } = {}) {
    let sql = `SELECT ${COLUMNS} FROM patients`;
    const params = [];

    if (search) {
      sql += ' WHERE nama_siswa LIKE ? OR nis LIKE ? OR kelas LIKE ? OR keluhan LIKE ?';
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }

    sql += ' ORDER BY created_at DESC, id DESC';
    const [rows] = await pool.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(`SELECT ${COLUMNS} FROM patients WHERE id = ?`, [id]);
    return rows[0] || null;
  },

  async create({ nama_siswa, nis, kelas, keluhan }) {
    const [result] = await pool.execute(
      'INSERT INTO patients (nama_siswa, nis, kelas, keluhan) VALUES (?, ?, ?, ?)',
      [nama_siswa, nis, kelas, keluhan]
    );
    return result.insertId;
  },

  async update(id, { nama_siswa, nis, kelas, keluhan }) {
    const [result] = await pool.execute(
      'UPDATE patients SET nama_siswa = ?, nis = ?, kelas = ?, keluhan = ? WHERE id = ?',
      [nama_siswa, nis, kelas, keluhan, id]
    );
    return result.affectedRows;
  },

  async remove(id) {
    const [result] = await pool.execute('DELETE FROM patients WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = PatientModel;