# Рекурсивный список дел

Приложение представляет из себя список дел, который позволяет просматривать задачи, вложенные друг в друга и создавать
новые задачи.

## Платформа

Приложение основано на платформе `react-scripts`.

## Состояние

Глобальным состоянием управляет `mobx`.

Состояние автоматически синхронизируется с `localStorage`, используя `mobx-persist-store`.

## Интерфейс

Компоненты распределены по слоям `pages`, `layouts`, `widgets`. Слои расположены ступенчато, вышележащий слой может
использовать компоненты из нижележащих слоев.

Каждая компонента может содержать подмодули и по необходимости реэкспортировать их в `index.ts`.

## Запуск

```bash
cd path/to/recursive-todo-list

npm install
npm start
```

Приложение доступно по адресу http://localhost:3000.