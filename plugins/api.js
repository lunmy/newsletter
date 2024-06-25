export default defineNuxtPlugin((apiFetch) => {
  const getCompanies = async (criteria) => {
    const response = await apiFetch("/companies", {
      method: "GET",
    });
  };

  const getOneCompany = async (id) => {
    const response = await apiFetch(`${id}`, {
      method: "GET",
    });
  };
  const updateCompany = async (id, data) => {
    const response = await apiFetch(`${id}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    });
  };
});
