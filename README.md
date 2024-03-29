# HV-Com

🚧 WIP - functionality and structure can change rapidly and compatibility is not guaranteed 🚧

[简体中文](README_zhCN.md)

## 💡 Intro

HV-Com is a commenting system written in TypeScript. It uses [Vditor](https://github.com/Vanessa219/vditor) as markdown editor and [lute](https://github.com/88250/lute) as renderer.

## ✨ Feature

HV-Com's HV has many meanings.

- HeaVy - This commenting system is quite large and will have a significant performance overhead on both the front and back ends. `React`+`HV-Com`+`Vditor`+`lute`=`45kB`+`42kB`+`110kB`+`315kB`=`512kB` in gzipped. As `Vditor` is not minified yet, the size of it is larger than it should be and will be fixed in the latest release. If you use the all in one (AIO) bundle, it is as large as `153kB` gzipped.

At the cost of the above shortcoming, HV-Com has the following advantages.

- Have Vditor - HV-Com uses Vditor as markdown editor and renderer, so that it is fully "WYSIWYG" from editing to viewing.
- High Value - HV-Com has no less than a forum comment section, where high-value public discussions can take place. In fact, HV-Com is just one posting function away from a forum.

It also has these features.

- Uses markdown, has full WYSIWYG from editing to viewing.
- Support for all formats editable by Vditor, including
  - LaTeX formulas
  - mermaid.js flowcharts
  - abc.js sheet music
  - Code highlighting
  - See [Vditor readme](https://github.com/Vanessa219/vditor) for details
- Self-deployable backend or hosted.
- Support three major SQL databases, PostgreSQL, MySQL, SQLite, and may support [OrbitDB](https://github.com/orbitdb/orbit-db) in the future to become a decentralized commenting system.
- Good scalability, because
  - It is written entirely in React + TypeScript
  - It has Automated testing with jest for stability
  - It uses OpenAPI specification to define and check back-end interfaces
- Supports JSX syntax and can be imported as a React component.
- It is Free software. All source code of it is open under AGPLv3.

## 🛠️ How to develop

```bash
sudo npm install -g pnpm
git clone https://github.com/lixiang810/HV-Com
cd HV-Com
pnpm install
pnpm dev
```

## 🏭 How to use it in webpage

HV-Com will not provide pre-built versions until the first release. You need to build from source yourself if you really want to use it.

```bash
sudo npm install -g pnpm
git clone https://github.com/lixiang810/HV-Com
cd HV-Com
pnpm install
pnpm build
```

It will generate `hv-com.umd.js` under `HV-Com/dist/aio` and `HV-Com/dist/external`.

### UMD (External)

To use `HV-Com/dist/external/hv-com.umd.js`, you should import React, ReactDOM and Vditor yourself. You can refer to these HTML.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <!-- (Optional) Font for Material-UI -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <!-- Style for Vditor -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- React -->
    <script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
    <!-- React-DOM -->
    <script
      src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
      crossorigin
    ></script>
    <!-- Vditor -->
    <script src="https://cdn.jsdelivr.net/npm/vditor/dist/index.min.js"></script>
    <!-- HV-Com -->
    <script src="hv-com.umd.js"></script>
    <!-- Then, call HVCom to render DOM. -->
    <script>
      HVCom.render({ id: 'root', backendURL: 'http://localhost:3000/' });
    </script>
  </body>
</html>
```

### UMD (AIO)

If use `HV-Com/dist/aio/hv-com.umd.js`, since it bundled all requirements, you can just import a js file. You can refer to these HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <!-- (Optional) Font for Material-UI -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <!-- Style for Vditor -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- HV-Com, all in one -->
    <script src="hv-com.umd.js"></script>
    <!-- Then, call HVCom to render DOM. -->
    <script>
      HVCom.render({ id: 'root', backendURL: 'http://localhost:3000/' });
    </script>
  </body>
</html>
```

## 🗺️ Background

Vditor is known as a WYSIWYG markdown editor and has `Vditor.preview()` method for front-end rendering of markdown, which makes it possible to implement a commenting system based on it. At the same time, none of the existing commenting systems use Vditor as their editor, and most commenting systems have rich text editors that do not support WYSIWYG, creating a barrier to use for the average user.

I had wanted to use `valine` for my blog, but it is closed source. At the same time, it has serious security risks, not to mention that the LeanCloud it uses requires ID verification in mainland China.

I switched to gitalk. This process is described in [my blog post](https://stblog.penclub.club/2020/Sakura/). But then GitHub access was limited in mainland China, and signing up for a GitHub account was a barrier for commenters, which made commenting less motivating.

I have since chosen Isso and HashOver, of which I am impressed with the various features of HashOver. I will continue to use HashOver if I can do a secondary development of its front-end to introduce Vditor. However, HashOver's front-end code is in fact too old and needs to be rewritten using modern front-end techniques.

[Waline](https://github.com/walinejs/waline) has a lot of appeal to me, but:

1. It is not fully typed. (although the front-end uses TypeScript, the back-end doesn't)
2. Its markdown editor only renders in split screen and cannot do WYSIWYG editing, and does not support enough formats.
3. The comments section can only be viewed in reverse chronological order and cannot be paginated.
4. It uses vue, and my technology stack is in React.
5. It uses GPLv2 as license. Open source, but not free enough.

It just so happens that there's no comment system can be imported and used in React/JSX, and I had accumulated experience and code when I wrote [n2rv](https://github.com/lixiang810/n2rv), so I decided to completely rewrite one.
