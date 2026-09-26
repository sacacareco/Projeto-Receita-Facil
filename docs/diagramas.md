# Diagramas UML — Receita Fácil

## Caso de uso

```text
Usuário
  ├── Buscar receita
  ├── Visualizar detalhes
  ├── Consultar ingredientes
  ├── Consultar modo de preparo
  ├── Favoritar receita
  └── Consultar favoritos

Aplicativo
  └── API TheMealDB
```

## Fluxo principal

```text
Início
  ↓
Usuário informa termo
  ↓
Validação do termo
  ↓
Consulta à API
  ↓
Há resultados?
  ├── Não → Mensagem de aviso
  └── Sim → Lista de receitas
                ↓
          Detalhes da receita
                ↓
          Favoritar ou voltar
```
