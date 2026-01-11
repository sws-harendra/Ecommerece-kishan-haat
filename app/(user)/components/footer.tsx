// "use client";
// import { brandName } from "@/app/contants";
// import Link from "next/link";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="max-w-7xl text-center mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Brand */}
//         <div className="flex flex-col items-center justify-center">
//           <h2 className="text-xl font-bold text-white">{brandName}</h2>
//           <p className="mt-3 text-sm">
//             Your trusted destination for quality products at the best prices.
//           </p>
//           <div className="flex flex-row my-5 gap-2 space-x-4 text-gray-400">
//             <a
//               href="http://heritagehand.in"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Facebook className="w-6 h-6 hover:text-blue-600 cursor-pointer" />
//             </a>
//             <a
//               href="http://heritagehand.in"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Twitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
//             </a>
//             <a
//               href="http://heritagehand.in"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Instagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
//             </a>
//             <a
//               href="http://heritagehand.in"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Linkedin className="w-6 h-6 hover:text-blue-700 cursor-pointer" />
//             </a>
//           </div>
//         </div>

//         {/* Shop Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link href="/products" className="hover:text-white">
//                 All Products
//               </Link>
//             </li>
//             <li>
//               <Link href="/categories" className="hover:text-white">
//                 Categories
//               </Link>
//             </li>
//             <li>
//               <Link href="/offers" className="hover:text-white">
//                 Offers
//               </Link>
//             </li>
//             <li>
//               <Link href="/new-arrivals" className="hover:text-white">
//                 New Arrivals
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Customer Service */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">
//             Customer Service
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link href="/refund-policy" className="hover:text-white">
//                 Refund Policy
//               </Link>
//             </li>
//             <li>
//               <Link href="/terms&conditions" className="hover:text-white">
//                 Terms & Condition
//               </Link>
//             </li>
//             <li>
//               <Link href="/privacy-policy" className="hover:text-white">
//                 Privacy Policy
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-700 py-4 text-center text-sm">
//         <p>
//           © {new Date().getFullYear()} {brandName}. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }








"use client";

"use client";
import { brandName } from "@/app/contants";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
return(
  <footer className="relative bg-gradient-to-b from-green-900 via-green-700 to-green-700 text-green-50">

  {/* Soft glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-lime-500/20 to-green-600/20 blur-3xl -z-10" />

  {/* Brand Section */}
  <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 text-center">
    <h2 className="text-3xl font-bold tracking-wide text-white">
      {brandName}
    </h2>

    <p className="mt-3 text-green-200 max-w-xl mx-auto text-sm">
      Your trusted destination for fresh farm products directly from farmers.
    </p>

    {/* Social Icons */}
    <div className="flex justify-center gap-5 mt-6">
      <a href="http://heritagehand.in" target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-lime-400 text-green-900 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300">
        <Facebook size={18} />
      </a>
      <a href="http://heritagehand.in" target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-lime-400 text-green-900 flex items-center justify-center hover:bg-black hover:text-white hover:scale-110 transition-all duration-300">
        <Twitter size={18} />
      </a>
      <a href="http://heritagehand.in" target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-lime-400 text-green-900 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:scale-110 transition-all duration-300">
        <Instagram size={18} />
      </a>
      <a href="http://heritagehand.in" target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-lime-400 text-green-900 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-300">
        <Linkedin size={18} />
      </a>
    </div>
  </div>

  {/* Links Section */}
  <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-center">

    {/* Shop */}
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-lime-300 tracking-wide">
        Shop
      </h3>
      <ul className="space-y-3 text-sm text-green-200">
        <li><Link href="/products" className=" hover:text-lime-300 hover:scale-">All Products</Link></li>
        <li><Link href="/categories" className="hover:text-lime-300">Categories</Link></li>
        <li><Link href="/offers" className="hover:text-lime-300">Offers</Link></li>
        <li><Link href="/new-arrivals" className="hover:text-lime-300">New Arrivals</Link></li>
      </ul>
    </div>

    {/* Customer Service */}
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-lime-300 tracking-wide">
        Customer Service
      </h3>
      <ul className="space-y-3 text-sm text-green-200">
        <li><Link href="/refund-policy" className="hover:text-lime-300">Refund Policy</Link></li>
        <li><Link href="/terms&conditions" className="hover:text-lime-300">Terms & Condition</Link></li>
        <li><Link href="/privacy-policy" className="hover:text-lime-300">Privacy Policy</Link></li>
      </ul>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-4 text-center text-sm text-green-200">
    © {new Date().getFullYear()}{" "}
    <span className="font-semibold text-lime-300">{brandName}</span>. All rights reserved.
  </div>

</footer>
)



}