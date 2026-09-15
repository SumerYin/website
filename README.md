# 电池热失控预警与溯源管理系统 · V4.1 静态演示站

> 纯静态站点(HTML + JS + GLB 模型),**无需后端、数据库、API Key 或任何服务端**。
> 600 支电池台账、RFID 盘点模拟器、告警闭环、数字孪生 3D 与 GIS 运输大屏全部在浏览器内运行,
> 可直接部署到 **Cloudflare Pages / GitHub Pages / 任意静态托管**,长期有效。

---

## 一、目录结构

```
.
├── index.html              # 入口(SPA)
├── 404.html                # SPA 回退(GitHub Pages 用)
├── _redirects              # SPA 回退(Cloudflare Pages 用)
├── .nojekyll               # 关闭 GitHub Pages 的 Jekyll 处理
├── assets/                 # 前端资源(JS/CSS,ECharts、Three.js 等已打包)
└── models/                 # Blender 导出的 GLB 高精细模型
    ├── production-hall-v4.glb     # 生产车间厂房
    ├── aging-rack-v4.glb          # 化成/老化立式货架(生产专用)
    ├── warehouse-hall-v4.glb      # 仓库厂房
    ├── warehouse-rack-v4.glb      # 双深位托盘货架(仓库专用)
    ├── ess-site-v4.glb            # 储能舱站区(含舱内机柜)
    ├── truck-v4.glb               # 高精细半挂货车
    └── (其余为早期版本模型,保留兼容)
```

## 二、本地预览

任选其一(在**本目录**下执行):

```bash
python3 -m http.server 8080          # 推荐:Python 自带
# 或
npx serve -l 8080
# 或
npx http-server -p 8080
```

浏览器打开 http://localhost:8080 即可。直接双击 `index.html` 也能打开大部分页面(3D 模型加载建议用本地服务器)。

## 三、上传到 GitHub

```bash
cd 本目录
git init
git add -A
git commit -m "feat: 电池热失控预警与溯源管理系统 V4.1 静态演示站"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

> 若仓库已存在,只需把**本目录全部文件**拷贝进仓库根目录后 `git add -A && git commit && git push`。

## 四、部署到 Cloudflare Pages(推荐,免费)

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → 左侧 **Workers & Pages**;
2. **Create** → **Pages** → **Connect to Git** → 授权并选择上面的 GitHub 仓库;
3. 构建配置(**本项目是纯静态,无需构建**):
   - **Framework preset**:`None`
   - **Build command**:留空
   - **Build output directory**:`/`(即仓库根目录,不要填 dist)
4. 点击 **Save and Deploy**,约 1 分钟完成,得到 `https://<项目名>.pages.dev` 公网地址;
5. 之后每次 `git push`,Cloudflare 会自动重新部署。

> 自定义域名:Pages 项目 → **Custom domains** → 添加你的域名并按提示解析即可。

### GitHub Pages(可选)
仓库 **Settings → Pages → Source: Deploy from a branch → main / (root)** 即可;
项目已内置 `404.html` 与 `.nojekyll`,深层路由可正常回退。

## 五、演示说明(重要)

- **数据来源**:600 支电池(生产临时存储 150 / 运输 120 / 产品商仓库 180 / 使用中 150)、
  环节交接快照、8 条历史异常台账,均**在浏览器内按固定规则生成**,因此刷新后回到初始演示状态;
- **RFID 模拟器**:与后端版本同构(1.5s 周期盘点、连续漏读 N=3 去抖、一级电气告警、目视变色二级确认);
  支持「演示剧本」四个场景一键触发;关闭/归档、目视确认等操作在**当前浏览器会话内**有效;
- **导出与报告**:静态版为浏览器内生成——台账导出为 **CSV**(Excel 可直接打开),
  事故报告为**可打印 HTML**(在打印对话框中选择"另存为 PDF");
- **离线可用**:除页面本身外无任何外部请求,模型与地图数据全部本地内置;
- 若需要"操作记录跨设备长期保存",需另行接入后端服务(本仓库不含)。

## 六、页面导航

| 页面 | 路由 | 说明 |
|---|---|---|
| 安全态势一张图 | `/` | 四环节总览、状态分布、健康度、告警趋势、最新告警 |
| 生产临时存储 | `/flow/production` | 生产车间 3D:化成/老化立式货架 + 滚筒输送线 |
| 运输调度 | `/flow/transport` | **GIS 调度大地图 ↔ 3D 道路运输** 一键切换(3D 中货柜透明可见所载电池与红色异常) |
| 产品商仓库 | `/flow/warehouse` | 仓库 3D:双深位托盘货架多通道 + 屋面桁架 |
| 使用中 · 储能舱 | `/flow/inuse` | 储能站区 3D:双舱、舱内机柜装模块、围栏/变压器/电缆沟 |
| 检测电池异常台账 | `/ledger` | 检索、导出 CSV、进入溯源 |
| 告警中心 | `/alarms` | 未关闭/已归档、单条与一键关闭 |
| 演示剧本 | `/demo` | 实时模拟启停、变速、复位、故障注入 |

---

版本:V4.1 · 配套专利《一种基于无源电子标签的电池热失控预警方法、装置及存储介质》
