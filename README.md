<!-- ══════════════════════════════════════════════════════════════ -->
<!--              SAGAR SAMANTARAY — GITHUB PROFILE README         -->
<!-- ══════════════════════════════════════════════════════════════ -->

<div align="center">

<!-- ░░ ANIMATED HEADER BANNER ░░ -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=venom&height=280&color=0:000000,50:0d0d0d,100:000000&text=SAGAR%20SAMANTARAY&fontColor=00fff2&fontSize=62&fontAlignY=50&desc=Full-Stack%20Engineer%20%20%7C%20%20MERN%20%20%7C%20%20Cloud%20%20%7C%20%20Mobile&descSize=17&descAlignY=70&descColor=ffffff&animation=twinkling&stroke=00fff2&strokeWidth=2"/>

<!-- ░░ TYPING BANNER ░░ -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=00FFF2&center=true&vCenter=true&width=750&lines=%5B+Initializing+Sagar.exe...+%5D;%3E+Stack%3A+React+%7C+Node.js+%7C+MongoDB+%7C+AWS;%3E+Mobile%3A+React+Native;%3E+Currently%3A+Building+something+awesome+%F0%9F%9A%80;%3E+Status%3A+Open+to+collaborate+%E2%9C%85;%3E+Offline+mode%3A+Gaming+%F0%9F%8E%AE" alt="Typing SVG" />

<br/>

<!-- ░░ STATUS BADGES ░░ -->
![](https://img.shields.io/badge/STATUS-Available_for_Collab-00fff2?style=flat-square&labelColor=0d0d0d&logo=statuspal)
![](https://img.shields.io/badge/FOCUS-Full--Stack_Dev-ff2d78?style=flat-square&labelColor=0d0d0d)
![](https://img.shields.io/badge/LOCATION-India_🇮🇳-ffffff?style=flat-square&labelColor=0d0d0d)
![](https://komarev.com/ghpvc/?username=sagars-samantaray&style=flat-square&color=00fff2&label=PROFILE+VIEWS&labelColor=0d0d0d)

</div>

<br/>

---


<img align="right" src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="340" />

```javascript
const sagar = {
  name        : "Sagar Samantaray",
  title       : "Front-End Dev → Full-Stack Explorer",
  location    : "India 🇮🇳",

  stack       : {
    frontend  : ["React.js", "JavaScript", "Redux", "Tailwind CSS"],
    backend   : ["Node.js", "Express.js"],
    database  : ["MongoDB", "MySQL"],
    mobile    : ["React Native"],
    cloud     : ["AWS Lambda", "SQS", "SES", "Nginx"],
    tools     : ["Git", "Linux"],
  },

  currentFocus: "Scalable full-stack web applications",
  openTo      : "Collaboration & exciting projects",
  funFact     : "Still gaming when the IDE closes 🎮",

  askMeAbout  : ["React", "Node.js", "React Native", "AWS"],
  contact     : "sagars.samantaray@gmail.com",
};
```

<br clear="right"/>

---


<div align="center">

### ◈ Frontend
<p>
<img src="https://skillicons.dev/icons?i=js,ts,react,redux,html,css,tailwind&theme=dark&perline=7"/>
</p>

### ◈ Backend & Database
<p>
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,mysql&theme=dark&perline=7"/>
</p>

### ◈ Cloud, DevOps & Tools
<p>
<img src="https://skillicons.dev/icons?i=aws,nginx,linux,git,github,vscode&theme=dark&perline=7"/>
</p>

### ◈ Mobile
<p>
<img src="https://skillicons.dev/icons?i=react&theme=dark"/>
&nbsp;
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=00D8FF"/>
</p>

</div>

---


<div align="center">

<img width="49%" src="https://github-readme-stats.vercel.app/api?username=sagars-samantaray&show_icons=true&theme=chartreuse-dark&hide_border=true&bg_color=0d0d0d&title_color=00fff2&text_color=ffffff&icon_color=ff2d78&count_private=true&include_all_commits=true&border_radius=10" />
<img width="49%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=sagars-samantaray&layout=compact&theme=chartreuse-dark&hide_border=true&bg_color=0d0d0d&title_color=00fff2&text_color=ffffff&langs_count=8&count_private=true&border_radius=10" />

<br/><br/>

<img width="75%" src="https://streak-stats.demolab.com?user=sagars-samantaray&theme=dark&hide_border=true&background=0d0d0d&stroke=00fff2&ring=00fff2&fire=ff2d78&currStreakLabel=00fff2&sideLabels=ffffff&currStreakNum=ffffff&sideNums=ffffff&dates=888888&border_radius=10" />

</div>

<br/>

<div align="center">
<img width="95%" src="https://github-readme-activity-graph.vercel.app/graph?username=sagars-samantaray&bg_color=0d0d0d&color=00fff2&line=00fff2&point=ff2d78&area=true&area_color=00fff220&hide_border=true&border_radius=10&title_color=00fff2" />
</div>

---


<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/sagars-samantaray/sagars-samantaray/output/github-snake-dark.svg"/>
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/sagars-samantaray/sagars-samantaray/output/github-snake.svg"/>
    <img alt="Snake animation" src="https://raw.githubusercontent.com/sagars-samantaray/sagars-samantaray/output/github-snake-dark.svg"/>
  </picture>
</div>

<details>
<summary><code>📄 .github/workflows/snake.yml — click to expand</code></summary>

```yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - uses: Platane/snk/svg-only@v3
        with:
          github_user_name: sagars-samantaray
          outputs: |
            dist/github-snake.svg?palette=github
            dist/github-snake-dark.svg?palette=github-dark

      - uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

</details>

---


<div align="center">
<img src="https://github-profile-trophy.vercel.app/?username=sagars-samantaray&theme=matrix&no-frame=true&no-bg=true&margin-w=8&column=7" />
</div>

---


<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0d0d0d)](https://linkedin.com/in/sagar-samantaray)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0d0d0d)](mailto:sagars.samantaray@gmail.com)
[![Twitter](https://img.shields.io/badge/Twitter-1D9BF0?style=for-the-badge&logo=twitter&logoColor=white&labelColor=0d0d0d)](https://twitter.com/sagar________)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=0d0d0d)](https://instagram.com/____sagar___._)

<br/>

```
╔══════════════════════════════════════════════════════╗
║   Thanks for visiting! Let's build something great.  ║
║          — Sagar Samantaray  🚀                       ║
╚══════════════════════════════════════════════════════╝
```

</div>

<!-- ░░ FOOTER ░░ -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:0d0d0d&height=100&section=footer&stroke=00fff2&strokeWidth=1"/>