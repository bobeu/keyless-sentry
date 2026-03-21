"use client";

import { useState, useEffect } from "react";

// Neo-Brutalist Components
const BrutalistCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-4 border-black bg-white shadow-[4px_4px_0px_000000] p-6 ${className}`}>
    {children}
  </div>
);

const BrutalistButton = ({ children, color = "bg-yellow-400", onClick, type = "button" }: { children: React.ReactNode; color?: string; onClick?: () => void; type?: "button" | "submit" }) => (
  <button 
    type={type}
    onClick={onClick}
    className={`border-4 border-black ${color} px-6 py-2 font-bold shadow-[4px_4px_0px_000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
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
    className={`w-full border-4 border-black p-4 mb-4 focus:bg-yellow-100 outline-none ${className}`}
  />
);

const BrutalistTextarea = ({ placeholder, value, onChange, className = "" }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string }) => (
  <textarea 
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full border-4 border-black p-4 mb-4 focus:bg-yellow-100 outline-none resize-none ${className}`}
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

  // Mock data for demo
  useEffect(() => {
    setBounties([
      {
        id: "1",
        title: "Fix GitHub Bug #101",
        description: "Authentication error in login flow",
        rewardAmount: "20",
        currency: "cUSD",
        status: "OPEN",
        creatorHashId: "0x1234",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Add Dark Mode Toggle",
        description: "Implement dark mode switch in settings",
        rewardAmount: "50",
        currency: "cUSD",
        status: "IN_PROGRESS",
        creatorHashId: "0x5678",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Write API Documentation",
        description: "Complete OpenAPI spec for v2 endpoints",
        rewardAmount: "100",
        currency: "cUSD",
        status: "ESCROWED",
        escrowAddress: "0xabcd",
        creatorHashId: "0x9abc",
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const handleCreateBounty = async () => {
    if (!title || !description || !reward) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBounty: Bounty = {
      id: String(Date.now()),
      title,
      description,
      rewardAmount: reward,
      currency: "cUSD",
      status: "OPEN",
      creatorHashId: "0xOWNER",
      createdAt: new Date().toISOString(),
    };
    
    setBounties([newBounty, ...bounties]);
    setTitle("");
    setDescription("");
    setReward("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 font-['Comic_Sans_MS','Comic_Sans_MS',cursive]">
      {/* Header */}
      <header className="border-4 border-black bg-yellow-400 p-6 mb-8 shadow-[4px_4px_0px_000000]">
        <h1 className="text-5xl font-black uppercase italic">Bounty-Bot: The Arbiter</h1>
        <p className="text-xl font-bold mt-2">Autonomous Gig Economy Protocol</p>
      </header>
      
      <div className="grid grid-cols-12 gap-8">
        {/* TVL Metrics */}
        <BrutalistCard className="col-span-4 bg-white">
          <h2 className="text-xl font-bold uppercase underline mb-4">Total Escrowed</h2>
          <p className="text-4xl font-black text-[#39FF14] drop-shadow-[2px_2px_0_#000]">12,500 cUSD</p>
        </BrutalistCard>
        
        {/* Active Bounties Count */}
        <BrutalistCard className="col-span-4 bg-white">
          <h2 className="text-xl font-bold uppercase underline mb-4">Active Bounties</h2>
          <p className="text-4xl font-black">{bounties.filter(b => b.status === "OPEN").length}</p>
        </BrutalistCard>
        
        {/* Hunters */}
        <BrutalistCard className="col-span-4 bg-white">
          <h2 className="text-xl font-bold uppercase underline mb-4">Total Hunters</h2>
          <p className="text-4xl font-black">42</p>
        </BrutalistCard>
        
        {/* Post Bounty */}
        <BrutalistCard className="col-span-8 bg-white">
          <h2 className="text-2xl font-black mb-4 uppercase">Post a New Task</h2>
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
        <BrutalistCard className="col-span-4 bg-white">
          <h2 className="text-xl font-bold uppercase underline mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <BrutalistButton color="bg-white" className="w-full">
              View My Bounties
            </BrutalistButton>
            <BrutalistButton color="bg-white" className="w-full">
              My Submissions
            </BrutalistButton>
            <BrutalistButton color="bg-white" className="w-full">
              Escrow Balance
            </BrutalistButton>
          </div>
        </BrutalistCard>
        
        {/* Bounty Feed */}
        <div className="col-span-12">
          <BrutalistCard className="bg-white">
            <h2 className="text-3xl font-black mb-6 border-b-4 border-black pb-2">Active Bounties</h2>
            <div className="space-y-4">
              {bounties.map((bounty) => (
                <div 
                  key={bounty.id}
                  className="flex justify-between items-center border-b-2 border-black py-4 hover:bg-yellow-50"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{bounty.title}</h3>
                    <p className="text-sm text-gray-600">{bounty.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(bounty.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={bounty.status} />
                    <span className="text-xl font-black border-2 border-black bg-yellow-400 px-4 py-1">
                      {bounty.rewardAmount} {bounty.currency}
                    </span>
                    {bounty.status === "ESCROWED" && <PayoutBadge />}
                    {bounty.status !== "OPEN" && bounty.status !== "ESCROWED" ? (
                      <BrutalistButton color="bg-gray-200" className="text-sm">
                        View
                      </BrutalistButton>
                    ) : (
                      <BrutalistButton color="bg-white" className="text-sm">
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
      <footer className="mt-12 border-4 border-black p-6 text-center">
        <p className="font-bold">Bounty-Bot: The Autonomous Gig Economy Hub</p>
        <p className="text-sm">Powered by Keyless Collective SDK • ERC-8004 Compatible</p>
      </footer>
    </div>
  );
}
