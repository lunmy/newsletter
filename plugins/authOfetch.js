export default defineNuxtPlugin((nuxtApp) => {
  const checkAuth = async (username, password, app) => {
    const response = await ofetch("/auth", {
      method: "POST",
      body: {
        username,
        password,
        app,
      },
    });
  };
});
// export default ({ ofetch }) => ({
//   async checkAuth(username, password, app) {
//     return await ofetch("/auth", {
//       method: "POST",
//       body: {
//         username,
//         password,
//         app,
//       },
//     });
//   },
// });
