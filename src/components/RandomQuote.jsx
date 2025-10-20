import { RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function RandomQuote() {
  const [quote, setQuote] = useState({
    content: "Loading...",
    author: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      setQuote({
        content: data.quote,
        author: data.author
      });
    } catch(err) {
      setQuote({
        content: "Failed to load quote. Please try again",
        author: ""
      });
      console.error("Error fetching quote", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-[#2A2A40]/70 text-white place-self-center w-11/12 max-w-md flex flex-col p-6 md:p-8 rounded-xl backdrop-blur-xl border border-white/15 shadow-md shadow-black">
      <div className="mb-8">
        <svg className="w-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
        <p className="text-lg md:text-xl leading-relaxed mb-6 font-julee-regular ml-6">
          {quote.content}
        </p>
        {quote.author && (
          <p className="text-sm text-white/60 italic text-right">
            ~ {quote.author}
          </p>
        )}
      </div>
      
      <button onClick={fetchQuote} disabled={loading} className="flex place-self-start gap-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 px-4 py-2 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20">
        <RefreshCw className={`${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Loading...' : 'New Quote'}</span>
      </button>
    </div>
  )
}