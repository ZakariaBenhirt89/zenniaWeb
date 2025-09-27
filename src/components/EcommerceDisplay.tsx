import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Heart, 
  Filter, 
  User,
  Menu,
  Plus,
  Minus,
  X,
  Home,
  Grid3X3,
  UserCircle,
  Diamond,
  Sparkles
} from "lucide-react";
import { Logo } from "./Logo";
import { AnimatedBackground } from "./AnimatedBackground";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../App";

interface CartItem extends Product {
  quantity: number;
}

interface EcommerceDisplayProps {
  onLogout: () => void;
  onNavigateToProfile: () => void;
  onNavigateToProductDetail: (product: Product) => void;
}

export function EcommerceDisplay({ onLogout, onNavigateToProfile, onNavigateToProductDetail }: EcommerceDisplayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const zenniaProducts: Product[] = [
    {
      id: "ZEN001",
      name: "Eternal Diamond Ring",
      price: 2850,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzU1OTc5MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviewCount: 156,
      category: "rings",
      collection: "bridal",
      description: "An exquisite solitaire diamond ring featuring a brilliant-cut diamond set in a platinum mounting. This timeless piece showcases exceptional craftsmanship.",
      materials: ["18K Gold", "Diamond", "Platinum"],
      inStock: true,
      isNew: false,
      isFeatured: true,
      discount: 11,
      features: [
        "GIA certified diamond",
        "Handcrafted platinum setting", 
        "Lifetime warranty included",
        "Professional certification"
      ],
      specifications: {
        "Carat Weight": "1.5ct",
        "Cut": "Round Brilliant",
        "Color": "F",
        "Clarity": "VVS2",
        "Setting": "4-Prong Solitaire"
      }
    },
    {
      id: "ZEN002",
      name: "Celestial Gold Pendant",
      price: 1899,
      image: "https://images.unsplash.com/photo-1602752250055-5ebb552fc3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBwZW5kYW50JTIwbHV4dXJ5fGVufDF8fHx8MTc1NTk3OTA0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviewCount: 89,
      category: "necklaces",
      collection: "celestial",
      description: "A stunning 18k gold pendant inspired by celestial constellations.",
      materials: ["18K Gold", "Diamond"],
      inStock: true,
      isNew: true,
      isFeatured: false,
      features: [
        "18K gold construction",
        "Diamond accent stars",
        "Adjustable chain length",
        "Celestial-inspired design"
      ],
      specifications: {
        "Chain Length": "18 inches",
        "Pendant Size": "15mm x 12mm", 
        "Gold Karat": "18K",
        "Diamond Count": "7 pieces"
      }
    },
    {
      id: "ZEN003",
      name: "Pearl Diamond Drops",
      price: 1299,
      originalPrice: 1499,
      image: "https://images.unsplash.com/photo-1591241193546-8c6823c3958a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFybCUyMGRpYW1vbmQlMjBlYXJyaW5ncyUyMGx1eHVyeXxlbnwxfHx8fDE3NTU5NzkwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviewCount: 124,
      category: "earrings",
      collection: "classic",
      description: "Elegant drop earrings featuring lustrous freshwater pearls.",
      materials: ["Pearl", "Diamond", "Gold"],
      inStock: true,
      isNew: false,
      isFeatured: true,
      discount: 13,
      features: [
        "Freshwater cultured pearls",
        "Diamond crown setting",
        "14K gold posts",
        "Secure butterfly backs"
      ],
      specifications: {
        "Pearl Size": "8-9mm",
        "Pearl Type": "Freshwater Cultured",
        "Diamond Count": "2 pieces", 
        "Total Length": "25mm"
      }
    },
    {
      id: "ZEN004",
      name: "Luxury Tennis Bracelet",
      price: 3299,
      image: "https://images.unsplash.com/photo-1655707063496-e1c00b3280de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwYnJhY2VsZXQlMjBqZXdlbHJ5fGVufDF8fHx8MTc1NTk3OTA0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviewCount: 67,
      category: "bracelets",
      collection: "signature",
      description: "A magnificent tennis bracelet with continuous line of diamonds.",
      materials: ["Diamond", "18K Gold"],
      inStock: false,
      isNew: false,
      isFeatured: false,
      features: [
        "Premium diamond selection",
        "18K white gold setting",
        "Secure clasp mechanism",
        "Professional sizing available"
      ],
      specifications: {
        "Total Carat Weight": "5.0ct",
        "Diamond Count": "45 pieces",
        "Bracelet Length": "7 inches",
        "Setting Type": "4-Prong"
      }
    },
    {
      id: "ZEN005",
      name: "Diamond Elite Timepiece",
      price: 8599,
      originalPrice: 9999,
      image: "https://images.unsplash.com/photo-1704961237262-a97295a6fea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwd2F0Y2glMjB0aW1lcGllY2V8ZW58MXx8fHwxNzU1OTc5MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviewCount: 203,
      category: "watches",
      collection: "elite",
      description: "An exceptional luxury timepiece with diamond-set bezel.",
      materials: ["Diamond", "Platinum", "Sapphire"],
      inStock: true,
      isNew: true,
      isFeatured: true,
      discount: 14,
      features: [
        "Swiss automatic movement",
        "Diamond-set bezel",
        "Sapphire crystal",
        "50m water resistance"
      ],
      specifications: {
        "Movement": "Swiss Automatic",
        "Case Size": "42mm",
        "Water Resistance": "50 meters",
        "Crystal": "Sapphire"
      }
    },
    {
      id: "ZEN006",
      name: "Emerald Royale Ring",
      price: 4599,
      image: "https://images.unsplash.com/photo-1583937443351-f2f669fbe2cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyYWxkJTIwcmluZyUyMGx1eHVyeSUyMGpld2Vscnl8ZW58MXx8fHwxNzU1ODgzMDg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviewCount: 78,
      category: "rings",
      collection: "royale",
      description: "A magnificent emerald ring with Colombian emerald centerpiece.",
      materials: ["Emerald", "Diamond", "Platinum"],
      inStock: true,
      isNew: false,
      isFeatured: false,
      features: [
        "Colombian emerald centerstone",
        "Diamond halo setting",
        "Platinum construction",
        "Certificate of authenticity"
      ],
      specifications: {
        "Emerald Weight": "2.5ct",
        "Diamond Weight": "0.8ct",
        "Setting": "Halo",
        "Origin": "Colombian Emerald"
      }
    }
  ];

  const categories = [
    { id: "All", name: "All", icon: Grid3X3 },
    { id: "rings", name: "Rings", icon: Diamond },
    { id: "necklaces", name: "Necklaces", icon: Sparkles },
    { id: "earrings", name: "Earrings", icon: Heart },
    { id: "bracelets", name: "Bracelets", icon: Sparkles },
    { id: "watches", name: "Watches", icon: Diamond }
  ];

  const filteredProducts = zenniaProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Logo className="w-16 h-16 mx-auto mb-4" animate={true} />
            <motion.h2 
              className="text-2xl font-medium text-white mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Zennia
            </motion.h2>
            <p className="text-white/70">Loading luxury collection...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cosmic Animated Background */}
      <AnimatedBackground />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col pb-20">
        {/* Header - 80px */}
        <motion.header 
          className="h-20 bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-5 py-3 h-full flex items-center justify-between">
            {/* Left: Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Logo className="w-8 h-8" animate={false} />
              <motion.h1 
                className="text-xl font-medium text-white"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255, 215, 0, 0.3)",
                    "0 0 10px rgba(255, 215, 0, 0.6)",
                    "0 0 5px rgba(255, 215, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Zennia
              </motion.h1>
            </motion.div>

            {/* Center: Search Bar */}
            <motion.div 
              className="flex-1 max-w-md mx-8 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400" />
                <Input
                  placeholder="Search luxury jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 backdrop-blur-md border-white/10 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300 rounded-[20px] focus:border-yellow-400/50"
                />
              </div>
            </motion.div>

            {/* Right: Action Icons */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 relative rounded-full"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItemCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs flex items-center justify-center font-medium"
                        >
                          {cartItemCount}
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent className="bg-slate-900/95 backdrop-blur-md border-white/20 text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white flex items-center space-x-2">
                      <Diamond className="w-5 h-5 text-yellow-400" />
                      <span>Shopping Cart</span>
                    </SheetTitle>
                    <SheetDescription className="text-white/70">
                      {cartItemCount} items in your luxury collection
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Diamond className="w-12 h-12 text-white/30 mx-auto mb-4" />
                        <p className="text-white/70">Your cart is empty</p>
                        <p className="text-white/50 text-sm">Discover our luxury collection</p>
                      </div>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                          >
                            <div className="relative">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-md"
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white truncate">{item.name}</h4>
                              <p className="text-sm text-yellow-400">${item.price.toLocaleString()}</p>
                              <div className="flex items-center space-x-1">
                                {item.materials.slice(0, 2).map((material, i) => (
                                  <Badge key={i} variant="outline" className="border-white/30 text-white/70 text-xs">
                                    {material}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 text-white hover:bg-white/20"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-white">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 text-white hover:bg-white/20"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 text-red-400 hover:bg-red-400/20"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                        
                        <div className="border-t border-white/20 pt-4">
                          <div className="flex justify-between text-lg font-medium mb-4 text-white">
                            <span>Total:</span>
                            <span className="text-yellow-400">${cartTotal.toLocaleString()}</span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium">
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNavigateToProfile}
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 border-2 border-yellow-400/50 hidden md:flex"
                >
                  <User className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.header>

        {/* Mobile Search */}
        <motion.div 
          className="md:hidden px-5 py-3 bg-black/10 backdrop-blur-sm border-b border-white/5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400" />
            <Input
              placeholder="Search luxury jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 backdrop-blur-md border-white/10 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300 rounded-[20px] focus:border-yellow-400/50"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="container mx-auto px-5 py-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Button
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                  className={
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black border-0 whitespace-nowrap"
                      : "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                  }
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Products Grid - Original Compact Grid */}
        <div className="container mx-auto px-5 pb-8 flex-1">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={addToCart}
                  onToggleFavorite={toggleFavorite}
                  onNavigateToDetail={onNavigateToProductDetail}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Diamond className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No jewelry found matching your search</p>
              <p className="text-white/50">Try adjusting your filters</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Navigation - 70px */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 h-[70px] bg-black/30 backdrop-blur-xl border-t border-white/10 rounded-t-2xl"
        initial={{ y: 70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center justify-around h-full px-2">
          <BottomNavItem 
            icon={Home} 
            label="Home" 
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <BottomNavItem 
            icon={Diamond} 
            label="Browse" 
            isActive={activeTab === "browse"}
            onClick={() => setActiveTab("browse")}
          />
          <BottomNavItem 
            icon={Heart} 
            label="Wishlist" 
            isActive={activeTab === "wishlist"}
            onClick={() => setActiveTab("wishlist")}
            badge={favorites.length}
          />
          <BottomNavItem 
            icon={UserCircle} 
            label="Profile" 
            isActive={activeTab === "profile"}
            onClick={() => {
              setActiveTab("profile");
              onNavigateToProfile();
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Compact Product Card with New Layout
function ProductCard({ 
  product, 
  index, 
  onAddToCart, 
  onToggleFavorite, 
  onNavigateToDetail,
  isFavorite 
}: {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onNavigateToDetail: (product: Product) => void;
  isFavorite: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.8, y: -30 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => onNavigateToDetail(product)}
    >
      <Card className="overflow-hidden bg-transparent border-0 shadow-none rounded-2xl">
        <CardContent className="p-0">
          {/* Cosmic Background Image Section */}
          <div className="relative h-40 rounded-t-2xl overflow-hidden bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-pink-900/40 backdrop-blur-lg border border-white/20">
            {/* Cosmic Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
            
            {/* Animated Stars */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Product Image */}
            <motion.div
              className="relative h-full flex items-center justify-center p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-xl"
              />
              
              {/* Sparkle Effect Overlay */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 30%, rgba(255,215,0,0.0) 0%, transparent 50%)",
                    "radial-gradient(circle at 60% 70%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 40% 20%, rgba(255,215,0,0.0) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.div>

            {/* Heart Icon */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart 
                className={`w-3 h-3 ${
                  isFavorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-white'
                }`} 
              />
            </motion.button>

            {/* Status Badges */}
            <div className="absolute top-2 left-2 space-y-1">
              {product.isNew && (
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 text-xs">
                  New
                </Badge>
              )}
              {product.discount && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 text-xs">
                  -{product.discount}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="bg-gray-500 text-white border-0 text-xs">
                  Sold Out
                </Badge>
              )}
            </div>
          </div>

          {/* White Bottom Section */}
          <div className="bg-white rounded-b-2xl p-3 space-y-2">
            {/* Product Title */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-600">{product.collection}</p>
            </div>

            {/* Material Badge */}
            <div className="flex items-center space-x-1">
              {product.materials.slice(0, 1).map((material, i) => (
                <Badge key={i} variant="outline" className="border-gray-300 text-gray-700 bg-gray-50 text-xs px-1 py-0">
                  {material}
                </Badge>
              ))}
            </div>

            {/* Description (truncated) */}
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({product.reviewCount})</span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
              >
                <Button
                  disabled={!product.inStock}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium disabled:opacity-50 border-0 text-xs px-2 py-1 h-auto"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Bottom Navigation Item Component
function BottomNavItem({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick, 
  badge 
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400" 
          : "text-white/70 hover:text-white"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="relative"
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6" />
        {badge && badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
          >
            {badge}
          </motion.div>
        )}
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}