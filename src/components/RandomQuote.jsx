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
      const data = await res.json;
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
    <div className="bg-[#2A2A40]/70 text-white place-self-center w-11/12 max-w-md flex flex-col p-3 md:p-7 rounded-xl backdrop-blur-xl border border-white/15 shadow-md shadow-black">
      <p className="text-3xl text-center">Halow</p>
    </div>
  )
}