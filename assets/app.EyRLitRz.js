import{v as s,aj as i,ak as u,al as c,am as l,an as f,ao as d,ap as m,aq as h,ar as A,as as v,Y as g,d as P,u as w,j as y,z as C,at as R,au as _,av as E,aw as b}from"./chunks/framework.MMMQMGZx.js";import{t as j}from"./chunks/theme.4ga5x04F.js";const D={...j};function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=p(D),T=P({name:"VitePressApp",setup(){const{site:e}=w();return y(()=>{C(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),e.value.router.prefetchLinks&&R(),_(),E(),o.setup&&o.setup(),()=>b(o.Layout)}});async function L(){const e=S(),a=O();a.provide(u,e);const t=c(e.route);return a.provide(l,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function O(){return h(T)}function S(){let e=s,a;return A(t=>{let n=v(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=g(()=>import(n),__vite__mapDeps([]))),s&&(e=!1),r},o.NotFound)}s&&L().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{L as createApp};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}