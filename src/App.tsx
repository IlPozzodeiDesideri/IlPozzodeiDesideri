import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Trees, 
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
  CheckCircle, 
  PlusCircle,
  Image as ImageIcon,
  FileText,
  Trash2,
  Sparkles,
  ArrowRight,
  Eye,
  Printer,
  ExternalLink,
  PlayCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Zap,
  Droplets,
  RefreshCw,
  Settings,
  Navigation,
  Waves
} from 'lucide-react';

// =========================================================================
//  CONFIGURAZIONE SUPABASE
// =========================================================================
const SUPABASE_URL = 'https://jyyfdibfzqitdnmxpsdj.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_3G95fXQNlPt51fze4ztDBQ_2lmKygNP';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'booking' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dati Società e Impostazioni Struttura
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Il Pozzo dei Desideri',
    subTitle: 'Camping • Caprioli di Pisciotta',
    heroTitle: 'Il Pozzo dei Desideri',
    heroTagline: "Un'Oasi tra Ulivi Secolari e Mare Cristallino",
    description: 'Camping & Relax a Caprioli di Pisciotta (SA). Sperimenta la bellezza del Cilento tra natura incontaminata e mare mozzafiato.',
    address: 'Caprioli di Pisciotta (SA), Salerno',
    phone: '+39 0974 000000',
    email: 'info@ilpozzodeidesideri.it',
    instagramUrl: '#',
    facebookUrl: '#',
    latitude: 40.074218,
    longitude: 15.271916
  });

  // Autenticazione Admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const CREDENTIALS = {
    username: 'admin',
    password: 'pozzo2026'
  };

  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });

  // News & Prenotazioni
  const [newsList, setNewsList] = useState<any[]>([
    { 
      id: 1, 
      title: 'Guarda il video del nostro campeggio!', 
      date: '1 Giugno 2026', 
      content: 'Scopri la bellezza delle nostre piazzole e delle spiagge di Caprioli nel video ufficiale: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
    }
  ]);
  const [bookingsList, setBookingsList] = useState<any[]>([]);

  // Foto Locali per la Galleria
  const [heroImages, setHeroImages] = useState([
    { id: 1, title: 'Tramonto Cilento (Principale)', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80' }
  ]);

  const [homeGridPhotos, setHomeGridPhotos] = useState([
    { id: 1, title: 'Piazzole Camper tra gli Ulivi', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Spiagge di Caprioli', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Bar & Prodotti Tipici', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }
  ]);

  const [servicesGallery, setServicesGallery] = useState([
    { id: 1, title: 'Panoramica Campeggio', url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Costa Cilentana', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }
  ]);

  const servicesList = [
    { icon: Car, title: "Piazzole Camper", desc: "Spazi ampi dedicati alla sosta camper." },
    { icon: Zap, title: "Energia Elettrica", desc: "Allaccio elettrico disponibile direttamente in piazzola." },
    { icon: Droplets, title: "Acqua in Piazzola", desc: "Punti di erogazione acqua potabile comodi e vicini." },
    { icon: RefreshCw, title: "Carico & Scarico", desc: "Area attrezzata per camper per carico e scarico acque." },
    { icon: Utensils, title: "Bar & Ristoro", desc: "Colazioni, bevande e prodotti tipici della tradizione cilentana." },
    { icon: Wifi, title: "Wi-Fi Gratuito", desc: "Connessione internet senza fili a disposizione degli ospiti." }
  ];

  // Caricamento Dati Iniziali dal Database Cloud Supabase
  useEffect(() => {
    fetchCloudData();
  }, []);

  const fetchCloudData = async () => {
    try {
      const { data: settingsData } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (settingsData) {
        const formattedSettings = {
          siteName: settingsData.site_name || siteSettings.siteName,
          subTitle: settingsData.sub_title || siteSettings.subTitle,
          heroTitle: settingsData.hero_title || siteSettings.heroTitle,
          heroTagline: settingsData.hero_tagline || siteSettings.heroTagline,
          description: settingsData.description || siteSettings.description,
          address: settingsData.address || siteSettings.address,
          phone: settingsData.phone || siteSettings.phone,
          email: settingsData.email || siteSettings.email,
          instagramUrl: settingsData.instagram_url || siteSettings.instagramUrl,
          facebookUrl: settingsData.facebook_url || siteSettings.facebookUrl,
          latitude: settingsData.latitude || siteSettings.latitude,
          longitude: settingsData.longitude || siteSettings.longitude
        };
        setSiteSettings(formattedSettings);
        setSettingsForm(formattedSettings);
      }

      const { data: bookingsData } = await supabase.from('bookings').select('*').order('id', { ascending: false });
      if (bookingsData && bookingsData.length > 0) {
        setBookingsList(bookingsData.map(b => ({
          id: b.id,
          name: b.name,
          email: b.email,
          phone: b.phone,
          checkIn: b.check_in,
          checkOut: b.check_out,
          accommodation: b.accommodation,
          notes: b.notes,
          createdAt: b.created_at
        })));
      }

      const { data: newsData } = await supabase.from('news').select('*').order('id', { ascending: false });
      if (newsData && newsData.length > 0) {
        setNewsList(newsData.map(n => ({
          id: n.id,
          title: n.title,
          date: n.date,
          content: n.content,
          imageUrl: n.image_url
        })));
      }
    } catch (error) {
      console.log('Sincronizzazione Supabase attiva');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiteSettings({ ...settingsForm });

    const { error } = await supabase.from('site_settings').upsert({
      id: 1,
      site_name: settingsForm.siteName,
      sub_title: settingsForm.subTitle,
      hero_title: settingsForm.heroTitle,
      hero_tagline: settingsForm.heroTagline,
      description: settingsForm.description,
      address: settingsForm.address,
      phone: settingsForm.phone,
      email: settingsForm.email,
      instagram_url: settingsForm.instagramUrl,
      facebook_url: settingsForm.facebookUrl,
      latitude: settingsForm.latitude,
      longitude: settingsForm.longitude
    });

    if (!error) {
      alert('Dati aggiornati con successo per tutti i visitatori!');
    } else {
      alert('Errore nel salvataggio. Riprova tra poco.');
    }
  };

  // Form Cliente Prenotazione
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [accommodationType, setAccommodationType] = useState('Piazzola Camper');
  const [clientNotes, setClientNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
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
      check_in: checkInDate,
      check_out: checkOutDate,
      accommodation: accommodationType,
      notes: clientNotes || 'Nessuna nota aggiuntiva',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    await supabase.from('bookings').insert([newBooking]);
    fetchCloudData();

    setBookingSuccess(true);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setCheckInDate('');
    setCheckOutDate('');
    setClientNotes('');
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  // Modale Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxAlbum, setLightboxAlbum] = useState<{ id: number; title: string; url: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (album: { id: number; title: string; url: string }[], index: number) => {
    setLightboxAlbum(album);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => setLightboxIndex((prev) => (prev + 1) % lightboxAlbum.length);
  const prevLightboxImage = () => setLightboxIndex((prev) => (prev - 1 + lightboxAlbum.length) % lightboxAlbum.length);

  // News Gestione
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsContent) return;
    const newItem = {
      id: Date.now(),
      title: newNewsTitle,
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
      content: newNewsContent,
      image_url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80'
    };
    await supabase.from('news').insert([newItem]);
    fetchCloudData();
    setNewNewsTitle('');
    setNewNewsContent('');
  };

  const handleDeleteNews = async (id: number) => {
    await supabase.from('news').delete().eq('id', id);
    fetchCloudData();
  };

  const handleDeleteBooking = async (id: number) => {
    await supabase.from('bookings').delete().eq('id', id);
    fetchCloudData();
  };

  // Gestione File Foto Locali
  const [photoTargetSection, setPhotoTargetSection] = useState<'hero' | 'homeGrid' | 'servicesGallery'>('hero');
  const [adminPhotoTitle, setAdminPhotoTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadError, setUploadError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === CREDENTIALS.username && adminPass === CREDENTIALS.password) {
      setIsAdminAuthenticated(true);
      setSettingsForm({ ...siteSettings });
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
    if (!selectedFiles || selectedFiles.length === 0) return;

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
            alert(`${newPhotosArray.length} foto caricate per la sessione!`);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const extractUrl = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : null;
  };

  const getEmbedVideoUrl = (url: string | null) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) return `https://www.youtube.com/embed/${url.split('v=')[1]?.split('&')[0]}`;
    if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]?.split('?')[0]}`;
    return null;
  };

  const mapsUrl = `https://www.google.com/maps?q=${siteSettings.latitude},${siteSettings.longitude}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${siteSettings.latitude},${siteSettings.longitude}&z=15&output=embed`;
  const [selectedBookingForPdf, setSelectedBookingForPdf] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md text-stone-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div onClick={() => setActiveTab('home')} className="cursor-pointer flex items-center space-x-2">
            <Trees className="w-8 h-8 text-emerald-400" />
            <div>
              <span className="text-xl font-bold tracking-wide block leading-none">{siteSettings.siteName}</span>
              <span className="text-xs text-emerald-300 font-light tracking-wider uppercase">{siteSettings.subTitle}</span>
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

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-stone-100">
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

      {/* Main Dynamic Content */}
      <main className="flex-grow">
        {/* HOME VISTA */}
        {activeTab === 'home' && (
          <div>
            <section className="relative min-h-[85vh] flex items-center justify-center text-white text-center px-4 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ backgroundImage: `url('${heroImages[0]?.url}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40"></div>

              <div className="max-w-4xl mx-auto relative z-10 space-y-6">
                <span className="bg-emerald-800/80 text-emerald-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{siteSettings.subTitle}</span>
                </span>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-amber-400">
                  {siteSettings.heroTitle}
                </h1>

                <p className="text-xl sm:text-3xl font-light text-stone-100">
                  {siteSettings.heroTagline}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => setActiveTab('booking')} className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-8 py-4 rounded-xl shadow-2xl flex items-center justify-center space-x-2">
                    <span>Prenota la tua Vacanza</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveTab('services')} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition">
                    Esplora i Servizi
                  </button>
                </div>
              </div>
            </section>

            {/* Banner Servizi Rapidi */}
            <section className="bg-emerald-900 text-stone-100 py-6 px-4 border-y border-emerald-800">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                {servicesList.slice(0, 5).map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center p-2">
                    <s.icon className="w-6 h-6 text-emerald-400 mb-1" />
                    <span className="text-xs font-bold text-stone-200">{s.title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Griglia Foto Home con Ingrandimento */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">Vivi {siteSettings.siteName}</h2>
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
                          {idx === 0 && <Car className="w-8 h-8 text-emerald-400 mb-2" />}
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

            {/* MAPPA GOOGLE MAPS */}
            <section className="py-16 bg-stone-100 border-t border-stone-200 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <MapPin className="w-10 h-10 text-emerald-800 mx-auto mb-2" />
                  <h2 className="text-3xl font-bold text-stone-900">Dove Siamo</h2>
                  <p className="text-stone-600 mt-1">{siteSettings.address}</p>
                </div>

                <div className="bg-white p-4 rounded-3xl shadow-lg border border-stone-200 overflow-hidden space-y-4">
                  <iframe src={mapsEmbedUrl} className="w-full h-96 rounded-2xl border-0" allowFullScreen loading="lazy"></iframe>
                  <div className="flex flex-col sm:flex-row justify-between items-center p-2 gap-4">
                    <span className="text-xs text-stone-600">Coordinate: {siteSettings.latitude}, {siteSettings.longitude}</span>
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-900 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center space-x-2">
                      <Navigation className="w-4 h-4" />
                      <span>Apri su Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* News & Video */}
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

        {/* SERVIZI E GALLERIA */}
        {activeTab === 'services' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-16">
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900">I Nostri Servizi</h2>
                <p className="text-stone-600 mt-2">Tutto il necessario per la tua sosta camper e il tuo soggiorno in relax</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesList.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start space-x-4">
                    <div className="p-3 bg-emerald-50 rounded-xl">
                      <item.icon className="w-7 h-7 text-emerald-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-stone-900">{item.title}</h4>
                      <p className="text-stone-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                <p className="text-sm text-stone-600">Compila tutti i campi per verificare la disponibilità</p>
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
                    <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-3 border rounded-lg outline-none" placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Email *</label>
                    <input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full p-3 border rounded-lg outline-none" placeholder="mario@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Telefono *</label>
                  <input type="tel" required value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full p-3 border rounded-lg outline-none" placeholder="+39 333 1234567" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Check-in *</label>
                    <input type="date" required value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-3 border rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Check-out *</label>
                    <input type="date" required value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-3 border rounded-lg outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Tipologia Alloggio</label>
                  <select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} className="w-full p-3 border rounded-lg outline-none">
                    <option>Piazzola Camper</option>
                    <option>Bungalow / Struttura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Note o Richieste Speciali</label>
                  <textarea rows={3} value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} className="w-full p-3 border rounded-lg outline-none" placeholder="Numero persone, animali domestici, ecc..."></textarea>
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
                <form onSubmit={handleAdminLogin} className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200 space-y-4">
                  <div className="text-center mb-4">
                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Lock className="w-6 h-6 text-emerald-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900">Area Admin</h2>
                  </div>
                  {loginError && <p className="text-xs text-red-600 text-center">{loginError}</p>}
                  <input type="text" required value={adminUser} onChange={(e) => setAdminUser(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Username" />
                  <input type="password" required value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Password" />
                  <button type="submit" className="w-full bg-emerald-900 text-white font-bold py-3 rounded-xl">Accedi</button>
                </form>
              </div>
            ) : (
              <div className="py-10 px-4 max-w-7xl mx-auto space-y-10">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border">
                  <div>
                    <h1 className="text-2xl font-bold text-stone-900">CMS - Pannello Admin</h1>
                    <p className="text-xs text-stone-500">Gestisci i dati della società e le prenotazioni in tempo reale.</p>
                  </div>
                  <button onClick={handleAdminLogout} className="flex items-center space-x-2 bg-stone-100 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>

                {/* MODULO DATI SOCIETÀ */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2 border-b pb-3">
                    <Settings className="w-6 h-6 text-emerald-800" />
                    <span>Dati Società & Home Page (Cloud)</span>
                  </h3>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase mb-1">Nome Struttura</label>
                        <input type="text" value={settingsForm.siteName} onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })} className="w-full p-2.5 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase mb-1">Sottotitolo Header</label>
                        <input type="text" value={settingsForm.subTitle} onChange={(e) => setSettingsForm({ ...settingsForm, subTitle: e.target.value })} className="w-full p-2.5 border rounded-lg text-sm" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase mb-1">Telefono</label>
                        <input type="text" value={settingsForm.phone} onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })} className="w-full p-2.5 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase mb-1">Email</label>
                        <input type="email" value={settingsForm.email} onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })} className="w-full p-2.5 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase mb-1">Indirizzo</label>
                        <input type="text" value={settingsForm.address} onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })} className="w-full p-2.5 border rounded-lg text-sm" />
                      </div>
                    </div>

                    <button type="submit" className="bg-emerald-900 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-emerald-800 transition">
                      Salva per Tutti i Visitatori
                    </button>
                  </form>
                </div>

                {/* MODULO IMPORT FOTO */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2 border-b pb-3">
                    <ImageIcon className="w-6 h-6 text-emerald-800" />
                    <span>Importa Foto da Dispositivo Locale (Max 5 per volta)</span>
                  </h3>

                  {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}

                  <form onSubmit={handleAddLocalPhotosAdmin} className="grid md:grid-cols-4 gap-4 items-end bg-stone-50 p-4 rounded-xl border">
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-1">Sezione</label>
                      <select value={photoTargetSection} onChange={(e: any) => setPhotoTargetSection(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-white">
                        <option value="hero">1. Home Hero (Sfondo)</option>
                        <option value="homeGrid">2. Home Grid (Griglia)</option>
                        <option value="servicesGallery">3. Servizi & Galleria</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase mb-1">Titolo/Descrizione</label>
                      <input type="text" value={adminPhotoTitle} onChange={(e) => setAdminPhotoTitle(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-white" placeholder="Es. Foto Campeggio" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase mb-1">Seleziona File (Max 5)</label>
                      <input type="file" accept="image/*" multiple onChange={handleLocalFileChange} className="w-full text-xs text-stone-600 file:mr-2 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800" />
                    </div>

                    <button type="submit" className="bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-emerald-800 transition flex items-center justify-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Importa Foto</span>
                    </button>
                  </form>
                </div>

                {/* MODULO PRENOTAZIONI */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2 border-b pb-3">
                    <Calendar className="w-6 h-6 text-emerald-800" />
                    <span>Gestione Prenotazioni ({bookingsList.length})</span>
                  </h3>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {bookingsList.length === 0 ? (
                        <p className="text-xs text-stone-500">Nessuna prenotazione al momento.</p>
                      ) : (
                        bookingsList.map(b => (
                          <div key={b.id} className="flex justify-between items-center p-3.5 bg-stone-50 rounded-xl border">
                            <div>
                              <p className="font-bold text-sm">{b.name} <span className="text-xs text-stone-500">({b.accommodation})</span></p>
                              <p className="text-xs text-stone-600">Tel: <strong>{b.phone}</strong></p>
                              <span className="text-xs text-emerald-800 font-medium">Dal {b.checkIn} al {b.checkOut}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button onClick={() => setSelectedBookingForPdf(b)} className="bg-emerald-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-800 transition flex items-center space-x-1">
                                <Eye className="w-3.5 h-3.5" />
                                <span>PDF</span>
                              </button>
                              <button onClick={() => handleDeleteBooking(b.id)} className="text-red-500 hover:text-red-700 p-1.5">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Scheda PDF */}
                    <div className="bg-stone-50 p-6 rounded-2xl border">
                      <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h4 className="font-bold text-sm">Modulo Riepilogo Prenotazione</h4>
                        {selectedBookingForPdf && (
                          <button onClick={() => window.print()} className="bg-stone-800 text-white text-xs px-2.5 py-1 rounded hover:bg-stone-900 transition flex items-center space-x-1">
                            <Printer className="w-3.5 h-3.5" />
                            <span>Stampa</span>
                          </button>
                        )}
                      </div>

                      {selectedBookingForPdf ? (
                        <div className="bg-white p-6 rounded-xl border space-y-4 text-xs">
                          <div className="text-center border-b pb-3">
                            <h5 className="font-bold text-emerald-900 text-sm">{siteSettings.siteName.toUpperCase()}</h5>
                            <p className="text-[10px] text-stone-500">{siteSettings.address}</p>
                          </div>
                          <p><strong>Cliente:</strong> {selectedBookingForPdf.name}</p>
                          <p><strong>Email:</strong> {selectedBookingForPdf.email}</p>
                          <p><strong>Telefono:</strong> {selectedBookingForPdf.phone}</p>
                          <p><strong>Soggiorno:</strong> Dal {selectedBookingForPdf.checkIn} al {selectedBookingForPdf.checkOut}</p>
                          <p><strong>Note:</strong> {selectedBookingForPdf.notes}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 text-center py-8">Seleziona una prenotazione per vedere il riepilogo.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* MODULO NEWS */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2 border-b pb-3">
                    <FileText className="w-6 h-6 text-emerald-800" />
                    <span>Pubblica News / Video</span>
                  </h3>

                  <form onSubmit={handleAddNews} className="space-y-4">
                    <input type="text" required value={newNewsTitle} onChange={(e) => setNewNewsTitle(e.target.value)} className="w-full p-3 border rounded-lg text-sm" placeholder="Titolo della news" />
                    <textarea required rows={3} value={newNewsContent} onChange={(e) => setNewNewsContent(e.target.value)} className="w-full p-3 border rounded-lg text-sm" placeholder="Testo news o link video (YouTube/Vimeo)..." />
                    <button type="submit" className="bg-emerald-900 text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-emerald-800 transition">
                      Pubblica News
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL LIGHTBOX */}
      {lightboxOpen && lightboxAlbum.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition">
            <X className="w-6 h-6" />
          </button>
          {lightboxAlbum.length > 1 && (
            <button onClick={prevLightboxImage} className="absolute left-4 text-white bg-white/10 p-3 rounded-full">
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img src={lightboxAlbum[lightboxIndex]?.url} alt={lightboxAlbum[lightboxIndex]?.title} className="max-w-full max-h-[75vh] object-contain rounded-2xl" />
            <p className="mt-4 text-white font-bold">{lightboxAlbum[lightboxIndex]?.title}</p>
          </div>
          {lightboxAlbum.length > 1 && (
            <button onClick={nextLightboxImage} className="absolute right-4 text-white bg-white/10 p-3 rounded-full">
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-4 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold text-base mb-3">{siteSettings.siteName}</h4>
            <p className="text-stone-400 text-xs leading-relaxed">{siteSettings.description}</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">Contatti & Posizione</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">Seguici</h4>
            <div className="flex space-x-4">
              <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {siteSettings.siteName}. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}
