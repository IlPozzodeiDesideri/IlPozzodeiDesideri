import React, { useState, useEffect, useMemo } from 'react';
import {
  Sun, Moon, Shield, Phone, MessageCircle, MapPin, Calendar, Clock, Users,
  Car, CheckCircle, Star, Image, Video, Share2, ChevronRight, X, Menu,
  Plus, Trash2, Edit3, Download, Search, Filter, ArrowRight, Eye, RefreshCw,
  Compass, Award, Anchor, Sparkles, Heart, Info, Check, Lock, DollarSign,
  TrendingUp, FileText, Send, Facebook, Instagram, Youtube, Layers, Grid
} from 'lucide-react';

// --- INITIAL MOCK STATE & DATA ---
const INITIAL_COMPANY_DATA = {
  name: "Il Pozzo dei Desideri",
  slogan: "Il tuo angolo di paradiso nel cuore del Cilento",
  tagline: "Area Camping a soli 10 metri dal mare cristallino di Caprioli",
  businessName: "Il Pozzo dei Desideri S.r.l.s.",
  vatNumber: "IT01234567890",
  fiscalCode: "01234567890",
  reaNumber: "SA-987654",
  pec: "ilpozzodeidesideri@pec.it",
  sdiCode: "M5UXCR1",
  mainEmail: "info@ilpozzodeidesidericilento.it",
  bookingEmail: "prenotazioni@ilpozzodeidesidericilento.it",
  phone: "+39 0974 976000",
  mobile: "+39 347 1234567",
  whatsapp: "+393471234567",
  address: {
    street: "Via Saline, snc",
    locality: "Caprioli",
    city: "Pisciotta",
    province: "SA",
    zip: "84066",
    region: "Campania",
    country: "Italia"
  },
  gps: {
    lat: "40.0984",
    lng: "15.2281",
    googleMapsUrl: "https://maps.google.com/?q=Caprioli+Pisciotta"
  },
  socials: {
    facebook: "https://facebook.com/ilpozzodeidesideri",
    instagram: "https://instagram.com/ilpozzodeidesideri",
    tiktok: "https://tiktok.com/@ilpozzodeidesideri",
    youtube: "https://youtube.com/ilpozzodeidesideri"
  },
  hours: {
    season: "Aperto Tutto l'Anno",
    reception: "08:00 - 22:00",
    checkIn: "14:00 - 20:00",
    checkOut: "08:00 - 11:00"
  },
  heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  aboutText: "Immerso tra gli ulivi secolari di Caprioli di Pisciotta e affacciato sulle acque cristalline del Cilento, 'Il Pozzo dei Desideri' è il rifugio ideale per chi cerca una vacanza all'insegna di relax, natura incontaminata e mare. A soli 10 metri dalla spiaggia, offriamo un'esperienza unica tra accoglienza familiare e tutti i comfort della vita all'aria aperta."
};

const INITIAL_STAYS = [
  {
    id: 'caravan',
    title: 'Piazzola Auto Caravan',
    subtitle: 'Ampie piazzole ombreggiate per il tuo camper',
    priceLow: 25,
    priceMid: 40,
    priceHigh: 55,
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    description: 'Piazzole ampie e ben delimitate su fondo naturale, dotate di attacco luce a norma, scarico acque e copertura ombreggiante ad altissimo tasso di ventilazione.',
    features: ['Allaccio Elettrico 6A/10A', 'Scarico e Carico Acque', 'Wi-Fi Gratuito H24', 'Accesso Diretto Spiaggia (10m)', 'Servizi Igienici e Docce Calde', 'Area Barbecue Condivisa']
  },
  {
    id: 'roulotte',
    title: 'Piazzola Roulotte',
    subtitle: 'Spazio riservato e tranquillo per caravan e verande',
    priceLow: 22,
    priceMid: 36,
    priceHigh: 50,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    description: 'Soluzione ideale per chi viaggia in roulotte con famiglia. Zone fresche sotto la macchia mediterranea a pochi passi dai servizi principali e dal bagnasciuga.',
    features: ['Posto Auto Riservato', 'Allaccio Elettrico', 'Area Veranda Ammissibile', 'Lavanderia a Gettoni', 'Vicinanza Mare 10 Metri', 'Pet Friendly']
  },
  {
    id: 'tinyhouse',
    title: 'Tiny House su Ruote',
    subtitle: 'Comfort moderno nel rispetto della natura cilentana',
    priceLow: 65,
    priceMid: 95,
    priceHigh: 140,
    badge: '100% Omologate & Targate',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    description: 'Meravigliose abitative su ruote omologate, targate e trainabili. Finiture di pregio in legno ecologico, cucina completa, bagno privato con doccia e veranda in legno per cenare sotto le stelle.',
    features: ['Omologate & Targate', 'Aria Condizionata & Riscaldamento', 'Cucina Attrezzata + Frigo', 'Bagno Privato con Doccia', 'Veranda Esterna Arredata', 'TV Satellitare + Wi-Fi']
  }
];

const INITIAL_OFFERS = [
  { id: 1, title: 'Promo Giugno al Mare', discount: '-15%', validUntil: '30 Giugno', desc: 'Prenota almeno 5 notti in Tiny House o Piazzola Caravan entro maggio e ricevi uno sconto speciale!' },
  { id: 2, title: 'Settembre Relax Cilento', discount: '-20%', validUntil: '25 Settembre', desc: 'Goditi il mare ancora caldo e la tranquillità autunnale con la nostra tariffa promozionata.' }
];

const INITIAL_NEWS = [
  { id: 1, date: '2026-05-10', title: 'Apertura Stagione Estiva 2026!', category: 'Comunicazioni', summary: 'Siamo pronti ad accogliervi a soli 10 metri dalla spiaggia con tantissime novità e servizi rinnovati.', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 2, date: '2026-05-02', title: 'Alla scoperta di Pisciotta e dei borghi del Cilento', category: 'Territorio', summary: 'Consigli utili ed escursioni imperdibili a pochi minuti dal nostro camping.', mediaType: 'embed', embedType: 'instagram', embedUrl: 'https://instagram.com/p/mock' }
];

const INITIAL_GALLERY = [
  { id: 1, title: 'Spiaggia di fronte al Camping', category: 'Mare', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Tiny House su ruote in pineta', category: 'Tiny House', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Piazzole Camper ombreggiate', category: 'Sosta', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Tramonto mozzafiato da Caprioli', category: 'Mare', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Area Relax sotto gli ulivi', category: 'Relax', url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Roulotte e Veranda immersa nella natura', category: 'Sosta', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80' },
];

const INITIAL_BOOKINGS = [
  { id: 'REC-101', name: 'Marco Rossi', phone: '+39 333 1234567', email: 'marco.rossi@example.com', stayType: 'tinyhouse', arrival: '2026-07-10', departure: '2026-07-17', guests: 3, status: 'Confermata', date: '2026-05-01' },
  { id: 'REC-102', name: 'Laura Bianchi', phone: '+39 340 9876543', email: 'l.bianchi@example.com', stayType: 'caravan', arrival: '2026-08-01', departure: '2026-08-10', guests: 2, status: 'In Elaborazione', date: '2026-05-04' },
  { id: 'REC-103', name: 'Giuseppe Verdi', phone: '+39 328 5554433', email: 'g.verdi@example.com', stayType: 'roulotte', arrival: '2026-06-15', departure: '2026-06-22', guests: 4, status: 'Nuova', date: '2026-05-06' }
];

export default function App() {
  // Global States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('client'); // 'client' | 'admin'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); // Default true for instant demo access

  // Dynamic Data States (Admin CMS editable)
  const [company, setCompany] = useState(INITIAL_COMPANY_DATA);
  const [stays, setStays] = useState(INITIAL_STAYS);
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [newsList, setNewsList] = useState(INITIAL_NEWS);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // Client UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('Tutti');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    firstName: '', lastName: '', phone: '', whatsapp: '', email: '',
    arrival: '', departure: '', guests: 2, vehicles: 1, stayType: 'caravan', notes: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Admin UI States
  const [adminTab, setAdminTab] = useState('dashboard');
  const [bookingFilterStatus, setBookingFilterStatus] = useState('Tutti');
  const [searchBooking, setSearchBooking] = useState('');
  const [newNewsItem, setNewNewsItem] = useState({ title: '', category: 'Comunicazioni', summary: '', mediaType: 'image', mediaUrl: '' });
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', category: 'Mare', url: '' });

  // PWA Banner State
  const [showPwaPrompt, setShowPwaPrompt] = useState(true);

  // Toggle Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Prevent scroll when Lightbox is active
  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxImg]);

  // Estimated Price Calculation for Form
  const estimatedTotal = useMemo(() => {
    if (!bookingForm.arrival || !bookingForm.departure) return 0;
    const start = new Date(bookingForm.arrival);
    const end = new Date(bookingForm.departure);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const selectedStay = stays.find(s => s.id === bookingForm.stayType) || stays[0];
    return nights * selectedStay.priceMid;
  }, [bookingForm.arrival, bookingForm.departure, bookingForm.stayType, stays]);

  // Client Form Submission Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newBookingObj = {
      id: `REC-${Math.floor(100 + Math.random() * 900)}`,
      name: `${bookingForm.firstName} ${bookingForm.lastName}`,
      phone: bookingForm.phone || bookingForm.whatsapp,
      email: bookingForm.email,
      stayType: bookingForm.stayType,
      arrival: bookingForm.arrival,
      departure: bookingForm.departure,
      guests: bookingForm.guests,
      status: 'Nuova',
      date: new Date().toISOString().split('T')[0]
    };
    setBookings([newBookingObj, ...bookings]);
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingForm({
        firstName: '', lastName: '', phone: '', whatsapp: '', email: '',
        arrival: '', departure: '', guests: 2, vehicles: 1, stayType: 'caravan', notes: ''
      });
    }, 1000);
  };

  // Filtered Gallery Items
  const filteredGallery = useMemo(() => {
    if (activeGalleryFilter === 'Tutti') return gallery;
    return gallery.filter(item => item.category === activeGalleryFilter);
  }, [gallery, activeGalleryFilter]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-stone-50 text-stone-800'}`}>

      {/* SYSTEM HEADER BAR (PERSISTENT TOP TOGGLE FOR CLIENT/ADMIN VIEW) */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold tracking-wide uppercase text-[11px] text-stone-300">
            {company.name} • Caprioli di Pisciotta (SA)
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-md hover:bg-stone-800 text-stone-300 hover:text-white transition"
            title="Cambia Tema"
          >
            {isDarkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
          </button>

          <div className="h-4 w-[1px] bg-stone-700"></div>

          <button
            onClick={() => setViewMode(viewMode === 'client' ? 'admin' : 'client')}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
              viewMode === 'admin' 
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' 
                : 'bg-[#6C8A63] text-white hover:bg-[#355E3B]'
            }`}
          >
            {viewMode === 'client' ? (
              <>
                <Shield size={13} />
                <span>Area Admin CMS</span>
              </>
            ) : (
              <>
                <Eye size={13} />
                <span>Torna al Sito Web</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PWA PROMPT BANNER */}
      {showPwaPrompt && viewMode === 'client' && (
        <div className="bg-[#4F87A2] text-white text-xs px-4 py-2 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-amber-300 animate-bounce" />
            <span><strong>Installa l'App Pozzo dei Desideri</strong> per una navigazione ultra-veloce e offerte offline!</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowPwaPrompt(false)} className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded text-[11px] font-semibold">
              Installa
            </button>
            <button onClick={() => setShowPwaPrompt(false)} className="p-1 hover:text-stone-200">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FRONTEND PUBLIC CLIENT VIEW SECTION                                       */}
      {/* ========================================================================= */}
      {viewMode === 'client' && (
        <div className="flex flex-col min-h-screen">
          
          {/* NAVIGATION BAR */}
          <header className={`sticky top-8 z-40 transition-all ${isDarkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-stone-200'} backdrop-blur-md border-b shadow-sm`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              
              {/* Logo & Brand */}
              <a href="#home" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C8A63] to-[#355E3B] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                  <Anchor size={24} className="text-[#E6D5B8]" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-lg sm:text-xl text-[#355E3B] dark:text-emerald-400 leading-tight">
                    {company.name}
                  </h1>
                  <p className="text-[11px] text-stone-500 dark:text-gray-400 font-medium">
                    Caprioli di Pisciotta (SA) • 10m dal mare
                  </p>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm">
                <a href="#home" className="hover:text-[#6C8A63] transition">Home</a>
                <a href="#chi-siamo" className="hover:text-[#6C8A63] transition">Chi Siamo</a>
                <a href="#sosta" className="hover:text-[#6C8A63] transition">Tipologie Sosta</a>
                <a href="#tariffe" className="hover:text-[#6C8A63] transition">Tariffe & Promo</a>
                <a href="#galleria" className="hover:text-[#6C8A63] transition">Galleria</a>
                <a href="#news" className="hover:text-[#6C8A63] transition">News & Social</a>
                <a href="#dove-siamo" className="hover:text-[#6C8A63] transition">Dove Siamo</a>
              </nav>

              {/* CTA Booking Button */}
              <div className="hidden lg:flex items-center space-x-3">
                <a 
                  href="#prenota"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6C8A63] to-[#355E3B] text-white font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition flex items-center space-x-2"
                >
                  <Calendar size={16} />
                  <span>Prenota Ora</span>
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-gray-800"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileMenuOpen && (
              <div className={`lg:hidden px-4 pt-2 pb-6 border-b ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-stone-200'}`}>
                <div className="flex flex-col space-y-3 font-medium text-base">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">Home</a>
                  <a href="#chi-siamo" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">Chi Siamo</a>
                  <a href="#sosta" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">Tipologie Sosta</a>
                  <a href="#tariffe" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">Tariffe & Promo</a>
                  <a href="#galleria" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">Galleria</a>
                  <a href="#news" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">News & Social</a>
                  <a href="#dove-siamo" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-100 dark:border-gray-800">Dove Siamo</a>
                  <a 
                    href="#prenota" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-3 w-full py-3 rounded-xl bg-[#6C8A63] text-white font-semibold text-center flex items-center justify-center space-x-2"
                  >
                    <Calendar size={18} />
                    <span>Prenota la tua Vacanza</span>
                  </a>
                </div>
              </div>
            )}
          </header>

          {/* HERO SECTION FULLSCREEN */}
          <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image / Video Simulation */}
            <div className="absolute inset-0 z-0">
              <img 
                src={company.heroImage} 
                alt="Camping Il Pozzo dei Desideri Caprioli Pisciotta" 
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-16">
              
              {/* Badge 10 METRI DAL MARE */}
              <div className="inline-flex items-center space-x-2 bg-amber-500/90 backdrop-blur-md text-stone-950 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wider mb-6 shadow-xl animate-pulse">
                <Compass size={16} />
                <span>A soli 10 metri dal Mare di Caprioli (SA)</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-md">
                {company.name}
              </h1>

              <p className="font-serif italic text-xl sm:text-3xl text-[#E6D5B8] mb-6 max-w-3xl mx-auto drop-shadow">
                "{company.slogan}"
              </p>

              <p className="text-base sm:text-lg text-stone-200 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                Natura, mare cristallino, relax totale e ospitalità nel cuore del Parco Nazionale del Cilento.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#prenota"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6C8A63] hover:bg-[#355E3B] text-white font-bold text-base shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Calendar size={18} />
                  <span>Richiedi Disponibilità</span>
                </a>
                <a 
                  href="#chi-siamo"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/40 font-semibold text-base transition-all flex items-center justify-center space-x-2"
                >
                  <Info size={18} />
                  <span>Scopri la Struttura</span>
                </a>
              </div>
            </div>

            {/* Scroll Down Hint */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white/70 animate-bounce">
              <a href="#chi-siamo" className="flex flex-col items-center text-xs tracking-widest uppercase">
                <span className="mb-1">Scorri</span>
                <ChevronRight size={18} className="rotate-90" />
              </a>
            </div>
          </section>

          {/* CHI SIAMO & PERCHÉ SCEGLIERE NOI */}
          <section id="chi-siamo" className="py-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">Benvenuti in Cilento</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 text-stone-900 dark:text-white leading-tight">
                  La Tua Vacanza a un Passo dalle Onde
                </h2>
                <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed mb-6">
                  {company.aboutText}
                </p>
                <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed mb-6">
                  Che tu viaggi in camper, roulotte o desideri il lusso sostenibile delle nostre <strong>Tiny House su Ruote omologate</strong>, troverai un ambiente protetto, familiare e dotato di ogni comfort moderno.
                </p>

                <div className="p-4 rounded-2xl bg-[#E6D5B8]/30 dark:bg-gray-800 border border-[#E6D5B8] dark:border-gray-700 flex items-start space-x-3">
                  <Award size={28} className="text-[#6C8A63] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">Posizione Strategica Unica</h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      Situato a Caprioli di Pisciotta (SA), a pochi minuti da Palinuro, Marina di Camerota e la splendida Costa del Cilento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cards Vantaggi Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "10m Dal Mare", desc: "Accesso pedonale immediato alla spiaggia cristallina", icon: Anchor },
                  { title: "Natura Incontaminata", desc: "Immerso tra gli ulivi della macchia cilentana", icon: Sparkles },
                  { title: "Ospitalità Familiare", desc: "Assistenza cordiale e sempre a disposizione", icon: Heart },
                  { title: "Area Attrezzata", desc: "Luce, acqua, scarico e Wi-Fi inclusi", icon: CheckCircle },
                  { title: "Aperto Tutto l'Anno", desc: "Ideale per vacanze estive e weekend di relax", icon: Calendar },
                  { title: "Posizione Strategica", desc: "Vicinissimo alle più belle attrazioni del Cilento", icon: MapPin }
                ].map((v, idx) => {
                  const IconComp = v.icon;
                  return (
                    <div key={idx} className={`p-5 rounded-2xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                      <div className="w-10 h-10 rounded-xl bg-[#6C8A63]/10 text-[#6C8A63] flex items-center justify-center mb-3">
                        <IconComp size={20} />
                      </div>
                      <h3 className="font-bold text-stone-900 dark:text-white mb-1 text-sm">{v.title}</h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{v.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* TIPOLOGIE DI SOSTA */}
          <section id="sosta" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800/50' : 'bg-stone-100/70'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">Le Nostre Soluzioni</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                  Tipologie di Sosta & Alloggi
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mt-3 text-base">
                  Scegli lo spazio ideale per il tuo soggiorno a Caprioli di Pisciotta. Dalle ampie piazzole ombreggiate alle esclusive Tiny House su ruote.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stays.map((stay) => (
                  <div 
                    key={stay.id} 
                    className={`rounded-3xl overflow-hidden border shadow-lg flex flex-col transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-stone-200'}`}
                  >
                    {/* Stay Image & Badge */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={stay.image} 
                        alt={stay.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {stay.badge && (
                        <div className="absolute top-3 left-3 bg-[#355E3B] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          {stay.badge}
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-stone-900/80 text-amber-300 font-bold px-3 py-1 rounded-full text-xs backdrop-blur-md">
                        Da €{stay.priceLow}/notte
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white mb-1">
                          {stay.title}
                        </h3>
                        <p className="text-xs text-[#6C8A63] font-medium mb-3">{stay.subtitle}</p>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
                          {stay.description}
                        </p>

                        <div className="border-t border-stone-100 dark:border-gray-800 pt-4 mb-6">
                          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Servizi Inclusi:</h4>
                          <ul className="space-y-1.5">
                            {stay.features.map((feat, fIdx) => (
                              <li key={fIdx} className="text-xs text-stone-700 dark:text-stone-300 flex items-center space-x-2">
                                <Check size={14} className="text-[#6C8A63] shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a 
                        href="#prenota"
                        onClick={() => setBookingForm(prev => ({ ...prev, stayType: stay.id }))}
                        className="w-full py-3 rounded-xl bg-stone-900 hover:bg-[#355E3B] text-white text-xs font-bold text-center transition flex items-center justify-center space-x-2"
                      >
                        <Calendar size={14} />
                        <span>Richiedi Disponibilità</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TARIFFE & OFFERTE SPECIALI */}
          <section id="tariffe" className="py-20 px-4 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">Trasparenza & Valore</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                Tariffe Stagionali & Promozioni
              </h2>
            </div>

            {/* Stagioni Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { season: 'Bassa Stagione', period: 'Ottobre - Maggio', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
                { season: 'Media Stagione', period: 'Giugno & Settembre', color: 'bg-amber-50 text-amber-900 border-amber-200' },
                { season: 'Alta Stagione', period: 'Luglio & Agosto', color: 'bg-rose-50 text-rose-900 border-rose-200' },
              ].map((s, sIdx) => (
                <div key={sIdx} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-1">{s.season}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">{s.period}</p>
                  
                  <div className="space-y-3 border-t pt-4 border-stone-100 dark:border-gray-700">
                    {stays.map(stay => {
                      const price = sIdx === 0 ? stay.priceLow : sIdx === 1 ? stay.priceMid : stay.priceHigh;
                      return (
                        <div key={stay.id} className="flex justify-between items-center text-xs">
                          <span className="text-stone-600 dark:text-stone-300 font-medium">{stay.title}</span>
                          <span className="font-bold text-stone-900 dark:text-white">€{price}/giorno</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Offerte Speciali Banner */}
            {offers.length > 0 && (
              <div className="rounded-3xl bg-gradient-to-r from-[#355E3B] to-[#6C8A63] p-8 text-white shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-amber-400 text-stone-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                      <Sparkles size={14} />
                      <span>Offerte Last Minute</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold">{offers[0].title}</h3>
                    <p className="text-stone-200 text-sm mt-1 max-w-xl">{offers[0].desc}</p>
                  </div>
                  <div className="text-center md:text-right shrink-0">
                    <div className="text-4xl font-extrabold text-amber-300 mb-1">{offers[0].discount}</div>
                    <div className="text-xs text-stone-200 mb-4">Valida fino al {offers[0].validUntil}</div>
                    <a 
                      href="#prenota" 
                      className="px-6 py-3 rounded-full bg-white text-stone-900 font-bold text-xs hover:bg-stone-100 transition shadow-lg inline-block"
                    >
                      Approfitta Ora
                    </a>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SISTEMA PRENOTAZIONI ONLINE */}
          <section id="prenota" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-stone-100'}`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">Pianifica il tuo soggiorno</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                  Richiesta Prenotazione Online
                </h2>
                <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
                  Compila il modulo sottostante per ricevere una conferma immediata della disponibilità senza impegno.
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center">
                  <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-bold text-xl text-emerald-900 dark:text-emerald-200 mb-2">Richiesta Inviata con Successo!</h3>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm max-w-md mx-auto mb-6">
                    Abbiamo ricevuto la tua richiesta per <strong>{bookingForm.stayType}</strong>. Il team del Camping "Il Pozzo dei Desideri" ti risponderà su WhatsApp o Email entro poche ore.
                  </p>
                  <button 
                    onClick={() => setBookingSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#6C8A63] text-white font-bold text-xs hover:bg-[#355E3B] transition"
                  >
                    Invia Un'Altra Richiesta
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleBookingSubmit}
                  className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Nome *</label>
                      <input 
                        type="text" 
                        required
                        value={bookingForm.firstName}
                        onChange={e => setBookingForm({...bookingForm, firstName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                        placeholder="Es. Mario"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Cognome *</label>
                      <input 
                        type="text" 
                        required
                        value={bookingForm.lastName}
                        onChange={e => setBookingForm({...bookingForm, lastName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                        placeholder="Es. Rossi"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Telefono / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={bookingForm.phone}
                        onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                        placeholder="+39 333 0000000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Email *</label>
                      <input 
                        type="email" 
                        required
                        value={bookingForm.email}
                        onChange={e => setBookingForm({...bookingForm, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                        placeholder="mario@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Data Arrivo *</label>
                      <input 
                        type="date" 
                        required
                        value={bookingForm.arrival}
                        onChange={e => setBookingForm({...bookingForm, arrival: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Data Partenza *</label>
                      <input 
                        type="date" 
                        required
                        value={bookingForm.departure}
                        onChange={e => setBookingForm({...bookingForm, departure: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Tipologia Sosta *</label>
                      <select 
                        value={bookingForm.stayType}
                        onChange={e => setBookingForm({...bookingForm, stayType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-stone-50 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                      >
                        {stays.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Ospiti</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="10"
                          value={bookingForm.guests}
                          onChange={e => setBookingForm({...bookingForm, guests: parseInt(e.target.value) || 1})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Veicoli</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="4"
                          value={bookingForm.vehicles}
                          onChange={e => setBookingForm({...bookingForm, vehicles: parseInt(e.target.value) || 0})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase">Note / Richieste Particolari</label>
                    <textarea 
                      rows="3"
                      value={bookingForm.notes}
                      onChange={e => setBookingForm({...bookingForm, notes: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-gray-600 bg-transparent dark:text-white text-sm focus:ring-2 focus:ring-[#6C8A63] outline-none"
                      placeholder="Es. Richiesta piazzola vicino ai servizi, animaletto al seguito, ecc."
                    ></textarea>
                  </div>

                  {/* Estimation Calculation Banner */}
                  {estimatedTotal > 0 && (
                    <div className="p-4 rounded-xl bg-[#E6D5B8]/40 dark:bg-gray-700 border border-[#E6D5B8] flex justify-between items-center mb-6">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200">Stima Indicativa Soggiorno:</span>
                      <span className="text-lg font-extrabold text-[#355E3B] dark:text-emerald-400">~ €{estimatedTotal}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6C8A63] to-[#355E3B] text-white font-bold text-base shadow-lg hover:opacity-95 transition flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>Invia Richiesta Disponibilità</span>
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* GALLERY MULTIMEDIALE CON LIGHTBOX */}
          <section id="galleria" className="py-20 px-4 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">Scatti dal Paradiso</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                Galleria Fotografica
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {['Tutti', 'Mare', 'Sosta', 'Tiny House', 'Relax'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                    activeGalleryFilter === cat
                      ? 'bg-[#6C8A63] text-white shadow-md'
                      : 'bg-stone-200 dark:bg-gray-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredGallery.map((img) => (
                <div 
                  key={img.id}
                  onClick={() => setLightboxImg(img)}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                    <span className="text-xs uppercase font-bold text-amber-300">{img.category}</span>
                    <h4 className="font-semibold text-sm">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LIGHTBOX FULLSCREEN MODAL */}
          {lightboxImg && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <button 
                onClick={() => setLightboxImg(null)}
                className="absolute top-6 right-6 text-white hover:text-amber-400 p-2"
              >
                <X size={32} />
              </button>
              <div className="max-w-4xl max-h-[85vh] text-center">
                <img 
                  src={lightboxImg.url} 
                  alt={lightboxImg.title} 
                  className="max-w-full max-h-[75vh] object-contain rounded-xl mx-auto shadow-2xl mb-4"
                />
                <h3 className="text-white text-lg font-bold">{lightboxImg.title}</h3>
                <p className="text-amber-400 text-xs font-semibold uppercase">{lightboxImg.category}</p>
              </div>
            </div>
          )}

          {/* NEWS & SOCIAL MEDIA FEED */}
          <section id="news" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800/40' : 'bg-stone-100/70'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">Aggiornamenti & Social</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                  News, Eventi & Social Feed
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsList.map(news => (
                  <div key={news.id} className={`p-6 rounded-3xl border shadow-md ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-stone-200'}`}>
                    {news.mediaUrl && (
                      <img src={news.mediaUrl} alt={news.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                    )}
                    <div className="flex items-center space-x-3 text-xs text-stone-400 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#6C8A63]/20 text-[#6C8A63] font-bold">{news.category}</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{news.title}</h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">{news.summary}</p>
                    <a href={company.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#4F87A2] hover:underline">
                      <span>Vedi su Instagram</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MAPPA INTERATTIVA & CONTATTI */}
          <section id="dove-siamo" className="py-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#6C8A63] font-bold text-sm uppercase tracking-widest block mb-2">La Posizione</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mb-6">
                  Come Raggiungerci
                </h2>
                
                <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 mb-8">
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-[#6C8A63] shrink-0 mt-1" />
                    <div>
                      <strong className="text-stone-900 dark:text-white block">Indirizzo:</strong>
                      {company.address.street}, {company.address.locality}, {company.address.city} ({company.address.province}) - Costiera Cilentana
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-[#6C8A63] shrink-0" />
                    <div>
                      <strong className="text-stone-900 dark:text-white">Telefono:</strong> {company.phone} | {company.mobile}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle size={20} className="text-[#6C8A63] shrink-0" />
                    <div>
                      <strong className="text-stone-900 dark:text-white">WhatsApp Direct:</strong> {company.whatsapp}
                    </div>
                  </div>
                </div>

                {/* Google Reviews Card */}
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-amber-500 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <span className="font-bold text-stone-900 dark:text-white text-sm">4.9 / 5.0 stelle su Google</span>
                    <p className="text-xs text-stone-500">Basato su oltre 180 recensioni verificate</p>
                  </div>
                  <a 
                    href={company.gps.googleMapsUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-[#355E3B] transition"
                  >
                    Apri Mappa GPS
                  </a>
                </div>
              </div>

              {/* Map Embed Box */}
              <div className="h-96 rounded-3xl overflow-hidden border shadow-lg bg-stone-200 relative">
                <iframe
                  title="Mappa Camping Il Pozzo dei Desideri"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12170.838421869502!2d15.215!3d40.098!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b918b964344cd%3A0x808518cf08bf0!2sCaprioli%20SA!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                  className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>

          {/* FOOTER DINAMICO */}
          <footer className="mt-auto bg-stone-950 text-stone-400 py-16 px-4 border-t border-stone-800 text-xs">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              
              {/* Col 1 */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-4">{company.name}</h3>
                <p className="mb-4 text-stone-400 leading-relaxed">{company.tagline}</p>
                <div className="space-y-1 text-stone-500">
                  <p>{company.businessName}</p>
                  <p>P.IVA: {company.vatNumber} | C.F: {company.fiscalCode}</p>
                  <p>REA: {company.reaNumber} | SDI: {company.sdiCode}</p>
                </div>
              </div>

              {/* Col 2 */}
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Orari Reception</h4>
                <ul className="space-y-2">
                  <li>Stagione: <strong className="text-stone-200">{company.hours.season}</strong></li>
                  <li>Reception: <strong className="text-stone-200">{company.hours.reception}</strong></li>
                  <li>Check-In: <strong className="text-stone-200">{company.hours.checkIn}</strong></li>
                  <li>Check-Out: <strong className="text-stone-200">{company.hours.checkOut}</strong></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Contatti & Legali</h4>
                <ul className="space-y-2">
                  <li>Email: <a href={`mailto:${company.mainEmail}`} className="hover:text-white">{company.mainEmail}</a></li>
                  <li>PEC: <span className="text-stone-300">{company.pec}</span></li>
                  <li>Tel: <a href={`tel:${company.phone}`} className="hover:text-white">{company.phone}</a></li>
                  <li>WhatsApp: <a href={`https://wa.me/${company.whatsapp}`} className="hover:text-white">{company.whatsapp}</a></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Seguici sui Social</h4>
                <div className="flex space-x-3 mb-6">
                  <a href={company.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-[#6C8A63] hover:text-white transition">
                    <Facebook size={16} />
                  </a>
                  <a href={company.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-[#6C8A63] hover:text-white transition">
                    <Instagram size={16} />
                  </a>
                  <a href={company.socials.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-[#6C8A63] hover:text-white transition">
                    <Youtube size={16} />
                  </a>
                </div>
                <p className="text-stone-500">© {new Date().getFullYear()} {company.name}. Tutti i diritti riservati.</p>
              </div>
            </div>
          </footer>

          {/* MOBILE FLOATING QUICK ACTION BAR */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-stone-900/95 backdrop-blur-md text-white py-2.5 px-4 rounded-full shadow-2xl border border-stone-800 flex items-center justify-around">
            <a href={`tel:${company.phone}`} className="flex flex-col items-center text-[10px] text-stone-300 hover:text-amber-400">
              <Phone size={18} className="mb-0.5 text-amber-400" />
              <span>Chiama</span>
            </a>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="flex flex-col items-center text-[10px] text-stone-300 hover:text-emerald-400">
              <MessageCircle size={18} className="mb-0.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <a href="#prenota" className="flex flex-col items-center text-[10px] text-stone-300 hover:text-white">
              <div className="p-2 bg-[#6C8A63] rounded-full text-white -mt-6 border-2 border-stone-900 shadow-lg">
                <Calendar size={18} />
              </div>
              <span className="mt-0.5 font-bold">Prenota</span>
            </a>
            <a href={company.gps.googleMapsUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center text-[10px] text-stone-300 hover:text-sky-400">
              <MapPin size={18} className="mb-0.5 text-sky-400" />
              <span>GPS Mappa</span>
            </a>
          </div>

        </div>
      )}


      {/* ========================================================================= */}
      {/* PANNELLO AMMINISTRATIVO CMS (SUPER ADMIN BACKEND VIEW)                   */}
      {/* ========================================================================= */}
      {viewMode === 'admin' && (
        <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col md:flex-row">
          
          {/* Admin Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-stone-950 border-r border-stone-800 p-6 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                  <Shield size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white">Super Admin CMS</h2>
                  <p className="text-[10px] text-stone-400">Pannello di Controllo</p>
                </div>
              </div>

              <nav className="space-y-1.5 font-medium text-xs">
                {[
                  { id: 'dashboard', label: 'Dashboard Statistiche', icon: TrendingUp },
                  { id: 'bookings', label: 'Gestione Prenotazioni', icon: Calendar, badge: bookings.length },
                  { id: 'company', label: 'Dati Aziendali & Branding', icon: FileText },
                  { id: 'tariffs', label: 'Tariffe & Stagioni', icon: DollarSign },
                  { id: 'news', label: 'News & Social Feed', icon: Share2 },
                  { id: 'gallery', label: 'Galleria Foto / Video', icon: Image }
                ].map(item => {
                  const IconC = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between transition ${
                        adminTab === item.id 
                          ? 'bg-[#6C8A63] text-white font-bold' 
                          : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <IconC size={16} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-800 mt-6">
              <button 
                onClick={() => setViewMode('client')}
                className="w-full py-2.5 rounded-xl border border-stone-700 text-xs text-stone-300 hover:bg-stone-800 transition flex items-center justify-center space-x-2"
              >
                <Eye size={14} />
                <span>Anteprima Sito Web</span>
              </button>
            </div>
          </aside>

          {/* Admin Main Content View Area */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            
            {/* ADMIN DASHBOARD TAB */}
            {adminTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Panoramica Attività</h2>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Prenotazioni Totali', val: bookings.length, sub: 'Stagione 2026', icon: Calendar, color: 'text-emerald-400' },
                    { label: 'Nuove Richieste', val: bookings.filter(b => b.status === 'Nuova').length, sub: 'Da Gestire', icon: Sparkles, color: 'text-amber-400' },
                    { label: 'Stima Incassi', val: '€14.250', sub: 'Confermate', icon: DollarSign, color: 'text-sky-400' },
                    { label: 'Visite Mensili', val: '2.840', sub: '+18% vs mese prec.', icon: TrendingUp, color: 'text-purple-400' }
                  ].map((kpi, kIdx) => {
                    const KIcon = kpi.icon;
                    return (
                      <div key={kIdx} className="p-5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-stone-400">{kpi.label}</p>
                          <h3 className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.val}</h3>
                          <span className="text-[10px] text-stone-500">{kpi.sub}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-stone-300">
                          <KIcon size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Recent Bookings Table */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6">
                  <h3 className="font-bold text-sm text-white mb-4">Ultime Richieste Ricevute</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-stone-300">
                      <thead className="bg-stone-900 uppercase text-[10px] text-stone-400">
                        <tr>
                          <th className="p-3">ID</th>
                          <th className="p-3">Cliente</th>
                          <th className="p-3">Sosta</th>
                          <th className="p-3">Arrivo</th>
                          <th className="p-3">Stato</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-900">
                        {bookings.slice(0, 3).map(b => (
                          <tr key={b.id} className="hover:bg-stone-900/50">
                            <td className="p-3 font-mono font-bold text-amber-400">{b.id}</td>
                            <td className="p-3 font-semibold">{b.name}</td>
                            <td className="p-3 capitalize">{b.stayType}</td>
                            <td className="p-3">{b.arrival}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN GESTIONE PRENOTAZIONI TAB */}
            {adminTab === 'bookings' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Gestione Prenotazioni</h2>
                    <p className="text-xs text-stone-400 mt-1">Gestisci gli stati delle richieste ed esporta i dati aziendali</p>
                  </div>

                  {/* Export Options Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert("Esportazione CSV completata!")}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200 flex items-center space-x-1.5"
                    >
                      <Download size={14} />
                      <span>Export CSV</span>
                    </button>
                    <button 
                      onClick={() => alert("Esportazione PDF completata!")}
                      className="px-3 py-1.5 rounded-lg bg-[#6C8A63] hover:bg-[#355E3B] text-xs font-bold text-white flex items-center space-x-1.5"
                    >
                      <Download size={14} />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 mb-6 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center space-x-2 bg-stone-900 px-3 py-2 rounded-xl text-xs border border-stone-800 flex-1">
                    <Search size={14} className="text-stone-400" />
                    <input 
                      type="text" 
                      placeholder="Cerca cliente per nome o email..." 
                      value={searchBooking}
                      onChange={e => setSearchBooking(e.target.value)}
                      className="bg-transparent text-white outline-none w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter size={14} className="text-stone-400" />
                    <select 
                      value={bookingFilterStatus}
                      onChange={e => setBookingFilterStatus(e.target.value)}
                      className="bg-stone-900 text-xs text-white p-2 rounded-xl border border-stone-800 outline-none"
                    >
                      <option value="Tutti">Tutti gli Stati</option>
                      <option value="Nuova">Nuova</option>
                      <option value="In Elaborazione">In Elaborazione</option>
                      <option value="Confermata">Confermata</option>
                      <option value="Annullata">Annullata</option>
                    </select>
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead className="bg-stone-900 uppercase text-[10px] text-stone-400">
                      <tr>
                        <th className="p-4">Codice</th>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Contatti</th>
                        <th className="p-4">Date Soggiorno</th>
                        <th className="p-4">Tipologia</th>
                        <th className="p-4">Stato</th>
                        <th className="p-4 text-right">Azione</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900">
                      {bookings
                        .filter(b => bookingFilterStatus === 'Tutti' || b.status === bookingFilterStatus)
                        .filter(b => b.name.toLowerCase().includes(searchBooking.toLowerCase()))
                        .map(b => (
                          <tr key={b.id} className="hover:bg-stone-900/50">
                            <td className="p-4 font-mono font-bold text-amber-400">{b.id}</td>
                            <td className="p-4 font-semibold text-white">{b.name}</td>
                            <td className="p-4 text-[11px]">
                              <div>{b.phone}</div>
                              <div className="text-stone-500">{b.email}</div>
                            </td>
                            <td className="p-4 text-[11px]">
                              {b.arrival} ➔ {b.departure}
                            </td>
                            <td className="p-4 capitalize font-semibold">{b.stayType}</td>
                            <td className="p-4">
                              <select 
                                value={b.status}
                                onChange={(e) => {
                                  const updated = bookings.map(item => item.id === b.id ? { ...item, status: e.target.value } : item);
                                  setBookings(updated);
                                }}
                                className="bg-stone-900 text-[11px] font-bold px-2 py-1 rounded border border-stone-700 text-amber-300 outline-none"
                              >
                                <option value="Nuova">Nuova</option>
                                <option value="In Elaborazione">In Elaborazione</option>
                                <option value="Confermata">Confermata</option>
                                <option value="Annullata">Annullata</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => setBookings(bookings.filter(item => item.id !== b.id))}
                                className="p-1.5 hover:bg-rose-950 text-rose-400 rounded-lg transition"
                                title="Elimina"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADMIN GESTIONE DATI AZIENDALI & BRANDING TAB */}
            {adminTab === 'company' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Dati Aziendali & Branding</h2>
                
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-6 max-w-4xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Nome Attività</label>
                      <input 
                        type="text" 
                        value={company.name} 
                        onChange={e => setCompany({...company, name: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Ragione Sociale</label>
                      <input 
                        type="text" 
                        value={company.businessName} 
                        onChange={e => setCompany({...company, businessName: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Partita IVA</label>
                      <input 
                        type="text" 
                        value={company.vatNumber} 
                        onChange={e => setCompany({...company, vatNumber: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Codice Fiscale</label>
                      <input 
                        type="text" 
                        value={company.fiscalCode} 
                        onChange={e => setCompany({...company, fiscalCode: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Email Principale</label>
                      <input 
                        type="email" 
                        value={company.mainEmail} 
                        onChange={e => setCompany({...company, mainEmail: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">PEC</label>
                      <input 
                        type="email" 
                        value={company.pec} 
                        onChange={e => setCompany({...company, pec: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Telefono</label>
                      <input 
                        type="text" 
                        value={company.phone} 
                        onChange={e => setCompany({...company, phone: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">WhatsApp Direct</label>
                      <input 
                        type="text" 
                        value={company.whatsapp} 
                        onChange={e => setCompany({...company, whatsapp: e.target.value})}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Slogan Aziendale</label>
                    <input 
                      type="text" 
                      value={company.slogan} 
                      onChange={e => setCompany({...company, slogan: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1 font-bold uppercase">Descrizione Chi Siamo</label>
                    <textarea 
                      rows="4" 
                      value={company.aboutText} 
                      onChange={e => setCompany({...company, aboutText: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    ></textarea>
                  </div>

                  <button 
                    onClick={() => alert("Dati aggiornati con successo nel sistema!")}
                    className="px-6 py-3 rounded-xl bg-[#6C8A63] text-white font-bold text-xs hover:bg-[#355E3B] transition"
                  >
                    Salva Modifiche Aziendali
                  </button>
                </div>
              </div>
            )}

            {/* ADMIN GESTIONE TARIFFE TAB */}
            {adminTab === 'tariffs' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Gestione Tariffe & Stagionalità</h2>
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 max-w-4xl space-y-6">
                  {stays.map((stay, idx) => (
                    <div key={stay.id} className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <h4 className="font-bold text-sm text-white mb-3">{stay.title}</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] text-stone-400 uppercase font-bold mb-1">Bassa Stagione (€)</label>
                          <input 
                            type="number" 
                            value={stay.priceLow}
                            onChange={e => {
                              const copy = [...stays];
                              copy[idx].priceLow = parseInt(e.target.value) || 0;
                              setStays(copy);
                            }}
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-400 uppercase font-bold mb-1">Media Stagione (€)</label>
                          <input 
                            type="number" 
                            value={stay.priceMid}
                            onChange={e => {
                              const copy = [...stays];
                              copy[idx].priceMid = parseInt(e.target.value) || 0;
                              setStays(copy);
                            }}
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-400 uppercase font-bold mb-1">Alta Stagione (€)</label>
                          <input 
                            type="number" 
                            value={stay.priceHigh}
                            onChange={e => {
                              const copy = [...stays];
                              copy[idx].priceHigh = parseInt(e.target.value) || 0;
                              setStays(copy);
                            }}
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN NEWS & SOCIAL TAB */}
            {adminTab === 'news' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Pubblica News & Social Embed</h2>
                
                {/* Form Nuova News */}
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 mb-8 max-w-3xl">
                  <h3 className="font-bold text-sm text-white mb-4">Aggiungi Nuovo Articolo / Post</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Titolo Notizia / Comunicato"
                      value={newNewsItem.title}
                      onChange={e => setNewNewsItem({...newNewsItem, title: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    />
                    <textarea 
                      rows="3" 
                      placeholder="Sommario / Contenuto..."
                      value={newNewsItem.summary}
                      onChange={e => setNewNewsItem({...newNewsItem, summary: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    ></textarea>
                    <input 
                      type="text" 
                      placeholder="URL Immagine o Link Social (Instagram/YouTube)"
                      value={newNewsItem.mediaUrl}
                      onChange={e => setNewNewsItem({...newNewsItem, mediaUrl: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    />
                    <button 
                      onClick={() => {
                        if (!newNewsItem.title) return;
                        setNewsList([{ id: Date.now(), date: new Date().toISOString().split('T')[0], ...newNewsItem }, ...newsList]);
                        setNewNewsItem({ title: '', category: 'Comunicazioni', summary: '', mediaType: 'image', mediaUrl: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#6C8A63] text-white font-bold text-xs hover:bg-[#355E3B] transition"
                    >
                      Pubblica Subito
                    </button>
                  </div>
                </div>

                {/* News Active List */}
                <div className="space-y-3 max-w-3xl">
                  {newsList.map(n => (
                    <div key={n.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex justify-between items-center text-xs">
                      <div>
                        <h4 className="font-bold text-white">{n.title}</h4>
                        <p className="text-stone-400 text-[11px]">{n.date} • {n.category}</p>
                      </div>
                      <button 
                        onClick={() => setNewsList(newsList.filter(item => item.id !== n.id))}
                        className="p-2 text-rose-400 hover:bg-rose-950 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN GALLERIA FOTO TAB */}
            {adminTab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Gestione Galleria Fotografica</h2>
                
                {/* Upload Box Simulation */}
                <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 mb-8 max-w-3xl">
                  <h3 className="font-bold text-sm text-white mb-4">Carica Nuova Immagine</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Titolo Foto"
                      value={newGalleryItem.title}
                      onChange={e => setNewGalleryItem({...newGalleryItem, title: e.target.value})}
                      className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    />
                    <select 
                      value={newGalleryItem.category}
                      onChange={e => setNewGalleryItem({...newGalleryItem, category: e.target.value})}
                      className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none"
                    >
                      <option value="Mare">Mare</option>
                      <option value="Sosta">Sosta</option>
                      <option value="Tiny House">Tiny House</option>
                      <option value="Relax">Relax</option>
                    </select>
                  </div>
                  <input 
                    type="text" 
                    placeholder="URL Immagine (Unsplash/CDN)"
                    value={newGalleryItem.url}
                    onChange={e => setNewGalleryItem({...newGalleryItem, url: e.target.value})}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white outline-none mb-4"
                  />
                  <button 
                    onClick={() => {
                      if (!newGalleryItem.url) return;
                      setGallery([{ id: Date.now(), ...newGalleryItem }, ...gallery]);
                      setNewGalleryItem({ title: '', category: 'Mare', url: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#6C8A63] text-white font-bold text-xs hover:bg-[#355E3B] transition"
                  >
                    Aggiungi alla Galleria
                  </button>
                </div>

                {/* Gallery List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {gallery.map(img => (
                    <div key={img.id} className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 group">
                      <img src={img.url} alt={img.title} className="w-full h-32 object-cover" />
                      <button 
                        onClick={() => setGallery(gallery.filter(g => g.id !== img.id))}
                        className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}