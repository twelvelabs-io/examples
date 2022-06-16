# Node.js quickstart

## Prerequisites

- Python version 3.9.10 or greater
- [pip](https://pypi.org/project/pip/)
- [Git client](https://desktop.github.com/)

## Install

1. In a new directory, clone this repository and `cd` into the `quickstart/python` directory by entering the following commands:
  
  ```bash
  git clone -b main https://github.com/twelvelabs-io/examples && cd quickstart/python
  ```

2. Install dependencies:

  ```bash
  pip3 install -r requirements.txt
  ```

## Run the quicksart

1. Set up your environment variables:
  ```bash
  export API_KEY=<YOUR_API_KEY> && export API_URL=https://api.twelvelabs.io/v1
  ```
2. Open the `quickstart.py` file in a plain-text editor and replace the following placeholders surrounded by `<>` with your values:
  - <YOUR_INDEX_NAME>
  - <FILE_NAME>
  - <FILE_PATH>

3. Run the program:

  ```bash
  python3 quickstart.py
  ```