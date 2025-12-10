import React from 'react';
import { Plus, Users, CheckCircle, Search, ChevronRight, TrendingUp } from 'lucide-react';

interface Props {
  onNewApplication: () => void;
}

export const Dashboard: React.FC<Props> = ({ onNewApplication }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Users size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Active Leads</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-1">
              <TrendingUp size={12} /> +2 from yesterday
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <CheckCircle size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Sanctioned</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">8</div>
            <div className="text-xs text-gray-400 mt-1 font-medium">This month</div>
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <button 
        onClick={onNewApplication}
        className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white p-5 rounded-2xl shadow-xl shadow-blue-200/50 flex items-center justify-between group transition-all transform active:scale-[0.99]"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <Plus size={28} />
          </div>
          <div className="text-left">
            <div className="font-bold text-lg">New Application</div>
            <div className="text-blue-200 text-xs font-medium mt-0.5">Start KYC & Income Assessment</div>
          </div>
        </div>
        <div className="bg-white/10 p-2 rounded-full">
          <ChevronRight className="text-white group-hover:translate-x-0.5 transition-transform" size={20} />
        </div>
      </button>

      {/* Recent Applications List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-gray-800 text-sm">Recent Interactions</h3>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { name: "Rajesh Kumar", type: "Home Loan", amount: "₹45L", status: "Processing", date: "2 hrs ago", color: "blue" },
            { name: "Anita Desai", type: "LAP", amount: "₹22L", status: "Doc Pending", date: "5 hrs ago", color: "amber" },
            { name: "Vikram Singh", type: "Home Loan", amount: "₹60L", status: "Submitted", date: "Yesterday", color: "emerald" },
            { name: "Meera Reddy", type: "Personal", amount: "₹12L", status: "Rejected", date: "2 days ago", color: "red" },
          ].map((item, i) => (
            <div key={i} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between group">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide
                    ${item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                      item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                      item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-red-50 text-red-600'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                  <span>{item.type}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{item.amount}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                 <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400" />
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-slate-50/50 text-center border-t border-gray-100">
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide">View All Applications</button>
        </div>
      </div>
    </div>
  );
};