export default ({ apiFetch }) => ({
  async checkAuth(email, password) {
    return await apiFetch("/auth", {
      method: "POST",
      body: {
        email,
        password,
      },
    });
  },
});
