/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import ProductCard from "../../components/ProductCard";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import Icon from "../../components/ui/Icon";
import { ProductGridSkeleton } from "../../components/ui/Skeleton";

// ─── Hero & Category Images ──────────────────────────────────────────────────
const heroImg =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop";
const booksImg =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop";
const electronicsImg =
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop";
const cyclesImg =
  "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop";
const othersImg =
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop";

// ─── Static Featured/Trending Product Listings ───────────────────────────────
const STATIC_FEATURED = [
  {
    id: "feat-1",
    title: "MacBook Air M2 (2023)",
    category: "Electronics",
    price: "₹72,000",
    originalPrice: "₹1,14,900",
    condition: "Like New",
    rating: 4.9,
    reviews: 38,
    location: "North Campus",
    seller: "Arjun M.",
    tag: "🔥 Hot Deal",
    tagColor: "bg-rose-500",
    description:
      "Barely used MacBook Air M2 with 8GB RAM, 256GB SSD. Battery health 97%. Comes with original charger & box.",
    image:
      `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/uploads/macbook_air_m2.png`,
  },
  {
    id: "feat-2",
    title: "Engineering Mathematics (Set of 4)",
    category: "Books",
    price: "₹450",
    originalPrice: "₹1,200",
    condition: "Good",
    rating: 4.7,
    reviews: 21,
    location: "South Campus",
    seller: "Priya S.",
    tag: "📚 Best Seller",
    tagColor: "bg-blue-500",
    description:
      "Complete set for 1st & 2nd year B.Tech. Authors: R.K. Jain, S.R.K. Iyengar. Minimal highlights, all pages intact.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "feat-3",
    title: "Hero Sprint 26T Mountain Cycle",
    category: "Cycles",
    price: "₹4,200",
    originalPrice: "₹7,500",
    condition: "Good",
    rating: 4.6,
    reviews: 15,
    location: "Hostel Area",
    seller: "Rahul K.",
    tag: "⚡ Quick Sell",
    tagColor: "bg-amber-500",
    description:
      "26-inch MTB, recently serviced, new brake pads & tyres. Perfect for campus commuting. Selling due to graduation.",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=800&auto=format&fit=crop",
  },
];

// ─── Category Config ─────────────────────────────────────────────────────────
const categories = [
  {
    name: "Books",
    image: booksImg,
    tone: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200",
  },
  {
    name: "Electronics",
    image: electronicsImg,
    tone: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-200",
  },
  {
    name: "Cycles",
    image: cyclesImg,
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200",
  },
  {
    name: "Others",
    image: othersImg,
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200",
  },
];

const locations = [
  "All",
  "North Campus",
  "South Campus",
  "East Block",
  "West Block",
  "Hostel Area",
];

// ─── Star Rating Helper ───────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-300 fill-slate-300 dark:text-slate-600 dark:fill-slate-600"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
};

// ─── Static Featured Product Card ────────────────────────────────────────────
const FeaturedProductCard = ({ product, user }) => {
  const [wishlisted, setWishlisted] = useState(false);

  const handleViewDetails = () => {
    if (user) {
      toast("📦 This is a featured sample listing. Browse real campus deals below!", {
        icon: "ℹ️",
        duration: 3000,
      });
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-card/60 border border-border/80 backdrop-blur-xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,118,110,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
      {/* Image Container with generous height */}
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800/50 h-56">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Floating Tag */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md ${product.tagColor}`}
        >
          {product.tag}
        </span>
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur shadow-md transition hover:scale-110 active:scale-95 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300"
          aria-label="Wishlist"
        >
          <svg
            className={`h-4.5 w-4.5 transition-colors ${
              wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400 fill-none"
            }`}
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        {/* Condition tag */}
        <span className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
          {product.condition}
        </span>
      </div>

      {/* Body contents with modern spacious spacing */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <span className="mb-1.5 inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            {product.category}
          </span>
          <h3 className="text-lg font-black text-text-primary dark:text-white leading-tight">
            {product.title}
          </h3>
        </div>

        <p className="line-clamp-2 text-xs text-text-secondary leading-relaxed">
          {product.description}
        </p>

        {/* Reviews */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs font-bold text-amber-500">{product.rating}</span>
          <span className="text-xs text-text-secondary">({product.reviews} reviews)</span>
        </div>

        {/* Location / Seller info */}
        <div className="flex items-center justify-between text-xs text-text-secondary border-t border-border/40 pt-3">
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="h-4 w-4 text-accent-indigo/60 dark:text-indigo-400/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {product.location}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="h-4 w-4 text-accent-indigo/60 dark:text-indigo-400/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {product.seller}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
          <div>
            <p className="text-2xl font-black text-accent-indigo dark:text-indigo-400">
              {product.price}
            </p>
            <p className="text-xs text-text-secondary line-through opacity-70">{product.originalPrice}</p>
          </div>
          <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-600/10">
            {Math.round(
              (1 -
                parseInt(product.price.replace(/[₹,]/g, "")) /
                  parseInt(product.originalPrice.replace(/[₹,]/g, ""))) *
                100
            )}
            % OFF
          </span>
        </div>

        <button
          type="button"
          onClick={handleViewDetails}
          className="mt-2 w-full rounded-2xl bg-accent-indigo px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-accent-indigo/10 transition duration-300 hover:opacity-95 hover:shadow-accent-indigo/20 active:scale-[0.98] outline-none"
        >
          {user ? "Browse Real Deals ↓" : "Login to View Details"}
        </button>
      </div>
    </div>
  );
};

// ─── Main Home Component ─────────────────────────────────────────────────────
const Home = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("All");
  
  // Advanced filters accordion toggle
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data.products || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const dynamicCategories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(products.map((product) => product.category).filter(Boolean))
      ),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const price = Number(product.price);
        const title = product.title?.toLowerCase() || "";
        if (keyword && !title.includes(keyword.toLowerCase())) return false;
        if (categoryFilter !== "All" && product.category !== categoryFilter)
          return false;
        if (
          availabilityFilter !== "all" &&
          product.status !== availabilityFilter
        )
          return false;
        if (locationFilter !== "All" && product.location !== locationFilter)
          return false;
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "oldest")
          return new Date(a.createdAt) - new Date(b.createdAt);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [
    products,
    user,
    keyword,
    categoryFilter,
    availabilityFilter,
    locationFilter,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Check if any advanced filters are active to highlight UI status
  const hasActiveAdvancedFilters = useMemo(() => {
    return minPrice || maxPrice || locationFilter !== "All" || availabilityFilter !== "all";
  }, [minPrice, maxPrice, locationFilter, availabilityFilter]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-12 py-10">
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <ProductGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-24 py-6 md:py-10 max-w-7xl mx-auto px-1 sm:px-4">
      {/* ── Beautiful spacious Hero ── */}
      <section className="relative overflow-hidden rounded-[36px] bg-card/50 border border-border/80 backdrop-blur-xl shadow-2xl shadow-slate-100/40 dark:shadow-none">
        <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-12 lg:p-16 items-center">
          <div className="flex flex-col justify-center lg:col-span-7">
            <span className="inline-flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-[0.2em] text-accent-indigo bg-accent-indigo/10 px-4 py-1.5 rounded-full w-fit">
              Campus Resell Marketplace
            </span>
            <h1 className="max-w-xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-text-primary dark:text-white">
              Trade Smarter Within Your Campus.
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-text-secondary">
              Find premium pre-loved study gear, laptops, textbooks, and campus essentials from students near you. Safe chats, easy listings, zero hassle.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                className="bg-accent-indigo hover:bg-[#4F46E5] text-white px-8 py-4 rounded-2xl shadow-xl shadow-accent-indigo/20 transition-all text-base font-bold active:scale-95 text-center"
              >
                Browse Real Listings
              </Button>
              <Button
                as={Link}
                to={user ? "/add-product" : "/login"}
                variant="secondary"
                size="lg"
                className="px-8 py-4 rounded-2xl text-base font-bold text-center"
              >
                List An Item
              </Button>
            </div>

            {/* Micro Stats Counter */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/50 pt-8 max-w-lg">
              <div>
                <p className="text-3xl font-black text-text-primary dark:text-white tracking-tight">
                  {products.length + STATIC_FEATURED.length}
                </p>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
                  Active Listings
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-text-primary dark:text-white tracking-tight">
                  {products.filter((item) => item.status === "available").length +
                    STATIC_FEATURED.length}
                </p>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
                  Available Now
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-text-primary dark:text-white tracking-tight">
                  {dynamicCategories.length - 1 || 4}
                </p>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
                  Categories
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-5 w-full">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-accent-indigo/10 transform transition duration-500 hover:scale-[1.01]">
              <img
                src={heroImg}
                alt="Campus Marketplace Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Picks (Highly spacious and aesthetic) ── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent-indigo">
              Handpicked Deals
            </span>
            <h2 className="text-3xl font-black text-text-primary dark:text-white tracking-tight mt-1">
              🌟 Featured Campus Picks
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 dark:bg-rose-950/30 px-4.5 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-950 w-fit">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            Trending Deals
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STATIC_FEATURED.map((product) => (
            <FeaturedProductCard key={product.id} product={product} user={user} />
          ))}
        </div>
      </section>

      {/* ── Shop by Category (Highly premium visual cards) ── */}
      <section className="space-y-8">
        <div className="border-b border-border/30 pb-4">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent-indigo">
            Browse By Type
          </span>
          <h2 className="text-3xl font-black text-text-primary dark:text-white tracking-tight mt-1">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              onClick={() => {
                setCategoryFilter(category.name);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden rounded-3xl bg-card/65 p-5 text-left border border-border/60 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:bg-slate-800/50 outline-none"
            >
              <div className="mb-5 h-44 w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-black text-lg text-text-primary dark:text-white">
                {category.name}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-text-secondary">
                {products.filter(
                  (product) => product.category === category.name
                ).length +
                  STATIC_FEATURED.filter((p) => p.category === category.name)
                    .length}{" "}
                listings
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ── Browse All Products (Advanced collapsible filters) ── */}
      <section id="products" className="space-y-8 pt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-border/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent-indigo">
              Explore Live Items
            </span>
            <h2 className="text-3xl font-black text-text-primary dark:text-white tracking-tight mt-1">
              Browse Products
            </h2>
          </div>
          <p className="text-sm font-bold text-text-secondary">
            {filteredProducts.length} real campus listings
          </p>
        </div>

        {/* Clean, spacious search & unified advanced filter drawer */}
        <Card className="p-6 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-2xl shadow-xl shadow-slate-100/30 dark:shadow-none space-y-4">
          {/* Main search and primary category filter row */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Icon
                name="search"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
              />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search campus marketplace..."
                className="w-full rounded-2xl bg-muted/60 backdrop-blur-md py-4 pl-12 pr-4 text-sm outline-none transition focus:bg-card focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border"
              />
            </div>

            <div className="flex w-full md:w-auto gap-3 items-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex-1 md:w-48 rounded-2xl bg-muted/60 py-4 px-4 text-sm outline-none focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border font-bold appearance-none cursor-pointer"
              >
                {dynamicCategories.map((category) => (
                  <option key={category} value={category}>
                    Category: {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 md:w-48 rounded-2xl bg-muted/60 py-4 px-4 text-sm outline-none focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border font-bold appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>

              {/* Advanced Filter Trigger Button */}
              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className={`grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300 active:scale-95 outline-none ${
                  showFilters || hasActiveAdvancedFilters
                    ? "bg-accent-indigo text-white border-accent-indigo shadow-md shadow-accent-indigo/15"
                    : "bg-muted/60 border-transparent hover:border-border text-slate-600 dark:text-slate-300"
                }`}
                title="Advanced Filters"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Advanced collapsible filter drawer */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showFilters ? "max-h-[300px] opacity-100 mt-4 pt-4 border-t border-border/40" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider ml-1">Min Price</label>
                <input
                  type="number"
                  placeholder="₹ Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-2xl bg-muted/50 p-3.5 text-xs outline-none focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider ml-1">Max Price</label>
                <input
                  type="number"
                  placeholder="₹ Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-2xl bg-muted/50 p-3.5 text-xs outline-none focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider ml-1">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full rounded-2xl bg-muted/50 p-3.5 text-xs outline-none focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border cursor-pointer font-semibold"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "Any Location" : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider ml-1">Status</label>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full rounded-2xl bg-muted/50 p-3.5 text-xs outline-none focus:ring-4 focus:ring-accent-indigo/10 text-text-primary dark:text-white border border-transparent focus:border-border cursor-pointer font-semibold"
                >
                  <option value="all">Any Status</option>
                  <option value="available">Available Only</option>
                  <option value="sold">Sold Only</option>
                </select>
              </div>
            </div>

            {/* Clear filters row */}
            {hasActiveAdvancedFilters && (
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                    setLocationFilter("All");
                    setAvailabilityFilter("all");
                  }}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-rose-500/10 px-3.5 py-2 rounded-xl transition"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Active Filters
                </button>
              </div>
            )}
          </div>
        </Card>

        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No listings found"
            description="Adjust your search keyword, category, price range, or location filters to discover campus items."
            actionLabel="List An Item"
            actionTo={user ? "/add-product" : "/login"}
            icon={<Icon name="search" />}
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
