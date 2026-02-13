import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';

const Attendance: React.FC = () => {
  const [session, setSession] = useState<{startTime: string, status: string, location?: {lat: number, lng: number}} | null>(null);
  const [timeWorked, setTimeWorked] = useState('00h 00m 00s');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  useEffect(() => {
    const current = db.attendance.getSession();
    setSession(current);

    // Get initial location for map preview if not clocked in
    if (!current) {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => console.error(err)
        );
    }

    const interval = setInterval(() => {
        if (current) {
            const start = new Date(current.startTime).getTime();
            const now = new Date().getTime();
            const diff = now - start;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeWorked(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
        } else {
            setTimeWorked('00h 00m 00s');
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleClock = () => {
      if (session) {
          db.attendance.clockOut();
          setSession(null);
          setUserLocation(null);
      } else {
          setLoadingLoc(true);
          navigator.geolocation.getCurrentPosition(
            (pos) => {
                const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setSession(db.attendance.clockIn(loc));
                setUserLocation(loc);
                setLoadingLoc(false);
            },
            (err) => {
                alert("Location access is required to clock in.");
                setLoadingLoc(false);
            }
          );
      }
  };

  return (
    <div className="flex flex-col h-full bg-background-light">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 sticky top-0 z-10">
         <div className="flex items-center gap-4">
             <h2 className="text-2xl font-black tracking-tight text-text-main">Attendance</h2>
             <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded">PRO</span>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
         <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-10">
            {/* Top Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Clock In/Out */}
                <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-card border border-slate-100 flex flex-col justify-between h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-[140px] text-primary">schedule</span>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Current Session</span>
                                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${session ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                    <span className={`size-2 rounded-full animate-pulse ${session ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {session ? 'Clocked In' : 'Clocked Out'}
                                </span>
                            </div>
                            <h3 className="text-4xl font-black text-text-main tabular-nums tracking-tight">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                            <p className="text-secondary font-medium mt-1">{new Date().toLocaleDateString(undefined, {weekday: 'long', month: 'short', day: 'numeric'})}</p>
                        </div>
                        <div className="mt-8">
                             <div className="flex justify-between items-end mb-4">
                                <div className="text-right w-full">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Worked Today</p>
                                    <p className="text-sm font-semibold text-text-main">{timeWorked}</p>
                                </div>
                            </div>
                            <button disabled={loadingLoc} onClick={toggleClock} className={`w-full h-12 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${session ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-primary hover:bg-primary-hover shadow-primary/30'} ${loadingLoc ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                {loadingLoc ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">{session ? 'logout' : 'login'}</span>}
                                {loadingLoc ? 'Locating...' : (session ? 'Clock Out' : 'Clock In')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Location Map Placeholder */}
                <div className="md:col-span-7 lg:col-span-8">
                    <div className="bg-white rounded-xl p-6 shadow-card border border-slate-100 h-full min-h-[300px] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-text-main">Your Location</h3>
                            {session?.location && <span className="text-xs text-green-600 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">my_location</span> Verified</span>}
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden flex items-center justify-center">
                            {userLocation || session?.location ? (
                                <div className="text-center">
                                    <div className="size-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                                        <span className="material-symbols-outlined text-3xl">location_on</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-600">
                                        Lat: {(session?.location?.lat || userLocation?.lat)?.toFixed(4)}, 
                                        Lng: {(session?.location?.lng || userLocation?.lng)?.toFixed(4)}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">Map visualization placeholder</p>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined">location_disabled</span>
                                    Location unavailable
                                </p>
                            )}
                        </div>
                        <div className="mt-4 flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                             <div className="flex items-center gap-2">
                                 <span className="material-symbols-outlined text-yellow-600">notifications_active</span>
                                 <div>
                                     <p className="text-sm font-bold text-yellow-800">Automatic Reminders</p>
                                     <p className="text-xs text-yellow-700">Get notified to clock out after 8 hours.</p>
                                 </div>
                             </div>
                             <div 
                                onClick={() => setRemindersEnabled(!remindersEnabled)}
                                className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${remindersEnabled ? 'bg-primary' : 'bg-gray-300'}`}
                             >
                                 <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${remindersEnabled ? 'left-5' : 'left-1'}`}></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Attendance;