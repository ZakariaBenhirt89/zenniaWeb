import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";
import { EcommerceDisplay } from "./components/EcommerceDisplay";
import { ProfileScreen } from "./components/ProfileScreen";
import { ProductDetailScreen } from "./components/ProductDetailScreen";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  category: string;
  collection: string;
  description: string;
  materials: string[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  discount?: number;
  features?: string[];
  specifications?: Record<string, string>;
}

type Screen = "login" | "signup" | "ecommerce" | "profile" | "productDetail";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const switchToLogin = () => setCurrentScreen("login");
  const switchToSignup = () => setCurrentScreen("signup");
  const switchToEcommerce = () => setCurrentScreen("ecommerce");
  const switchToProfile = () => setCurrentScreen("profile");
  const switchToProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen("productDetail");
  };

  return (
    <div className="size-full">
      {currentScreen === "login" && (
        <LoginScreen 
          onSwitchToSignup={switchToSignup} 
          onLoginSuccess={switchToEcommerce}
        />
      )}
      {currentScreen === "signup" && (
        <SignUpScreen 
          onSwitchToLogin={switchToLogin}
          onSignupSuccess={switchToEcommerce}
        />
      )}
      {currentScreen === "ecommerce" && (
        <EcommerceDisplay 
          onLogout={switchToLogin}
          onNavigateToProfile={switchToProfile}
          onNavigateToProductDetail={switchToProductDetail}
        />
      )}
      {currentScreen === "profile" && (
        <ProfileScreen 
          onNavigateToHome={switchToEcommerce}
          onNavigateToBrowse={switchToEcommerce}
          onNavigateToCart={() => console.log("Navigate to cart")}
          onNavigateToWishlist={() => console.log("Navigate to wishlist")}
          onLogout={switchToLogin}
        />
      )}
      {currentScreen === "productDetail" && selectedProduct && (
        <ProductDetailScreen 
          product={selectedProduct}
          onNavigateBack={switchToEcommerce}
          onNavigateToProfile={switchToProfile}
          onLogout={switchToLogin}
        />
      )}
    </div>
  );
}