export default defineNuxtPlugin((nuxtApp) => {
  const getCompanies = async (criteria) => {
    const response = await ofetch("/companies", {
      method: "GET",

    });
  };

  const getOneCompany = async (id) => {
    const response = await ofetch(`${id}`, {
      method: "GET",

    });
  };
  const updateCompany = async (id, data) => {
    const response = await ofetch(`${id}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/merge-patch+json"
      }
    });
  };

});
