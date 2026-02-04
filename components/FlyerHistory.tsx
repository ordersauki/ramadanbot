import React, { useState, useEffect } from 'react';
import { Trash2, Download, Eye } from 'lucide-react';

interface FlyerHistoryItem {
  id: string;
  day: number;
  topic: string;
  userName: string;
  message: string;
  dataUrl: string;
  generatedAt: Date;
}

const FlyerHistory: React.FC = () => {
  const [flyers, setFlyers] = useState<FlyerHistoryItem[]>([]);
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerHistoryItem | null>(null);

  useEffect(() => {
    loadFlyers();
  }, []);

  const loadFlyers = () => {
    // In a real app, this would load from localStorage or a database
    const stored = localStorage.getItem('ramadanBot_rateLimit');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.flyerData) {
          const flyer: FlyerHistoryItem = {
            id: `flyer-${Date.now()}`,
            day: data.flyerData.formData.day,
            topic: data.flyerData.formData.topic,
            userName: data.flyerData.formData.userName,
            message: 'Your spiritual message',
            dataUrl: data.flyerData.dataUrl,
            generatedAt: new Date(data.lastGeneration),
          };
          setFlyers([flyer]);
        }
      } catch (e) {
        console.error('Error loading flyer history', e);
      }
    }
  };

  const handleDownload = (flyer: FlyerHistoryItem) => {
    const link = document.createElement('a');
    link.href = flyer.dataUrl;
    link.download = `ramadan-day-${flyer.day}-${flyer.topic.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    setFlyers(flyers.filter(f => f.id !== id));
    if (selectedFlyer?.id === id) {
      setSelectedFlyer(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">📚 Your Flyer Archive</h2>
        <p className="text-gray-600 mt-2">View and manage your spiritual reflections</p>
      </div>

      {flyers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center border border-gray-100">
          <div className="text-5xl mb-4">🎨</div>
          <p className="text-gray-600 text-lg">No flyers yet. Start generating your first reflection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flyer Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flyers.map((flyer) => (
                <div
                  key={flyer.id}
                  onClick={() => setSelectedFlyer(flyer)}
                  className={`rounded-2xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
                    selectedFlyer?.id === flyer.id
                      ? 'ring-4 ring-teal-500 shadow-xl'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  <img
                    src={flyer.dataUrl}
                    alt={`Day ${flyer.day} - ${flyer.topic}`}
                    className="w-full h-60 object-cover"
                  />
                  <div className="bg-white p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">Day {flyer.day}</p>
                        <p className="text-sm text-gray-600">{flyer.topic}</p>
                      </div>
                      <span className="text-xs bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold">
                        {flyer.generatedAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">by {flyer.userName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Panel */}
          {selectedFlyer && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Preview</h3>
                
                <img
                  src={selectedFlyer.dataUrl}
                  alt={`Day ${selectedFlyer.day}`}
                  className="w-full rounded-xl mb-6 shadow-md"
                />

                <div className="space-y-3 mb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500">DAY</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedFlyer.day}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500">TOPIC</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedFlyer.topic}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500">GENERATED</p>
                    <p className="text-sm text-gray-700">{selectedFlyer.generatedAt.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleDownload(selectedFlyer)}
                    className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    <Download size={18} />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFlyer.id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlyerHistory;
