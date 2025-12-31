import React, { useState } from 'react';
import { Alarm } from '../types';
import { Plus, X, Trash2, Webhook, Clock } from 'lucide-react';

interface AlarmManagerProps {
  alarms: Alarm[];
  addAlarm: (alarm: Alarm) => void;
  removeAlarm: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AlarmManager: React.FC<AlarmManagerProps> = ({ alarms, addAlarm, removeAlarm, isOpen, onClose }) => {
  const [newType, setNewType] = useState<'datetime' | 'daily'>('daily');
  const [newTime, setNewTime] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime) return;

    const alarm: Alarm = {
      id: crypto.randomUUID(),
      type: newType,
      targetTime: newTime,
      webhookUrl: newUrl || undefined,
      label: newLabel || undefined,
      triggered: false,
    };

    addAlarm(alarm);
    setNewTime('');
    setNewUrl('');
    setNewLabel('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5" /> Alarms & Webhooks
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className={`flex-1 py-1 text-sm rounded-md transition ${newType === 'daily' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                onClick={() => setNewType('daily')}
              >
                Daily Time
              </button>
              <button
                type="button"
                className={`flex-1 py-1 text-sm rounded-md transition ${newType === 'datetime' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                onClick={() => setNewType('datetime')}
              >
                Specific Date
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">When?</label>
              <input
                type={newType === 'datetime' ? 'datetime-local' : 'time'}
                step="1"
                required
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Webhook URL (Optional)</label>
              <input
                type="url"
                placeholder="https://api.example.com/trigger"
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-600"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Label (Optional)</label>
              <input
                type="text"
                placeholder="Morning Routine"
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-600"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Trigger
            </button>
          </form>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Upcoming</h3>
            {alarms.length === 0 && (
              <div className="text-center py-8 text-slate-600 text-sm italic">
                No alarms set.
              </div>
            )}
            {alarms.map(alarm => (
              <div key={alarm.id} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between group border border-transparent hover:border-slate-600 transition">
                <div>
                  <div className="font-mono text-lg text-white">
                    {alarm.type === 'datetime' ? new Date(alarm.targetTime).toLocaleString() : alarm.targetTime}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {alarm.webhookUrl ? <Webhook className="w-3 h-3 text-green-400" /> : <Clock className="w-3 h-3 text-yellow-400" />}
                    <span className="truncate max-w-[150px]">{alarm.label || (alarm.webhookUrl ? 'Webhook' : 'Alarm')}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeAlarm(alarm.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-700 rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmManager;