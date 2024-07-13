export const registerUserService = async (userData:any) => {
  const dummyDatabase = [];
  const newUser = { id: dummyDatabase.length + 1, ...userData };
  dummyDatabase.push(newUser);
  return newUser;
};
