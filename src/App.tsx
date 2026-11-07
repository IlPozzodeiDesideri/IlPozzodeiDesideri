import React, { useState } from 'react';
import { 
  Trees, 
  Sun, 
  Waves, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  Utensils, 
  Wifi, 
  Car, 
  Lock, 
  LogOut, 
  User, 
  CheckCircle, 
  AlertCircle,
  PlusCircle,
  Image as ImageIcon,
  FileText,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'booking' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stato per l'autenticazione Admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Credenziali Admin
  const CREDENTIALS = {
    username: 'admin',
    password: 'pozzo2026'
  };

  // Stato dinamico del CMS Admin (News e Foto)
  const [newsList, setNewsList] = useState([
    { 
      id: 1, 
      title: 'Apertura Stagione Estiva 2026', 
      date: '1 Giugno 2026', 
      content: 'Vi aspettiamo per una nuova stagione immersi nel verde del Cilento tra natura e relax.',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
    }
  ]);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  const [galleryPhotos, setGalleryPhotos] = useState([
    { id: 1, title: 'Piazzole tra gli ulivi', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Tramonto sul Mare di Pisciotta', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Area Relax & Bar', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }
  ]);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === CREDENTIALS.username && adminPass === CREDENTIALS.password) {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Username o Password errati. Riprova.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser('');
    setAdminPass('');
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsContent) return;
    const newItem = {
      id: Date.now(),
      title: newNewsTitle,
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
      content: newNewsContent,
      imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80'
    };
    setNewsList([newItem, ...newsList]);
    setNewNewsTitle('');
    setNewNewsContent('');
  };

  const handleDeleteNews = (id: number) => {
    setNewsList(newsList.filter(item => item.id !== id));
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle || !newPhotoUrl) return;
    const newPhoto = {
      id: Date.now(),
      title: newPhotoTitle,
      url: newPhotoUrl
    };
    setGalleryPhotos([newPhoto, ...galleryPhotos]);
    setNewPhotoTitle('');
    setNewPhotoUrl('');
  };

  const handleDeletePhoto = (id: number) => {
    setGalleryPhotos(galleryPhotos.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col justify-between">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md text-stone-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('home')} 
            className="cursor-pointer flex items-center space-x-2"
          >
            <Trees className="w-8 h-8 text-emerald-400" />
            <div>
              <span className="text-xl font-bold tracking-wide block leading-none">Il Pozzo dei Desideri</span>
              <span className="text-xs text-emerald-300 font-light tracking-wider uppercase">Camping • Caprioli di Pisciotta</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('home')}
              className={`hover:text-emerald-300 transition ${activeTab === 'home' ? 'text-emerald-400 font-semibold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`hover:text-emerald-300 transition ${activeTab === 'services' ? 'text-emerald-400 font-semibold' : ''}`}
            >
              Servizi & Galleria
            </button>
            <button 
              onClick={() => setActiveTab('booking')}
              className={`hover:text-emerald-300 transition ${activeTab === 'booking' ? 'text-emerald-400 font-semibold' : ''}`}
            >
              Prenotazioni
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1 border border-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-900 transition ${activeTab === 'admin' ? 'bg-emerald-900 border-emerald-400 text-emerald-300' : ''}`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Area Admin</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-900 px-4 pt-2 pb-6 space-y-3 border-t border-emerald-800">
            <button 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium"
            >
              Servizi & Galleria
            </button>
            <button 
              onClick={() => { setActiveTab('booking'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium"
            >
              Prenotazioni
            </button>
            <button 
              onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-emerald-300 flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Area Admin</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* HOME VISTA */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section Immersiva con Foto Sfondo */}
            <section className="relative min-h-[85vh] flex items-center justify-center text-white text-center px-4 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition duration-1000"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')` 
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40"></div>
              
              <div className="max-w-4xl mx-auto relative z-10 space-y-6">
                <span className="bg-emerald-800/80 backdrop-blur-md text-emerald-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Caprioli di Pisciotta • Cilento</span>
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight drop-shadow-lg">
                  Un'Oasi tra Ulivi Secolari e Mare Cristallino
                </h1>
                <p className="text-lg md:text-2xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
                  Vivi l'autentica esperienza del campeggio nel Parco Nazionale del Cilento.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => setActiveTab('booking')}
                    className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-8 py-4 rounded-xl shadow-2xl transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Prenota la tua Vacanza</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition duration-200"
                  >
                    Esplora la Struttura
                  </button>
                </div>
              </div>
            </section>

            {/* Griglia Esperienze / Foto In Evidenza */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Vivi Il Pozzo dei Desideri</h2>
                <p className="text-stone-600 mt-2 text-lg">Natura, relax e il profumo unico della macchia mediterranea</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 h-96">
                  <img 
                    src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80" 
                    alt="Piazzole Ombreggiate" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
                    <Trees className="w-8 h-8 text-emerald-400 mb-2" />
                    <h3 className="text-2xl font-bold">Piazzole immerse nel Verde</h3>
                    <p className="text-stone-300 text-sm mt-1">Ampi spazi ombreggiati per tende e camper sotto gli olivi.</p>
                  </div>
                </div>

                <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 h-96">
                  <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
                    alt="Spiaggia e Mare" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
                    <Waves className="w-8 h-8 text-sky-400 mb-2" />
                    <h3 className="text-2xl font-bold">Spiagge di Caprioli</h3>
                    <p className="text-stone-300 text-sm mt-1">Mare cristallino raggiungibile a piedi o in pochi minuti.</p>
                  </div>
                </div>

                <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 h-96">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                    alt="Ristoro e Bar" 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
                    <Utensils className="w-8 h-8 text-amber-400 mb-2" />
                    <h3 className="text-2xl font-bold">Prodotti Tipici & Ristoro</h3>
                    <p className="text-stone-300 text-sm mt-1">Gusta la colazione e i piatti tradizionali cilentani.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* News & Comunicazioni Visive */}
            <section className="py-16 bg-emerald-950 text-white px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-emerald-900 pb-6">
                  <div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Aggiornamenti</span>
                    <h2 className="text-3xl font-extrabold mt-1">Novità dal Campeggio</h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {newsList.map(item => (
                    <div key={item.id} className="bg-emerald-900/60 border border-emerald-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
                      <img src={item.imageUrl} alt={item.title} className="w-full md:w-48 h-48 object-cover" />
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-semibold text-emerald-300">{item.date}</span>
                          <h3 className="text-xl font-bold mt-1 text-white">{item.title}</h3>
                          <p className="text-stone-300 text-sm mt-2">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SERVIZI E GALLERIA VISTA */}
        {activeTab === 'services' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-16">
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900">I Nostri Servizi</h2>
                <p className="text-stone-600 mt-2">Tutto il necessario per il tuo soggiorno ideale</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Trees, title: "Piazzole Tende/Camper", desc: "Spazi ampi, ombreggiati e con allaccio elettrico." },
                  { icon: Wifi, title: "Wi-Fi Gratuito", desc: "Connessione internet disponibile nelle aree comuni." },
                  { icon: Utensils, title: "Ristoro & Bar", desc: "Prodotti locali tipici cilentani e colazioni vista natura." },
                  { icon: Car, title: "Parcheggio Interno", desc: "Posto auto/moto custodito e riservato agli ospiti." },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <item.icon className="w-8 h-8 text-emerald-800 mb-3" />
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-stone-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Galleria Fotografica Dinamica */}
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-stone-900">Galleria Fotografica</h2>
                <p className="text-stone-600 mt-1">Scatti dal nostro campeggio</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryPhotos.map(photo => (
                  <div key={photo.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 group">
                    <img src={photo.url} alt={photo.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
                    <div className="p-4">
                      <h4 className="font-bold text-stone-800">{photo.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRENOTAZIONI VISTA */}
        {activeTab === 'booking' && (
          <div className="py-12 px-4 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200">
              <div className="text-center mb-8">
                <Calendar className="w-10 h-10 text-emerald-800 mx-auto mb-2" />
                <h2 className="text-2xl font-bold">Richiesta di Prenotazione</h2>
                <p className="text-sm text-stone-600">Compila il modulo per verificare la disponibilità</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Richiesta inviata con successo! Ti risponderemo a breve.'); }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Nome e Cognome</label>
                    <input type="text" required className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Email</label>
                    <input type="email" required className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="mario@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Data Check-in</label>
                    <input type="date" required className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Data Check-out</label>
                    <input type="date" required className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Tipologia Alloggio</label>
                  <select className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none">
                    <option>Piazzola Tenda</option>
                    <option>Piazzola Camper / Caravan</option>
                    <option>Bungalow / Struttura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Note o Richieste Speciali</label>
                  <textarea rows={3} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="Numero persone, animali domestici, ecc..."></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-800 transition">
                  Invia Richiesta
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ADMIN VISTA */}
        {activeTab === 'admin' && (
          <div>
            {!isAdminAuthenticated ? (
              <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
                  <div className="text-center mb-8">
                    <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-7 h-7 text-emerald-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900">Area Riservata Admin</h2>
                    <p className="text-stone-500 text-sm mt-1">Inserisci le credenziali per gestire news e foto</p>
                  </div>

                  {loginError && (
                    <div className="mb-5 p-3.5 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Username</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={adminUser}
                          onChange={(e) => setAdminUser(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none"
                          placeholder="admin"
                        />
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={adminPass}
                          onChange={(e) => setAdminPass(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none"
                          placeholder="pozzo2026"
                        />
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-900 text-white font-bold py-3 rounded-xl hover:bg-emerald-800 transition duration-200 mt-2"
                    >
                      Accedi al Pannello
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* DASHBOARD CMS ADMIN */
              <div className="py-10 px-4 max-w-7xl mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-stone-200 gap-4">
                  <div>
                    <span className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full mb-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Accesso Autorizzato</span>
                    </span>
                    <h1 className="text-2xl font-bold text-stone-900">CMS - Gestione Contenuti</h1>
                    <p className="text-xs text-stone-500">Utente: <strong>{adminUser}</strong></p>
                  </div>
                  
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center space-x-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 border border-stone-200 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Gestione News */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-6">
                    <div className="flex items-center space-x-2 border-b pb-4">
                      <FileText className="w-6 h-6 text-emerald-800" />
                      <h3 className="text-xl font-bold">Gestione News</h3>
                    </div>

                    <form onSubmit={handleAddNews} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Titolo News</label>
                        <input
                          type="text"
                          required
                          value={newNewsTitle}
                          onChange={(e) => setNewNewsTitle(e.target.value)}
                          className="w-full p-3 border rounded-lg border-stone-300 text-sm outline-none focus:ring-2 focus:ring-emerald-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Contenuto</label>
                        <textarea
                          required
                          rows={3}
                          value={newNewsContent}
                          onChange={(e) => setNewNewsContent(e.target.value)}
                          className="w-full p-3 border rounded-lg border-stone-300 text-sm outline-none focus:ring-2 focus:ring-emerald-800"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-900 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-800 transition flex items-center justify-center space-x-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Pubblica News</span>
                      </button>
                    </form>

                    <div className="space-y-3 pt-4 border-t">
                      {newsList.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                          <div>
                            <p className="font-bold text-sm text-stone-800">{item.title}</p>
                            <span className="text-xs text-stone-500">{item.date}</span>
                          </div>
                          <button onClick={() => handleDeleteNews(item.id)} className="text-red-500 hover:text-red-700 p-1.5">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gestione Foto */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-6">
                    <div className="flex items-center space-x-2 border-b pb-4">
                      <ImageIcon className="w-6 h-6 text-emerald-800" />
                      <h3 className="text-xl font-bold">Gestione Galleria</h3>
                    </div>

                    <form onSubmit={handleAddPhoto} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Titolo Foto</label>
                        <input
                          type="text"
                          required
                          value={newPhotoTitle}
                          onChange={(e) => setNewPhotoTitle(e.target.value)}
                          className="w-full p-3 border rounded-lg border-stone-300 text-sm outline-none focus:ring-2 focus:ring-emerald-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">URL Immagine</label>
                        <input
                          type="url"
                          required
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          className="w-full p-3 border rounded-lg border-stone-300 text-sm outline-none focus:ring-2 focus:ring-emerald-800"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-900 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-800 transition flex items-center justify-center space-x-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Aggiungi Foto</span>
                      </button>
                    </form>

                    <div className="space-y-3 pt-4 border-t">
                      {galleryPhotos.map(photo => (
                        <div key={photo.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                          <div className="flex items-center space-x-3">
                            <img src={photo.url} alt={photo.title} className="w-12 h-12 object-cover rounded-lg" />
                            <p className="font-bold text-sm text-stone-800">{photo.title}</p>
                          </div>
                          <button onClick={() => handleDeletePhoto(photo.id)} className="text-red-500 hover:text-red-700 p-1.5">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-4 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold text-base mb-3">Il Pozzo dei Desideri</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Camping & Relax a Caprioli di Pisciotta (SA). Sperimenta la bellezza del Cilento tra natura incontaminata e mare mozzafiato.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">Contatti & Posizione</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Caprioli di Pisciotta (SA), Salerno</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+39 0974 000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@ilpozzodeidesideri.it</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">Seguici</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Camping Il Pozzo dei Desideri. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}
