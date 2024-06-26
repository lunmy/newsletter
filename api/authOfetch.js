export default ({ apiFetch }) => ({
  /**
   * Method to check authentication for a user.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @param {string} app - The application for which authentication is being checked.
   * @returns {Promise} A promise that resolves with the result of the authentication check.
   */
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
