import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl, APP_LOGO, COMPANY_PHONE } from "@/const";
import { ChevronDown, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="Logo" className="w-10 h-10" />
            <span className="font-bold text-lg hidden sm:inline">Agri Brazil Success</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm hover:text-accent transition-colors">
              About
            </a>
            <a href="#services" className="text-sm hover:text-accent transition-colors">
              Services
            </a>
            <a href="#projects" className="text-sm hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button size="sm" variant="outline">
                {user?.name || "Account"}
              </Button>
            ) : (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-background-grain-field.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              The Future of{" "}
              <span style={{
                background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Agricultural
              </span>
              <br />
              <span style={{
                background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Investment
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Bringing the $2.7 Trillion Agricultural Market On-Chain. Tokenization of
              agricultural assets for enhanced access and liquidity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" style={{
              background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
              border: 'none',
              color: '#0D0D0D',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            >
              Get Started
            </Button>
            <Button size="lg" variant="outline" style={{
              borderImage: 'linear-gradient(to right, #0075FF, #3FFF8C) 1',
              borderWidth: '2px',
            }}>
              Learn More
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce relative z-10">
            <ChevronDown className="w-6 h-6 mx-auto text-white" />
          </div>
        </div>
      </section>

      {/* Three Cards Section - With Background Image */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/cards-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Invest in Growth",
                description: "Discover lucrative opportunities in the agricultural sector with our focus on grain production and investment strategies.",
              },
              {
                title: "Maximize Returns",
                description: "Capitalize on the high profitability potential of grain farms in Rio Grande do Sul, with projections indicating significant yield increases.",
              },
              {
                title: "Secure Your Future",
                description: "Engage with a resilient agricultural market that emphasizes both financial growth and sustainable practices.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg bg-blue-600/40 backdrop-blur-sm border border-blue-400/30 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 text-center"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {card.title}
                </h3>
                <p className="text-gray-100 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agribusiness Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/grain-field-1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-1 h-32 bg-gradient-to-b from-blue-400 to-green-400" />
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    agri Brazil success
                  </h2>
                  <p className="text-lg text-gray-100 leading-relaxed">
                    agri Brazil success is not merely an investment opportunity; it's a gateway to a thriving agricultural community poised for exceptional growth. Our emphasis on high-quality grain production, combined with strategic insights into market trends, positions us as leaders in the agro-investment landscape. Whether you are a seasoned investor or new to the agricultural sector, we welcome you to join us in unlocking the vast potential of Rio Grande do Sul's grain market.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block">
              <img
                src="/agribusiness-section.jpg"
                alt="Agribusiness"
                className="rounded-lg shadow-2xl shadow-accent/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Dark Background */}
      <section id="about" className="py-20 px-4 bg-black/50">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose Agri Brazil Success?
            </h2>
            <p className="text-lg text-muted-foreground">
              Agri Brazil Success is not merely an investment opportunity; it's a gateway to a
              thriving agricultural community poised for exceptional growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Analysis",
                description: "In-depth insights into grain market trends and forecasts.",
              },
              {
                title: "Risk Management",
                description: "Strategies to mitigate climate-related risks and ensure stability.",
              },
              {
                title: "Expert Guidance",
                description: "Expert advice on maximizing returns and optimizing investments.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <h3 className="text-xl font-semibold mb-3" style={{
                  background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects/Videos Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Our Projects</h2>
            <p className="text-lg text-muted-foreground">
              Explore our latest agricultural investment initiatives and success stories
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "ABS - Agricultural Blockchain Solutions",
                video: "/abs-video.mp4",
                description: "Innovative blockchain solutions for agricultural investment and tokenization.",
              },
              {
                title: "Tokenização da Agricultura Familiar no Brasil",
                video: "/tokenization-video.mp4",
                description: "Family farming tokenization strategies in Brazil.",
              },
              {
                title: "Tokenização de Fazendas - O Futuro da Agricultura",
                video: "/fazendas-tokenization.mp4",
                description: "Farm tokenization - the future of agriculture.",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedVideo(project.video)}
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <video
                    src={project.video}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <Play className="w-16 h-16 text-accent group-hover:scale-110 transition-transform" fill="#3FFF8C" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{
                    background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: "/grain-field-1.png", title: "Grain Fields" },
              { image: "/grain-field-2.png", title: "Agricultural Land" },
              { image: "/farm-event.png", title: "Farm Event" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg bg-muted border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-accent">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold" style={{
              background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Contact us for more information about investment opportunities.
            </p>
            <p className="text-2xl font-semibold" style={{
              background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{COMPANY_PHONE}</p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent focus:outline-none transition-colors resize-none"
            />
            <Button className="w-full" style={{
              background: 'linear-gradient(to right, #0075FF, #3FFF8C)',
              border: 'none',
              color: '#0D0D0D',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            >Send Message</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-muted-foreground">
                © 2025 Agri Brazil Success. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Chatbot Widget */}
      <ChatBot />
    </div>
  );
}
