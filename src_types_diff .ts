--- src/types.ts (原始)
// Структура БД согласно ТЗ

export interface User {
  id: string;
  email: string;
  password_hash: string; // в реальности — bcrypt hash
  name: string;
  region: string;
  climate_zone: string;
  created_at: string;
}

export interface Building {
  id: string;
  garden_id: string;
  name: string;
  type: 'house' | 'greenhouse' | 'shed' | 'bath' | 'garage' | 'well' | 'custom';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
}

export interface Garden {
  id: string;
  user_id: string;
  name: string;
  area: number; // в м²
  width_m: number; // ширина участка в метрах
  height_m: number; // длина участка в метрах
  gps_coords: { lat: number; lng: number };
  plan_image_url: string;
}

export interface Species {
  id: string;
  name: string;
  category: 'tree' | 'bush' | 'vegetable' | 'berry' | 'flower' | 'herb' | 'lawn';
  water_needs: 'low' | 'medium' | 'high';
  light_needs: 'shade' | 'partial' | 'full_sun';
  soil_type: string;
}

export interface Plant {
  id: string;
  garden_id: string;
  species_id: string;
  variety: string;
  planting_date: string;
  position_x: number;
  position_y: number;
  qr_code: string;
}

export interface CareEvent {
  id: string;
  plant_id: string;
  type: 'water' | 'fertilize' | 'prune';
  scheduled_at: string;
  done_at: string | null;
}

export interface DiseaseRecord {
  id: string;
  plant_id: string;
  photo_url: string;
  diagnosis: string;
  treatment: string;
  date: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string | null;   // для личных сообщений
  chat_id: string | null;       // для групповых чатов
  text: string;
  created_at: string;
}

export interface Harvest {
  id: string;
  plant_id: string;
  date: string;
  weight_kg: number;
  note: string;
}

// Дополнительные сущности для UI
export interface ChatRoom {
  id: string;
  name: string;
  icon: string;
  description: string;
  members: number;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  icon: string;
  description: string;
  precipitation: number;
}

export interface LunarDay {
  date: string;
  phase: 'new' | 'waxing' | 'full' | 'waning';
  phaseName: string;
  moonSign: string;
  recommendation: string;
  goodFor: string[];
  badFor: string[];
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface MarketListing {
  id: string;
  user_id: string;
  type: 'seeds' | 'seedlings' | 'cuttings' | 'harvest' | 'tools';
  title: string;
  description: string;
  quantity: string;
  region: string;
  exchange: boolean;
  price?: number;
  created_at: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  mood: 'great' | 'good' | 'ok' | 'bad';
  weather: string;
  photos: number;
  tags: string[];
}

export interface SmartDevice {
  id: string;
  name: string;
  type: 'xiaomi' | 'gardena' | 'rainmachine' | 'custom';
  status: 'online' | 'offline';
  zone: string;
  lastActivity: string;
  schedule: string;
}

export type Page =
  | 'dashboard' | 'garden' | 'calendar' | 'lunar' | 'ai'
  | 'encyclopedia' | 'community' | 'weather' | 'harvest'
  | 'diary' | 'market' | 'calculator' | 'achievements'
  | 'devices' | 'profile' | 'schema';


+++ src/types.ts (修改后)
// Структура БД согласно ТЗ

export interface User {
  id: string;
  email: string;
  password_hash: string; // в реальности — bcrypt hash
  name: string;
  phone: string;
  region: string;
  address: string; // адрес участка для определения погодной зоны
  climate_zone: string;
  avatar: string;
  created_at: string;
}

export interface Building {
  id: string;
  garden_id: string;
  name: string;
  type: 'house' | 'greenhouse' | 'shed' | 'bath' | 'garage' | 'well' | 'custom';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
}

export interface Garden {
  id: string;
  user_id: string;
  name: string;
  area: number; // в м²
  width_m: number; // ширина участка в метрах
  height_m: number; // длина участка в метрах
  gps_coords: { lat: number; lng: number };
  plan_image_url: string;
}

export interface Species {
  id: string;
  name: string;
  category: 'tree' | 'bush' | 'vegetable' | 'berry' | 'flower' | 'herb' | 'lawn';
  water_needs: 'low' | 'medium' | 'high';
  light_needs: 'shade' | 'partial' | 'full_sun';
  soil_type: string;
}

export interface Plant {
  id: string;
  garden_id: string;
  species_id: string;
  variety: string;
  planting_date: string;
  position_x: number;
  position_y: number;
  qr_code: string;
}

export interface CareEvent {
  id: string;
  plant_id: string;
  type: 'water' | 'fertilize' | 'prune';
  scheduled_at: string;
  done_at: string | null;
}

export interface DiseaseRecord {
  id: string;
  plant_id: string;
  photo_url: string;
  diagnosis: string;
  treatment: string;
  date: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string | null;   // для личных сообщений
  chat_id: string | null;       // для групповых чатов
  text: string;
  created_at: string;
}

export interface Harvest {
  id: string;
  plant_id: string;
  date: string;
  weight_kg: number;
  note: string;
}

// Дополнительные сущности для UI
export interface ChatRoom {
  id: string;
  name: string;
  icon: string;
  description: string;
  members: number;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  icon: string;
  description: string;
  precipitation: number;
}

export interface LunarDay {
  date: string;
  phase: 'new' | 'waxing' | 'full' | 'waning';
  phaseName: string;
  moonSign: string;
  recommendation: string;
  goodFor: string[];
  badFor: string[];
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface MarketListing {
  id: string;
  user_id: string;
  type: 'seeds' | 'seedlings' | 'cuttings' | 'harvest' | 'tools';
  title: string;
  description: string;
  quantity: string;
  region: string;
  exchange: boolean;
  price?: number;
  created_at: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  mood: 'great' | 'good' | 'ok' | 'bad';
  weather: string;
  photos: number;
  tags: string[];
}

export interface SmartDevice {
  id: string;
  name: string;
  type: 'xiaomi' | 'gardena' | 'rainmachine' | 'custom';
  status: 'online' | 'offline';
  zone: string;
  lastActivity: string;
  schedule: string;
}

export type Page =
  | 'dashboard' | 'garden' | 'calendar' | 'lunar' | 'ai'
  | 'encyclopedia' | 'community' | 'weather' | 'harvest'
  | 'diary' | 'market' | 'calculator' | 'achievements'
  | 'devices' | 'profile' | 'schema';
