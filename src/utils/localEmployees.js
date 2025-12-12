const STORAGE_KEY = 'ems_employees_v1';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('localEmployees read error', err);
    return null;
  }
}

function writeStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []));
  } catch (err) {
    console.error('localEmployees write error', err);
  }
}

export function getAllEmployees() {
  return readStorage() || [];
}

export function getEmployeeById(id) {
  const list = getAllEmployees();
  return list.find((e) => String(e.id) === String(id)) || null;
}

function makeId() {
  // simple unique id for demo purposes
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function addEmployee(emp) {
  const list = getAllEmployees();
  const newEmp = {
    id: emp.id ?? makeId(),
    name: emp.name || 'New Employee',
    position: emp.position || '',
    phone: emp.phone || '',
    email: emp.email || '',
    image_url: emp.image_url || `https://i.pravatar.cc/150?u=${Math.random()}`,
    linkedin_link: emp.linkedin_link || '',
    bio: emp.bio || '',
  };
  list.unshift(newEmp);
  writeStorage(list);
  return newEmp;
}

export function updateEmployee(id, patch) {
  const list = getAllEmployees();
  const idx = list.findIndex((e) => String(e.id) === String(id));
  if (idx === -1) return null;
  const updated = { ...list[idx], ...patch };
  list[idx] = updated;
  writeStorage(list);
  return updated;
}

export function removeEmployee(id) {
  const list = getAllEmployees();
  const newList = list.filter((e) => String(e.id) !== String(id));
  writeStorage(newList);
  return newList;
}

export function initFromList(list) {
  if (!Array.isArray(list)) return;
  try {
    writeStorage(list);
  } catch (err) {
    console.error('localEmployees init error', err);
  }
}

export default {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  removeEmployee,
  initFromList,
};
