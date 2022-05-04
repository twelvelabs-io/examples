# Node.js quickstart

## Prerequisites

- Node.js version 10 or greater
- [Git client](https://desktop.github.com/)

## Install

1. In a new directory, clone this repository and `cd` into the `quickstart/node` directory by entering the following commands:
  
  ```bash
  git clone -b main https://github.com/twelvelabs-io/examples && cd quickstart/node
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

## Run the quicksart

1. Set up your environment variables:
  ```bash
  export API_KEY=<YOUR_API_KEY> && export API_URL=https://api.twelvelabs.io/v1
  ```

2. Open the `quickstart.js` file in a plain-text editor and replace the following placeholders surrounded by `<>` with your values:
  - <YOUR_INDEX_NAME>
  - <FILE_PATH>

3. Run the program:

  ```bash
  node quickstart.js
  ```