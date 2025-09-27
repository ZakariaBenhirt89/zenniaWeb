import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Shield, 
  Truck, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Home,
  Grid3X3,
  UserCircle,
  Diamond,
  Sparkles,
  Box,
  Image as ImageIcon,
  Maximize2
} from "lucide-react";
import { Logo } from "./Logo";
import { AnimatedBackground } from "./AnimatedBackground";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductViewer3D } from "./ProductViewer3D";
import { Product } from "../App";

interface ProductDetailScreenProps {
  product: Product;
  onNavigateBack: () => void;
  onNavigateToProfile: () => void;
  onLogout: () => void;
}

export function ProductDetailScreen({ 
  product, 
  onNavigateBack, 
  onNavigateToProfile, 
  onLogout 
}: ProductDetailScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [show3DFullscreen, setShow3DFullscreen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Sample images for the gallery
  const productImages = product.images || [
    product.image,
    "https://images.unsplash.com/photo-1602752250015-52934bc45613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmd8ZW58MXx8fHwxNzU1OTc5MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwZGV0YWlsfGVufDF8fHx8MTc1NTk3OTA0OXww&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const addToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b152c35c?w=150",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely stunning! The craftsmanship is exceptional and it looks even better in person. The cosmic theme of the packaging was a nice touch too."
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      date: "1 month ago",
      comment: "Perfect gift for my wife's anniversary. The quality is outstanding and the delivery was faster than expected. Zennia never disappoints!"
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 4,
      date: "2 months ago",
      comment: "Beautiful piece, though slightly smaller than I expected. The materials are top quality and the design is elegant. Would recommend!"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cosmic Animated Background */}
      <AnimatedBackground />
      
      {/* Fullscreen 3D Viewer Modal */}
      <AnimatePresence>
        {show3DFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          >
            <div className="relative w-full h-full">
              <ProductViewer3D
                productName={product.name}
                category={product.category}
                materials={product.materials}
                onClose={() => setShow3DFullscreen(false)}
                isVisible={true}
              />
              <Button
                variant="outline"
                onClick={() => setShow3DFullscreen(false)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                Close Fullscreen
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col pb-20">
        {/* Header */}
        <motion.header 
          className="h-16 bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-5 py-3 h-full flex items-center justify-between">
            {/* Left: Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onNavigateBack}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Center: Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Logo className="w-6 h-6" animate={false} />
              <motion.h1 
                className="text-lg font-medium text-white"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255, 215, 0, 0.3)",
                    "0 0 8px rgba(255, 215, 0, 0.6)",
                    "0 0 5px rgba(255, 215, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Zennia
              </motion.h1>
            </motion.div>

            {/* Right: Actions */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log("Share product")}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-5 py-6">
          <motion.div
            ref={ref}
            className="grid lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Left Column - Images and 3D View */}
            <div className="space-y-4">
              {/* View Mode Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 mb-4"
              >
                <Button
                  variant={viewMode === "2d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("2d")}
                  className={viewMode === "2d" 
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black border-0"
                    : "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10"
                  }
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Photos
                </Button>
                <Button
                  variant={viewMode === "3d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("3d")}
                  className={viewMode === "3d"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black border-0"
                    : "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10"
                  }
                >
                  <Box className="w-4 h-4 mr-2" />
                  3D View
                </Button>
                {viewMode === "3d" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShow3DFullscreen(true)}
                    className="bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10"
                  >
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Fullscreen
                  </Button>
                )}
              </motion.div>

              {/* Main Image/3D View */}
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {viewMode === "2d" ? (
                    <motion.div
                      key="2d-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full"
                    >
                      <ImageWithFallback
                        src={productImages[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image navigation */}
                      {productImages.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between p-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={prevImage}
                            className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={nextImage}
                            className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {/* Image indicators */}
                      {productImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {productImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex 
                                  ? 'bg-yellow-400' 
                                  : 'bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Sparkle overlay */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          background: [
                            "radial-gradient(circle at 20% 30%, rgba(255,215,0,0.0) 0%, transparent 50%)",
                            "radial-gradient(circle at 60% 70%, rgba(255,215,0,0.2) 0%, transparent 50%)",
                            "radial-gradient(circle at 40% 20%, rgba(255,215,0,0.0) 0%, transparent 50%)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="3d-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <ProductViewer3D
                        productName={product.name}
                        category={product.category}
                        materials={product.materials}
                        isVisible={true}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Thumbnail gallery (only for 2D mode) */}
              {viewMode === "2d" && productImages.length > 1 && (
                <motion.div
                  className="flex space-x-3 overflow-x-auto pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex 
                          ? 'border-yellow-400' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column - Product Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Product Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <motion.h1 
                      className="text-3xl font-medium text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {product.name}
                    </motion.h1>
                    <p className="text-white/70 text-lg">{product.collection} Collection</p>
                  </div>
                </div>

                {/* Price */}
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-3xl font-medium text-yellow-400">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-white/50 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </motion.div>

                {/* Rating */}
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/70">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </motion.div>

                {/* Materials */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {product.materials.map((material, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-yellow-400/50 text-yellow-400 bg-yellow-400/10"
                    >
                      {material}
                    </Badge>
                  ))}
                </motion.div>
              </div>

              {/* Add to Cart Section */}
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between">
                  <label className="text-white font-medium">Quantity:</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                    >
                      -
                    </Button>
                    <span className="text-white font-medium w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium text-lg py-6 disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  {product.inStock ? `Add to Cart - $${(product.price * quantity).toLocaleString()}` : 'Out of Stock'}
                </Button>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs text-white/70">Lifetime Warranty</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs text-white/70">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs text-white/70">30-Day Returns</p>
                  </div>
                </div>
              </motion.div>

              {/* Product Details Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-md border border-white/10">
                    <TabsTrigger 
                      value="description"
                      className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger 
                      value="specifications"
                      className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      Specs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reviews"
                      className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-6">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-6">
                        <p className="text-white/90 leading-relaxed mb-4">
                          {product.description}
                        </p>
                        {product.features && (
                          <div>
                            <h4 className="text-white font-medium mb-3">Key Features:</h4>
                            <ul className="space-y-2">
                              {product.features.map((feature, index) => (
                                <li key={index} className="text-white/80 flex items-start">
                                  <Sparkles className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="specifications" className="mt-6">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-6">
                        {product.specifications ? (
                          <div className="space-y-3">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                                <span className="text-white/70">{key}:</span>
                                <span className="text-white font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-white/70">Detailed specifications coming soon.</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id} className="bg-white/5 backdrop-blur-md border-white/10">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={review.avatar} />
                                <AvatarFallback className="bg-yellow-400 text-black">
                                  {review.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-white font-medium">{review.name}</h4>
                                  <span className="text-white/50 text-sm">{review.date}</span>
                                </div>
                                <div className="flex items-center mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-white/30'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-white/80 leading-relaxed">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
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
            onClick={() => {
              setActiveTab("browse");
              onNavigateBack();
            }}
          />
          <BottomNavItem 
            icon={Heart} 
            label="Wishlist" 
            isActive={activeTab === "wishlist"}
            onClick={() => setActiveTab("wishlist")}
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

// Bottom Navigation Item Component
function BottomNavItem({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
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
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}