export default ({apiFetch}) => ({
    async getCompanies(criteria) {
        return await apiFetch("/companies", {
            method: "GET",
            params: {...criteria},
            headers: {
                Authorization:
                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjAifQ.eyJpYXQiOjE3MTkyNDAwNDAsImV4cCI6MTcxOTMyNjQ0MCwiaXNzIjoic3luZWlkby1sYWItYXV0aCIsInJvbGVzIjpbIlJPTEVfU1VQRVJfQURNSU4iXSwidXNlcm5hbWUiOiJqZmljaGV0IiwiZmlyc3ROYW1lIjoiSm9sYW4iLCJsYXN0TmFtZSI6IkZpY2hldCIsImVtYWlsIjoiam9sYW5maWNoZXRAZ21haWwuY29tIiwiZW5hYmxlZCI6dHJ1ZSwiZXh0ZXJuYWwiOmZhbHNlfQ.cPQg7Lt5APoBiWycAp4DpesxnhCBinSmgHgkU-RryHekbBxW0G6L89COG8hN2DNqOzb83qHZqpwBcwIrxHSl2pabytXQtzy5SWnzuc29aX-4TYX-sAAD-DKU20Mns6BtC0cggkrVFgE_Fr4eRV3Wupd0oiVJtM53rIjGqPP6nWI9zjahMQjixDHbLyI-T7rzqSk7clRPR-wMDlW91CWFhzxttWd8oFZ9v1VrmzsTsgNpbysRHqMuGJL2ALL_mDYqh840fMw2CdmwqkC7eu_qb88-E-NDFCH7AEq56V9qxABdlVIGl2Fw8L2Cpw6iObJEO9w1Oe4LAKsliJwQzGwqcA",
            },
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
    }
})
