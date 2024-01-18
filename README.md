Para documentação em português, consulte o [README em Português](docs/README.pt.md).

# Transitory IPFS Share

Transitory IPFS Share is a project for temporarily sharing files using IPFS.

## Overview

Transitory IPFS Share allows users to upload files to the IPFS network, generating temporary download links and providing the option to download files individually or as a ZIP archive.

## Features

- **File Upload:** Easily and quickly upload files to the IPFS network.
  - Link: `http://localhost:8000/api/v1/upload`
- **Temporary Links:** Generate temporary download links to share with other users.
  - The links expire in 24 hours.
- **Direct Download:** Download the file directly using the generated links.
  - Link: `: http://localhost:8000/api/v1/download/{fileName}?token={downloadToken}&expires={expiresAt}`
- **ZIP Download:** Download the file as a compressed ZIP archive.
  - Link: `: http://localhost:8000/api/v1/zip/download/{fileName}?token={downloadToken}&expires={expiresAt}`

## Project Setup

1. Clone the repository: `git clone https://github.com/eduardomcb/transitory-ipfs-share.git`
2. Install dependencies: `yarn install`
3. Configure environment variables, if necessary.

## Usage

1. Start the server: `yarn start`
2. Access the application at `http://localhost:PORT` in your browser.
3. Upload files and share the generated links.

## Contributions

If you wish to contribute to this project, feel free to create pull requests or report issues in the [Issues section](https://github.com/eduardomcb/transitory-ipfs-share/issues).
