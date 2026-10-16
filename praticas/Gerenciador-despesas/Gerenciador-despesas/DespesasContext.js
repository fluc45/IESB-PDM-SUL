import { createContext, useContext, useState } from "react";

const DespesasContext = createContext(null);

const DESPESAS_INICIAIS = [
  {
    id: "1",
    descricao: "Conta de luz",
    valor: 100.99,
    data: new Date(2026, 9, 11),
    categoria: "Contas",
  },
  {
    id: "2",
    descricao: "Conta de água",
    valor: 40.99,
    data: new Date(2026, 9, 10),
    categoria: "Contas",
  },
  {
    id: "3",
    descricao: "Mercado",
    valor: 82.5,
    data: new Date(2026, 9, 14),
    categoria: "Alimentação",
  },
  {
    id: "4",
    descricao: "Transporte",
    valor: 23.5,
    data: new Date(2026, 9, 13),
    categoria: "Transporte",
  },
  {
    id: "5",
    descricao: "Cinema",
    valor: 35,
    data: new Date(2026, 9, 12),
    categoria: "Lazer",
  },
];

export const CATEGORIAS_DESPESA = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Contas",
];

export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(despesa) {
    setDespesas((despesasAtuais) => [despesa, ...despesasAtuais]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas() {
  const contexto = useContext(DespesasContext);

  if (!contexto) {
    throw new Error("useDespesas deve ser usado dentro de DespesasProvider.");
  }

  return contexto;
}
