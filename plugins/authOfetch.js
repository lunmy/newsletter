export default ({ ofetch }) => ({
  async checkAuth(username, password, app) {
    return await ofetch("/auth", {
      method: "POST",
      body: {
        username,
        password,
        app,
      },
    });
  },
});
