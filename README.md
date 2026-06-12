# 💌 Dia dos Namorados — Surpresa para Você

Um site romântico, feito para celular, com uma jornada interativa: capa com coração pulsante, trilha sonora, linha do tempo do casal, carrossel de "motivos para te amar" e uma carta final que aparece com efeito de digitação e uma chuva de corações.

Construído com **HTML, CSS e JavaScript puro** (sem bibliotecas), pronto para hospedar de graça no **GitHub Pages**.

---

## ✨ O que tem dentro

1. **Capa** — coração pulsante e o botão "Toque para abrir".
2. **Player de música** — mini-player elegante que toca a trilha ao abrir.
3. **Linha do tempo** — os momentos de vocês, revelados conforme a pessoa desce a tela.
4. **Carrossel** — bilhetes que deslizam para o lado (swipe).
5. **Revelação final** — botão que solta confetes de coração e digita uma carta de amor.

---

## 📂 Arquivos

| Arquivo       | Para que serve                                              |
|---------------|-------------------------------------------------------------|
| `index.html`  | Estrutura e **textos** do site (é aqui que você mais edita) |
| `style.css`   | Aparência: cores, fontes, efeito vidro e animações          |
| `script.js`   | Lógica: música, animações, carrossel e a **carta final**    |
| `her.mp3`     | A música de fundo                                           |
| `foto1.jpg` … | As fotos da linha do tempo (você adiciona)                  |

---

## 🎨 Como personalizar

Todos os pontos editáveis estão marcados no código com o comentário `EDITAR AQUI`.

### Textos
Abra o **`index.html`** e procure por `EDITAR AQUI`. Você consegue mudar o título, a saudação com o nome da pessoa, os momentos da linha do tempo e os cartões do carrossel.

### A carta final
Abra o **`script.js`** e edite o objeto `CONFIG` lá no topo. O texto dentro de `letter:` é o que será "digitado" no final. Escreva à vontade — as quebras de linha são respeitadas.

### As fotos
Coloque as imagens na **mesma pasta** dos outros arquivos, com os nomes exatos:
`foto1.jpg`, `foto2.jpg`, `foto3.jpg`, `foto4.jpg`.

> Dica: o nome precisa ser idêntico (minúsculo, sem espaço, sem acento). Se a sua foto for `.png`, ou renomeie para `.jpg`, ou troque o `src` correspondente no `index.html`.

Enquanto não há foto, aparece um quadro com "📷 Sua foto aqui" — nada quebra o layout.

### A música
Coloque o arquivo de áudio na mesma pasta com o nome exato `her.mp3`.
A música **começa quando a pessoa toca em "Toque para abrir"** — isso é proposital e é o que libera o áudio no celular.

### As cores
Quer outro tom? No início do `style.css`, no bloco `:root`, mude os valores `--accent`, `--wine`, `--plum` etc.

---

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório novo (público) no GitHub.
2. **Add file → Upload files** e arraste **todos** os arquivos juntos (`index.html`, `style.css`, `script.js`, `her.mp3` e as fotos), na raiz do repositório.
3. Clique em **Commit changes**.
4. Vá em **Settings → Pages**.
5. Em **Source**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)` e clique em **Save**.
6. Aguarde 1–2 minutos e recarregue. O link aparece no topo, assim:

```
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```

Esse é o endereço para enviar à pessoa amada. 💕

---

## 🔎 Não está funcionando?

- **A música não toca:** confirme que o arquivo se chama exatamente `her.mp3`; teste pelo link `https://` do GitHub Pages no celular (e não abrindo o arquivo direto no PC); e lembre que ela só inicia **depois** do toque em "Toque para abrir".
- **As fotos não aparecem:** o nome do arquivo precisa bater com o `src` do `index.html` (`foto1.jpg`, etc.).
- **A página não carrega:** o arquivo principal precisa se chamar `index.html`, tudo em minúsculas.

---

## 🛠️ Detalhes técnicos

- 100% mobile-first, com alvos de toque confortáveis.
- Estilo *glassmorphism* sobre fundo animado (céu estrelado + gradiente).
- Animações em CSS Keyframes; lógica em JavaScript puro.
- Revelações no scroll via `IntersectionObserver`.
- Confetes de coração desenhados em `<canvas>`.
- `overflow-x: hidden` para evitar rolagem horizontal.
- Respeita a preferência de **reduzir movimento** do sistema.

---

## 📌 Observação

A música usada é de terceiros e protegida por direitos autorais. Use o arquivo apenas para fins pessoais e privados; evite distribuí-lo publicamente.

Feito com carinho. ❤️
