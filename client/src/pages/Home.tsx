import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">AB</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Agri Brazil</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm hover:text-accent transition-colors">
              About
            </a>
            <a href="#services" className="text-sm hover:text-accent transition-colors">
              Services
            </a>
            <a href="#testimonials" className="text-sm hover:text-accent transition-colors">
              Testimonials
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
              <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Agricultural
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Investment
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Bringing the $2.7 Trillion Agricultural Market On-Chain. Tokenization of
              agricultural assets for enhanced access and liquidity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce relative z-10">
            <ChevronDown className="w-6 h-6 mx-auto text-white" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose Agri Brazil Success?
            </h2>
            <p className="text-lg text-muted-foreground">
              Agri Brazil Success is not merely an investment opportunity; it's a gateway to a
              thriving agricultural community poised for exceptional growth. Our emphasis on
              high-quality grain production, combined with strategic insights into market trends,
              positions us as leaders in the agro-investment landscape.
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
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Our Offerings</h2>
            <p className="text-lg text-muted-foreground">
              Tailored investment strategies to enhance your agricultural portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Investment Guidance",
                description:
                  "Expert advice on maximizing returns and optimizing investments in the grain market.",
                image: "/investment-guidance.jpg",
              },
              {
                title: "Sustainability Initiatives",
                description:
                  "Support for eco-friendly practices and crop diversification strategies.",
                image: "/risk-management.jpg",
              },
              {
                title: "Financial Planning",
                description:
                  "Comprehensive strategies for effective agricultural investment and portfolio management.",
                image: "/market-analysis.jpg",
              },
              {
                title: "Networking Opportunities",
                description:
                  "Connect with industry experts and fellow investors in our community.",
                image: "/investment-guidance.jpg",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold mb-3 text-accent">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">What Our Investors Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Investing with Agri Brazil Success transformed my portfolio! Their insights into the grain market are invaluable, and I feel confident in my investment choices.",
                author: "Sarah Johnson",
              },
              {
                quote:
                  "The team's expertise and dedication to sustainable agriculture is impressive. I have seen consistent returns and growth in my investments.",
                author: "João Silva",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300"
              >
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-accent">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Contact us for more information about investment opportunities.
            </p>
            <p className="text-2xl font-semibold text-accent">+55 54 99618 2303</p>
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
            <Button className="w-full bg-accent hover:bg-accent/90">Send Message</Button>
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

      {/* Chatbot Widget */}
      <ChatBot />
    </div>
  );
}
