import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import NewsStories from "./pages/NewsStories";
import RecentProjects from "./pages/RecentProjects";
import Awards from "./pages/Awards";
import Podcast from "./pages/Podcast";
import PodcastEpisode from "./pages/PodcastEpisode";
import Contact from "./pages/Contact";
import DonateNow from "./pages/DonateNow";
import EMagazineArticles from "./pages/EMagazineArticles";
import MagazineViewer from "./pages/MagazineViewer";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const isMagazineViewer = /^\/e-magazine-articles\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      {!isMagazineViewer && <Navbar />}
      <main className={isMagazineViewer ? "pt-0" : "pt-20"}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news-stories" element={<NewsStories />} />
          <Route path="/recent-projects" element={<RecentProjects />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/podcast/:episodeSlug" element={<PodcastEpisode />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate-now" element={<DonateNow />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/e-magazine-articles" element={<EMagazineArticles />} />
          <Route path="/e-magazine-articles/:magazineId" element={<MagazineViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isMagazineViewer && <Footer />}
    </>
  );
};

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showLoader ? (
          <LoadingScreen onComplete={() => setShowLoader(false)} />
        ) : (
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
