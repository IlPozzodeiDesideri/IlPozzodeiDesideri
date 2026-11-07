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
  ShieldCheck, 
  Menu, 
  X, 
  Utensils, 
  Wifi, 
  Car, 
  Sparkles, 
  Lock, 
  LogOut, 
  User, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'booking' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stato per l'autenticazione Admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Credenziali Admin (modificabili a piacere)
  const CREDENTIALS = {
    username: 'admin',
    password: 'pozzo2026'
  };

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

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col justify-between">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 bg-emerald-950 text-stone-100 shadow-md">
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
              Servizi
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
              Servizi
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
            {/* Hero Section */}
            <section className="relative bg-emerald-900 text-white py-24 px-4 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="max-w-4xl mx-auto relative z-10">
                <span className="bg-emerald-800/80 text-emerald-200 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4">
                  Cilento • Mare & Natura
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  La tua oasi di relax a Caprioli di Pisciotta
                </h1>
                <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl mx-auto">
                  Immerso nella macchia mediterranea a due passi dalle spiagge cristalline del Cilento.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => setActiveTab('booking')}
                    className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200"
                  >
                    Prenota Subito
                  </button>
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-xl backdrop-blur-sm transition duration-200"
                  >
                    Scopri i Servizi
                  </button>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trees className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Natura Incontaminata</h3>
                  <p className="text-stone-600 text-sm">Piazzole ombreggiate immerse negli olivi secolari del Parco Nazionale del Cilento.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center">
                  <div className="w-12 h-12 bg-sky-100 text-sky-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Waves className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">A due passi dal Mare</h3>
                  <p className="text-stone-600 text-sm">Spiagge dorate e acque trasparenti facilmente raggiungibili in pochi minuti.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sun className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Relax & Ospitalità</h3>
                  <p className="text-stone-600 text-sm">Un'atmosfera familiare pensata per garantire pace, pulizia e spensieratezza.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SERVIZI VISTA */}
        {activeTab === 'services' && (
          <div className="py-12 px-4 max-w-7xl mx-auto">
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

        {/* ADMIN VISTA (PROTECTION & DASHBOARD) */}
        {activeTab === 'admin' && (
          <div>
            {!isAdminAuthenticated ? (
              /* FORM LOGIN ADMIN */
              <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
                  <div className="text-center mb-8">
                    <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-7 h-7 text-emerald-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900">Area Riservata Admin</h2>
                    <p className="text-stone-500 text-sm mt-1">Inserisci le credenziali per accedere al gestionale</p>
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
                          placeholder="Inserisci username"
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
                          placeholder="Inserisci password"
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
              /* DASHBOARD GESTIONALE ADMIN */
              <div className="py-10 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-stone-200 gap-4">
                  <div>
                    <span className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full mb-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Autenticato</span>
                    </span>
                    <h1 className="text-2xl font-bold text-stone-900">Pannello Gestione Campeggio</h1>
                    <p className="text-xs text-stone-500">Utente connesso: <strong>{adminUser}</strong></p>
                  </div>
                  
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center space-x-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 border border-stone-200 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="font-bold text-lg mb-2 text-stone-800">Prenotazioni In Arrivo</h3>
                    <p className="text-3xl font-extrabold text-emerald-800">12</p>
                    <p className="text-xs text-stone-500 mt-1">Richieste confermate per questa settimana</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="font-bold text-lg mb-2 text-stone-800">Piazzole Libere</h3>
                    <p className="text-3xl font-extrabold text-amber-600">8 / 25</p>
                    <p className="text-xs text-stone-500 mt-1">Disponibilità attuale in struttura</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="font-bold text-lg mb-2 text-stone-800">Messaggi Clienti</h3>
                    <p className="text-3xl font-extrabold text-sky-700">3</p>
                    <p className="text-xs text-stone-500 mt-1">Richieste d'informazione da leggere</p>
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
