--- DEPLOY.md (原始)


+++ DEPLOY.md (修改后)
# 🚀 Публикация на Netlify

## Быстрый способ (Drag & Drop)

1. **Соберите проект:**
   ```bash
   npm install
   npm run build
   ```

2. **Перейдите на Netlify:**
   - Откройте [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Перетащите папку `dist/` в окно браузера
   - Готово! Получите ссылку вида `https://random-name-123.netlify.app`

## Автоматический деплой через GitHub

1. **Создайте репозиторий на GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_ЛОГИН/garden-assistant.git
   git push -u origin main
   ```

2. **Подключите к Netlify:**
   - Зарегистрируйтесь на [netlify.com](https://netlify.com)
   - Нажмите "Add new site" → "Import an existing project"
   - Выберите GitHub и ваш репозиторий
   - Netlify автоматически определит настройки из `netlify.toml`
   - Нажмите "Deploy site"

3. **Настройте домен (опционально):**
   - В настройках сайта → "Domain settings"
   - Добавьте свой домен или используйте бесплатный `*.netlify.app`

## Конфигурация

Файл `netlify.toml` уже настроен:
- Команда сборки: `npm run build`
- Папка публикации: `dist`
- Node.js версия: 18
- Редиректы для SPA
- Заголовки безопасности
- Кэширование для assets

## Обновление сайта

При каждом push в GitHub Netlify автоматически пересоберёт и опубликует сайт.

## Локальная проверка

```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Запустить локальный сервер
netlify dev

# Или использовать стандартный dev-сервер
npm run dev
```

## Переменные окружения (опционально)

Если нужны API ключи, добавьте их в Netlify:
- Site settings → Environment variables
- Добавьте переменные (например, `VITE_API_KEY`)

## Поддержка PWA

Сайт поддерживает установку как PWA:
1. Откройте сайт в браузере
2. Нажмите "Поделиться" → "На экран Домой" (iOS) или "Установить приложение" (Android)
3. Приложение будет работать офлайн!

---

**Готово!** Ваш сайт "Садовод" опубликован и доступен по ссылке Netlify. 🌱
