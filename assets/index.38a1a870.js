import{R as r,p as g,a as h,t as i,b as x}from"./vendor.b6fb1b21.js";const E=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}};E();const S=`
interface IState {
  busy: boolean;
  names: string[];
  error?: string;
}
`.trim();function b(n){return n[0].toUpperCase()+n.slice(1)}function R(n,c){const o=i.exports.createSourceFile("input.tsx",n,i.exports.ScriptTarget.Latest),a=o.getChildAt(0),t=[];return a.getChildren().forEach(e=>{e.kind===i.exports.SyntaxKind.InterfaceDeclaration&&e.forEachChild(u=>{var p,d;if(u.kind===i.exports.SyntaxKind.PropertySignature){const l=u,f=(p=l.name)==null?void 0:p.getText(o),m=l.questionToken!==void 0,y=`${(d=l.type)==null?void 0:d.getText(o)}${m?" | undefined":""}`;t.push(`const [${f}, set${b(f)}] = ${c}<${y}>();`)}})}),g.format(t.join(""),{parser:"typescript",plugins:[h]})}function v(){const[n,c]=r.useState(!0),[o,a]=r.useState(S),t=r.useMemo(()=>{try{return R(o,n?"React.useState":"useState")}catch(e){return console.error(e),`/**
ERROR:
${e}
*/`}},[o,n]);return r.createElement(r.Fragment,null,r.createElement("div",null,r.createElement("label",null,"TypeScript state interface declaration goes here..."),r.createElement("textarea",{value:o,onChange:e=>a(e.target.value)})),r.createElement("div",null,r.createElement("label",null,"... setState statements come out here."),r.createElement("textarea",{value:t,readOnly:!0}),r.createElement("label",null,r.createElement("input",{type:"checkbox",checked:n,onChange:e=>c(e.target.checked)})," ","Use ",r.createElement("code",null,"React.")," prefix")))}x.render(r.createElement(r.StrictMode,null,r.createElement(v,null)),document.getElementById("root"));
