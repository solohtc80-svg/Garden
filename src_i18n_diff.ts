--- src/i18n.ts (原始)
export type Lang = 'ru' | 'en';

export const translations = {
  // ====== AUTH / REGISTRATION ======
  'auth.welcome': { ru: 'Добро пожаловать в Садовод', en: 'Welcome to Garden Assistant' },
  'auth.subtitle': { ru: 'Интеллектуальный помощник для садоводов', en: 'Smart assistant for gardeners' },
  'auth.chooseLang': { ru: 'Выберите язык / Choose language', en: 'Выберите язык / Choose language' },
  'auth.register': { ru: 'Регистрация', en: 'Sign Up' },
  'auth.login': { ru: 'Войти', en: 'Sign In' },
  'auth.name': { ru: 'Ваше имя', en: 'Your name' },
  'auth.email': { ru: 'Email', en: 'Email' },
  'auth.password': { ru: 'Пароль', en: 'Password' },
  'auth.region': { ru: 'Регион', en: 'Region' },
  'auth.climateZone': { ru: 'Климатическая зона', en: 'Climate zone' },
  'auth.createAccount': { ru: 'Создать аккаунт', en: 'Create account' },
  'auth.haveAccount': { ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
  'auth.noAccount': { ru: 'Нет аккаунта?', en: "Don't have an account?" },
  'auth.socialLogin': { ru: 'Или войти через', en: 'Or sign in with' },
  'auth.continueAs': { ru: 'Продолжить как демо-пользователь', en: 'Continue as demo user' },

  // ====== NAVIGATION ======
  'nav.dashboard': { ru: 'Главная', en: 'Home' },
  'nav.garden': { ru: 'Участок', en: 'Garden' },
  'nav.calendar': { ru: 'Уход', en: 'Care' },
  'nav.lunar': { ru: 'Луна', en: 'Moon' },
  'nav.ai': { ru: 'AI', en: 'AI' },
  'nav.encyclopedia': { ru: 'Виды', en: 'Species' },
  'nav.community': { ru: 'Чат', en: 'Chat' },
  'nav.weather': { ru: 'Погода', en: 'Weather' },
  'nav.harvest': { ru: 'Урожай', en: 'Harvest' },
  'nav.diary': { ru: 'Дневник', en: 'Diary' },
  'nav.market': { ru: 'Биржа', en: 'Market' },
  'nav.calculator': { ru: 'Расчёт', en: 'Calc' },
  'nav.achievements': { ru: 'Награды', en: 'Awards' },
  'nav.devices': { ru: 'IoT', en: 'IoT' },
  'nav.schema': { ru: 'БД', en: 'DB' },
  'nav.profile': { ru: 'Профиль', en: 'Profile' },
  'nav.logout': { ru: 'Выйти', en: 'Logout' },

  // ====== DASHBOARD ======
  'dash.hello': { ru: 'Привет', en: 'Hello' },
  'dash.plants': { ru: 'Растений', en: 'Plants' },
  'dash.careTasks': { ru: 'Задач ухода', en: 'Care tasks' },
  'dash.gardens': { ru: 'Участков', en: 'Gardens' },
  'dash.harvest': { ru: 'Урожай', en: 'Harvest' },
  'dash.careEvents': { ru: 'Задачи ухода (CareEvent)', en: 'Care Events' },
  'dash.all': { ru: 'Все →', en: 'All →' },
  'dash.quickActions': { ru: 'Быстрые действия', en: 'Quick actions' },
  'dash.lunarDay': { ru: 'Лунный день', en: 'Lunar day' },
  'dash.weather': { ru: 'Погода', en: 'Weather' },

  // ====== GARDEN ======
  'garden.area': { ru: 'Площадь', en: 'Area' },
  'garden.plants': { ru: 'растений', en: 'plants' },
  'garden.layers': { ru: 'Слои', en: 'Layers' },
  'garden.clickHint': { ru: '💡 Клик — выбрать растение • Двойной клик — добавить', en: '💡 Click — select plant • Double-click — add' },
  'garden.newPlant': { ru: 'Новое растение', en: 'New plant' },
  'garden.variety': { ru: 'Сорт', en: 'Variety' },
  'garden.addToPlan': { ru: 'Добавить на план', en: 'Add to plan' },
  'garden.qrCode': { ru: 'QR-код', en: 'QR code' },
  'garden.delete': { ru: 'Удалить', en: 'Delete' },
  'garden.planted': { ru: 'Посажено', en: 'Planted' },
  'garden.coordinates': { ru: 'Координаты', en: 'Coordinates' },
  'garden.print': { ru: '🖨️ Печать', en: '🖨️ Print' },
  'garden.close': { ru: 'Закрыть', en: 'Close' },
  'garden.buildings': { ru: '🏠 Постройки', en: '🏠 Buildings' },
  'garden.paths': { ru: '🛤️ Дорожки', en: '🛤️ Paths' },
  'garden.beds': { ru: '🌱 Грядки', en: '🌱 Beds' },
  'garden.communications': { ru: '💧 Коммуникации', en: '💧 Utilities' },
  'garden.terrain': { ru: '⛰️ Рельеф', en: '⛰️ Terrain' },

  // ====== CARE EVENTS ======
  'care.title': { ru: 'Задачи ухода (CareEvent)', en: 'Care Events' },
  'care.progress': { ru: '📊 Прогресс', en: '📊 Progress' },
  'care.completed': { ru: 'выполнено', en: 'completed' },
  'care.scheduled': { ru: 'Запланировано', en: 'Scheduled' },
  'care.done': { ru: 'Выполнено', en: 'Done' },
  'care.water': { ru: 'Полив', en: 'Watering' },
  'care.fertilize': { ru: 'Подкормка', en: 'Fertilizing' },
  'care.prune': { ru: 'Обрезка', en: 'Pruning' },

  // ====== LUNAR ======
  'lunar.title': { ru: 'Лунный календарь', en: 'Lunar calendar' },
  'lunar.today': { ru: 'Сегодня', en: 'Today' },
  'lunar.waxing': { ru: 'Растущая Луна', en: 'Waxing Moon' },
  'lunar.full': { ru: 'Полнолуние', en: 'Full Moon' },
  'lunar.waning': { ru: 'Убывающая Луна', en: 'Waning Moon' },
  'lunar.new': { ru: 'Новолуние', en: 'New Moon' },
  'lunar.goodFor': { ru: 'Благоприятно', en: 'Good for' },
  'lunar.badFor': { ru: 'Неблагоприятно', en: 'Bad for' },

  // ====== AI ======
  'ai.title': { ru: 'AI-Диагностика (DiseaseRecord)', en: 'AI Diagnosis (DiseaseRecord)' },
  'ai.upload': { ru: 'Загрузите фото', en: 'Upload photo' },
  'ai.clickToAnalyze': { ru: 'Нажмите для анализа', en: 'Click to analyze' },
  'ai.analyzing': { ru: 'Анализ...', en: 'Analyzing...' },
  'ai.history': { ru: 'История (DiseaseRecord)', en: 'History (DiseaseRecord)' },
  'ai.result': { ru: 'Результат', en: 'Result' },
  'ai.confidence': { ru: 'Уверенность', en: 'Confidence' },
  'ai.treatment': { ru: '🩺 Лечение:', en: '🩺 Treatment:' },

  // ====== ENCYCLOPEDIA ======
  'enc.title': { ru: 'Справочник видов (Species)', en: 'Species encyclopedia' },
  'enc.search': { ru: 'Поиск вида...', en: 'Search species...' },

  // ====== COMMUNITY ======
  'comm.title': { ru: 'Сообщество (Message)', en: 'Community (Message)' },
  'comm.chats': { ru: 'Чаты', en: 'Chats' },
  'comm.members': { ru: 'участников', en: 'members' },
  'comm.placeholder': { ru: 'Сообщение...', en: 'Message...' },

  // ====== WEATHER ======
  'weather.title': { ru: 'Погода', en: 'Weather' },
  'weather.now': { ru: 'Сейчас', en: 'Now' },
  'weather.feels': { ru: 'Ощущ.', en: 'Feels' },
  'weather.humidity': { ru: 'Влажн.', en: 'Humid.' },
  'weather.wind': { ru: 'Ветер', en: 'Wind' },
  'weather.weekForecast': { ru: 'Прогноз на неделю', en: 'Week forecast' },

  // ====== HARVEST ======
  'harvest.title': { ru: 'Урожай (Harvest)', en: 'Harvest (Harvest)' },
  'harvest.total': { ru: 'Всего', en: 'Total' },
  'harvest.plants': { ru: 'Растений', en: 'Plants' },
  'harvest.picks': { ru: 'Сборов', en: 'Picks' },
  'harvest.record': { ru: 'Рекорд', en: 'Record' },
  'harvest.records': { ru: 'Записи (Harvest)', en: 'Records (Harvest)' },

  // ====== DIARY ======
  'diary.title': { ru: 'Дневник садовода', en: 'Gardener diary' },

  // ====== MARKET ======
  'market.title': { ru: 'Биржа', en: 'Marketplace' },
  'market.exchange': { ru: 'Обмен', en: 'Exchange' },
  'market.contact': { ru: 'Связаться', en: 'Contact' },

  // ====== CALCULATOR ======
  'calc.title': { ru: 'Калькулятор удобрений', en: 'Fertilizer calculator' },
  'calc.params': { ru: 'Параметры', en: 'Parameters' },
  'calc.area': { ru: 'Площадь (м²)', en: 'Area (m²)' },
  'calc.soil': { ru: 'Тип почвы', en: 'Soil type' },
  'calc.sandy': { ru: 'Песчаная', en: 'Sandy' },
  'calc.loamy': { ru: 'Суглинистая', en: 'Loamy' },
  'calc.clay': { ru: 'Глинистая', en: 'Clay' },
  'calc.plant': { ru: 'Растение', en: 'Plant' },
  'calc.calculate': { ru: 'Рассчитать', en: 'Calculate' },
  'calc.result': { ru: 'Результат', en: 'Result' },
  'calc.dose': { ru: 'Доза', en: 'Dose' },
  'calc.fillParams': { ru: 'Заполните параметры', en: 'Fill parameters' },

  // ====== ACHIEVEMENTS ======
  'ach.title': { ru: 'Достижения', en: 'Achievements' },
  'ach.earned': { ru: 'Получено наград', en: 'Awards earned' },

  // ====== DEVICES ======
  'dev.title': { ru: 'Умные устройства (IoT)', en: 'Smart devices (IoT)' },
  'dev.zone': { ru: 'Зона', en: 'Zone' },
  'dev.schedule': { ru: 'Расписание', en: 'Schedule' },
  'dev.activity': { ru: 'Активность', en: 'Activity' },
  'dev.online': { ru: 'Онлайн', en: 'Online' },
  'dev.offline': { ru: 'Оффлайн', en: 'Offline' },

  // ====== DB SCHEMA ======
  'db.title': { ru: 'Схема базы данных', en: 'Database schema' },
  'db.description': { ru: 'Визуализация структуры БД приложения «Садовод»', en: 'Visualization of Garden Assistant DB structure' },
  'db.relations': { ru: 'Связи между таблицами', en: 'Relations between tables' },
  'db.stats': { ru: '📊 Статистика данных в приложении', en: '📊 Data statistics in the app' },

  // ====== PROFILE ======
  'prof.title': { ru: 'Профиль (User)', en: 'Profile (User)' },
  'prof.userData': { ru: 'Данные из таблицы User', en: 'Data from User table' },
  'prof.myGardens': { ru: 'Мои участки (Garden)', en: 'My gardens (Garden)' },
  'prof.open': { ru: 'Открыть', en: 'Open' },

  // ====== COMMON ======
  'common.all': { ru: 'Все', en: 'All' },
  'common.close': { ru: 'Закрыть', en: 'Close' },
  'common.save': { ru: 'Сохранить', en: 'Save' },
  'common.cancel': { ru: 'Отмена', en: 'Cancel' },
  'common.language': { ru: 'Язык', en: 'Language' },
  'common.changeLang': { ru: 'Сменить язык', en: 'Change language' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}


+++ src/i18n.ts (修改后)
export type Lang = 'ru' | 'en';

export const translations = {
  // ====== AUTH / REGISTRATION ======
  'auth.welcome': { ru: 'Добро пожаловать в Садовод', en: 'Welcome to Garden Assistant' },
  'auth.subtitle': { ru: 'Интеллектуальный помощник для садоводов', en: 'Smart assistant for gardeners' },
  'auth.chooseLang': { ru: 'Выберите язык / Choose language', en: 'Выберите язык / Choose language' },
  'auth.register': { ru: 'Регистрация', en: 'Sign Up' },
  'auth.login': { ru: 'Войти', en: 'Sign In' },
  'auth.name': { ru: 'Ваше имя', en: 'Your name' },
  'auth.email': { ru: 'Email', en: 'Email' },
  'auth.password': { ru: 'Пароль', en: 'Password' },
  'auth.region': { ru: 'Регион', en: 'Region' },
  'auth.address': { ru: 'Адрес участка', en: 'Plot address' },
  'auth.addressHint': { ru: 'Для определения погодной зоны', en: 'For weather zone detection' },
  'auth.climateZone': { ru: 'Климатическая зона', en: 'Climate zone' },
  'auth.climateZoneAuto': { ru: 'Определяется автоматически по адресу', en: 'Auto-detected from address' },
  'auth.phone': { ru: 'Телефон', en: 'Phone' },
  'auth.avatar': { ru: 'Выберите аватар', en: 'Choose avatar' },
  'auth.createAccount': { ru: 'Создать аккаунт', en: 'Create account' },
  'auth.haveAccount': { ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
  'auth.noAccount': { ru: 'Нет аккаунта?', en: "Don't have an account?" },
  'auth.socialLogin': { ru: 'Или войти через', en: 'Or sign in with' },
  'auth.continueAs': { ru: 'Продолжить как демо-пользователь', en: 'Continue as demo user' },

  // ====== NAVIGATION ======
  'nav.dashboard': { ru: 'Главная', en: 'Home' },
  'nav.garden': { ru: 'Участок', en: 'Garden' },
  'nav.calendar': { ru: 'Уход', en: 'Care' },
  'nav.lunar': { ru: 'Луна', en: 'Moon' },
  'nav.ai': { ru: 'AI', en: 'AI' },
  'nav.encyclopedia': { ru: 'Виды', en: 'Species' },
  'nav.community': { ru: 'Чат', en: 'Chat' },
  'nav.weather': { ru: 'Погода', en: 'Weather' },
  'nav.harvest': { ru: 'Урожай', en: 'Harvest' },
  'nav.diary': { ru: 'Дневник', en: 'Diary' },
  'nav.market': { ru: 'Биржа', en: 'Market' },
  'nav.calculator': { ru: 'Расчёт', en: 'Calc' },
  'nav.achievements': { ru: 'Награды', en: 'Awards' },
  'nav.devices': { ru: 'IoT', en: 'IoT' },
  'nav.schema': { ru: 'БД', en: 'DB' },
  'nav.profile': { ru: 'Профиль', en: 'Profile' },
  'nav.logout': { ru: 'Выйти', en: 'Logout' },

  // ====== DASHBOARD ======
  'dash.hello': { ru: 'Привет', en: 'Hello' },
  'dash.plants': { ru: 'Растений', en: 'Plants' },
  'dash.careTasks': { ru: 'Задач ухода', en: 'Care tasks' },
  'dash.gardens': { ru: 'Участков', en: 'Gardens' },
  'dash.harvest': { ru: 'Урожай', en: 'Harvest' },
  'dash.careEvents': { ru: 'Задачи ухода (CareEvent)', en: 'Care Events' },
  'dash.all': { ru: 'Все →', en: 'All →' },
  'dash.quickActions': { ru: 'Быстрые действия', en: 'Quick actions' },
  'dash.lunarDay': { ru: 'Лунный день', en: 'Lunar day' },
  'dash.weather': { ru: 'Погода', en: 'Weather' },

  // ====== GARDEN ======
  'garden.area': { ru: 'Площадь', en: 'Area' },
  'garden.plants': { ru: 'растений', en: 'plants' },
  'garden.layers': { ru: 'Слои', en: 'Layers' },
  'garden.clickHint': { ru: '💡 Клик — выбрать растение • Двойной клик — добавить', en: '💡 Click — select plant • Double-click — add' },
  'garden.newPlant': { ru: 'Новое растение', en: 'New plant' },
  'garden.variety': { ru: 'Сорт', en: 'Variety' },
  'garden.addToPlan': { ru: 'Добавить на план', en: 'Add to plan' },
  'garden.qrCode': { ru: 'QR-код', en: 'QR code' },
  'garden.delete': { ru: 'Удалить', en: 'Delete' },
  'garden.planted': { ru: 'Посажено', en: 'Planted' },
  'garden.coordinates': { ru: 'Координаты', en: 'Coordinates' },
  'garden.print': { ru: '🖨️ Печать', en: '🖨️ Print' },
  'garden.close': { ru: 'Закрыть', en: 'Close' },
  'garden.buildings': { ru: '🏠 Постройки', en: '🏠 Buildings' },
  'garden.paths': { ru: '🛤️ Дорожки', en: '🛤️ Paths' },
  'garden.beds': { ru: '🌱 Грядки', en: '🌱 Beds' },
  'garden.communications': { ru: '💧 Коммуникации', en: '💧 Utilities' },
  'garden.terrain': { ru: '⛰️ Рельеф', en: '⛰️ Terrain' },

  // ====== CARE EVENTS ======
  'care.title': { ru: 'Задачи ухода (CareEvent)', en: 'Care Events' },
  'care.progress': { ru: '📊 Прогресс', en: '📊 Progress' },
  'care.completed': { ru: 'выполнено', en: 'completed' },
  'care.scheduled': { ru: 'Запланировано', en: 'Scheduled' },
  'care.done': { ru: 'Выполнено', en: 'Done' },
  'care.water': { ru: 'Полив', en: 'Watering' },
  'care.fertilize': { ru: 'Подкормка', en: 'Fertilizing' },
  'care.prune': { ru: 'Обрезка', en: 'Pruning' },

  // ====== LUNAR ======
  'lunar.title': { ru: 'Лунный календарь', en: 'Lunar calendar' },
  'lunar.today': { ru: 'Сегодня', en: 'Today' },
  'lunar.waxing': { ru: 'Растущая Луна', en: 'Waxing Moon' },
  'lunar.full': { ru: 'Полнолуние', en: 'Full Moon' },
  'lunar.waning': { ru: 'Убывающая Луна', en: 'Waning Moon' },
  'lunar.new': { ru: 'Новолуние', en: 'New Moon' },
  'lunar.goodFor': { ru: 'Благоприятно', en: 'Good for' },
  'lunar.badFor': { ru: 'Неблагоприятно', en: 'Bad for' },

  // ====== AI ======
  'ai.title': { ru: 'AI-Диагностика (DiseaseRecord)', en: 'AI Diagnosis (DiseaseRecord)' },
  'ai.upload': { ru: 'Загрузите фото', en: 'Upload photo' },
  'ai.clickToAnalyze': { ru: 'Нажмите для анализа', en: 'Click to analyze' },
  'ai.analyzing': { ru: 'Анализ...', en: 'Analyzing...' },
  'ai.history': { ru: 'История (DiseaseRecord)', en: 'History (DiseaseRecord)' },
  'ai.result': { ru: 'Результат', en: 'Result' },
  'ai.confidence': { ru: 'Уверенность', en: 'Confidence' },
  'ai.treatment': { ru: '🩺 Лечение:', en: '🩺 Treatment:' },

  // ====== ENCYCLOPEDIA ======
  'enc.title': { ru: 'Справочник видов (Species)', en: 'Species encyclopedia' },
  'enc.search': { ru: 'Поиск вида...', en: 'Search species...' },

  // ====== COMMUNITY ======
  'comm.title': { ru: 'Сообщество (Message)', en: 'Community (Message)' },
  'comm.chats': { ru: 'Чаты', en: 'Chats' },
  'comm.members': { ru: 'участников', en: 'members' },
  'comm.placeholder': { ru: 'Сообщение...', en: 'Message...' },

  // ====== WEATHER ======
  'weather.title': { ru: 'Погода', en: 'Weather' },
  'weather.now': { ru: 'Сейчас', en: 'Now' },
  'weather.feels': { ru: 'Ощущ.', en: 'Feels' },
  'weather.humidity': { ru: 'Влажн.', en: 'Humid.' },
  'weather.wind': { ru: 'Ветер', en: 'Wind' },
  'weather.weekForecast': { ru: 'Прогноз на неделю', en: 'Week forecast' },

  // ====== HARVEST ======
  'harvest.title': { ru: 'Урожай (Harvest)', en: 'Harvest (Harvest)' },
  'harvest.total': { ru: 'Всего', en: 'Total' },
  'harvest.plants': { ru: 'Растений', en: 'Plants' },
  'harvest.picks': { ru: 'Сборов', en: 'Picks' },
  'harvest.record': { ru: 'Рекорд', en: 'Record' },
  'harvest.records': { ru: 'Записи (Harvest)', en: 'Records (Harvest)' },

  // ====== DIARY ======
  'diary.title': { ru: 'Дневник садовода', en: 'Gardener diary' },

  // ====== MARKET ======
  'market.title': { ru: 'Биржа', en: 'Marketplace' },
  'market.exchange': { ru: 'Обмен', en: 'Exchange' },
  'market.contact': { ru: 'Связаться', en: 'Contact' },

  // ====== CALCULATOR ======
  'calc.title': { ru: 'Калькулятор удобрений', en: 'Fertilizer calculator' },
  'calc.params': { ru: 'Параметры', en: 'Parameters' },
  'calc.area': { ru: 'Площадь (м²)', en: 'Area (m²)' },
  'calc.soil': { ru: 'Тип почвы', en: 'Soil type' },
  'calc.sandy': { ru: 'Песчаная', en: 'Sandy' },
  'calc.loamy': { ru: 'Суглинистая', en: 'Loamy' },
  'calc.clay': { ru: 'Глинистая', en: 'Clay' },
  'calc.plant': { ru: 'Растение', en: 'Plant' },
  'calc.calculate': { ru: 'Рассчитать', en: 'Calculate' },
  'calc.result': { ru: 'Результат', en: 'Result' },
  'calc.dose': { ru: 'Доза', en: 'Dose' },
  'calc.fillParams': { ru: 'Заполните параметры', en: 'Fill parameters' },

  // ====== ACHIEVEMENTS ======
  'ach.title': { ru: 'Достижения', en: 'Achievements' },
  'ach.earned': { ru: 'Получено наград', en: 'Awards earned' },

  // ====== DEVICES ======
  'dev.title': { ru: 'Умные устройства (IoT)', en: 'Smart devices (IoT)' },
  'dev.zone': { ru: 'Зона', en: 'Zone' },
  'dev.schedule': { ru: 'Расписание', en: 'Schedule' },
  'dev.activity': { ru: 'Активность', en: 'Activity' },
  'dev.online': { ru: 'Онлайн', en: 'Online' },
  'dev.offline': { ru: 'Оффлайн', en: 'Offline' },

  // ====== DB SCHEMA ======
  'db.title': { ru: 'Схема базы данных', en: 'Database schema' },
  'db.description': { ru: 'Визуализация структуры БД приложения «Садовод»', en: 'Visualization of Garden Assistant DB structure' },
  'db.relations': { ru: 'Связи между таблицами', en: 'Relations between tables' },
  'db.stats': { ru: '📊 Статистика данных в приложении', en: '📊 Data statistics in the app' },

  // ====== PROFILE ======
  'prof.title': { ru: 'Профиль (User)', en: 'Profile (User)' },
  'prof.userData': { ru: 'Данные из таблицы User', en: 'Data from User table' },
  'prof.myGardens': { ru: 'Мои участки (Garden)', en: 'My gardens (Garden)' },
  'prof.open': { ru: 'Открыть', en: 'Open' },
  'prof.edit': { ru: 'Редактировать', en: 'Edit' },
  'prof.save': { ru: 'Сохранить изменения', en: 'Save changes' },
  'prof.cancel': { ru: 'Отмена', en: 'Cancel' },
  'prof.address': { ru: 'Адрес участка', en: 'Plot address' },
  'prof.phone': { ru: 'Телефон', en: 'Phone' },
  'prof.region': { ru: 'Регион', en: 'Region' },
  'prof.climateZone': { ru: 'Климатическая зона', en: 'Climate zone' },
  'prof.changeAvatar': { ru: 'Сменить аватар', en: 'Change avatar' },
  'prof.logout': { ru: 'Выйти из аккаунта', en: 'Sign out' },
  'prof.switchAccount': { ru: 'Сменить аккаунт', en: 'Switch account' },
  'prof.logoutConfirm': { ru: 'Вы уверены, что хотите выйти?', en: 'Are you sure you want to sign out?' },
  'prof.switchConfirm': { ru: 'Сменить аккаунт? Все несохранённые данные будут потеряны.', en: 'Switch account? Unsaved data will be lost.' },
  'prof.saved': { ru: 'Профиль обновлён', en: 'Profile updated' },
  'prof.accountInfo': { ru: 'Информация об аккаунте', en: 'Account info' },
  'prof.dangerZone': { ru: 'Опасная зона', en: 'Danger zone' },

  // ====== COMMON ======
  'common.all': { ru: 'Все', en: 'All' },
  'common.close': { ru: 'Закрыть', en: 'Close' },
  'common.save': { ru: 'Сохранить', en: 'Save' },
  'common.cancel': { ru: 'Отмена', en: 'Cancel' },
  'common.language': { ru: 'Язык', en: 'Language' },
  'common.changeLang': { ru: 'Сменить язык', en: 'Change language' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}
