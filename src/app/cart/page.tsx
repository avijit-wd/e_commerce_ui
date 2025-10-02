"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/store/cartStore";
import { ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Classic T-Shirt",
//     shortDescription: "Comfortable cotton t-shirt for everyday wear",
//     description:
//       "Made from 100% organic cotton, this classic t-shirt offers superior comfort and durability. Perfect for casual outings or lounging at home. Features a relaxed fit and soft fabric that gets better with every wash.",
//     price: 29.99,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     colors: ["green", "gray", "pink"],
//     images: {
//       green: "/products/1g.png",
//       blue: "/products/1gr.png", // gray variant
//       black: "/products/1p.png", // pink variant
//     },
//     quantity: 1,
//     selectedSize: "M",
//     selectedColor: "green",
//   },
//   {
//     id: 2,
//     name: "Premium Hoodie",
//     shortDescription: "Cozy hoodie with premium fabric blend",
//     description:
//       "This premium hoodie combines style and comfort with its soft fleece interior and durable exterior. Features an adjustable hood, front pocket, and ribbed cuffs for the perfect fit.",
//     price: 69.99,
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["green", "gray"],
//     images: {
//       green: "/products/2g.png",
//       blue: "/products/2gr.png", // gray variant
//     },
//     quantity: 1,
//     selectedSize: "L",
//     selectedColor: "green",
//   },
//   {
//     id: 3,
//     name: "Denim Jacket",
//     shortDescription: "Stylish denim jacket for all seasons",
//     description:
//       "A timeless denim jacket crafted from high-quality denim fabric. Perfect for layering and adds a classic touch to any outfit. Features button closure, chest pockets, and a comfortable regular fit.",
//     price: 89.99,
//     sizes: ["XS", "S", "M", "L", "XL"],
//     colors: ["blue", "black", "gray"],
//     images: {
//       blue: "/products/3bl.png",
//       black: "/products/3b.png",
//       green: "/products/3gr.png", // gray variant
//     },
//     quantity: 1,
//     selectedSize: "M",
//     selectedColor: "black",
//   },
// ];

export default function CartPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const { cart, removeFromCart } = useCartStore();

  const activeStep = parseInt(searchParams.get("step") || "1");
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* Steps */}
      <div className="flex flex-col lg:flex-row items-center gap-9 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* Steps and Details */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              // Single cart item
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* image and details */}
                <div className="relative flex h-32 w-32 gap-8 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={item.images[item.selectedColor]}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Item details */}
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                    <p className="text-xs text-gray-500">
                      Color: {item.selectedColor}
                    </p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>

                {/* delete button */}
                <button
                  className="w-8 h-8 rounded-full bg-red-100 text-red-400 hover:bg-red-200 transition flex justify-center items-center cursor-pointer"
                  onClick={() => removeFromCart(item)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form.
            </p>
          )}
        </div>
        {/* Details */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="text-sm font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Discount(10%)</p>
              <p className="text-sm font-medium">$10</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Shipping fee</p>
              <p className="text-sm font-medium">$10</p>
            </div>

            <hr className="text-gray-200" />

            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="text-sm font-medium">
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition "
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
