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
  ArrowRight,
  Eye,
  Printer,
  ExternalLink,
  Share2,
  PlayCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'booking' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Autenticazione Admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const CREDENTIALS = {
    username: 'admin',
    password: 'pozzo2026'
  };

  // Immagini Hero Home
  const [heroImages, setHeroImages] = useState([
    { id: 1, title: 'Tramonto Cilento (Principale)', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80' }
  ]);

  // Griglia Home (3 Card)
  const [homeGridPhotos, setHomeGridPhotos] = useState([
    { id: 1, title: 'Piazzole tra gli ulivi', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Spiagge di Caprioli', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Prodotti Tipici & Ristoro', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }
  ]);

  // Galleria Servizi
  const [servicesGallery, setServicesGallery] = useState([
    { id: 1, title: 'Panoramica Campeggio', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Costa Cilentana', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }
  ]);

  // Stato Lightbox / Ingrandimento Foto & Album Sfogliabile
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxAlbum, setLightboxAlbum] = useState<{ id: number; title: string; url: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (album: { id: number; title: string; url: string }[], index: number) => {
    setLightboxAlbum(album);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxAlbum.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxAlbum.length) % lightboxAlbum.length);
  };

  // News con supporto Video Embed e Link Social
  const [newsList, setNewsList] = useState([
    { 
      id: 1, 
      title: 'Guarda il video del nostro campeggio!', 
      date: '1 Giugno 2026', 
      content: 'Scopri la bellezza delle nostre piazzole e delle spiagge di Caprioli nel video ufficiale: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
    }
  ]);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  // Prenotazioni
  const [bookingsList, setBookingsList] = useState([
    {
      id: 1718000000000,
      name: 'Mario Rossi',
      email: 'mario.rossi@example.com',
      phone: '+39 333 1234567',
      checkIn: '2026-07-01',
      checkOut: '2026-07-15',
      accommodation: 'Piazzola Tenda',
      notes: 'Richiesta piazzola vicina ai servizi igienici, arrivo previsto ore 14:00.',
      createdAt: '2026-06-01 10:30'
    }
  ]);

  // Form Cliente
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [accommodationType, setAccommodationType] = useState('Piazzola Tenda');
  const [clientNotes, setClientNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // PDF selezionato
  const [selectedBookingForPdf, setSelectedBookingForPdf] = useState<any | null>(null);

  // Form Foto Admin per Import Locale
  const [photoTargetSection, setPhotoTargetSection] = useState<'hero' | 'homeGrid' | 'servicesGallery'>('hero');
  const [adminPhotoTitle, setAdminPhotoTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadError, setUploadError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === CREDENTIALS.username && adminPass === CREDENTIALS.password) {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenziali non valide. Riprova.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser('');
    setAdminPass('');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) {
      alert('Il numero di telefono è obbligatorio!');
      return;
    }
    const newBooking = {
      id: Date.now(),
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      accommodation: accommodationType,
      notes: clientNotes || 'Nessuna nota aggiuntiva',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setBookingsList([newBooking, ...bookingsList]);
    setBookingSuccess(true);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setCheckInDate('');
    setCheckOutDate('');
    setClientNotes('');
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 5) {
        setUploadError('Puoi selezionare un massimo di 5 foto per volta.');
        setSelectedFiles(null);
        e.target.value = '';
      } else {
        setUploadError('');
        setSelectedFiles(e.target.files);
      }
    }
  };

  const handleAddLocalPhotosAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadError('Seleziona almeno un file di immagine dal tuo dispositivo.');
      return;
    }

    const newPhotosArray: { id: number; title: string; url: string }[] = [];

    Array.from(selectedFiles).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const photoObj = {
            id: Date.now() + index,
            title: adminPhotoTitle ? `${adminPhotoTitle} (${index + 1})` : file.name,
            url: uploadEvent.target.result as string
          };
          newPhotosArray.push(photoObj);

          if (newPhotosArray.length === selectedFiles.length) {
            if (photoTargetSection === 'hero') setHeroImages([...newPhotosArray, ...heroImages]);
            else if (photoTargetSection === 'homeGrid') setHomeGridPhotos([...newPhotosArray, ...homeGridPhotos]);
            else if (photoTargetSection === 'servicesGallery') setServicesGallery([...newPhotosArray, ...servicesGallery]);

            setAdminPhotoTitle('');
            setSelectedFiles(null);
            setUploadError('');
            alert(`${newPhotosArray.length} foto caricate con successo!`);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeletePhoto = (id: number, section: 'hero' | 'homeGrid' | 'servicesGallery') => {
    if (section === 'hero') setHeroImages(heroImages.filter(p => p.id !== id));
    if (section === 'homeGrid') setHomeGridPhotos(homeGridPhotos.filter(p => p.id !== id));
    if (section === 'servicesGallery') setServicesGallery(servicesGallery.filter(p => p.id !== id));
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

  const handleDeleteBooking = (id: number) => {
    setBookingsList(bookingsList.filter(b => b.id !== id));
    if (selectedBookingForPdf?.id === id) setSelectedBookingForPdf(null);
  };

  const extractUrl = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : null;
  };

  const getEmbedVideoUrl = (url: string | null) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md text-stone-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div onClick={() => setActiveTab('home')} className="cursor-pointer flex items-center space-x-2">
            <Trees className="w-8 h-8 text-emerald-400" />
            <div>
              <span className="text-xl font-bold tracking-wide block leading-none">Il Pozzo dei Desideri</span>
              <span className="text-xs text-emerald-300 font-light tracking-wider uppercase">Camping • Caprioli di Pisciotta</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button onClick={() => setActiveTab('home')} className={`hover:text-emerald-300 transition ${activeTab === 'home' ? 'text-emerald-400 font-semibold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('services')} className={`hover:text-emerald-300 transition ${activeTab === 'services' ? 'text-emerald-400 font-semibold' : ''}`}>Servizi & Galleria</button>
            <button onClick={() => setActiveTab('booking')} className={`hover:text-emerald-300 transition ${activeTab === 'booking' ? 'text-emerald-400 font-semibold' : ''}`}>Prenotazioni</button>
            <button onClick={() => setActiveTab('admin')} className={`flex items-center space-x-1 border border-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-900 transition ${activeTab === 'admin' ? 'bg-emerald-900 border-emerald-400 text-emerald-300' : ''}`}>
              <Lock className="w-3.5 h-3.5" />
              <span>Area Admin</span>
            </button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-stone-100 focus:outline-none">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-900 px-4 pt-2 pb-6 space-y-3 border-t border-emerald-800">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Home</button>
            <button onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Servizi & Galleria</button>
            <button onClick={() => { setActiveTab('booking'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Prenotazioni</button>
            <button onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-emerald-300 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Area Admin</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* HOME VISTA */}
        {activeTab === 'home' && (
          <div>
            {/* Hero con Ingrandimento al Clic */}
            <section className="relative min-h-[85vh] flex items-center justify-center text-white text-center px-4 overflow-hidden group">
              <div 
                onClick={() => openLightbox(heroImages, 0)}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition duration-1000 cursor-pointer"
                style={{ backgroundImage: `url('${heroImages[0]?.url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40 pointer-events-none"></div>

              <button 
                onClick={() => openLightbox(heroImages, 0)}
                className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition z-20"
                title="Ingrandisci Sfondo"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              
              <div className="max-w-4xl mx-auto relative z-10 space-y-6 pointer-events-auto">
                <span className="bg-emerald-800/80 backdrop-blur-md text-emerald-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Camping • Caprioli di Pisciotta</span>
                </span>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-tight tracking-tight drop-shadow-2xl text-amber-400">
                  Il Pozzo dei Desideri
                </h1>

                <p className="text-xl sm:text-3xl md:text-4xl font-light text-stone-100 drop-shadow-lg">
                  Un'Oasi tra Ulivi Secolari e Mare Cristallino
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => setActiveTab('booking')} className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-8 py-4 rounded-xl shadow-2xl transition flex items-center justify-center space-x-2">
                    <span>Prenota la tua Vacanza</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveTab('services')} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition">
                    Esplora la Struttura
                  </button>
                </div>
              </div>
            </section>

            {/* Griglia Foto Home con Ingrandimento */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Vivi Il Pozzo dei Desideri</h2>
                <p className="text-stone-600 mt-2 text-lg">Natura, relax e il profumo unico della macchia mediterranea (clicca su ogni foto per ingrandirla)</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {homeGridPhotos.map((photo, idx) => (
                  <div 
                    key={photo.id || idx} 
                    onClick={() => openLightbox(homeGridPhotos, idx)}
                    className="group relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 h-96 cursor-pointer"
                  >
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent p-6 flex flex-col justify-end text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          {idx === 0 && <Trees className="w-8 h-8 text-emerald-400 mb-2" />}
                          {idx === 1 && <Waves className="w-8 h-8 text-sky-400 mb-2" />}
                          {idx >= 2 && <Utensils className="w-8 h-8 text-amber-400 mb-2" />}
                          <h3 className="text-2xl font-bold">{photo.title}</h3>
                        </div>
                        <Maximize2 className="w-5 h-5 text-stone-300 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* News */}
            <section className="py-16 bg-emerald-950 text-white px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-emerald-900 pb-6">
                  <div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Aggiornamenti & Video</span>
                    <h2 className="text-3xl font-extrabold mt-1">Novità dal Campeggio</h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {newsList.map(item => {
                    const rawUrl = extractUrl(item.content);
                    const embedVideoUrl = getEmbedVideoUrl(rawUrl);

                    return (
                      <div key={item.id} className="bg-emerald-900/60 border border-emerald-800 rounded-2xl overflow-hidden flex flex-col">
                        {embedVideoUrl ? (
                          <div className="w-full h-64 bg-black relative">
                            <iframe 
                              src={embedVideoUrl} 
                              title={item.title} 
                              className="w-full h-full border-0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
                        )}

                        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                          <div>
                            <span className="text-xs font-semibold text-emerald-300">{item.date}</span>
                            <h3 className="text-xl font-bold mt-1 text-white">{item.title}</h3>
                            <p className="text-stone-300 text-sm mt-2 leading-relaxed">
                              {item.content.replace(rawUrl || '', '')}
                            </p>
                          </div>

                          {rawUrl && (
                            <div className="pt-3 border-t border-emerald-800">
                              <a
                                href={rawUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-md"
                              >
                                <PlayCircle className="w-4 h-4" />
                                <span>Apri Post / Video Ufficiale</span>
                                <ExternalLink className="w-3.5 h-3.5 ml-1" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SERVIZI E GALLERIA CON SFOGLIA ALBUM */}
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

            {/* Galleria Fotografica con Ingrandimento ed Album Sfogliabile */}
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-stone-900">Galleria Fotografica</h2>
                <p className="text-stone-600 mt-1">Clicca su qualsiasi foto per ingrandirla e sfogliare l'album completo</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesGallery.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    onClick={() => openLightbox(servicesGallery, index)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 group cursor-pointer relative"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="bg-white/90 text-stone-900 font-semibold px-4 py-2 rounded-full text-xs flex items-center space-x-2">
                          <Maximize2 className="w-4 h-4" />
                          <span>Ingrandisci Foto</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-stone-800">{photo.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRENOTAZIONI */}
        {activeTab === 'booking' && (
          <div className="py-12 px-4 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200">
              <div className="text-center mb-8">
                <Calendar className="w-10 h-10 text-emerald-800 mx-auto mb-2" />
                <h2 className="text-2xl font-bold">Richiesta di Prenotazione</h2>
                <p className="text-sm text-stone-600">Compila tutti i campi obbligatori per verificare la disponibilità</p>
              </div>

              {bookingSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-800 text-sm rounded flex items-center space-x-2 font-medium">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Richiesta inviata con successo!</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Nome e Cognome *</label>
                    <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Email *</label>
                    <input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="mario@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Numero di Telefono *</label>
                  <div className="relative">
                    <input type="tel" required value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="+39 333 1234567" />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Data Check-in *</label>
                    <input type="date" required value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Data Check-out *</label>
                    <input type="date" required value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Tipologia Alloggio</label>
                  <select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none">
                    <option>Piazzola Tenda</option>
                    <option>Piazzola Camper / Caravan</option>
                    <option>Bungalow / Struttura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Note o Richieste Speciali</label>
                  <textarea rows={3} value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="Numero persone, animali domestici, ecc..."></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-800 transition">
                  Invia Richiesta di Prenotazione
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
                    <p className="text-stone-500 text-sm mt-1">Inserisci le credenziali di accesso</p>
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
                        <input type="text" required value={adminUser} onChange={(e) => setAdminUser(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="Nome utente" />
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Password</label>
                      <div className="relative">
                        <input type="password" required value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 outline-none" placeholder="••••••••" />
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-3 rounded-xl hover:bg-emerald-800 transition duration-200 mt-2">
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
                    <h1 className="text-2xl font-bold text-stone-900">CMS - Pannello di Controllo</h1>
                    <p className="text-xs text-stone-500">Importazione foto locali (max 5), News/Video e Prenotazioni PDF.</p>
                  </div>
                  
                  <button onClick={handleAdminLogout} className="flex items-center space-x-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 border border-stone-200 transition">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>

                {/* Gestione Foto da Locale */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-6">
                  <div className="flex items-center space-x-2 border-b pb-4">
                    <ImageIcon className="w-6 h-6 text-emerald-800" />
                    <h3 className="text-xl font-bold">Importa Foto da Dispositivo Locale (Max 5 per volta)</h3>
                  </div>

                  {uploadError && (
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded">
                      {uploadError}
                    </div>
                  )}

                  <form onSubmit={handleAddLocalPhotosAdmin} className="grid md:grid-cols-4 gap-4 items-end bg-stone-50 p-4 rounded-xl border">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Sezione Destinazione</label>
                      <select value={photoTargetSection} onChange={(e: any) => setPhotoTargetSection(e.target.value)} className="w-full p-2.5 border rounded-lg border-stone-300 text-sm bg-white">
                        <option value="hero">1. Home Hero (Sfondo)</option>
                        <option value="homeGrid">2. Home Grid (Griglia)</option>
                        <option value="servicesGallery">3. Servizi & Galleria</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Titolo/Descrizione Immagini</label>
                      <input type="text" value={adminPhotoTitle} onChange={(e) => setAdminPhotoTitle(e.target.value)} className="w-full p-2.5 border rounded-lg border-stone-300 text-sm bg-white" placeholder="Es. Foto Campeggio" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Seleziona File (Max 5)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleLocalFileChange} 
                        className="w-full text-xs text-stone-600 file:mr-2 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200" 
                      />
                    </div>

                    <button type="submit" className="bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-emerald-800 transition flex items-center justify-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Importa Foto</span>
                    </button>
                  </form>

                  <div className="grid md:grid-cols-3 gap-6 pt-4 border-t">
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-stone-800">1. Home Hero ({heroImages.length})</h4>
                      {heroImages.map(img => (
                        <div key={img.id} className="flex justify-between items-center p-2.5 bg-stone-50 rounded-xl border">
                          <div className="flex items-center space-x-2 truncate">
                            <img src={img.url} alt={img.title} className="w-10 h-10 object-cover rounded" />
                            <span className="text-xs font-medium truncate">{img.title}</span>
                          </div>
                          {heroImages.length > 1 && (
                            <button onClick={() => handleDeletePhoto(img.id, 'hero')} className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-stone-800">2. Home Grid ({homeGridPhotos.length})</h4>
                      {homeGridPhotos.map(img => (
                        <div key={img.id} className="flex justify-between items-center p-2.5 bg-stone-50 rounded-xl border">
                          <div className="flex items-center space-x-2 truncate">
                            <img src={img.url} alt={img.title} className="w-10 h-10 object-cover rounded" />
                            <span className="text-xs font-medium truncate">{img.title}</span>
                          </div>
                          <button onClick={() => handleDeletePhoto(img.id, 'homeGrid')} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-stone-800">3. Servizi & Galleria ({servicesGallery.length})</h4>
                      {servicesGallery.map(img => (
                        <div key={img.id} className="flex justify-between items-center p-2.5 bg-stone-50 rounded-xl border">
                          <div className="flex items-center space-x-2 truncate">
                            <img src={img.url} alt={img.title} className="w-10 h-10 object-cover rounded" />
                            <span className="text-xs font-medium truncate">{img.title}</span>
                          </div>
                          <button onClick={() => handleDeletePhoto(img.id, 'servicesGallery')} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gestione Prenotazioni & PDF */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-6">
                  <div className="flex items-center space-x-2 border-b pb-4">
                    <Calendar className="w-6 h-6 text-emerald-800" />
                    <h3 className="text-xl font-bold">Gestione Prenotazioni & Modulo PDF</h3>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-stone-700">Elenco Richieste Ricevute ({bookingsList.length})</h4>
                      {bookingsList.length === 0 ? (
                        <p className="text-xs text-stone-500">Nessuna prenotazione ricevuta al momento.</p>
                      ) : (
                        bookingsList.map(b => (
                          <div key={b.id} className="flex justify-between items-center p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                            <div>
                              <p className="font-bold text-sm text-stone-800">{b.name} <span className="text-xs font-normal text-stone-500">({b.accommodation})</span></p>
                              <p className="text-xs text-stone-600">Tel: <strong>{b.phone}</strong></p>
                              <span className="text-xs text-emerald-800 font-medium">Dal {b.checkIn} al {b.checkOut}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button onClick={() => setSelectedBookingForPdf(b)} className="flex items-center space-x-1 bg-emerald-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-800 transition">
                                <Eye className="w-3.5 h-3.5" />
                                <span>Apri PDF</span>
                              </button>
                              <button onClick={() => handleDeleteBooking(b.id)} className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-300 relative">
                      <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-emerald-800" />
                          <h4 className="font-bold text-stone-900 text-sm">Modulo Riepilogo Prenotazione (PDF)</h4>
                        </div>
                        {selectedBookingForPdf && (
                          <button onClick={() => window.print()} className="flex items-center space-x-1 bg-stone-800 text-white text-xs px-2.5 py-1 rounded hover:bg-stone-900 transition">
                            <Printer className="w-3.5 h-3.5" />
                            <span>Stampa / Salva PDF</span>
                          </button>
                        )}
                      </div>

                      {selectedBookingForPdf ? (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4 text-sm">
                          <div className="text-center border-b pb-3">
                            <h5 className="font-bold text-emerald-900 text-base">CAMPEGGIO "IL POZZO DEI DESIDERI"</h5>
                            <p className="text-xs text-stone-500">Caprioli di Pisciotta (SA) • Scheda Prenotazione Ufficiale</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                            <p><strong>ID Pratica:</strong> #{selectedBookingForPdf.id}</p>
                            <p><strong>Data Ricezione:</strong> {selectedBookingForPdf.createdAt}</p>
                          </div>

                          <div className="space-y-2 pt-2 border-t text-xs">
                            <p><strong>Nominativo Cliente:</strong> {selectedBookingForPdf.name}</p>
                            <p><strong>Indirizzo Email:</strong> {selectedBookingForPdf.email}</p>
                            <p><strong>Recapito Telefonico:</strong> <span className="text-emerald-900 font-bold">{selectedBookingForPdf.phone}</span></p>
                            <p><strong>Tipologia Alloggio:</strong> {selectedBookingForPdf.accommodation}</p>
                            <p><strong>Periodo Soggiorno:</strong> Dal <span className="text-emerald-800 font-bold">{selectedBookingForPdf.checkIn}</span> al <span className="text-emerald-800 font-bold">{selectedBookingForPdf.checkOut}</span></p>
                          </div>

                          <div className="pt-2 border-t">
                            <strong className="text-xs text-stone-700 block mb-1">Note e Richieste Speciali:</strong>
                            <p className="text-xs bg-stone-50 p-3 rounded border text-stone-700">{selectedBookingForPdf.notes}</p>
                          </div>

                          <div className="text-center pt-4 border-t text-[10px] text-stone-400">
                            Documento generato digitalmente dal gestionale web - Il Pozzo dei Desideri
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 flex flex-col items-center justify-center text-stone-400 text-center text-xs space-y-2">
                          <FileText className="w-10 h-10 stroke-1" />
                          <p>Clicca sul pulsante <strong>"Apri PDF"</strong> per visualizzare il modulo.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gestione News */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-6">
                  <div className="flex items-center space-x-2 border-b pb-4">
                    <FileText className="w-6 h-6 text-emerald-800" />
                    <h3 className="text-xl font-bold">Gestione News & Video Social</h3>
                  </div>

                  <form onSubmit={handleAddNews} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Titolo News</label>
                      <input type="text" required value={newNewsTitle} onChange={(e) => setNewNewsTitle(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 text-sm outline-none focus:ring-2 focus:ring-emerald-800" placeholder="Es. Guarda il nostro video su YouTube!" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Contenuto (Incolla il testo e il link del video/social)</label>
                      <textarea required rows={3} value={newNewsContent} onChange={(e) => setNewNewsContent(e.target.value)} className="w-full p-3 border rounded-lg border-stone-300 text-sm outline-none focus:ring-2 focus:ring-emerald-800" placeholder="Descrizione del video o del post + link completo (es. https://www.youtube.com/watch?v=...)" />
                    </div>
                    <button type="submit" className="w-full bg-emerald-900 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-800 transition flex items-center justify-center space-x-2">
                      <PlusCircle className="w-4 h-4" />
                      <span>Pubblica News / Video</span>
                    </button>
                  </form>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-semibold text-sm text-stone-700">News Attive ({newsList.length})</h4>
                    {newsList.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                        <div className="truncate max-w-lg">
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
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL LIGHTBOX - INGRANDIMENTO & SFOGLIA ALBUM */}
      {lightboxOpen && lightboxAlbum.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Freccia Indietro */}
          {lightboxAlbum.length > 1 && (
            <button 
              onClick={prevLightboxImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Contenitore Immagine Ingrandita */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img 
              src={lightboxAlbum[lightboxIndex]?.url} 
              alt={lightboxAlbum[lightboxIndex]?.title} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{lightboxAlbum[lightboxIndex]?.title}</h3>
              {lightboxAlbum.length > 1 && (
                <p className="text-xs text-stone-400 mt-1">
                  Foto {lightboxIndex + 1} di {lightboxAlbum.length}
                </p>
              )}
            </div>
          </div>

          {/* Freccia Avanti */}
          {lightboxAlbum.length > 1 && (
            <button 
              onClick={nextLightboxImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      )}

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
