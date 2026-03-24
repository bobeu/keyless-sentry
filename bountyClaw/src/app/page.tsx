"use client";

import { useState, useEffect } from "react";

// Neo-Brutalist Components
const BrutalistCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-4 border-black bg-white shadow-[4px_4px_0px_000000] p-4 md:p-6 ${className}`}>
    {children}
  </div>
);

const BrutalistButton = ({ children, disabled, className, color = "bg-yellow-400", onClick, type = "button" }: { children: React.ReactNode; color?: string; className?: string; disabled: boolean; onClick?: () => void; type?: "button" | "submit" }) => (
  <button 
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className || `border-4 border-black ${color} px-4 md:px-6 py-2 font-bold shadow-[4px_4px_0px_000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
  >
    {children}
  </button>
);

const BrutalistInput = ({ placeholder, value, onChange, className = "" }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string }) => (
  <input 
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full border-4 border-black p-3 md:p-4 mb-3 md:mb-4 focus:bg-yellow-100 outline-none ${className}`}
  />
);

const BrutalistTextarea = ({ placeholder, value, onChange, className = "" }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string }) => (
  <textarea 
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full border-4 border-black p-3 md:p-4 mb-3 md:mb-4 focus:bg-yellow-100 outline-none resize-none ${className}`}
    rows={4}
  />
);

// Badge Components
const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    OPEN: "bg-[#39FF14]",
    IN_PROGRESS: "bg-yellow-400",
    ESCROWED: "bg-blue-400",
    RELEASED: "bg-[#39FF14]",
    CANCELLED: "bg-red-400",
  };
  
  return (
    <span className={`border-2 border-black px-4 py-1 font-black ${colors[status] || "bg-gray-400"}`}>
      {status}
    </span>
  );
};

const PayoutBadge = () => (
  <span className="bg-[#39FF14] border-2 border-black px-4 py-1 font-black text-black">
    PAYOUT
  </span>
);

// Types
interface Bounty {
  id: string;
  title: string;
  description: string;
  rewardAmount: string;
  currency: string;
  status: string;
  escrowAddress?: string;
  creatorHashId: string;
  createdAt: string;
}

export default function BountyPage() {
  // State
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalEscrowed: "0",
    activeBounties: 0,
    totalHunters: 0
  });

  // Fetch data from database API
  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch('/api/bounties');
        const result = await response.json();
        if (result.success && result.data) {
          setBounties(result.data);
        } else {
          console.error('Failed to fetch bounties:', result.error);
        }
      } catch (error) {
        console.error('Error fetching bounties:', error);
      }
    };
    
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const result = await response.json();
        if (result.success && result.data) {
          setStats(result.data);
        } else {
          console.error('Failed to fetch stats:', result.error);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchBounties();
    fetchStats();
  }, []);

  const handleCreateBounty = async () => {
    if (!title || !description || !reward) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/bounties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          rewardAmount: reward,
          currency: "cUSD",
          creatorHashId: "0xOWNER",
        }),
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const newBounty: Bounty = {
          id: result.data.id,
          title: result.data.title,
          description: result.data.description,
          rewardAmount: result.data.rewardAmount,
          currency: result.data.currency,
          status: result.data.status,
          creatorHashId: result.data.creatorHashId,
          createdAt: result.data.createdAt,
        };
        
        setBounties([newBounty, ...bounties]);
      } else {
        console.error('Failed to create bounty:', result.error);
      }
    } catch (error) {
      console.error('Error creating bounty:', error);
    }
    
    setTitle("");
    setDescription("");
    setReward("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen max-w-7xl text-black p-4 md:p-8 font-['Comic_Sans_MS','Comic_Sans_MS',criterion]">
      {/* Header */}
      <header className="border-4 border-black bg-yellow-400 p-4 md:p-6 mb-6 md:mb-8 shadow-[4px_4px_0px_000000]">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase italic">BountyClaw: The Arbiter</h1>
        <p className="text-lg md:text-xl font-bold mt-2">Autonomous Gig Economy Protocol</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* TVL Metrics */}
         <BrutalistCard className="md:col-span-4 bg-white">
           <h2 className="text-lg md:text-xl font-bold uppercase underline mb-2 md:mb-4">Total Escrowed</h2>
           <p className="text-2xl md:text-4xl font-black text-[#39FF14] drop-shadow-[2px_2px_0_#000]">{stats.totalEscrowed} cUSD</p>
         </BrutalistCard>
         
         {/* Active Bounties Count */}
         <BrutalistCard className="md:col-span-4 bg-white">
           <h2 className="text-lg md:text-xl font-bold uppercase underline mb-2 md:mb-4">Active Bounties</h2>
           <p className="text-2xl md:text-4xl font-black">{stats.activeBounties}</p>
         </BrutalistCard>
         
         {/* Hunters */}
         <BrutalistCard className="md:col-span-4 bg-white">
           <h2 className="text-lg md:text-xl font-bold uppercase underline mb-2 md:mb-4">Total Hunters</h2>
           <p className="text-2xl md:text-4xl font-black">{stats.totalHunters}</p>
         </BrutalistCard>
       
        {/* Post Bounty */}
        <BrutalistCard className="md:col-span-8 bg-white">
          <h2 className="text-xl md:text-2xl font-black mb-4 uppercase">Post a New Task</h2>
          <BrutalistInput 
            placeholder="Task Title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <BrutalistTextarea 
            placeholder="Task Description..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <BrutalistInput 
            placeholder="Reward Amount (cUSD)..." 
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />
          <BrutalistButton 
            onClick={handleCreateBounty}
            disabled={loading}
          >
            {loading ? "DEPLOYING..." : "Deploy Escrow Vault"}
          </BrutalistButton>
        </BrutalistCard>
        
        {/* Quick Stats */}
        <BrutalistCard className="md:col-span-4 bg-white">
          <h2 className="text-lg md:text-xl font-bold uppercase underline mb-2 md:mb-4">Quick Actions</h2>
          <div className="space-y-2 md:space-y-4">
            <BrutalistButton color="bg-white" className="w-full text-sm md:text-base" disabled={false}>
              View My Bounties
            </BrutalistButton>
            <BrutalistButton color="bg-white" className="w-full text-sm md:text-base" disabled={false}>
              My Submissions
            </BrutalistButton>
            <BrutalistButton color="bg-white" className="w-full text-sm md:text-base" disabled={false}>
              Escrow Balance
            </BrutalistButton>
          </div>
        </BrutalistCard>
        
        {/* Bounty Feed */}
        <div className="md:col-span-12">
          <BrutalistCard className="bg-white">
            <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 border-b-4 border-black pb-2">Active Bounties</h2>
            <div className="space-y-4">
              {bounties.map((bounty) => (
                <div 
                  key={bounty.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 border-b-2 border-black py-4 hover:bg-yellow-50"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold truncate">{bounty.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{bounty.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(bounty.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <StatusBadge status={bounty.status} />
                    <span className="text-lg md:text-xl font-black border-2 border-black bg-yellow-400 px-3 md:px-4 py-1">
                      {bounty.rewardAmount} {bounty.currency}
                    </span>
                    {bounty.status === "ESCROWED" && <PayoutBadge />}
                    {bounty.status !== "OPEN" && bounty.status !== "ESCROWED" ? (
                      <BrutalistButton color="bg-gray-200" className="text-xs md:text-sm" disabled={false}>
                        View
                      </BrutalistButton>
                    ) : (
                      <BrutalistButton color="bg-white" className="text-xs md:text-sm" disabled={false}>
                        Join
                      </BrutalistButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </BrutalistCard>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 md:mt-12 border-4 border-black p-4 md:p-6 text-center">
        <p className="font-bold text-sm md:text-base">BountyClaw: The Autonomous Gig Economy Hub</p>
        <p className="text-xs md:text-sm">Powered by Keyless Collective SDK • ERC-8004 Compatible</p>
      </footer>
    </div>
  );
}