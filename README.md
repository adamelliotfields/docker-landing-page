# Docker Landing Page

Clone of [`dev-landing-page`](https://github.com/flexdinesh/dev-landing-page) designed by
[Dinesh Pandiyan](https://github.com/flexdinesh).

Written with Express and Pug. Configurable using environment variables.

## Supported tags and respective `Dockerfile` links

- [`1.0.0`, `latest` (_Dockerfile_)](https://github.com/adamelliotfields/docker-landing-page/blob/1.0.0/Dockerfile)

## Environment Variables

See [`.env`](https://github.com/adamelliotfields/docker-landing-page/blob/master/.env) for examples.

All social links are optional - they won't error (or render) if undefined.

| Variable        | Default       | Description        |
|-----------------|---------------|--------------------|
| `BACKGROUND`    | `#303f9f`     | Background color.  |
| `COLOR`         | `#fafafa`     | Text/icon color.   |
| `TITLE`         | `Hello World` | Site title.        |
| `INTRO`         | `Hello`       | Heading.           |
| `TAGLINE`       | `World`       | Subtitle.          |
| `DESCRIPTION`   | `Hello World` | Description.       |
| `GITHUB`        | `undefined`   | GitHub URL.        |
| `TWITTER`       | `undefined`   | Twitter URL.       |
| `FACEBOOK`      | `undefined`   | Facebook URL.      |
| `INSTAGRAM`     | `undefined`   | Instagram URL.     |
| `LINKEDIN`      | `undefined`   | LinkedIn URL.      |
| `MEDIUM`        | `undefined`   | Medium URL.        |
| `STACKOVERFLOW` | `undefined`   | StackOverflow URL. |
| `DEVTO`         | `undefined`   | Dev.to URL.        |
| `FREECODECAMP`  | `undefined`   | FreeCodeCamp URL.  |
| `CODEPEN`       | `undefined`   | Codepen URL.       |
| `BEHANCE`       | `undefined`   | Behance URL.       |

## Colors

See [themes](https://github.com/flexdinesh/dev-landing-page/tree/master/css/themes) to get the hex
values from upstream or use your own.

## Favicon

Bind mount a `favicon.ico` file to `/usr/src/landing-page/public/favicon.ico`. The Docker Favicon is
used by default.

## Healthcheck

The `/healthz` endpoint returns a status of `200` and a plain text body of `OK`.

The route is defined before any middleware is applied, so requests will not be logged.

## 404 and 500

_Not Found_ and _Internal Server Error_ pages are rendered using the same CSS as the landing page.

## Styles

The unminified styles look like this. The `#{}` syntax is for Pug variable interpolation and is not
valid CSS.

```css
@font-face {
  font-family: Reem Kufi;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local("Reem Kufi Regular"), local("ReemKufi-Regular"),
    url(/fonts/ReemKufi-Regular.woff2) format("woff2");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da, U+02dc, U+2000-206f,
    U+2074, U+20ac, U+2122, U+2191, U+2193, U+2212, U+2215, U+feff, U+fffd;
}
@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local("Roboto Light"), local("Roboto-Light"), url(/fonts/Roboto-Light.woff2) format("woff2");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da, U+02dc, U+2000-206f,
    U+2074, U+20ac, U+2122, U+2191, U+2193, U+2212, U+2215, U+feff, U+fffd;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  font-family: sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #{background};
  color: #{color};
}
main {
  display: block;
  text-align: center;
}
h1 {
  margin: 0;
  font-family: Reem Kufi, sans-serif;
  font-size: 3.75rem;
  font-weight: 400;
}
p {
  margin: 24px 0;
  font-family: Roboto, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
}
a {
  background-color: transparent;
  text-decoration: none;
  color: #{color};
}
i {
  font-size: 3rem;
  padding: 10px;
}
@media (min-width: 576px) {
  html {
    font-size: calc(14px + ((20 - 14) * ((100vw - 576px) / (1200 - 576))));
  }
}
@media (min-width: 1200px) {
  html {
    font-size: 20px;
  }
}
```

## Deploy with Docker Compose

See [`docker-compose.yaml`](https://github.com/adamelliotfields/docker-landing-page/blob/master/docker-compose.yaml).

## Deploy with Kubernetes

A manifest might look something like this...

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: landing-page
  labels:
    app: landing-page
spec:
  selector:
    app: landing-page
  ports:
  - name: http
    port: 3000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: landing-page
  labels:
    app: landing-page
spec:
  replicas: 1
  selector:
    matchLabels:
      app: landing-page
  template:
    metadata:
      labels:
        app: landing-page
    spec:
      containers:
      - name: landing-page
        image: adamelliotfields/landing-page:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: BACKGROUND
          value: '#ffeb3b'
        - name: COLOR
          value: '#1e1e1e'
        - name: TITLE
          value: 'Adam Fields | Home'
        - name: INTRO
          value: "Hi, I'm Adam!"
        - name: TAGLINE
          value: 'Software Engineer | Cloud Enthusiast | Open Source Advocate'
        - name: DESCRIPTION
          value: 'The personal website of Adam Fields.'
        - name: GITHUB
          value: 'https://github.com/adamelliotfields'
        - name: TWITTER
          value: 'https://twitter.com/TheAdamFields'
        - name: LINKEDIN
          value: 'https://www.linkedin.com/in/adamelliotfields'
        livenessProbe:
          httpGet:
            path: /healthz
            port: 3000
            initialDelaySeconds: 5
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: landing-page
  labels:
    app: landing-page
spec:
  rules:
  - http:
      paths:
      - backend:
          serviceName: landing-page
          servicePort: 3000
```
