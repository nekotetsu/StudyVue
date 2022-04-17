loadVue = async (url) => {
  let { loadModule } = window['vue3-sfc-loader'];
  const options = {
    moduleCache: {
      vue: window.Vue,
      less
    },
    getFile(url) {
      return fetch(url).then((response) =>
        response.ok ? response.text() : Promise.reject(response)
      );
    },
    async addStyle(styleStr) {
      const { css } = await less.render(styleStr);
      const style = document.createElement('style');
      style.textContent = css;
      const ref = document.head.getElementsByTagName('style')[0] || null;
      document.head.insertBefore(style, ref);
    },
    log(type, ...args) {
      console.log(type, ...args);
    }
  };
  return await loadModule(url, options);
};