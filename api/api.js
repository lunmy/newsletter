export default ({ apiFetch }) => ({
  /**
   * Retrieves all companies based on the provided criteria.
   *
   * @param {Object} criteria - The criteria to filter the companies.
   * @returns {Array} - An array of companies that match the criteria.
   */
  async getAllCompanies(criteria) {
    const datas = [];
    let page =
      criteria === null || criteria.page === undefined ? 1 : criteria.page;
    let hasNext = true;
    do {
      // use raw fetch to catch the status code
      const xhr = await apiFetch.raw("/companies", {
        method: "GET",
        params: { ...criteria, page },
      });
      if (xhr.status === 200) {
        const response = xhr._data;
        let companies = await response["hydra:member"];
        companies.forEach((company) => {
          datas.push(company);
        });

        if (!response["hydra:view"]["hydra:next"]) {
          hasNext = false;
        }
        page++;
      }
    } while (hasNext);

    return datas;
  },

  async getOneCompany(id) {
    const xhr = await apiFetch.raw(`/companies/${id}`, {
      method: "GET",
    });
    if (xhr.status === 200) {
      return await xhr._data;
    }
    return null;
  },
  async updateCompany(id, data) {
    const xhr = await apiFetch.raw(`/companies/${id}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    });
    if (xhr.status === 200) {
      return xhr._data;
    }
    return null;
  },

  async removeCompanyImage(idComp, idImg) {
    const xhr = await apiFetch.raw(`/companies/${idComp}/image/${idImg}`, {
      method: "DELETE",
    });
  },

  async setCompanyIamge(idComp, data) {
    const xhr = await apiFetch.raw(`/companies/${idComp}/image`, {
      body: data,
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        // "Content-Type": "application/ld+json",
      },
    });
  },
});
