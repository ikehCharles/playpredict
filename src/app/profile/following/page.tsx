"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@common";
import FollowingCard from "@/src/components/main/Profile/FollowingCard";
import { followingListDummyData } from "@constants";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@utilities";
import type { FollowingUser } from "@/src/components/main/Profile/FollowingCard";
import { MdKeyboardBackspace } from "react-icons/md";

export default function FollowingPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FollowingUser[]>(followingListDummyData);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.bio.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleFollowToggle = (id: string, isFollowing: boolean) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isFollowing: !isFollowing } : u))
    );
  };

  return (
    <div className="w-full mx-auto min-h-[50vh]">
      <PageHeader
        title="Following"
        showMobileHeader
        leftContent={
          <Link
            href="/profile"
            className="px-2 -ml-1 rounded-full hover:bg-tertiary/5 transition-colors"
            aria-label="Back to profile"
          >
            <MdKeyboardBackspace className="w-6 h-6 text-primary" />
            </Link>
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
        <Input
          placeholder="Search following"
          prefix={<HiOutlineMagnifyingGlass className="w-5 h-5 text-tertiary/50" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
          allowClear
        />
        <div className="space-y-3">
          {filtered.map((user) => (
            <FollowingCard key={user.id} user={user} onFollowToggle={handleFollowToggle} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-tertiary/70 py-8 text-sm">No users match your search.</p>
        )}
      </div>
    </div>
  );
}
