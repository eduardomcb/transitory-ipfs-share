For English documentation, please see the [English README](../README.md).

# Transitory IPFS Share

O Transitory IPFS Share é um projeto para compartilhamento temporário de arquivos usando o IPFS.

## Visão Geral

O Transitory IPFS Share permite que os usuários façam upload de arquivos na rede IPFS, gerando links temporários de download e fornecendo a opção de baixar arquivos individualmente ou como um arquivo ZIP.

## Recursos

- **Upload de Arquivos:** Faça upload de arquivos facilmente e rapidamente na rede IPFS.
  - Link: `http://localhost:8000/api/v1/upload`
- **Links Temporários:** Gere links temporários de download para compartilhar com outros usuários.
  - Os links expiram em 24 horas.
- **Download Direto:** Baixe o arquivo diretamente usando os links gerados.
  - Link: `http://localhost:8000/api/v1/download/{fileName}?token={downloadToken}&expires={expiresAt}`
- **Download ZIP:** Baixe o arquivo como um arquivo ZIP compactado.
  - Link: `http://localhost:8000/api/v1/zip/download/{fileName}?token={downloadToken}&expires={expiresAt}`

## Configuração do Projeto

1. Clone o repositório: `git clone https://github.com/eduardomcb/transitory-ipfs-share.git`
2. Instale as dependências: `yarn install`
3. Configure as variáveis de ambiente, se necessário.

## Uso

1. Inicie o servidor: `yarn start`
2. Acesse a aplicação em `http://localhost:PORT` no seu navegador.
3. Faça upload de arquivos e compartilhe os links gerados.

## Contribuições

Se deseja contribuir para este projeto, sinta-se à vontade para criar pull requests ou relatar problemas na [seção de Issues](https://github.com/eduardomcb/transitory-ipfs-share/issues).s
