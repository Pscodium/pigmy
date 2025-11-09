Testes rápidos para validar importação/require do bundle construído em `dist/`.

Arquivos:
- `esm-test.mjs` — importa o ESM em `dist/index.js` e imprime exemplos.
- `cjs-test.cjs` — require o CJS em `dist/index.cjs` e imprime exemplos.
- `run-tests.ps1` — executa ambos (PowerShell).

Uso (PowerShell):

```powershell
cd test
.\run-tests.ps1
```

Alternativamente, rode manualmente:

```powershell
node .\test\esm-test.mjs; node .\test\cjs-test.cjs
```

Esses testes usam o bundle gerado em `dist/`. Certifique-se de executar `npm run build` antes se o diretório `dist` não existir ou estiver desatualizado.
