import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Anime {
  id: number;
  title: { romaji: string };
  coverImage: { large: string };
  averageScore: number;
  genres: string[];
}

const Trending = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const query = `
          query {
            Page(page: 1, perPage: 10) {
              media(type: ANIME, sort: TRENDING_DESC) {
                id
                title {
                  romaji
                }
                coverImage {
                  large
                }
                averageScore
                genres
              }
            }
          }
        `;

        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        setAnime(data.data.Page.media);
      } catch (err) {
        console.error("Failed to fetch trending anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Trending Anime...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🔥 Trending Anime</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anime.map((a) => (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <Card className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={a.coverImage.large}
                alt={a.title.romaji}
                className="w-full h-60 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{a.title.romaji}</h2>
                <p className="text-sm text-gray-500">
                  ⭐ {a.averageScore ?? "N/A"} / 100
                </p>
                <p className="text-sm">{a.genres.join(", ")}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
