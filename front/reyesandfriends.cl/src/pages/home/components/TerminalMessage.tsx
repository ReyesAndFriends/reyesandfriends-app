export default function TerminalMessage() {
  return (
    <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      </div>
      <div className="flex-1 flex justify-center">
        <span className="text-gray-400 text-xs font-semibold">Tu futuro software!</span>
      </div>
      <div className="w-12" />
    </div>

    <div className="whitespace-pre-wrap leading-relaxed">
      <span className="text-white">[user@reyesandfriends.cl ~]$</span> <span className="text-gray-400">systemctl start tu_proyecto.service</span>
      <br />
      <span className="text-white">[user@reyesandfriends.cl ~]$</span> <span className="text-gray-400">./resolver_situacion --problemas --a-tiempo</span>
      <br />
      <span className="text-white">[user@reyesandfriends.cl ~]$</span> <span className="text-gray-400">dnf install dedicacion compromiso resultados</span>
      <br />
      <span className="text-white">[user@reyesandfriends.cl ~]$</span> <span className="text-gray-400">npx experiencia --clientes="tú"</span>
      <br />
      <span className="text-white">[user@reyesandfriends.cl ~]$</span> <span className="text-gray-400">echo "Tu proyecto se configura automáticamente con cariño y precisión por nuestro equipo técnico. 🛠️💻" &gt; message.txt</span>
      <br />
      <span className="text-white">[user@reyesandfriends.cl ~]$</span> <span className="text-gray-400">cat message.txt</span>
      <br />
      Tu proyecto se configura automáticamente con cariño y precisión por nuestro equipo técnico. 🛠️💻
    </div>
    </div>
  );
}
