import{I as n,J as a}from"./index-CJF2flM7.js";const c=e=>'"'+(e==null?"":String(e)).replace(/"/g,'""')+'"',p=e=>e==="LEVEL2_CONFIRMED"?"二级:确认热失控":"一级:电气疑似",b=e=>e==="BLACK"?"蓝黑(不可逆)":"翠绿",h=e=>e==="CONFIRMED"?"确认热失控":e==="FALSE_ALARM"?"误报":e==="MAINTENANCE"?"需维护":"待确认";function f(e){if(!n){const t=new URLSearchParams;e.kw&&t.set("kw",e.kw),e.level&&t.set("level",e.level),e.result&&t.set("result",e.result),window.open("/api/ledger/export/excel?"+t.toString(),"_blank");return}let l=a.allLedger();e.kw&&(l=l.filter(t=>(t.alarmCode+t.tagUid+t.batterySn).indexOf(e.kw)>=0)),e.level&&(l=l.filter(t=>t.level===e.level)),e.result&&(l=l.filter(t=>t.confirmResult===e.result));const s=[["告警编号","标签UID","电池SN","级别","环节位置","首报时间","失联前最后读取","漏读次数","光学状态","确认人","确认时间","结论","责任环节","处置措施"].map(c).join(",")];l.forEach(t=>s.push([t.alarmCode,t.tagUid,t.batterySn,p(t.level),t.location,t.raisedAt,t.lastOkTime,t.missCount,b(t.opticalState),t.confirmUser,t.confirmTime??"",h(t.confirmResult),t.liableStage,t.disposeNote].map(c).join(",")));const o=new Blob(["\uFEFF"+s.join(`\r
`)],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(o),d=document.createElement("a");d.href=r,d.download=`电池异常台账_${new Date().toISOString().slice(0,10)}.csv`,d.click(),URL.revokeObjectURL(r)}function g(e){if(!n){window.open(`/api/ledger/${e}/report.pdf`,"_blank");return}const l=a.getLedger(e);if(!l)return;const i=a.profile(l.tagUid),s=i.battery,o=a.liable(l.tagUid),r=i.timeline.slice(-20).reverse().map(t=>`<tr><td>${t.time.replace("T"," ").slice(0,19)}</td><td>${t.title}</td><td>${t.detail}</td></tr>`).join(""),d=window.open("","_blank");d&&(d.document.write(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>事故追溯与责任认定报告 ${l.alarmCode}</title>
<style>
 body{font-family:"Microsoft YaHei","PingFang SC",sans-serif;margin:34px;color:#111;line-height:1.7}
 h1{font-size:20px;margin:0 0 6px} h2{font-size:14px;margin:18px 0 6px;border-left:4px solid #2b6fb5;padding-left:8px}
 table{border-collapse:collapse;width:100%;font-size:12px;margin:6px 0 10px}
 td,th{border:1px solid #b9c2cc;padding:5px 8px;text-align:left;vertical-align:top}
 th{background:#f2f5f8} .k{color:#555;width:140px;background:#fafbfc}
 .meta{font-size:12px;color:#555;margin-bottom:12px}
 .foot{margin-top:18px;font-size:11px;color:#777;border-top:1px dashed #bbb;padding-top:8px}
</style></head><body>
<h1>电池热失控事故追溯与责任认定报告</h1>
<div class="meta">报告编号:${l.alarmCode} &nbsp;|&nbsp; 生成时间:${new Date().toLocaleString("zh-CN")} &nbsp;|&nbsp; 系统:电池热失控预警与溯源管理系统 V4.1</div>
<h2>一、涉事电池与标签信息</h2>
<table>
<tr><td class="k">标签 UID</td><td>${l.tagUid}</td><td class="k">电池 SN</td><td>${l.batterySn}</td></tr>
<tr><td class="k">批次号</td><td>${s.batchNo}</td><td class="k">电池形态</td><td>${s.cellType}</td></tr>
<tr><td class="k">模组 / PACK</td><td>${s.moduleCode} / ${s.packCode}</td><td class="k">所处环节</td><td>${o.triggerStage}</td></tr>
<tr><td class="k">精确位置</td><td>${s.zoneId}</td><td class="k">告警级别</td><td>${p(l.level)}</td></tr>
</table>
<h2>二、事件经过(电气一级报警 · 专利闭环 S3)</h2>
<table>
<tr><td class="k">一级告警时间</td><td>${l.raisedAt.replace("T"," ").slice(0,19)}</td>
    <td class="k">失联前最后读取</td><td>${(l.lastOkTime??"").replace("T"," ").slice(0,19)}</td></tr>
<tr><td class="k">连续漏读次数(去抖阈值)</td><td>${l.missCount}</td>
    <td class="k">精确定位</td><td>${l.location}</td></tr>
</table>
<h2>三、目视变色确认(二级确认 · 专利闭环 S4)</h2>
<table>
<tr><td class="k">标签光学状态</td><td>${b(l.opticalState)}(翠绿 → 蓝黑,不可逆)</td>
    <td class="k">确认结论</td><td>${h(l.confirmResult)}</td></tr>
<tr><td class="k">确认人 / 时间</td><td>${l.confirmUser||"-"} / ${(l.confirmTime??"-").replace("T"," ").slice(0,19)}</td>
    <td class="k">处置措施</td><td>${l.disposeNote||"-"}</td></tr>
</table>
<h2>四、溯源与责任环节判定</h2>
<table>
<tr><td class="k">异常发生环节</td><td>${o.triggerStage}</td><td class="k">责任环节判定</td><td><b>${o.liableStage}</b></td></tr>
<tr><td class="k">判定依据</td><td colspan="3">${o.reason}</td></tr>
</table>
<h2>五、关键物证时间线(节选)</h2>
<table><tr><th style="width:150px">时间</th><th style="width:110px">类型</th><th>内容</th></tr>${r}</table>
<div class="foot">说明:本报告依据标签 UID 全生命周期盘点、环节交接与告警物证自动生成,用于事故溯源、责任认定与理赔佐证。</div>
</body></html>`),d.document.close(),setTimeout(()=>{try{d.focus(),d.print()}catch{}},500))}export{f as e,g as o};
