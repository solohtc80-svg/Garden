--- src/App.tsx (原始)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Map, Calendar, Camera, Users, User, Cloud, BarChart3, ShoppingBag,
  Menu, X, Bell, Check, Moon, BookOpen, PenTool, Calculator, Trophy, Wifi,
  Droplets, Wind, Thermometer, Send, Sprout, Database, Table2, Link2,
  Globe, LogOut
} from 'lucide-react';
import { Page, Plant, CareEvent, Message, Garden, Building } from './types';
import {
  CURRENT_USER, OTHER_USERS, USER_BADGES, GARDENS as INITIAL_GARDENS, BUILDINGS as INITIAL_BUILDINGS, SPECIES, PLANTS as INITIAL_PLANTS,
  CARE_EVENTS, DISEASE_RECORDS, MESSAGES, CHAT_ROOMS, HARVESTS, WEATHER,
  LUNAR_CALENDAR, MARKET_LISTINGS, DIARY_ENTRIES, SMART_DEVICES, AI_DIAGNOSES,
  SPECIES_EMOJI, SPECIES_LABEL, CARE_TYPE_ICON
} from './data';
import PlotMap from './components/PlotMap';
import { useLang } from './LanguageContext';
import { Lang } from './i18n';

const USER_AVATAR = '👩‍🌾';
const getUserAvatar = (userId: string) => {
  if (userId === CURRENT_USER.id) return USER_AVATAR;
  const u = OTHER_USERS.find(u => u.id === userId);
  return u ? ['👩', '👨', '👩‍🦰', '🧑'][OTHER_USERS.indexOf(u) % 4] : '👤';
};
const getUserName = (userId: string, lang: Lang) => {
  if (userId === CURRENT_USER.id) return CURRENT_USER.name;
  return OTHER_USERS.find(u => u.id === userId)?.name || (lang === 'ru' ? 'Пользователь' : 'User');
};

function App() {
  const { lang, setLang, t } = useLang();
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('garden_auth') === 'true');
  const [authStep, setAuthStep] = useState<'lang' | 'register' | 'login'>('lang');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gardens, setGardens] = useState<Garden[]>(INITIAL_GARDENS);
  const [buildings, setBuildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [careEvents, setCareEvents] = useState<CareEvent[]>(CARE_EVENTS);
  const [selectedGarden, setSelectedGarden] = useState<Garden>(INITIAL_GARDENS[0]);
  const [selectedRoom, setSelectedRoom] = useState(CHAT_ROOMS[0]);
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [aiResult, setAiResult] = useState<typeof AI_DIAGNOSES[0] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [encSearch, setEncSearch] = useState('');
  const [calcForm, setCalcForm] = useState({ area: 100, soilType: 'sandy', plantType: 'tomato' });
  const [calcResult, setCalcResult] = useState<{ dose: number; unit: string; frequency: string } | null>(null);

  const pendingEvents = careEvents.filter(e => !e.done_at);
  const completedEvents = careEvents.filter(e => e.done_at).length;

  const handleLogin = () => {
    localStorage.setItem('garden_auth', 'true');
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('garden_auth');
    setIsAuth(false);
    setAuthStep('lang');
  };

  const navItems: { page: Page; icon: typeof Home; labelKey: any }[] = [
    { page: 'dashboard', icon: Home, labelKey: 'nav.dashboard' },
    { page: 'garden', icon: Map, labelKey: 'nav.garden' },
    { page: 'calendar', icon: Calendar, labelKey: 'nav.calendar' },
    { page: 'lunar', icon: Moon, labelKey: 'nav.lunar' },
    { page: 'ai', icon: Camera, labelKey: 'nav.ai' },
    { page: 'encyclopedia', icon: BookOpen, labelKey: 'nav.encyclopedia' },
    { page: 'community', icon: Users, labelKey: 'nav.community' },
    { page: 'weather', icon: Cloud, labelKey: 'nav.weather' },
    { page: 'harvest', icon: BarChart3, labelKey: 'nav.harvest' },
    { page: 'diary', icon: PenTool, labelKey: 'nav.diary' },
    { page: 'market', icon: ShoppingBag, labelKey: 'nav.market' },
    { page: 'calculator', icon: Calculator, labelKey: 'nav.calculator' },
    { page: 'achievements', icon: Trophy, labelKey: 'nav.achievements' },
    { page: 'devices', icon: Wifi, labelKey: 'nav.devices' },
    { page: 'schema', icon: Database, labelKey: 'nav.schema' },
    { page: 'profile', icon: User, labelKey: 'nav.profile' },
  ];

  const toggleEvent = (id: string) => {
    setCareEvents(prev => prev.map(e => e.id === id ? { ...e, done_at: e.done_at ? null : new Date().toISOString() } : e));
  };
  const addPlant = (plant: Plant) => setPlants(prev => [...prev, plant]);
  const deletePlant = (id: string) => setPlants(prev => prev.filter(p => p.id !== id));

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: `m${Date.now()}`, sender_id: CURRENT_USER.id,
      receiver_id: null, chat_id: selectedRoom.id,
      text: newMessage, created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  const runAIDiagnosis = () => {
    setAiLoading(true);
    setTimeout(() => { setAiResult(AI_DIAGNOSES[Math.floor(Math.random() * AI_DIAGNOSES.length)]); setAiLoading(false); }, 2000);
  };

  const calculateFertilizer = () => {
    const baseDose = calcForm.plantType === 'tomato' ? 30 : calcForm.plantType === 'cucumber' ? 25 : 40;
    const soilMult = calcForm.soilType === 'sandy' ? 1.3 : calcForm.soilType === 'clay' ? 0.8 : 1.0;
    setCalcResult({ dose: Math.round(baseDose * calcForm.area * soilMult), unit: 'г', frequency: lang === 'ru' ? '1 раз в 2 недели' : 'Once per 2 weeks' });
  };

  const filteredSpecies = SPECIES.filter(s => s.name.toLowerCase().includes(encSearch.toLowerCase()));

  // ====== AUTH SCREEN ======
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl text-5xl mx-auto mb-4">🌱</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Садовод</h1>
            <p className="text-green-600 text-sm mt-1">Garden Assistant</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-green-100">
            {authStep === 'lang' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">{t('auth.chooseLang')}</h2>
                <p className="text-sm text-gray-500 text-center mb-6">{t('auth.subtitle')}</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setLang('ru'); setAuthStep('register'); }}
                    className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                  >
                    <span className="text-4xl">🇷🇺</span>
                    <span className="font-bold text-blue-800">Русский</span>
                  </button>
                  <button
                    onClick={() => { setLang('en'); setAuthStep('register'); }}
                    className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all"
                  >
                    <span className="text-4xl">🇬🇧</span>
                    <span className="font-bold text-red-800">English</span>
                  </button>
                </div>
              </motion.div>
            )}

            {authStep === 'register' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('auth.register')}</h2>
                <div className="space-y-3">
                  <input type="text" placeholder={t('auth.name')} defaultValue={CURRENT_USER.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="email" placeholder={t('auth.email')} defaultValue={CURRENT_USER.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="password" placeholder={t('auth.password')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="text" placeholder={t('auth.region')} defaultValue={CURRENT_USER.region} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="text" placeholder={t('auth.climateZone')} defaultValue={CURRENT_USER.climate_zone} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 shadow-lg">
                    {t('auth.createAccount')}
                  </button>
                  <button onClick={() => setAuthStep('login')} className="w-full py-2 text-sm text-green-700 hover:text-green-800">
                    {t('auth.haveAccount')} {t('auth.login')}
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center mb-3">{t('auth.socialLogin')}</p>
                  <div className="flex gap-2">
                    <button onClick={handleLogin} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Google</button>
                    <button onClick={handleLogin} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">VK</button>
                    <button onClick={handleLogin} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">GitHub</button>
                  </div>
                </div>
                <button onClick={() => setAuthStep('lang')} className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> {t('common.changeLang')}
                </button>
              </motion.div>
            )}

            {authStep === 'login' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('auth.login')}</h2>
                <div className="space-y-3">
                  <input type="email" placeholder={t('auth.email')} defaultValue={CURRENT_USER.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="password" placeholder={t('auth.password')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 shadow-lg">
                    {t('auth.login')}
                  </button>
                  <button onClick={handleLogin} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                    {t('auth.continueAs')}
                  </button>
                  <button onClick={() => setAuthStep('register')} className="w-full py-2 text-sm text-green-700 hover:text-green-800">
                    {t('auth.noAccount')} {t('auth.register')}
                  </button>
                </div>
                <button onClick={() => setAuthStep('lang')} className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> {t('common.changeLang')}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ====== MAIN APP ======
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-16 lg:pb-0">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-center py-2 text-sm font-medium">
        🌙 {lang === 'ru' ? 'Сегодня растущая Луна в Тельце — благоприятный день для посадки корнеплодов!' : 'Today is Waxing Moon in Taurus — favorable day for planting root crops!'}
      </div>

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-green-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg text-xl">🌱</div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  {lang === 'ru' ? 'Садовод' : 'Gardener'}
                </h1>
                <p className="text-xs text-green-600 -mt-1">Garden Assistant</p>
              </div>
            </div>
            <nav className="hidden xl:flex items-center gap-0.5">
              {navItems.slice(0, 9).map(({ page, icon: Icon, labelKey }) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`flex items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${currentPage === page ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'}`}>
                  <Icon className="w-3.5 h-3.5" />{t(labelKey)}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => setAuthStep('lang')} className="p-2 rounded-lg hover:bg-green-100 flex items-center gap-1 text-xs font-medium text-green-700">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'ru' ? 'RU' : 'EN'}</span>
              </button>
              <button className="relative p-2 rounded-lg hover:bg-green-100"><Bell className="w-5 h-5 text-green-700" /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 rounded-lg hover:bg-green-100">
                {mobileMenuOpen ? <X className="w-5 h-5 text-green-700" /> : <Menu className="w-5 h-5 text-green-700" />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="xl:hidden border-t border-green-200/50 bg-white/95 backdrop-blur-xl overflow-hidden">
              <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
                {navItems.map(({ page, icon: Icon, labelKey }) => (
                  <button key={page} onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium ${currentPage === page ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'}`}>
                    <Icon className="w-5 h-5" />{t(labelKey)}
                  </button>
                ))}
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  <LogOut className="w-5 h-5" />{t('nav.logout')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {/* DASHBOARD */}
          {currentPage === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-6 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{USER_AVATAR}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{t('dash.hello')}, {CURRENT_USER.name.split(' ')[0]}!</h2>
                    <p className="text-green-100 text-sm">📍 {CURRENT_USER.region} • {WEATHER.icon} {WEATHER.temp}°C • 🌙 {lang === 'ru' ? LUNAR_CALENDAR[0].phaseName : 'Waxing Moon'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{plants.filter(p => p.garden_id === selectedGarden.id).length}</p><p className="text-xs text-green-100">{t('dash.plants')}</p></div>
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{pendingEvents.length}</p><p className="text-xs text-green-100">{t('dash.careTasks')}</p></div>
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{gardens.length}</p><p className="text-xs text-green-100">{t('dash.gardens')}</p></div>
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{HARVESTS.reduce((s, h) => s + h.weight_kg, 0).toFixed(0)} кг</p><p className="text-xs text-green-100">{t('dash.harvest')}</p></div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-600" /> {t('dash.careEvents')}</h3><button onClick={() => setCurrentPage('calendar')} className="text-sm text-green-600">{t('dash.all')}</button></div>
                  <div className="space-y-2">
                    {pendingEvents.slice(0, 5).map(ev => {
                      const plant = plants.find(p => p.id === ev.plant_id);
                      const sp = SPECIES.find(s => s.id === plant?.species_id);
                      return (
                        <div key={ev.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100" onClick={() => toggleEvent(ev.id)}>
                          <span className="text-lg">{CARE_TYPE_ICON[ev.type]}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800">{lang === 'ru' ? `Полив: ${sp?.name}` : `${sp?.name}: Watering`}</p>
                            <p className="text-xs text-gray-500">{new Date(ev.scheduled_at).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Sprout className="w-5 h-5 text-green-600" /> {t('dash.quickActions')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { page: 'garden' as Page, icon: '🗺️', label: t('nav.garden') },
                      { page: 'ai' as Page, icon: '🔬', label: 'AI' },
                      { page: 'lunar' as Page, icon: '🌙', label: t('nav.lunar') },
                      { page: 'encyclopedia' as Page, icon: '📚', label: t('nav.encyclopedia') },
                      { page: 'weather' as Page, icon: '🌤️', label: t('nav.weather') },
                      { page: 'schema' as Page, icon: '🗄️', label: t('nav.schema') },
                    ].map(({ page, icon, label }) => (
                      <button key={page} onClick={() => setCurrentPage(page)} className="flex items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 text-left">
                        <span className="text-xl">{icon}</span><span className="text-sm font-medium text-gray-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GARDEN */}
          {currentPage === 'garden' && (
            <motion.div key="garden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {gardens.map((g: Garden) => (
                  <button key={g.id} onClick={() => setSelectedGarden(g)} className={`px-4 py-2 rounded-xl text-sm font-medium ${selectedGarden.id === g.id ? 'bg-green-600 text-white shadow-md' : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'}`}>
                    🏡 {g.name} ({g.area} м²)
                  </button>
                ))}
              </div>
              <PlotMap
                garden={selectedGarden}
                plants={plants}
                buildings={buildings}
                species={SPECIES}
                onAddPlant={addPlant}
                onDeletePlant={deletePlant}
                onUpdateGarden={(g) => { setGardens(prev => prev.map(x => x.id === g.id ? g : x)); setSelectedGarden(g); }}
                onAddBuilding={(b) => setBuildings(prev => [...prev, b])}
                onUpdateBuilding={(b) => setBuildings(prev => prev.map(x => x.id === b.id ? b : x))}
                onDeleteBuilding={(id) => setBuildings(prev => prev.filter(x => x.id !== id))}
              />
            </motion.div>
          )}

          {/* CALENDAR */}
          {currentPage === 'calendar' && (
            <motion.div key="calendar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Calendar className="w-7 h-7 text-green-600" /> {t('care.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  {careEvents.map(ev => {
                    const plant = plants.find(p => p.id === ev.plant_id);
                    const sp = SPECIES.find(s => s.id === plant?.species_id);
                    return (
                      <div key={ev.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer ${ev.done_at ? 'bg-green-50 border-green-200' : 'bg-white border-green-100 hover:border-green-300 hover:shadow-md'}`} onClick={() => toggleEvent(ev.id)}>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${ev.done_at ? 'bg-green-500 border-green-500' : 'border-green-300'}`}>
                          {ev.done_at && <Check className="w-5 h-5 text-white" />}
                        </div>
                        <span className="text-2xl">{CARE_TYPE_ICON[ev.type]}</span>
                        <div className="flex-1">
                          <p className={`font-medium ${ev.done_at ? 'line-through text-gray-400' : 'text-gray-800'}`}>{sp?.name} {plant?.variety}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>{t('care.scheduled')}: {new Date(ev.scheduled_at).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                            {ev.done_at && <span>• {t('care.done')}: {new Date(ev.done_at).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white rounded-xl border border-green-100 p-5 shadow-sm h-fit">
                  <h3 className="font-bold text-gray-800 mb-3">{t('care.progress')}</h3>
                  <div className="w-full bg-green-100 rounded-full h-4 mb-2"><div className="bg-green-500 h-4 rounded-full" style={{ width: `${(completedEvents / careEvents.length) * 100}%` }} /></div>
                  <p className="text-sm text-gray-600">{completedEvents} {t('care.completed')} {careEvents.length}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* LUNAR */}
          {currentPage === 'lunar' && (
            <motion.div key="lunar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Moon className="w-7 h-7 text-purple-600" /> {t('lunar.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {LUNAR_CALENDAR.map((day, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`bg-white rounded-2xl border p-5 shadow-sm ${i === 0 ? 'border-purple-300 ring-2 ring-purple-100' : 'border-green-100'}`}>
                    <div className="flex items-center justify-between mb-3"><span className="text-3xl">{day.icon}</span>{i === 0 && <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">{t('lunar.today')}</span>}</div>
                    <p className="font-bold text-gray-800">{new Date(day.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                    <p className="text-sm text-gray-500">{lang === 'ru' ? day.phaseName : (day.phase === 'waxing' ? 'Waxing' : day.phase === 'full' ? 'Full' : day.phase === 'waning' ? 'Waning' : 'New')} • {day.moonSign}</p>
                    <p className="text-xs text-gray-600 mt-2">{day.recommendation}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI */}
          {currentPage === 'ai' && (
            <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Camera className="w-7 h-7 text-green-600" /> {t('ai.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t('ai.upload')}</h3>
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 cursor-pointer bg-green-50/50" onClick={runAIDiagnosis}>
                    <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">{t('ai.clickToAnalyze')}</p>
                  </div>
                  {aiLoading && <div className="mt-4 text-center"><div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full"><div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div><span className="text-sm text-green-700">{t('ai.analyzing')}</span></div></div>}
                  <div className="mt-6"><h4 className="font-medium text-gray-700 mb-3">{t('ai.history')}</h4>
                    {DISEASE_RECORDS.map(d => {
                      const plant = plants.find(p => p.id === d.plant_id);
                      const sp = SPECIES.find(s => s.id === plant?.species_id);
                      return (
                        <div key={d.id} className="p-3 bg-gray-50 rounded-lg mb-2">
                          <p className="text-sm font-medium text-gray-800">{d.diagnosis}</p>
                          <p className="text-xs text-gray-500">{sp?.name} • {new Date(d.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t('ai.result')}</h3>
                  {aiResult ? (
                    <div>
                      <div className={`p-4 rounded-xl mb-4 ${aiResult.severity === 'high' ? 'bg-red-50 border border-red-200' : aiResult.severity === 'medium' ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                        <div className="flex items-center gap-3 mb-2"><span className="text-3xl">{aiResult.severity === 'high' ? '🚨' : aiResult.severity === 'medium' ? '⚠️' : '✅'}</span><div><p className="font-bold">{aiResult.name}</p><p className="text-sm text-gray-600">{t('ai.confidence')}: {aiResult.confidence}%</p></div></div>
                        <p className="text-sm text-gray-700">{aiResult.description}</p>
                      </div>
                      <h4 className="font-medium mb-2">{t('ai.treatment')}</h4>
                      <ul className="space-y-2">{aiResult.treatment.map((tr, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-green-600">•</span>{tr}</li>)}</ul>
                    </div>
                  ) : <div className="text-center py-12"><Camera className="w-16 h-16 text-green-200 mx-auto mb-4" /><p className="text-gray-500">{t('ai.upload')}</p></div>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ENCYCLOPEDIA */}
          {currentPage === 'encyclopedia' && (
            <motion.div key="encyclopedia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><BookOpen className="w-7 h-7 text-green-600" /> {t('enc.title')}</h2>
              <input type="text" placeholder={t('enc.search')} value={encSearch} onChange={(e) => setEncSearch(e.target.value)} className="w-full sm:w-96 px-4 py-3 bg-white border border-green-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSpecies.map(sp => (
                  <div key={sp.id} className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3"><span className="text-3xl">{SPECIES_EMOJI[sp.category]}</span><div><h3 className="font-bold text-gray-800">{sp.name}</h3><p className="text-xs text-gray-500">id: {sp.id} • {SPECIES_LABEL[sp.category]}</p></div></div>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded-lg"><span className="text-gray-500">water_needs:</span> <span className="font-medium">{sp.water_needs}</span></div>
                      <div className="bg-yellow-50 p-2 rounded-lg"><span className="text-gray-500">light_needs:</span> <span className="font-medium">{sp.light_needs}</span></div>
                      <div className="bg-amber-50 p-2 rounded-lg"><span className="text-gray-500">soil_type:</span> <span className="font-medium">{sp.soil_type}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* COMMUNITY */}
          {currentPage === 'community' && (
            <motion.div key="community" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Users className="w-7 h-7 text-green-600" /> {t('comm.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <h3 className="font-bold text-gray-700 mb-3">{t('comm.chats')}</h3>
                  <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
                    {CHAT_ROOMS.map(room => (
                      <button key={room.id} onClick={() => setSelectedRoom(room)} className={`w-full flex items-center gap-3 p-3 text-left border-b border-green-50 last:border-0 ${selectedRoom.id === room.id ? 'bg-green-50' : 'hover:bg-green-50/50'}`}>
                        <span className="text-xl">{room.icon}</span>
                        <div className="flex-1 min-w-0"><p className="font-medium text-gray-800 text-sm">{room.name}</p><p className="text-xs text-gray-500">{room.members} {t('comm.members')}</p></div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl border border-green-100 shadow-sm">
                  <div className="p-3 border-b border-green-100 flex items-center gap-2"><span className="text-lg">{selectedRoom.icon}</span><span className="font-medium">{selectedRoom.name}</span></div>
                  <div className="p-3 h-96 overflow-y-auto space-y-2">
                    {messages.filter(m => m.chat_id === selectedRoom.id).map(msg => (
                      <div key={msg.id} className={`flex gap-2 ${msg.sender_id === CURRENT_USER.id ? 'justify-end' : ''}`}>
                        {msg.sender_id !== CURRENT_USER.id && <span className="text-lg shrink-0">{getUserAvatar(msg.sender_id)}</span>}
                        <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.sender_id === CURRENT_USER.id ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                          {msg.sender_id !== CURRENT_USER.id && <p className="text-xs font-medium mb-0.5 opacity-70">{getUserName(msg.sender_id, lang)}</p>}
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-green-100 flex gap-2">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder={t('comm.placeholder')} className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                    <button onClick={sendMessage} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><Send className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* WEATHER */}
          {currentPage === 'weather' && (
            <motion.div key="weather" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Cloud className="w-7 h-7 text-green-600" /> {t('weather.title')} — {CURRENT_USER.region}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-sm opacity-80">{t('weather.now')}</p>
                  <div className="flex items-center gap-4 my-4"><span className="text-6xl">{WEATHER.icon}</span><span className="text-5xl font-bold">{WEATHER.temp}°</span></div>
                  <p className="text-lg">{WEATHER.description}</p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center bg-white/20 rounded-lg p-2"><Thermometer className="w-4 h-4 mx-auto mb-1" /><p className="text-xs opacity-80">{t('weather.feels')}</p><p className="font-bold">{WEATHER.feelsLike}°</p></div>
                    <div className="text-center bg-white/20 rounded-lg p-2"><Droplets className="w-4 h-4 mx-auto mb-1" /><p className="text-xs opacity-80">{t('weather.humidity')}</p><p className="font-bold">{WEATHER.humidity}%</p></div>
                    <div className="text-center bg-white/20 rounded-lg p-2"><Wind className="w-4 h-4 mx-auto mb-1" /><p className="text-xs opacity-80">{t('weather.wind')}</p><p className="font-bold">{WEATHER.wind} м/с</p></div>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t('weather.weekForecast')}</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {WEATHER.forecast.map((day, i) => (
                      <div key={i} className={`text-center p-3 rounded-xl ${i === 0 ? 'bg-green-50 border border-green-200' : ''}`}>
                        <p className="text-xs font-medium text-gray-500 mb-1">{day.day}</p>
                        <p className="text-2xl mb-1">{day.icon}</p>
                        <p className="text-sm font-bold">{day.tempHigh}°</p>
                        <p className="text-xs text-gray-500">{day.tempLow}°</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* HARVEST */}
          {currentPage === 'harvest' && (
            <motion.div key="harvest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><BarChart3 className="w-7 h-7 text-green-600" /> {t('harvest.title')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">🧺</span><p className="text-xl font-bold">{HARVESTS.reduce((s, h) => s + h.weight_kg, 0).toFixed(1)} кг</p><p className="text-xs text-gray-500">{t('harvest.total')}</p></div>
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">🌱</span><p className="text-xl font-bold">{new Set(HARVESTS.map(h => h.plant_id)).size}</p><p className="text-xs text-gray-500">{t('harvest.plants')}</p></div>
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">📊</span><p className="text-xl font-bold">{HARVESTS.length}</p><p className="text-xs text-gray-500">{t('harvest.picks')}</p></div>
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">🏆</span><p className="text-xl font-bold">{Math.max(...HARVESTS.map(h => h.weight_kg))} кг</p><p className="text-xs text-gray-500">{t('harvest.record')}</p></div>
              </div>
              <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">{t('harvest.records')}</h3>
                <div className="space-y-2">
                  {[...HARVESTS].reverse().map(h => {
                    const plant = plants.find(p => p.id === h.plant_id);
                    const sp = SPECIES.find(s => s.id === plant?.species_id);
                    return (
                      <div key={h.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <span className="text-lg">{sp ? SPECIES_EMOJI[sp.category] : '🧺'}</span>
                        <div className="flex-1"><p className="text-sm font-medium">{sp?.name} {plant?.variety}</p><p className="text-xs text-gray-500">{new Date(h.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p></div>
                        <span className="font-bold text-green-700">{h.weight_kg} кг</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* DIARY */}
          {currentPage === 'diary' && (
            <motion.div key="diary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><PenTool className="w-7 h-7 text-green-600" /> {t('diary.title')}</h2>
              <div className="space-y-4">
                {DIARY_ENTRIES.map(entry => (
                  <div key={entry.id} className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3"><span className="text-2xl">{entry.mood === 'great' ? '😊' : entry.mood === 'good' ? '🙂' : entry.mood === 'ok' ? '😐' : '😟'}</span><div><p className="font-bold">{new Date(entry.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p><p className="text-sm text-gray-500">{entry.weather}</p></div></div>
                    <p className="text-gray-700">{entry.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MARKET */}
          {currentPage === 'market' && (
            <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><ShoppingBag className="w-7 h-7 text-green-600" /> {t('market.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MARKET_LISTINGS.map(l => (
                  <div key={l.id} className="bg-white rounded-xl border border-green-100 p-5 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl">{l.type === 'seeds' ? '🌰' : l.type === 'seedlings' ? '🌱' : l.type === 'cuttings' ? '✂️' : l.type === 'harvest' ? '🍯' : '🔧'}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.exchange ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{l.exchange ? t('market.exchange') : `${l.price}₽`}</span></div>
                    <h3 className="font-bold mb-1">{l.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{l.description}</p>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">📍 {l.region}</span><span className="font-medium text-green-700">{l.quantity}</span></div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-green-50"><span className="text-xs text-gray-400">{getUserName(l.user_id, lang)}</span><button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">{t('market.contact')}</button></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CALCULATOR */}
          {currentPage === 'calculator' && (
            <motion.div key="calculator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Calculator className="w-7 h-7 text-green-600" /> {t('calc.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold mb-4">{t('calc.params')}</h3>
                  <div className="space-y-4">
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">{t('calc.area')}</label><input type="number" value={calcForm.area} onChange={(e) => setCalcForm({ ...calcForm, area: Number(e.target.value) })} className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" /></div>
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">{t('calc.soil')}</label><select value={calcForm.soilType} onChange={(e) => setCalcForm({ ...calcForm, soilType: e.target.value })} className="w-full px-4 py-2 border border-green-200 rounded-lg"><option value="sandy">{t('calc.sandy')}</option><option value="loamy">{t('calc.loamy')}</option><option value="clay">{t('calc.clay')}</option></select></div>
                    <button onClick={calculateFertilizer} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600">{t('calc.calculate')}</button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold mb-4">{t('calc.result')}</h3>
                  {calcResult ? (
                    <div className="text-center"><div className="bg-green-50 rounded-2xl p-6 mb-4"><p className="text-sm text-gray-500 mb-2">{t('calc.dose')}</p><p className="text-4xl font-bold text-green-700">{calcResult.dose} {calcResult.unit}</p></div></div>
                  ) : <div className="text-center py-12"><Calculator className="w-16 h-16 text-green-200 mx-auto mb-4" /><p className="text-gray-500">{t('calc.fillParams')}</p></div>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ACHIEVEMENTS */}
          {currentPage === 'achievements' && (
            <motion.div key="achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Trophy className="w-7 h-7 text-amber-600" /> {t('ach.title')}</h2>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center gap-4"><div className="text-5xl">🏆</div><div><p className="text-3xl font-bold">{USER_BADGES.filter(b => b.earned).length} / {USER_BADGES.length}</p><p className="text-amber-100">{t('ach.earned')}</p></div></div>
                <div className="mt-4 bg-white/20 rounded-full h-3"><div className="bg-white h-3 rounded-full" style={{ width: `${(USER_BADGES.filter(b => b.earned).length / USER_BADGES.length) * 100}%` }} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {USER_BADGES.map(badge => (
                  <div key={badge.id} className={`bg-white rounded-2xl border p-5 shadow-sm text-center ${badge.earned ? 'border-amber-200' : 'border-gray-200 opacity-60'}`}>
                    <span className={`text-4xl ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</span>
                    <h3 className="font-bold mt-2">{badge.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DEVICES */}
          {currentPage === 'devices' && (
            <motion.div key="devices" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Wifi className="w-7 h-7 text-green-600" /> {t('dev.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SMART_DEVICES.map(d => (
                  <div key={d.id} className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3"><span className="text-3xl">{d.type === 'xiaomi' ? '📱' : d.type === 'gardena' ? '🌿' : '💧'}</span><span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${d.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}><span className={`w-2 h-2 rounded-full ${d.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>{d.status === 'online' ? t('dev.online') : t('dev.offline')}</span></div>
                    <h3 className="font-bold">{d.name}</h3><p className="text-sm text-gray-500">{t('dev.zone')}: {d.zone}</p>
                    <div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">{t('dev.schedule')}:</span><span className="font-medium">{d.schedule}</span></div></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DB SCHEMA */}
          {currentPage === 'schema' && (
            <motion.div key="schema" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Database className="w-7 h-7 text-green-600" /> {t('db.title')}</h2>
              <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm mb-6">
                <p className="text-sm text-gray-600 mb-4">{t('db.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'User', color: 'from-blue-500 to-blue-600', fields: ['id (PK)', 'email', 'password_hash', 'name', 'region', 'climate_zone', 'created_at'] },
                    { name: 'Garden', color: 'from-green-500 to-green-600', fields: ['id (PK)', 'user_id (FK→User)', 'name', 'area', 'width_m', 'height_m', 'gps_coords', 'plan_image_url'] },
                    { name: 'Building', color: 'from-yellow-500 to-yellow-600', fields: ['id (PK)', 'garden_id (FK→Garden)', 'name', 'type', 'x', 'y', 'width', 'height', 'color', 'icon'] },
                    { name: 'Species', color: 'from-amber-500 to-amber-600', fields: ['id (PK)', 'name', 'category', 'water_needs', 'light_needs', 'soil_type'] },
                    { name: 'Plant', color: 'from-emerald-500 to-emerald-600', fields: ['id (PK)', 'garden_id (FK→Garden)', 'species_id (FK→Species)', 'variety', 'planting_date', 'position_x', 'position_y', 'qr_code'] },
                    { name: 'CareEvent', color: 'from-purple-500 to-purple-600', fields: ['id (PK)', 'plant_id (FK→Plant)', 'type', 'scheduled_at', 'done_at'] },
                    { name: 'DiseaseRecord', color: 'from-red-500 to-red-600', fields: ['id (PK)', 'plant_id (FK→Plant)', 'photo_url', 'diagnosis', 'treatment', 'date'] },
                    { name: 'Message', color: 'from-pink-500 to-pink-600', fields: ['id (PK)', 'sender_id (FK→User)', 'receiver_id (FK→User)', 'chat_id', 'text', 'created_at'] },
                    { name: 'Harvest', color: 'from-orange-500 to-orange-600', fields: ['id (PK)', 'plant_id (FK→Plant)', 'date', 'weight_kg', 'note'] },
                  ].map(table => (
                    <div key={table.name} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <div className={`bg-gradient-to-r ${table.color} text-white p-3 font-bold flex items-center gap-2`}>
                        <Table2 className="w-4 h-4" />{table.name}
                      </div>
                      <div className="p-3 space-y-1 bg-white">
                        {table.fields.map(f => (
                          <div key={f} className="flex items-center gap-2 text-xs">
                            {f.includes('PK') && <span className="text-amber-600 font-bold">🔑</span>}
                            {f.includes('FK') && <Link2 className="w-3 h-3 text-blue-500" />}
                            <span className={`font-mono ${f.includes('PK') ? 'font-bold text-gray-800' : f.includes('FK') ? 'text-blue-700' : 'text-gray-600'}`}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Link2 className="w-5 h-5 text-blue-600" /> {t('db.relations')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { table: 'User', count: 5 }, { table: 'Garden', count: gardens.length },
                    { table: 'Building', count: buildings.length },
                    { table: 'Species', count: SPECIES.length }, { table: 'Plant', count: plants.length },
                    { table: 'CareEvent', count: careEvents.length }, { table: 'DiseaseRecord', count: DISEASE_RECORDS.length },
                    { table: 'Message', count: messages.length }, { table: 'Harvest', count: HARVESTS.length },
                  ].map(s => (
                    <div key={s.table} className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xl font-bold text-green-700">{s.count}</p>
                      <p className="text-xs text-gray-600">{s.table}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PROFILE */}
          {currentPage === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><User className="w-7 h-7 text-green-600" /> {t('prof.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-green-100 p-6 shadow-sm text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg">{USER_AVATAR}</div>
                  <h3 className="font-bold mt-3 text-lg">{CURRENT_USER.name}</h3>
                  <p className="text-sm text-gray-500">{CURRENT_USER.email}</p>
                  <button onClick={() => { setLang(lang === 'ru' ? 'en' : 'ru'); }} className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-2 mx-auto">
                    <Globe className="w-4 h-4" />{t('common.changeLang')}: {lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
                  </button>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <h3 className="font-bold mb-4">{t('prof.userData')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">id</p><p className="font-mono text-sm">{CURRENT_USER.id}</p></div>
                      <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">name</p><p className="font-medium">{CURRENT_USER.name}</p></div>
                      <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">email</p><p className="font-medium">{CURRENT_USER.email}</p></div>
                      <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">region</p><p className="font-medium">{CURRENT_USER.region}</p></div>
                      <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">climate_zone</p><p className="font-medium">{CURRENT_USER.climate_zone}</p></div>
                      <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">created_at</p><p className="font-medium">{new Date(CURRENT_USER.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <h3 className="font-bold mb-4">{t('prof.myGardens')}</h3>
                    <div className="space-y-3">
                      {gardens.map((g: Garden) => (
                        <div key={g.id} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                          <span className="text-3xl">🏡</span>
                          <div className="flex-1"><p className="font-medium">{g.name}</p><p className="text-xs text-gray-500">{g.width_m}×{g.height_m} м • area: {g.area} м²</p></div>
                          <button onClick={() => { setSelectedGarden(g); setCurrentPage('garden'); }} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">{t('prof.open')}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />{t('nav.logout')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-green-200 shadow-lg z-40">
        <div className="flex items-center justify-around py-1.5 overflow-x-auto">
          {navItems.slice(0, 6).map(({ page, icon: Icon, labelKey }) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[56px] ${currentPage === page ? 'text-green-700' : 'text-gray-400'}`}>
              <Icon className="w-5 h-5" /><span className="text-[9px] font-medium">{t(labelKey)}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;


+++ src/App.tsx (修改后)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Map, Calendar, Camera, Users, User, Cloud, BarChart3, ShoppingBag,
  Menu, X, Bell, Check, Moon, BookOpen, PenTool, Calculator, Trophy, Wifi,
  Droplets, Wind, Thermometer, Send, Sprout, Database, Table2, Link2,
  Globe, LogOut, Edit3
} from 'lucide-react';
import { Page, Plant, CareEvent, Message, Garden, Building } from './types';
import {
  CURRENT_USER, OTHER_USERS, USER_BADGES, GARDENS as INITIAL_GARDENS, BUILDINGS as INITIAL_BUILDINGS, SPECIES, PLANTS as INITIAL_PLANTS,
  CARE_EVENTS, DISEASE_RECORDS, MESSAGES, CHAT_ROOMS, HARVESTS, WEATHER,
  LUNAR_CALENDAR, MARKET_LISTINGS, DIARY_ENTRIES, SMART_DEVICES, AI_DIAGNOSES,
  SPECIES_EMOJI, SPECIES_LABEL, CARE_TYPE_ICON, detectClimateZone, getRegionFromAddress
} from './data';
import { User as UserType } from './types';
import PlotMap from './components/PlotMap';
import { useLang } from './LanguageContext';
import { Lang } from './i18n';

const USER_AVATAR = '👩‍🌾';
const getUserAvatar = (userId: string) => {
  if (userId === CURRENT_USER.id) return USER_AVATAR;
  const u = OTHER_USERS.find(u => u.id === userId);
  return u ? ['👩', '👨', '👩‍🦰', '🧑'][OTHER_USERS.indexOf(u) % 4] : '👤';
};
const getUserName = (userId: string, lang: Lang) => {
  if (userId === CURRENT_USER.id) return CURRENT_USER.name;
  return OTHER_USERS.find(u => u.id === userId)?.name || (lang === 'ru' ? 'Пользователь' : 'User');
};

function App() {
  const { lang, setLang, t } = useLang();
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('garden_auth') === 'true');
  const [authStep, setAuthStep] = useState<'lang' | 'register' | 'login'>('lang');
  const [currentUser, setCurrentUser] = useState<UserType>(() => {
    const saved = localStorage.getItem('garden_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<UserType>(currentUser);
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', phone: '', address: '', avatar: '👩‍🌾'
  });
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gardens, setGardens] = useState<Garden[]>(INITIAL_GARDENS);
  const [buildings, setBuildings] = useState<Building[]>(INITIAL_BUILDINGS);
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [careEvents, setCareEvents] = useState<CareEvent[]>(CARE_EVENTS);
  const [selectedGarden, setSelectedGarden] = useState<Garden>(INITIAL_GARDENS[0]);
  const [selectedRoom, setSelectedRoom] = useState(CHAT_ROOMS[0]);
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [aiResult, setAiResult] = useState<typeof AI_DIAGNOSES[0] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [encSearch, setEncSearch] = useState('');
  const [calcForm, setCalcForm] = useState({ area: 100, soilType: 'sandy', plantType: 'tomato' });
  const [calcResult, setCalcResult] = useState<{ dose: number; unit: string; frequency: string } | null>(null);

  const pendingEvents = careEvents.filter(e => !e.done_at);
  const completedEvents = careEvents.filter(e => e.done_at).length;

  const handleLogin = () => {
    localStorage.setItem('garden_auth', 'true');
    localStorage.setItem('garden_user', JSON.stringify(currentUser));
    setIsAuth(true);
  };

  const handleRegister = () => {
    if (!registerForm.name || !registerForm.email || !registerForm.address) return;
    const newUser: UserType = {
      id: `u${Date.now()}`,
      email: registerForm.email,
      password_hash: '***',
      name: registerForm.name,
      phone: registerForm.phone,
      region: getRegionFromAddress(registerForm.address),
      address: registerForm.address,
      climate_zone: detectClimateZone(registerForm.address),
      avatar: registerForm.avatar,
      created_at: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    localStorage.setItem('garden_auth', 'true');
    localStorage.setItem('garden_user', JSON.stringify(newUser));
    setIsAuth(true);
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...profileForm,
      region: getRegionFromAddress(profileForm.address),
      climate_zone: detectClimateZone(profileForm.address),
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('garden_user', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    if (window.confirm(t('prof.logoutConfirm'))) {
      localStorage.removeItem('garden_auth');
      localStorage.removeItem('garden_user');
      setIsAuth(false);
      setAuthStep('lang');
      setCurrentUser(CURRENT_USER);
    }
  };

  const handleSwitchAccount = () => {
    if (window.confirm(t('prof.switchConfirm'))) {
      localStorage.removeItem('garden_auth');
      localStorage.removeItem('garden_user');
      setIsAuth(false);
      setAuthStep('lang');
      setCurrentUser(CURRENT_USER);
    }
  };

  const navItems: { page: Page; icon: typeof Home; labelKey: any }[] = [
    { page: 'dashboard', icon: Home, labelKey: 'nav.dashboard' },
    { page: 'garden', icon: Map, labelKey: 'nav.garden' },
    { page: 'calendar', icon: Calendar, labelKey: 'nav.calendar' },
    { page: 'lunar', icon: Moon, labelKey: 'nav.lunar' },
    { page: 'ai', icon: Camera, labelKey: 'nav.ai' },
    { page: 'encyclopedia', icon: BookOpen, labelKey: 'nav.encyclopedia' },
    { page: 'community', icon: Users, labelKey: 'nav.community' },
    { page: 'weather', icon: Cloud, labelKey: 'nav.weather' },
    { page: 'harvest', icon: BarChart3, labelKey: 'nav.harvest' },
    { page: 'diary', icon: PenTool, labelKey: 'nav.diary' },
    { page: 'market', icon: ShoppingBag, labelKey: 'nav.market' },
    { page: 'calculator', icon: Calculator, labelKey: 'nav.calculator' },
    { page: 'achievements', icon: Trophy, labelKey: 'nav.achievements' },
    { page: 'devices', icon: Wifi, labelKey: 'nav.devices' },
    { page: 'schema', icon: Database, labelKey: 'nav.schema' },
    { page: 'profile', icon: User, labelKey: 'nav.profile' },
  ];

  const toggleEvent = (id: string) => {
    setCareEvents(prev => prev.map(e => e.id === id ? { ...e, done_at: e.done_at ? null : new Date().toISOString() } : e));
  };
  const addPlant = (plant: Plant) => setPlants(prev => [...prev, plant]);
  const deletePlant = (id: string) => setPlants(prev => prev.filter(p => p.id !== id));

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: `m${Date.now()}`, sender_id: CURRENT_USER.id,
      receiver_id: null, chat_id: selectedRoom.id,
      text: newMessage, created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  const runAIDiagnosis = () => {
    setAiLoading(true);
    setTimeout(() => { setAiResult(AI_DIAGNOSES[Math.floor(Math.random() * AI_DIAGNOSES.length)]); setAiLoading(false); }, 2000);
  };

  const calculateFertilizer = () => {
    const baseDose = calcForm.plantType === 'tomato' ? 30 : calcForm.plantType === 'cucumber' ? 25 : 40;
    const soilMult = calcForm.soilType === 'sandy' ? 1.3 : calcForm.soilType === 'clay' ? 0.8 : 1.0;
    setCalcResult({ dose: Math.round(baseDose * calcForm.area * soilMult), unit: 'г', frequency: lang === 'ru' ? '1 раз в 2 недели' : 'Once per 2 weeks' });
  };

  const filteredSpecies = SPECIES.filter(s => s.name.toLowerCase().includes(encSearch.toLowerCase()));

  // ====== AUTH SCREEN ======
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl text-5xl mx-auto mb-4">🌱</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Садовод</h1>
            <p className="text-green-600 text-sm mt-1">Garden Assistant</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-green-100">
            {authStep === 'lang' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">{t('auth.chooseLang')}</h2>
                <p className="text-sm text-gray-500 text-center mb-6">{t('auth.subtitle')}</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setLang('ru'); setAuthStep('register'); }}
                    className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                  >
                    <span className="text-4xl">🇷🇺</span>
                    <span className="font-bold text-blue-800">Русский</span>
                  </button>
                  <button
                    onClick={() => { setLang('en'); setAuthStep('register'); }}
                    className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all"
                  >
                    <span className="text-4xl">🇬🇧</span>
                    <span className="font-bold text-red-800">English</span>
                  </button>
                </div>
              </motion.div>
            )}

            {authStep === 'register' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('auth.register')}</h2>
                <div className="space-y-3">
                  <input type="text" placeholder={t('auth.name')} value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="email" placeholder={t('auth.email')} value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="password" placeholder={t('auth.password')} value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="tel" placeholder={t('auth.phone')} value={registerForm.phone} onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <div>
                    <input type="text" placeholder={t('auth.address')} value={registerForm.address} onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                    <p className="text-xs text-gray-400 mt-1 ml-1">📍 {t('auth.addressHint')}</p>
                  </div>
                  {registerForm.address && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-xs text-gray-600">🌡️ {t('auth.climateZone')}: <span className="font-bold text-green-700">{detectClimateZone(registerForm.address)}</span></p>
                      <p className="text-xs text-gray-600">📍 {t('auth.region')}: <span className="font-bold text-green-700">{getRegionFromAddress(registerForm.address)}</span></p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t('auth.avatar') || 'Аватар'}:</p>
                    <div className="flex gap-2 flex-wrap">
                      {['👩‍🌾', '👨‍🌾', '👩', '👨', '👩‍🦰', '🧑', '👴', '👵'].map(av => (
                        <button key={av} onClick={() => setRegisterForm({ ...registerForm, avatar: av })} className={`text-2xl p-2 rounded-lg border-2 ${registerForm.avatar === av ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>{av}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleRegister} disabled={!registerForm.name || !registerForm.email || !registerForm.address} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    {t('auth.createAccount')}
                  </button>
                  <button onClick={() => setAuthStep('login')} className="w-full py-2 text-sm text-green-700 hover:text-green-800">
                    {t('auth.haveAccount')} {t('auth.login')}
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center mb-3">{t('auth.socialLogin')}</p>
                  <div className="flex gap-2">
                    <button onClick={handleLogin} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Google</button>
                    <button onClick={handleLogin} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">VK</button>
                    <button onClick={handleLogin} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">GitHub</button>
                  </div>
                </div>
                <button onClick={() => setAuthStep('lang')} className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> {t('common.changeLang')}
                </button>
              </motion.div>
            )}

            {authStep === 'login' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('auth.login')}</h2>
                <div className="space-y-3">
                  <input type="email" placeholder={t('auth.email')} defaultValue={CURRENT_USER.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <input type="password" placeholder={t('auth.password')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
                  <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 shadow-lg">
                    {t('auth.login')}
                  </button>
                  <button onClick={handleLogin} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                    {t('auth.continueAs')}
                  </button>
                  <button onClick={() => setAuthStep('register')} className="w-full py-2 text-sm text-green-700 hover:text-green-800">
                    {t('auth.noAccount')} {t('auth.register')}
                  </button>
                </div>
                <button onClick={() => setAuthStep('lang')} className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> {t('common.changeLang')}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ====== MAIN APP ======
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-16 lg:pb-0">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-center py-2 text-sm font-medium">
        🌙 {lang === 'ru' ? 'Сегодня растущая Луна в Тельце — благоприятный день для посадки корнеплодов!' : 'Today is Waxing Moon in Taurus — favorable day for planting root crops!'}
      </div>

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-green-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg text-xl">🌱</div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  {lang === 'ru' ? 'Садовод' : 'Gardener'}
                </h1>
                <p className="text-xs text-green-600 -mt-1">Garden Assistant</p>
              </div>
            </div>
            <nav className="hidden xl:flex items-center gap-0.5">
              {navItems.slice(0, 9).map(({ page, icon: Icon, labelKey }) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`flex items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${currentPage === page ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'}`}>
                  <Icon className="w-3.5 h-3.5" />{t(labelKey)}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => setAuthStep('lang')} className="p-2 rounded-lg hover:bg-green-100 flex items-center gap-1 text-xs font-medium text-green-700">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'ru' ? 'RU' : 'EN'}</span>
              </button>
              <button className="relative p-2 rounded-lg hover:bg-green-100"><Bell className="w-5 h-5 text-green-700" /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 rounded-lg hover:bg-green-100">
                {mobileMenuOpen ? <X className="w-5 h-5 text-green-700" /> : <Menu className="w-5 h-5 text-green-700" />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="xl:hidden border-t border-green-200/50 bg-white/95 backdrop-blur-xl overflow-hidden">
              <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
                {navItems.map(({ page, icon: Icon, labelKey }) => (
                  <button key={page} onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium ${currentPage === page ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'}`}>
                    <Icon className="w-5 h-5" />{t(labelKey)}
                  </button>
                ))}
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  <LogOut className="w-5 h-5" />{t('nav.logout')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {/* DASHBOARD */}
          {currentPage === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-6 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{USER_AVATAR}</span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{t('dash.hello')}, {CURRENT_USER.name.split(' ')[0]}!</h2>
                    <p className="text-green-100 text-sm">📍 {CURRENT_USER.region} • {WEATHER.icon} {WEATHER.temp}°C • 🌙 {lang === 'ru' ? LUNAR_CALENDAR[0].phaseName : 'Waxing Moon'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{plants.filter(p => p.garden_id === selectedGarden.id).length}</p><p className="text-xs text-green-100">{t('dash.plants')}</p></div>
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{pendingEvents.length}</p><p className="text-xs text-green-100">{t('dash.careTasks')}</p></div>
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{gardens.length}</p><p className="text-xs text-green-100">{t('dash.gardens')}</p></div>
                  <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"><p className="text-2xl font-bold">{HARVESTS.reduce((s, h) => s + h.weight_kg, 0).toFixed(0)} кг</p><p className="text-xs text-green-100">{t('dash.harvest')}</p></div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-600" /> {t('dash.careEvents')}</h3><button onClick={() => setCurrentPage('calendar')} className="text-sm text-green-600">{t('dash.all')}</button></div>
                  <div className="space-y-2">
                    {pendingEvents.slice(0, 5).map(ev => {
                      const plant = plants.find(p => p.id === ev.plant_id);
                      const sp = SPECIES.find(s => s.id === plant?.species_id);
                      return (
                        <div key={ev.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100" onClick={() => toggleEvent(ev.id)}>
                          <span className="text-lg">{CARE_TYPE_ICON[ev.type]}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800">{lang === 'ru' ? `Полив: ${sp?.name}` : `${sp?.name}: Watering`}</p>
                            <p className="text-xs text-gray-500">{new Date(ev.scheduled_at).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Sprout className="w-5 h-5 text-green-600" /> {t('dash.quickActions')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { page: 'garden' as Page, icon: '🗺️', label: t('nav.garden') },
                      { page: 'ai' as Page, icon: '🔬', label: 'AI' },
                      { page: 'lunar' as Page, icon: '🌙', label: t('nav.lunar') },
                      { page: 'encyclopedia' as Page, icon: '📚', label: t('nav.encyclopedia') },
                      { page: 'weather' as Page, icon: '🌤️', label: t('nav.weather') },
                      { page: 'schema' as Page, icon: '🗄️', label: t('nav.schema') },
                    ].map(({ page, icon, label }) => (
                      <button key={page} onClick={() => setCurrentPage(page)} className="flex items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 text-left">
                        <span className="text-xl">{icon}</span><span className="text-sm font-medium text-gray-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GARDEN */}
          {currentPage === 'garden' && (
            <motion.div key="garden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {gardens.map((g: Garden) => (
                  <button key={g.id} onClick={() => setSelectedGarden(g)} className={`px-4 py-2 rounded-xl text-sm font-medium ${selectedGarden.id === g.id ? 'bg-green-600 text-white shadow-md' : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'}`}>
                    🏡 {g.name} ({g.area} м²)
                  </button>
                ))}
              </div>
              <PlotMap
                garden={selectedGarden}
                plants={plants}
                buildings={buildings}
                species={SPECIES}
                onAddPlant={addPlant}
                onDeletePlant={deletePlant}
                onUpdateGarden={(g) => { setGardens(prev => prev.map(x => x.id === g.id ? g : x)); setSelectedGarden(g); }}
                onAddBuilding={(b) => setBuildings(prev => [...prev, b])}
                onUpdateBuilding={(b) => setBuildings(prev => prev.map(x => x.id === b.id ? b : x))}
                onDeleteBuilding={(id) => setBuildings(prev => prev.filter(x => x.id !== id))}
              />
            </motion.div>
          )}

          {/* CALENDAR */}
          {currentPage === 'calendar' && (
            <motion.div key="calendar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Calendar className="w-7 h-7 text-green-600" /> {t('care.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  {careEvents.map(ev => {
                    const plant = plants.find(p => p.id === ev.plant_id);
                    const sp = SPECIES.find(s => s.id === plant?.species_id);
                    return (
                      <div key={ev.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer ${ev.done_at ? 'bg-green-50 border-green-200' : 'bg-white border-green-100 hover:border-green-300 hover:shadow-md'}`} onClick={() => toggleEvent(ev.id)}>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${ev.done_at ? 'bg-green-500 border-green-500' : 'border-green-300'}`}>
                          {ev.done_at && <Check className="w-5 h-5 text-white" />}
                        </div>
                        <span className="text-2xl">{CARE_TYPE_ICON[ev.type]}</span>
                        <div className="flex-1">
                          <p className={`font-medium ${ev.done_at ? 'line-through text-gray-400' : 'text-gray-800'}`}>{sp?.name} {plant?.variety}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>{t('care.scheduled')}: {new Date(ev.scheduled_at).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                            {ev.done_at && <span>• {t('care.done')}: {new Date(ev.done_at).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white rounded-xl border border-green-100 p-5 shadow-sm h-fit">
                  <h3 className="font-bold text-gray-800 mb-3">{t('care.progress')}</h3>
                  <div className="w-full bg-green-100 rounded-full h-4 mb-2"><div className="bg-green-500 h-4 rounded-full" style={{ width: `${(completedEvents / careEvents.length) * 100}%` }} /></div>
                  <p className="text-sm text-gray-600">{completedEvents} {t('care.completed')} {careEvents.length}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* LUNAR */}
          {currentPage === 'lunar' && (
            <motion.div key="lunar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Moon className="w-7 h-7 text-purple-600" /> {t('lunar.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {LUNAR_CALENDAR.map((day, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`bg-white rounded-2xl border p-5 shadow-sm ${i === 0 ? 'border-purple-300 ring-2 ring-purple-100' : 'border-green-100'}`}>
                    <div className="flex items-center justify-between mb-3"><span className="text-3xl">{day.icon}</span>{i === 0 && <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">{t('lunar.today')}</span>}</div>
                    <p className="font-bold text-gray-800">{new Date(day.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                    <p className="text-sm text-gray-500">{lang === 'ru' ? day.phaseName : (day.phase === 'waxing' ? 'Waxing' : day.phase === 'full' ? 'Full' : day.phase === 'waning' ? 'Waning' : 'New')} • {day.moonSign}</p>
                    <p className="text-xs text-gray-600 mt-2">{day.recommendation}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI */}
          {currentPage === 'ai' && (
            <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Camera className="w-7 h-7 text-green-600" /> {t('ai.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t('ai.upload')}</h3>
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 cursor-pointer bg-green-50/50" onClick={runAIDiagnosis}>
                    <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">{t('ai.clickToAnalyze')}</p>
                  </div>
                  {aiLoading && <div className="mt-4 text-center"><div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full"><div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div><span className="text-sm text-green-700">{t('ai.analyzing')}</span></div></div>}
                  <div className="mt-6"><h4 className="font-medium text-gray-700 mb-3">{t('ai.history')}</h4>
                    {DISEASE_RECORDS.map(d => {
                      const plant = plants.find(p => p.id === d.plant_id);
                      const sp = SPECIES.find(s => s.id === plant?.species_id);
                      return (
                        <div key={d.id} className="p-3 bg-gray-50 rounded-lg mb-2">
                          <p className="text-sm font-medium text-gray-800">{d.diagnosis}</p>
                          <p className="text-xs text-gray-500">{sp?.name} • {new Date(d.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t('ai.result')}</h3>
                  {aiResult ? (
                    <div>
                      <div className={`p-4 rounded-xl mb-4 ${aiResult.severity === 'high' ? 'bg-red-50 border border-red-200' : aiResult.severity === 'medium' ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                        <div className="flex items-center gap-3 mb-2"><span className="text-3xl">{aiResult.severity === 'high' ? '🚨' : aiResult.severity === 'medium' ? '⚠️' : '✅'}</span><div><p className="font-bold">{aiResult.name}</p><p className="text-sm text-gray-600">{t('ai.confidence')}: {aiResult.confidence}%</p></div></div>
                        <p className="text-sm text-gray-700">{aiResult.description}</p>
                      </div>
                      <h4 className="font-medium mb-2">{t('ai.treatment')}</h4>
                      <ul className="space-y-2">{aiResult.treatment.map((tr, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-green-600">•</span>{tr}</li>)}</ul>
                    </div>
                  ) : <div className="text-center py-12"><Camera className="w-16 h-16 text-green-200 mx-auto mb-4" /><p className="text-gray-500">{t('ai.upload')}</p></div>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ENCYCLOPEDIA */}
          {currentPage === 'encyclopedia' && (
            <motion.div key="encyclopedia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><BookOpen className="w-7 h-7 text-green-600" /> {t('enc.title')}</h2>
              <input type="text" placeholder={t('enc.search')} value={encSearch} onChange={(e) => setEncSearch(e.target.value)} className="w-full sm:w-96 px-4 py-3 bg-white border border-green-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSpecies.map(sp => (
                  <div key={sp.id} className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3"><span className="text-3xl">{SPECIES_EMOJI[sp.category]}</span><div><h3 className="font-bold text-gray-800">{sp.name}</h3><p className="text-xs text-gray-500">id: {sp.id} • {SPECIES_LABEL[sp.category]}</p></div></div>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded-lg"><span className="text-gray-500">water_needs:</span> <span className="font-medium">{sp.water_needs}</span></div>
                      <div className="bg-yellow-50 p-2 rounded-lg"><span className="text-gray-500">light_needs:</span> <span className="font-medium">{sp.light_needs}</span></div>
                      <div className="bg-amber-50 p-2 rounded-lg"><span className="text-gray-500">soil_type:</span> <span className="font-medium">{sp.soil_type}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* COMMUNITY */}
          {currentPage === 'community' && (
            <motion.div key="community" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Users className="w-7 h-7 text-green-600" /> {t('comm.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <h3 className="font-bold text-gray-700 mb-3">{t('comm.chats')}</h3>
                  <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
                    {CHAT_ROOMS.map(room => (
                      <button key={room.id} onClick={() => setSelectedRoom(room)} className={`w-full flex items-center gap-3 p-3 text-left border-b border-green-50 last:border-0 ${selectedRoom.id === room.id ? 'bg-green-50' : 'hover:bg-green-50/50'}`}>
                        <span className="text-xl">{room.icon}</span>
                        <div className="flex-1 min-w-0"><p className="font-medium text-gray-800 text-sm">{room.name}</p><p className="text-xs text-gray-500">{room.members} {t('comm.members')}</p></div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-xl border border-green-100 shadow-sm">
                  <div className="p-3 border-b border-green-100 flex items-center gap-2"><span className="text-lg">{selectedRoom.icon}</span><span className="font-medium">{selectedRoom.name}</span></div>
                  <div className="p-3 h-96 overflow-y-auto space-y-2">
                    {messages.filter(m => m.chat_id === selectedRoom.id).map(msg => (
                      <div key={msg.id} className={`flex gap-2 ${msg.sender_id === CURRENT_USER.id ? 'justify-end' : ''}`}>
                        {msg.sender_id !== CURRENT_USER.id && <span className="text-lg shrink-0">{getUserAvatar(msg.sender_id)}</span>}
                        <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.sender_id === CURRENT_USER.id ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                          {msg.sender_id !== CURRENT_USER.id && <p className="text-xs font-medium mb-0.5 opacity-70">{getUserName(msg.sender_id, lang)}</p>}
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-green-100 flex gap-2">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder={t('comm.placeholder')} className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                    <button onClick={sendMessage} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><Send className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* WEATHER */}
          {currentPage === 'weather' && (
            <motion.div key="weather" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Cloud className="w-7 h-7 text-green-600" /> {t('weather.title')} — {CURRENT_USER.region}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-sm opacity-80">{t('weather.now')}</p>
                  <div className="flex items-center gap-4 my-4"><span className="text-6xl">{WEATHER.icon}</span><span className="text-5xl font-bold">{WEATHER.temp}°</span></div>
                  <p className="text-lg">{WEATHER.description}</p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center bg-white/20 rounded-lg p-2"><Thermometer className="w-4 h-4 mx-auto mb-1" /><p className="text-xs opacity-80">{t('weather.feels')}</p><p className="font-bold">{WEATHER.feelsLike}°</p></div>
                    <div className="text-center bg-white/20 rounded-lg p-2"><Droplets className="w-4 h-4 mx-auto mb-1" /><p className="text-xs opacity-80">{t('weather.humidity')}</p><p className="font-bold">{WEATHER.humidity}%</p></div>
                    <div className="text-center bg-white/20 rounded-lg p-2"><Wind className="w-4 h-4 mx-auto mb-1" /><p className="text-xs opacity-80">{t('weather.wind')}</p><p className="font-bold">{WEATHER.wind} м/с</p></div>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">{t('weather.weekForecast')}</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {WEATHER.forecast.map((day, i) => (
                      <div key={i} className={`text-center p-3 rounded-xl ${i === 0 ? 'bg-green-50 border border-green-200' : ''}`}>
                        <p className="text-xs font-medium text-gray-500 mb-1">{day.day}</p>
                        <p className="text-2xl mb-1">{day.icon}</p>
                        <p className="text-sm font-bold">{day.tempHigh}°</p>
                        <p className="text-xs text-gray-500">{day.tempLow}°</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* HARVEST */}
          {currentPage === 'harvest' && (
            <motion.div key="harvest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><BarChart3 className="w-7 h-7 text-green-600" /> {t('harvest.title')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">🧺</span><p className="text-xl font-bold">{HARVESTS.reduce((s, h) => s + h.weight_kg, 0).toFixed(1)} кг</p><p className="text-xs text-gray-500">{t('harvest.total')}</p></div>
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">🌱</span><p className="text-xl font-bold">{new Set(HARVESTS.map(h => h.plant_id)).size}</p><p className="text-xs text-gray-500">{t('harvest.plants')}</p></div>
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">📊</span><p className="text-xl font-bold">{HARVESTS.length}</p><p className="text-xs text-gray-500">{t('harvest.picks')}</p></div>
                <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm text-center"><span className="text-2xl">🏆</span><p className="text-xl font-bold">{Math.max(...HARVESTS.map(h => h.weight_kg))} кг</p><p className="text-xs text-gray-500">{t('harvest.record')}</p></div>
              </div>
              <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">{t('harvest.records')}</h3>
                <div className="space-y-2">
                  {[...HARVESTS].reverse().map(h => {
                    const plant = plants.find(p => p.id === h.plant_id);
                    const sp = SPECIES.find(s => s.id === plant?.species_id);
                    return (
                      <div key={h.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <span className="text-lg">{sp ? SPECIES_EMOJI[sp.category] : '🧺'}</span>
                        <div className="flex-1"><p className="text-sm font-medium">{sp?.name} {plant?.variety}</p><p className="text-xs text-gray-500">{new Date(h.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p></div>
                        <span className="font-bold text-green-700">{h.weight_kg} кг</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* DIARY */}
          {currentPage === 'diary' && (
            <motion.div key="diary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><PenTool className="w-7 h-7 text-green-600" /> {t('diary.title')}</h2>
              <div className="space-y-4">
                {DIARY_ENTRIES.map(entry => (
                  <div key={entry.id} className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3"><span className="text-2xl">{entry.mood === 'great' ? '😊' : entry.mood === 'good' ? '🙂' : entry.mood === 'ok' ? '😐' : '😟'}</span><div><p className="font-bold">{new Date(entry.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p><p className="text-sm text-gray-500">{entry.weather}</p></div></div>
                    <p className="text-gray-700">{entry.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MARKET */}
          {currentPage === 'market' && (
            <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><ShoppingBag className="w-7 h-7 text-green-600" /> {t('market.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MARKET_LISTINGS.map(l => (
                  <div key={l.id} className="bg-white rounded-xl border border-green-100 p-5 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl">{l.type === 'seeds' ? '🌰' : l.type === 'seedlings' ? '🌱' : l.type === 'cuttings' ? '✂️' : l.type === 'harvest' ? '🍯' : '🔧'}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.exchange ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{l.exchange ? t('market.exchange') : `${l.price}₽`}</span></div>
                    <h3 className="font-bold mb-1">{l.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{l.description}</p>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">📍 {l.region}</span><span className="font-medium text-green-700">{l.quantity}</span></div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-green-50"><span className="text-xs text-gray-400">{getUserName(l.user_id, lang)}</span><button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">{t('market.contact')}</button></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CALCULATOR */}
          {currentPage === 'calculator' && (
            <motion.div key="calculator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Calculator className="w-7 h-7 text-green-600" /> {t('calc.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold mb-4">{t('calc.params')}</h3>
                  <div className="space-y-4">
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">{t('calc.area')}</label><input type="number" value={calcForm.area} onChange={(e) => setCalcForm({ ...calcForm, area: Number(e.target.value) })} className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" /></div>
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">{t('calc.soil')}</label><select value={calcForm.soilType} onChange={(e) => setCalcForm({ ...calcForm, soilType: e.target.value })} className="w-full px-4 py-2 border border-green-200 rounded-lg"><option value="sandy">{t('calc.sandy')}</option><option value="loamy">{t('calc.loamy')}</option><option value="clay">{t('calc.clay')}</option></select></div>
                    <button onClick={calculateFertilizer} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600">{t('calc.calculate')}</button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                  <h3 className="font-bold mb-4">{t('calc.result')}</h3>
                  {calcResult ? (
                    <div className="text-center"><div className="bg-green-50 rounded-2xl p-6 mb-4"><p className="text-sm text-gray-500 mb-2">{t('calc.dose')}</p><p className="text-4xl font-bold text-green-700">{calcResult.dose} {calcResult.unit}</p></div></div>
                  ) : <div className="text-center py-12"><Calculator className="w-16 h-16 text-green-200 mx-auto mb-4" /><p className="text-gray-500">{t('calc.fillParams')}</p></div>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ACHIEVEMENTS */}
          {currentPage === 'achievements' && (
            <motion.div key="achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Trophy className="w-7 h-7 text-amber-600" /> {t('ach.title')}</h2>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center gap-4"><div className="text-5xl">🏆</div><div><p className="text-3xl font-bold">{USER_BADGES.filter(b => b.earned).length} / {USER_BADGES.length}</p><p className="text-amber-100">{t('ach.earned')}</p></div></div>
                <div className="mt-4 bg-white/20 rounded-full h-3"><div className="bg-white h-3 rounded-full" style={{ width: `${(USER_BADGES.filter(b => b.earned).length / USER_BADGES.length) * 100}%` }} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {USER_BADGES.map(badge => (
                  <div key={badge.id} className={`bg-white rounded-2xl border p-5 shadow-sm text-center ${badge.earned ? 'border-amber-200' : 'border-gray-200 opacity-60'}`}>
                    <span className={`text-4xl ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</span>
                    <h3 className="font-bold mt-2">{badge.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DEVICES */}
          {currentPage === 'devices' && (
            <motion.div key="devices" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Wifi className="w-7 h-7 text-green-600" /> {t('dev.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SMART_DEVICES.map(d => (
                  <div key={d.id} className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3"><span className="text-3xl">{d.type === 'xiaomi' ? '📱' : d.type === 'gardena' ? '🌿' : '💧'}</span><span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${d.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}><span className={`w-2 h-2 rounded-full ${d.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>{d.status === 'online' ? t('dev.online') : t('dev.offline')}</span></div>
                    <h3 className="font-bold">{d.name}</h3><p className="text-sm text-gray-500">{t('dev.zone')}: {d.zone}</p>
                    <div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">{t('dev.schedule')}:</span><span className="font-medium">{d.schedule}</span></div></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DB SCHEMA */}
          {currentPage === 'schema' && (
            <motion.div key="schema" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Database className="w-7 h-7 text-green-600" /> {t('db.title')}</h2>
              <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm mb-6">
                <p className="text-sm text-gray-600 mb-4">{t('db.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'User', color: 'from-blue-500 to-blue-600', fields: ['id (PK)', 'email', 'password_hash', 'name', 'region', 'climate_zone', 'created_at'] },
                    { name: 'Garden', color: 'from-green-500 to-green-600', fields: ['id (PK)', 'user_id (FK→User)', 'name', 'area', 'width_m', 'height_m', 'gps_coords', 'plan_image_url'] },
                    { name: 'Building', color: 'from-yellow-500 to-yellow-600', fields: ['id (PK)', 'garden_id (FK→Garden)', 'name', 'type', 'x', 'y', 'width', 'height', 'color', 'icon'] },
                    { name: 'Species', color: 'from-amber-500 to-amber-600', fields: ['id (PK)', 'name', 'category', 'water_needs', 'light_needs', 'soil_type'] },
                    { name: 'Plant', color: 'from-emerald-500 to-emerald-600', fields: ['id (PK)', 'garden_id (FK→Garden)', 'species_id (FK→Species)', 'variety', 'planting_date', 'position_x', 'position_y', 'qr_code'] },
                    { name: 'CareEvent', color: 'from-purple-500 to-purple-600', fields: ['id (PK)', 'plant_id (FK→Plant)', 'type', 'scheduled_at', 'done_at'] },
                    { name: 'DiseaseRecord', color: 'from-red-500 to-red-600', fields: ['id (PK)', 'plant_id (FK→Plant)', 'photo_url', 'diagnosis', 'treatment', 'date'] },
                    { name: 'Message', color: 'from-pink-500 to-pink-600', fields: ['id (PK)', 'sender_id (FK→User)', 'receiver_id (FK→User)', 'chat_id', 'text', 'created_at'] },
                    { name: 'Harvest', color: 'from-orange-500 to-orange-600', fields: ['id (PK)', 'plant_id (FK→Plant)', 'date', 'weight_kg', 'note'] },
                  ].map(table => (
                    <div key={table.name} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <div className={`bg-gradient-to-r ${table.color} text-white p-3 font-bold flex items-center gap-2`}>
                        <Table2 className="w-4 h-4" />{table.name}
                      </div>
                      <div className="p-3 space-y-1 bg-white">
                        {table.fields.map(f => (
                          <div key={f} className="flex items-center gap-2 text-xs">
                            {f.includes('PK') && <span className="text-amber-600 font-bold">🔑</span>}
                            {f.includes('FK') && <Link2 className="w-3 h-3 text-blue-500" />}
                            <span className={`font-mono ${f.includes('PK') ? 'font-bold text-gray-800' : f.includes('FK') ? 'text-blue-700' : 'text-gray-600'}`}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Link2 className="w-5 h-5 text-blue-600" /> {t('db.relations')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { table: 'User', count: 5 }, { table: 'Garden', count: gardens.length },
                    { table: 'Building', count: buildings.length },
                    { table: 'Species', count: SPECIES.length }, { table: 'Plant', count: plants.length },
                    { table: 'CareEvent', count: careEvents.length }, { table: 'DiseaseRecord', count: DISEASE_RECORDS.length },
                    { table: 'Message', count: messages.length }, { table: 'Harvest', count: HARVESTS.length },
                  ].map(s => (
                    <div key={s.table} className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xl font-bold text-green-700">{s.count}</p>
                      <p className="text-xs text-gray-600">{s.table}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PROFILE */}
          {currentPage === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><User className="w-7 h-7 text-green-600" /> {t('prof.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg">{currentUser.avatar}</div>
                    <h3 className="font-bold mt-3 text-lg">{currentUser.name}</h3>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                    <p className="text-xs text-gray-400 mt-1">📍 {currentUser.region}</p>
                    <button onClick={() => { setLang(lang === 'ru' ? 'en' : 'ru'); }} className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-2 mx-auto">
                      <Globe className="w-4 h-4" />{t('common.changeLang')}: {lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <h3 className="font-bold mb-3 text-sm">{t('prof.accountInfo')}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">ID:</span><span className="font-mono text-xs">{currentUser.id}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">{t('prof.climateZone')}:</span><span className="font-bold text-green-700">{currentUser.climate_zone}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Created:</span><span>{new Date(currentUser.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span></div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">{t('prof.userData')}</h3>
                      {!isEditingProfile && (
                        <button onClick={() => { setIsEditingProfile(true); setProfileForm(currentUser); }} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-2">
                          <Edit3 className="w-4 h-4" />{t('prof.edit')}
                        </button>
                      )}
                    </div>
                    {isEditingProfile ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('auth.name')}</label>
                          <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('auth.email')}</label>
                          <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('auth.phone')}</label>
                          <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('prof.address')}</label>
                          <input type="text" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                          <p className="text-xs text-gray-400 mt-1">📍 {t('auth.addressHint')}</p>
                        </div>
                        {profileForm.address && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-gray-600">🌡️ {t('prof.climateZone')}: <span className="font-bold text-green-700">{detectClimateZone(profileForm.address)}</span></p>
                            <p className="text-xs text-gray-600">📍 {t('prof.region')}: <span className="font-bold text-green-700">{getRegionFromAddress(profileForm.address)}</span></p>
                          </div>
                        )}
                        <div>
                          <label className="text-xs text-gray-500 mb-2 block">{t('prof.changeAvatar')}</label>
                          <div className="flex gap-2 flex-wrap">
                            {['👩‍🌾', '👨‍🌾', '👩', '👨', '👩‍🦰', '🧑', '👴', '👵'].map(av => (
                              <button key={av} onClick={() => setProfileForm({ ...profileForm, avatar: av })} className={`text-2xl p-2 rounded-lg border-2 ${profileForm.avatar === av ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>{av}</button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button onClick={handleSaveProfile} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">{t('prof.save')}</button>
                          <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">{t('prof.cancel')}</button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">{t('auth.name')}</p><p className="font-medium">{currentUser.name}</p></div>
                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">{t('auth.email')}</p><p className="font-medium">{currentUser.email}</p></div>
                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">{t('auth.phone')}</p><p className="font-medium">{currentUser.phone || '—'}</p></div>
                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">{t('prof.region')}</p><p className="font-medium">{currentUser.region}</p></div>
                        <div className="p-3 bg-green-50 rounded-lg sm:col-span-2"><p className="text-xs text-gray-500">{t('prof.address')}</p><p className="font-medium">{currentUser.address}</p></div>
                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">{t('prof.climateZone')}</p><p className="font-bold text-green-700">{currentUser.climate_zone}</p></div>
                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">Created</p><p className="font-medium">{new Date(currentUser.created_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p></div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <h3 className="font-bold mb-4">{t('prof.myGardens')}</h3>
                    <div className="space-y-3">
                      {gardens.map((g: Garden) => (
                        <div key={g.id} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                          <span className="text-3xl">🏡</span>
                          <div className="flex-1"><p className="font-medium">{g.name}</p><p className="text-xs text-gray-500">{g.width_m}×{g.height_m} м • area: {g.area} м²</p></div>
                          <button onClick={() => { setSelectedGarden(g); setCurrentPage('garden'); }} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">{t('prof.open')}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">
                    <h3 className="font-bold mb-4 text-red-700">{t('prof.dangerZone')}</h3>
                    <div className="space-y-2">
                      <button onClick={handleSwitchAccount} className="w-full py-3 bg-amber-50 text-amber-700 rounded-xl font-medium hover:bg-amber-100 flex items-center justify-center gap-2">
                        <User className="w-4 h-4" />{t('prof.switchAccount')}
                      </button>
                      <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 flex items-center justify-center gap-2">
                        <LogOut className="w-4 h-4" />{t('prof.logout')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-green-200 shadow-lg z-40">
        <div className="flex items-center justify-around py-1.5 overflow-x-auto">
          {navItems.slice(0, 6).map(({ page, icon: Icon, labelKey }) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg min-w-[56px] ${currentPage === page ? 'text-green-700' : 'text-gray-400'}`}>
              <Icon className="w-5 h-5" /><span className="text-[9px] font-medium">{t(labelKey)}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
