import{_ as e,o as s,c as t,R as a}from"./chunks/framework.H90atOJc.js";const p=JSON.parse('{"title":"css相关","description":"","frontmatter":{},"headers":[],"relativePath":"views/interview-questions/css.md","filePath":"views/interview-questions/css.md"}'),r={name:"views/interview-questions/css.md"},o=a('<h1 id="css相关" tabindex="-1">css相关 <a class="header-anchor" href="#css相关" aria-label="Permalink to &quot;css相关&quot;">​</a></h1><h2 id="_1-重绘和回流是什么" tabindex="-1">1. 重绘和回流是什么 <a class="header-anchor" href="#_1-重绘和回流是什么" aria-label="Permalink to &quot;1. 重绘和回流是什么&quot;">​</a></h2><ul><li>回流:当<code>render tree</code>中的 部分或者全部因为元素的规模尺寸，布局隐藏等改变而需要重新构建，这就叫回流，每个页面至少需要一次回流就是在页面第一次加载的时候，这时候一定会发生回流，因为要构建<code>render tree</code></li><li>在回流的时候，浏览器会使渲染树中收到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中这就是重绘 当<code>rendertree</code>中的一些元素需要更新属性，而这些属性只是影响元素的外观，不会影响布局，就叫重绘</li></ul>',3),c=[o];function i(n,_,d,l,h,u){return s(),t("div",null,c)}const f=e(r,[["render",i]]);export{p as __pageData,f as default};
