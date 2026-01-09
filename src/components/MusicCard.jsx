export default function MusicCard({ image, title, artist }) {
  return (
    <div className="bg-[#181818] hover:bg-[#222] transition rounded-xl p-4 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="rounded-lg w-full h-44 object-cover mb-4"
      />
      <h3 className="font-semibold truncate">{title}</h3>
      <p className="text-sm text-gray-400 truncate">{artist}</p>
    </div>
  );
}
