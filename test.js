import { colora } from "./dist/index.js";

console.log(colora.red("❌ Erro ao conectar no banco"));
console.log(colora.green("✅ Servidor iniciado com sucesso"));
console.log(colora.yellow("⚠ Aviso: modo de depuração ativado"));
console.log(colora.info("ℹ Informação útil"));
console.log(colora.success("Operação concluída com sucesso"));
console.log(colora.error("Falha crítica detectada!"));