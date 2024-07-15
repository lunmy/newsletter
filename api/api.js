export default ({apiFetch}) => ({

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
     *  template
     ****************************************************/
    async getAllTemplates(criteria) {
        return await this.getAll('templates', criteria);
    },

    async getOneTemplate(id) {
        return await this.getOne('templates', id);
    },

    async createTemplate(template) {
        return await this.create("templates", template)
    },

    async updateTemplate(data) {
        data.company = data.company['@id']
        return await this.update(data)
    },

    async deleteTemplate(id) {
        return await this.delete(id)
    },

    /*****************************************************
     *  Blocks
     ****************************************************/
    async getAllBlocks(criteria) {
        return await this.getAll('blocks', criteria);
    },
    async getOneBlock(id) {
        return await this.getOne('blocks', id);
    },
    async createBlock(data) {
        let tmpImages = []
        if (data.images.newImages !== undefined) {
            tmpImages = structuredClone(toRaw(data.images))
        }
        delete data.images
        const result = await this.create("blocks", data)
        await this.addCampaignsImgs(result, tmpImages)
        return result
    },
    async updateBlock(data) {
        let tmpImages = []
        if (data.images.newImages !== undefined) {
            tmpImages = structuredClone(toRaw(data.images))
        }
        delete data.images

        data.company = data.company['@id']
        const result = await this.update(data)
        await this.addCampaignsImgs(data, tmpImages)
        return result
    },
    async deleteBlock(id) {
        return await this.delete(id)
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
    async createCampaign(data) {
        let tmpImages = []
        if (data.images.newImages !== undefined) {
            tmpImages = structuredClone(toRaw(data.images))
        }
        delete data.images
        const result = await this.create("campaigns", data)
        await this.addCampaignsImgs(result, tmpImages)
        return result
    },

    async updateCampaign(data) {
        let tmpImages = []
        if (data.images.newImages !== undefined) {
            tmpImages = structuredClone(toRaw(data.images))
        }
        delete data.images
        data.company = data.company['@id']
        const result = await this.update(data)
        await this.addCampaignsImgs(data, tmpImages)
        return result
    },

    async addCampaignsImgs(campaign, images) {
        if (images.newImages === undefined || images.newImages === null || images.newImages.length === 0) {
            return
        }
        images.oldImages.map(async (img) => {
            try {
                await this.removeImage(img)
            } catch (e) {
                console.log(e)
            }
        })

        images.newImages.map(async (img) => {
            try {
                await this.createImage(campaign, img)
            } catch (e) {
                console.log(e)
            }
        })
    },

    async deleteCampaign(campaignId) {
        return await this.delete(`${campaignId}`)
    },

    /*****************************************************
     *  newsletters
     ****************************************************/
    async getAllNewsletters(criteria) {
        return await this.getAll('newsletters', criteria);
    },
    async getOneNewsletter(id) {
        return await this.getOne('newsletters', id);
    },
    async createNewsletter(data) {
        return await this.create("newsletters", data)
    },
    async updateNewsletter(data) {
        data.blocks.map((block) => {
            delete block.images
        })
        return await this.update(data)
    },
    async deleteNewsletter(id) {
        return await this.delete(id)
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
                params: {...criteria, page},
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
                } else if (filters.all) {
                    datas.push(...request._data['hydra:member'])
                } else {
                    return request._data
                }
            } else {
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
        const result = await apiFetch.raw(`${data['@id']}`, {
            method: "PATCH",
            body: data,
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
            params: {
                ...params,
            },
        });
        if (result.status === 200) {
            return await result._data;
        }
        return null;
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
