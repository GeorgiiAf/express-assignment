
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { cat_id: rows[0].insertId };
};

const updateCat = async (catId, catData, userId, userRole) => {
  const sql = userRole === 'admin'
    ? `UPDATE wsk_cats SET ? WHERE cat_id = ?`
    : `UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`;

  const params = userRole === 'admin'
    ? [catData, catId]
    : [catData, catId, userId];

  const [result] = await promisePool.execute(sql, params);
  return result.affectedRows > 0;
};

const removeCat = async (catId, userId, userRole) => {
  const sql = userRole === 'admin'
    ? `DELETE FROM wsk_cats WHERE cat_id = ?`
    : `DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?`;

  const [result] = await promisePool.execute(
    sql,
    userRole === 'admin' ? [catId] : [catId, userId]
  );

  return result.affectedRows > 0;
};

const findCatsByUser = async (ownerId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [ownerId]
  );
  return rows;
};




export { listAllCats, findCatById, addCat, updateCat, removeCat, findCatsByUser };