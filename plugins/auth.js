export default defineNuxtPlugin((apiFetch) => {
  const checkAuth = async (username, password, app) => {
    const response = await apiFetch("/auth", {
      method: "POST",
      body: {
        username,
        password,
        app,
      },
    });
  };
});
