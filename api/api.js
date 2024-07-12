export default ({ apiFetch }) => ({

  async getOneCompany(id) {
    return await this.getOne('companies', id);
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

  /*****************************************************
   *  Campaigns
   ****************************************************/
  async getAllCampaigns(criteria) {
    return await this.getAll('campaigns', criteria);
  },

  async getOneCampaign(id) {
    return await this.getOne('campaigns', id);
  },

  async createCampaign(campaign) {
    let tmpImages = []
    if(campaign.images.newImages !== undefined) {
      tmpImages = structuredClone(toRaw(campaign.images))
    }
    delete campaign.images
    const data = await this.create("campaigns", campaign)
    await this.addCampaignsImgs(data, tmpImages)
  },

  async updateCampaign(data) {
    console.log(data.images)
    let tmpImages = []
    if(data.images.newImages !== undefined) {
      tmpImages = structuredClone(toRaw(data.images))
      console.log('update', tmpImages)
    }
    delete data.images
    data.company=data.company['@id']
    console.log('Update campaign ' + data['@id'])
    const result =  await this.update(data)
    await this.addCampaignsImgs(data, tmpImages)
    return result
  },

  async addCampaignsImgs(campaign, images)
  {
    console.log(images)
    if(images.newImages === undefined || images.newImages === null || images.newImages.length === 0) {
      return
    }
    images.oldImages.map(async (img) => {
      try{
        console.log('remove Old img', img)
        await this.removeImage(img)
      }
      catch(e) {
        console.log(e)
      }
    })


    images.newImages.map(async (img) => {
      try{
        console.log('add new img', img)
        await this.createImage(campaign, img)
      }
      catch(e) {
        console.log(e)
      }
    })
  },

  async deleteCampaign(campaignId) {
      return await this.delete(`${campaignId}`)
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

  /*****************************************************
   *  Images
   ****************************************************/
  async createImage(data, image) {
    const form = new FormData();
    form.append("file", image);
    form.append('tag', 'desktop')

    return await apiFetch.raw(`${data['@id']}/image`, {
      body: form,
      method: "POST",
    });
  },
  async updateImage(data) {

  },
  async removeImage(data) {
    return await apiFetch.raw(`${data['@id']}`, {
      method: "DELETE",
    });
  },

  /*****************************************************
   *  Functions
   ****************************************************/
  async getAll(ep, filters) {
    let page = filters === null || filters.page === undefined ? 1 : filters.page
    const datas = []
    let hasNextPage = true

    do {
      const request = await apiFetch.raw(`${ep}`, {
        method: "GET",
        params: {
          ...filters,
          page
        }
      });

      if (request.status === 200) {
        if (filters === null) {
          return request._data['hydra:member']
        }
        else if (filters.allObjects) {
          datas.push(...request._data['hydra:member'])
        }
        else {
          return request._data
        }
      }
      else{
        hasNextPage = false
      }

      if (!request._data['hydra:view']['hydra:next']) {
        hasNextPage = false
      }
      page++
      //hasNextPage = false
    } while (hasNextPage)

    return datas
  },
  async getOne(ep, id, params = null) {

    const xhr = await apiFetch.raw(`/${ep}/${id}`, {
      method: "GET",
      params: {
        ...params,
      }
    });
    if (xhr.status === 200) {
      return await xhr._data;
    }
    return null;

  },
  async create(ep, data, params = null) {
    const xhr = await apiFetch.raw(`/${ep}`, {
      method: "POST",
      body: data,
      params: {
        ...params,
      }
    });
    if (xhr.status === 201) {
      return await xhr._data;
    }
    return null;
  },
  async update(data, params = null) {
    return await apiFetch.raw(`${data['@id']}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      params: {
        ...params,
      },
    });
  },
  async delete(id) {
    const request = await apiFetch.raw(`${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
    return request.status === 204
  },


});
