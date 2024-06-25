export default ({ apiFetch }) => ({
  async checkAuth(username, password, app) {
    return await apiFetch("/auth", {
      method: "POST",
      body: {
        username,
        password,
        app,
      },
    });
  },
});
