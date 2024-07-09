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

  /**
   * Retrieves a single company based on the provided ID.
   *
   * @param {number} id - The ID of the company to retrieve.
   * @returns {Object|null} - The company object if found, or null if not found.
   */
  async getOneCompany(id) {
    const xhr = await apiFetch.raw(`/companies/${id}`, {
      method: "GET",
    });
    if (xhr.status === 200) {
      return await xhr._data;
    }
    return null;
  },

  /**
   * Updates a company with the provided ID using the given data.
   *
   * @param {number} id - The ID of the company to update.
   * @param {Object} data - The data to update the company with.
   * @returns {Object|null} - The updated company object if successful, or null if the update fails.
   */
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

  /**
   * Removes an image associated with a company.
   *
   * @param {number} idComp - The ID of the company from which to remove the image.
   * @param {number} idImg - The ID of the image to be removed.
   */
  async removeCompanyImage(idComp, idImg) {
    const xhr = await apiFetch.raw(`/companies/${idComp}/image/${idImg}`, {
      method: "DELETE",
    });
  },

  /**
   * Sets an image for a specific company.
   *
   * @param {number} idComp - The ID of the company for which to set the image.
   * @param {Object} data - The image data to set for the company.
   */
  async setCompanyIamge(idComp, data) {
    const xhr = await apiFetch.raw(`/companies/${idComp}/image`, {
      body: data,
      method: "POST",
    });
  },

  /**
   * Retrieves a single campaign based on the provided ID.
   *
   * @param {number} id - The ID of the campaign to retrieve.
   * @returns {Object|null} - The campaign object if found, or null if not found.
   */
  async getOneCampaign(id) {
    const xhr = await apiFetch.raw(`/campaigns/${id}`, {
      method: "GET",
    });
    if (xhr.status === 200) {
      return xhr._data;
    }
  },

  /**
   * Retrieves all campaigns based on the provided criteria.
   *
   * @param {Object} criteria - The criteria to filter the campaigns.
   * @returns {Array} - An array of campaigns that match the criteria.
   */
  async getAllCampaigns(criteria) {
    const datas = [];
    let page =
      criteria === null || criteria.page === undefined ? 1 : criteria.page;
    let hasNext = true;
    do {
      // use raw fetch to catch the status code
      const xhr = await apiFetch.raw("/campaigns", {
        method: "GET",
        params: { ...criteria, page },
      });
      if (xhr.status === 200) {
        const response = await xhr._data;
        let campaigns = await response["hydra:member"];
        campaigns.forEach((campaign) => {
          datas.push(campaign);
        });

        if (!response["hydra:view"]["hydra:next"]) {
          hasNext = false;
        }
        page++;
      }
    } while (hasNext);

    return datas;
  },

  /**
   * Retrieves all newsletters based on the provided criteria.
   *
   * @param {Object} criteria - The criteria to filter the newsletters.
   * @returns {Array} - An array of newsletters that match the criteria.
   */
  async getAllNewletters(criteria) {
    const datas = [];
    let page =
      criteria === null || criteria.page === undefined ? 1 : criteria.page;
    let hasNext = true;
    do {
      const xhr = await apiFetch.raw("/newsletters", {
        method: "GET",
        params: { ...criteria, page },
      });
      if (xhr.status === 200) {
        const response = await xhr._data;
        const newsletters = await response["hydra:member"];
        newsletters.forEach((news) => {
          datas.push(news);
        });

        if (!response["hydra:view"]["hydra:next"]) {
          hasNext = false;
        }
        page++;
      }
    } while (hasNext);

    return datas;
  },

  /**
   * Retrieves a single newsletter based on the provided ID.
   *
   * @param {number} id - The ID of the newsletter to retrieve.
   * @returns {Object|null} - The newsletter object if found, or null if not found.
   */
  async getOneNewsletter(id) {
    const xhr = await apiFetch.raw(`/newsletters/${id}`, {
      method: "GET",
    });
    if (xhr.status === 200) {
      return xhr._data;
    }
  },
});
