import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    // mock recommendations – replace with API call
    setRecs([
      { title: "Attack on Titan", genre: "Action, Fantasy", rating: 9.2 },
      { title: "Your Lie in April", genre: "Romance, Drama", rating: 8.7 },
      { title: "Demon Slayer", genre: "Action, Adventure", rating: 8.9 },
    ]);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-6 text-center"
      >
        🎬 Your Recommendations
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6">
        {recs.map((anime, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition">
              <CardContent className="p-5">
                <h2 className="text-xl font-bold mb-2">{anime.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{anime.genre}</p>
                <p className="text-yellow-500 font-semibold">
                  ⭐ {anime.rating}
                </p>
                <Button className="mt-3 w-full">Add to Favorites</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
