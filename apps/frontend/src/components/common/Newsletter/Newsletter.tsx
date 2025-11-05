import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      // TODO: Добавить API запрос позже
      // await subscribeToNewsletter(email);

      // Симуляция задержки
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          {/* Left Image */}
          <div className="hidden md:block">
            <img
              src="/images/newsletter/model-1.png"
              alt="Fashion Model"
              className="h-auto w-full object-contain"
              onError={e => {
                e.currentTarget.src = "https://via.placeholder.com/300x400?text=Model";
              }}
            />
          </div>

          {/* Center Content */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-black">Subscribe To Our Newsletter</h2>
            <p className="mx-auto mb-8 max-w-md text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam
              sem. Scelerisque duis ultrices sollicitudin
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="michael@ymail.com"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Image */}
          <div className="hidden md:block">
            <img
              src="/images/newsletter/model-2.png"
              alt="Fashion Model"
              className="h-auto w-full object-contain"
              onError={e => {
                e.currentTarget.src = "https://via.placeholder.com/300x400?text=Model";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
