const users = [
  { user: "user", password: "pass", role: "admin", token: "admin" },
];

export function checkUsername(username, password) {
  const userInfo = users.find(
    (u) => u.user === username && u.password === password
  );
  return userInfo ? { token: userInfo.token, role: userInfo.role } : null;
  // return user ? user.token : ''
}
