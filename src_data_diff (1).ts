--- src/data.ts (原始)
import {
  User, Garden, Building, Species, Plant, CareEvent, DiseaseRecord, Message, Harvest,
  ChatRoom, WeatherData, LunarDay, Badge, MarketListing, DiaryEntry, SmartDevice
} from './types';

// ============ User ============
export const CURRENT_USER: User = {
  id: 'u1',
  email: 'anna@garden.ru',
  password_hash: '$2b$12$KIX4P3...hashed',
  name: 'Анна Садовница',
  region: 'Московская область',
  climate_zone: '4b',
  created_at: '2023-03-15T10:00:00',
};

export const OTHER_USERS: User[] = [
  { id: 'u2', email: 'maria@mail.ru', password_hash: '***', name: 'Мария К.', region: 'Москва', climate_zone: '4b', created_at: '2023-05-10' },
  { id: 'u3', email: 'ivan@mail.ru', password_hash: '***', name: 'Иван П.', region: 'Подольск', climate_zone: '4b', created_at: '2023-06-22' },
  { id: 'u4', email: 'elena@mail.ru', password_hash: '***', name: 'Елена С.', region: 'Химки', climate_zone: '4b', created_at: '2024-01-15' },
  { id: 'u5', email: 'petr@mail.ru', password_hash: '***', name: 'Пётр В.', region: 'Серпухов', climate_zone: '4a', created_at: '2024-02-20' },
];

export const USER_BADGES: Badge[] = [
  { id: 'b1', name: 'Первый урожай', icon: '🌱', description: 'Собрать первый урожай', earned: true, earnedAt: '2023-07-15' },
  { id: 'b2', name: '100 растений', icon: '🌳', description: 'Вырастить 100 растений', earned: true, earnedAt: '2024-06-01' },
  { id: 'b3', name: 'Мастер компоста', icon: '🧪', description: 'Подготовить 10 партий компоста', earned: true, earnedAt: '2024-03-20' },
  { id: 'b4', name: 'Знаток', icon: '📚', description: '100 ответов в сообществе', earned: false },
  { id: 'b5', name: 'Сезон без потерь', icon: '🏆', description: 'Сезон без болезней', earned: false },
  { id: 'b6', name: 'Наставник', icon: '👨‍🏫', description: 'Помочь 50 начинающим', earned: false },
];

// ============ Garden ============
export const GARDENS: Garden[] = [
  {
    id: 'g1', user_id: 'u1', name: 'Дача в Подмосквье',
    area: 1000, width_m: 40, height_m: 25,
    gps_coords: { lat: 55.7558, lng: 37.6173 },
    plan_image_url: '/plans/dacha.jpg',
  },
  {
    id: 'g2', user_id: 'u1', name: 'Балкон',
    area: 4, width_m: 3, height_m: 1.5,
    gps_coords: { lat: 55.7558, lng: 37.6173 },
    plan_image_url: '/plans/balcon.jpg',
  },
];

// ============ Building ============
export const BUILDINGS: Building[] = [
  { id: 'b1', garden_id: 'g1', name: 'Дом', type: 'house', x: 80, y: 280, width: 120, height: 90, color: '#dc2626', icon: '🏠' },
  { id: 'b2', garden_id: 'g1', name: 'Теплица', type: 'greenhouse', x: 300, y: 160, width: 150, height: 100, color: '#16a34a', icon: '🏡' },
  { id: 'b3', garden_id: 'g1', name: 'Сарай', type: 'shed', x: 650, y: 480, width: 80, height: 60, color: '#92400e', icon: '🏚️' },
  { id: 'b4', garden_id: 'g1', name: 'Баня', type: 'bath', x: 220, y: 500, width: 70, height: 55, color: '#7c3aed', icon: '🛁' },
  { id: 'b5', garden_id: 'g1', name: 'Колодец', type: 'well', x: 420, y: 520, width: 40, height: 40, color: '#0891b2', icon: '🪣' },
  { id: 'b6', garden_id: 'g2', name: 'Ящик', type: 'custom', x: 50, y: 50, width: 100, height: 80, color: '#ca8a04', icon: '🪴' },
];

export const BUILDING_TYPES: Record<Building['type'], { label_ru: string; label_en: string; icon: string; color: string }> = {
  house: { label_ru: 'Дом', label_en: 'House', icon: '🏠', color: '#dc2626' },
  greenhouse: { label_ru: 'Теплица', label_en: 'Greenhouse', icon: '🏡', color: '#16a34a' },
  shed: { label_ru: 'Сарай', label_en: 'Shed', icon: '🏚️', color: '#92400e' },
  bath: { label_ru: 'Баня', label_en: 'Bathhouse', icon: '🛁', color: '#7c3aed' },
  garage: { label_ru: 'Гараж', label_en: 'Garage', icon: '🚗', color: '#475569' },
  well: { label_ru: 'Колодец', label_en: 'Well', icon: '🪣', color: '#0891b2' },
  custom: { label_ru: 'Другое', label_en: 'Custom', icon: '📦', color: '#ca8a04' },
};

// ============ Species (справочник видов) ============
export const SPECIES: Species[] = [
  { id: 'sp1', name: 'Яблоня', category: 'tree', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Суглинистая' },
  { id: 'sp2', name: 'Томат', category: 'vegetable', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Плодородная суглинок' },
  { id: 'sp3', name: 'Клубника', category: 'berry', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Супесчаная слабокислая' },
  { id: 'sp4', name: 'Роза', category: 'flower', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Суглинистая дренированная' },
  { id: 'sp5', name: 'Огурец', category: 'vegetable', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Лёгкая органическая' },
  { id: 'sp6', name: 'Смородина', category: 'bush', water_needs: 'medium', light_needs: 'partial', soil_type: 'Суглинистая' },
  { id: 'sp7', name: 'Морковь', category: 'vegetable', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Рыхлая песчаная' },
  { id: 'sp8', name: 'Мята', category: 'herb', water_needs: 'medium', light_needs: 'partial', soil_type: 'Влажная плодородная' },
  { id: 'sp9', name: 'Базилик', category: 'herb', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Плодородная' },
  { id: 'sp10', name: 'Перец', category: 'vegetable', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Плодородная' },
];

export const SPECIES_EMOJI: Record<string, string> = {
  tree: '🌳', bush: '🌿', vegetable: '🥬', berry: '🍓', flower: '🌸', herb: '🌿', lawn: '🌱',
};

export const SPECIES_LABEL: Record<string, string> = {
  tree: 'Дерево', bush: 'Куст', vegetable: 'Овощ', berry: 'Ягода', flower: 'Цветок', herb: 'Трава', lawn: 'Газон',
};

// ============ Plant ============
export const PLANTS: Plant[] = [
  { id: 'pl1', garden_id: 'g1', species_id: 'sp1', variety: 'Антоновка', planting_date: '2020-04-15', position_x: 150, position_y: 120, qr_code: 'garden://plant/pl1' },
  { id: 'pl2', garden_id: 'g1', species_id: 'sp2', variety: 'Бычье сердце', planting_date: '2024-05-20', position_x: 350, position_y: 200, qr_code: 'garden://plant/pl2' },
  { id: 'pl3', garden_id: 'g1', species_id: 'sp3', variety: 'Виктория', planting_date: '2023-08-10', position_x: 500, position_y: 350, qr_code: 'garden://plant/pl3' },
  { id: 'pl4', garden_id: 'g1', species_id: 'sp4', variety: 'Чайно-гибридная', planting_date: '2022-05-01', position_x: 650, position_y: 150, qr_code: 'garden://plant/pl4' },
  { id: 'pl5', garden_id: 'g1', species_id: 'sp5', variety: 'Герман F1', planting_date: '2024-06-01', position_x: 380, position_y: 400, qr_code: 'garden://plant/pl5' },
  { id: 'pl6', garden_id: 'g1', species_id: 'sp6', variety: 'Чёрная', planting_date: '2021-09-15', position_x: 200, position_y: 450, qr_code: 'garden://plant/pl6' },
  { id: 'pl7', garden_id: 'g1', species_id: 'sp7', variety: 'Нантская', planting_date: '2024-04-25', position_x: 550, position_y: 480, qr_code: 'garden://plant/pl7' },
  { id: 'pl8', garden_id: 'g1', species_id: 'sp8', variety: 'Перечная', planting_date: '2024-03-10', position_x: 700, position_y: 400, qr_code: 'garden://plant/pl8' },
  { id: 'pl9', garden_id: 'g2', species_id: 'sp9', variety: 'Геновезе', planting_date: '2024-05-15', position_x: 100, position_y: 100, qr_code: 'garden://plant/pl9' },
  { id: 'pl10', garden_id: 'g2', species_id: 'sp10', variety: 'Огонёк', planting_date: '2024-04-20', position_x: 250, position_y: 150, qr_code: 'garden://plant/pl10' },
];

// ============ CareEvent ============
export const CARE_EVENTS: CareEvent[] = [
  { id: 'ce1', plant_id: 'pl2', type: 'water', scheduled_at: '2024-12-20T08:00:00', done_at: null },
  { id: 'ce2', plant_id: 'pl1', type: 'fertilize', scheduled_at: '2024-12-21T10:00:00', done_at: null },
  { id: 'ce3', plant_id: 'pl3', type: 'water', scheduled_at: '2024-12-20T07:00:00', done_at: '2024-12-20T07:30:00' },
  { id: 'ce4', plant_id: 'pl4', type: 'prune', scheduled_at: '2024-12-22T09:00:00', done_at: null },
  { id: 'ce5', plant_id: 'pl5', type: 'water', scheduled_at: '2024-12-20T18:00:00', done_at: null },
  { id: 'ce6', plant_id: 'pl6', type: 'prune', scheduled_at: '2024-12-23T11:00:00', done_at: null },
  { id: 'ce7', plant_id: 'pl2', type: 'fertilize', scheduled_at: '2024-12-24T10:00:00', done_at: null },
  { id: 'ce8', plant_id: 'pl7', type: 'prune', scheduled_at: '2024-12-21T16:00:00', done_at: null },
];

export const CARE_TYPE_LABEL: Record<string, string> = {
  water: 'Полив', fertilize: 'Подкормка', prune: 'Обрезка',
};
export const CARE_TYPE_ICON: Record<string, string> = {
  water: '💧', fertilize: '🧪', prune: '✂️',
};

// ============ DiseaseRecord ============
export const DISEASE_RECORDS: DiseaseRecord[] = [
  { id: 'dr1', plant_id: 'pl2', photo_url: '/photos/tomato1.jpg', diagnosis: 'Фитофтороз (Phytophthora infestans)', treatment: 'Фитоспорин 5г/10л + медный купорос 100г/10л. Удалить поражённые листья. Улучшить вентиляцию.', date: '2024-12-18' },
  { id: 'dr2', plant_id: 'pl4', photo_url: '/photos/rose1.jpg', diagnosis: 'Чёрная пятнистость (Marssonina rosae)', treatment: 'Фунгицид Скор. 3 обработки с интервалом 10 дней. Избегать полива по листьям.', date: '2024-12-15' },
];

// ============ Message ============
export const CHAT_ROOMS: ChatRoom[] = [
  { id: 'r1', name: 'Томаты', icon: '🍅', description: 'Всё о выращивании томатов', members: 234 },
  { id: 'r2', name: 'Розы', icon: '🌹', description: 'Уход за розами', members: 189 },
  { id: 'r3', name: 'Борьба с вредителями', icon: '🐛', description: 'Защита растений', members: 456 },
  { id: 'r4', name: 'Куплю/Продам', icon: '💰', description: 'Обмен и продажа', members: 678 },
  { id: 'r5', name: 'Теплицы', icon: '🏠', description: 'Строительство и уход', members: 145 },
  { id: 'r6', name: 'Комнатные растения', icon: '🪴', description: 'Домашний сад', members: 312 },
];

export const MESSAGES: Message[] = [
  { id: 'm1', sender_id: 'u2', receiver_id: null, chat_id: 'r1', text: 'Кто-нибудь сажал томат Чёрный принц? Как вкус?', created_at: '2024-12-19T10:00:00' },
  { id: 'm2', sender_id: 'u3', receiver_id: null, chat_id: 'r1', text: 'Отличный сорт! Сладкий, мясистый. Рекомендую для салатов.', created_at: '2024-12-19T10:15:00' },
  { id: 'm3', sender_id: 'u4', receiver_id: null, chat_id: 'r1', text: 'Какой сорт лучше для теплицы в Подмосковье?', created_at: '2024-12-19T10:30:00' },
  { id: 'm4', sender_id: 'u5', receiver_id: null, chat_id: 'r1', text: 'Для теплицы берите Розовый мёд и Де Барао. Проверено годами!', created_at: '2024-12-19T11:00:00' },
  { id: 'm5', sender_id: 'u2', receiver_id: null, chat_id: 'r1', text: 'Спасибо! А как часто поливать в теплице?', created_at: '2024-12-19T11:30:00' },
  { id: 'm6', sender_id: 'u3', receiver_id: null, chat_id: 'r1', text: 'Раз в 2-3 дня, смотря какая жара. Главное — под корень и тёплой водой.', created_at: '2024-12-19T12:00:00' },
  // Личные сообщения
  { id: 'm7', sender_id: 'u2', receiver_id: 'u1', chat_id: null, text: 'Привет! Можешь поделиться усами клубники?', created_at: '2024-12-19T14:00:00' },
  { id: 'm8', sender_id: 'u1', receiver_id: 'u2', chat_id: null, text: 'Привет! Да, конечно. Приезжай в выходные 🍓', created_at: '2024-12-19T14:30:00' },
];

// ============ Harvest ============
export const HARVESTS: Harvest[] = [
  { id: 'hv1', plant_id: 'pl3', date: '2024-06-15', weight_kg: 2.5, note: 'Первый сбор' },
  { id: 'hv2', plant_id: 'pl3', date: '2024-06-22', weight_kg: 3.1, note: 'Пик урожая' },
  { id: 'hv3', plant_id: 'pl3', date: '2024-06-29', weight_kg: 1.8, note: '' },
  { id: 'hv4', plant_id: 'pl2', date: '2024-07-10', weight_kg: 4.2, note: 'Бычье сердце' },
  { id: 'hv5', plant_id: 'pl2', date: '2024-07-20', weight_kg: 5.8, note: 'Отличный размер!' },
  { id: 'hv6', plant_id: 'pl2', date: '2024-07-30', weight_kg: 3.5, note: '' },
  { id: 'hv7', plant_id: 'pl6', date: '2024-07-05', weight_kg: 1.2, note: '' },
  { id: 'hv8', plant_id: 'pl6', date: '2024-07-12', weight_kg: 2.0, note: 'Основной сбор' },
  { id: 'hv9', plant_id: 'pl5', date: '2024-07-08', weight_kg: 3.0, note: '' },
  { id: 'hv10', plant_id: 'pl5', date: '2024-07-15', weight_kg: 4.5, note: 'Рекорд!' },
  { id: 'hv11', plant_id: 'pl5', date: '2024-07-22', weight_kg: 2.8, note: '' },
];

// ============ Weather ============
export const WEATHER: WeatherData = {
  temp: 18, feelsLike: 16, description: 'Переменная облачность', icon: '⛅', humidity: 65, wind: 4,
  forecast: [
    { day: 'Пн', tempHigh: 20, tempLow: 12, icon: '☀️', description: 'Ясно', precipitation: 0 },
    { day: 'Вт', tempHigh: 22, tempLow: 14, icon: '🌤️', description: 'Малооблачно', precipitation: 0 },
    { day: 'Ср', tempHigh: 19, tempLow: 11, icon: '🌧️', description: 'Дождь', precipitation: 80 },
    { day: 'Чт', tempHigh: 16, tempLow: 9, icon: '🌧️', description: 'Дождь', precipitation: 60 },
    { day: 'Пт', tempHigh: 18, tempLow: 10, icon: '⛅', description: 'Облачно', precipitation: 20 },
    { day: 'Сб', tempHigh: 21, tempLow: 13, icon: '☀️', description: 'Ясно', precipitation: 0 },
    { day: 'Вс', tempHigh: 23, tempLow: 15, icon: '☀️', description: 'Ясно', precipitation: 0 },
  ],
};

// ============ Lunar Calendar ============
export const LUNAR_CALENDAR: LunarDay[] = [
  { date: '2024-12-20', phase: 'waxing', phaseName: 'Растущая Луна', moonSign: '♉ Телец', recommendation: 'Благоприятно для посадки корнеплодов и луковичных', goodFor: ['Посадка корнеплодов', 'Подкормка', 'Прививка'], badFor: ['Обрезка', 'Борьба с вредителями'], icon: '🌒' },
  { date: '2024-12-21', phase: 'waxing', phaseName: 'Растущая Луна', moonSign: '♊ Близнецы', recommendation: 'Нейтральный день. Хорош для рыхления и прополки', goodFor: ['Рыхление', 'Прополка', 'Сбор зелени'], badFor: ['Посадка', 'Полив'], icon: '🌒' },
  { date: '2024-12-22', phase: 'full', phaseName: 'Полнолуние', moonSign: '♋ Рак', recommendation: 'Не сажать! Хорош для сбора урожая', goodFor: ['Сбор урожая', 'Борьба с вредителями'], badFor: ['Посадка', 'Прививка'], icon: '🌕' },
  { date: '2024-12-23', phase: 'waning', phaseName: 'Убывающая Луна', moonSign: '♌ Лев', recommendation: 'Благоприятно для обрезки и борьбы с вредителями', goodFor: ['Обрезка', 'Борьба с вредителями'], badFor: ['Полив', 'Подкормка'], icon: '🌖' },
  { date: '2024-12-24', phase: 'waning', phaseName: 'Убывающая Луна', moonSign: '♍ Дева', recommendation: 'Хороший день для посадки корнеплодов', goodFor: ['Посадка корнеплодов', 'Прополка'], badFor: ['Подкормка'], icon: '🌖' },
  { date: '2024-12-25', phase: 'waning', phaseName: 'Убывающая Луна', moonSign: '♎ Весы', recommendation: 'Нейтральный день', goodFor: ['Рыхление', 'Мульчирование'], badFor: [], icon: '🌗' },
  { date: '2024-12-26', phase: 'new', phaseName: 'Новолуние', moonSign: '♏ Скорпион', recommendation: 'Не тревожить растения! Планирование', goodFor: ['Планирование', 'Закупка семян'], badFor: ['Любые работы с растениями'], icon: '🌑' },
];

// ============ Market ============
export const MARKET_LISTINGS: MarketListing[] = [
  { id: 'ml1', user_id: 'u2', type: 'seedlings', title: 'Рассада томатов', description: 'Бычье сердце, Розовый мёд.', quantity: '20 шт', region: 'Москва', exchange: false, price: 50, created_at: '2024-12-19' },
  { id: 'ml2', user_id: 'u3', type: 'seeds', title: 'Семена огурцов', description: 'Герман F1, самоопыляемые.', quantity: '50 семян', region: 'Подольск', exchange: true, created_at: '2024-12-18' },
  { id: 'ml3', user_id: 'u4', type: 'cuttings', title: 'Черенки роз', description: 'Чайно-гибридные, укоренённые.', quantity: '5 черенков', region: 'Химки', exchange: true, created_at: '2024-12-17' },
  { id: 'ml4', user_id: 'u5', type: 'harvest', title: 'Мёд с пасеки', description: 'Липовый мёд, урожай 2024.', quantity: '3 кг', region: 'Серпухов', exchange: false, price: 800, created_at: '2024-12-16' },
  { id: 'ml5', user_id: 'u2', type: 'seedlings', title: 'Клубника виктория', description: 'Усы клубники, хорошо укоренённые.', quantity: '30 шт', region: 'Ногинск', exchange: true, created_at: '2024-12-15' },
];

// ============ Diary ============
export const DIARY_ENTRIES: DiaryEntry[] = [
  { id: 'di1', date: '2024-12-19', text: 'Посетила дачу. Томаты в теплице начали краснеть!', mood: 'great', weather: '☀️ +22°C', photos: 3, tags: ['томаты', 'урожай'] },
  { id: 'di2', date: '2024-12-18', text: 'Обрезала розы, удалила отцветшие бутоны.', mood: 'good', weather: '⛅ +18°C', photos: 1, tags: ['розы', 'обрезка'] },
  { id: 'di3', date: '2024-12-17', text: 'Посадила озимый чеснок. Подготовила грядки.', mood: 'good', weather: '🌧️ +12°C', photos: 0, tags: ['чеснок'] },
  { id: 'di4', date: '2024-12-16', text: 'Обнаружила тлю на клубнике. Обработала мыльным раствором.', mood: 'ok', weather: '⛅ +16°C', photos: 2, tags: ['вредители', 'клубника'] },
];

// ============ Smart Devices ============
export const SMART_DEVICES: SmartDevice[] = [
  { id: 'sd1', name: 'Xiaomi Flower Care', type: 'xiaomi', status: 'online', zone: 'Теплица', lastActivity: '5 мин назад', schedule: 'Каждые 2 часа' },
  { id: 'sd2', name: 'Gardena Smart System', type: 'gardena', status: 'online', zone: 'Газон', lastActivity: '1 час назад', schedule: 'Ежедневно в 7:00' },
  { id: 'sd3', name: 'RainMachine HD-12', type: 'rainmachine', status: 'offline', zone: 'Огород', lastActivity: '2 дня назад', schedule: 'По расписанию' },
];

// ============ AI Diagnoses ============
export const AI_DIAGNOSES = [
  { name: 'Мучнистая роса', confidence: 87, severity: 'medium' as const, description: 'Грибковое заболевание, проявляется белым налётом.', treatment: ['Коллоидная сера (80г/10л)', 'Топаз', 'Молоко + вода 1:10'] },
  { name: 'Фитофтороз', confidence: 92, severity: 'high' as const, description: 'Опасное грибковое заболевание паслёновых.', treatment: ['Удалить поражённые части', 'Фитоспорин', 'Медный купорос 1%'] },
  { name: 'Здоровое растение', confidence: 95, severity: 'low' as const, description: 'Признаков заболеваний не обнаружено.', treatment: ['Продолжайте обычный уход', 'Соблюдайте режим полива'] },
];


+++ src/data.ts (修改后)
import {
  User, Garden, Building, Species, Plant, CareEvent, DiseaseRecord, Message, Harvest,
  ChatRoom, WeatherData, LunarDay, Badge, MarketListing, DiaryEntry, SmartDevice
} from './types';

// ============ User ============
export const CURRENT_USER: User = {
  id: 'u1',
  email: 'anna@garden.ru',
  password_hash: '$2b$12$KIX4P3...hashed',
  name: 'Анна Садовница',
  phone: '+7 (916) 555-12-34',
  region: 'Московская область',
  address: 'Московская обл., Истринский р-н, д. Павловское, ул. Садовая, 15',
  climate_zone: '4b',
  avatar: '👩‍🌾',
  created_at: '2023-03-15T10:00:00',
};

export const OTHER_USERS: User[] = [
  { id: 'u2', email: 'maria@mail.ru', password_hash: '***', name: 'Мария К.', phone: '+7 (926) 111-22-33', region: 'Москва', address: 'г. Москва, ул. Ленина, 10', climate_zone: '4b', avatar: '👩', created_at: '2023-05-10' },
  { id: 'u3', email: 'ivan@mail.ru', password_hash: '***', name: 'Иван П.', phone: '+7 (903) 222-33-44', region: 'Подольск', address: 'г. Подольск, ул. Садовая, 5', climate_zone: '4b', avatar: '👨', created_at: '2023-06-22' },
  { id: 'u4', email: 'elena@mail.ru', password_hash: '***', name: 'Елена С.', phone: '+7 (915) 333-44-55', region: 'Химки', address: 'г. Химки, ул. Лесная, 20', climate_zone: '4b', avatar: '👩‍🦰', created_at: '2024-01-15' },
  { id: 'u5', email: 'petr@mail.ru', password_hash: '***', name: 'Пётр В.', phone: '+7 (925) 444-55-66', region: 'Серпухов', address: 'г. Серпухов, ул. Полевая, 7', climate_zone: '4a', avatar: '🧑', created_at: '2024-02-20' },
];

// Автоопределение климатической зоны по адресу (упрощённая логика)
export function detectClimateZone(address: string): string {
  const addr = address.toLowerCase();
  if (addr.includes('крым') || addr.includes('соч') || addr.includes('краснодар')) return '9a';
  if (addr.includes('астрах') || addr.includes('волгоград') || addr.includes('ростов')) return '7b';
  if (addr.includes('воронеж') || addr.includes('саратов') || addr.includes('самар')) return '6a';
  if (addr.includes('тул') || addr.includes('орёл') || addr.includes('курск')) return '5a';
  if (addr.includes('твер') || addr.includes('ярослав') || addr.includes('владимир')) return '4a';
  if (addr.includes('москв') || addr.includes('подмоскв') || addr.includes('тула')) return '4b';
  if (addr.includes('санкт') || addr.includes('ленинград') || addr.includes('псков')) return '4a';
  if (addr.includes('арханг') || addr.includes('вологод') || addr.includes('киров')) return '3b';
  if (addr.includes('мурманск') || addr.includes('сыктыв') || addr.includes('воркут')) return '2a';
  if (addr.includes('новосиб') || addr.includes('омск') || addr.includes('томск')) return '3a';
  if (addr.includes('екатеринб') || addr.includes('челяб') || addr.includes('пермь')) return '3b';
  if (addr.includes('иркутск') || addr.includes('красноярск')) return '2b';
  if (addr.includes('хабаровск') || addr.includes('владивосток')) return '5b';
  return '4b'; // по умолчанию — Подмосковье
}

export function getRegionFromAddress(address: string): string {
  const addr = address.toLowerCase();
  if (addr.includes('москв')) return 'Москва и МО';
  if (addr.includes('санкт') || addr.includes('петерб')) return 'Санкт-Петербург и ЛО';
  if (addr.includes('крым')) return 'Крым';
  if (addr.includes('краснодар') || addr.includes('соч')) return 'Краснодарский край';
  if (addr.includes('новосиб')) return 'Новосибирская область';
  if (addr.includes('екатеринб')) return 'Свердловская область';
  if (addr.includes('казан')) return 'Республика Татарстан';
  return 'Россия';
}

export const USER_BADGES: Badge[] = [
  { id: 'b1', name: 'Первый урожай', icon: '🌱', description: 'Собрать первый урожай', earned: true, earnedAt: '2023-07-15' },
  { id: 'b2', name: '100 растений', icon: '🌳', description: 'Вырастить 100 растений', earned: true, earnedAt: '2024-06-01' },
  { id: 'b3', name: 'Мастер компоста', icon: '🧪', description: 'Подготовить 10 партий компоста', earned: true, earnedAt: '2024-03-20' },
  { id: 'b4', name: 'Знаток', icon: '📚', description: '100 ответов в сообществе', earned: false },
  { id: 'b5', name: 'Сезон без потерь', icon: '🏆', description: 'Сезон без болезней', earned: false },
  { id: 'b6', name: 'Наставник', icon: '👨‍🏫', description: 'Помочь 50 начинающим', earned: false },
];

// ============ Garden ============
export const GARDENS: Garden[] = [
  {
    id: 'g1', user_id: 'u1', name: 'Дача в Подмосквье',
    area: 1000, width_m: 40, height_m: 25,
    gps_coords: { lat: 55.7558, lng: 37.6173 },
    plan_image_url: '/plans/dacha.jpg',
  },
  {
    id: 'g2', user_id: 'u1', name: 'Балкон',
    area: 4, width_m: 3, height_m: 1.5,
    gps_coords: { lat: 55.7558, lng: 37.6173 },
    plan_image_url: '/plans/balcon.jpg',
  },
];

// ============ Building ============
export const BUILDINGS: Building[] = [
  { id: 'b1', garden_id: 'g1', name: 'Дом', type: 'house', x: 80, y: 280, width: 120, height: 90, color: '#dc2626', icon: '🏠' },
  { id: 'b2', garden_id: 'g1', name: 'Теплица', type: 'greenhouse', x: 300, y: 160, width: 150, height: 100, color: '#16a34a', icon: '🏡' },
  { id: 'b3', garden_id: 'g1', name: 'Сарай', type: 'shed', x: 650, y: 480, width: 80, height: 60, color: '#92400e', icon: '🏚️' },
  { id: 'b4', garden_id: 'g1', name: 'Баня', type: 'bath', x: 220, y: 500, width: 70, height: 55, color: '#7c3aed', icon: '🛁' },
  { id: 'b5', garden_id: 'g1', name: 'Колодец', type: 'well', x: 420, y: 520, width: 40, height: 40, color: '#0891b2', icon: '🪣' },
  { id: 'b6', garden_id: 'g2', name: 'Ящик', type: 'custom', x: 50, y: 50, width: 100, height: 80, color: '#ca8a04', icon: '🪴' },
];

export const BUILDING_TYPES: Record<Building['type'], { label_ru: string; label_en: string; icon: string; color: string }> = {
  house: { label_ru: 'Дом', label_en: 'House', icon: '🏠', color: '#dc2626' },
  greenhouse: { label_ru: 'Теплица', label_en: 'Greenhouse', icon: '🏡', color: '#16a34a' },
  shed: { label_ru: 'Сарай', label_en: 'Shed', icon: '🏚️', color: '#92400e' },
  bath: { label_ru: 'Баня', label_en: 'Bathhouse', icon: '🛁', color: '#7c3aed' },
  garage: { label_ru: 'Гараж', label_en: 'Garage', icon: '🚗', color: '#475569' },
  well: { label_ru: 'Колодец', label_en: 'Well', icon: '🪣', color: '#0891b2' },
  custom: { label_ru: 'Другое', label_en: 'Custom', icon: '📦', color: '#ca8a04' },
};

// ============ Species (справочник видов) ============
export const SPECIES: Species[] = [
  { id: 'sp1', name: 'Яблоня', category: 'tree', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Суглинистая' },
  { id: 'sp2', name: 'Томат', category: 'vegetable', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Плодородная суглинок' },
  { id: 'sp3', name: 'Клубника', category: 'berry', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Супесчаная слабокислая' },
  { id: 'sp4', name: 'Роза', category: 'flower', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Суглинистая дренированная' },
  { id: 'sp5', name: 'Огурец', category: 'vegetable', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Лёгкая органическая' },
  { id: 'sp6', name: 'Смородина', category: 'bush', water_needs: 'medium', light_needs: 'partial', soil_type: 'Суглинистая' },
  { id: 'sp7', name: 'Морковь', category: 'vegetable', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Рыхлая песчаная' },
  { id: 'sp8', name: 'Мята', category: 'herb', water_needs: 'medium', light_needs: 'partial', soil_type: 'Влажная плодородная' },
  { id: 'sp9', name: 'Базилик', category: 'herb', water_needs: 'medium', light_needs: 'full_sun', soil_type: 'Плодородная' },
  { id: 'sp10', name: 'Перец', category: 'vegetable', water_needs: 'high', light_needs: 'full_sun', soil_type: 'Плодородная' },
];

export const SPECIES_EMOJI: Record<string, string> = {
  tree: '🌳', bush: '🌿', vegetable: '🥬', berry: '🍓', flower: '🌸', herb: '🌿', lawn: '🌱',
};

export const SPECIES_LABEL: Record<string, string> = {
  tree: 'Дерево', bush: 'Куст', vegetable: 'Овощ', berry: 'Ягода', flower: 'Цветок', herb: 'Трава', lawn: 'Газон',
};

// ============ Plant ============
export const PLANTS: Plant[] = [
  { id: 'pl1', garden_id: 'g1', species_id: 'sp1', variety: 'Антоновка', planting_date: '2020-04-15', position_x: 150, position_y: 120, qr_code: 'garden://plant/pl1' },
  { id: 'pl2', garden_id: 'g1', species_id: 'sp2', variety: 'Бычье сердце', planting_date: '2024-05-20', position_x: 350, position_y: 200, qr_code: 'garden://plant/pl2' },
  { id: 'pl3', garden_id: 'g1', species_id: 'sp3', variety: 'Виктория', planting_date: '2023-08-10', position_x: 500, position_y: 350, qr_code: 'garden://plant/pl3' },
  { id: 'pl4', garden_id: 'g1', species_id: 'sp4', variety: 'Чайно-гибридная', planting_date: '2022-05-01', position_x: 650, position_y: 150, qr_code: 'garden://plant/pl4' },
  { id: 'pl5', garden_id: 'g1', species_id: 'sp5', variety: 'Герман F1', planting_date: '2024-06-01', position_x: 380, position_y: 400, qr_code: 'garden://plant/pl5' },
  { id: 'pl6', garden_id: 'g1', species_id: 'sp6', variety: 'Чёрная', planting_date: '2021-09-15', position_x: 200, position_y: 450, qr_code: 'garden://plant/pl6' },
  { id: 'pl7', garden_id: 'g1', species_id: 'sp7', variety: 'Нантская', planting_date: '2024-04-25', position_x: 550, position_y: 480, qr_code: 'garden://plant/pl7' },
  { id: 'pl8', garden_id: 'g1', species_id: 'sp8', variety: 'Перечная', planting_date: '2024-03-10', position_x: 700, position_y: 400, qr_code: 'garden://plant/pl8' },
  { id: 'pl9', garden_id: 'g2', species_id: 'sp9', variety: 'Геновезе', planting_date: '2024-05-15', position_x: 100, position_y: 100, qr_code: 'garden://plant/pl9' },
  { id: 'pl10', garden_id: 'g2', species_id: 'sp10', variety: 'Огонёк', planting_date: '2024-04-20', position_x: 250, position_y: 150, qr_code: 'garden://plant/pl10' },
];

// ============ CareEvent ============
export const CARE_EVENTS: CareEvent[] = [
  { id: 'ce1', plant_id: 'pl2', type: 'water', scheduled_at: '2024-12-20T08:00:00', done_at: null },
  { id: 'ce2', plant_id: 'pl1', type: 'fertilize', scheduled_at: '2024-12-21T10:00:00', done_at: null },
  { id: 'ce3', plant_id: 'pl3', type: 'water', scheduled_at: '2024-12-20T07:00:00', done_at: '2024-12-20T07:30:00' },
  { id: 'ce4', plant_id: 'pl4', type: 'prune', scheduled_at: '2024-12-22T09:00:00', done_at: null },
  { id: 'ce5', plant_id: 'pl5', type: 'water', scheduled_at: '2024-12-20T18:00:00', done_at: null },
  { id: 'ce6', plant_id: 'pl6', type: 'prune', scheduled_at: '2024-12-23T11:00:00', done_at: null },
  { id: 'ce7', plant_id: 'pl2', type: 'fertilize', scheduled_at: '2024-12-24T10:00:00', done_at: null },
  { id: 'ce8', plant_id: 'pl7', type: 'prune', scheduled_at: '2024-12-21T16:00:00', done_at: null },
];

export const CARE_TYPE_LABEL: Record<string, string> = {
  water: 'Полив', fertilize: 'Подкормка', prune: 'Обрезка',
};
export const CARE_TYPE_ICON: Record<string, string> = {
  water: '💧', fertilize: '🧪', prune: '✂️',
};

// ============ DiseaseRecord ============
export const DISEASE_RECORDS: DiseaseRecord[] = [
  { id: 'dr1', plant_id: 'pl2', photo_url: '/photos/tomato1.jpg', diagnosis: 'Фитофтороз (Phytophthora infestans)', treatment: 'Фитоспорин 5г/10л + медный купорос 100г/10л. Удалить поражённые листья. Улучшить вентиляцию.', date: '2024-12-18' },
  { id: 'dr2', plant_id: 'pl4', photo_url: '/photos/rose1.jpg', diagnosis: 'Чёрная пятнистость (Marssonina rosae)', treatment: 'Фунгицид Скор. 3 обработки с интервалом 10 дней. Избегать полива по листьям.', date: '2024-12-15' },
];

// ============ Message ============
export const CHAT_ROOMS: ChatRoom[] = [
  { id: 'r1', name: 'Томаты', icon: '🍅', description: 'Всё о выращивании томатов', members: 234 },
  { id: 'r2', name: 'Розы', icon: '🌹', description: 'Уход за розами', members: 189 },
  { id: 'r3', name: 'Борьба с вредителями', icon: '🐛', description: 'Защита растений', members: 456 },
  { id: 'r4', name: 'Куплю/Продам', icon: '💰', description: 'Обмен и продажа', members: 678 },
  { id: 'r5', name: 'Теплицы', icon: '🏠', description: 'Строительство и уход', members: 145 },
  { id: 'r6', name: 'Комнатные растения', icon: '🪴', description: 'Домашний сад', members: 312 },
];

export const MESSAGES: Message[] = [
  { id: 'm1', sender_id: 'u2', receiver_id: null, chat_id: 'r1', text: 'Кто-нибудь сажал томат Чёрный принц? Как вкус?', created_at: '2024-12-19T10:00:00' },
  { id: 'm2', sender_id: 'u3', receiver_id: null, chat_id: 'r1', text: 'Отличный сорт! Сладкий, мясистый. Рекомендую для салатов.', created_at: '2024-12-19T10:15:00' },
  { id: 'm3', sender_id: 'u4', receiver_id: null, chat_id: 'r1', text: 'Какой сорт лучше для теплицы в Подмосковье?', created_at: '2024-12-19T10:30:00' },
  { id: 'm4', sender_id: 'u5', receiver_id: null, chat_id: 'r1', text: 'Для теплицы берите Розовый мёд и Де Барао. Проверено годами!', created_at: '2024-12-19T11:00:00' },
  { id: 'm5', sender_id: 'u2', receiver_id: null, chat_id: 'r1', text: 'Спасибо! А как часто поливать в теплице?', created_at: '2024-12-19T11:30:00' },
  { id: 'm6', sender_id: 'u3', receiver_id: null, chat_id: 'r1', text: 'Раз в 2-3 дня, смотря какая жара. Главное — под корень и тёплой водой.', created_at: '2024-12-19T12:00:00' },
  // Личные сообщения
  { id: 'm7', sender_id: 'u2', receiver_id: 'u1', chat_id: null, text: 'Привет! Можешь поделиться усами клубники?', created_at: '2024-12-19T14:00:00' },
  { id: 'm8', sender_id: 'u1', receiver_id: 'u2', chat_id: null, text: 'Привет! Да, конечно. Приезжай в выходные 🍓', created_at: '2024-12-19T14:30:00' },
];

// ============ Harvest ============
export const HARVESTS: Harvest[] = [
  { id: 'hv1', plant_id: 'pl3', date: '2024-06-15', weight_kg: 2.5, note: 'Первый сбор' },
  { id: 'hv2', plant_id: 'pl3', date: '2024-06-22', weight_kg: 3.1, note: 'Пик урожая' },
  { id: 'hv3', plant_id: 'pl3', date: '2024-06-29', weight_kg: 1.8, note: '' },
  { id: 'hv4', plant_id: 'pl2', date: '2024-07-10', weight_kg: 4.2, note: 'Бычье сердце' },
  { id: 'hv5', plant_id: 'pl2', date: '2024-07-20', weight_kg: 5.8, note: 'Отличный размер!' },
  { id: 'hv6', plant_id: 'pl2', date: '2024-07-30', weight_kg: 3.5, note: '' },
  { id: 'hv7', plant_id: 'pl6', date: '2024-07-05', weight_kg: 1.2, note: '' },
  { id: 'hv8', plant_id: 'pl6', date: '2024-07-12', weight_kg: 2.0, note: 'Основной сбор' },
  { id: 'hv9', plant_id: 'pl5', date: '2024-07-08', weight_kg: 3.0, note: '' },
  { id: 'hv10', plant_id: 'pl5', date: '2024-07-15', weight_kg: 4.5, note: 'Рекорд!' },
  { id: 'hv11', plant_id: 'pl5', date: '2024-07-22', weight_kg: 2.8, note: '' },
];

// ============ Weather ============
export const WEATHER: WeatherData = {
  temp: 18, feelsLike: 16, description: 'Переменная облачность', icon: '⛅', humidity: 65, wind: 4,
  forecast: [
    { day: 'Пн', tempHigh: 20, tempLow: 12, icon: '☀️', description: 'Ясно', precipitation: 0 },
    { day: 'Вт', tempHigh: 22, tempLow: 14, icon: '🌤️', description: 'Малооблачно', precipitation: 0 },
    { day: 'Ср', tempHigh: 19, tempLow: 11, icon: '🌧️', description: 'Дождь', precipitation: 80 },
    { day: 'Чт', tempHigh: 16, tempLow: 9, icon: '🌧️', description: 'Дождь', precipitation: 60 },
    { day: 'Пт', tempHigh: 18, tempLow: 10, icon: '⛅', description: 'Облачно', precipitation: 20 },
    { day: 'Сб', tempHigh: 21, tempLow: 13, icon: '☀️', description: 'Ясно', precipitation: 0 },
    { day: 'Вс', tempHigh: 23, tempLow: 15, icon: '☀️', description: 'Ясно', precipitation: 0 },
  ],
};

// ============ Lunar Calendar ============
export const LUNAR_CALENDAR: LunarDay[] = [
  { date: '2024-12-20', phase: 'waxing', phaseName: 'Растущая Луна', moonSign: '♉ Телец', recommendation: 'Благоприятно для посадки корнеплодов и луковичных', goodFor: ['Посадка корнеплодов', 'Подкормка', 'Прививка'], badFor: ['Обрезка', 'Борьба с вредителями'], icon: '🌒' },
  { date: '2024-12-21', phase: 'waxing', phaseName: 'Растущая Луна', moonSign: '♊ Близнецы', recommendation: 'Нейтральный день. Хорош для рыхления и прополки', goodFor: ['Рыхление', 'Прополка', 'Сбор зелени'], badFor: ['Посадка', 'Полив'], icon: '🌒' },
  { date: '2024-12-22', phase: 'full', phaseName: 'Полнолуние', moonSign: '♋ Рак', recommendation: 'Не сажать! Хорош для сбора урожая', goodFor: ['Сбор урожая', 'Борьба с вредителями'], badFor: ['Посадка', 'Прививка'], icon: '🌕' },
  { date: '2024-12-23', phase: 'waning', phaseName: 'Убывающая Луна', moonSign: '♌ Лев', recommendation: 'Благоприятно для обрезки и борьбы с вредителями', goodFor: ['Обрезка', 'Борьба с вредителями'], badFor: ['Полив', 'Подкормка'], icon: '🌖' },
  { date: '2024-12-24', phase: 'waning', phaseName: 'Убывающая Луна', moonSign: '♍ Дева', recommendation: 'Хороший день для посадки корнеплодов', goodFor: ['Посадка корнеплодов', 'Прополка'], badFor: ['Подкормка'], icon: '🌖' },
  { date: '2024-12-25', phase: 'waning', phaseName: 'Убывающая Луна', moonSign: '♎ Весы', recommendation: 'Нейтральный день', goodFor: ['Рыхление', 'Мульчирование'], badFor: [], icon: '🌗' },
  { date: '2024-12-26', phase: 'new', phaseName: 'Новолуние', moonSign: '♏ Скорпион', recommendation: 'Не тревожить растения! Планирование', goodFor: ['Планирование', 'Закупка семян'], badFor: ['Любые работы с растениями'], icon: '🌑' },
];

// ============ Market ============
export const MARKET_LISTINGS: MarketListing[] = [
  { id: 'ml1', user_id: 'u2', type: 'seedlings', title: 'Рассада томатов', description: 'Бычье сердце, Розовый мёд.', quantity: '20 шт', region: 'Москва', exchange: false, price: 50, created_at: '2024-12-19' },
  { id: 'ml2', user_id: 'u3', type: 'seeds', title: 'Семена огурцов', description: 'Герман F1, самоопыляемые.', quantity: '50 семян', region: 'Подольск', exchange: true, created_at: '2024-12-18' },
  { id: 'ml3', user_id: 'u4', type: 'cuttings', title: 'Черенки роз', description: 'Чайно-гибридные, укоренённые.', quantity: '5 черенков', region: 'Химки', exchange: true, created_at: '2024-12-17' },
  { id: 'ml4', user_id: 'u5', type: 'harvest', title: 'Мёд с пасеки', description: 'Липовый мёд, урожай 2024.', quantity: '3 кг', region: 'Серпухов', exchange: false, price: 800, created_at: '2024-12-16' },
  { id: 'ml5', user_id: 'u2', type: 'seedlings', title: 'Клубника виктория', description: 'Усы клубники, хорошо укоренённые.', quantity: '30 шт', region: 'Ногинск', exchange: true, created_at: '2024-12-15' },
];

// ============ Diary ============
export const DIARY_ENTRIES: DiaryEntry[] = [
  { id: 'di1', date: '2024-12-19', text: 'Посетила дачу. Томаты в теплице начали краснеть!', mood: 'great', weather: '☀️ +22°C', photos: 3, tags: ['томаты', 'урожай'] },
  { id: 'di2', date: '2024-12-18', text: 'Обрезала розы, удалила отцветшие бутоны.', mood: 'good', weather: '⛅ +18°C', photos: 1, tags: ['розы', 'обрезка'] },
  { id: 'di3', date: '2024-12-17', text: 'Посадила озимый чеснок. Подготовила грядки.', mood: 'good', weather: '🌧️ +12°C', photos: 0, tags: ['чеснок'] },
  { id: 'di4', date: '2024-12-16', text: 'Обнаружила тлю на клубнике. Обработала мыльным раствором.', mood: 'ok', weather: '⛅ +16°C', photos: 2, tags: ['вредители', 'клубника'] },
];

// ============ Smart Devices ============
export const SMART_DEVICES: SmartDevice[] = [
  { id: 'sd1', name: 'Xiaomi Flower Care', type: 'xiaomi', status: 'online', zone: 'Теплица', lastActivity: '5 мин назад', schedule: 'Каждые 2 часа' },
  { id: 'sd2', name: 'Gardena Smart System', type: 'gardena', status: 'online', zone: 'Газон', lastActivity: '1 час назад', schedule: 'Ежедневно в 7:00' },
  { id: 'sd3', name: 'RainMachine HD-12', type: 'rainmachine', status: 'offline', zone: 'Огород', lastActivity: '2 дня назад', schedule: 'По расписанию' },
];

// ============ AI Diagnoses ============
export const AI_DIAGNOSES = [
  { name: 'Мучнистая роса', confidence: 87, severity: 'medium' as const, description: 'Грибковое заболевание, проявляется белым налётом.', treatment: ['Коллоидная сера (80г/10л)', 'Топаз', 'Молоко + вода 1:10'] },
  { name: 'Фитофтороз', confidence: 92, severity: 'high' as const, description: 'Опасное грибковое заболевание паслёновых.', treatment: ['Удалить поражённые части', 'Фитоспорин', 'Медный купорос 1%'] },
  { name: 'Здоровое растение', confidence: 95, severity: 'low' as const, description: 'Признаков заболеваний не обнаружено.', treatment: ['Продолжайте обычный уход', 'Соблюдайте режим полива'] },
];
