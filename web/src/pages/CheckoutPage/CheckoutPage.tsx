import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { CreditCard, Truck, AlertCircle } from "lucide-react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Имя должно быть минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().regex(/^\+[\d\s()-]{10,}$/, "Введите номер в формате +123 456 789 012"),
  address: z.string().min(5, "Адрес слишком короткий"),
  city: z.string().min(2, "Город минимум 2 символа"),
  state: z.string().min(2, "Штат минимум 2 символа"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Неверный ZIP код"),
  orderNotes: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  cardName: z.string().optional()
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({});
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});


  useEffect(() => {
    const savedInfo = localStorage.getItem("checkoutInfo");
    if (savedInfo) {
      try {
        const parsed = JSON.parse(savedInfo);
        setFormData(parsed);
        toast.success("Сохранённые данные загружены");
      } catch (e) {
        console.error("Failed to load saved info", e);
      }
    }
  }, []);

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };


  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(" ") : numbers;
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) return numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    return numbers;
  };


  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "+";
    const cc = digits.slice(0, 3);
    const rest = digits.slice(3);
    const g1 = rest.slice(0, 3);
    const g2 = rest.slice(3, 6);
    const g3 = rest.slice(6, 10);
    let out = "+" + cc;
    if (g1) out += " " + g1;
    if (g2) out += " " + g2;
    if (g3) out += " " + g3;
    return out;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof CheckoutFormData;
        errors[field] = issue.message;
      });
      setFieldErrors(errors);
      toast.error("Исправьте ошибки в форме");
      return;
    }

    const data = result.data;


    if (paymentMethod === "card") {
      if (!data.cardNumber || !data.cardExpiry || !data.cardCvv || !data.cardName) {
        toast.error("Заполните данные карты");
        return;
      }
      const cardDigits = data.cardNumber.replace(/\D/g, "");
      if (cardDigits.length !== 16) {
        toast.error("Номер карты должен содержать 16 цифр");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
        toast.error("Неверный формат срока (MM/YY)");
        return;
      }
      if (!/^\d{3,4}$/.test(data.cardCvv)) {
        toast.error("CVV должен быть 3–4 цифры");
        return;
      }
    }

    setIsSubmitting(true);

    const shippingCost =
      deliveryMethod === "standard" && subtotal >= 122.35
        ? 0
        : deliveryMethod === "standard"
          ? 10
          : deliveryMethod === "express"
            ? 20
            : 35;

    const orderData = {
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: {
          street: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        }
      },
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      })),
      payment: {
        method: paymentMethod,
        ...(paymentMethod === "card" && { cardLast4: data.cardNumber?.slice(-4) })
      },
      delivery: { method: deliveryMethod, cost: shippingCost },
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
      orderNotes: data.orderNotes,
      createdAt: new Date().toISOString()
    };

    console.log("=== ORDER SUBMITTED ===");
    console.log(JSON.stringify(orderData, null, 2));

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error("Failed to submit order");

      if (saveInfo) {
        const infoToSave = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        };
        localStorage.setItem("checkoutInfo", JSON.stringify(infoToSave));
        toast.success("Информация сохранена для будущих заказов");
      }

      toast.success("Заказ успешно оформлен!");
      clearCart();
      setTimeout(() => navigate("/thank-you"), 1000);
    } catch (err) {
      console.error("Order submission error:", err);
      toast.error("Ошибка оформления. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <Header />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 text-sm text-gray-500" style={{ fontFamily: "Poppins" }}>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            /{" "}
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>{" "}
            / <span>Checkout</span>
          </div>

          <h1 className="mb-8 text-3xl font-bold" style={{ fontFamily: "Volkhov" }}>
            Checkout
          </h1>

          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-4 text-lg text-gray-600">Your cart is empty</p>
              <Link
                to="/shop"
                className="inline-block rounded bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800"
                style={{ fontFamily: "Poppins" }}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
              <div>
                <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "Poppins" }}>
                  Billing Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName || ""}
                        onChange={e => handleFieldChange("firstName", e.target.value)}
                        className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.firstName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {fieldErrors.firstName && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} /> {fieldErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName || ""}
                        onChange={e => handleFieldChange("lastName", e.target.value)}
                        className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.lastName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {fieldErrors.lastName && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} /> {fieldErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={e => handleFieldChange("email", e.target.value)}
                      className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Phone Number</label>
                    <div>
                      <input
                        type="tel"
                        value={formData.phone || "+"}
                        onChange={e => handleFieldChange("phone", formatPhone(e.target.value || "+"))}
                        onFocus={() => {
                          if (!formData.phone) handleFieldChange("phone", "+");
                        }}
                        placeholder="+123 456 789 012"
                        className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.phone ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Street Address</label>
                    <input
                      type="text"
                      value={formData.address || ""}
                      onChange={e => handleFieldChange("address", e.target.value)}
                      placeholder="House number and street name"
                      className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.address ? "border-red-500" : "border-gray-300"}`}
                    />
                    {fieldErrors.address && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {fieldErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">City</label>
                    <input
                      type="text"
                      value={formData.city || ""}
                      onChange={e => handleFieldChange("city", e.target.value)}
                      className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.city ? "border-red-500" : "border-gray-300"}`}
                    />
                    {fieldErrors.city && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {fieldErrors.city}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">State</label>
                      <input
                        type="text"
                        value={formData.state || ""}
                        onChange={e => handleFieldChange("state", e.target.value)}
                        className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.state ? "border-red-500" : "border-gray-300"}`}
                      />
                      {fieldErrors.state && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} /> {fieldErrors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">ZIP Code</label>
                      <input
                        type="text"
                        value={formData.zipCode || ""}
                        onChange={e => handleFieldChange("zipCode", e.target.value)}
                        placeholder="12345"
                        className={`w-full rounded border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${fieldErrors.zipCode ? "border-red-500" : "border-gray-300"}`}
                      />
                      {fieldErrors.zipCode && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} /> {fieldErrors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Order Notes (Optional)</label>
                    <textarea
                      value={formData.orderNotes || ""}
                      onChange={e => handleFieldChange("orderNotes", e.target.value)}
                      rows={4}
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={saveInfo}
                        onChange={e => setSaveInfo(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black"
                      />
                      <div>
                        <div className="font-medium text-blue-900">Save this info for future</div>
                        <div className="text-sm text-blue-700">
                          Your information will be saved securely for faster checkout next time
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

         
                <div className="mt-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold" style={{ fontFamily: "Poppins" }}>
                    <CreditCard size={24} /> Payment
                  </h2>
                  <div className="space-y-4 rounded-lg border border-gray-200 p-6">
                    <div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={e => setPaymentMethod(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Credit / Debit Card</div>
                          <div className="text-sm text-gray-500">Pay securely with your card</div>
                        </div>
                      </label>

                      {paymentMethod === "card" && (
                        <div className="mt-4 space-y-4 rounded-lg bg-gray-50 p-4">
                          <div>
                            <label className="mb-1 block text-sm font-medium">Card Number</label>
                            <input
                              type="text"
                              value={formData.cardNumber || ""}
                              onChange={e => handleFieldChange("cardNumber", formatCardNumber(e.target.value))}
                              onKeyPress={e => {
                                if (!/\d/.test(e.key)) e.preventDefault();
                              }}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="mb-1 block text-sm font-medium">Expiry Date</label>
                              <input
                                type="text"
                                value={formData.cardExpiry || ""}
                                onChange={e => handleFieldChange("cardExpiry", formatExpiry(e.target.value))}
                                onKeyPress={e => {
                                  if (!/\d/.test(e.key)) e.preventDefault();
                                }}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-sm font-medium">CVV</label>
                              <input
                                type="text"
                                value={formData.cardCvv || ""}
                                onChange={e => handleFieldChange("cardCvv", e.target.value)}
                                onKeyPress={e => {
                                  if (!/\d/.test(e.key)) e.preventDefault();
                                }}
                                placeholder="123"
                                maxLength={4}
                                className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">Cardholder Name</label>
                            <input
                              type="text"
                              value={formData.cardName || ""}
                              onChange={e => handleFieldChange("cardName", e.target.value)}
                              placeholder="John Doe"
                              className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-gray-500">Pay with your PayPal account</div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-500">Pay when you receive your order</div>
                      </div>
                    </label>
                  </div>
                </div>

            
                <div className="mt-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold" style={{ fontFamily: "Poppins" }}>
                    <Truck size={24} /> Delivery
                  </h2>
                  <div className="space-y-4 rounded-lg border border-gray-200 p-6">
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={deliveryMethod === "standard"}
                        onChange={e => setDeliveryMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Standard Delivery</div>
                          <div className="font-semibold">{subtotal >= 122.35 ? "Free" : "$10.00"}</div>
                        </div>
                        <div className="text-sm text-gray-500">Delivery within 5-7 business days</div>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={deliveryMethod === "express"}
                        onChange={e => setDeliveryMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Express Delivery</div>
                          <div className="font-semibold">$20.00</div>
                        </div>
                        <div className="text-sm text-gray-500">Delivery within 2-3 business days</div>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        value="overnight"
                        checked={deliveryMethod === "overnight"}
                        onChange={e => setDeliveryMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Overnight Delivery</div>
                          <div className="font-semibold">$35.00</div>
                        </div>
                        <div className="text-sm text-gray-500">Next business day delivery</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

          
              <div>
                <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "Poppins" }}>
                  Your Order
                </h2>
                <div className="rounded-lg bg-gray-50 p-6">
                  <div className="mb-4 border-b pb-4">
                    <div className="mb-2 flex justify-between font-semibold">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>
                  </div>
                  <div className="mb-4 space-y-3 border-b pb-4">
                    {cart.map(item => (
                      <div
                        key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                          {item.selectedSize && ` (${item.selectedSize})`}
                          {item.selectedColor && ` - ${item.selectedColor}`}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4 space-y-3 border-b pb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        Shipping (
                        {deliveryMethod === "standard"
                          ? "Standard"
                          : deliveryMethod === "express"
                            ? "Express"
                            : "Overnight"}
                        )
                      </span>
                      <span className="font-medium">
                        {deliveryMethod === "standard" && subtotal >= 122.35
                          ? "Free"
                          : deliveryMethod === "standard"
                            ? "$10.00"
                            : deliveryMethod === "express"
                              ? "$20.00"
                              : "$35.00"}
                      </span>
                    </div>
                  </div>
                  <div className="mb-6 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        subtotal +
                        (deliveryMethod === "standard" && subtotal >= 122.35
                          ? 0
                          : deliveryMethod === "standard"
                            ? 10
                            : deliveryMethod === "express"
                              ? 20
                              : 35)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="block w-full rounded bg-black py-3 text-center font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
