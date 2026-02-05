"use client";

import RankingCard, { RankingUser } from "./RankingCard";

interface RankingsListProps {
  users: RankingUser[];
  onFollowClick?: (id: string) => void;
}

export default function RankingsList({ users, onFollowClick }: RankingsListProps) {
  if (users.length === 0) {
    return (
      <div className="bg-secondary rounded-xl p-8 text-center border border-tertiary/10">
        <p className="text-tertiary/60">No rankings available</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-xl border border-tertiary/10 overflow-hidden">
      {users.map((user) => (
        <RankingCard key={user.id} user={user} onFollowClick={onFollowClick} />
      ))}
    </div>
  );
}
