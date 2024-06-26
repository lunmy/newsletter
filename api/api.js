export default ({ apiFetch }) => ({
  async getCompanies(criteria) {
    return await apiFetch("/companies", {
      method: "GET",
      params: { ...criteria },
    });
  },

  async getOneCompany(id) {
    const response = await apiFetch(`${id}`, {
      method: "GET",
    });
  },
  async updateCompany(id, data) {
    const response = await apiFetch(`${id}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    });
  },
});
