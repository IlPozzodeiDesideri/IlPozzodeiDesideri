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
  PlayCircle
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

  // Form Foto Admin
  const [photoTargetSection, setPhotoTargetSection] = useState<'hero' | 'homeGrid' | 'servicesGallery'>('hero');
  const [adminPhotoTitle, setAdminPhotoTitle] = useState('');
  const [adminPhotoUrl, setAdminPhotoUrl] = useState('');

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

  const handleAddPhotoAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPhotoTitle || !adminPhotoUrl) return;
    const newPhotoObj = { id: Date.now(), title: adminPhotoTitle, url: adminPhotoUrl };

    if (photoTargetSection === 'hero') setHeroImages([newPhotoObj, ...heroImages]);
    else if (photoTargetSection === 'homeGrid') setHomeGridPhotos([newPhotoObj, ...homeGridPhotos]);
    else if (photoTargetSection === 'servicesGallery') setServicesGallery([newPhotoObj, ...servicesGallery]);

    setAdminPhotoTitle('');
    setAdminPhotoUrl('');
    alert('Foto salvata con successo!');
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

  // Estrattore URL
  const extractUrl = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : null;
  };

  // Convertitore per Player Video (YouTube, Vimeo, MP4)
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
            <button onClick={() => { setActiveTab('admin'); setMobileMenu
