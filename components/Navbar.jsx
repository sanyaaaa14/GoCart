"use client";
import { Search, ShoppingCart, Home, Store, Info, Phone, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton, SignInButton, Protect, useAuth } from "@clerk/nextjs";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  const { getToken, isSignedIn } = useAuth();
  const [isSeller, setIsSeller] = useState(false);
  const [storeStatus, setStoreStatus] = useState(null);

  useEffect(() => {
    const fetchSellerStatus = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          const { data } = await axios.get("/api/store/is-seller", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          
          if (data.storeInfo) {
             setStoreStatus(data.storeInfo.status);
          }

          if (data.isSeller) {
            setIsSeller(true);
          }
        } catch (error) {
          console.error("Error fetching seller status:", error);
        }
      }
    };
    fetchSellerStatus();
  }, [isSignedIn, getToken]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white shadow-sm"
    >
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="relative text-4xl font-semibold text-slate-700">
              <span className="text-green-600">Go</span>Cart
              <span className="text-green-600 text-5xl leading-0">.</span>
             <Protect plan='plus'>
               <p className="absolute text-xs font-semibold -top-1 -right-8  px-3 p-0.5 rounded-full flex items-center gap-2  text-white bg-green-500 ">Plus</p>
             </Protect>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
          >
            {["Home", "Shop", "About", "Contact"].map((item, i) => (
              <motion.div key={i} variants={menuVariants}>
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "About"
                      ? "/about"
                      : item === "Contact"
                      ? "/contact"
                      : `/${item.toLowerCase()}`
                  }
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            {/* Search */}
            <motion.form
              onSubmit={handleSearch}
              variants={menuVariants}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </motion.form>

            {/* Cart */}
            <motion.div variants={menuVariants}>
              <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                <ShoppingCart size={18} />
                Cart
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                  className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              </Link>
            </motion.div>

            {/* Seller Options */}
            <motion.div variants={menuVariants}>
              <SignedIn>
                {!isSeller && storeStatus !== "pending" && (
                  <Link href="/create-store" className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition">
                    Become a Seller
                  </Link>
                )}
                {!isSeller && storeStatus === "pending" && (
                  <span className="text-sm font-medium text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
                    Store Pending
                  </span>
                )}
                {isSeller && storeStatus === "approved" && (
                  <div className="flex gap-3 items-center">
                    <Link href="/store" className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition">
                      Seller Dashboard
                    </Link>
                    <Link href="/store/add-product" className="text-sm font-medium text-slate-600 hover:text-slate-800 transition">
                      Add Products
                    </Link>
                  </div>
                )}
              </SignedIn>
            </motion.div>

            {/* Clerk User Menu - Desktop (Only Account Stuff) */}
            <motion.div variants={menuVariants} className="relative">
              <SignedIn>
                <UserButton afterSignOutUrl="/">
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Orders"
                      labelIcon={<Package size={16} />}
                      onClick={() => router.push("/orders")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
            </motion.div>
          </motion.div>

          {/* Mobile User Button */}
          <motion.div
            className="sm:hidden flex items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <SignedIn>
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Home"
                    labelIcon={<Home size={16} />}
                    onClick={() => router.push("/")}
                  />
                  <UserButton.Action
                    label="Shop"
                    labelIcon={<Store size={16} />}
                    onClick={() => router.push("/shop")}
                  />
                  <UserButton.Action
                    label="About"
                    labelIcon={<Info size={16} />}
                    onClick={() => router.push("/about")}
                  />
                  <UserButton.Action
                    label="Contact"
                    labelIcon={<Phone size={16} />}
                    onClick={() => router.push("/contact")}
                  />
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<Package size={16} />}
                    onClick={() => router.push("/orders")}
                  />
                  {!isSeller && storeStatus !== "pending" && (
                    <UserButton.Action
                      label="Become a Seller"
                      labelIcon={<Store size={16} />}
                      onClick={() => router.push("/create-store")}
                    />
                  )}
                  {isSeller && storeStatus === "approved" && (
                    <UserButton.Action
                      label="Seller Dashboard"
                      labelIcon={<Store size={16} />}
                      onClick={() => router.push("/store")}
                    />
                  )}
                  {isSeller && storeStatus === "approved" && (
                     <UserButton.Action
                      label="Add Products"
                      labelIcon={<Package size={16} />}
                      onClick={() => router.push("/store/add-product")}
                    />
                  )}
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </motion.nav>
  );
};

export default Navbar;
