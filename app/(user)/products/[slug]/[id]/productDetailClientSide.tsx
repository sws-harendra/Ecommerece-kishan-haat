"use client";

import Image from "next/image";
import { Product, ProductVariant } from "@/app/types/product.types";
import { getImageUrl } from "@/app/utils/getImageUrl";
import { discountPercentage } from "@/app/utils/discountCalculator";
import { useState, useEffect } from "react";
import Link from "next/link";
import Heading from "@/app/commonComponents/heading";
import Loader from "@/app/commonComponents/loader";
// import Description from "@/app/%28user%29/components/product/description";
// import Description from "@/app/components/Description";


import {
  BugPlayIcon,
  Share,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Wallet,
  Copy,
} from "lucide-react";
import { addToCart } from "@/app/lib/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/store";
import { useRouter } from "next/navigation";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { slugify } from "@/app/utils/slugify";
import { toast } from "sonner";
import { getFileType } from "@/app/utils/getMediaType";
import { clienturl } from "@/app/contants";
import Description from "@/app/(user)/components/Description";
import YouMayLike from "@/app/(user)/components/YouMayLike";
import ProductCard from "@/app/(user)/components/productCard";
import { fetchRelatedProducts } from "@/app/lib/store/features/relatedProductSlice";

interface ProductDetailClientProps {
  product: Product;
  formattedTags: string[];
}

export default function ProductDetailClient({
  product,
  formattedTags,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const dispatch = useAppDispatch(); // ✅ typed dispatch
  
  // related products
  const { products, loading } = useAppSelector(
    (state) => state.relatedProducts
  );

  useEffect(() => {
    if (product?.id) {
      dispatch(fetchRelatedProducts(product.id));
    }
  }, [product?.id, dispatch]);
  console.log("Product ID:", product?.id);
  console.log("Related products state:", products);



  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast("copied");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader />;
  }

  // Get images to display - either variant image or product images
  const displayImages =
    selectedVariant && selectedVariant.image
      ? [selectedVariant.image] // Convert single image to array
      : product.images;

  const shareUrl = `${clienturl}/products/${slugify(product.name)}/${
    product.id
  }`; // dynamic link here
  const title = "Check out this product!";

  const handleVariantClick = (variant: ProductVariant) => {
    if (selectedVariant?.id === variant.id) {
      // If clicking the same variant, unselect it
      setSelectedVariant(null);
      setSelectedImage(0);
    } else {
      // Select the new variant
      setSelectedVariant(variant);
      setSelectedImage(0);
    }
  };

  return (
    <div className="min-h-screen pb-10 bg-gradient-to-br from-slate-50 via-gray-200 to-green-50">
      {/* Animated Background Elements */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb with Animation */}
        <div className="mb-8 animate-fade-in-up">
          <nav className="flex flex-wrap items-center space-x-1 text-[4px] sm:text-[8px] text-gray-500">
            <Link
              href={"/"}
              className="hover:text-[#E53935] cursor-pointer transition-colors"
            >
              <Heading title="Home" />
            </Link>
            <Heading title="/" />
            <Link
              href={"/products"}
              className="hover:text-[#E53935] cursor-pointer transition-colors"
            >
              <Heading title="Products" />
            </Link>{" "}
            <Heading title="/" />
            <Link
              href={`/products?search=${product?.categoryId}`}
              className="hover:text-[#E53935] cursor-pointer transition-colors"
            >
              <Heading title={product?.Category?.name} />
            </Link>
            <Heading title="/" />
            <span className="text-gray-900 font-medium">
              <Heading title={product.name} />
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Images Section */}
          <div className="space-y-6 animate-fade-in-left">
            {displayImages && displayImages.length > 0 && (

            displayImages.length === 1 ? (

              /* ===== SINGLE IMAGE (BIG) ===== */
              <div className="group relative h-[400px] lg:h-[550px] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                <Image
                  src={getImageUrl(displayImages[0])}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>

            ) : (

              /* ===== MULTIPLE IMAGES (2x2 GRID) ===== */
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {displayImages.slice(0, 4).map((file, index) => {
                  const fileType = getFileType(file);

                  return (
                    <div
                      key={index}
                      className="group relative h-[200px] md:h-[360px] overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedImage(index)}
                    >
                      {fileType === "image" ? (
                        <Image
                          src={getImageUrl(file)}
                          alt={`${product.name}-${index}`}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : fileType === "video" ? (
                        <video
                          src={getImageUrl(file)}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : null}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                  );
                })}
              </div>

            )
          )}



            {/* Thumbnail Gallery */}

            {/* {displayImages && displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {displayImages.slice(0, 8).map((file, index) => {
                  const fileType = getFileType(file);

                  return (
                    <div
                      key={index}
                      className={`group aspect-square  relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up ${
                        selectedImage === index ? "ring-2 ring-green-500" : ""
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedImage(index)}
                    >
                      {fileType === "image" ? (
                        <Image
                          unoptimized
                          src={getImageUrl(file)}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : fileType === "video" ? (
                        <video
                          src={getImageUrl(file)}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-gray-500">
                          Unsupported
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                  );
                })}
              </div>
            )} */}
          </div>

          {/* Product Information Section */}
          <div className="space-y-5 animate-fade-in-right">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-row justify-between ">
                <span className=" bg-gradient-to-r from-green-100 to-lime-100 text-[#E53935] text-sm font-semibold px-3 py-2 rounded-full">
                  {product.Category?.name || "Uncategorized"}
                </span>
                <div className="relative inline-block">
                  <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Share2 />
                  </button>

                  {open && (
                    <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 flex gap-2 z-50">
                      <FacebookShareButton url={shareUrl} quote={title}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareUrl} title={title}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={shareUrl} title={title}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton url={shareUrl}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>

                      {/* Copy Link */}
                      <button
                        onClick={handleCopy}
                        className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                        title="Copy link"
                      >
                        <Copy size={28} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Section with Animation */}
            <div className="space-y-1 ">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-3xl font-bold text-black bg-clip-text ">
                    ₹
                    {selectedVariant
                      ? selectedVariant.price
                      : product.discountPrice}
                  </span>
                  /
                  {selectedVariant
                    ? selectedVariant.options
                        .map((option) => option.name)
                        .join(", ")
                    : product?.varientValue}
                </div>
                <span className="text-2xl text-[#E53935] line-through">
                  ₹{product.originalPrice}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-orange-500 ">You save: </span>
                  <span className="text-orange-500 font-bold ml-1">
                    ₹
                    {(
                      parseFloat(product.originalPrice) -
                      parseFloat(
                        selectedVariant
                          ? selectedVariant.price
                          : product.discountPrice,
                      )
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="space-y-4 mt-7  ">
              <div className="flex flex-col gap-4 md:flex-row md:gap-12 md:justify-center md:items-center">
                <button
                  onClick={async () => {
                    await dispatch(
                      addToCart({
                        id: selectedVariant
                          ? `${product.id}-${selectedVariant.id}`
                          : product.id,
                        name: product.name,
                        price: parseFloat(
                          selectedVariant
                            ? selectedVariant.price
                            : product.discountPrice,
                        ),
                        quantity: 1,
                        imageUrl: displayImages?.[0] || "",
                        paymentMethods: product.paymentMethods,
                        variant: selectedVariant
                          ? selectedVariant.options
                              .map((opt) => `${opt.category.name}: ${opt.value}`)
                              .join(", ")
                          : undefined,
                      }),
                    );
                    router.push("/cart");
                  }}
                  className=" group relative bg-[#E53935] hover:bg-red-600 text-white font-semibold py-4 px-16  rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <Wallet />
                    <span>Buy Now</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.name,
                        quantity: 1,
                        // imageUrl: product.images?.[0] || "",
                        paymentMethods: product.paymentMethods,
                        price: parseFloat(
                          selectedVariant
                            ? selectedVariant.price
                            : product.discountPrice,
                        ),

                        imageUrl: displayImages?.[0] || "",
                        variantId: selectedVariant?.id, // e.g. 31
                        variantName: selectedVariant?.options
                          .map((opt) => `${opt.category.name}: ${opt.value}`)
                          .join(", "), // "Dimension: 14*15"
                      }),
                    );
                  }}
                  className=" group bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-600 font-semibold py-4 px-16 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart /> <span>Add to cart</span>
                  </div>
                </button>
              </div>
            </div>


            {/* Description */}
            <Description description={product.description} />


            {/* Product Details Grid */}
            {((!selectedVariant && product?.stock < 10) ||
              (selectedVariant && selectedVariant.stock < 10)) && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Stock Available
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#E53935] rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">
                      {selectedVariant ? selectedVariant.stock : product.stock}{" "}
                      units
                    </span>
                  </div>
                </div>
              </div>
            )}

            

            {/* Variants Section */}
            {product?.ProductVariants && product.ProductVariants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Choose a Variant
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.ProductVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantClick(variant)}
                      className={`p-3 rounded-xl border flex flex-col items-center ${
                        selectedVariant?.id === variant.id
                          ? "bg-green-100 text-green-800 border-green-600 ring-2 ring-green-500"
                          : "bg-white border-gray-300 text-gray-700 hover:border-green-400"
                      }`}
                    >
                      {/* Variant image if available */}
                      {variant.image && (
                        <div className="relative w-16 h-16 mb-2 rounded-md overflow-hidden">
                          <img
                            src={getImageUrl(variant.image)}
                            alt="Variant"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-xs text-gray-500 mt-1">
                        ₹{variant.price}
                      </span>
                      {/* Variant options */}
                      <span className="text-sm font-medium text-center">
                        {variant.options
                          .map((opt) => `${opt.category.name}: ${opt.value}`)
                          .join(", ")}
                      </span>

                      {/* Variant price */}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <YouMayLike/>

      {/* {products.length > 0 && 
      (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((item: any) => (
              
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.images?.[0]}
                price={item.discountPrice}
                originalPrice={item.originalPrice}
                rating={item.ratings ?? 0}
                discount={item.discountPercentage}
                paymentMethods={item.paymentMethods}
              />

            ))}
          </div>
        </div>
      )
      } */}

    </div>

    
  );
}
