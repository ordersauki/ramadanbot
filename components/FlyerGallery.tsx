import React, { useState, useEffect } from 'react';
import { FormData } from '../types';
import { downloadFlyer } from '../lib/flyerGenerator';
import { Download, Trash2, RotateCcw } from 'lucide-react';

interface StoredFlyer {
  id: string;
  dataUrl: string;
  fileName: string;
  formData: FormData;
  createdAt: string;
}

const FlyerGallery: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [flyers, setFlyers] = useState<StoredFlyer[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadFlyers();
    }
  }, [isOpen]);

  const loadFlyers = () => {
    try {
      const stored = localStorage.getItem('ramadanBot_flyerHistory');
      if (stored) {
        setFlyers(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load flyer history', e);
    }
  };

  const saveFlyerHistory = (updatedFlyers: StoredFlyer[]) => {
    localStorage.setItem('ramadanBot_flyerHistory', JSON.stringify(updatedFlyers));
    setFlyers(updatedFlyers);
  };

  const deleteFlyerHistory = (deleteId: string) => {
    const updated = flyers.filter(f => f.id !== deleteId);
    saveFlyerHistory(updated);
    setShowConfirmDelete(null);
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to delete all flyers? This cannot be undone.')) {
      saveFlyerHistory([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">📸 Flyer Gallery</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {flyers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-3">No flyers generated yet</p>
              <p className="text-gray-400 text-sm">Generate your first flyer to see it here!</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600 font-medium">You have {flyers.length} flyer{flyers.length !== 1 ? 's' : ''}</p>
                <button
                  onClick={clearAllHistory}
                  className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {flyers.map((flyer) => (
                  <div
                    key={flyer.id}
                    className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-square bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={flyer.dataUrl}
                        alt={`Day ${flyer.formData.day} - ${flyer.formData.topic}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Day {flyer.formData.day} - {flyer.formData.topic}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {flyer.formData.userName} • {new Date(flyer.createdAt).toLocaleDateString()}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadFlyer(flyer.dataUrl, flyer.fileName)}
                          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-1 transition-colors"
                        >
                          <Download size={14} />
                          Download
                        </button>
                        <button
                          onClick={() => setShowConfirmDelete(flyer.id)}
                          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-1 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>

                      {/* Delete Confirmation */}
                      {showConfirmDelete === flyer.id && (
                        <div className="mt-3 bg-red-50 p-3 rounded-lg border border-red-200">
                          <p className="text-red-700 text-sm font-medium mb-2">Delete this flyer?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteFlyerHistory(flyer.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded font-medium text-xs transition-colors"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setShowConfirmDelete(null)}
                              className="flex-1 bg-red-200 hover:bg-red-300 text-red-900 py-1 rounded font-medium text-xs transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlyerGallery;
