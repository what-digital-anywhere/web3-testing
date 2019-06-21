# README

## Setup

- npm install
- run a simple server like

add  ~/.profile and run `source  ~/.profile` in your terminal

```
alias simpleserver=simpleserver

simpleserver() {
    python -m SimpleHTTPServer "$@"
}

```

then run `simpleserver 8001` on your console and visit `http://localhost:8001`

