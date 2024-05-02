export const getCurrentUser = async () => {
  try {
    const res = await fetch("/api/v1/users/user");
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
