# Pedro & Evandro — uma história para a vida inteira

Convite narrativo estático em React, Vite e TypeScript. Seis capítulos, envelope animado, fotografias reais, linha do tempo, revelação do casamento, confirmação pelo WhatsApp e trilha sonora local opcional. Sem backend ou serviços pagos.

## Executar

Use Node.js 20.19+ (ou 22.12+) e npm.

```sh
npm install
npm run dev
```

Abra o endereço impresso pelo Vite. Para validar e compilar:

```sh
npm test
npm run build
npm run preview
```

O build pronto para hospedagem fica em `dist/`. Não publique `node_modules/` nem a pasta original `fotos/` separadamente. O build copia apenas as versões públicas necessárias.

## Organização

- `fotos/`: oito fotografias originais, preservadas.
- `scripts/photos.mjs`: descoberta automática, rotação conforme EXIF, WebP responsivo e imagem social 1200 × 630.
- `public/photos/`: cópias em até 480, 960 e 1600 pixels, sem ampliação.
- `public/musicas/`: adicione aqui sua faixa autorizada.
- `public/og-image.jpg`, `public/favicon.svg`: compartilhamento e ícone.
- `src/config/wedding.ts`: casal, data, hora, local, música, WhatsApp, URL e fotos dos capítulos.
- `src/config/story.ts`: conteúdo, ordem e fotografias dos cinco momentos.
- `src/config/photos.json`: manifesto gerado automaticamente; não editar manualmente.
- `src/components/`: envelope, player, linha do tempo, revelação, contagem, cerimônia, RSVP, galeria, pétalas e componentes compartilhados.
- `src/lib/event.ts`: conversão de fuso e validação de links.
- `src/styles/global.css`: tema e layout mobile-first.
- `tests/event.test.mjs`: testes de fuso, contagem e links.

## Fotografias

Adicione JPEG, PNG, WebP ou AVIF em `fotos/` e execute `npm run photos` (também executado por dev/build). Reinicie o servidor ao adicionar arquivos. Originais não são alterados; versões geradas removem metadados EXIF e preservam a orientação. As fotos ilustram a narrativa, sem atribuir a elas uma data ou acontecimento não confirmado.

Em `src/config/story.ts`, altere `photos` com os nomes exatos, incluindo extensão e maiúsculas. Cada momento permite `title`, `date`, `secondDate`, `location`, `text`, `extra`, `quote`, `photos`, `presentation` (`editorial`, `collage`, `portrait`) e `order`. Edite também os textos alternativos em `photoDescriptions`. A galeria opcional descobre todas as fotos automaticamente. As composições de colagem e galeria preservam a foto inteira; outras áreas usam recorte editorial via `object-fit`. Ajuste `object-position` no CSS se trocar o enquadramento.

Em `wedding.photos`, escolha `opening`, `reveal`, `rsvp`, `closing` e `sharing`. A seleção de `sharing` usa nome literal com aspas simples para o gerador. A prévia social contém nomes/data desenhados em `scripts/photos.mjs`; se estes mudarem, atualize também esse texto e os metadados de `index.html`.

Inventário original: 1.jpg 640×640; 2.jpg 1440×1440; 3.jpg 960×668; 4.JPG 3024×4032; 5.png 1128×1538; 6.png 844×1352; 7.png 1103×952; 8.png 1290×2283.

## Informações a preencher

Edite `src/config/wedding.ts`:

- `event.time`: `HH:mm`, por exemplo `18:00`, apenas quando confirmado. A contagem usa `America/Fortaleza` via Intl, independentemente do fuso do convidado. Sem hora, fica oculta. Após o evento, aparece uma mensagem de celebração.
- `event.venue`, `event.address`: nome e endereço reais. Dados ausentes não são inventados.
- `event.mapsUrl`: URL HTTPS copiada do Google Maps. O botão só aparece com URL válida.
- `rsvp.whatsappNumber`: número internacional com DDI e DDD, apenas dígitos. Sem número válido, mostramos uma mensagem de confirmação em breve. O link abre `wa.me` com a mensagem configurada; o convidado confirma o envio no WhatsApp.
- `music.src`: por exemplo `musicas/nossa-musica.mp3`; `music.title`: nome da faixa. Use MP3 autorizado para ampla compatibilidade. Não há música incluída. O áudio começa na interação inicial, com play/pause persistente, tratamento de bloqueios/erros e sem reinício entre capítulos. Sem arquivo configurado, o controle fica oculto.
- `website.url`: URL pública completa, incluindo subpasta quando aplicável, sem barra final.

## Publicar gratuitamente no Cloudflare Pages

1. Envie o projeto para um repositório GitHub/GitLab.
2. No Cloudflare Pages, crie um projeto e conecte o repositório.
3. Configure comando de build `npm run build`, diretório de saída `dist` e Node 22.
4. Use `BASE_PATH=/` (padrão). Configure `SITE_URL` com a URL HTTPS final (por exemplo a URL `pages.dev` atribuída ao seu projeto).
5. Faça o deploy. Se recebeu a URL apenas após o primeiro deploy, configure `SITE_URL` e faça novo deploy.

Também é possível executar o build localmente e enviar `dist` pelo upload direto do Pages. Não é necessário servidor ou função.

## Publicar gratuitamente no GitHub Pages

A workflow incluída em `.github/workflows/pages.yml` compila e publica em pushes na branch `main` ou execução manual. Em **Settings → Pages → Source**, selecione **GitHub Actions**. Configure a variável de repositório `SITE_URL` com `https://SEU-USUARIO.github.io/SEU-REPOSITORIO`. A workflow usa automaticamente o nome do repositório como `BASE_PATH`. Para domínio próprio ou repositório `usuario.github.io`, defina a variável `BASE_PATH` como `/`; para outro caminho, inclua barras inicial e final.

Para compilar manualmente com subpasta:

```sh
BASE_PATH=/SEU-REPOSITORIO/ SITE_URL=https://SEU-USUARIO.github.io/SEU-REPOSITORIO npm run build
```

Nunca coloque uma URL fictícia na configuração publicada.

## Prévia no WhatsApp

`SITE_URL` (ambiente de build) tem prioridade sobre `wedding.website.url`. O Vite insere a URL absoluta de `og-image.jpg` e a URL do site diretamente no HTML estático, para que robôs de compartilhamento não dependam de JavaScript. Configure o endereço real, faça novo build/deploy e verifique se `https://SUA-URL/og-image.jpg` abre sem login. Compartilhe a URL pública HTTPS. O WhatsApp mantém cache e pode demorar a atualizar uma prévia já compartilhada. Não existe prévia pública enquanto o site estiver somente em localhost.

## Acessibilidade e validação

Botões nativos, foco visível, link para pular à cerimônia, textos alternativos, seções semânticas, carregamento adiado, foto principal prioritária e `prefers-reduced-motion`. A contagem não anuncia cada segundo ao leitor de tela. As animações de entrada só ocorrem uma vez. O layout considera safe areas e telas de 360 a 430 px.

Os testes automatizados cobrem cálculos e validações, e o build verifica TypeScript. Antes de compartilhar o convite definitivo, valide em um iPhone/Safari e Android/Chrome reais, com a música autorizada e os dados finais preenchidos. A reprodução depende das políticas do navegador e do arquivo fornecido.
