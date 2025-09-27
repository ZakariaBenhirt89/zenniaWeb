import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { 
  Settings,
  Package,
  Heart,
  Bell,
  CreditCard,
  MapPin,
  HelpCircle,
  ChevronRight,
  Home,
  Grid3X3,
  ShoppingCart,
  UserCircle,
  Diamond,
  Star,
  Calendar,
  Shield,
  Truck
} from "lucide-react";
import { Logo } from "./Logo";
import { AnimatedBackground } from "./AnimatedBackground";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfileScreenProps {
  onNavigateToHome: () => void;
  onNavigateToBrowse: () => void;
  onNavigateToCart: () => void;
  onNavigateToWishlist: () => void;
  onLogout: () => void;
}

interface Order {
  id: string;
  orderNumber: string;
  items: number;
  total: number;
  status: "delivered" | "shipping" | "processing";
  date: string;
  products: string[];
}

export function ProfileScreen({ 
  onNavigateToHome,
  onNavigateToBrowse,
  onNavigateToCart,
  onNavigateToWishlist,
  onLogout 
}: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const userInfo = {
    name: "Sophia Carter",
    email: "sophia.carter@email.com",
    avatar: "https://images.unsplash.com/photo-1694108059064-269b9f242c2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NTYxNTQ5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    memberSince: "2023",
    totalOrders: 12,
    favoriteItems: 8
  };

  const recentOrders: Order[] = [
    {
      id: "ZEN001",
      orderNumber: "#ZEN-12345",
      items: 1,
      total: 2850,
      status: "delivered",
      date: "Dec 15, 2024",
      products: ["Eternal Diamond Ring"]
    },
    {
      id: "ZEN002", 
      orderNumber: "#ZEN-67890",
      items: 2,
      total: 3198,
      status: "shipping",
      date: "Dec 20, 2024",
      products: ["Celestial Gold Pendant", "Pearl Diamond Drops"]
    },
    {
      id: "ZEN003",
      orderNumber: "#ZEN-54321",
      items: 1,
      total: 8599,
      status: "processing",
      date: "Dec 22, 2024",
      products: ["Diamond Elite Timepiece"]
    }
  ];

  const settingsItems = [
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Push notifications, emails, SMS",
      action: () => console.log("Navigate to notifications")
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      subtitle: "Cards, PayPal, Apple Pay",
      action: () => console.log("Navigate to payment methods")
    },
    {
      icon: MapPin,
      title: "Shipping Addresses",
      subtitle: "Manage delivery locations",
      action: () => console.log("Navigate to addresses")
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      subtitle: "Account security settings",
      action: () => console.log("Navigate to privacy")
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "FAQs, contact support",
      action: () => console.log("Navigate to help")
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'shipping':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <Diamond className="w-3 h-3" />;
      case 'shipping':
        return <Truck className="w-3 h-3" />;
      case 'processing':
        return <Package className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cosmic Animated Background */}
      <AnimatedBackground />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col pb-20">
        {/* Header */}
        <motion.header 
          className="h-20 bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-5 py-3 h-full flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
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
                Profile
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Profile Section */}
        <motion.div 
          className="container mx-auto px-5 py-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="relative mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={userInfo.avatar}
                      alt={userInfo.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400/50"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-yellow-400/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  
                  {/* VIP Badge */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full p-1.5"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    <Diamond className="w-3 h-3 text-black" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-medium text-white mb-1">{userInfo.name}</h2>
                  <p className="text-white/70 mb-3">{userInfo.email}</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <p className="text-yellow-400 font-medium">{userInfo.totalOrders}</p>
                      <p className="text-white/60">Orders</p>
                    </div>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="text-center">
                      <p className="text-yellow-400 font-medium">{userInfo.favoriteItems}</p>
                      <p className="text-white/60">Favorites</p>
                    </div>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="text-center">
                      <p className="text-yellow-400 font-medium">VIP</p>
                      <p className="text-white/60">Member</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders Section */}
        <motion.div 
          className="container mx-auto px-5 pb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Package className="w-5 h-5 mr-2 text-yellow-400" />
              Recent Orders
            </h3>
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-400/20 rounded-lg p-2.5">
                          <Package className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{order.orderNumber}</p>
                          <p className="text-sm text-white/70">{order.items} item{order.items > 1 ? 's' : ''} • {order.date}</p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className={`text-xs border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-yellow-400">${order.total.toLocaleString()}</p>
                        <ChevronRight className="w-4 h-4 text-white/50 ml-auto mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Wishlist Quick Access */}
        <motion.div 
          className="container mx-auto px-5 pb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-yellow-400" />
            Lists
          </h3>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToWishlist}
          >
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-400/20 rounded-lg p-2.5">
                      <Heart className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Wish List</p>
                      <p className="text-sm text-white/70">{userInfo.favoriteItems} items saved</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/50" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Settings Section */}
        <motion.div 
          className="container mx-auto px-5 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-yellow-400" />
            Settings
          </h3>

          <div className="space-y-3">
            {settingsItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/10 rounded-lg p-2.5">
                          <item.icon className="w-5 h-5 text-white/70" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-sm text-white/70">{item.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div 
          className="container mx-auto px-5 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 transition-all duration-300"
            size="lg"
          >
            Sign Out
          </Button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 h-[70px] bg-black/30 backdrop-blur-xl border-t border-white/10 rounded-t-2xl"
        initial={{ y: 70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <div className="flex items-center justify-around h-full px-2">
          <BottomNavItem 
            icon={Home} 
            label="Home" 
            isActive={activeTab === "home"}
            onClick={() => {
              setActiveTab("home");
              onNavigateToHome();
            }}
          />
          <BottomNavItem 
            icon={Grid3X3} 
            label="Browse" 
            isActive={activeTab === "browse"}
            onClick={() => {
              setActiveTab("browse");
              onNavigateToBrowse();
            }}
          />
          <BottomNavItem 
            icon={Heart} 
            label="Wishlist" 
            isActive={activeTab === "wishlist"}
            onClick={() => {
              setActiveTab("wishlist");
              onNavigateToWishlist();
            }}
          />
          <BottomNavItem 
            icon={UserCircle} 
            label="Profile" 
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
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
        className="relative"
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}